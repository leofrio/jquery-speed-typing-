$("#submit-button").on("click", function (event) {
    insertNewScore()
    sortRanking()
    $(".submit-score").attr("hidden", true)
})
function insertNewScore() {
    let tbody=$(".ranking").find("tbody")
    let name = $("#submit-score-name").val()
    let score = $("#submit-score-score").text()
    let won = $("#submit-score-won").text()
    let newScore=newLine(name,score,won);
    $(document.body).on("click",".delete-button",deleteScore);
    tbody.prepend(newScore)
}

function newLine(name, score, won) {
    let line = $("<tr>")
    let nameCol=$("<td>").text(name)
    let scoreCol=$("<td>").text(score)
    let wonCol= $("<td>").text(won)
    let removeCol= $("<td>")
    let btn=$("<a>").addClass("delete-button").attr("href","#")
    let icon=$("<i>").addClass("material-icons").addClass("delete-icon").text("delete")
    btn.append(icon);
    removeCol.append(btn)
    line.append(nameCol)
    line.append(scoreCol)
    line.append(wonCol)
    line.append(removeCol)
    return line
}
function deleteScore(event) {
    event.preventDefault()
    $(this).parent().parent().remove();
}
function sortRanking() {
    let scoreArr = fromTbodyToArray(getTBody())
    scoreArr.sort(sortingByScore)
    let sortedTbody = fromArrayToTbody(scoreArr);
    $(".ranking").find("tbody").html(sortedTbody)
}

function sortingByScore(a, b) {
    if (parseFloat(a[1]) === parseFloat(b[1])) {
        return 0;
    } else {
        return (parseFloat(a[1]) > parseFloat(b[1])) ? -1 : 1;
    }
}