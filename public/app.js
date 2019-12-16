
$(document).ready(function () {

  $("#scrape").click(function() {
    
    $.ajax({
      url: "/scrape",
      type: "GET",
      success: function(data) {
        console.log(data);
        $("#articles").empty();
        $(".modal").css("display", "grid");
        $("#message").text("Scrape Complete! (Exit Modal To Display Articles)")
      },
      error: function() {
        $(".modal").css("display", "grid");
        $("#message").text("Scrape Failed :(")
      }
    });

  });

  $("#close").click(function() {
    location.reload(true);
  });

  $("#clear").click(function () {
    $("#articles").empty();
    $("#articles").text("No articles have been scraped yet.");
    console.log("Connected");
  });

  $(document).on("click", "#comment-button", function () {
    $("#notes").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function (data) {
        console.log(data);

        $("#notes").append("<h2 class='hd' id='note-head'>" + data.title + "</h2>");

        $("#notes").append("<div id='title-section'><label name='title'>Name:</label><input id='titleinput' name='title'></div>");

        $("#notes").append("<div id='body-section'><label name='body'>Note:</label><textarea id='bodyinput' name='body'></textarea></div>");

        $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='button'>Post Comment</button>");

        $("#notes").append("<div id='all-notes'></div>");

      });
  });

  $(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {

        title: $("#titleinput").val(),

        body: $("#bodyinput").val()

      }
    })
      .then(function (data) {

        console.log(data);

      });

    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

});
