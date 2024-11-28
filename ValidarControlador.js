function CheckUsuario(nombre) {
    const usuario = {
        "nombre": nombre,
        "equipo_pokemon":[]
    };
    let usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    if(usuarios === null) {
        usuarios = [];
        sessionStorage.setItem("usuarios",JSON.stringify(usuarios));
    }
    console.log(usuarios);
    let existeUsuario = usuarios.some((user) => user.nombre == usuario.nombre);
    console.log(existeUsuario);
    console.log(usuario);
    if (!existeUsuario) {
        usuarios.push(usuario);
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    sessionStorage.setItem("nombre",usuario.nombre);  
    location.href = "pokemon.html";

}
const formulario = document.getElementById("formularioValidar");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = formulario.getElementsByTagName("input");
    const nombre = inputs[0].value;
    CheckUsuario(nombre);
});
