import { useState } from "react";

const TablePagination = ({
  columnas,
  datos,
  total,
  page,
  fetchData,
  handleEdit,
  handleDelete,
  handleShow,
  handleAddCarrito,
  handlePDF,
  handleCita,
  handleHistoria,
  accionesFlag,
  personalMedico,
  laboratoristaAdd,
  handleLaboratorio,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  return (
    <>
      <table className="w-full divide-y dark:divide-slate-700">
        <thead className="bg-gray-200 text-gray-700 font-medium dark:bg-slate-700 dark:text-gray-200 ">
          <tr>
            {columnas.map((columna, index) => (
              <th
                className="py-2 pt-3 px-4 text-left text-sm font-medium uppercase"
                key={index}
              >
                {columna.label}
              </th>
            ))}
            <th className="py-2 pt-3 px-4 text-left text-sm font-medium uppercase">
              Opciones
            </th>
            {accionesFlag && (
              <th
                className="py-2 pt-3 px-4 text-left text-sm font-medium uppercase"
                id="acciones"
              >
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-600 dark:divide-slate-800">
          {datos.map((reg, index) => (
            <tr key={reg.id}>
              {columnas.map((col, pos) => (
                <td
                  className="py-2 px-4 text-sm text-gray-500 font-inter dark:text-gray-300"
                  key={pos}
                >
                  {eval("reg." + col.key)}
                </td>
              ))}
              <td className="text-sm text-gray-500 gap-1 py-2 px-2 flex flex-row">
                {personalMedico && handleHistoria && (
                  <button
                    className="text-center justify-center py-1 px-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded ml-2 lg:my-1"
                    onClick={() => handleHistoria(reg)}
                  >
                    <span
                      className="align-middle text-xs"
                      style={{ margin: 0 }}
                    >
                      Ver Historia
                    </span>
                  </button>
                )}
                {laboratoristaAdd && (
                  <button
                    className="text-center justify-center py-1 px-2 bg-sky-500 text-white hover:bg-sky-600 rounded ml-2 text-wrap lg:my-2"
                    onClick={() => handleLaboratorio(reg)}
                  >
                    <span
                      className="align-middle text-xs"
                      style={{ margin: 0 }}
                    >
                      Agregar laboratorio
                    </span>
                  </button>
                )}
                {handleAddCarrito && (
                  <button
                    className="py-1 px-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded"
                    onClick={() => handleAddCarrito(reg)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                )}
                {handleShow && (
                  <button
                    className="py-1 px-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded"
                    onClick={() => handleShow(reg)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 max-2xl:w-4 max-2xl:h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                )}
                {handleEdit && (
                  <button
                    className="py-1 px-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded"
                    onClick={() => handleEdit(reg.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 max-2xl:w-4 max-2xl:h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                )}
                {handleDelete && (
                  <button
                    className="py-1 px-2 bg-rose-500 text-white hover:bg-rose-600 rounded"
                    onClick={() => handleDelete(reg)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 max-2xl:w-4 max-2xl:h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                )}
                {handlePDF && (
                  <button
                    className="py-1 px-2 bg-red-500 text-white hover:bg-red-600 rounded"
                    onClick={() => handlePDF(reg)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                      />
                    </svg>
                  </button>
                )}
              </td>
              {accionesFlag && (
                <td className="text-sm text-gray-500" headers="encabezado1">
                  <div className="flex flex-col xl:flex-row px-2 gap-1">
                    {handleCita && (
                      <button
                        className="text-center justify-center py-1 px-2 bg-amber-500 text-white hover:bg-amber-400 rounded"
                        onClick={() => handleCita(reg)}
                      >
                        <span
                          className="align-middle text-xs"
                          style={{ margin: 0 }}
                        >
                          Crear Cita
                        </span>
                      </button>
                    )}
                    {handleHistoria && (
                      <button
                        className="text-center justify-center py-1 px-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded"
                        onClick={() => handleHistoria(reg)}
                      >
                        <span
                          className="align-middle text-xs"
                          style={{ margin: 0 }}
                        >
                          Ver Historia
                        </span>
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-2 bg-gray-100 text-gray-700 font-medium border-b pt-2 pb-2 dark:bg-slate-700 dark:text-gray-200 dark:border-b-slate-800">
        <nav className="inline-flex rounded-md shadow ">
          <button
            onClick={() => fetchData(page - 1)}
            disabled={page == 1}
            className="py-2 px-4 bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-l-md hover:text-gray-100 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-indigo-900 dark:hover:text-slate-50"
          >
            anterior
          </button>
          {total > itemsPerPage && (
            <div className="flex">
              {Array.from({ length: Math.ceil(total / itemsPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => fetchData(index + 1)}
                    className={`${
                      page === index + 1
                        ? "bg-blue-500 text-white dark:bg-sky-700"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-400 dark:text-slate-100"
                    } py-2 px-4 mx-1 rounded-md focus:outline-none`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
          <button
            onClick={() => fetchData(page + 1)}
            disabled={page == Math.ceil(total / itemsPerPage)}
            className="py-2 px-4 bg-gray-300 text-gray-600 hover:bg-gray-400 rounded-r-md hover:text-gray-100 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-indigo-900 dark:hover:text-slate-50"
          >
            siguiente
          </button>
        </nav>
      </div>
    </>
  );
};

export default TablePagination;
