/* TODO
*		Add play/pause song
*		Add song titles and pictures
*		Add swtich songs
*		Add progress bar
*		Add current song time and duration for that song
*		Add setting the current time with the mouse
*/
const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('currTime');
const durationTimeEl = document.getElementById('durTime');

const songs = ['hey', 'summer', 'ukulele', 'soon', 'arigadam', '12'];
let songIndex = 5;

function loadSound(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}
loadSound(songs[songIndex]);

function PlaySong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? pauseSong() : PlaySong();
});

function prevSong(){
    songIndex --;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSound(songs[songIndex]);
    PlaySong();
}

function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSound(songs[songIndex]);
    PlaySong();
}
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent =  (currentTime / duration)*100;
    progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

function durationTime(e){
    const {duration, currentTime} = e.srcElement;
    currentTimeEl.innerHTML = formatDuration(currentTime);
    durationTimeEl.innerHTML = formatDuration(duration);
}

function formatDuration(seconds){
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    const result = `${min < 10 ? '0'+min : min} : ${sec < 10 ? '0'+sec : sec}`;
    return seconds ? result : '00 : 00' ;
}

audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', durationTime);