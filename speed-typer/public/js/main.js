let phrase = $(".phrase").text();
let phraseTrimmed = phrase.replace(/\s+/g, ' ').trim()
let wordCount = phrase.trim().split(" ").length;
let timeLimit = $("#time-limit");
timeLimit.text(wordCount + 2);
let phraseSize = $("#phrase-size");
phraseSize.text(wordCount);
let gameButton = $(".game-button")
let buttonText = $(".button-text")
let gameButtonIcon = $("#game-button-icon")
buttonText.text("Start")
let score = $("#score-value")
let typingArea = $(".typing-area");
let timelimitValue = parseInt(timeLimit.text());
let resultMessaage = $("#result-message")

gameButton.on("click", function () {
    $(window).scrollTop(0);
    game();
})


function game() {
    startGame()
    let chronoId;
    countdown(chronoId)
}

function eachInput(chronoId) {
    typingArea.on("input", function () {
        updateCount()
        highlightRightWrong()
        calculateScore(false)
        if (checkIfWon()) {
            calculateScore(true)
            endGame(chronoId, 1)
        }
    })
}

function highlightRightWrong() {
    let typed = typingArea.val().replace(/\s+/g, ' ').trim();
    let trimmedPhrase = phrase.replace(/\s+/g, ' ').trim()
    let comparable = trimmedPhrase.substring(0, typed.length)
    let incomparable = typed.length >= trimmedPhrase.length ? "" : trimmedPhrase.substring(typed.length, trimmedPhrase.length)
    let right = checkWhatWasRightBefore(comparable.length)
    let wrong = comparable.replace(right, "")
    $(".phrase").html("" +
        "<span class='right-highlight'>" + right + "</span>" +
        "<span class='wrong-highlight'>" + wrong + "</span>" +
        incomparable)
}

function checkWhatWasRightBefore(lastIndex) {
    if (lastIndex === 0) {
        return ""
    }
    let trimmedSubPhrase = phrase.replace(/\s+/g, ' ').trim().substring(0, lastIndex)
    let typedSub = typingArea.val().replace(/\s+/g, ' ').trim().substring(0, lastIndex);
    if (typedSub === trimmedSubPhrase) {
        return typedSub
    } else {
        return checkWhatWasRightBefore(lastIndex - 1)
    }
}

function updateCount() {
    $("#word-counter").text(typingArea.val().trim().length !== 0 ? typingArea.val().replace(/\s+/g, ' ').trim().split(" ").length : 0);
    $("#char-counter").text(typingArea.val().replace(/\s+/g, ' ').trim().length);
}

function startGame() {
    gameButton.attr("disabled", true)
    $(".submit-score").attr("hidden", true)
    timelimitValue = wordCount + 2;
    timeLimit.text(timelimitValue);
    $(".phrase").text("one two three four five")
    typingArea.attr("disabled", false)
    typingArea.focus();
    typingArea.val("")
    resultMessaage.text("")
    buttonText.text("Restart")
    gameButton.removeClass("start")
    gameButtonIcon.text("restore")
    typingArea.removeClass("disabled-area")
    gameButton.addClass("restart")
}


function countdown(chronoId) {
    chronoId = setInterval(function () {
        eachInput(chronoId)
        gameButton.attr("disabled", false)
        timelimitValue > 0 ? timelimitValue-- : 0;
        timeLimit.text(timelimitValue);
        if (timelimitValue < 1) {
            endGame(chronoId, 0)
        }
        $(".restart").one("click", function (event) {
            clearInterval(chronoId)
            $("#word-counter").text(0);
            $("#char-counter").text(0);
        })
    }, 1000)
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

function fromTbodyToArray(tbody) {
    tbody = tbody.trim().replace("\n", "").replace(/\s+/g, ' ').replaceAll("> <", "><")
    let mainArr = []
    let auxArr = tbody.split("<tr>").join("").split("</tr>")
    auxArr.pop()
    for (let i = 0; i < auxArr.length; i++) {
        mainArr[i] = auxArr[i].split("<td>").join("").split("</td>")
        mainArr[i].pop()
    }
    return mainArr;
}

function fromArrayToTbody(arr) {
    let auxTbody = []
    for (let i = 0; i < arr.length; i++) {
        auxTbody[i] = arr[i].join("</td><td>")
        auxTbody[i] = "<td>" + auxTbody[i] + "</td>"
    }
    let mainTbody = "<tr>" + auxTbody.join("</tr><tr>") + "</tr>"
    return mainTbody
}

function getTBody() {
    return $(".ranking").find("tbody").html()
}

function calculateScore(won) {
    let winBonus = 0
    if (won) {
        winBonus = (parseInt($("#time-limit").text()) + 2) * 100
    }
    let finalScore = winBonus + (parseInt($("#char-counter").text()) / 2) + (parseInt($("#word-counter").text()));
    $("#score-value").text(finalScore);
}

function checkIfWon() {
    let currentTyped = typingArea.val().replace(/\s+/g, ' ').trim();
    return phraseTrimmed === currentTyped;
}

function insertNewScore() {
    let tbody=$(".ranking").find("tbody")
    let name = $("#submit-score-name").val()
    let score = $("#submit-score-score").text()
    let won = $("#submit-score-won").text()
    let newScore=newLine(name,score,won);
    $(document.body).on("click",".delete-button",deleteScore);
    tbody.prepend(newScore)
}

function endGame(chronoId, code) {
    clearInterval(chronoId)
    typingArea.attr("disabled", true)
    typingArea.removeClass("ready-for-use")
    typingArea.addClass("disabled-area")
    resultMessaage.text(code === 0 ? "you lost! please try again" : "you won! congratulations!")
    let submitArea = $(".submit-score")
    submitArea.attr("hidden", false)
    $("#submit-score-name").focus()
    $("#submit-score-score").text(score.text())
    $("#submit-score-won").text(code === 0 ? "no" : "yes")
    // $("html, body").animate({
    //     scrollTop: $(
    //         'html, body').get(0).scrollHeight
    // }, 100);

}

function deleteScore(event) {
        event.preventDefault()
        $(this).parent().parent().remove();
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

$("#submit-button").on("click", function (event) {
    insertNewScore()
    sortRanking()
    $(".submit-score").attr("hidden", true)
})