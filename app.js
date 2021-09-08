//doms
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
let audioPlayer = document.createElement('audio');
const cover = document.querySelector('.cover');// 封面
const title = document.querySelector('.title');// 標題
const content = document.querySelector('.content');// 內文
const playSchedule = document.querySelector('.playSchedule');
const lastBtn = document.querySelector('.last')
const nextBtn = document.querySelector('.next');
const playTimeNow = document.querySelector('.playTimeNow');
const playDuration = document.querySelector('.playDuration');
const playBar = document.querySelector('.playBar');
const nowTime = document.querySelector('.time');
//宣告變數
let listNow = 0;
let switchBtn = true;
let cutMoveBol = false ;
let musicDuration =function(){
  const min = Math.floor(audioPlayer.duration / 60);
  const sec = (audioPlayer.duration % 60).toFixed(0);
  return `${min < 10 ?  '0' + min.toString() :min.toString()}:${sec < 10 ? '0' + sec :sec}`
}
let musicNow = function(){
  const now = (audioPlayer.currentTime).toFixed(0);
  const min = Math.floor(now / 60);
  const sec = Math.floor(now % 60);
  return `${min < 10 ?  '0' + min.toString() :min.toString()}:${sec < 10 ? '0' + sec :sec}`
}
let timing = function () {
  const date = new Date();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${min}:${sec}`;
}

function setMusic(i) { //設置當前音樂
  audioPlayer.src =musicList[i].musicAddress;
  setTimeout(() => {
    playDuration.textContent = musicDuration();
  },50)
  cover.style = `background : url("${musicList[i].cover} no-repeat;
  background-size : cover;
  background-position: center;`;
  title.textContent = musicList[i].musicName;
  content.textContent = musicList[i].musicContent;
  audioPlayer.volume = 0.2;
  switchBtn = false;
  playBtnSwitch();
}
function last() {// 上一首
  if(listNow === 0) {
    listNow = musicList.length - 1;
  }else{
    listNow-- ;
  }
  setMusic(listNow);
}
function next() { // 下一首
  if(musicList.length-1 === listNow){
    listNow = 0;
  }else{
    listNow++;
  }
  setMusic(listNow);
}
function musicPlay(){// 播放當前音樂
    audioPlayer.play();
    playBtnSwitch();
    switchBtn = true;
    playBtnSwitch(switchBtn);
}
function runningSchedule() {//進度條進度
  const now = ((audioPlayer.currentTime).toFixed(0)) / audioPlayer.duration;
  const percent = 100-(now.toFixed(2)*100).toFixed(0);
  playSchedule.style.right = `${percent}%`
  if(!percent){
    switchBtn = false;
    playBtnSwitch();
  }
}
function playBtnSwitch() {//轉換播放/暫停
  if(switchBtn){
    playBtn.classList.add('none');
    pauseBtn.classList.remove('none');
  }else{
    playBtn.classList.remove('none');
    pauseBtn.classList.add('none');
  }
}
function musicPause() {// pause
    playBtn.classList.remove('none');
    pauseBtn.classList.add('none');
    audioPlayer.pause();
}
function cutMusic(e){//切換時間
  e.stopPropagation();
  const targetSchedule = (e.offsetX / playBar.clientWidth);
  const time = Math.floor(targetSchedule * audioPlayer.duration);
  const percent = Math.floor(targetSchedule * 100);
  audioPlayer.currentTime = time ;
}
audioPlayer.addEventListener('timeupdate',() => {
  runningSchedule();
  playTimeNow.textContent = musicNow();
})

setInterval(() => {//左上角時間
  nowTime.textContent = timing();
}, 1000);

playBtn.addEventListener('click',musicPlay);
pauseBtn.addEventListener('click',musicPause);
nextBtn.addEventListener('click',next);
lastBtn.addEventListener('click',last);
playBar.addEventListener('click',cutMusic);
setMusic(0);