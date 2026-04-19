const music = [
  {
    title: "Kalau Bukan Kamu",
    file: "Kalau Bukan Kamu 22.mp3"
  },
  {
    title: "Rumah Yang Salah",
    file: "Rumah Yang Salah.mp3"
  }
];

const list = document.getElementById("musicList");

music.forEach((m) => {
  list.innerHTML += `
    <div class="card">
      <h3>${m.title}</h3>
      <audio controls>
        <source src="${m.file}" type="audio/mp3">
      </audio>
    </div>
  `;
});
