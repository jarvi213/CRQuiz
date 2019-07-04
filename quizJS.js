'use strict';
//an array with all questions
const STORE = [
    {question: "apples", choices: false, answer: 0},
    {question: "oranges", choices: false, answer: 0},
    {question: "milk", choices: true, answer: 0},
    {question: "bread", choices: false, answer: 0}
  ];
//a for loop to iterate through the questions and create the choices as radio buttons
/* for ( var i = 0; i < STORE.length; i++ ) {
    var question = quizQuestion[i].question;
    document.write ( question );
    var options = STORE[i].choices;
    for ( var opt in options ) {
       for ( var radios in userChoices ) {
         userChoices[radios].value = options[opt];   
       }
    }   
  } */
//function(s) to handle rendering the questions
//Create the template...
function generateQuizTemplate() {
    console.log('`generateQuizTemplate` ran');
    return `
    <p>Ye Olde Question</p>
    <p>Ye Olde Question</p>
    <p>Ye Olde Question</p>
    <p>Ye Olde Question</p>
  `;
}
//Get the info we've stored to render...
function renderQuiz() {
    console.log('`renderQuiz` ran');
    const testQuestion = generateQuizTemplate(STORE);
//insert the question into the DOM...   
    $("#quizQuestion").html(testQuestion);
};
function runQuiz() {
    renderQuiz();
};

$(runQuiz);