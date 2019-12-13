// $.getJSON("/articles", function(data) {

//   for (var i = 0; i < data.length; i++) {
//     $("#articles").append("<h3 data-id='" + data[i]._id + "'>" + data[i].title + "</h3><p><strong>Summary: </strong>" + data[i].summary + "</p><a href='" + data[i].link + "' target='_blank'>Article Link</a></p>");
//   }
  
// });

$(document).on("click", "h3", function() {
  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");

      $("#notes").append("<input id='titleinput' name='title' >");

      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {

        $("#titleinput").val(data.note.title);

        $("#bodyinput").val(data.note.body);

      }
    });
});

$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

      title: $("#titleinput").val(),
 
      body: $("#bodyinput").val()

    }
  })
    .then(function(data) {

      console.log(data);

      $("#notes").empty();

    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});