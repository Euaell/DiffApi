fetch('https://api.nasa.gov/planetary/apod?api_key=CQLwVzpk6MkXCN5cPAGpg8bioOAdk40zJ6fwvpfF')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(console.error);
