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
const STORE = [
    {currentQuestion: []},
    {numberCorrect: []},
    {numberIncorrect: []},
    {currentView: []},
    {currentAnswer: []}
];
//functions to manage which parts display
function determineView(currentView) {
  switch (currentView) {
    case "startView":
      $(".info-page").show();
      $(".question-page").hide();
      $(".rightOrWrong").hide();
      $(".finalResults").hide();
      break;
    case "questionView":
      $(".info-page").hide();
      $(".question-page").show();
      $(".rightOrWrong").hide();
      $(".finalResults").hide();
      break;
    case "feedbackView":
      $(".info-page").hide();
      $(".question-page").hide();
      $(".rightOrWrong").show();
      $(".finalResults").hide();
      break;
    case "resultsView":
      $(".info-page").hide();
      $(".question-page").hide();
      $(".rightOrWrong").hide();
      $(".finalResults").show(); 
    default: "startView"      
  };
};
function manageView() {
};
//functions to handle rendering the questions
//Create the template...
function generateItemElement(item) {
    return `
      <h2>${item.question}</h2>
      <input type="radio">${item.choices[0]}<br>
      <input type="radio">${item.choices[1]}<br>
      <input type="radio">${item.choices[2]}<br>
      <input type="radio">${item.choices[3]}`;
  }
//grab the info out of QUESTIONS...
function generateQuizTemplate(quizTemplate) {
    console.log('`generateQuizTemplate` ran');
    const items = quizTemplate.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}
//Get the info from QUESTIONS to render...
function renderQuiz() {
    console.log('`renderQuiz` ran');
    const testQuestion = generateQuizTemplate(QUESTIONS);
//insert the question into the DOM...   
    $("#quizQuestion").html(testQuestion);
};
function runQuiz() {
    renderQuiz();
};

$(runQuiz);