// Initialize Firebase
var config = {
  apiKey: "AIzaSyBjkO2qYjqUWPq8GyF1pfN_tfR55laNTC8",
  authDomain: "nba-project-one.firebaseapp.com",
  databaseURL: "https://nba-project-one.firebaseio.com",
  projectId: "nba-project-one",
  storageBucket: "nba-project-one.appspot.com",
  messagingSenderId: "344444587997"
};
firebase.initializeApp(config);

var database = firebase.database();

var params = {
  // Request parameters
};

$.ajax({
  url:
    "https://api.fantasydata.net/v3/nba/scores/json/TeamSeasonStats/2019" +
    $.param(params),
  beforeSend: function (xhrObj) {
    // Request headers
    xhrObj.setRequestHeader(
      "Ocp-Apim-Subscription-Key",
      "ea390d2b909e42919428428303b716b8"
    );
  },
  type: "GET",
  // Request body
  data: "{body}"
})
  .done(function (data) {
    // console.log(data);

    for (var i = 0; i < data.length; i++) {
      // creating drop down menu
      $("<option/>")
        .val(data[i].Name)
        .html(data[i].Name)
        .appendTo("#TeamControlSelect");

      // console.log(data[0].Name);
      // console.log(data[0].Wins);
    }
    $("#submit").on("click", function (event) {
      event.preventDefault()
      // console.log("ive been clicked")
      clearTableRow();
      var userTeam = $("#TeamControlSelect").val()
      // console.log("this is what the user chose: ", userTeam)

      database.ref().push({
        userTeam

      });
      for (var j = 0; j < data.length; j++) {

        if (userTeam === data[j].Name) {
          console.log("user Team:", userTeam);
          console.log("object: ", data[j].Name);
          var tr = $("<tr>")
          var tdName = $("<td>").html(data[j].Name);
          var tdWins = $("<td>").html(data[j].Wins);
          var tdLosses = $("<td>").html(data[j].Losses);
          tr.append(tdName);
          tr.append(tdWins);
          tr.append(tdLosses);
          $("#team-table").prepend(tr);
          console.log("what is in the table?", data[j].Name)
        }

      }
    })

    //empty table row

  });


$(function () {
  var params = {
    // Request parameters
  };

  $.ajax({
    url: "https://api.fantasydata.net/v3/nba/stats/json/PlayerSeasonStats/2019?" + $.param(params),
    beforeSend: function (xhrObj) {
      // Request headers
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ea390d2b909e42919428428303b716b8");
    },
    type: "GET",
    // Request body
    data: "{body}",
  }).done(function (data) {


    console.log(data)

    $("#submit").on("click", function (event) {
      event.preventDefault()
      // console.log("ive been clicked")
      clearTableRow();
      var playerName = $("#player-input").val()
      console.log("this is what the user chose: ", playerName)

      database.ref().push({
        playerName

      });
      for (var j = 0; j < data.length; j++) {

        if (playerName === data[j].Name) {
          console.log("user Team:", playerName);
          console.log("object: ", data[j].Name);
          var tr = $("<tr>")
          var tdPlayer = $("<td>").html(data[j].Name);
          var tdPoints = $("<td>").html(data[j].Points);
          var tdAssists = $("<td>").html(data[j].Assists);
          var tdRebounds = $("<td>").html(data[j].Rebounds);
          tr.append(tdPlayer);
          tr.append(tdPoints);
          tr.append(tdAssists);
          tr.append(tdRebounds);
          $("#player-table").prepend(tr);
          console.log("what is in the table?", data[j].Name)
        }

      }
    })

  })

});
function clearTableRow() {
  $("tbody").empty();
}