const music = [
  {
    title: "Kalau Bukan Kamu",
    file: "Kalau Bukan Kamu 22.mp3",
    cover: "https://picsum.photos/300?1"
  },
  {
    title: "Rumah Yang Salah",
    file: "Rumah Yang Salah.mp3",
    cover: "https://picsum.photos/300?2"
  }
];

const list = document.getElementById("musicList");
const player = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");

music.forEach((m) => {
  list.innerHTML += `
    <div class="card" onclick="playMusic('${m.file}', '${m.title}')">
      <img src="${m.cover}">
      <h3>${m.title}</h3>
    </div>
  `;
});

function playMusic(file, title) {
  player.src = file;
  player.play();
  nowPlaying.innerText = "Now Playing: " + title;
}
