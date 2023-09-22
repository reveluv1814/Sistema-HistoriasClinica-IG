import React from "react";

const PacienteView = ({ paciente }) => {
  const fecha = new Date(paciente.fechanac);
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const año = fecha.getUTCFullYear();

  const fechaFormateada = `${dia}/${mes}/${año}`;
  return (
    <div className="p-4">
      <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-500">
        <div className="w-36 h-32 overflow-hidden mr-4 border">
          <img
            src={paciente.persona.foto}
            alt="Foto del paciente"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-1">Filiación</h2>
          <hr className="mb-4 border border-sky-700 shadow" />
          <div className="flex flex-row flex-wrap">
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Nombre:</span>{" "}
              {paciente.persona.nombre} {paciente.persona.apellidoPaterno}{" "}
              {paciente.persona.apellidoMaterno}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">CI:</span> {paciente.persona.ci}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Fecha de nacimiento:</span>{" "}
              {fechaFormateada}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Edad:</span> {paciente.edad}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Sexo:</span> {paciente.sexo}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Raza:</span> {paciente.raza}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Procedencia:</span>{" "}
              {paciente.procedencia}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Residencia:</span>{" "}
              {paciente.residencia}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Teléfono:</span>{" "}
              {paciente.persona.telefono}
            </p>
            <p className="w-full md:w-1/2 lg:w-1/3 mb-2">
              <span className="font-semibold">Dirección:</span>{" "}
              {paciente.persona.direccion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacienteView;
