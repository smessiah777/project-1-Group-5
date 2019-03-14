



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

            console.log(data[0].Name);
        console.log(data[0].Wins);


        // console.log(data[i].Wins);
    })
    .fail(function () {
        alert("error");
    });


var newButton = $("<option>")
newButton = text.data[0].Name









