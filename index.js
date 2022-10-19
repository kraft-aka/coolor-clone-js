const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code === "Space") {
    setRandomColor();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if( type === 'copy') {
    copyTextToClipboard(e.target.textContent)
  }
});

function generateColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function copyTextToClipboard (text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColor() {

  const colors = []

  cols.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = chroma.random();

    if (isLocked) {
      colors.push(text.textContent)
      return;
    }

    colors.push(color)

    col.style.background = color;
    text.textContent = color;   

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(c=> { 
    return c.toString().substring(1)
    }).join('-') 
}

setRandomColor();
