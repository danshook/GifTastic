// **********************************************
//             GLOBAL VARIABLES
// **********************************************

// Initial array of topics
var characters = [
  "bugs bunny",
  "tasmanian devil",
  "elmer fudd",
  "yosemite sam",
  "foghorn leghorn"
];

function displayCharacterInfo() {
  var character = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=dVQjq1REC3cKtfq4yAtBoiFMzxz2UxuX&q=" +
    character +
    "&limit=10&offset=0&lang=en";

  // Creating an AJAX call for the specific character button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Creating a div to hold the character
    var characterDiv = $("<div class='character'>");

    // Storing the rating data
    var rating = response.data[0].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    characterDiv.append(pOne);

    // Retrieving the URL for the image
    var imgURL = response.data[0].images.original_still.url;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    characterDiv.append(image);

    // Putting the entire Character above the previous Characters
    $("#characters-view").prepend(characterDiv);
  });
}

// **********************************************
//                  FUNCTIONS
// **********************************************

// Function for displaying character data
function renderButtons() {
  // Deleting the characters prior to adding new characters
  // (This is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < characters.length; i++) {
    //
    var a = $("<button>");
    // Adding a class of character-btn to our button
    a.addClass("character-btn");

    // Adding a data attribute
    a.attr("data-name", characters[i]);

    // Providing the initial button text
    a.text(characters[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}
// ***********************************************
//                 MAIN PROCESS
// ***********************************************
// Event listener for search button
$("#add-character").on("click", function(event) {
  event.preventDefault();
  console.log("CHARACTER " + character);
  var character = $("#character-input")
    .val()
    .trim();

  // Adding characters from the textbox to the array
  characters.push(character);

  // Calling renderTopics
  renderButtons();
});

// Adding a click event listener to all elements with a class of "character-btn"
$(document).on("click", ".character-btn", displayCharacterInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();
