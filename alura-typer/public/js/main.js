let phrase= $(".phrase").text();
let wordCount=phrase.trim().split(" ").length;
let timeLimit=$("#time-limit");
timeLimit.text(wordCount);
let phraseSize=$("#phrase-size");
phraseSize.text(wordCount);
let gameButton=$(".game-button")
gameButton.html("Start")
let typingArea=$(".typing-area");
typingArea.on("input",function () {
    $("#word-counter").text(typingArea.val().trim().length !== 0 ? typingArea.val().trim().split(" ").length : 0);
    $("#char-counter").text(typingArea.val().trim().length);
})
let timelimitValue=parseInt(timeLimit.text());
gameButton.on("click",game)

function game() {
    timelimitValue=wordCount;
    timeLimit.text(timelimitValue);
    typingArea.attr("disabled",false)
    typingArea.focus();
    typingArea.val("")
    gameButton.html("Restart");
    console.log('test');
    let chronoId=setInterval(function() {
        timelimitValue > 0 ? timelimitValue-- : 0;
        timeLimit.text(timelimitValue);
        if(timelimitValue < 1) {
            typingArea.attr("disabled",true)
            clearInterval(chronoId);
        }
        gameButton.one("click",function(event) {
            clearInterval(chronoId)
            console.log("i get here")
        })
    }, 1000)
}


