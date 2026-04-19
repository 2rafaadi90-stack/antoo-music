const music = [
  {
    title: "Kalau Bukan Kamu",
    file: "Kalau Bukan Kamu 22.mp3",
    cover: "https://via.placeholder.com/300"
  },
  {
    title: "Rumah Yang Salah",
    file: "Rumah Yang Salah.mp3",
    cover: "https://via.placeholder.com/300"
  }
];

const list = document.getElementById("musicList");

music.forEach((m) => {
  list.innerHTML += `
    <div class="card">
      <img src="${m.cover}">
      <h3>${m.title}</h3>
      <audio controls>
        <source src="${m.file}" type="audio/mp3">
      </audio>
    </div>
  `;
});
