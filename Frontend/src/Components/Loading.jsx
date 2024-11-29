import React, { useEffect, useRef } from "react";
import intro from "../assets/intro3.mp4";
const Loading = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-screen w-screen object-cover md:object-contain lg:object-cover"
      >
        <source src={intro} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loading;
