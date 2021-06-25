import { secondsToMinutes } from "./utils.js";

export default {
    get(){
        this.cover = document.querySelector(".card-img-bottom");
        this.title = document.querySelector(".direction-bar h6");
        this.artist = document.querySelector(".direction-bar p");
        this.playPause = document.querySelector(".play-bottom");
        this.vol = document.querySelector("#vol");
        this.volume = document.querySelector("#vol-control");
        this.seekbar = document.querySelector("#seekbar");
        this.currentDuration = document.querySelector("#current-duration");
        this.totalDuration = document.querySelector("#total-duration");
    },
    createAudioElement(audio){
        this.audio = new Audio(audio);
    },
    actions(){
        this.audio.onended = () => this.next();
        this.audio.ontimeupdate = () => this.timeUpdate();
        this.playPause.onclick = () => this.togglePlayPause();
        this.vol.onclick = () => this.toggleMute();
        this.volume.oninput = () => this.setVolume(this.volume.value);
        this.volume.onchange = () => this.setVolume(this.volume.value);
        this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
        this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
        this.seekbar.max = this.audio.duration;
        this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
    }
}