const eq = document.getElementById("eq");
const audio = document.getElementById("audioPlayer");

function togglePlay() {
  if (audio.paused) {
    audio.play();
    eq.style.opacity = 1;
  } else {
    audio.pause();
    eq.style.opacity = 0.3;
  }
}
