// 2-15 Preface
//

var playerName

function checkName(e) {
    if((e && e.keyCode == 13) || e == 0) {
        value = document.forms.form01.name.value
        if (value) {
            playerName = value
            // intro(15, 15)
            backstory(16, 18)
        }
    }
}

function intro(pageStart, pageEnd) {
    if (pageStart <= pageEnd) {
        fetch(`${pageStart}`)
        .then(response => response.text())
        .then(data => {
            var content = document.getElementById("dynHTML")
            data = data.replace("[name]", playerName)
            content.innerHTML = data
            var timeoutTime = displayText()

            setTimeout(function () {
                enterText = document.getElementById("enter")
                enterText.className = 'visible'
                
                function enter1(event) {
                    if (event.key == 'Enter') {
                        document.removeEventListener('keyup', enter1)
                        intro(pageStart+1, pageEnd)
                    }
                }
                document.addEventListener('keyup', enter1)
            }, timeoutTime)
            
        })
        .catch(function(error) {
            console.log(error)
        })
    } else {
        backstory(16, 18)
    }
}

function backstory(pageStart, pageEnd) {
    if (pageStart <= pageEnd) {
        fetch(`${pageStart}`)
        .then(response => response.text())
        .then(data => {
            var content = document.getElementById("dynHTML")
            data = data.replace("[name]", playerName)
            content.innerHTML = data
            var timeoutTime = displayText()

            setTimeout(function () {
                var bug = document.getElementById("bug")
                bug.style.top = Math.random() * window.innerHeight / 2 + "px"
                bug.style.left = Math.random() * window.innerWidth / 2 + "px"
                
                var bugImg = document.getElementById("bugImg")
                var size = Math.random() * 50 + 50 + "px"
                bug.style.height = size
                bug.style.width = size
                bugImg.style.height = size
                bugImg.style.width = size

                bug.style.visibility = 'visible'
                
                bug.addEventListener("click", bugClick)
                function bugClick() {
                    backstory(pageStart+1, pageEnd)
                }
            }, timeoutTime)
            
        })
        .catch(function(error) {
            console.log(error)
        })
    } else {
        dino()
    }
}

function displayText() {
    // set typing speed and wait times
    var timeInit = 600     // initial wait before typing first line
    var timeGap = 600      // wait time between each line
    var timeChar = 60       // time until next letter

    var cursorChar = '&#9608;'

    var lineCount = document.getElementsByTagName("p").length - 1
    var originTags = document.getElementsByTagName("p")
    var originText = new Array()
    for (var i = 0; i < lineCount; i++) {
        originText.push(originTags[i].innerHTML)
    }

    var currentTimeout

    var typeWriter = function(index) {
        var loc = originTags[index]
        var fullText = originText[index]
        var letterCount = 0

        // this function spits out one letter per call, then calls the subsequent typeLetter()
        var typeLetter = function() {
            currentTimeout = setTimeout(function() {
                loc.className = 'visible'
                letterCount += 1
                var showText = fullText.substring(0, letterCount)

                // stops the function from self-calling when all letters are typed
                if (letterCount === fullText.length) {
                    loc.innerHTML = showText
                } else {
                    loc.innerHTML = showText + '<span class="typedCursor">' + cursorChar + '</span>'
                    typeLetter()
                }
            }, timeChar)
        }

        typeLetter()
    }

    // calculated time delays
    var delayTime = [timeInit]
    var cumulativeDelayTime = [timeInit]
    for (var i = 0; i < lineCount; i++) {
        var elapsedTimeLine = originText[i].length * timeChar + timeGap + timeChar * 2
        delayTime.push(elapsedTimeLine)
        var sum = 0
        for (var j = 0; j < delayTime.length; j++) {
            sum += delayTime[j]
        }
        cumulativeDelayTime.push(sum)
    }

    // calls setTimeout for each line
    var typeLineTimeout = new Array()
    for (var i = 0; i < lineCount; i++) {
        typeLineTimeout[i] = setTimeout((function(index) {
            return function() {
                typeWriter(index)
            }
        })(i), cumulativeDelayTime[i])
    }

    return cumulativeDelayTime[lineCount]
}

var displayTextFunction

function dino() {
    displayTextFunction = window.displayText;
    fetch("/dino")
    .then(response => response.text())
    .then(function(data) {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data

        const dino = document.getElementById("dino")
        const cactus = document.getElementById("cactus")
        const bar = document.getElementById("bar")
        bar.classList.add("load")

        function jump() {
            if (dino.classList != "jump") {
                dino.classList.add("jump")

                setTimeout(function () {
                    dino.classList.remove("jump")
                }, 500)
            }
        }

        let isAlive = setInterval(function () {
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))
            if (cactusLeft < 50 && cactusLeft > -6 && dinoTop >= 140) {
                cactus.setAttribute("left", "580px")
                reload()
            }
        }, 10)

        document.addEventListener("keydown", function (event) {
            jump()
        })

        function reload() {
            bar.classList.remove("load")
            bar.setAttribute("width", "24px")
            setTimeout(function () {
                bar.classList.add("load")
            }, 500)
        }

        let isHuman = setInterval(function () {
            let barRight = parseInt(window.getComputedStyle(bar).getPropertyValue("width"))
            if (barRight > 590) {
                q1()
            }
        })

    })
    .catch(function(error) {
        console.log(error)
    })
};


