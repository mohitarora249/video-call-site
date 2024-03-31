"use client";

import EnterRoomId from "@/components/enter-room-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROOM_ID_LENGTH } from "@/constants";
import { useState } from "react";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const onChange = (v: string) => setRoomId(v);
  const handleJoinRoom = () => {
    // check input
    // if valid, join room on server, redirect user to that room
    // else show error
  };
  const handleCreateRoom = () => {
    // create room on server
    // redirect to that room
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
