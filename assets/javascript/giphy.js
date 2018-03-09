// Event listener for search button
$("#search").on("click", function() {
  // Storing our giphy API URL
  var queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=dVQjq1REC3cKtfq4yAtBoiFMzxz2UxuX&tag=dancing dogs&q=&limit=10&rating=G";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function(response) {
      // Saving the image_original_url property
      var imageUrl = response.data.image_original_url;

      // Creating and storing an image tag
      var Image = $("<img>");

      // Setting the Image src attribute to imageUrl
      Image.attr("src", imageUrl);
      Image.attr("alt", "Image");

      // Prepending the Image to the images div
      $("#images").prepend(Image);
    });
});
