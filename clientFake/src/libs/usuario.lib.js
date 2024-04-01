export default function personaFormat(usuario) {
  let userRol;
  switch (usuario.rol) {
    case "laboratorista":
      userRol = {
        especialidad: usuario.laboratorista.especialidad,
        matriculaProf: usuario.laboratorista.matriculaProf,
      };
      return {
        userRol,
        persona: usuario.laboratorista.persona,
      };
    case "doctor":
      userRol = {
        unidad: usuario.doctor.unidad,
        especialidad: usuario.doctor.especialidad,
        numeroMatricula: usuario.doctor.numeroMatricula,
      };
      return {
        userRol,
        persona: usuario.doctor.persona,
      };
    case "personalAdmin":
      userRol = {
        cargo: usuario.personalAdmin.cargo,
      };
      return {
        userRol,
        persona: usuario.personalAdmin.persona,
      };
    default:
      return null;
  }
}
