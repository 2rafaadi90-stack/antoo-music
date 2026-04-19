let music = [];
let currentIndex = 0;

const list = document.getElementById("musicList");
const player = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const search = document.getElementById("search");

// ambil data dari json
fetch("music.json")
  .then(res => res.json())
  .then(data => {
    music = data;
    renderMusic(music);
  });

// tampilkan lagu
function renderMusic(data) {
  list.innerHTML = "";
  data.forEach((m, i) => {
    list.innerHTML += `
      <div class="card">
        <h3 onclick="playMusic(${i})">${m.title}</h3>
        <button onclick="likeMusic('${m.title}')">❤️</button>
      </div>
    `;
  });
}

// play lagu
function playMusic(index) {
  currentIndex = index;
  player.src = music[index].file;
  player.play();
  nowPlaying.innerText = "Now Playing: " + music[index].title;
}

// auto next
player.addEventListener("ended", () => {
  currentIndex++;
  if (currentIndex >= music.length) currentIndex = 0;
  playMusic(currentIndex);
});

// search
search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();
  const filtered = music.filter(m =>
    m.title.toLowerCase().includes(keyword)
  );
  renderMusic(filtered);
});

// like system (local storage)
function likeMusic(title) {
  let liked = JSON.parse(localStorage.getItem("liked")) || [];
  if (!liked.includes(title)) {
    liked.push(title);
    localStorage.setItem("liked", JSON.stringify(liked));
    alert("Ditambahkan ke favorit ❤️");
  }
}
