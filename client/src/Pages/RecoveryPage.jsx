import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { RecoveryRequest } from "../api/login.api";

//const navigate = useNavigate();
const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Campo requerido"),
});

const RecoveryPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await RecoveryRequest(values);
      console.log(response);
      alert("Se envío un mensaje a tu correo cierra la ventana");
      resetForm();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        errors,
        touched,
      }) => (
        <div className="flex h-[65%] flex-col items-center justify-center">
          <h2 className="text-4xl font-normal text-red-500 mb-1">
            Introduzca su Correo de Recuperación
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12  text-blue-500 font-extrabold mt-4 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>

          <div className="bg-white rounded-3xl w-[30%]  flex flex-col p-10 items-center shadow-2xl">
            <h2 className="font-bold text-2xl mb-5">
              Correo Electronico de Recuperación
            </h2>
            <Form className="flex flex-col items-center">
              <label htmlFor="email" className="mb-1 text-lg font-medium">
                Correo:
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`p-2 shadow appearance-none border bg-stone-200 rounded-lg ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
              />

              <ErrorMessage
                name="email"
                component="div"
                className="text-center text-red-500 text-xs italic"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-500 to-indigo-500 text-white p-2 rounded-xl mt-4 w-[50%] font-bold shadow-xl"
              >
                {isSubmitting ? "Enviando" : "Enviar"}
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RecoveryPage;
