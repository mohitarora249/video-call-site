"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WebRTCContextType = {
  peer: RTCPeerConnection | null;
  createOffer: (() => Promise<RTCSessionDescriptionInit>) | (() => void);
  createAnswer:
    | ((offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit>)
    | (() => void);
  setRemoteDescription:
    | ((answer: RTCSessionDescriptionInit) => Promise<void>)
    | (() => void);
  sendStream: ((stream: MediaStream) => Promise<void>) | (() => void);
  remoteStream: MediaStream | null;
};

type Props = {
  children: React.ReactNode;
};

const WebRTCContext = createContext<WebRTCContextType>({
  peer: null,
  createOffer: () => {},
  createAnswer: () => {},
  setRemoteDescription: () => {},
  sendStream: () => {},
  remoteStream: null,
});

export const useWebRTC = () => useContext(WebRTCContext);

export const WebRTCProvider = ({ children }: Props) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const peer = useMemo(
    () =>
      new window.RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" },
        ],
      }),
    []
  );

  const handleTrackEvent = useCallback(
    ({ streams: [stream] }: RTCTrackEvent) => {
      setRemoteStream(stream);
    },
    [peer]
  );

  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, []);

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const setRemoteDescription = async (answer: RTCSessionDescriptionInit) => {
    await peer.setRemoteDescription(answer);
  };

  const sendStream = async (stream: MediaStream) => {
    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });
  };

  return (
    <WebRTCContext.Provider
      value={{
        peer,
        createOffer,
        createAnswer,
        setRemoteDescription,
        sendStream,
        remoteStream,
      }}
    >
      {children}
    </WebRTCContext.Provider>
  );
};
