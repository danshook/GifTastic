// **********************************************
//             GLOBAL VARIABLES
// **********************************************
// Initial array of topics
var characters = [
  "Slowpoke Rodriguez",
  "Penelope Pussycat",
  "Witch Hazel",
  "Wile E. Coyote",
  "Yosemite Sam",
  "Beaky Buzzard"
];

function displayCharacterInfo() {
  var character = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    character +
    "&api_key=dVQjq1REC3cKtfq4yAtBoiFMzxz2UxuX&limit=12";

  // Creating an AJAX call for the specific character button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#characters-view").empty();

    for (x = 0; x < response.pagination.count; x++) {
      // Creating a div to hold the character
      var characterDiv = $("<div class='character'>");

      // Storing the rating data
      var rating = response.data[x].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rated: " + rating);

      $("<p>").css({
        margin: "20px"
      });

      // Displaying the rating
      characterDiv.append(pOne);

      // Retrieving the URL for the image
      var imgURL = response.data[x].images.fixed_width_still.url;

      var animatedURL = response.data[x].images.fixed_width.url;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      $("imgURL").css({
        "background-color": "red",
        "background-style": "solid"
      });

      // Adding an attribute to declare animation state
      image.attr("animate", "no");

      // Adding URL image to the attribute state of 'still'
      image.attr("still", imgURL);

      // Adding URL image to the attribute state of 'animate'
      image.attr("running", animatedURL);

      $(image).css("border", "double 8px green");

      // Create listener event to toggle still to animate
      image.click(function() {
        //   alert("Toggle between still and animate");
        if ($(this).attr("animate") === "no") {
          var newURL = $(this).attr("running");
          $(this).attr("src", newURL);
          $(this).attr("animate", "yes");
        } else {
          var newURL = $(this).attr("still");
          $(this).attr("src", newURL);
          $(this).attr("animate", "no");
        }
      });

      // Appending the image
      characterDiv.append(image);
      // );

      // Putting the entire Character above the previous Characters
      $("#characters-view").prepend(characterDiv);
    }
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
