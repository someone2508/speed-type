const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
  const arrayQuoteChar = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");

  let correct = true;

  arrayQuoteChar.forEach((eSpan, idx) => {
    // hello class!
    let character = arrayValue[idx]; // hello

    if (character == undefined) {
      eSpan.classList.remove("correct");
      eSpan.classList.remove("incorrect");

      correct = false;
    } else if (character === eSpan.innerText) {
      eSpan.classList.add("correct");
      eSpan.classList.remove("incorrect");
    } else if (character != eSpan.innerText) {
      eSpan.classList.add("incorrect");
      eSpan.classList.remove("correct");

      correct = false;
    }
  });

  //   this is hoing to generate a new para and start the timer again!
  if (correct) {
    // get the timer and compare with the localstorage timer and store the best time there!
    renderNewQuote();
  }
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();

  quoteDisplayElement.innerHTML = "";
  quoteInputElement.value = "";

  quote.split("").forEach((eChar) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = eChar;

    quoteDisplayElement.appendChild(characterSpan);
  });

  startTimer();
}

renderNewQuote();

let startTime;
function startTimer() {
  timerElement.innerText = 0;

  startTime = new Date(); // 10:53:40

  setInterval(() => {
    timerElement.innerText = getTimerTime(); // 10:53:47
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

// 10:53:20     - 10:53:35
