$(document).ready(function() {
    // An array of actions, new actions will be pushed into this array;
    var oldies = ["Payphones", "Fresh Prince Of Bal Air", "Gameboys", "Drangon ball Z", "Lip Smackers", "Jelly Shoes", "Cripped Hair", "Arcade Games", "Fanny Packs", "The Price Is Right", "Friends", "Pokemon", "Slap Bracelets", "Roller Blades"];
    var giphy = "";
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons() {
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < oldies.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("giphy");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", oldies[i]);
            gifButton.text(oldies[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new action button
    function addNewButton() {
        $("#addGif").on("click", function() {
            event.preventDefault();
            var giphy = $("#action-input").val().trim();
            if (giphy == "") {
                //user cannot add a blank button
                return false;
            }
            oldies.push(giphy);
            displayGifButtons();
            return false;
        });
    }
    // Function to remove last action button
    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last
    function removeLastButton() {
        $("#removeGif").on("click", function() {
            event.preventDefault();
            oldies.pop();
            displayGifButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(topic) {
        var giphy = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&apikey=sWCkF7H8zFs7sCOkK71WT7YJry15VwDW&limit=6";


        // displays the constructed url
        console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                // console test 
                console.log(response);
                // erasing anything in this div id 
                var results = response.data;
                //shows results of gifs
                if (results == "") {
                    alert("No giphy, try again!");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>"); //div for the gifs to go inside
                    gifDiv.addClass("gifDiv");
                    // rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    // gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    // still image
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    // animated image
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);

                    // adding div of gifs to gifsView div
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    removeLastButton();

    $(document).on("click", ".giphy", function() {
        // console.log("button clicked")
        var topic = $(this).attr('data-name');
        displayGifs(topic)
    });

    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })
});
