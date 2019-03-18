$(function()
{
    populateCarButtons(cars, "carButtons", "#buttonsArea");
    console.log("Page Loaded");
})

var cars = ["Camaro", "Mustang", "Jeep"];
var apiKey = "FC6U69j2zr1KB6e5FUxSNthBpouPMGSy"

function populateCarButtons(cars, classToAdd, areaToAddTo)
{
    $(areaToAddTo).empty();
    
    
    for (var i = 0; i < cars.length; i++)
    {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr("data-type", cars[i]);
        a.text(cars[i]);
        $(areaToAddTo).append(a);
    }

    $("#search-input-box").val("");
}

$(document).on('click', ".carButtons", function()
{
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=' + apiKey + '&limit=10'
    

    $("#carsDisplay").empty();

    $.ajax({url:queryURL,method:'GET'})
        .done(function(response)
        {
           for(var i = 0; i < response.data.length; i++)
            {
                //console.log(response.data);
                var searchDiv = $('<div class = "col-md-4" id = "car-info">');
                var title = response.data[i].title;
                var rating = response.data[i].rating;
                var t = $("<p>").text("Title: " + title);
                var r = $("<p>").text("Rating: " + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                
                image.attr("src", still);
                image.attr("data-still",still);
                image.attr("data-animated", animated);
                image.attr("data-state","still");
                image.addClass("carImages");
                searchDiv.append(r);
                searchDiv.append(t);
                searchDiv.append(image);
        
                $("#carsDisplay").append(searchDiv);

            }
            // console.log(response);
        })
    // console.log(type);
})

$(document).on("click",".carImages",function()
{
    var state = $(this).attr("data-state");
    
    if(state == "still")
    {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state","animated");
        
    }
    else
    {
        
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state","still");
        
    }
    console.log("State var = " + state);
})

$("#submitButton").on("click", function()
{
    var newCars = $("input").eq(0).val();
    cars.push(newCars);
    populateCarButtons(cars, "carButtons", "#buttonsArea");
    //console.log(cars);
    return false;
    
    //$("#search-input-box").empty();
    
})