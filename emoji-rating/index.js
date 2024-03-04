const starsEl = document.querySelectorAll(".fa-star");
const emojisEl = document.querySelectorAll(".far");
const colorsArray = ["red", "orange", "lightblue", "lightgreen", "green"];

starsEl.forEach((star, index) => {
  star.addEventListener("click", () => {
    starsEl.forEach((s, i) => {
      if (i <= index) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
    // Выбираем смайлик и меняем его цвет в зависимости от количества выбранных звезд
    updateEmoji(index);
    updateEmojiColor(colorsArray[index]);
  });
});

emojisEl.forEach((emoji, index) => {
  emoji.addEventListener("click", () => {
    emojisEl.forEach((e, i) => {
      if (i === index) {
        e.style.color = colorsArray[i];
      } else {
        e.style.color = "black";
      }
    });
  });
});

function updateEmoji(starIndex) {
  const emojis = ["angry", "frown", "meh", "smile", "laugh"];
  const selectedEmoji = emojisEl[starIndex];
  emojisEl.forEach((emoji) => {
    emoji.style.display = "none";
  });
  selectedEmoji.style.display = "inline-block";
}

function updateEmojiColor(color) {
  emojisEl.forEach((emoji) => {
    emoji.style.color = color;
  });
}
