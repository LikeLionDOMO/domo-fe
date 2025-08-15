import { useEffect } from "react";
import "./styles/modal.css";

const Modal = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <section className="modal_background flexCenter">
      <div className="modal_content">{children}</div>
    </section>
  );
};
export default Modal;
