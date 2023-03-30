import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { postUsers } from "../../api/login.api";
import { useAdminPage } from "../../Context/AdminPageProvider";

const initialValues = {
  usuario: {
    email: "",
    password: "",
    rol: "",
  },
  persona: {
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    ci: "",
    telefono: "",
    direccion: "",
    foto: "http://placehold.it/32x32",
    es_persona: false,
  },
  doctor: {
    unidad: "",
    especialidad: "",
    numeroMatricula: "",
  },
  personalAdmin: {
    cargo: "",
  },
  laboratorista: {
    especialidad: "",
    matriculaProf: "",
  },
};

const validationSchema = Yup.object({
  usuario: Yup.object({
    email: Yup.string()
      .email("Ingrese un email válido")
      .required("Campo requerido"),
    password: Yup.string()
      .required("Campo requerido")
      .min(7, "La contraseña debe tener al menos 7 caracteres"),
    rol: Yup.string().required("Campo requerido"),
  }),
  persona: Yup.object({
    nombre: Yup.string().required("Campo requerido"),
    apellidoMaterno: Yup.string().required("Campo requerido"),
    apellidoPaterno: Yup.string().required("Campo requerido"),
    ci: Yup.string()
      .required("Campo requerido")
      .min(6, "La contraseña debe tener al menos 7 caracteres"),
    telefono: Yup.string()
      .required("Campo requerido")
      .matches(/^\d+$/, "El teléfono debe contener solo números"),
    direccion: Yup.string().required("Campo requerido"),
  }),
  doctor: Yup.object({
    unidad: Yup.string().when("usuario.rol", {
      is: "doctor",
      then: Yup.string().required("Campo requerido"),
    }),
    especialidad: Yup.string().when("usuario.rol", {
      is: "doctor",
      then: Yup.string().required("Campo requerido"),
    }),
    numeroMatricula: Yup.string().when("usuario.rol", {
      is: "doctor",
      then: Yup.string().required("Campo requerido"),
    }),
  }),
  personalAdmin: Yup.object({
    cargo: Yup.string().when("usuario.rol", {
      is: "personalAdmin",
      then: Yup.string().required("Campo requerido"),
    }),
  }),
  laboratorista: Yup.object({
    especialidad: Yup.string().when("usuario.rol", {
      is: "laboratorista",
      then: Yup.string().required("Campo requerido"),
    }),
    matriculaProf: Yup.string().when("usuario.rol", {
      is: "laboratorista",
      then: Yup.string().required("Campo requerido"),
    }),
  }),
});

