let deck = [];
const cardCount = document.querySelector("#card-count");
const deckForm = document.querySelector("#deck-form");
const finishDeckBtn = document.querySelector("#finish-deck");
const addDeckBtn = document.querySelector("#add-deck-btn");
const addDeckCard = document.querySelector(".add-deck");
const reviewCard = document.querySelector(".review");
const startingCard = document.querySelector(".starting-card");
const reviewEnglish = document.querySelector("#review-english");
const reviewtranslated = document.querySelector("#review-translated");
const quizCard = document.querySelector(".quiz");
const quizForm = document.querySelector("#quiz-form");
const quizWord = document.querySelector("#quiz-word");
const selections = document.querySelector("#selections");
const reviewPrevBtn = document.querySelector("#review-prev");
const reviewNextBtn = document.querySelector("#review-next");
const reviewDeckBtn = document.querySelector("#review-deck");
const startGamebtn = document.querySelector("#start");
const nextBtn = document.querySelector("#next");
const finishGameBtn = document.querySelector("#finish");
const submitBtn = document.querySelector("#quiz-form button[type=submit]");
const correctAnswer = document.querySelector("#correct-answer");
const finalScore = document.querySelector("#final-score");
const mobileDeckDisplay = document.querySelector("#mobile-deck");
let reviewCardIdx = 2;
let cardIdx = [];
let currentCard;
let usedChoiceIdx;
let score;
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
  deck.push(newCard);
  reviewDeckBtn.disabled = false;
  if (deck.length >= 3) {
    startGamebtn.disabled = false;
  }
  cardCount.textContent = deck.length;
  mobileDeckDisplay.textContent = deck.length;
});

addDeckBtn.addEventListener("click", () => {
  displayActiveCard(addDeckCard, reviewCard, quizCard);
});

reviewDeckBtn.addEventListener("click", displayReview);
reviewPrevBtn.addEventListener("click", function () {
  if (reviewCardIdx > 0) {
    reviewCardIdx--;
    displayReviewTerms(
      deck[reviewCardIdx].english,
      deck[reviewCardIdx].translated
    );
  }
});
reviewNextBtn.addEventListener("click", function () {
  if (reviewCardIdx < deck.length - 1) {
    reviewCardIdx++;
    displayReviewTerms(
      deck[reviewCardIdx].english,
      deck[reviewCardIdx].translated
    );
  }
});
startGamebtn.addEventListener("click", function () {
  displayActiveCard(quizCard, reviewCard, addDeckCard);
  cardIdx = [];
  score = 0;
  submitBtn.disabled = false;
  correctAnswer.textContent = "";
  finalScore.textContent = "";
  const oldSelections = document.querySelectorAll("#selections div");
  for (let i = 0; i < oldSelections.length; i++) {
    oldSelections[i].remove();
  }
  createNewCard();
});

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedChoice = document.querySelector(
    "input[name=multiple-choice]:checked"
  );

  if (selectedChoice.value === currentCard.translated) {
    correctAnswer.textContent = "Correct!";
    score++;
  } else {
    console.log("Boo!");
    correctAnswer.textContent = `Correct Answer: ${currentCard.translated}`;
  }

  submitBtn.disabled = true;
  if (cardIdx.length === deck.length) {
    nextBtn.disabled = true;
    finishGameBtn.classList.remove("d-none");
  } else {
    nextBtn.disabled = false;
  }
});

nextBtn.addEventListener("click", function () {
  submitBtn.disabled = false;
  const oldSelections = document.querySelectorAll("#selections div");
  for (let i = 0; i < oldSelections.length; i++) {
    oldSelections[i].remove();
  }
  correctAnswer.textContent = "";
  createNewCard();
  nextBtn.disabled = true;
});

finishGameBtn.addEventListener("click", function () {
  finalScore.textContent = `You got ${score} out of ${
    deck.length
  }, or ${Math.round((score / deck.length) * 100)}% correct`;
  correctAnswer.textContent = "";
});
// Functions
function displayReview() {
  reviewCardIdx = 0;
  displayActiveCard(reviewCard, addDeckCard, quizCard);
  displayReviewTerms(deck[0].english, deck[0].translated);
}

function createSections() {
  usedChoiceIdx = [];
  for (let i = 0; i < deck.length; i++) {
    const radioGroup = document.createElement("div");
    const answer = deck[randomIdx(deck, usedChoiceIdx)].translated;
    const choice = document.createElement("input");
    const choiceLabel = document.createElement("label");

    choiceLabel.setAttribute("for", `choice--${i}`);
    choiceLabel.textContent = `${answer}`;
    choiceLabel.classList.add("form-check-label");

    choice.setAttribute("type", "radio");
    choice.setAttribute("value", answer);
    choice.setAttribute("name", "multiple-choice");
    choice.setAttribute("id", `choice--${i}`);
    choice.classList.add("form-check-input");

    radioGroup.classList.add("form-check");

    selections.appendChild(radioGroup);
    radioGroup.appendChild(choice);
    radioGroup.appendChild(choiceLabel);
  }
}

function randomIdx(arr, usedIdx) {
  let num = Math.floor(Math.random() * arr.length);
  while (usedIdx.some((idx) => idx === num)) {
    num = Math.floor(Math.random() * arr.length);
  }
  usedIdx.push(num);
  return num;
}

function createNewCard() {
  currentCard = deck[randomIdx(deck, cardIdx)];
  quizWord.textContent = currentCard.english;

  createSections();
}

function displayReviewTerms(englishTerm, translatedTerm) {
  reviewEnglish.textContent = `${englishTerm}`;
  reviewtranslated.textContent = `${translatedTerm}`;
}
function displayActiveCard(activeCard, inactiveCard1, inactiveCard2) {
  startingCard.classList.remove("active");
  activeCard.classList.add("active");
  inactiveCard1.classList.remove("active");
  inactiveCard2.classList.remove("active");
}
