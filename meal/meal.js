// get all the categories selected
// let categories = [];
// var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
// for (var i = 0; i < checkboxes.length; i++) {
//     // check if the checkbox is for category
//     if (checkboxes[i].name == "categories") {
//         categories.push(checkboxes[i].value);
//     }
// }

// the above code written using javascript promise
searchMealNameBtn.addEventListener('click', function () {
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

    categories.then((categories) => {
        console.log(categories);
    })
    .catch((error) => {
        console.log(error);
    });

})
