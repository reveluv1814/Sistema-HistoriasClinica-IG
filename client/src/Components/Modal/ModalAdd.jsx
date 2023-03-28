import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./../../assets/Modal.css";
import { useAdminPage } from "../../Context/AdminPageProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ModalAdd = (props) => {
  const { closeModalSucces, setCloseModalSucces } = useAdminPage();

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  const modalRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const handleCloseAndRedirect = (route) => {
    props.onClose();
    if (closeModalSucces) {
      setCloseModalSucces(false);
    } // cierra el modal
    if (props.buttonAction) {
      navigate(route); // redirecciona si se proporciona la ruta
    }
  };

  return (
    <CSSTransition
      in={props.show}
      nodeRef={modalRef}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose} ref={modalRef}>
        <div
          className={`modal-content ${props.contenido} `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className={closeModalSucces ? "hidden" : ""}>
            <div className="modal-body">{props.children}</div>
          </div>
          <div className={!closeModalSucces ? "hidden" : ""}>
            <div className="modal-body">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="w-20 h-20 p-1 text-emerald-700"
              />
              <p className="font-semibold">Usuario registrado satisfactoriamente!!!</p>
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={() => handleCloseAndRedirect(props.buttonAction)}
              className={`button ${props.button} `}
            >
              {props.botonTitle}
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalAdd;
