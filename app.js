let vocabData = [];
let currentIndex = 0;
let practicedIndices = new Set();

const germanEl = document.getElementById("germanWord");
const englishEl = document.getElementById("englishTranslation");
const toggleBtn = document.getElementById("toggleAnswer");
const newBtn = document.getElementById("newWord");
const progressEl = document.getElementById("progress");

async function loadVocab() {
  try {
    const res = await fetch("vocab.json");
    vocabData = await res.json();
    showNewWord();
  } catch (err) {
    germanEl.textContent = "Error loading vocabulary.";
  }
}

function showNewWord() {
  if (practicedIndices.size === vocabData.length) {
    alert("All words practiced!");
    return;
  }

  englishEl.style.display = "none";
  toggleBtn.textContent = "Show Answer";

  do {
    currentIndex = Math.floor(Math.random() * vocabData.length);
  } while (practicedIndices.has(currentIndex));

  const entry = vocabData[currentIndex];
  germanEl.textContent = entry.german;
  englishEl.textContent = entry.english;

  practicedIndices.add(currentIndex);
  updateProgress();
}

function toggleAnswer() {
  if (englishEl.style.display === "none") {
    englishEl.style.display = "block";
    toggleBtn.textContent = "Hide Answer";
  } else {
    englishEl.style.display = "none";
    toggleBtn.textContent = "Show Answer";
  }
}

function updateProgress() {
  progressEl.textContent = `${practicedIndices.size}/${vocabData.length}`;
}

toggleBtn.addEventListener("click", toggleAnswer);
newBtn.addEventListener("click", showNewWord);

loadVocab();
