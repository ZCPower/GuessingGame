alert('Oh no! Winter is apporaching and you are a long way from home. With no idea where you are, you have to guess on the correct route home. I would say your odds are 1 in 100. Good luck')

const guessBtn = document.getElementById('guessButton');
const body = document.body;
const resetBtn = document.getElementById('resetButton');
const squirrel = document.getElementById('squirrelImg');
const guessValue = document.getElementById('guess')
const distanceHint = document.getElementById('distanceHint');
const directionHint = document.getElementById('directionHint');
const heading = document.getElementById('heading');
const guessList = document.getElementById('guessTracker')
const hintBtn = document.getElementById('hintButton')
let pastGuesses = [];
let hintArray = []

hintBtn.style.display = 'none'

function addToGuessArray() {
    if (game.playersGuess() >= 1 && game.playersGuess() < 100 && game.playersGuess() !== NaN && game.playersGuess() !== undefined) {
        if (game.playersGuess() !== game.winningNumber) {
            pastGuesses.push(guessValue.value)
            console.log(pastGuesses)
            let newestGuess = document.createElement('li');
            guessList.appendChild(newestGuess)
            newestGuess.innerText = game.playersGuess();
        } else {
            alert('You won!!')
        }
    } else {
        alert('Please enter a number between 1-100')
    }
    if (pastGuesses.length > 0) hintBtn.style.display = 'flex'

    if (pastGuesses.length >= 5) winter();
    game.checkGuess()
    game.isLower();
}

function pressGuess() {
    addToGuessArray();
    game.checkGuess;
}

function pressReset() {
    resetImages();
    pastGuesses = []
    generateWinningNumber();
    removeAllGuesses()
    guessBtn.style.display = 'flex';
    hintBtn.style.display = 'none';
    game.winningNumber = generateWinningNumber();
}

function removeAllGuesses() {
    while (guessList.firstChild) {
        guessList.removeChild(guessList.firstChild);
    }
}

function winter() {
    body.style.backgroundImage = "url('https://i.ibb.co/4JdhsVq/winter.jpg')";
    body.style.backgroundSize = '100vw';
    squirrel.src = 'https://i.ibb.co/X86WLRf/squirrel-Dead.png';
    squirrel.style.transform = 'scale(-1, -1)';
    squirrel.style.bottom = '-1%';
    heading.innerText = 'You are dead. Please restart.'
    alert('You lose!')
    guessBtn.style.display = 'none';
}

function resetImages() {
    body.style.backgroundImage = "url('https://i.ibb.co/rMC74Pd/forest.jpg')";
    squirrel.src = 'https://i.ibb.co/QJs0JpX/squirrel-Rotate.png'
    squirrel.style.transform = 'scaleY(1)';
    squirrel.style.bottom = '5vh';
    heading.innerText = 'Guess the Number!'
    distanceHint.innerText = 'Guess a number between'
    directionHint.innerText = '1 and 100!'
}

//generate Winning Number



//rearrange hintArray
function shuffle(array) {
    let shuffledArray = [];
    let roll = Math.floor(Math.random() * 6) + 1;
    // console.log(roll)
    if (roll === 1) {
        shuffledArray = array;
    } else if (roll === 2) {
        shuffledArray.push(array[0]);
        shuffledArray.push(array[2]);
        shuffledArray.push(array[1]);
    } else if (roll === 3) {
        shuffledArray.push(array[1]);
        shuffledArray.push(array[2]);
        shuffledArray.push(array[0])
    } else if (roll === 4) {
        shuffledArray.push(array[1]);
        shuffledArray.push(array[0]);
        shuffledArray.push(array[2])
    } else if (roll === 5) {
        shuffledArray.push(array[2]);
        shuffledArray.push(array[0]);
        shuffledArray.push(array[1])
    } else if (roll === 6) {
        shuffledArray.push(array[2]);
        shuffledArray.push(array[1]);
        shuffledArray.push(array[0])
    }

    return shuffledArray;
}


//create newGame object
function newGame() {
    const game = {
        playersGuess: function () {
            guess = parseInt(guessValue.value)
            return guess
        },
        checkGuess: function () {
            if (this.difference() === this.winningNumber) {
                distanceHint.innerHTML = "Input a number between 1 and 100!"
            }
            else if (this.difference() < 10) {
                console.log("You're burning up!")
                distanceHint.innerHTML = "You're burning up!"
            }
            else if (this.difference() < 25) {
                console.log("You're lukewarm ")
                distanceHint.innerHTML = "You're lukewarm "
            }
            else if (this.difference() < 50) {
                console.log('chilly')
                distanceHint.innerHTML = "You're a bit chilly. "
            }
            else {
                console.log('icecold')
                distanceHint.innerHTML = "You're ice cold! "
            }
        },
        playersGuessSubmission: function () {
            guess = parseInt(guessValue.value)
            if (guess > 1 && guess < 100 && guess !== NaN) {
                this.checkGuess()
            } else {
                throw 'That is an invalid guess.'
            }
        },
        winningNumber: generateWinningNumber(),
        difference: function () {
            let diff = Math.abs(this.playersGuess() - this.winningNumber);
            return diff
        },
        provideHint: function () {
            let array = [];
            array.push(this.winningNumber);
            hintArray.push(this.winningNumber);

            for (let i = 1; i <= 2; i++) {
                let lowerOrHigher = Math.floor(Math.random() * 2) + 1 //randomizer that randomly generates whether a hint is higher or less than the guessed number
                // console.log(lowerOrHigher)
                //generate a two random numbers
                if (lowerOrHigher === 1) {
                    // console.log('Higher than winning number');
                    let addToWinningNumber = Math.floor(Math.random() * this.difference() + 1);
                    // console.log(addToWinningNumber)
                    let valueSum = this.winningNumber + addToWinningNumber;
                    if (valueSum > 100) {
                        valueSum = 100
                    }
                    array.push(valueSum)
                    hintArray.push(valueSum)
                } else if (lowerOrHigher === 2) {
                    // console.log('Lower than winning number')
                    let subtractFromWinningNumber = Math.floor(Math.random() * this.difference() + 1);
                    // console.log(subtractFromWinningNumber)
                    let valueDiff = this.winningNumber - subtractFromWinningNumber;
                    if (valueDiff < 1) {
                        valueDiff = 1
                    }
                    array.push(valueDiff)
                    hintArray.push(valueDiff)
                }
            }

            return shuffle(array);
        },
        isLower: function () {
            if (this.playersGuess() < this.winningNumber) directionHint.innerText = 'Guess higher!';
            else directionHint.innerText = 'Guess lower!'


        }
    }
    return game
}

let game = newGame();

function generateWinningNumber() {
    let randNum = Math.floor((Math.random() * 100) + 1)
    return randNum
}

// guessBtn.addEventListener('click', game.playersGuess);
// guessBtn.addEventListener('click', game.checkGuess())
guessBtn.addEventListener('click', addToGuessArray)
resetBtn.addEventListener('click', pressReset);
hintBtn.addEventListener('click', function () {
    game.provideHint();
    directionHint.innerText = `The number is either ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}!`
})
