
//loop through API response and create li elements
function generateResults(respJson, userName) {
  $(".results-desc").text(`Showing results for ${userName}`);
  for (i=0; i < respJson.length; i++) {
    $(".results").append(`<li>Repo Name: ${respJson[i].name} <br> Link: <a href="${respJson[i].url}">${respJson[i].url}</a></li>`)
  }
}

function callAPI(userName) {
fetch("https://api.github.com/users/"+userName+"/repos")
  .then(function(resp) {
    if (resp.ok) {
      return resp.json();
    }
    else {
      $(".results-desc").text(resp.statusText);
      throw new Error(resp.statusText);

        }
  })
  .then(respJson => generateResults(respJson, userName))
  .catch(err =>
    console.log(err))
}

//on page load listen for submits, capture user input and pass to other functions
$(function captureInput() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    $(".results").html(""); //clear old results
    $(".results.desc").html(""); //clear old results
    var userName = $("#userName-search").val();
    if (userName === "") {
      alert("Search field must not be empty");
    }
    $("input").val("");
    callAPI(userName);
  })
})
