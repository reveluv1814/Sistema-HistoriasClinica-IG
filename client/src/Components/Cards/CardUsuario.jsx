import React from "react";
import { Card, Icon } from "semantic-ui-react";
import personaFormat from "./../../libs/usuario.lib";

const extra = (
  <a>
    <Icon name="user" />
    16 Friends
  </a>
);

const CardUsuario = (props) => {
  const { user } = props;
  const { userRol, persona } = personaFormat(user.usuario);
  const date = new Date(Date.parse(user.createdAt));

  return (
    <Card
      /* image='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' */
      /* header="Elliot Baker"
      meta="Friend" */
      className="w-full"
    >
      <div className="flex flex-row p-3 w-full">
        <img
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          alt="User avatar"
          className="w-52 h-52 "
        />
        <div className="p-3 pt-0 flex flex-col justify-start items-start font-medium text-base tracking-wide text-gray-700 w-full">
          <h2 className="capitalize">
            <b>Nombre:</b>{" "}
            {persona.nombre +
              " " +
              persona.apellidoPaterno +
              " " +
              persona.apellidoMaterno}
          </h2>
          <p>
            <b>Fecha de creación: </b>
            {date.toLocaleDateString()}
          </p>
          <p>
            <b>Correo: </b>
            {user.email}
          </p>
          <p>
            <b>CI: </b>
            {persona.ci}
          </p>
          <p>
            <b>Teléfono: </b>
            {persona.telefono}
          </p>
          <p>
            <b>Dirección: </b>
            {persona.direccion}
          </p>
          <hr className="border border-gray-400 w-full mt-2" />
          <h2 className="capitalize font-semibold text-lg mt-2">{user.rol}</h2>
          <div>
            {Object.entries(userRol).map(([key, value]) => (
              <div key={key} className="capitalize">
                <span>
                  <b>{key}: </b>
                </span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardUsuario;
