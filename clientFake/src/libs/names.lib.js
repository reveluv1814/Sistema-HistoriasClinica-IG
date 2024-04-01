export default function nameFormat(usuario) {
  switch (usuario.rol) {
    case "laboratorista":
      return (
        usuario.laboratorista.persona.nombre +
        " " +
        usuario.laboratorista.persona.apellidoPaterno +
        " " +
        usuario.laboratorista.persona.apellidoMaterno
      );
    case "doctor":
      return (
        usuario.doctor.persona.nombre +
        " " +
        usuario.doctor.persona.apellidoPaterno +
        " " +
        usuario.doctor.persona.apellidoMaterno
      );
    case "personalAdmin":
      return (
        usuario.personalAdmin.persona.nombre +
        " " +
        usuario.personalAdmin.persona.apellidoPaterno +
        " " +
        usuario.personalAdmin.persona.apellidoMaterno
      );
    default:
      return null;
  }
}
