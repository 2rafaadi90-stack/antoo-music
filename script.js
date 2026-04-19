let music = [];
let currentIndex = 0;
let isPlaying = false;

const player = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const search = document.getElementById("search");

// ambil data lagu
fetch("music.json")
.then(res=>res.json())
.then(data=>{
  music = data;
  renderMusic(music);
});

// tampilkan lagu
function renderMusic(data){
  list.innerHTML="";
  data.forEach((m,i)=>{
    list.innerHTML+=`
    <div class="card">
      <h3>${m.title}</h3>
      <div class="play-btn" onclick="playMusic(${i})">▶</div>
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
}

// toggle play
function togglePlay(){
  if(isPlaying){
    player.pause();
    playBtn.innerText="▶";
  } else {
    player.play();
    playBtn.innerText="⏸";
  }
  isPlaying=!isPlaying;
}

// next prev
function next(){
  currentIndex++;
  if(currentIndex>=music.length) currentIndex=0;
  playMusic(currentIndex);
}

function prev(){
  currentIndex--;
  if(currentIndex<0) currentIndex=music.length-1;
  playMusic(currentIndex);
}

// progress
player.ontimeupdate=()=>{
  const percent=(player.currentTime/player.duration)*100;
  progress.style.width=percent+"%";
};

// seek
function seek(e){
  const width=e.currentTarget.clientWidth;
  const click=e.offsetX;
  player.currentTime=(click/width)*player.duration;
}

// search
search.oninput=()=>{
  const k=search.value.toLowerCase();
  renderMusic(music.filter(m=>m.title.toLowerCase().includes(k)));
};
