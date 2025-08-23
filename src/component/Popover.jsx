import { useEffect, useRef } from "react";
import "./styles/Popover.css";
import { useMedia } from "../hook/useMedia";

const Popover = ({ children, onClose, position }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const isPc = useMedia().isPc;
  // 팝업 위치를 조작하는 로직
  const popoverStylePc = {
    position: "absolute",
    top: position.top + 90,
    left: position.right - 20, // to the right of the item_dots's right edge
    zIndex: 9999,
  };

  const popoverStyleMobile = {
    position: "absolute",
    // top: position.top + 90,
    // left: position.right + 10, // to the right of the item_dots's right edge
    right: 20,
    zIndex: 9999,
  };

  return (
    <div className="popover_container" ref={popoverRef} style={isPc ? popoverStylePc : popoverStyleMobile}>
      <div className="popover_content">{children}</div>
    </div>
  );
};

export default Popover;
