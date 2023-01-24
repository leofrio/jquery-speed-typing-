let phrase= $(".phrase").text();
let phraseTrimmed=phrase.replace(/\s+/g, ' ').trim()
let wordCount=phrase.trim().split(" ").length;
let timeLimit=$("#time-limit");
timeLimit.text(wordCount+2);
let phraseSize=$("#phrase-size");
phraseSize.text(wordCount);
let gameButton=$(".game-button")
gameButton.html("Start")
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
        if(checkIfWon()) {
            endGame(chronoId,1)
        }
    })
}
function updateCount() {
    $("#word-counter").text(typingArea.val().trim().length !== 0 ? typingArea.val().replace(/\s+/g, ' ').trim().split(" ").length : 0);
    $("#char-counter").text(typingArea.val().trim().length);
}
function startGame() {
    gameButton.attr("disabled",true)
    timelimitValue=wordCount +2;
    timeLimit.text(timelimitValue);
    typingArea.attr("disabled",false)
    typingArea.focus();
    typingArea.val("")
    resultMessaage.text("")
    gameButton.html("Restart");
    gameButton.removeClass("start")
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
