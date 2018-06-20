$(document).ready(function () {
    $('#mealForm').on('submit', function (e) {
        let meal = {
            id: guidGenerator(),
            tagline: $('#tagline').val(),
            type: $('#type').val(),
            date: $('#date').val(),
            calories: $('#calories').val(),
            description: $('#description').val(),
        }
        addMeal(meal);

        e.preventDefault();
    });
});


// Generate ID
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// Save Meal to LS
function addMeal(meal) {
    if (localStorage.getItem('meals') === null) {
        let meals = [];
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
    } else {
        let meals = JSON.parse(localStorage.getItem('meals'));
        meals.push(meal);
    }
    $.mobile.changePage('#home');
}