'use strict';
//an array with all questions
const QUESTIONS = [
    {question: "How many episodes were in Critical Role's first campaign?", 
     choices: ["56", "88", "102", "138"], 
     answer: 2},
    {question: "Which voice actor played Vax'ildan?", 
     choices: ["Liam O'Brien", "Taleisin Jaffe", "Travis Willingham", "Marisha Ray"], 
     answer: 0},
    {question: "On what date did Episode 66 of Campaign 2 air?", 
     choices: ["4-11-19", "6-6-19", "6-28-19", "Episode 66 hasn't aired yet"], 
     answer: 1},
    {question: "What was the name of the (Player Character) bard in Campaign 1?", 
     choices: ["Nott the Brave", "Pike Trickfoot", "Grog Strongjaw", "Scanlan Shorthalt"], 
     answer: 3},
    {question: "Which cast member has a gallon flask on set during Campaign 2?", 
     choices: ["Matthew Mercer", "Sam Riegel", "Ashley Johnson", "Taleisin Jaffe"], 
     answer: 1},
    {question: "What is the name of the continent that Campaign 1 takes place on?", 
     choices: ["Tal'dorei", "Tarduril", "The Forgotten Realms", "Target"], 
     answer: 0},
    {question: "What type of animal familiar did Vex'halia have in Campaign 1?", 
     choices: ["A wolf", "A cat", "A bear", "A tiger"], 
     answer: 2},
    {question: "How many player characters have died during Campaign 2 (including PCs who were later revived)?", 
     choices: ["0", "2", "3", "4"], 
     answer: 1}, 
    {question: "Whose characters knew each other from the circus in Campaign 2?", 
     choices: ["Liam's and Laura's", "Ashley's and Travis's", "Marisha's and Sam's", "Ashley's and Taleisin's"], 
     answer: 3}, 
  ];
//an array with all of the states we want to track in the quiz
const STORE = {
    currentQuestion: 0,
    numberCorrect: 0,
    numberIncorrect: 0,
    currentView: "startView",
    currentAnswer: ""
  };
