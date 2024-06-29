const jokeBtn = document.getElementById('fetchJoke'); // Botón obtener chiste
const jokeList = document.getElementById('jokeList'); // Lista de chistes

// Obtener chiste de la API y mostrar en pantalla
const getJokeApi = () => {
    jokeBtn.addEventListener('click', () => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => response.json())
            .then((data) => {
                const joke = data.value;
                console.log(joke);
                addNewJoke(joke);
                jokesSave(joke);
            })
            
    });
}

// Guardar chiste en localStorage
const jokesSave = (joke) => {
    let jokesLocalStorage = loadJokesStorage();
    jokesLocalStorage.push(joke);
    localStorage.setItem('jokes', JSON.stringify(jokesLocalStorage));
}

// Cargar chistes desde localStorage y mostrar en la página
const loadJokesPage = () => {
    const jokesLocalStorage = loadJokesStorage();
    jokesLocalStorage.forEach(joke => {
        addNewJoke(joke);
    });
}

// Cargar chistes del localStorage
const loadJokesStorage = () => {
    const jokesLocalStorage = JSON.parse(localStorage.getItem('jokes')) || [];
    return jokesLocalStorage;
}

// Pintar el chiste en el documento
const addNewJoke= (joke) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <h2>${joke}</h2>
        <button class="removeBtn">Eliminar</button>
    `;
    jokeList.appendChild(li);
    addDeleteListener(li, joke);
}

//agregar evento a los botones de eliminar
const addDeleteListener = (li, joke) => {
    const removeBtn = li.querySelector('.removeBtn');
    removeBtn.addEventListener('click', () => {
        deleteJoke(joke, li);
    });
}

// Eliminar un chiste del localStorage y del documento
const deleteJoke = (joke, li) => {
    let jokes = loadJokesStorage();
    const index = jokes.indexOf(joke);
    if (index !== -1) {     //JavaScript devuelve '-1' si no encuentra el elemento en el array
        jokes.splice(index, 1);       // Eliminar el chiste del arreglo en la posición index
        localStorage.setItem('jokes', JSON.stringify(jokes)); 
        li.remove();
    }
}


    loadJokesPage();
    getJokeApi();

