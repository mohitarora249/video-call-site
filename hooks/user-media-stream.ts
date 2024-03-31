"use client";
import { useWebRTC } from "@/contexts/web-rtc-provider";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook that retrieves the user's media stream.
 *
 * @return {Object} An object containing the user's media stream.
 */
const useMediaStream = () => {
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  return {
    myStream,
  };
};

export default useMediaStream;
