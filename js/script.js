const jokeBtn = document.getElementById('fetchJoke'); //boton
const jokeList = document.getElementById('jokeList'); //list


//obtiene json de la API y lo pinta en pantalla
const getJokeApi = () => {
    jokeBtn.addEventListener('click', () => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => response.json())
            .then((data) => {
                const joke = data.value;
                console.log(joke) //comprobar que trae los datos de la API
                const template = 
                `
                <li>
                    <h2>${joke}</h2>
                    <button class = 'removeBtn'>Eliminar</button>
                </li>
                `
                jokeList.innerHTML += template;
                jokesSave(joke);
            })
    })
}

const jokesSave = (joke) => {           //grabar chiste en localStorage
    let jokesLocalStorage = loadJokesStorage();
    jokesLocalStorage.push(joke);
    localStorage.setItem('newJoke', JSON.stringify(jokesLocalStorage));
}


const loadJokesStorage = () => {        //cargar chistes de localStorage
    const jokesLocalStorage = localStorage.getItem('newJoke');
     return jokesLocalStorage ? JSON.parse(jokesLocalStorage) : [];   
}

const loadJokesPage = () =>{            //pintar los chistes de localStorage en pagina       
    jokesLocalStorage = loadJokesStorage();
    jokesLocalStorage.forEach(joke => {
        const template = 
                `
                <li>
                    <h2>${joke}</h2>
                    <button class = 'removeBtn'>Eliminar</button>
                </li>
                `
                jokeList.innerHTML += template;
    })
}

const removeJoke = () => {          //funcion para agregar listener de borrado
    const deleteBtn = document.querySelectorAll('.removeBtn')
    deleteBtn.addEventListener('click', removeJoke(template));
}

console.log(localStorage)

loadJokesPage()
getJokeApi()