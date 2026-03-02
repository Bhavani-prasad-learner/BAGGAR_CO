import { useEffect, useState } from "react";

const LQIPImage = ({ lowSrc, highSrc, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(lowSrc);

  useEffect(() => {
    const img = new Image();
    img.src = highSrc;
    img.onload = () => {
      setSrc(highSrc);
      setLoaded(true);
    };
  }, [highSrc]);

  return (
    // <div className="w-[80vw] h-full flex items-center justify-center overflow-hidden">
    <img
      src={src}
      alt={alt}
      {...props}
      style={{
        filter: loaded ? "blur(0)" : "blur(20px)",
        transition: "filter 0.5s ease",
        width: "100%",
        height: "100%",
        
        
      }}
      className="object-cover object-[60%_center]"
    />
    // </div>
  );
};

export default LQIPImage;
