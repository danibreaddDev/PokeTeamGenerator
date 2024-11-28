async function getPokemon(input) {
    console.log(input);
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then(response => response.json())
        .then(data => crearPokemon(data))
        .catch(error => console.error("error", error)
        );
}
function crearPokemon(data) {
    console.log(data);
    pokemon_container.innerHTML = `<div>    
    <img src='${data.sprites.front_default}'/>
    <button id='añadirEquipo'>Añadir al equipo</button>
    </div>`;
    let bt_añadir = document.getElementById("añadirEquipo");
    bt_añadir.addEventListener("click", () => {
        add(data);
        pokemon_container.innerHTML = "";
    })
}
function add(data) {
    let usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    let user = usuarios.find(user => user.nombre == sessionStorage.getItem("nombre"));
    console.log(user);
    if (user.equipo_pokemon.length < 6) {
        user.equipo_pokemon.push(
            {
                "nombre_pokemon": data.name,
                "sprite": data.sprites.front_default
            }
        );
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
    } else {
        editEquipo(data);
    }

}
function loadTeam() {
    dialogPokemon.innerHTML = " <button id='cerrar' class='cerrar'>Cerrar</button>";
    let usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    let user = usuarios.find((user) => user.nombre == sessionStorage.getItem("nombre"));
    console.log(user);
    let equipo_pokemon = user.equipo_pokemon;
    let i = 0;
    for (let pokemon of equipo_pokemon) {
        i += 1;
        let div = document.createElement("div");
        div.className = "pokemon" + i;
        div.innerHTML = `<p>${pokemon.nombre_pokemon}</p>`;
        div.innerHTML += `<img src='${pokemon.sprite}'/>`;
        dialogPokemon.appendChild(div);
    }
    let btn_cerrarDialogo = document.getElementById("cerrar");
    btn_cerrarDialogo.addEventListener("click", () => {
        dialogPokemon.close();
    })
    dialogPokemon.showModal();

}
function loadEditTeam(data) {
    dialogPokemon.innerHTML = " <button id='cerrar' class='cerrar'>Cerrar</button>";
    let usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    let user = usuarios.find((user) => user.nombre == sessionStorage.getItem("nombre"));
    console.log(user);
    let equipo_pokemon = user.equipo_pokemon;
    let i = 0;
    for (const pokemon of equipo_pokemon) {
        i += 1;
        let div = document.createElement("div");
        div.className = "pokemon" + i;
        div.innerHTML = `<p>${pokemon.nombre_pokemon}</p>`;
        div.innerHTML += `<img src='${pokemon.sprite}'/>`;
        div.innerHTML += `<button class='cambiar'>cambiar</button>`;
        dialogPokemon.appendChild(div);

        let btn_cambiar = div.querySelector(".cambiar");
        btn_cambiar.addEventListener("click", () => {
            cambiarPokemon(pokemon, data);
            dialogPokemon.close();
        });

    }

    let btn_cerrarDialogo = document.getElementById("cerrar");
    btn_cerrarDialogo.addEventListener("click", () => {
        dialogPokemon.close();
    })
    dialogPokemon.showModal();
}
function editEquipo(data) {
    loadEditTeam(data);
}
function cambiarPokemon(pokemon_anterior, pokemon_actual) {
    let usuarios = JSON.parse(sessionStorage.getItem("usuarios"));
    let user = usuarios.find((user) => user.nombre == sessionStorage.getItem("nombre"));
    let equipo_pokemon = user.equipo_pokemon;
    let pokemon = equipo_pokemon.find((poke) => poke.nombre_pokemon == pokemon_anterior.nombre_pokemon);
    pokemon.nombre_pokemon = pokemon_actual.name;
    pokemon.sprite = pokemon_actual.sprites.front_default;
    sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
}
let btn_submtPokeon = document.getElementById("submitPokemon");
let pokemon_container = document.getElementById("pokemon-container");
let btn_verEquipo = document.getElementById("checkTeam");
let dialogPokemon = document.getElementById("dialogEquipo");

btn_submtPokeon.addEventListener("click", () => {
    const input_nombrePokemon = document.getElementsByTagName("input")[0].value;
    getPokemon(input_nombrePokemon);
});
btn_verEquipo.addEventListener("click", () => {
    loadTeam();
})
