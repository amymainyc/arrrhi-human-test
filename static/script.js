var playerName
var attempts = 1

function checkName(e) {
    if((e && e.keyCode == 13) || e == 0) {
        value = document.forms.form01.name.value
        if (value) {
            playerName = value
            intro(2, 15)
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
                
                function continueStory() {
                    document.removeEventListener('keyup', continueStory)
                    intro(pageStart+1, pageEnd)
                }
                document.addEventListener('keyup', continueStory)
                document.addEventListener('mouseup', continueStory)
            }, timeoutTime)
            
        })
        .catch(function(error) {
            console.log(error)
        })
    } else {
        backstory(16, 24)
    }
}

function backstory(pageStart, pageEnd) {
    if (pageStart <= pageEnd) {
        fetch(`${pageStart}`)
        .then(response => response.text())
        .then(data => {
            var content = document.getElementById("dynHTML")
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
        pretest(25, 28)
    }
}

function pretest(pageStart, pageEnd) {
    if (pageStart <= pageEnd) {
        fetch(`${pageStart}`)
        .then(response => response.text())
        .then(data => {
            var content = document.getElementById("dynHTML")
            content.innerHTML = data
            var timeoutTime = displayText()

            setTimeout(function () {
                enterText = document.getElementById("enter")
                enterText.className = 'visible'
                
                function continueStory() {
                    document.removeEventListener('keyup', continueStory)
                    intro(pageStart+1, pageEnd)
                }
                document.addEventListener('keyup', continueStory)
                document.addEventListener('mouseup', continueStory)
            }, timeoutTime)
            
        })
        .catch(function(error) {
            console.log(error)
        })
    } else {
        catOrDog()
    }
}

function catOrDog() {
    fetch('catcha')
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data

        submit = document.getElementById("submit")
        submit.addEventListener("click", checkAnswers)
        function checkAnswers() {
            correct = 0
            total = 9
            catChecked = document.querySelector("#cb8").checked
            if (catChecked) correct += 1
            for (i = 1; i <= total; i++) {
                if (i != 8) {
                    dogChecked = document.querySelector(`#cb${i}`).checked
                    if (!dogChecked) correct += 1
                }
            }
            console.log(correct)
            if (correct < 9) {
                failMessage = document.getElementById("fail")
                failMessage.innerHTML = `<br>You are ${Math.floor(correct/total*100)}% correct. Please try again.`
                failMessage.style.visibility = 'visible'
                attempts += 1
            } else {
                letterCaptchaDialogue()
            }
        }
    })
    .catch(function(error) {
        console.log(error)
    })
}

function letterCaptchaDialogue() {
    fetch("30")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data
        var timeoutTime = displayText()

        setTimeout(function () {
            enterText = document.getElementById("enter")
            enterText.className = 'visible'
            
            function continueStory() {
                document.removeEventListener('keyup', continueStory)
                intro(pageStart+1, pageEnd)
            }
            document.addEventListener('keyup', continueStory)
            document.addEventListener('mouseup', continueStory)
        }, timeoutTime)
        
    })
    .catch(function(error) {
        console.log(error)
    })
}

function letterCaptcha() {
    fetch("letters")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data     
    })
    .catch(function(error) {
        console.log(error)
    })
}

function checkCaptcha(e) {
    if((e && e.keyCode == 13) || e == 0) {
        value = document.forms.form02.captcha.value
        if (value == "EOIEJIW83OCBICJBNAKJNCSIWMWPRX8Z927") {
            moralityDialogue()
        } else {
            failMessage = document.getElementById("fail")
            failMessage.style.visibility = "visible"
            attempts += 1
        }
    }
}

function moralityDialogue() {
    fetch("32")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data
        var timeoutTime = displayText()

        setTimeout(function () {
            enterText = document.getElementById("enter")
            enterText.className = 'visible'
            
            function continueStory() {
                document.removeEventListener('keyup', continueStory)
                intro(pageStart+1, pageEnd)
            }
            document.addEventListener('keyup', continueStory)
            document.addEventListener('mouseup', continueStory)
        }, timeoutTime)
        
    })
    .catch(function(error) {
        console.log(error)
    })
}

function addAttempt() {
    failMessage = document.getElementById("fail")
    failMessage.style.visibility = "visible"
    attempts += 1
}

function moralityQs(n) {
    fetch(`q${n}`)
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data
    })
    .catch(function(error) {
        console.log(error)
    })
}

function dinoDialogue() {
    fetch("34")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data
        var timeoutTime = displayText()

        setTimeout(function () {
            enterText = document.getElementById("enter")
            enterText.className = 'visible'
            
            function continueStory() {
                document.removeEventListener('keyup', continueStory)
                intro(pageStart+1, pageEnd)
            }
            document.addEventListener('keyup', continueStory)
            document.addEventListener('mouseup', continueStory)
        }, timeoutTime)
        
    })
    .catch(function(error) {
        console.log(error)
    })
}

var reactionTime = 0

