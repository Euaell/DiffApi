// check if url current page is index.html
let path = window.location.pathname.split('/')[1]
console.log(path)
// get the navbar items
let navItem = document.querySelectorAll('.navBar a')
navItem.forEach(item => {
    // check if the current page is the same as the navbar item
    if (item.innerHTML.toLowerCase() === path || (path === 'index.html' && item.innerHTML.toLowerCase() === 'home')) {
        item.id = 'active'
    } else {
        item.id = ''
    }
})