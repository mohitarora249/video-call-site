"use client";

import useMediaStream from "@/hooks/user-media-stream";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

const Page = () => {
  const params = useParams();
  const { myStream } = useMediaStream();
  const roomId = params.roomId as string;
  console.log("roomId : ", roomId);

  return (
    <div className="flex min-h-screen flex-col">
      {/* remote video */}
      {myStream && (
        <ReactPlayer
          playing={true}
          height="100vh"
          width="100vw"
          url={myStream}
          // muted
          // controls={true}
        />
      )}
    </div>
  );
};

export default Page;
