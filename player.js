import audios from "./data.js";
import { path } from "./utils.js";
import elements from "./playerElements.js";
import { secondsToMinutes } from "./utils.js";

export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  isPlaying: false,
  start() {
    elements.get.call(this);
    this.update();
  },
  play() {
    this.isPlaying = true;
    this.audio.play();
    this.playPause.innerHTML = "";
    this.playPause.insertAdjacentHTML(
      "beforeend",
      `<i class="fas fa-pause"></i>`
    );
  },
  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.playPause.innerHTML = "";
    this.playPause.insertAdjacentHTML(
      "beforeend",
      `<i class="fas fa-play"></i>`
    );
  },
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else this.play();
  },
  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.vol.innerHTML = "";
    if (this.audio.muted) {
      this.vol.insertAdjacentHTML(
        "beforeend",
        `<svg class="svg-color" role="presentation" height="16" width="16" aria-label="Volume désactivé" id="volume-icon" viewBox="0 0 16 16" class="Svg-ulyrgf-0 ghlXvf"><path d="M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z"></path></svg>`
      );
    } else {
      this.vol.insertAdjacentHTML(
        "beforeend",
        `  <svg
            class="svg-color"
            role="presentation"
            height="16"
            width="16"
            aria-label="Volume élevé"
            id="volume-icon"
            viewBox="0 0 16 16"
            class="Svg-ulyrgf-0 ghlXvf"
          >
            <path
              d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"
            ></path>
          </svg>`
      );
    }
  },

  next() {
    this.currentPlaying++;
    if (this.currentPlaying === this.audioData.length) this.restart();
    this.update();
    this.play();
  },
  setVolume(value) {
    this.audio.volume = value / 100;
  },
  setSeek(value) {
    this.audio.currentTime = value;
  },
  timeUpdate(){
      this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
      this.seekbar.value = this.audio.currentTime;
  },
  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.cover.style.background = `url('${path(
      this.currentAudio.cover
    )}') no-repeat center center /
          cover`;
    this.title.innerText = this.currentAudio.title;
    this.artist.innerText = this.currentAudio.artist;
    elements.createAudioElement.call(this, path(this.currentAudio.file));
   
    this.audio.onloadeddata = () => {
        elements.actions.call(this);
    }
  },
  restart() {
    this.currentPlaying = 0;
    this.update();
  },
};
