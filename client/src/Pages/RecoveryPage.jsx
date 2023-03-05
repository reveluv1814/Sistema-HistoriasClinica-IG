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
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <div className="flex h-[86%] items-center justify-center">
          <h3></h3>
          <div className="bg-[#dcdbdb] rounded-3xl w-[30%]  flex flex-col p-10 items-center shadow-2xl">
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
                className="border p-2 rounded-lg"
              />
              
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-800 text-center font-extrabold text-xs"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-700 to-indigo-700 text-white p-2 rounded-xl mt-4 w-[50%] font-bold shadow-xl"
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
