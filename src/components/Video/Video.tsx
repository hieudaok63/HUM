import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks";
import { setCurrentVideo, setHideImage } from "../../store/todo-actions";

interface Props {
  src: string;
  type: "forward" | "rewind";
}

export const Video = ({ src, type }: Props) => {
  const dispatch = useAppDispatch();
  const vidRef = useRef<any>(null);
  const handlePlayVideo = useCallback(() => {
    if (vidRef.current) {
      // vidRef.current.play();
      vidRef.current.addEventListener("timeupdate", function () {
        if (
          vidRef.current &&
          vidRef.current.currentTime === vidRef.current.duration
        ) {
          vidRef.current.pause();
          dispatch(setCurrentVideo(null, "forward"));
          dispatch(setHideImage(false));
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
      dispatch(setHideImage(true));
      vidRef.current.type = "video/webm";
      if (type === "forward") {
        handlePlayVideo();
      } else {
        handleBackwards();
      }
    }
  }, [dispatch, handleBackwards, handlePlayVideo, src, type, vidRef]);

  return (
    <video
      ref={vidRef}
      id="html5"
      className="vjs-tech"
      muted
      // loop
      playsInline
      autoPlay
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: !src ? "-1" : "1",
        objectFit: "cover",
      }}
    >
      <source src={src} type="video/mp4"></source>
    </video>
  );
};
