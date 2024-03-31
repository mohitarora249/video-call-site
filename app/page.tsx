"use client";

import EnterRoomId from "@/components/enter-room-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  const handleJoinRoom = () => {};
  const handleCreateRoom = () => {};

  return (
    <main className="flex flex-col h-screen items-center justify-center space-y-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="mb-6 text-3xl font-semibold">
            Start Your Video Call
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <EnterRoomId />
          <Button onClick={handleJoinRoom}>Join Room</Button>
          <Separator className="my-4" />
          <Button onClick={handleCreateRoom}>Create Room</Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
