let correct = 0;
let mistakes = 0;
let min = 1;
let max = 9;

function getRandomInt(minVal, maxVal) {
    return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

function checkAnswer(correctAnswer, userAnswer, operation) {
    correctAnswer = Number(correctAnswer);
    userAnswer = Number(userAnswer);
    
    if (userAnswer === correctAnswer) {
        correct++;
        alert(getTranslation('correctAnswer'));
    } else {
        mistakes++;
        alert(getTranslation('wrongAnswer') + userAnswer + getTranslation('wrongAnswer2') + correctAnswer + ".");
    }
}

function askQuestion(operation, symbol) {
    let numA = getRandomInt(min, max);
    let numB = getRandomInt(min, max);
    let correctAnswer;
    
    switch(operation) {
        case 'add':
            correctAnswer = numA + numB;
            break;
        case 'subtract':
            correctAnswer = numA - numB;
            break;
        case 'multiply':
            correctAnswer = numA * numB;
            break;
        case 'divide':
            if (numB === 0) numB = 1;
            correctAnswer = numA / numB;
            break;
    }
    
    let userAnswer = prompt(numA + " " + symbol + " " + numB + " = ", "");
    if (userAnswer !== null) {
        checkAnswer(correctAnswer, userAnswer, operation);
    }
}

document.getElementById('addBtn').onclick = () => askQuestion('add', '+');
document.getElementById('subtractBtn').onclick = () => askQuestion('subtract', '-');
document.getElementById('multiplyBtn').onclick = () => askQuestion('multiply', '*');
document.getElementById('divideBtn').onclick = () => askQuestion('divide', ':');

document.getElementById('difficultySelect').onchange = function() {
    let value = this.value;
    switch(value) {
        case 'easy':
            min = 1;
            max = 9;
            break;
        case 'medium':
            min = 10;
            max = 99;
            break;
        case 'hard':
            min = 100;
            max = 999;
            break;
    }
};

document.getElementById('checkBtn').onclick = function() {
    alert(getTranslation('statsTitle') + "\n" + 
          getTranslation('correctStats') + correct + "\n" + 
          getTranslation('mistakeStats') + mistakes);
};

document.getElementById('resetStatsBtn').onclick = function() {
    correct = 0;
    mistakes = 0;
    alert(getTranslation('resetMessage'));
};

const mathTranslations = {
    ru: {
        mainTitle: "Нажми на кнопку и получи задание :-)",
        add: "Сложить",
        subtract: "Вычесть",
        multiply: "Умножить",
        divide: "Разделить",
        difficulty: "Выбрать уровень",
        easy: "легкий (от 1 до 9)",
        medium: "средний (от 10 до 99)",
        hard: "тяжелый (от 100 до 999)",
        checkStats: "Посмотреть статистику",
        resetStats: "Сбросить",
        correctAnswer: "Ты прав!",
        wrongAnswer: "Неправильно ",
        wrongAnswer2: " неправильный ответ. Правильный ответ ",
        statsTitle: "ИТОГО:",
        correctStats: "✅ правильных ответов: ",
        mistakeStats: "❌ неправильных ответов: ",
        resetMessage: "Результаты сброшены"
    },
    en: {
        mainTitle: "Press a button to get a task :-)",
        add: "Add",
        subtract: "Subtract",
        multiply: "Multiply",
        divide: "Divide",
        difficulty: "Select difficulty",
        easy: "easy (1 to 9)",
        medium: "medium (10 to 99)",
        hard: "hard (100 to 999)",
        checkStats: "View statistics",
        resetStats: "Reset",
        correctAnswer: "You are right!",
        wrongAnswer: "Wrong ",
        wrongAnswer2: " is wrong. The correct answer is ",
        statsTitle: "TOTAL:",
        correctStats: "✅ Correct answers: ",
        mistakeStats: "❌ Wrong answers: ",
        resetMessage: "Statistics reset"
    },
    de: {
        mainTitle: "Drücke einen Knopf, um eine Aufgabe zu bekommen :-)",
        add: "Addieren",
        subtract: "Subtrahieren",
        multiply: "Multiplizieren",
        divide: "Dividieren",
        difficulty: "Schwierigkeit wählen",
        easy: "leicht (1 bis 9)",
        medium: "mittel (10 bis 99)",
        hard: "schwer (100 bis 999)",
        checkStats: "Statistik anzeigen",
        resetStats: "Zurücksetzen",
        correctAnswer: "Das ist richtig!",
        wrongAnswer: "Falsch ",
        wrongAnswer2: " ist falsch. Die richtige Antwort ist ",
        statsTitle: "ERGEBNIS:",
        correctStats: "✅ Richtige Antworten: ",
        mistakeStats: "❌ Falsche Antworten: ",
        resetMessage: "Statistik zurückgesetzt"
    }
};

function getTranslation(key) {
    const lang = currentLang || 'ru';
    return mathTranslations[lang]?.[key] || mathTranslations.ru[key];
}

function updateMathLanguage() {
    const elements = ['mainTitle', 'add', 'subtract', 'multiply', 'divide', 'difficulty', 'checkStats', 'resetStats'];
    elements.forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.textContent = getTranslation(key);
    });
    
    const selectOptions = document.querySelectorAll('#difficultySelect option');
    selectOptions.forEach(opt => {
        const val = opt.value;
        if (val === 'easy') opt.textContent = getTranslation('easy');
        if (val === 'medium') opt.textContent = getTranslation('medium');
        if (val === 'hard') opt.textContent = getTranslation('hard');
    });
}

setInterval(() => {
    if (window.currentLang) {
        updateMathLanguage();
    }
}, 100);

Object.defineProperty(window, 'currentLang', {
    set: function(lang) {
        this._currentLang = lang;
        updateMathLanguage();
    },
    get: function() {
        return this._currentLang || 'ru';
    }
});

updateMathLanguage();