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
    <div className="flex min-h-screen flex-col relative">
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
        <div className="h-56 w-64 absolute bottom-4 right-4 rounded-md">
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
