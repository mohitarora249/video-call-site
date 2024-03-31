"use client";

import { ROOM_ID_LENGTH } from "@/constants";
import useMediaStream from "@/hooks/user-media-stream";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import ReactPlayer from "react-player";

const Page = () => {
  const params = useParams();
  const { myStream } = useMediaStream();

  const roomId = params.roomId as string;

  useEffect(() => {
    if (roomId && roomId.length !== ROOM_ID_LENGTH) {
      redirect("/?error=invalid-room-id");
    }
  }, []);

  console.log("roomId : ", roomId);

  return (
    <div className="flex h-screen flex-col relative">
      {/* remote video stream */}
      {myStream && (
        <ReactPlayer
          playing={true}
          height="100vh"
          width="100vw"
          url={myStream}
          muted
          // controls={true}
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