function dino() {
    fetch("/dino")
    .then(response => response.text())
    .then(function(data) {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data

        const dino = document.getElementById("dino")
        const cactus = document.getElementById("cactus")
        const bar = document.getElementById("bar")
        bar.classList.add("load")

        let jumps = 0
        const d = new Date()
        let time1 = d.getTime()
        let times = new Array()

        function jump() {
            if (dino.classList != "jump") {
                dino.classList.add("jump")
                jumps += 1
                const d = new Date()
                let time2 = d.getTime()
                let timeBetweenJumps = time2-time1
                time1 = time2
                
                times.push(timeBetweenJumps)
                setTimeout(function () {
                    dino.classList.remove("jump")
                }, 500)
            }
        }

        var alive = true
        let isAlive = setInterval(function () {
            let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
            let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))
            if (cactusLeft < 50 && cactusLeft > -6 && dinoTop >= 140) {
                cactus.setAttribute("left", "580px")
                reload()
                alive = false
            }
        }, 10)
        let checkAlive = setInterval(() => {
            if (!alive) {
                attempts += 1
                console.log(attempts)
                alive = true
            }
        }, 2000)

        document.addEventListener("keydown", function (event) {
            jump()
        })
        document.addEventListener("mousedown", function (event) {
            jump()
        })

        function reload() {
            bar.classList.remove("load")
            bar.setAttribute("width", "24px")
            setTimeout(function () {
                bar.classList.add("load")
            }, 500)
        }

        sleep(1000)
        let isHuman = setInterval(function () {
            let barRight = parseInt(window.getComputedStyle(bar).getPropertyValue("width"))
            if (barRight > 590) {
                reactionTime = stddev(times)
                fetch("36")
                .then(response => response.text())
                .then(data => {
                    var content = document.getElementById("dynHTML")
                    data = data.replace("[reactionTime]", Math.round(reactionTime * 100) / 100)
                    content.innerHTML = data
                    var timeoutTime = displayText()

                    setTimeout(function () {
                        enterText = document.getElementById("enter")
                        enterText.className = 'visible'
                        
                        function continueStory() {
                            document.removeEventListener('keyup', continueStory)
                            intro(pageStart+1, pageEnd)
                        }
                        document.addEventListener('keyup', continueStory)
                        document.addEventListener('mouseup', continueStory)
                    }, timeoutTime)
                    
                })
                .catch(function(error) {
                    console.log(error)
                })
            }
        }, 10)
    })
    .catch(function(error) {
        console.log(error)
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function stddev(arr){
    // Creating the mean with Array.reduce
    let mean = arr.reduce((acc, curr)=>{
        return acc + curr
    }, 0) / arr.length;
     
    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k)=>{
        return (k - mean) ** 2
    })
     
    // Calculating the sum of updated array
   let sum = arr.reduce((acc, curr)=> acc + curr, 0);
    
   // Calculating the variance
   let variance = sum / arr.length
    
   // Returning the Standered deviation
   return Math.sqrt(sum / arr.length)
}

function lastQDialogue() {
    fetch("37")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data
        var timeoutTime = displayText()

        setTimeout(function () {
            enterText = document.getElementById("enter")
            enterText.className = 'visible'
            
            function continueStory() {
                document.removeEventListener('keyup', continueStory)
                intro(pageStart+1, pageEnd)
            }
            document.addEventListener('keyup', continueStory)
            document.addEventListener('mouseup', continueStory)
        }, timeoutTime)
        
    })
    .catch(function(error) {
        console.log(error)
    })
}

function lastQ() {
    fetch("lastq")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        content.innerHTML = data

        no = document.getElementById("no")
        no.addEventListener("click", addAttempt)

        yes = document.getElementById("yes")
        yes.addEventListener("click", endDialogue)
        
    })
    .catch(function(error) {
        console.log(error)
    })
} 

function endDialogue() {
    fetch("39")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")
        data = data.replace("[attempts]", attempts)
        if (attempts > 5) {
            data = data.replace("[pass/fail]", "Unfortunately, you did not pass.")
        } else {
            data = data.replace("[pass/fail]", "You passed!")
        }
        content.innerHTML = data
        var timeoutTime = displayText()

        setTimeout(function () {
            enterText = document.getElementById("enter")
            enterText.className = 'visible'
            
            function continueStory() {
                document.removeEventListener('keyup', continueStory)
                intro(pageStart+1, pageEnd)
            }
            document.addEventListener('keyup', continueStory)
            document.addEventListener('mouseup', continueStory)
        }, timeoutTime)
        
    })
    .catch(function(error) {
        console.log(error)
    })
}

function end() {
    fetch("end")
    .then(response => response.text())
    .then(data => {
        var content = document.getElementById("dynHTML")

        let row = "<tr><td>[position]</td><td>[name]</td><td>[score]</td><td>[passed]</td></tr>"
        let scoreData = ""
        fetch(`getScores/${playerName}/${attempts}`)
        .then(response => response.text())
        .then(scores => { 
            scores = JSON.parse(scores)["scores"]
            for (i = 0; i < scores.length; i++) {
                s = scores[i]
                let passed = "yes"
                if (s[1] > 5) passed = "no"
                scoreData += row.replace("[position]", i+1).replace("[name]", s[0]).replace("[score]", s[1]).replace("[passed]", passed)
            }
            data = data.replace("[scoreData]", scoreData)
            content.innerHTML = data
        })
    })
    .catch(function(error) {
        console.log(error)
    })
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
