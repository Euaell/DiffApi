// check if url current page is index.html
let path = window.location.pathname.split('/')[1]
// get the navbar items
let navItem = document.querySelectorAll('.navBar a')
navItem.forEach(item => {
    // check if the current page is the same as the navbar item
    if (item.innerHTML.toLowerCase() === path) {
        item.id = 'active'
    } else {
        item.id = ''
    }
})

fetch('https://api.nasa.gov/planetary/apod?api_key=CQLwVzpk6MkXCN5cPAGpg8bioOAdk40zJ6fwvpfF')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(console.error);
