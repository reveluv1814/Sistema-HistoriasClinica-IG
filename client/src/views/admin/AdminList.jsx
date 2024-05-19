import React, { useEffect, useState } from "react";
import TablePagination from "../../components/TablePagination";
import adminService from "../../services/adminService";
import Modal from "../../components/Modal";
import FormAdmin from "./FormAdmin";

const AdminList = () => {
  const [adminData, setAdminData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setq] = useState("");

  const getAdmin = async (nroPage = 1, limit = 10) => {
    setPage(nroPage);
    const { data } = await adminService.listar(q, nroPage, limit);
    setTotal(data.admins.count);
    setAdminData(data.admins.rows);
  };

  const funBuscar = (e) => {
    setq(e.target.value);
  };

  useEffect(() => {
    getAdmin();
  }, [q]);

  const columnas = [
    { key: "id", label: "COD" },
    { key: "doctor.persona.apellidoPaterno", label: "APELLIDO PATERNO." },
    { key: "doctor.persona.apellidoMaterno", label: "APELLIDO MATERNO." },
    { key: "doctor.persona.nombre", label: "NOMBRE" },
    { key: "doctor.persona.ci", label: "CI" },
    { key: "email", label: "CORREO ELECTRONICO" },
    { key: "createdAt", label: "CREADO EN" },
  ];

  const [adminValue, setAdminValue] = useState({});
  const [editFlag, setEditFlag] = useState(false);
  const [modalAddAdmin, setModalAddAdmin] = useState(false);
  const [idAdminEdit, setIdAdminEdit] = useState(0);

  const closeAddUser = () => {
    setModalAddAdmin(false);
  };

  const addAdmin = () => {
    setAdminValue({
      usuario: {
        email: "",
        password: "",
        rol: "admin",
      },
      persona: {
        nombre: "",
        apellidoMaterno: "",
        apellidoPaterno: "",
        ci: "",
        telefono: "",
        direccion: "",
        foto: "",
        es_persona: false,
      },
      laboratorista: {
        especialidad: "",
        matriculaProf: "",
      },
      doctor: {
        unidad: "",
        numeroMatricula: "",
        especialidad: "",
      },
      personalAdmin: {
        cargo: "",
      },
    });
    setEditFlag(false);
    setModalAddAdmin(!modalAddAdmin);
  };
  const editAdminValue = async (id) => {
    try {
      const { data } = await adminService.mostrar(id);
      setAdminValue({
        usuario: {
          email: data.usuario.email,
          rol: data.usuario.rol,
        },
        persona: {
          nombre: data.usuario.doctor.persona.nombre,
          apellidoMaterno: data.usuario.doctor.persona.apellidoMaterno,
          apellidoPaterno: data.usuario.doctor.persona.apellidoPaterno,
          ci: data.usuario.doctor.persona.ci,
          telefono: data.usuario.doctor.persona.telefono,
          direccion: data.usuario.doctor.persona.direccion,
          foto: data.usuario.doctor.persona.foto,
        },
        doctor: {
          unidad: data.usuario.doctor.unidad,
          especialidad: data.usuario.doctor.especialidad,
          numeroMatricula: data.usuario.doctor.numeroMatricula,
        },
        personalAdmin: {
          cargo: data.usuario.personalAdmin.cargo,
        },
        laboratorista: {
          especialidad: data.usuario.laboratorista.especialidad,
          matriculaProf: data.usuario.laboratorista.matriculaProf,
        },
      });
      setIdAdminEdit(id);
      setEditFlag(true);
      setModalAddAdmin(!modalAddAdmin);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="max-w-full">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl font-inter dark:text-white">
          Administradores
        </h3>
        <p className="text-gray-600 mt-2 dark:text-gray-200">
          Aqui se encuentran todos los <b>administradores</b> registrados en el
          sistema.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <p className="font-inter font-normal text-xs text-slate-600 dark:text-gray-100">
          Buscar por <b>Correo electrónico</b>
        </p>
        <div className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            onChange={(e) => funBuscar(e)}
            className="w-96 py-2 pl-12 pr-4 text-gray-500 border-gray-200 rounded-md outline-none bg-gray-50 focus:bg-white focus:border-sky-600 dark:bg-slate-700 dark:border-indigo-900 dark:text-gray-300 dark:focus:border-indigo-900"
          />
        </div>
      </div>
      <button
        className="flex flex-row ml-auto bg-blue-500 dark:bg-blue-600 justify-center items-center text-center font-inter font-normal mb-2 text-sm text-white h-10 pr-3 rounded-md shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 "
        onClick={addAdmin}
      >
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            className="w-8 h-10 p-1 bg-blue-600 dark:bg-blue-700 text-white mr-2 rounded-tl-md rounded-bl-md"
            viewBox="0 0 640 512"
          >
            <path
              d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
              fill="currentColor"
            />
          </svg>
        </div>
        Añadir administrador
      </button>
      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto dark:border-slate-700 ">
        <TablePagination
          columnas={columnas}
          datos={adminData}
          total={total}
          page={page}
          fetchData={getAdmin}
          handleEdit={editAdminValue}
          //   handleDelete={deleteId}
          //   handleShow={handleShow}
        />
        <Modal
          modalOpen={modalAddAdmin}
          setOpenModal={closeAddUser}
          title={editFlag ? "Editar Administrador" : "Agregar Administrador"}
          contenido={" shadow shadow-blue-500/40"}
        >
          <FormAdmin
            setOpenModal={closeAddUser}
            userValue={adminValue}
            userService={adminService}
            listar={getAdmin}
            editUser={editFlag}
            idEdit={idAdminEdit}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AdminList;
