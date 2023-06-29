const deck = [];
const cardCount = document.querySelector("#card-count");
const deckForm = document.querySelector("#deck-form");
const finishDeckBtn = document.querySelector("#finish-deck");
const addDeckBtn = document.querySelector("#add-deck-btn");
const addDeckCard = document.querySelector(".add-deck");
const reviewCard = document.querySelector(".review");
const startingCard = document.querySelector(".starting-card");
const reviewEnglish = document.querySelector("#review-english");
const reviewtranslated = document.querySelector("#review-translated");
let reviewCardIdx = 2;
const reviewPrevBtn = document.querySelector("#review-prev");
const reviewNextBtn = document.querySelector("#review-next");
const reviewDeckBtn = document.querySelector("#review-deck");
deckForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const englishInput = e.target[0];
  const translatedInput = e.target[1];
  const newCard = {
    english: englishInput.value,
    translated: translatedInput.value,
  };

  englishInput.value = "";
  translatedInput.value = "";
  console.log(newCard);
  deck.push(newCard);
  console.log(deck);
  cardCount.textContent = deck.length;
});

finishDeckBtn.addEventListener("click", function () {
  if (deck !== []) {
    displayReview();
  }
});

addDeckBtn.addEventListener("click", () => {
  addDeckCard.classList.add("active");
  startingCard.classList.remove("active");
});

reviewDeckBtn.addEventListener("click", displayReview);
reviewPrevBtn.addEventListener("click", function () {
  if (reviewCardIdx > 0) {
    reviewCardIdx--;
    reviewEnglish.textContent = `${deck[reviewCardIdx].english}`;
    reviewtranslated.textContent = `${deck[reviewCardIdx].translated}`;
  }
});
reviewNextBtn.addEventListener("click", function () {
  if (reviewCardIdx < deck.length - 1) {
    reviewCardIdx++;
    reviewEnglish.textContent = `${deck[reviewCardIdx].english}`;
    reviewtranslated.textContent = `${deck[reviewCardIdx].translated}`;
  }
});

function displayReview() {
  addDeckCard.classList.remove("active");
  reviewCard.classList.add("active");
  reviewCardIdx = 0;
  reviewEnglish.textContent = `${deck[0].english}`;
  reviewtranslated.textContent = `${deck[0].translated}`;
}
