const list = document.getElementById("musicList");
const player = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");

fetch("music.json")
  .then(res => res.json())
  .then(data => {
    data.forEach((m) => {
      list.innerHTML += `
        <div class="card" onclick="playMusic('${m.file}', '${m.title}')">
          <h3>${m.title}</h3>
        </div>
      `;
    });
  });

function playMusic(file, title) {
  player.src = file;
  player.play();
  nowPlaying.innerText = "Now Playing: " + title;
}
