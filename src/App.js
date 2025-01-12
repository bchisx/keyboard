import handleKeyDown from './controller';
import React from 'react';
import { Howl, Howler } from 'howler';
import './App.css';
import sound from './1.ogg';

function App() {
  const whiteKeys = [];
  const blackKeys = [];
  let blackKeySet = [];
  let whiteKeySet = [];
  const blackKeyPattern = [1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 1];
  let patternIndex = 0;

  const baseFrequency = 261.63; // frequency of middle c
  const ratio = Math.pow(2, 1 / 12); 

  const sounds = {};
  for (let i = 1; i <= 71; i++) {
    const frequency = baseFrequency * Math.pow(ratio, i - 28);
    sounds[i] = new Howl({ src: [sound], rate: frequency / baseFrequency });
  }

  const playSound = (key) => {
    if (sounds[key]) {
      sounds[key].play();
    }
  };

  for (let i = 1; i <= 71; i++) {
    if ([2, 5, 7, 10, 12, 14, 17, 19, 22, 24, 26, 29, 31, 34, 36, 38, 41, 43, 46, 48, 50, 53, 55, 58, 60, 62, 65, 67, 70].includes(i)) {
      blackKeySet.push(<button key={i} className="App-button black-key" onClick={() => playSound(i)}>{i}</button>);
      if (blackKeySet.length === blackKeyPattern[patternIndex]) {
        blackKeys.push(<div key={`set-${i}`} className="black-key-set">{blackKeySet}</div>);
        blackKeySet = [];
        patternIndex = patternIndex + 1;
      }
    } else {
      whiteKeySet.push(<button key={i} className="App-button white-key" onClick={() => playSound(i)}>{i}</button>);
      if (whiteKeySet.length === 2) {
        whiteKeys.push(<div key={`set-${i}`} className="white-key-set">{whiteKeySet}</div>);
        whiteKeySet = [];
      }
    }
  }
  if (blackKeySet.length > 0) {
    blackKeys.push(<div key={`set-${blackKeySet.length}`} className="black-key-set">{blackKeySet}</div>);
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="keyboard-container">
          <div className="keyboard white-keys">
            {whiteKeys}
          </div>
          <div className="keyboard black-keys">
            {blackKeys}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
