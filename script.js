const audio = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");

let songs = [];
let currentIndex = 0;

/* LOAD JSON */
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    songs = data;
    render();
  });

/* COVER RANDOM */
function getCover(title) {
  return `https://source.unsplash.com/200x200/?anime,music,${encodeURIComponent(title)}`;
}

/* RENDER LIST */
function render() {
  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";

    div.innerHTML = `
      <div class="cover" style="background-image:url('${getCover(song.title)}')"></div>
      <div>${song.title}</div>
    `;

    div.onclick = () => playMusic(i);
    list.appendChild(div);
  });
}

/* PLAY */
function playMusic(i) {
  currentIndex = i;
  audio.src = encodeURI(songs[i].file);
  audio.play();
  playBtn.innerText = "⏸";
  nowPlaying.innerText = "Now Playing: " + songs[i].title;
}

/* TOGGLE */
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

/* AUTO NEXT */
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  playMusic(currentIndex);
});

/* VISUALIZER */
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 60;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / bufferLength;

  dataArray.forEach((v, i) => {
    ctx.fillStyle = "orange";
    ctx.fillRect(i * barWidth, canvas.height - v, barWidth - 2, v);
  });
}

draw();
