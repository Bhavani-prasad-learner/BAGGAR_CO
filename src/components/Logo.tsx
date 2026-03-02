
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      {/* <img 
        src="/lovable-uploads/fe927bad-d471-4ca8-b6f6-8bf93d8ba6b5.png" 
        alt="RoosterX Logo" 
        className="h-12 md:h-16"
      /> */}
<div className="h-12 md:h-16 text-5xl md:text-3xl font-extrabold tracking-tight text-white">
  Title<span className="text-restaurant-primary">X</span>
</div>

    </div>
  );
};

export default Logo;
