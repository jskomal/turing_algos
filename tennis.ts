class Tennis {
  p1SetWins: number
  p2SetWins: number
  gameHistory: number[][]

  constructor() {
    this.p1SetWins = 0
    this.p2SetWins = 0
    this.gameHistory = []
  }

  scoreGame = (input: string) => {
    const scoresInput = input.split('')
    const playerScores: number[] = [0, 0]
    if (this.p1SetWins === 6 && this.p2SetWins === 6) {
      this.playTieBreaker(scoresInput, playerScores)
    } else {
      scoresInput.forEach((score) => {
        this.addGameScore(score, playerScores)
      })
      this.calculateSetScore(playerScores)
      this.checkForWin()
    }
  }

  addGameScore = (player: string, playerScores: number[]) => {
    if (player === 'a') {
      switch (playerScores[0]) {
        case 0:
          playerScores[0] = 15
          break
        case 15:
          playerScores[0] = 30
          break
        case 30:
          playerScores[0] = 40
          break
        case 40:
          if (playerScores[1] === 40) {
            playerScores[0] = 45
          } else {
            playerScores[0] = 50
          }
          break
        case 45:
          if (playerScores[1] === 45) {
            playerScores[1] = 40
          } else {
            playerScores[0] = 50
          }
          break
        case 50:
          console.log('score overflow')
      }
    } else {
      switch (playerScores[1]) {
        case 0:
          playerScores[1] = 15
          break
        case 15:
          playerScores[1] = 30
          break
        case 30:
          playerScores[1] = 40
          break
        case 40:
          if (playerScores[0] === 40) {
            playerScores[1] = 45
          } else {
            playerScores[1] = 50
          }
          break
        case 45:
          if (playerScores[0] === 45) {
            playerScores[0] = 40
          } else {
            playerScores[1] = 50
          }
          break
        case 50:
          console.log('score overflow')
      }
    }
  }

  calculateSetScore = (playerScores: number[]) => {
    const winner = playerScores.indexOf(50)
    if (winner === 0) this.p1SetWins++
    if (winner === 1) this.p2SetWins++
    if (winner === -1) console.log('no winner found')
    this.gameHistory.push(playerScores)
  }

  checkForWin = () => {
    if (this.p1SetWins > 5 && this.p1SetWins >= this.p2SetWins + 2) {
      console.log('Player 1 wins!!!')
    } else if (this.p2SetWins > 5 && this.p2SetWins >= this.p1SetWins + 2) {
      console.log('Player 2 wins!!!')
    }
  }

  playTieBreaker = (scoresInput: string[], playerScores: number[]) => {
    scoresInput.forEach((score) => {
      if (playerScores[0] < 6 && playerScores[1] < 6) {
        if (score === 'a') {
          playerScores[0]++
        } else {
          playerScores[1]++
        }
      } else {
        if (score === 'a' && playerScores[0] + 1 - playerScores[1] >= 2) {
          playerScores[0]++
          this.p1SetWins++
          this.gameHistory.push(playerScores)
          console.log('Player 1 wins via Tiebreaker!')
        } else if (score === 'b' && playerScores[1] + 1 - playerScores[0] >= 2) {
          playerScores[1]++
          this.p2SetWins++
          this.gameHistory.push(playerScores)
          console.log('Player 2 wins via Tiebreaker!')
        } else if (score === 'a') {
          playerScores[0]++
        } else if (score === 'b') {
          playerScores[1]++
        }
      }
    })
    console.log(this)
  }

  showScore = () => {
    console.log(
      `The set count is ${this.p1SetWins} to ${
        this.p2SetWins
      }. The last game's score was ${this.gameHistory[this.gameHistory.length - 1]}`
    )
  }
}

const p1WinsTest = () => {
  const test = new Tennis()
  test.scoreGame('aababbaa')
  test.scoreGame('aaaa')
  test.scoreGame('bbbb')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
}

const p2WinsTest = () => {
  const test = new Tennis()
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
}

const p1WinsTiebreakerTest = () => {
  const test = new Tennis()
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('bbbb')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
  test.scoreGame('aaaa')
  test.scoreGame('bbbb')
  test.scoreGame('aaaaabbbbbabbaaa')
  test.showScore()
}

// p2WinsTest()
p1WinsTiebreakerTest()
