const songs = [
  { title: "Masih Kamu", file: "music/masih-kamu.mp3" },
  { title: "Kalau Bukan Kamu", file: "music/kalau-bukan-kamu.mp3" },
  { title: "Rumah Yang Salah", file: "music/rumah.mp3" },
  { title: "Yang Paling Ku Percaya", file: "music/Yang Paling Ku Percaya.mp3" },
  { title: "Saat", file: "music/Saat.mp3" }
];
];

const audio = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");
const coverPlayer = document.getElementById("coverPlayer");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let currentIndex = 0;

/* COVER RANDOM */
function getCover(title) {
  return `https://source.unsplash.com/200x200/?anime,music`;
}

/* RENDER */
function render() {
  list.innerHTML = ""; // reset biar gak dobel

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";

    div.innerHTML = `
      <img src="${getCover(song.title)}">
      <div>${song.title}</div>
    `;

    div.onclick = () => playMusic(i);
    list.appendChild(div);
  });
}

render();

/* PLAY */
function playMusic(i) {
  currentIndex = i;

  audio.src = songs[i].file;
  audio.load();

  audio.play().catch(err => console.log("Play error:", err));

  nowPlaying.innerText = "Now Playing: " + songs[i].title;
  coverPlayer.src = getCover(songs[i].title);
  playBtn.innerText = "⏸";
}

/* PLAY/PAUSE */
function togglePlay() {
  if (audio.paused) {
    audio.play().catch(err => console.log(err));
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

/* NEXT */
function next() {
  currentIndex = (currentIndex + 1) % songs.length;
  playMusic(currentIndex);
}

/* PREV */
function prev() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playMusic(currentIndex);
}

/* AUTO NEXT */
audio.addEventListener("ended", next);

/* PROGRESS UPDATE */
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

/* SEEK */
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

/* VOLUME */
volume.value = 0.7; // default
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
