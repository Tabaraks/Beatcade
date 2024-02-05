import * as Tone from "tone";
import { inputToNote, noteToInput } from "../../helper/midi";
export class AudioManager {
  constructor(url) {
    this.sustain = false;
    this.synthQueue = [];
    // this.sampler = null;
    this.initSampler();
  }
  initSampler = function () {
    return new Promise((resolve, reject) => {
      const samplerTemp = new Tone.Sampler({
        urls: {
          C3: "C3.13.mp3",
          "D#3": "Eb3.16.mp3",
          "F#3": "Gb.19.mp3",
          A3: "A3.22.mp3",
          C4: "Deimos.wav",
          D4: "IO.wav",
          E4: "Kerberos.wav",
          F4: "Luna.wav",
          G4: "Neso.wav",
        },
        curve: "exponential",
        attack: 0,
        release: 1,
        volume: 3,
        baseUrl: "/sampler/MP3s/",
        onload: () => {
          console.log("Audio files loaded successfully");
          resolve();
        },
        onerror: (error) => {
          console.error("Error loading audio files:", error);
          reject(error);
        },
      }).toDestination();

      this.sampler = samplerTemp;
    });
  };

  playSound = async function (input, volume) {
    if (this.sustain) {
      let newArray = [];
      this.synthQueue.forEach((note) => {
        if (note !== inputToNote(input)) {
          newArray.push(note);
        }
      });
      this.synthQueue = newArray;
    }

    if (
      volume &&
      this.sampler.volume.value !== Math.floor((volume * 20) / 127 - 10)
    ) {
      this.sampler.volume.rampTo(Math.floor((volume * 20) / 127 - 10), 0.1);
    }
    this.sampler.triggerAttack(inputToNote(input), Tone.now() - 0.1);
  };

  stopSound = function (input) {
    if (this.sustain) {
      const newArray = [...this.synthQueue];
      newArray.push(inputToNote(input));
      this.synthQueue = newArray;
    } else {
      this.sampler.triggerRelease(inputToNote(input), Tone.now());
    }
  };

  releaseSustainPedal = function () {
    this.sampler.triggerRelease(this.synthQueue);
    // this.sustainPedalOn = false;
    this.synthQueue = [];
  };

  setSustain = function () {
    this.sustain = true;
  };

  releaseSustain = function () {
    this.sampler.triggerRelease(this.synthQueue);
    this.synthQueue = [];
    this.sustain = false;
  };
}
