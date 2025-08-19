import { useEffect, useRef } from 'react';
import './styles/Popover.css';

const Popover = ({ children, onClose, position }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // 팝업 위치를 조작하는 로직
  const popoverStyle = {
    position: 'absolute',
    top: position.top + 90,
    left: position.right - 20, // to the right of the item_dots's right edge
    zIndex: 100,
  };

  return (
    <div className="popover_container" ref={popoverRef} style={popoverStyle}>
      <div className="popover_content">{children}</div>
    </div>
  );
};

export default Popover;
