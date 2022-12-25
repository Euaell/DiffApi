let count = 0
// TODO: get the max count from the API
let maxCount = 10
let limit = 5
function getDigest(ts) {
    const publicKey = '3816e62918ba98c1fb16f8d99a0b73bf'
    const privateKey = '9da08424231457f4cdc9d6fb716789ad9dd1168a'
    // return the hash
    return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}

async function getCharacters(limit, clear) {
    let container = document.querySelector('.container')
    let characters = await fetchResource('characters', `limit=${limit}`)

    if (characters.length === 0) {
        container.innerHTML = '<h2>No characters found</h2>'
        return
    }
    if (clear) {
        count = 0
        container.innerHTML = ''
    }
    characters.forEach(character => {
        let card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <div class="cardBody">
                <h3>${character.name}</h3>
                <p>${character.description}</p>
            </div>
        `
        container.appendChild(card)
    });
}

async function searchCharacters(limit, clear) {

    let container = document.querySelector('.container')
    let searchValue = searchInput.value
    let characters = await fetchResource(`characters`, `limit=${limit}`, `nameStartsWith=${searchValue}`)

    if (characters.length === 0) {
        container.innerHTML = '<h2>No characters found</h2>'
        return
    }
    if (clear) {
        count = 0
        container.innerHTML = ''
    }
    console.log(characters)
    characters.forEach(character => {
        let card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <div class="cardBody">
                <h3>${character.name}</h3>
                <p>${character.description}</p>
            </div>
        `
        container.appendChild(card)
    });
}

async function getComics(limit, clear) {
    let container = document.querySelector('.container')
    let comics = await fetchResource('comics', `limit=${limit}`)
    if (comics.length === 0) {
        container.innerHTML = '<h2>No comics found</h2>'
        return
    }
    if (clear) {
        count = 0
        container.innerHTML = ''
    }
    comics.forEach(comic => {
        let card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
            <div class="cardBody">
                <h3>${comic.title}</h3>
                <p>${comic.description}</p>
            </div>
        `
        container.appendChild(card)
    });
}

getCharacters(limit, true)

// add and enter event listener to the search input
searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13)
        searchCharacters(100, true)
})

searchBtn.addEventListener('click', () => searchCharacters(limit, true))
comics.addEventListener('click', () => getComics(limit, true))
characters.addEventListener('click', () => getCharacters(limit, true))


async function fetchResource(resource, ...params) {
    // get the timestamp
    const ts = new Date().getTime().toString()
    const hash = getDigest(ts)
    let url = `https://gateway.marvel.com:443/v1/public/${resource}?ts=${ts}&apikey=3816e62918ba98c1fb16f8d99a0b73bf&hash=${hash}`
    params.forEach(param => {
        url += `&${param}`
    })

    if (count <= maxCount)
        url += `&offset=${count * limit}`
    else {
        return []
    }
    // fetch the data
    return fetch(url)
        .then(response => response.json()) 
        .then(data => data.data.results)
        .catch(error => console.error(error))
}

// detect the scroll position and load more data
window.addEventListener('scroll', () => {
    let { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        document.body.style.height = `${scrollHeight + 100}px`
        console.log("bottom loading")
        showLoading()
    }
})

function showLoading() {
    loading.classList.remove('hide')
    loading.classList.add('show')
    setTimeout(() => {
        loading.classList.remove('show')
        loading.classList.add('hide')
        setTimeout(() => {
            count++
            getCharacters(limit, false)
        }, 300)
    }, 1000)
}