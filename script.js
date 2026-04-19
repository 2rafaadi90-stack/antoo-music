const audio = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");

const songs = [
  { title: "Masih Kamu", file: "music/Sevran Ai - Masih Kamu.mp3" },
  { title: "Kalau Bukan Kamu", file: "music/Sevran ai - Kalau Bukan Kamu.mp3" },
  { title: "Rumah Yang Salah", file: "music/Sevran ai - Rumah Yang Salah.mp3" },
  { title: "Yang Paling Ku Percaya", file: "music/Sevran ai - Yang Paling Ku Percaya.mp3" },
  { title: "Saat", file: "music/Sevran ai - Saat.mp3" }
];

let currentIndex = 0;

/* COVER */
function getCover(title) {
  return `https://source.unsplash.com/200x200/?anime,music`;
}

/* RENDER */
songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "track";

  div.innerHTML = `
    <div class="cover" style="background-image:url('${getCover()}')"></div>
    <div>${song.title}</div>
  `;

  div.onclick = () => playMusic(i);
  list.appendChild(div);
});

/* PLAY */
function playMusic(i) {
  currentIndex = i;

  // 🔥 INI FIX PALING PENTING
  audio.src = songs[i].file;

  audio.load();
  audio.play().catch(err => console.log(err));

  nowPlaying.innerText = "Now Playing: " + songs[i].title;
  playBtn.innerText = "⏸";
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
