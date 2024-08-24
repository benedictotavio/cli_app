import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={styles.modal_overlay}
        onClick={onClose}
        onKeyDown={onClose}
        role="button"
        tabIndex={0}
      />
      <div className={styles.modal_content}>
        <button className={styles.modal_close} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;
