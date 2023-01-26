let phrase= $(".phrase").text();
let phraseTrimmed=phrase.replace(/\s+/g, ' ').trim()
let wordCount=phrase.trim().split(" ").length;
let timeLimit=$("#time-limit");
timeLimit.text(wordCount+2);
let phraseSize=$("#phrase-size");
phraseSize.text(wordCount);
let gameButton=$(".game-button")
let buttonText=$(".button-text")
let gameButtonIcon=$("#game-button-icon")
buttonText.text("Start")
let score=$(".score-value")
let typingArea=$(".typing-area");
let timelimitValue=parseInt(timeLimit.text());
let resultMessaage=$("#result-message")
gameButton.on("click",function() {
    game();
})



function game() {
    startGame()
    let chronoId;
    countdown(chronoId)
}
function eachInput(chronoId){
    typingArea.on("input",function () {
        updateCount()
        highlightRightWrong()
        calculateScore(false)
        if(checkIfWon()) {
            calculateScore(true)
            endGame(chronoId,1)
        }
    })
}
function highlightRightWrong() {
    let typed=typingArea.val().replace(/\s+/g, ' ').trim();
    let trimmedPhrase=phrase.replace(/\s+/g, ' ').trim()
    let comparable=trimmedPhrase.substring(0,typed.length)
    let incomparable=typed.length >= trimmedPhrase.length ? "" : trimmedPhrase.substring(typed.length,trimmedPhrase.length)
    let right =checkWhatWasRightBefore(comparable.length)
    let wrong=comparable.replace(right,"")
    $(".phrase").html("" +
        "<span class='right-highlight'>" + right + "</span>" +
        "<span class='wrong-highlight'>" + wrong + "</span>" +
        incomparable)
}
function checkWhatWasRightBefore(lastIndex) {
    if(lastIndex === 0) {
        return ""
    }
    let trimmedSubPhrase=phrase.replace(/\s+/g, ' ').trim().substring(0,lastIndex)
    let typedSub=typingArea.val().replace(/\s+/g, ' ').trim().substring(0,lastIndex);
    if(typedSub === trimmedSubPhrase) {
        return typedSub
    }else {
        return checkWhatWasRightBefore(lastIndex-1)
    }
}
function updateCount() {
    $("#word-counter").text(typingArea.val().trim().length !== 0 ? typingArea.val().replace(/\s+/g, ' ').trim().split(" ").length : 0);
    $("#char-counter").text(typingArea.val().replace(/\s+/g, ' ').trim().length );
}
function startGame() {
    gameButton.attr("disabled",true)
    timelimitValue=wordCount +2;
    timeLimit.text(timelimitValue);
    $(".phrase").text("one two three four five")
    typingArea.attr("disabled",false)
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
    chronoId=setInterval(function() {
        eachInput(chronoId)
        gameButton.attr("disabled",false)
        timelimitValue > 0 ? timelimitValue-- : 0;
        timeLimit.text(timelimitValue);
        if(timelimitValue < 1) {
            endGame(chronoId,0)
        }
        $(".restart").one("click",function(event) {
            clearInterval(chronoId)
            $("#word-counter").text(0);
            $("#char-counter").text(0);
        })
    }, 1000)
}
function calculateScore(won) {
    let winBonus = 0
    if (won) {
        winBonus = (parseInt($("#time-limit").text()) + 2) * 100
    }
    let finalScore = winBonus + (parseInt($("#char-counter").text()) / 2) +(parseInt($("#word-counter").text()));
    $("#score-value").text(finalScore);
}
function checkIfWon() {
    let currentTyped=typingArea.val().replace(/\s+/g, ' ').trim();
    return phraseTrimmed === currentTyped;
}
function endGame(chronoId,code) {
    clearInterval(chronoId)
    typingArea.attr("disabled",true)
    typingArea.removeClass("ready-for-use")
    typingArea.addClass("disabled-area")
    resultMessaage.text(code === 0 ? "you lost! please try again" : "you won! congratulations!")
}
