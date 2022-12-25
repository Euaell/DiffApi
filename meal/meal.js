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

async function getCheckBoxes() {
    let categor = [];
    let locations = [];
    console.log("searchMealName clicked")
    let checkboxes = document.querySelectorAll('.sideNav input[type="checkbox"]:checked');
    let categories = new Promise((resolve, reject) => {
        for (var i = 0; i < checkboxes.length; i++) {
            // check if the checkbox is for category
            if (checkboxes[i].name == "categories") {
                categor.push(checkboxes[i].value);
            }
            if (checkboxes[i].name == "locations") {
                locations.push(checkboxes[i].value);
            }
            if (i == checkboxes.length - 1) {
                resolve({ categories: categor, locations: locations });
            }
        }
        reject("No categories selected");
    });
    return categories;
}
// // sample usage
// getCheckBoxes()
// .then((categories) => {
//     console.log(categories);
// })
// .catch((error) => {
//     console.log(error);
// });

searchMeal.addEventListener("click", () => {
    console.log("searchMeal clicked")
    getCheckBoxes()
    .then((data) => {
        cardContainer.innerHTML = "";
        let {locations, categories} = data        
        getMealByCategory(categories)
        getMealByLocation(locations)
    })
    .catch(console.error);
});

async function fetchData(path, ...params) {
    let url = `https://www.themealdb.com/api/json/v1/1/${path}.php?`
    params.forEach((param) => {
        url += `&${param}`
    })

    return fetch(url)
}

async function searchMealName() {
    let mealName = document.getElementById("searchMealName").value
    let data = fetchData('search', `s=${mealName}`)
    data.then((response) => response.json())
    .then((data) => data.meals)
    .then((result) => {
        cardContainer.innerHTML = ""
        result.forEach((meal) => {
            let mealDiv = document.createElement("div")
            mealDiv.classList.add("mealCard")
            mealDiv.id = meal.idMeal
            mealDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="cardBody">
                    <h2>${meal.strMeal}</h2>
                    <p>${meal.strCategory} ${meal.strArea}</p>
                    <button onclick="getMealDetails(${meal.idMeal})">Details</button>
                </div>
                `
            cardContainer.appendChild(mealDiv)
        })
    })
    .catch((error) => console.log(error))
}

searchMealNameBtn.addEventListener("click", searchMealName)

async function getMealCategories() {
    let data = fetchData('list', 'c=list')
    data.then((response) => response.json())
    .then((data) => data.meals)
    .then((result) => {
        let categories = document.getElementById("categoriesList")
        result.forEach((category) => {
            let li = document.createElement("li")
            li.innerHTML = `
                <input type="checkbox" name="categories" value="${category.strCategory}">
                <label for="${category.strCategory}">${category.strCategory}</label>
                `
            categories.appendChild(li)
        })
    })
    .catch((error) => console.log(error))
}
getMealCategories()

async function getMealLocations() {
    let data = fetchData('list', 'a=list')
    data.then((response) => response.json())
    .then((data) => data.meals)
    .then((result) => {
        let locations = document.getElementById("locationsList")
        result.forEach((location) => {
            let li = document.createElement("li")
            li.innerHTML = `
                <input type="checkbox" name="locations" value="${location.strArea}">
                <label for="${location.strArea}">${location.strArea}</label>
                `
            locations.appendChild(li)
        })
    })
    .catch((error) => console.log(error))
}
getMealLocations()

async function getMealByCategory(categories) {
    categories.forEach((category) => {
        let data = fetchData('filter', `c=${category}`)
        data.then((response) => response.json())
        .then((data) => data.meals)
        .then((result) => {
            
            result.forEach((meal) => {
                let mealDiv = document.createElement("div")
                mealDiv.classList.add("mealCard")
                mealDiv.id = meal.idMeal
                mealDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="cardBody">
                        <h3>${meal.strMeal}</h3>
                        <p>${meal.strCategory} ${meal.strArea}</p>
                        <button onclick="getMealDetails(${meal.idMeal})">Details</button>
                    </div>
                    `
                cardContainer.appendChild(mealDiv)
            })
        })
        .catch((error) => console.log(error))
    })
}

async function getMealByLocation(locations) {
    locations.forEach((location) => {
        let data = fetchData('filter', `a=${location}`)
        data.then((response) => response.json())
        .then((data) => data.meals)
        .then((result) => {
            result.forEach((meal) => {
                let mealDiv = document.createElement("div")
                mealDiv.classList.add("mealCard")
                mealDiv.id = meal.idMeal
                mealDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="cardBody">
                        <h3>${meal.strMeal}</h3>
                        <p>${meal.strCategory}  ${meal.strArea}</p>
                        <button onclick="getMealDetails(${meal.idMeal})">Details</button>
                    </div>
                    `
                cardContainer.appendChild(mealDiv)
            })
        })
        .catch((error) => console.log(error))
    })
}

async function getMealDetails(id) {
    console.log(id)
    let data = fetchData('lookup', `i=${id}`)
    data.then((response) => response.json())
    .then((data) => data.meals)
    .then((result) => {
        let meal = result[0]
        cardContainer.innerHTML = ""
        let mealDiv = document.createElement("div")
        mealDiv.classList.add("mealCard")
        mealDiv.classList.add("mealDetails")
        mealDiv.id = meal.idMeal
        
        // split the instruction by 'step'
        let instruction = meal.strInstructions.split('STEP')
        let instructionList = ""
        instruction.forEach((step) => {
            instructionList += `<li>${step}</li>`
        })
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="cardBody">
                <h2>${meal.strMeal}</h2>
                <p><b>Category: </b> ${meal.strCategory}</p>
                <p><b>Area: </b> ${meal.strArea}</p>
                <p><b>Tags: </b> ${meal.strTags}</p>
                <h4>Instruction</h4>
                <ol>${instructionList}</ol>
                <p><a href="${meal.strYoutube}" target="_blank">Youtube</a></p>
            </div>
            `
        cardContainer.appendChild(mealDiv)
    })
    .catch((error) => console.log(error))
}


