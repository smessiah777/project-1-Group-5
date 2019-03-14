

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


var params = {
    // Request parameters
};

$.ajax({
    url: "https://api.fantasydata.net/v3/nba/scores/json/TeamSeasonStats/2019" + $.param(params),
    beforeSend: function (xhrObj) {
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ea390d2b909e42919428428303b716b8");
    },
    type: "GET",
    // Request body
    data: "{body}",
})
    .done(function (data) {


        for (var i = 0; i < data.length; i++)
            $('<option/>').val(data[i].Name).html(data[i].Name).appendTo('#TeamControlSelect');

        console.log(data[0].Name);
        console.log(data[0].Wins);


        $("#submit").on("click", function (event) {
            event.preventDefault()
            console.log("ive been clicked")






        })






    })
    .fail(function () {
        alert("error");
    });
