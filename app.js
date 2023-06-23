const deck = [];
const cardCount = document.querySelector("#card-count");
const deckForm = document.querySelector("#deck-form");
const finishDeckBtn = document.querySelector("#finish-deck");
const addDeckBtn = document.querySelector("#add-deck-btn");
const addDeckCard = document.querySelector(".add-deck");
const reviewCard = document.querySelector(".review");
const startingCard = document.querySelector(".starting-card");
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
  addDeckCard.classList.remove("active");
  reviewCard.classList.add("active");
});

addDeckBtn.addEventListener("click", () => {
  addDeckCard.classList.add("active");
  startingCard.classList.remove("active");
});
