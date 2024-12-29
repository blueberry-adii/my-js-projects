"use strict";
const progressLabel = document.querySelector('.progress-label');
const progressBar = document.querySelector('.progress-bar');
const progressValueInBar = document.querySelector('.progress-value');
const progressValueInLabel = document.querySelector('.progress-value-label');
const errorBox = document.querySelector('.error');
const tasks = document.querySelectorAll('.task');
const checks = document.querySelectorAll('.check');
const inputs = document.body.querySelectorAll('input');
const resetButton = document.querySelector('#reset');
const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
];
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || [
    { name: '', completed: false },
    { name: '', completed: false },
    { name: '', completed: false }
];
let progressValue = 0;
progressValueInLabel.textContent = `${progressValue}/3 completed`;
checks.forEach((check, index) => {
    check.addEventListener("click", (e) => {
        var _a, _b;
        const allGoalsAdded = [...inputs].every(function (input) {
            return input.value;
        });
        if (allGoalsAdded) {
            (_a = check.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("checked");
            activeChecks();
            progressBarChange();
            if ((_b = check.parentElement) === null || _b === void 0 ? void 0 : _b.classList.contains('checked')) {
                allGoals[index].completed = true;
                inputs[index].disabled = true;
            }
            else {
                allGoals[index].completed = false;
                inputs[index].disabled = false;
            }
            updateLocalStorage();
        }
        else {
            errorBox.classList.add("active");
        }
    });
});
inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        errorBox.classList.remove("active");
    });
});
// for (let i = 0; i < inputs.length; i++) {
//     [...inputs][i].addEventListener('input', ()=>{
//         allGoals[i].name = inputs[i].value;
//         updateLocalStorage();
//     })
// }
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        allGoals[index].name = input.value;
        updateLocalStorage();
    });
});
resetButton.addEventListener('click', () => {
    allGoals.forEach((goal, index) => {
        var _a;
        goal.completed = false;
        goal.name = '';
        inputs[index].value = '';
        inputs[index].disabled = false;
        (_a = checks[index].parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('checked');
    });
    progressValue = 0;
    progressValueInLabel.textContent = `${progressValue}/3 completed`;
    progressLabel.textContent = allQuotes[progressValue];
    progressBarChange();
    updateLocalStorage();
});
function activeChecks() {
    progressValue = 0;
    let checkedList = document.querySelectorAll('.checked');
    progressValue = checkedList.length;
    progressValueInLabel.textContent = `${progressValue}/3 completed`;
    progressLabel.textContent = allQuotes[progressValue];
}
function progressBarChange() {
    progressValueInBar.style.width = `${(progressValue / 3) * 100}%`;
    if (progressValue === 0) {
        setTimeout(() => {
            progressValueInLabel.style.visibility = 'hidden';
        }, 30);
    }
    else {
        setTimeout(() => {
            progressValueInLabel.style.visibility = 'visible';
        }, 30);
    }
}
function updateLocalStorage() {
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
}
function initializeUI() {
    allGoals.forEach((goal, index) => {
        var _a;
        inputs[index].value = goal.name;
        if (goal.completed) {
            (_a = checks[index].parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('checked');
            inputs[index].disabled = true;
        }
    });
    activeChecks();
    progressBarChange();
}
initializeUI();
