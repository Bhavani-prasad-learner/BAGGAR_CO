import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function HeaderNav({ setIsHeaderActive, renderProfileButton }) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full z-50 fixed top-0 transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-[95%] mx-auto mt-2 bg-brand-mesh-premium border border-yellow-400 shadow-lg px-4 rounded-2xl">
        <div className="flex justify-between items-center h-12 text-yellow-400">
          <div
            className="text-yellow-400"
            onClick={() => {
              setIsHeaderActive(true);
            }}
          >
            <Menu className="h-6 w-6 text-yellow-400" />
          </div>

          <div className="font-cinzel text-[1.4rem] text-yellow-400">
            bagaara & co.
          </div>

          <div className="text-yellow-400">
            <span>{renderProfileButton()}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}