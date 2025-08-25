import { useMedia } from "../hook/useMedia";
import MobileFooter from "./MobileFooter";
import MobileHeader from "./MobileHeader";
import PcFooter from "./PcFooter";
import PcHeader from "./PcHeader";
import { useEffect, useState } from "react";

const MainLayout = ({ children, onChangeMobileToggle }) => {
  const isPc = useMedia().isPc;
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      {isPc && <PcHeader style={{ zIndex: "9999" }} />}
      {!isPc && <MobileHeader style={{ zIndex: "9999" }} onChangeMobileToggle={onChangeMobileToggle} />}
      <section
        style={{
          height: isPc ? "calc(100vh - min(12vh, 89px))" : `calc(${vh}px - 64px - min(12vh, 89px))`,
          width: "100%",
          marginTop: isPc ? "min(12vh, 89px)" : "64px",
          overflowY: "scroll",
          position: "relative",
        }}>
        {children}
        {isPc && <PcFooter style={{ zIndex: "9999" }} />}
      </section>
      {!isPc && <MobileFooter style={{ zIndex: "9999" }} />}
    </div>
  );
};
export default MainLayout;
