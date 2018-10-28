// global variables
var a = "";
var gifPic = "";
var queryURL = "";
var gifDiv = "";
var rating = "";
var pOne = "";
var gifStaticURL = "";
var gifAnimatedURL = "";
var gifImage = "";
var animal = "";

// create array of strings
var topic = ["Dog", "Cat", "Pig", "Horse", "Sheep", "Owl", "Falcon", "Snake", "Frog",
    "Sloth", "Skunk", "Turtle", "Possum", "Bear", "Monkey", "Cheetah", "Lion", "Serval",
    "Mouse", "Mole", "Rat", "Alligator", "Elephant", "Zebra", "Salmon"
];

var imgArray = [];

var imgObj = {};
    
// display the buttons
function renderButtons() {
    // delete prior buttons
    $("#animal-btn-grp").empty();
    // now add the button to the DOM
    for (var i = 0; i < topic.length; i++) {
        // create an element to hold the button
        a = $("<button>");
        // add a class to the button 
        a.addClass("animal-btn");
        // add a data attribute 
        a.attr("data-name", topic[i]);
        // provide the initial button text
        a.text(topic[i]);
        // now add the button to the view div
        $("#animal-btn-grp").append(a);
    }
}

// display gifs
function displayGifs() {
    // clear the current gifs
    $("#animal-gifs").empty();
    imgArray = [];
    // gifPic holds the animal type for which to display gifs
    gifPic = $(this).attr("data-name");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifPic + "&api_key=e0MwLxHvsqdd04DcwvcITaqH89t4TrqO&limit=10&rating=g";
    // create ajax call for gifs for the specific button pushed 
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // This is the API response data. It's a JSON object
        for (var i = 0; i < 10; i++) {
            // create a div to hold the gif image and rating
            gifDiv = $("<div class='animal-gif' data-state='still'>");

            // store the static and animated gif URLs 
            gifStaticURL = "";
            gifAnimatedURL = "";
            gifStaticURL = response.data[i].images.fixed_height_small_still.url;
            gifAnimatedURL = response.data[i].images.fixed_height.url;

            // store the rating data
            rating = response.data[i].rating;
            // create an element to display the gif and the rating
            pOne = $("<p>").text("Rating: " + rating);
            // display the rating data
            gifDiv.append(pOne);

            // create an element to display the gif
            gifImage = $("<img>");
            // display the gif still image initially
            gifImage.attr("src",gifStaticURL);
            gifImage.attr({'data-animate':gifAnimatedURL});
            gifImage.attr({'data-state':"still"});
            gifImage.attr({'data-still':gifStaticURL});
            gifDiv.append(gifImage);
           
            // add the div to the DOM
            $("#animal-gifs").prepend(gifDiv);

            // store the gif data in an array so we can recall and change from static to animated and back
            imgObj.staticURL = gifStaticURL; 
            imgObj.animatedURL = gifAnimatedURL;              
            imgObj.display = "S";
            imgArray.push(imgObj);  
        }
console.log(imgArray);
    });
}


// this function handles events when a animal button is clicked
$("#animal-submit").on("click", function (event) {
    event.preventDefault();
    // get the input from the text box
    animal = $("#animal-name").val().trim();
    // add new animal button to the array of animals
    topic.push(animal);
    // blank out the input field
    $("#animal-name").text("");  // THIS IS NOT WORKING
    // now need to re - rendor the buttons to make sure the new button is connected to the handler
    renderButtons();
});

// on click of one of the gif images switch the animation
$(".animal-gif").on("click", function () {
    var gifState = $(this).attr('data-state');
console.log("gifState: "+gifState);
    if (gifState === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

// add click event listener to all elementswith a class of "animal-btn" 
$(document).on("click", ".animal-btn", displayGifs);

//call renderButtons which handles processing the animal topics array
renderButtons();