var playerName

function checkName(e) {
    if((e && e.keyCode == 13) || e == 0) {
        value = document.forms.form01.name.value
        console.log(value)
        if (value) {
            console.log(value)
            playerName = value
            startStory()
        }
    }
}

function startStory() {
    fetch("/welcome")
    .then(response => response.text())
    .then(function(data) {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data
        document.getElementById("line1").content = `Welcome ${playerName}!`
        displayText()

        setTimeout(function () {
            function enter1(event) {
                if (event.key == 'Enter') {
                    document.removeEventListener('keyup', enter1)
                    dino()
                }
            }
            document.addEventListener('keyup', enter1)
        }, 18000)
        
    })
    .catch(function(error) {
        console.log(error);
    })
}

function displayText() {
    // set typing speed and wait times
    var timeInit = 1000;     // initial wait before typing first line
    var timeGap = 1000;      // wait time between each line
    var timeChar = 60;       // time until next letter

    var cursorChar = '&#9608;';

    var originId = ['line1', 'line2', 'line3', 'line4', 'line5', 'line6'];
    var originText = new Array();
    for (var i = 0; i < originId.length; i++) {
        originText.push(document.getElementById(originId[i]).innerHTML);
    }

    var cursorLine = document.getElementById('cursor-line');

    var currentTimeout;
    var showCursor;

    var typeWriter = function(index) {
        var loc = document.getElementById(originId[index]);
        var fullText = originText[index];
        var letterCount = 0;

        // this function spits out one letter per call, then calls the subsequent typeLetter()
        var typeLetter = function() {
            currentTimeout = setTimeout(function() {
                loc.className = 'visible';
                letterCount += 1;
                var showText = fullText.substring(0, letterCount);

                // stops the function from self-calling when all letters are typed
                if (letterCount === fullText.length) {
                    loc.innerHTML = showText;
                } else {
                    loc.innerHTML = showText + '<span class="typed-cursor">' + cursorChar + '</span>';
                    typeLetter();
                }
            }, timeChar);
        };

        typeLetter();

        // show cursor on next line
        var totalTime = fullText.length * timeChar + timeChar;
        showCursor = setTimeout(function() {
            document.getElementById('cursor-line').className = 'visible';
        }, totalTime);
    };

    // calculated time delays
    var delayTime = [timeInit];
    var cumulativeDelayTime = [timeInit];
    for (var i = 0; i < originId.length; i++) {
        var elapsedTimeLine = originText[i].length * timeChar + timeGap + timeChar * 2;
        delayTime.push(elapsedTimeLine);
        var sum = 0;
        for (var j = 0; j < delayTime.length; j++) {
            sum += delayTime[j];
        };
        cumulativeDelayTime.push(sum);
    };

    // calls setTimeout for each line
    var typeLineTimeout = new Array();
    for (var i = 0; i < originId.length; i++) {
        typeLineTimeout[i] = setTimeout((function(index) {
            return function() {
            cursorLine.className = 'hidden';
            typeWriter(index);
            }
        })(i), cumulativeDelayTime[i]);

    };

    // stops all timeouts
    var skip = function() {
        clearTimeout(currentTimeout);
        clearTimeout(showCursor);
        for (var i = 0; i < typeLineTimeout.length; i++) {
            clearTimeout(typeLineTimeout[i]);
        };
    };
};

var displayTextFunction;

function dino() {
    displayTextFunction = window.displayText;
    fetch("/dino")
    .then(response => response.text())
    .then(function(data) {
        var content = document.getElementById("dynHTML");
        content.innerHTML = data;

        const dino = document.getElementById("dino");
        const cactus = document.getElementById("cactus");
        const bar = document.getElementById("bar");
        bar.classList.add("load");

        function jump() {
            if (dino.classList != "jump") {
                dino.classList.add("jump");

                setTimeout(function () {
                    dino.classList.remove("jump");
                }, 500);
            };
        };

        let isAlive = setInterval(function () {
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
            if (cactusLeft < 50 && cactusLeft > -6 && dinoTop >= 140) {
                cactus.setAttribute("left", "580px");
                reload();
            };
        }, 10);

        document.addEventListener("keydown", function (event) {
            jump();
        });

        function reload() {
            bar.classList.remove("load");
            bar.setAttribute("width", "24px");
            setTimeout(function () {
                bar.classList.add("load");
            }, 500);
        };

        let isHuman = setInterval(function () {
            let barRight = parseInt(window.getComputedStyle(bar).getPropertyValue("width"));
            if (barRight > 590) {
                q1();
            }
        });

    })
    .catch(function(error) {
        console.log(error);
    });
};


