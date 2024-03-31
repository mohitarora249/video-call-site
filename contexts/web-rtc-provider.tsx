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
  createOffer: () => Promise<RTCSessionDescriptionInit | undefined> | void;
  createAnswer: (
    offer: RTCSessionDescriptionInit
  ) => Promise<RTCSessionDescriptionInit | undefined> | void;
  setRemoteDescription: (
    answer: RTCSessionDescriptionInit
  ) => Promise<void> | void;
  sendStream: (stream: MediaStream) => Promise<void> | void;
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
  const [peer, setPeer] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const server = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" },
        ],
      });
      setPeer(server);
    }
  }, []);

  const handleTrackEvent = ({ streams: [stream] }: RTCTrackEvent) => {
    setRemoteStream(stream);
  };

  useEffect(() => {
    peer?.addEventListener("track", handleTrackEvent);
    return () => {
      peer?.removeEventListener("track", handleTrackEvent);
    };
  }, [peer]);

  const createOffer = async () => {
    const offer = await peer?.createOffer();
    console.log("createOffer : ", offer);
    if (offer) {
      await peer?.setLocalDescription(offer);
      console.log("setLocalDescription");
      return offer;
    }
  };

  const createAnswer = async (offer: RTCSessionDescriptionInit) => {
    console.log("createAnswer : ", offer);
    await peer?.setRemoteDescription(offer);
    const answer = await peer?.createAnswer();
    console.log("createAnswer : ", answer);
    if (answer) {
      await peer?.setLocalDescription(answer);
      return answer;
    }
  };

  const setRemoteDescription = async (answer: RTCSessionDescriptionInit) => {
    await peer?.setRemoteDescription(answer);
  };

  const sendStream = async (stream: MediaStream) => {
    console.log("Sending stream : ", stream);
    stream.getTracks().forEach((track) => {
      peer?.addTrack(track, stream);
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
