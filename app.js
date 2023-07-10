const deck = [
  {
    english: "Hello",
    translated: "Hola",
  },
  {
    english: "Dog",
    translated: "El Perro",
  },
  {
    english: "Weather",
    translated: "El Tiempo",
  },
  {
    english: "Beach",
    translated: "La Playa",
  },
];
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
  console.log(newCard);
  deck.push(newCard);
  console.log(deck);
  cardCount.textContent = deck.length;
});

// finishDeckBtn.addEventListener("click", function () {
//   if (deck !== []) {
//     displayReview();
//   }
// });

addDeckBtn.addEventListener("click", () => {
  addDeckCard.classList.add("active");
  startingCard.classList.remove("active");
  reviewCard.classList.remove("active");
  quizCard.classList.remove("active");
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
startGamebtn.addEventListener("click", function () {
  addDeckCard.classList.remove("active");
  reviewCard.classList.remove("active");
  quizCard.classList.add("active");
  cardIdx = [];
  score = 0;
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
  if (!selectedChoice) {
    console.log("No choice Selected");
  } else {
    if (selectedChoice.value === currentCard.translated) {
      correctAnswer.textContent = "Correct!";
      score++;
    } else {
      console.log("Boo!");
      correctAnswer.textContent = `Correct Answer: ${currentCard.translated}`;
    }
  }
  submitBtn.disabled = true;
  if (cardIdx.length === deck.length) {
    nextBtn.disabled = true;
    finishGameBtn.disabled = false;
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
  addDeckCard.classList.remove("active");
  quizCard.classList.remove("active");
  reviewCard.classList.add("active");
  reviewCardIdx = 0;
  reviewEnglish.textContent = `${deck[0].english}`;
  reviewtranslated.textContent = `${deck[0].translated}`;
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

    choice.setAttribute("type", "radio");
    choice.setAttribute("value", answer);
    choice.setAttribute("name", "multiple-choice");
    choice.setAttribute("id", `choice--${i}`);

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
