/* ================= DATA LAGU ================= */
const songs = [
  { title: "Masih Kamu", file: "music/masih-kamu.mp3" },
  { title: "Kalau Bukan Kamu", file: "music/kalau-bukan-kamu.mp3" },
  { title: "Rumah Yang Salah", file: "music/rumah.mp3" },
  { title: "Yang Paling Ku Percaya", file: "music/Yang Paling Ku Percaya.mp3" },
  { title: "Saat", file: "music/Saat.mp3" }
];

/* ================= ELEMENT ================= */
const audio = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");
const coverPlayer = document.getElementById("coverPlayer");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let currentIndex = -1;

/* ================= AUTO COVER (NO IMAGE) ================= */
const defaultCover =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
  "<defs>" +
  "<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
  "<stop offset='0%' stop-color='%23ff512f'/>" +
  "<stop offset='100%' stop-color='%23f09819'/>" +
  "</linearGradient>" +
  "</defs>" +
  "<rect width='200' height='200' fill='url(%23g)'/>" +
  "<text x='50%' y='55%' font-size='22' fill='white' text-anchor='middle'>MUSIC</text>" +
  "</svg>";

/* ================= RENDER LIST ================= */
function render() {
  list.innerHTML = "";

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerHTML = `
      <img src="${defaultCover}">
      <div>${song.title}</div>
    `;
    div.onclick = () => playMusic(i);
    list.appendChild(div);
  });
}

/* ================= PLAY MUSIC ================= */
function playMusic(i) {
  if (currentIndex !== i) {
    audio.src = songs[i].file;
    currentIndex = i;
  }

  audio.play();
  nowPlaying.innerText = "Now Playing: " + songs[i].title;
  coverPlayer.src = defaultCover;
  playBtn.innerText = "⏸";
}

/* ================= PLAY / PAUSE ================= */
function togglePlay() {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

/* ================= NEXT / PREV ================= */
function next() {
  playMusic((currentIndex + 1) % songs.length);
}

function prev() {
  playMusic((currentIndex - 1 + songs.length) % songs.length);
}

/* ================= EVENTS ================= */
audio.addEventListener("ended", next);

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

/* ================= VOLUME ================= */
volume.value = 0.7;
audio.volume = 0.7;
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* ================= INIT ================= */
render();
