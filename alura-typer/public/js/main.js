let phrase= $(".phrase").text();
let trimmedPhrase=phrase.trim()
let wordCount=phrase.trim().split(" ").length;
let timeLimit=$("#time-limit");
timeLimit.text(wordCount+2);
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
gameButton.on("click",function() {
    game();
})

function game() {
    gameButton.attr("disabled",true)
    timelimitValue=wordCount +2;
    timeLimit.text(timelimitValue);
    typingArea.attr("disabled",false)
    typingArea.focus();
    typingArea.val("")
    gameButton.html("Restart");
    gameButton.removeClass("start")
    gameButton.addClass("restart")
    console.log('test');
    let chronoId=setInterval(function() {
        gameButton.attr("disabled",false)
        timelimitValue > 0 ? timelimitValue-- : 0;
        timeLimit.text(timelimitValue);
        if(timelimitValue < 1) {
            typingArea.attr("disabled",true)
            clearInterval(chronoId);
        }
        $(".restart").one("click",function(event) {
            clearInterval(chronoId)
            $("#word-counter").text(0);
            $("#char-counter").text(0);
        })
    }, 1000)
}


