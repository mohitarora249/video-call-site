"use client";

import { Button } from "@/components/ui/button";
import { ROOM_ID_LENGTH } from "@/constants";
import { useGlobalContext } from "@/context/global-context";
import { useWebRTC } from "@/contexts/web-rtc-provider";
import useMediaStream from "@/hooks/user-media-stream";
import { redirect, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Page = () => {
  const params = useParams();
  const { myStream } = useMediaStream();
  const [remoteUserId, setRemoteUserId] = useState("");
  const roomId = params.roomId as string;
  const { socket } = useGlobalContext();
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteDescription,
    remoteStream,
    sendStream,
  } = useWebRTC();

  const handleUserJoined = useCallback(
    async ({ userId }: { userId: string }) => {
      console.log("handleUserJoined : ", userId);
      const offer = await createOffer();
      setRemoteUserId(userId);
      socket?.emit("call:user", { userId, offer });
    },
    []
  );

  const handleIncomingCall = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      const ans = await createAnswer(offer);
      setRemoteUserId(from);
      socket?.emit("call:accepted", { from, answer: ans });
    },
    []
  );

  const handleCallAccepted = useCallback(
    async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      await setRemoteDescription(answer);
    },
    []
  );

  const handleNegotiationNeededEvent = async () => {
    const offer = peer?.localDescription;
    console.log("handleNegotiationNeededEvent : ", remoteUserId);
    socket?.emit("call:user", { userId: remoteUserId, offer });
  };

  useEffect(() => {
    peer?.addEventListener("negotiationneeded", handleNegotiationNeededEvent);

    return () => {
      peer?.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeededEvent
      );
    };
  }, []);

  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incoming:call", handleIncomingCall);
    socket?.on("call:accepted", handleCallAccepted);

    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incoming:call", handleIncomingCall);
      socket?.off("call:accepted", handleCallAccepted);
    };
  }, [socket]);

  useEffect(() => {
    if (roomId && roomId.length !== ROOM_ID_LENGTH) {
      redirect("/?error=invalid-room-id");
    }
  }, []);

  return (
    <div className="flex h-screen flex-col relative">
      <Button
        onClick={() => {
          if (myStream) sendStream(myStream);
        }}
      >
        Start sending my video stream
      </Button>
      {/* remote video stream */}
      {remoteStream && (
        <ReactPlayer
          playing={true}
          height="100vh"
          width="100vw"
          url={remoteStream}
        />
      )}
      {/* own video stream */}
      {myStream && (
        <div className="h-56 w-64 absolute bottom-4 right-4">
          <ReactPlayer
            playing={true}
            height="100%"
            width="100%"
            url={myStream}
            muted
          />
        </div>
      )}
    </div>
  );
};

export default Page;
