let music = [];
let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const player = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const search = document.getElementById("search");

// load data
fetch("music.json")
.then(res=>res.json())
.then(data=>{
  music = data;
  renderMusic(music);
});

// render
function renderMusic(data){
  list.innerHTML="";
  data.forEach((m,i)=>{
    list.innerHTML+=`
    <div class="card">
      <h3>${m.title}</h3>
      <div class="play-btn" onclick="playMusic(${i})">▶</div>
      <div class="like" onclick="like('${m.title}')">❤️</div>
    </div>`;
  });
}

// play
function playMusic(i){
  currentIndex=i;
  player.src=music[i].file;
  player.play();
  isPlaying=true;
  playBtn.innerText="⏸";
  nowPlaying.innerText=music[i].title;
  localStorage.setItem("last", i);
}

// controls
function togglePlay(){
  if(isPlaying){player.pause(); playBtn.innerText="▶";}
  else{player.play(); playBtn.innerText="⏸";}
  isPlaying=!isPlaying;
}

function next(){
  currentIndex = isShuffle ? Math.floor(Math.random()*music.length) : currentIndex+1;
  if(currentIndex>=music.length) currentIndex=0;
  playMusic(currentIndex);
}

function prev(){
  currentIndex--;
  if(currentIndex<0) currentIndex=music.length-1;
  playMusic(currentIndex);
}

function toggleShuffle(){isShuffle=!isShuffle;}
function toggleRepeat(){isRepeat=!isRepeat;}

// auto next
player.onended=()=>{
  if(isRepeat) playMusic(currentIndex);
  else next();
};

// progress
player.ontimeupdate=()=>{
  const percent=(player.currentTime/player.duration)*100;
  progress.style.width=percent+"%";
  currentTimeEl.innerText=format(player.currentTime);
  durationEl.innerText=format(player.duration);
};

function seek(e){
  const width=e.currentTarget.clientWidth;
  const click=e.offsetX;
  player.currentTime=(click/width)*player.duration;
}

function format(t){
  if(!t) return "0:00";
  let m=Math.floor(t/60);
  let s=Math.floor(t%60);
  if(s<10) s="0"+s;
  return m+":"+s;
}

// volume
volume.oninput=()=>player.volume=volume.value;

// search
search.oninput=()=>{
  const k=search.value.toLowerCase();
  renderMusic(music.filter(m=>m.title.toLowerCase().includes(k)));
};

// like
function like(title){
  let liked=JSON.parse(localStorage.getItem("liked"))||[];
  if(!liked.includes(title)){
    liked.push(title);
    localStorage.setItem("liked",JSON.stringify(liked));
    alert("Ditambahkan ke favorit");
  }
}

// load last
window.onload=()=>{
  let last=localStorage.getItem("last");
  if(last) playMusic(last);
};
