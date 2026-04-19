const songs = [
  { title: "Masih Kamu", file: "music/Sevran Ai - Masih Kamu.mp3" },
  { title: "Kalau Bukan Kamu", file: "music/Sevran ai - Kalau Bukan Kamu.mp3" },
  { title: "Rumah Yang Salah", file: "music/Sevran ai - Rumah Yang Salah.mp3" },
  { title: "Yang Paling Ku Percaya", file: "music/Sevran ai - Yang Paling Ku Percaya.mp3" },
  { title: "Saat", file: "music/Sevran ai - Saat.mp3" }
];

const audio = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");

let currentIndex = 0;

/* AUTO COVER */
function getCover(title) {
  return `https://source.unsplash.com/300x300/?anime,music,${encodeURIComponent(title)}`;
}

/* RENDER */
songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "track";

  div.innerHTML = `
    <div class="cover" style="background-image:url('${getCover(song.title)}')"></div>
    <div>
      <b>${song.title}</b>
    </div>
  `;

  div.onclick = () => playMusic(i);
  list.appendChild(div);
});

/* PLAY */
function playMusic(i) {
  currentIndex = i;
  audio.src = encodeURI(songs[i].file);

  audio.play().then(() => {
    playBtn.innerText = "⏸";
    document.body.classList.add("playing");

    // penting buat browser modern
    audioCtx.resume();
  }).catch(err => {
    console.log("Play error:", err);
  });

  nowPlaying.innerText = songs[i].title;
}

/* TOGGLE */
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    audioCtx.resume();
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
canvas.height = 100;

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
    ctx.fillStyle = `hsl(${v * 2}, 100%, 50%)`;
    ctx.fillRect(i * barWidth, canvas.height - v, barWidth - 2, v);
  });
}

draw();