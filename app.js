/*dom*/ 
const timeNow = document.querySelector('.time');
const audio = document.createElement('audio');
const musicTitle = document.querySelector('.musicTitle');
const musicImg = document.getElementById('musicImg');
const playDuration = document.querySelector('.playDuration');
const playSchedule = document.querySelector('.playTimeNow');
const percentSchedule = document.querySelector('.playSchedule');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const lastBtn = document.querySelector('.last');
const nextBtn = document.querySelector('.next');
const playBar = document.querySelector('.playBar');
/* 變數 */
let musicIndex = 0;
let playOff = true;

/* functions */
/** 現在時間設置 */
function dateNow(date){
  const min = date.getHours();
  const sec = date.getMinutes();
  return `${min >= 10 ?min:'0'+min}:${sec >= 10 ?sec:'0'+sec}`;
}
function setTimeNow(){
  setInterval(() => {
    const date = new Date();
    timeNow.textContent = dateNow(date);
  },1000);
}
/** set play music now */
function musicIndexAdd(){
  if(musicIndex === musicList.length-1){
    musicIndex = 0;
  }else{
    musicIndex++;
  }
  playOff = true;
  setMusic()
  btnMode()
}
function musicIndexDecrease(){
  if(musicIndex === 0){
    musicIndex = musicList.length-1;
  }else{
    musicIndex--;
  }
  playOff = true;
  setMusic()
  btnMode()
}
/** audio duration change */
function durationChange() {
  const min = Math.floor(audio.duration / 60);
  const sec = (audio.duration % 60).toFixed();
  playDuration.textContent = `${min}:${sec}`;
}
/** schedule change */
function schedule(time) {
  const min = Math.floor(time / 60);
  const sec = (time % 60).toFixed();
  return `${min >= 10?min:'0'+min}:${sec >= 10? sec:'0'+sec}`
}
/** percent change */
function percentChange(currentTime,duration){
  const percent = ((currentTime / duration)*100).toFixed(0);
  return 100-percent;
}
function setMusic(){
  audio.src = musicList[musicIndex].musicAddress;
  musicTitle.children[0].textContent = musicList[musicIndex].musicName;
  musicTitle.children[1].textContent = musicList[musicIndex].musicContent;
  musicImg.src = `styles/images/${musicList[musicIndex].cover}`;
  setTimeout(durationChange,100);
}
function btnMode(){
  if(playOff){
    playBtn.classList.remove('none');
    pauseBtn.classList.add('none');
  }else{
    playBtn.classList.add('none');
    pauseBtn.classList.remove('none');
  }
}
function playAudio() {
  audio.play();
  playOff =false;
  btnMode()
}
function pauseAudio() {
  audio.pause();
  playOff = true;
  btnMode()
}

function clickSchedule(e){
  const percent = (e.offsetX / playBar.offsetWidth);
  audio.currentTime = audio.duration * percent;
}

audio.addEventListener('timeupdate',() => {
  const { currentTime,duration } = audio;
  playSchedule.textContent = schedule(currentTime);
  percentSchedule.style = `right:${percentChange(currentTime,duration)}%`;
})
playBtn.addEventListener('click',playAudio);
pauseBtn.addEventListener('click',pauseAudio);
nextBtn.addEventListener('click',musicIndexAdd);
lastBtn.addEventListener('click',musicIndexDecrease);
playBar.addEventListener('click',clickSchedule);
setTimeNow();
setMusic();