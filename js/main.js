$(document).ready(function() {
  $("#mealForm").on("submit", function(e) {
    let meal = {
      id: guidGenerator(),
      tagline: $("#tagline").val(),
      type: $("#type").val(),
      date: $("#date").val(),
      calories: $("#calories").val(),
      description: $("#description").val()
    };
    addMeal(meal);

    e.preventDefault();
  });
});

// Before Homepage loads
$(document).on("pagebeforeshow", "#home", function() {
  getMeals();
});

// Generate ID
function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

// Save Meal to LS
function addMeal(meal) {
  if (localStorage.getItem("meals") === null) {
    let meals = [];
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  } else {
    let meals = JSON.parse(localStorage.getItem("meals"));
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
    meals.push(meal);
  }
  // Clear fields
  $("#tagline").val("");
  $("#date").val("");
  $("#calories").val("");
  $("#description").val("");
  $.mobile.changePage("#home");
}

// Get Meals from LS
function getMeals() {
  let output = "";
  if (
    localStorage.getItem("meals") == null ||
    localStorage.getItem("meals") == "[]"
  ) {
    output = "<li>No Meals found</li>";
    $("#meals")
      .html(output)
      .listview("refresh");
  } else {
    let meals = JSON.parse(localStorage.getItem("meals"));
    $.each(meals, function(index, meal) {
      output += `
            <li>
           <a onclick="mealClicked('$meal.id}')">${meal.tagline}</a>
            </li>
            `;
    });
    $("#meals")
      .html(output)
      .listview("refresh");
  }
}

function mealClicked(mealId) {
  sessionStorage.setItem("mealId", mealId);
  $.mobile.changePage("#meal");
}
