import Table from "../Components/TableUsers";
import { useState, useEffect } from "react";
import { getUsers } from "./../api/login.api";

function AdminPage() {
  const [usuarios, setUsuarios] = useState(null);
  useEffect(() => {
    async function getDataUsers() {
      const token = localStorage.getItem("token");
      const response = await getUsers(token);
      setUsuarios(response);
    }
    getDataUsers()
  }, [usuarios]);
  console.log(usuarios?.data)

  //const dataPayload = usuarios?.data;
  return (
    <>
      <div>AdminPage{localStorage.getItem("token")}</div>
      { 
      usuarios ?

      <Table
        payloadColumn={["nombre", "rol", "email", "opciones"]}
        payload={usuarios.data}
      />:<></> }
    </>
  );
}

export default AdminPage;
