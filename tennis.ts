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
    scoresInput.forEach((score) => this.addGameScore(score, playerScores))
    this.calculateSetScore(playerScores)
    this.checkForWin()
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
    if (winner === -1) console.log('an error has occured')
    this.gameHistory.push(playerScores)
    console.log(this)
  }

  checkForWin = () => {
    if (this.p1SetWins > 5 && this.p1SetWins >= this.p2SetWins + 2) {
      console.log('Player 1 wins!!!')
    } else if (this.p2SetWins > 5 && this.p2SetWins >= this.p1SetWins + 2) {
      console.log('Player 2 wins!!!')
    }
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
  test.scoreGame('aaaa')
}

// p2WinsTest()
p1WinsTiebreakerTest()
