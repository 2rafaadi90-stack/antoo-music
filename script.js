const songs = [
  { title: "Aku", file: "Sevran Ai - Aku.mp3" },
  { title: "Masih Kamu", file: "Sevran Ai - Masih Kamu.mp3" },
  { title: "Bacot", file: "Sevran ai - Bacot.mp3" },
  { title: "Coba", file: "Sevran ai - Coba.mp3" },
  { title: "Kalau Bukan Kamu", file: "Sevran ai - Kalau Bukan Kamu.mp3" },
  { title: "Ketika", file: "Sevran ai - Ketika.mp3" },
  { title: "Rumah Yang Salah", file: "Sevran ai - Rumah Yang Salah.mp3" },
  { title: "Saat", file: "Sevran ai - Saat.mp3" },
  { title: "Sakit", file: "Sevran ai - Sakit.mp3" },
  { title: "Tester", file: "Sevran ai - Tester.mp3" },
  { title: "Yang Paling Ku Percaya", file: "Sevran ai - Yang Paling Ku Percaya.mp3" }
];

let currentIndex = 0;

const audio = document.getElementById("audioPlayer");
const list = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");

// RENDER LIST
function render() {
  list.innerHTML = "";

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "track";

    // fake waveform
    const bars = Array(60).fill(0).map(() =>
      `<div class="bar" style="height:${Math.random()*40}px"></div>`
    ).join("");

    div.innerHTML = `
      <div class="play">▶</div>
      <div>
        <b>${song.title}</b>
        <div class="wave">${bars}</div>
      </div>
    `;

    div.onclick = () => playMusic(i);
    list.appendChild(div);
  });
}

// PLAY
function playMusic(i) {
  currentIndex = i;
  const song = songs[i];

  audio.src = encodeURI(song.file);

  audio.play()
    .then(() => {
      playBtn.innerText = "⏸";
    })
    .catch(err => console.log("Audio error:", err));

  nowPlaying.innerText = song.title;
}

// TOGGLE
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

// AUTO NEXT
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  playMusic(currentIndex);
});

// INIT
render();