//functions to manage which parts display
function manageView() {
  //hide all as default and then show what needs to be shown
      $(".info-page").hide();
      $(".question-page").hide();
      $(".rightOrWrong").hide();
      $(".finalResults").hide();
  //update the view based on the currentView in the STORE    
    if (STORE.currentView === "startView") {
      $(".info-page").show();
    } else if (STORE.currentView === "questionView") {
      $(".question-page").show();
    } else if (STORE.currentView === "feedbackView") {
      $(".rightOrWrong").show();
    } else if (STORE.currentView === "resultsView") {
      $(".finalResults").show();     
    };  
};
//updates which view should be displayed based on user action
$("#start-quiz").on('submit', function(event) {
  event.preventDefault();
  STORE.currentView = "questionView";
  manageView();
});
$("#quizQuestion").on('submit', function(event) {
  event.preventDefault();
  STORE.currentView = "feedbackView";
  manageView();
});
$("#rightOrWrongResults").on('click', '#continue-button', function(event) {
  event.preventDefault();
  if (STORE.currentQuestion === 9) {
    STORE.currentView = "resultsView";
    displayFinalFeedback();
    manageView();

  } else {
    STORE.currentView = "questionView";
    manageView();
  };
});  
$("#quizResults").on('submit', '#playAgain', function(event) {
  event.preventDefault();
  STORE.currentView = "startView";
  storeReset();
  manageView();
});  
//resets all values on completion of the quiz
function storeReset() {
  STORE.currentQuestion = 0;
  STORE.numberCorrect = 0;
  STORE.numberIncorrect = 0;
  STORE.currentView = "startView";
  STORE.currentAnswer = "";
};
//updates which question is shown based on the state of STORE
function justOneQuestion() {
  let shownQuestion = generateQuizQuestionElement(QUESTIONS[STORE.currentQuestion]);
  $("#quizQuestion").html(shownQuestion);
};
//updates the STORE based on user completing question
$('#quizQuestion').on('submit', function(event) {
  event.preventDefault();
  STORE.currentQuestion++;
  processAnswer();
  renderQuiz();
});
//determines whether answer is right or wrong
function processAnswer() {
  STORE.currentAnswer = ($('input:checked').val());
  console.log(STORE.currentAnswer);
  let rightAnswer = QUESTIONS[STORE.currentQuestion - 1].answer;
  console.log(rightAnswer);
  if (rightAnswer == STORE.currentAnswer) {
    handleCorrectAnswer();
    STORE.numberCorrect++;
  } else {
    handleIncorrectAnswer(rightAnswer);
    STORE.numberIncorrect++;
  };
};
//functions to handle what shows up on feedback pages
//handles what to show for wrong answers
function responseIncorrectFeedback(answer) {
  return `
  <img class="incorrectAnswerImage" alt="a d20 die shows the number 1" 
  src="https://d2a4hncphh3gxw.cloudfront.net/image/artwork/34403/69/7f/697fde6c37b6f7a086f1eeb6e1d6dde5_34403">
  <p class="incorrectAnswer">Incorrect! You should have picked 
  ${QUESTIONS[STORE.currentQuestion - 1].choices[answer]}.</p> 
  <button id="continue-button">Continue</button>`;
};
function handleIncorrectAnswer(answer) {
  let badAnswer = responseIncorrectFeedback(answer);
  $("#rightOrWrongResults").html(badAnswer);
};
//handles what to show for right answers
function responseCorrectFeedback(answer) {
  return `
  <img class="correctAnswerImage" alt="a d20 die shows the number 20" 
  src="http://cdn.shopify.com/s/files/1/0019/1182/products/sticker-d20_grande.png?v=1541445538">
  <p class="correctAnswer">That's correct!</p> 
  <button id="continue-button">Continue</button>`
};
function handleCorrectAnswer(answer) {
  let rightAnswer = responseCorrectFeedback(answer);
  $('#rightOrWrongResults').html(rightAnswer);
};
function handleFinalFeedback() {
  if (STORE.numberCorrect >= 7) {
    return `
      <h2>Quiz Results</h2>
      <p class="victoryParagraph">Congratulations! You got ${STORE.numberCorrect} out of 9 right. You know
      a thing or three about Critical Role!</p>
      <form id="quizResults">
      <input type="submit" id="playAgain" value="Play again!"></input> 
      </form>`;
  } else if (STORE.numberCorrect <= 6 && STORE.numberCorrect > 3) {
    return `
      <h2>Quiz Results</h2>
      <p class="mehParagraph">You got ${STORE.numberCorrect} out of 9 right. Not bad! Keep watching; it
      gets better and better!</p>
      <form id="quizResults">
      <input type="submit" id="playAgain" value="Play again!"></input>  
      </form>`;
  } else if (STORE.numberCorrect <= 3) {
    return `
      <h2>Quiz Results</h2>
      <p class="criticalFailParagraph">You got ${STORE.numberCorrect} out of 9 right. I get this funny feeling
      that you probably don't watch Critical Role. (You really should.)</p>
      <form id="quizResults">
      <input type="submit" id="playAgain" value="Play again!"></input> 
      </form>`;
  };
};
function displayFinalFeedback() {
  let finalFeedback = handleFinalFeedback();
  $('.finalResults').html(finalFeedback);
}
//functions to handle rendering from STORE for questions
//Creates the template
function generateQuizQuestionElement(item) {
    return `
      <h2>${item.question}</h2>
      <input type="radio" name="questionChoice" value=0 required>${item.choices[0]}<br>
      <input type="radio" name="questionChoice" value=1 required>${item.choices[1]}<br>
      <input type="radio" name="questionChoice" value=2 required>${item.choices[2]}<br>
      <input type="radio" name="questionChoice" value=3 required>${item.choices[3]}<br>
      <input type="submit" id="quiz-submit-button" value="Roll the dice"></input><br>
      <footer class="quizStats">
      <p id="quiz-status">${STORE.currentQuestion} out of 9 answered // ${STORE.numberCorrect} right, ${STORE.numberIncorrect} wrong</p>
      </footer>`
  }
//grabs the info out of QUESTIONS
function generateQuizQuestions(questions) {
    console.log('`generateQuizQuestions` ran');
    const items = questions.map((item, index) => generateQuizQuestionElement(item, index));
  
  return items.join("");
}
//Gets the info from QUESTIONS to render
function renderQuiz() {
    console.log('`renderQuiz` ran');
    const testQuestion = justOneQuestion();

//inserts the question into the DOM 
    $("#quizQuestion").html(testQuestion);
};
function runQuiz() {
    renderQuiz();
    manageView();
};

$(runQuiz);