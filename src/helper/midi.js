export const inputToNote = (input) => {
  const NOTES = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const offset = 4;
  const inputOffset = input - offset;
  const size = NOTES.length;
  const octave = Math.floor(inputOffset / size);
  const pos = inputOffset - size * octave;
  const note = `${NOTES[pos]}${octave}`;
  return note;
};

export const noteToInput = (note) => {
  const NOTES = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octave = parseInt(note.slice(-1));
  const noteName = note.slice(0, -1);
  const pos = NOTES.indexOf(noteName);
  const inputOffset = pos + octave * NOTES.length;
  const offset = 4;
  const input = inputOffset + offset;
  return input;
};