const UserForm = () => {
  const { setCloseModalSucces } = useAdminPage();
  const token = localStorage.getItem("token");

  const [step, setStep] = useState(1);
  const [resError, setResError] = useState(false);
  const onSubmit = async (values) => {
    try {
      const response = await postUsers(token, values);
      setCloseModalSucces(true);
      resetForm();
      setResError(false);
      console.log(resError);
    } catch (error) {
      console.error(error);
      setResError(true);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValidating,
        isValid,
      }) => {
        return (
          <Form>
            {step === 1 && (
              <>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="usuario.email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="usuario.email"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.usuario?.email && touched.usuario?.email
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.usuario.email}
                  />
                  {errors.usuario?.email && touched.usuario?.email && (
                    <div className="text-red-500">{errors.usuario.email}</div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="usuario.password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="usuario.password"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.usuario?.password && touched.usuario?.password
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.usuario.password}
                  />
                  {errors.usuario?.password && touched.usuario?.password && (
                    <div className="text-red-500">
                      {errors.usuario.password}
                    </div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="usuario.rol"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Rol
                  </label>
                  <Field
                    as="select"
                    name="usuario.rol"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.usuario?.rol && touched.usuario?.rol
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.usuario.rol}
                  >
                    <option value="">Seleccionar</option>
                    <option value="doctor">Doctor</option>
                    <option value="personalAdmin">
                      Personal Administrativo
                    </option>
                    <option value="laboratorista">Laboratorista</option>
                  </Field>
                  {errors.usuario?.rol && touched.usuario?.rol && (
                    <span className="text-red-500">{errors.usuario.rol}</span>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <div
                style={{
                  height: "500px",
                  overflowY: "scroll",
                }}
              >
                <div style={{ height: "600px", paddingRight: "5%" }}>
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="persona.nombre"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Nombre
                    </label>
                    <Field
                      type="text"
                      name="persona.nombre"
                      className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.persona?.nombre && touched.persona?.nombre
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.persona?.nombre && touched.persona?.nombre && (
                      <div className="text-red-500">
                        {errors.persona.nombre}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="persona.apellidoPaterno"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Apellido paterno
                    </label>
                    <Field
                      type="text"
                      name="persona.apellidoPaterno"
                      className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                        errors.persona?.apellidoPaterno &&
                        touched.persona?.apellidoPaterno
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.persona?.apellidoPaterno &&
                      touched.persona?.apellidoPaterno && (
                        <div className="text-red-500">
                          {errors.persona.apellidoPaterno}
                        </div>
                      )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="persona.apellidoMaterno"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Apellido materno
                    </label>
                    <Field
                      type="text"
                      name="persona.apellidoMaterno"
                      className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                        errors.persona?.apellidoMaterno &&
                        touched.persona?.apellidoMaterno
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.persona?.apellidoMaterno &&
                      touched.persona?.apellidoMaterno && (
                        <div className="text-red-500">
                          {errors.persona.apellidoMaterno}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="persona.ci"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      CI
                    </label>
                    <Field
                      type="text"
                      name="persona.ci"
                      className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                        errors.persona?.ci && touched.persona?.ci
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.persona?.ci && touched.persona?.ci && (
                      <div className="text-red-500">{errors.persona.ci}</div>
                    )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="persona.telefono"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Teléfono
                    </label>
                    <Field
                      type="text"
                      name="persona.telefono"
                      className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                        errors.persona?.telefono && touched.persona?.telefono
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.persona?.telefono && touched.persona?.telefono && (
                      <div className="text-red-500">
                        {errors.persona.telefono}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="persona.direccion "
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Dirección
                    </label>
                    <Field
                      type="text"
                      name="persona.direccion"
                      className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                        errors.persona?.direccion && touched.persona?.direccion
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.persona?.direccion &&
                      touched.persona?.direccion && (
                        <div className="text-red-500">
                          {errors.persona.direccion}
                        </div>
                      )}
                  </div>
                  {/* <div className="flex flex-col mb-4">
                      <label
                        htmlFor="persona.foto"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Foto
                      </label>
                      <Field
                        type="text"
                        name="persona.foto"
                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                          errors.persona?.foto && touched.persona?.foto
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {errors.persona?.foto && touched.persona?.foto && (
                        <div className="text-red-500">{errors.persona.foto}</div>
                      )}
                    </div> */}
                  {/* <div className="flex flex-col mb-4">
                      <label
                        htmlFor="persona.es_persona"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        ¿Es persona?
                      </label>
                      <Field type="checkbox" name="persona.es_persona" />
                    </div> */}
                </div>
              </div>
            )}

            {values.usuario.rol === "doctor" && step === 3 && (
              <>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="doctor.unidad"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Unidad
                  </label>
                  <Field
                    type="text"
                    name="doctor.unidad"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.doctor?.unidad ? "border-red-500" : ""
                    }`}
                  />
                  {touched.doctor?.unidad && (
                    <div className="text-red-500">campo requerido</div>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="doctor.especialidad"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Especialidad
                  </label>
                  <Field
                    type="text"
                    name="doctor.especialidad"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.doctor?.especialidad ? "border-red-500" : ""
                    }`}
                  />
                  {touched.doctor?.especialidad && (
                    <div className="text-red-500">campo requerido</div>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="doctor.numeroMatricula"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Número de Matrícula
                  </label>
                  <Field
                    type="text"
                    name="doctor.numeroMatricula"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.doctor?.numeroMatricula ? "border-red-500" : ""
                    }`}
                  />

                  {touched.doctor?.numeroMatricula && (
                    <div className="text-red-500">campo requerido</div>
                  )}
                </div>
              </>
            )}
            {values.usuario.rol === "personalAdmin" && step === 3 && (
              <>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="personalAdmin.cargo"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Cargo
                  </label>
                  <Field
                    type="text"
                    name="personalAdmin.cargo"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.personalAdmin?.cargo ? "border-red-500" : ""
                    }`}
                  />
                  {touched.personalAdmin?.cargo && (
                    <div className="text-red-500">campo requerido</div>
                  )}
                </div>
              </>
            )}

            {values.usuario.rol === "laboratorista" && step === 3 && (
              <>
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="laboratorista.especialidad"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Especialidad
                  </label>
                  <Field
                    type="text"
                    name="laboratorista.especialidad"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.laboratorista?.especialidad
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {touched.laboratorista?.especialidad && (
                    <div className="text-red-500">campo requerido</div>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="laboratorista.matriculaProf"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Número de Matrícula Profesional
                  </label>
                  <Field
                    type="text"
                    name="laboratorista.matriculaProf"
                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.laboratorista?.matriculaProf &&
                      touched.laboratorista?.matriculaProf
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  {errors.laboratorista?.matriculaProf &&
                    touched.laboratorista?.matriculaProf && (
                      <div className="text-red-500">
                        {errors.laboratorista.matriculaProf}
                      </div>
                    )}
                </div>
              </>
            )}
            {values.usuario.rol !== "doctor" &&
              values.usuario.rol !== "personalAdmin" &&
              values.usuario.rol !== "laboratorista" &&
              step === 3 && (
                <div className="font-semibold">
                  Debes seleccionar un rol para continuar
                </div>
              )}

            {step === 1 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              >
                Siguiente
              </button>
            )}
            {step === 2 && (
              <div className="mt-3 p-2">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="mr-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                >
                  Siguiente
                </button>
              </div>
            )}
            {step === 3 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="mr-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                >
                  Atrás
                </button>
                {values.usuario.rol && (
                  <button
                    type="submit"
                    className="ml-2 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                    disabled={isValidating || !isValid}
                  >
                    Guardar
                  </button>
                )}
              </>
            )}
            {resError && (
              <p className="font-semibold text-rose-700 text-center mt-2">
                Ocurrio un error, Cierra y vuelve a intentarlo
              </p>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
export default UserForm;
