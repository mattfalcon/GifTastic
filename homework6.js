

$(document).ready(function(){

//initial array of tv shows
var movies = ["Scrubs", "The League", "The Office", "Happy Endings", "It's Always Sunny in Philadelphia", "Sanford and Son", "Workaholics", "Parks and Recreation", "HIMYM"]
GIFArea = " "

//==================RENDER BUTTON=============================

//function for displaying tv show data
function renderButtons() {

//deleting the movie buttons prior to adding new movie buttons
$("#movies-view").empty();

//looping through the array of movies
for (var i=0; i < movies.length; i++) {

//dynamically generate buttons for each movie in the array.
//this code $("<button>") is all jquery needs to create the start and end tag. (<button></button>)
var a = $('<button>');
//Adding a class
a.addClass('movie');

//adding a data-attribute with a value of the television at index i
a.attr('data-name', movies[i]);
//providing the button's text with a value of the movie at index i
a.text(movies[i]);
//adding the button the html
$("#movies-view").append(a);
}
s=
$("#movie-input").focus();

}

renderButtons();

//============CLICK BUTTON/ LISTENERS==================================
//this function handles events where one button is clicked
$("#add-movie").on('click', function() {

//event.preventDefault() prevents the form from trying to submit itself
//we're using a form so that the user can hit enter instread of clicking the button
event.preventDefault();

//This line will grab the text from the input box
var movie = $("#movie-input").val().trim();

//this movie from the textbox is then added to our array
movies.push(movie);

//calling renderButtons which handles the processing of our movie array
renderButtons();

});

//==============DISPLAY INFO==============================
	$(document).on('click', 'button',  function() {
		// Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
			$('#GIFArea').empty(); 
	        var b = $(this).attr('data-name');		// 'this' refers to the button that was clicked
	        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=dc6zaTOxFJmzC&limit=12";  //query api url and public key
	        console.log(queryURL); 

	        //standard ajax call to get request
	        $.ajax({
	                url: queryURL,
	                method: 'GET'
	            })
	        //after the data comes back from the API
	            .done(function(response) {
	                console.log(response);
	  		//Storing an array of results in the results variable
	                var results = response.data;
	        //Looping over every result item
	                for (var i = 0; i < results.length; i++) {
	        //creating a div with the class item
	                var gifDiv = $('<div class="item">');
	        //storing the result items rating        
	                var rating = results[i].rating;
	         //creating an element to have the rating displayed
	    			var r = $('<p>').text("Rating: " + rating);
	    	//creating a image tag
	    			var gifImage = $('<img>');
	    	//giving the image tag an src attribute of a property pulled off the result item
	    				gifImage.attr('src', results[i].images.fixed_height_still.url)
		                    	.attr('data-still', results[i].images.fixed_height_still.url)
		                    	.attr('data-animate', results[i].images.fixed_height.url)
		                    	.attr('data-state', "still")
		                    	.addClass("showImage");
		    //displaying the rating & image
	                    gifDiv.append(r)
	                    	  .append(gifImage);	                    

	        //prepending data not necessary since cleared             	  
	                    $('#GIFArea').prepend(gifDiv);
	                }

	            });
	    });


//====================Still and Animate Image ==================================
	// Listens for a click on any image (dynamic)
	// $('.showImage').on('click', function(){ --> won't work here
	$(document).on('click', '.showImage',  function() {

	    var state = $(this).data('state');
		//If the clicked image's state is still, update its src attribute to what its data-animate value is
	    if (state == "still") {
	        console.log("still image works");
	     // Then, set the image's data-state to animate
	        $(this).attr('src', $(this).data('animate'))
	               .data('state', 'animate');
	    } else {
	    //  else set src to the data-still value
	        console.log("animated image works");
	        $(this).attr('src', $(this).data('still'))
	               .data('state', 'still');               
	    }

	});

});
