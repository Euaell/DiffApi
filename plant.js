const container = document.querySelector(".mainContainer")


let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://subtle-crisp-fad94d.netlify.app'
    }
};
function random() {
    let page = Math.floor(Math.random() * 100) + 1;
    fetch(`https://trefle.io/api/v1/plants?token=sY1g1Tm4AdJ8BnvwTqrvXSvpcs0NdSax4n8IbbqIJq0&page=${page}`, requestOptions)
    .then(response => response.json())
    .then(result => result.data)
    .then(data => {
        container.innerHTML = "";
        data.forEach(writePlant)

    })
    .catch(error => console.log(error, 'error'));
}

random()

searchBtn.addEventListener("click", function() {
    let searchValue = searchInput.value;
    let searchValueLower = searchValue.toLowerCase();
    
    fetch(`https://trefle.io/api/v1/plants/search?token=sY1g1Tm4AdJ8BnvwTqrvXSvpcs0NdSax4n8IbbqIJq0&q=${searchValueLower}`, requestOptions)
    .then(response => response.json())
    .then(result => result.data)
    .then(data => {
        container.innerHTML = "";
        data.forEach(writePlant)
    })
    .catch(error => console.log(error, 'error'));
})

// TODO: add a tree filter

edible.addEventListener("click", function() {
    let page = Math.floor(Math.random() * 6) + 1;
    fetch(`https://trefle.io/api/v1/plants?page=${page}&token=sY1g1Tm4AdJ8BnvwTqrvXSvpcs0NdSax4n8IbbqIJq0&filter_not[edible_part]=null`, requestOptions)
    .then(response => response.json())
    .then(result => result.data)
    .then(data => {
        container.innerHTML = "";
        data.forEach(writePlant)
    })
    .catch(error => console.log(error, 'error'));
})

rand.addEventListener("click", function() {
    random()
})

function writePlant(plant) {

    // Create a new div element
    const newDiv = document.createElement("div");
    newDiv.classList.add("plantContainer");

    // Create a new img element inside a new div
    const imgDic = document.createElement("div");
    imgDic.classList.add("plantImgContainer");
    const newImg = document.createElement("img");
    newImg.src = plant.image_url;
    imgDic.appendChild(newImg);

    // Create a new h2 element
    const newH2 = document.createElement("h2");
    newH2.classList.add("plantName");
    newH2.innerHTML = plant.common_name;

    // Create a new p element for discovered year
    const newP = document.createElement("p");
    const newSpan = document.createElement("span");
    newSpan.classList.add("desc");
    newSpan.innerHTML = "Year Discovered: ";
    const newSpan2 = document.createElement("span");
    newSpan2.classList.add("desc2");
    newSpan2.innerHTML = plant.year;
    newP.appendChild(newSpan);
    newP.appendChild(newSpan2);
    
    // Create a new p element for family
    const newP2 = document.createElement("p");
    const newSpan3 = document.createElement("span");
    newSpan3.classList.add("desc");
    newSpan3.innerHTML = "Family: ";
    const newSpan4 = document.createElement("span");
    newSpan4.classList.add("desc2");
    newSpan4.innerHTML = plant.family;
    newP2.appendChild(newSpan3);
    newP2.appendChild(newSpan4);

    // Create a new p element for genus
    const newP3 = document.createElement("p");
    const newSpan5 = document.createElement("span");
    newSpan5.classList.add("desc");
    newSpan5.innerHTML = "Genus: ";
    const newSpan6 = document.createElement("span");
    newSpan6.classList.add("desc2");
    newSpan6.innerHTML = plant.genus;
    newP3.appendChild(newSpan5);
    newP3.appendChild(newSpan6);

    // Create a new p element for scientific name
    const newP4 = document.createElement("p");
    const newSpan7 = document.createElement("span");
    newSpan7.classList.add("desc");
    newSpan7.innerHTML = "Scientific Name: ";
    const newSpan8 = document.createElement("span");
    newSpan8.classList.add("desc2");
    newSpan8.innerHTML = plant.scientific_name;
    newP4.appendChild(newSpan7);
    newP4.appendChild(newSpan8);

    // Append the new div to the container
    newDiv.appendChild(imgDic);
    newDiv.appendChild(newH2);
    newDiv.appendChild(newP);
    newDiv.appendChild(newP3);
    newDiv.appendChild(newP2);
    newDiv.appendChild(newP4);

    // Append the new div to the container
    container.appendChild(newDiv);
}