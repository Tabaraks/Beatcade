import * as THREE from "three";
import { AudioManager } from "./AudioManager";
import { inputToNote, noteToInput } from "../../helper/midi";
import { WebMidi } from "webmidi";

export class KeyManager {
  constructor(piano, materials, camera, btnColor) {
    this.pianoGroup = piano;
    this.camera = camera;
    this.materials = materials;
    this.btnColor = btnColor;
    this.clickedMesh = null;
    this.raycaster = new THREE.Raycaster();
    this.audioManager = new AudioManager(
      this.btnColor === "Gold Play"
        ? {
            C3: "IO.wav",
            "D#3": "Kerberos.wav",
            "F#3": "Luna.wav",
            A3: "Lapetus.wav",
            C4: "Deimos.wav",
            D4: "plasma1.wav",
            E4: "plasma2.wav",
            F4: "plasma3.wav",
            G4: "plasma4.wav",
          }
        : this.btnColor === "Purple Play"
        ? {
            C3: "Saw-1.wav",
            "D#3": "Saw-2.wav",
            "F#3": "Saw-3.wav",
            A3: "Saw-4.wav",
            C4: "Saw-5.wav",
            D4: "IO.wav",
            E4: "Kerberos.wav",
            F4: "Luna.wav",
            G4: "Neso.wav",
          }
        : this.btnColor === "Blue Play"
        ? {
            C3: "Neso.wav",
            "D#3": "sem.wav",
            "F#3": "rhea.wav",
            A3: "ariel.wav",
            C4: "tital.wav",
            D4: "IO.wav",
            E4: "Kerberos.wav",
            F4: "Luna.wav",
            G4: "Neso.wav",
          }
        : this.btnColor === "Green Play"
        ? {
            C3: "FullMix1.wav",
            "D#3": "Fullmix2.wav",
            "F#3": "Keysstem.wav",
            A3: "Percstem.wav",
            C4: "FullMix.wav",
            D4: "IO.wav",
            E4: "Kerberos.wav",
            F4: "Luna.wav",
            G4: "Neso.wav",
          }
        : this.btnColor === "White Play"
        ? {
            C3: "HiHatStem3.wav",
            "D#3": "KeysStem3.wav",
            "F#3": "KickStem3.wav",
            A3: "PercStem3.wav",
            C4: "BassStem3.wav",
            D4: "IO.wav",
            E4: "Kerberos.wav",
            F4: "Luna.wav",
            G4: "Neso.wav",
          }
        : null
    );
    //this.keyMeshs = [];
    // this.midiInput = null;

    this.initMaterials();
    this.initKeyMeshs();
    this.onEventHandler();
    this.initWebMidi();
  }

  initMaterials = function () {
    this.normalMat = {
      black: this.materials["MI_Garage_Door_thifef0n_2K.001"],
      white: this.materials["M_SciFiKeyboardKeys.001"],
    };
    const mat = this.materials["NeonBlu"];
    mat.color = new THREE.Color("blue");
    mat.needUpdate = true;
    this.clickMat = mat;
  };

  initKeyMeshs = function (group) {
    const tempArray = [];
    this.pianoGroup.traverse((object) => {
      if (
        object instanceof THREE.Mesh &&
        object.name.split("_")[0] === "SM" &&
        object.name.split("_")[1] === "SciFiMS"
      ) {
        tempArray.push(object);
      }
    });
    this.keyMeshs = tempArray;
  };

  setClickedMesh = function (ev) {
    const uvPoint = new THREE.Vector2(
      (ev.clientX / window.innerWidth) * 2 - 1,
      -(ev.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(uvPoint, this.camera);
    const intersects = this.raycaster.intersectObjects(this.keyMeshs);

    if (intersects.length > 0) {
      const intersection = intersects[0];
      const { object } = intersection;
      this.clickedMesh = object;
    } else {
      this.clickedMesh = null;
    }
  };

  getKeyColor = function (mesh) {
    return mesh.name.split("_")[2].indexOf("#") === -1 ? "white" : "black";
  };

  onEventHandler = function () {
    document.addEventListener("mousedown", this.onClickHandler.bind(this));
    document.addEventListener("mouseup", this.onReleaseHandler.bind(this));
    document.addEventListener("pointerdown", this.onClickHandler.bind(this));
    document.addEventListener("pointerup", this.onReleaseHandler.bind(this));
  };

  pressKey = function (keyMesh) {
    document.body.style.cursor = "grabbing";
    keyMesh.material = this.clickMat;
    keyMesh.rotateX(0.003);
    this.audioManager.playSound(noteToInput(keyMesh.name.split("_")[2]));
  };

  releaseKey = function (keyMesh) {
    document.body.style.cursor = "";
    if (this.getKeyColor(keyMesh) === "white") {
      keyMesh.material = this.normalMat.white;
    } else {
      keyMesh.material = this.normalMat.black;
    }
    keyMesh.rotateX(-0.003);
    this.audioManager.stopSound(noteToInput(keyMesh.name.split("_")[2]));
  };

  onClickHandler = function (ev) {
    this.setClickedMesh(ev);
    if (!this.clickedMesh) return;
    this.pressKey(this.clickedMesh);
  };

  onReleaseHandler = function () {
    if (!this.clickedMesh) return;
    this.releaseKey(this.clickedMesh);
  };

  // web midi device connection

  initWebMidi = async function () {
    await WebMidi.enable(() => {
      if (WebMidi.inputs.length > 0) {
        this.midiInput = WebMidi.inputs[0];
      }
    });

    this.midiInput.addListener("noteon", "all", this.noteOnHandler.bind(this));
    this.midiInput.addListener(
      "noteoff",
      "all",
      this.noteOffHandler.bind(this)
    );
    this.midiInput.addListener(
      "controlchange",
      this.controlChangeHandler.bind(this)
    );
  };

  getMeshFromNote = function (note) {
    const tone = inputToNote(note);
    const clickObject = this.keyMeshs.find(
      (mesh) => mesh.name.split("_")[2] === tone
    );
    return clickObject;
  };

  noteOnHandler = function (ev) {
    const [something, note, volumn] = ev.data;
    const clickObject = this.getMeshFromNote(note - 20);
    if (clickObject) {
      this.pressKey(clickObject);
    } else {
      this.audioManager.playSound(note - 20, volumn);
    }
  };

  noteOffHandler = function (ev) {
    const [something, note, volumn] = ev.data;
    const clickObject = this.getMeshFromNote(note - 20);
    if (clickObject) {
      this.releaseKey(clickObject);
    } else {
      this.audioManager.stopSound(note - 20);
    }
  };

  controlChangeHandler = function (ev) {
    if (ev.controller.name === "damperpedal") {
      if (ev.value) {
        this.audioManager.setSustain();
      } else {
        this.audioManager.releaseSustain();
      }
    }
  };
}
