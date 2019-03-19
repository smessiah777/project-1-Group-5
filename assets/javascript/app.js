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
// $(function () {

var params = {
  // Request parameters
};

// Team list
function teamList() {
  $.ajax({
    url:
      "https://api.fantasydata.net/v3/nba/scores/json/TeamSeasonStats/2019" +
      $.param(params),
    beforeSend: function(xhrObj) {
      // Request headers
      xhrObj.setRequestHeader(
        "Ocp-Apim-Subscription-Key",
        "ea390d2b909e42919428428303b716b8"
      );
    },
    type: "GET",
    // Request body
    data: "{body}"
  }).done(function(data) {
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
    // return data;
  });
  // return data;
}
teamList();

$("#submit").on("click", function(event) {
  event.preventDefault();
  // console.log("ive been clicked")
  clearTableRow();
  var userTeam = $("#TeamControlSelect").val();
  console.log("this is what the user chose: ", userTeam);
  var playerName = $("#player-input").val();
  console.log("this is what the user chose: ", playerName);
  var res = playerName.split(" ");
  // console.log("split in 2: ", res)
  // console.log("first name: ", res[0])
  // console.log("last name: ", res[1])
  var uppercaseFirstLetter = res[0].charAt(0).toUpperCase();
  var stringWithoutFirstLetter = res[0].slice(1);
  var uppercase2ndLetter = res[1].charAt(0).toUpperCase();
  var string2 = res[1].slice(1);
  console.log(
    "the first letter: ",
    uppercaseFirstLetter,
    stringWithoutFirstLetter
  );
  console.log("the first letter: ", uppercase2ndLetter, string2);
  var together =
    uppercaseFirstLetter +
    stringWithoutFirstLetter +
    " " +
    uppercase2ndLetter +
    string2;
  console.log("full name: ", together);
  playerName = together;

  $.ajax({
    url:
      "https://api.fantasydata.net/v3/nba/scores/json/TeamSeasonStats/2019" +
      $.param(params),
    beforeSend: function(xhrObj) {
      // Request headers
      xhrObj.setRequestHeader(
        "Ocp-Apim-Subscription-Key",
        "ea390d2b909e42919428428303b716b8"
      );
    },
    type: "GET",
    // Request body
    data: "{body}"
  }).done(function(data) {
    // console.log(data);
    for (var j = 0; j < data.length; j++) {
      if (userTeam === data[j].Name) {
        console.log("user Team:", userTeam);
        console.log("object: ", data[j].Name);
        var tr = $("<tr>");
        // var td = $("<td>");
        var tdName = $("<td>").append(data[j].Name);
        var tdWins = $("<td>").append(data[j].Wins);
        var tdLosses = $("<td>").append(data[j].Losses);
        tr.append(tdName);
        tr.append(tdWins);
        tr.append(tdLosses);
        console.log(data[j].Name);
        console.log(data[j].Wins);
        console.log(data[j].Losses);
        console.log(tdName);
        console.log(tdWins);
        console.log(tdLosses);
        $("#team").append(tr);
        // $("#team-table").text("tr");
        // console.log(tr);

        console.log("what is in the table?", data[j].Name);
      }
    }
  });

  $.ajax({
    url:
      "https://api.fantasydata.net/v3/nba/stats/json/PlayerSeasonStats/2019?" +
      $.param(params),
    beforeSend: function(xhrObj) {
      // Request headers
      xhrObj.setRequestHeader(
        "Ocp-Apim-Subscription-Key",
        "ea390d2b909e42919428428303b716b8"
      );
    },
    type: "GET",
    // Request body
    data: "{body}"
  }).done(function(data) {
    // console.log(data)

    for (var j = 0; j < data.length; j++) {
      if (together === data[j].Name) {
        console.log("user Team:", together);
        console.log("object: ", data[j].Name);
        var tr2 = $("<tr>");
        var tdPlayer = $("<td>").html(data[j].Name);
        var tdPoints = $("<td>").html(data[j].Points);
        var tdAssists = $("<td>").html(data[j].Assists);
        var tdRebounds = $("<td>").html(data[j].Rebounds);
        tr2.append(tdPlayer);
        tr2.append(tdPoints);
        tr2.append(tdAssists);
        tr2.append(tdRebounds);
        $("#player-table").prepend(tr2);
        console.log("what is in the table?", data[j].Name);
        playerName = " ";
      }
    }
  });
  database.ref().push({
    userTeam,
    playerName
  });
});

function clearTableRow() {
  $("tbody").empty();
}
var updatedSearch = database.ref().on("child_added", function(childsnapshot) {
  console.log("this is the updated database", childsnapshot.val().userTeam);
  console.log("this is the updated database", childsnapshot.val().playerName);
  $("<option/>")
    .val(childsnapshot.val().userTeam)
    .html(childsnapshot.val().userTeam)
    .appendTo("#previousSearchControlSelect");
  $("<option/>")
    .val(childsnapshot.val().playerName)
    .html(childsnapshot.val().playerName)
    .appendTo("#previousSearchControlSelect");

  // var updatedPlayerName = childsnapshot.val().playerName;
  // $(previousControlSearchSelect).append(updatedPlayerName);
});

// });

//   $("#submit").on("click", function (event) {
//     event.preventDefault()
//     // console.log("ive been clicked")
//     clearTableRow();
//     var playerName = $("#player-input").val()
//     console.log("this is what the user chose: ", playerName)

//     database.ref().push({
//       playerName

//     });
//
//   })

// })

// });
// $(function () {
// var params = {
//   // Request parameters
// };

// $.ajax({
//   url: "https://api.fantasydata.net/v3/nba/stats/json/PlayerSeasonStats/2019?" + $.param(params),
//   beforeSend: function (xhrObj) {
//     // Request headers
//     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ea390d2b909e42919428428303b716b8");
//   },
//   type: "GET",
//   // Request body
//   data: "{body}",
// }).done(function (data) {

//   // console.log(data)

//   $("#submit").on("click", function (event) {
//     event.preventDefault()
//     // console.log("ive been clicked")
//     clearTableRow();
//     var playerName = $("#player-input").val()
//     console.log("this is what the user chose: ", playerName)

//     database.ref().push({
//       playerName

//     });
//     for (var j = 0; j < data.length; j++) {

//       if (playerName === data[j].Name) {
//         console.log("user Team:", playerName);
//         console.log("object: ", data[j].Name);
//         var tr = $("<tr>")
//         var tdPlayer = $("<td>").html(data[j].Name);
//         var tdPoints = $("<td>").html(data[j].Points);
//         var tdAssists = $("<td>").html(data[j].Assists);
//         var tdRebounds = $("<td>").html(data[j].Rebounds);
//         tr.append(tdPlayer);
//         tr.append(tdPoints);
//         tr.append(tdAssists);
//         tr.append(tdRebounds);
//         $("#player-table").prepend(tr);
//         console.log("what is in the table?", data[j].Name)
//       }

//     }
//   })

// })

// });
