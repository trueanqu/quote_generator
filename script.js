$(document).ready(function () {
    $("#get-quote").on("click", getQuote);
    $("#tweet").on("click", tweetQuote);
    getQuote();

});
var response = {
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "author": "Some Author"
};
function getQuote() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $(".quote").html(JSON.parse(xhttp.responseText).quote);
            $(".author").html(JSON.parse(xhttp.responseText).author);
            response = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1", true);
    xhttp.setRequestHeader("X-Mashape-Key", "d710jwwly3mshff6zDybKaVB0ttup1DpiTqjsnin2BMwngNxwJ");
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send();
}

function tweetQuote() {
    var text;
    if((response.quote + " by " + response.author).length > 140) {
        text = encodeURIComponent(response.quote.substr(0,140 - response.author.length - "... by ".length) + "... by " + response.author);
    } else {
        text = encodeURIComponent(response.quote + " by " + response.author);
    }
    var url = "https://twitter.com/intent/tweet?text=" + text;
    console.log(url);
    $("#tweet").attr("href", url);
}