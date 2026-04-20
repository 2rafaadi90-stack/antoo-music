const songs = [
  { title: "Masih Kamu", file: "music/masih-kamu.mp3" },
  { title: "Kalau Bukan Kamu", file: "music/kalau-bukan-kamu.mp3" },
  { title: "Rumah Yang Salah", file: "music/rumah.mp3" },
  { title: "Yang Paling Ku Percaya", file: "music/percaya.mp3" },
  { title: "Saat", file: "music/saat.mp3" }
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
  return `https://source.unsplash.com/200x200/?anime,${title}`;
}

/* RENDER */
function render() {
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
  audio.play();

  nowPlaying.innerText = songs[i].title;
  coverPlayer.src = getCover(songs[i].title);
  playBtn.innerText = "⏸";
}

/* PLAY/PAUSE */
function togglePlay() {
  if (audio.paused) {
    audio.play();
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
audio.onended = next;

/* PROGRESS */
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
};

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

/* VOLUME */
volume.oninput = () => {
  audio.volume = volume.value;
};
