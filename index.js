let colors = []
let followedColors = []
let roundTime = 1000
let count = 0
const primary = {
  'green': '',
  'red': '',
  'yellow': '',
  'blue': ''
}
const sounds = {
  'green': './sounds/sound1.mp3',
  'red': './sounds/sound2.mp3',
  'yellow': './sounds/sound3.mp3',
  'blue': './sounds/sound4.mp3',
  'wrong': './sounds/wrong_answer.wav'
}

const buttons = Array.from(document.querySelectorAll('.grow'))

buttons.forEach(el => {
  primary[el.dataset.color] = el
  el.addEventListener('click', function() {
    playSound(el.dataset.color)
    playTheGame(el)
  })
})

function playTheGame(button) {
  followedColors.push(button.dataset.color)
  if (checkAccuracy()) {
    if (enoughColors()) {
      incrementCount()
      speedUpGame()
      followedColors = []
      colors.push(randomColor())
      let time = 0
      colors.forEach(color => {
        time += roundTime
        setTimeout(function() {
          displaySound(color)
        }, time)
      })
    }
  } else {
    resetGame()
  }
}

function startGame() {
  colors.push(randomColor())
  setTimeout(function() {
    colors.forEach(color => {
      displaySound(color)
    })
  }, 1500)
}

function randomColor() {
  return Object.keys(primary)[Math.floor(Math.random() * 4)]
}

function displaySound(color) {
  let el = primary[color]
  el.className += ` ${color}-hover`
  playSound(color)
  setTimeout(function() {
    el.classList.remove(`${color}-hover`)
  }, 500)
}

function newColor() {
  colors.push(randomColor())
}

function enoughColors() {
  return colors.length == followedColors.length
}

function checkAccuracy() {
  return followedColors.every((color, i) => {
    return color === colors[i]
  })
}

function speedUpGame() {
  console.log('going faster now')
  roundTime -= 50
  return roundTime > 100 ? roundTime : 100
}

function incrementCount() {
  count += 1
  document.querySelector('.black-circle').innerText = count
}

startGame()

function playSound(color) {
  let sound = new Audio(sounds[color])
  sound.play()
}

function resetGame() {
  colors = []
  followedColors = []
  count = 0
  document.querySelector('.black-circle').innerText = count
  playSound('wrong')
  startGame()
}
