import "./Confirmation.css";
const Confirmation = ({ children, isOpen, setModalOpen, confirmFunc }) => {
  const confirm = () => {
    confirmFunc();
    setModalOpen();
  };
  if (isOpen) {
    return (
      <div className="back">
        <div className="dlg">
          {children}
          <div className="btn-group">
            <button className="confirm" onClick={confirm}>
              OK
            </button>
            <button className="cancel" onClick={setModalOpen}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Confirmation;
