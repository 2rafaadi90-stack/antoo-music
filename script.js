let songs = [];
let currentIndex = 0;

const audio = document.getElementById("audioPlayer");
const musicList = document.getElementById("musicList");
const nowPlaying = document.getElementById("nowPlaying");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const search = document.getElementById("search");
const eq = document.getElementById("eq");

// FETCH JSON
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    songs = data;
    renderList(songs);
  })
  .catch(err => console.log("JSON ERROR:", err));

// RENDER LIST
function renderList(list) {
  musicList.innerHTML = "";

  list.forEach(song => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${song.title}</strong>`;

    div.onclick = () => {
      const realIndex = songs.indexOf(song);
      playMusic(realIndex);
    };

    musicList.appendChild(div);
  });
}

// PLAY MUSIC
function playMusic(index) {
  if (!songs[index]) return;

  currentIndex = index;
  const song = songs[index];

  audio.src = song.file;

  audio.play()
    .then(() => {
      playBtn.innerText = "⏸";
      eq.style.opacity = 1;
    })
    .catch(err => console.log("AUDIO ERROR:", err));

  nowPlaying.innerText = song.title;
}

// TOGGLE
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    eq.style.opacity = 1;
  } else {
    audio.pause();
    playBtn.innerText = "▶";
    eq.style.opacity = 0.3;
  }
}

// NEXT / PREV
function next() {
  currentIndex = (currentIndex + 1) % songs.length;
  playMusic(currentIndex);
}

function prev() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playMusic(currentIndex);
}

// AUTO NEXT
audio.addEventListener("ended", next);

// PROGRESS
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

// SEEK
function seek(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// SEARCH
search.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(keyword)
  );

  renderList(filtered);
});

// DEBUG ERROR FILE
audio.onerror = () => {
  console.log("FILE ERROR:", audio.src);
};
