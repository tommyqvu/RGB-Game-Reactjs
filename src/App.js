import React from 'react';
import classes from './App.module.css';
import Box from './Box';

class App extends React.Component {
  state = {
    difficulty: 3,
    answer: null,
    message: null,
    gameWon: false,
    generatedColors: [],
  };
  componentDidMount() {
    this.initialize();
  }
  randomizeColors() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
  initialize() {
    const { difficulty } = this.state;
    const generatedColors = [];
    // Add random
    for (let i = 0; i < difficulty; i++) {
      generatedColors.push(this.randomizeColors());
    }
    // Pick correct answer
    const answer = Math.floor(Math.random() * difficulty);
    //Return
    this.setState({ generatedColors, answer, message: null, gameWon: false });
  }
  setDifficulty(difficulty) {
    this.setState({ difficulty }, () => this.initialize());
  }
  onBoxClick(rgb) {
    const { generatedColors, answer, difficulty, gameWon } = this.state;
    const pickedColor = generatedColors.indexOf(rgb);
    if (!gameWon) {
      if (pickedColor === answer) {
        const answerColor = [];
        for (let i = 0; i < difficulty; i++) {
          answerColor.push(rgb);
        }
        this.setState({
          message: 'YOU WON!!!',
          generatedColors: answerColor,
          gameWon: true,
        });
      } else {
        const blackedOutArray = [...generatedColors];
        blackedOutArray[pickedColor] = 'rgb(35,35,35)';
        this.setState({ message: 'Try again', generatedColors: blackedOutArray });
      }
    }
  }
  render() {
    const {
      answer,
      generatedColors,
      difficulty,
      gameWon,
      message,
    } = this.state;
    return (
      <div>
        <div className={classes.title}>
          <h1>
            THE
            <br />
            <span className={classes.answer}>{generatedColors[answer]}</span>
            <br />
            GUESSING GAME
          </h1>
        </div>

        <div className={classes.display}>
          <button
            onClick={() => this.initialize()}
            className={[classes.new__colors, classes.col ].join(' ')}
          >
            {!gameWon ? 'NEW COLORS' : 'PLAY AGAIN?'}
          </button>
          <span id='message'>{message}</span>
          <button
            onClick={() => this.setDifficulty(3)}
            className={difficulty === 3 ? classes.selected : null}
          >
            EASY
          </button>
          <button
            onClick={() => this.setDifficulty(6)}
            className={difficulty === 6 ? classes.selected : null}
          >
            HARD
          </button>
        </div>
        <div className={classes.container}>
          {this.state.generatedColors.map(rgb => (
            <Box
              rgbString={rgb}
              key={Math.random()}
              clickable = {!gameWon}
              onBoxClick={() => this.onBoxClick(rgb)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
