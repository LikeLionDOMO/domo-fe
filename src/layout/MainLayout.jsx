import { useMedia } from "../hook/useMedia";
import MobileFooter from "./MobileFooter";
import MobileHeader from "./MobileHeader";
import PcFooter from "./PcFooter";
import PcHeader from "./PcHeader";

const MainLayout = ({ children, onChangeMobileToggle }) => {
  const isPc = useMedia().isPc;
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      {isPc && <PcHeader />}
      {!isPc && <MobileHeader onChangeMobileToggle={onChangeMobileToggle} />}
      <section
        style={{
          height: isPc ? "calc(100vh - 89px)" : "calc(100vh - 64px - 89px)",
          width: "100%",
          marginTop: isPc ? "89px" : "64px",
          overflowY: "scroll",
          position: "relative",
        }}>
        {children}
        {isPc && <PcFooter />}
      </section>
      {!isPc && <MobileFooter />}
    </div>
  );
};
export default MainLayout;
