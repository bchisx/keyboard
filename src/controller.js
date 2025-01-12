// FILE: Controller.js
import { Howl } from 'howler';
import sound from './1.ogg';

const baseFrequency = 261.63; // frequency of middle c
const ratio = Math.pow(2, 1 / 12);

const sounds = {};
for (let i = 1; i <= 71; i++) {
  const frequency = baseFrequency * Math.pow(ratio, i - 28);
  sounds[i] = new Howl({ src: [sound], rate: frequency / baseFrequency });
}

const keyMap = {
  'A': 1, 'S': 2, 'D': 3, 'F': 4, 'G': 5, 'H': 6, 'J': 7, 'K': 8, 'L': 9, 'a': 10, 's': 11, 'd': 12, 'f': 13, 'g': 14, 'h': 15, 'j': 16, 'k': 17, "l": 18,
  'Q': 19, 'W': 20, 'E': 21, 'R': 22, 'T': 23, 'Y': 24, 'U': 25, 'I': 26, 'O': 27, 'P': 28, 'q': 29, 'w': 30, 'e': 31, 'r': 32, 't': 33, 'y': 34, 'u': 35, 'i': 36,
  'o': 37, 'p': 38, '!': 39, '@': 40, '#': 41, '$': 42, '%': 43, '^': 44, '&': 45, '*': 46, '(': 47, ')': 48, '_': 49, '+': 50, '1': 51, '2': 52, '3': 53, '4': 54,
  '5': 55, '6': 56, '7': 57, '8': 58, '9': 59, '0': 60, '-': 61, '=': 62, 'z': 63, 'x': 64, 'c': 65, 'v': 66, 'b': 67, 'n': 68, 'm': 69, ',': 70, '.': 71
};

const playSound = (key) => {
  if (sounds[key]) {
    sounds[key].play();
  }
};

const handleKeyDown = (event) => {
  const key = keyMap[event.key];
  if (key) {
    playSound(key);
  }
};

const handleMIDIMessage = (message) => {
  const [command, note, velocity] = message.data;
  if (command === 144 && velocity > 0) { 
    playSound(note - 48); 
  }
};

const onMIDISuccess = (midiAccess) => {
  for (const input of midiAccess.inputs.values()) {
    input.onmidimessage = handleMIDIMessage;
  }
};

const onMIDIFailure = () => {
  console.error('Could not access your MIDI devices.');
};

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  console.error('Web MIDI API is not supported in this browser.');
}

document.addEventListener('keydown', handleKeyDown);

export default handleKeyDown;

