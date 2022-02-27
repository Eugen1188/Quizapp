let questions = [
    {
        "question": "Welches Unternehmen präsentierte 1971 den ersten Mikroprozessor?",
        "answer_1": "IBM",
        "answer_2": "Sony",
        "answer_3": "Intel",
        "answer_4": "Apple",
        "right_answer": 3
    },
    {
        "question": "Was heißt cc bei einer E-Mail?",
        "answer_1": "Copy Company",
        "answer_2": "Cocktail & Café",
        "answer_3": "Correctis Corrigendis",
        "answer_4": "Carbon Copy",
        "right_answer": 4
    },
    {
        "question": "Was bezeichnet nicht die Hauptplatine?",
        "answer_1": "Hauptplatine",
        "answer_2": "Mainboard",
        "answer_3": "Motherboard",
        "answer_4": "Fatherboard",
        "right_answer": 4
    },
    {
        "question": "Was bedeutet die Abkürzung DVD?",
        "answer_1": "Digital Video Demand",
        "answer_2": "Domaine Video Disc",
        "answer_3": "Digital Visual Disc",
        "answer_4": "Digital Versatile Disc",
        "right_answer": 4
    },
    {
        "question": "Welches dieser Begriffe ist ein Betriebssystem?",
        "answer_1": "Photoshop",
        "answer_2": "Windows",
        "answer_3": "Excel",
        "answer_4": "Netscape Navigator",
        "right_answer": 2
    },
    {
        "question": "Wie heißt eine applikative Programmiersprache, deren wichtigste Datenstruktur lineare Listen sind?",
        "answer_1": "FORTRAN",
        "answer_2": "PASCAL",
        "answer_3": "COBOL",
        "answer_4": "LISP",
        "right_answer": 4
    },
    {
        "question": "Wie schreibt man IP-Adressen (IPv4)?",
        "answer_1": "8 durch Doppelpunkt getrennte Hexadezimal Zeichen",
        "answer_2": "eine 10-Stellige dezimal Zahl",
        "answer_3": "eine 32-Bit stellige binäre Zahl",
        "answer_4": "4 durch Punkte getrennte Zahlen",
        "right_answer": 4
    }
];
let righQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');


function init() {

    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = righQuestions;
    document.getElementById('header-image').src = 'img/trophy.png';
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        console.log('Richtige Antwort!!');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        righQuestions++;
    } else { // show question
        console.log('Falsche Antwort!!!');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber, question){
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++; // z.B von 0 auf 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`
    document.getElementById('progress-bar').style = `width: ${percent}%`

}

function updateToNextQuestion() {
    let question = questions[currentQuestion];


    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/pencil.jpg';
    righQuestions = 0;
    currentQuestion = 0;
    init();
    document.getElementById('questionBody').style = ''; //questionBody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none'; // Endscreen ausblenden

}