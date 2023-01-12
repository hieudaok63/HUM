import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { setCurrentVideo } from "../../store/todo-actions";

interface Props {
  src: string;
  type: "forward" | "rewind";
}

export const Video = ({ src, type }: Props) => {
  const dispatch = useAppDispatch();
  const vidRef = useRef<any>(null);
  const handlePlayVideo = useCallback(() => {
    if (vidRef.current) {
      vidRef.current.play();
      vidRef.current.addEventListener("timeupdate", function () {
        if (vidRef.current.currentTime === vidRef.current.duration) {
          dispatch(setCurrentVideo(null, "forward"));
        }
      });
    }
  }, [dispatch]);
  const handleBackwards = useCallback(() => {
    vidRef.current.currentTime = 2;
    let intervalRwd = setInterval(() => {
      if (vidRef.current) {
        if (vidRef.current.currentTime === 0) {
          clearInterval(intervalRwd);
          dispatch(setCurrentVideo(null, "forward"));
          vidRef.current.pause();
        } else {
          vidRef.current.currentTime = vidRef.current.currentTime - 0.12;
        }
      }
    }, 110);
  }, [dispatch]);

  useEffect(() => {
    if (vidRef && vidRef.current && src) {
      vidRef.current.src = src;
      vidRef.current.type = "video/webm";
      if (type === "forward") {
        handlePlayVideo();
      } else {
        handleBackwards();
      }
    }
  }, [handleBackwards, handlePlayVideo, src, type, vidRef]);
  return (
    <video
      ref={vidRef}
      muted
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: !src ? "-1" : "1",
        objectFit: "cover"
      }}
    />
  );
};
