const music = [
  {
    title: "Lagu 1",
    file: "musik1.mp3"
  },
  {
    title: "Lagu 2",
    file: "musik2.mp3"
  }
];

const list = document.getElementById("musicList");

music.forEach((m, i) => {
  list.innerHTML += `
    <div class="card">
      <h3>${m.title}</h3>
      <audio controls>
        <source src="${m.file}" type="audio/mp3">
      </audio>
    </div>
  `;
});
