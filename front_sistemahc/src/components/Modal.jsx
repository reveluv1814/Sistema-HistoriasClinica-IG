import "./../layouts/css/additional-styles/Modal.css";

const Modal = ({ children, modalOpen, setOpenModal, title, contenido }) => {
  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="modal bg-black opacity-50"
            onClick={() => setOpenModal(false)}
          />
          <div
            className={`modal-content bg-white p-0 w-2/3 md:w-1/2 xl:w-1/3 relative mt-[20%] ${contenido}`}
          >
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer h-11">
              {/* <button>boton</button> */}
            </div>
            <button
              className="bg-rose-600 hover:bg-rose-700 rounded-xl  mt-2 absolute top-0 right-0 mr-2 text-3xl pl-2 pb-1 pr-2 text-start pt-0 text-white "
              onClick={() => setOpenModal(false)}
            >
              ⨂
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
