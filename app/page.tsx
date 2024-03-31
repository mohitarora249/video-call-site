"use client";

import EnterRoomId from "@/components/enter-room-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROOM_ID_LENGTH } from "@/constants";
import { useGlobalContext } from "@/context/global-context";
import { nanoid, customAlphabet } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const onChange = (v: string) => setRoomId(v);
  const { push } = useRouter();
  const { socket } = useGlobalContext();

  const handledJoinedRoom = ({ roomId }: { roomId: string }) => {
    push(`/${roomId}`);
  };

  useEffect(() => {
    socket?.on("joined:room", handledJoinedRoom);
    return () => {
      socket?.off("joined:room", handledJoinedRoom);
    };
  }, [socket, handledJoinedRoom]);

  const handleJoinRoom = () => {
    socket?.emit("join:room", {
      // userId: nanoid(),
      userId: "joiner",
      roomId,
    });
  };

  const handleCreateRoom = () => {
    socket?.emit("join:room", {
      // userId: nanoid(),
      userId: "creator",
      roomId: customAlphabet("0123456789", ROOM_ID_LENGTH)(),
    });
  };

  return (
    <main className="flex flex-col h-screen items-center justify-center space-y-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="mb-6 text-3xl font-semibold">
            Start Your Video Call
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 items-center">
          <EnterRoomId onChange={onChange} roomId={roomId} />
          <Button
            className="w-full"
            disabled={roomId.length !== ROOM_ID_LENGTH}
            onClick={handleJoinRoom}
          >
            Join Room
          </Button>
          <Separator className="my-4" />
          <Button className="w-full" onClick={handleCreateRoom}>
            Create Room
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
