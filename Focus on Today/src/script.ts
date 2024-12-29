const progressLabel = document.querySelector('.progress-label') as HTMLParagraphElement;
const progressBar = document.querySelector('.progress-bar') as HTMLDivElement;
const progressValueInBar = document.querySelector('.progress-value') as HTMLDivElement;
const progressValueInLabel = document.querySelector('.progress-value-label') as HTMLSpanElement;
const errorBox = document.querySelector('.error') as HTMLParagraphElement;
const tasks = document.querySelectorAll('.task') as NodeListOf<HTMLDivElement>;
const checks = document.querySelectorAll('.check') as NodeListOf<HTMLDivElement>;
const inputs = document.body.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
const resetButton = document.querySelector('#reset') as HTMLButtonElement;

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
]

type data = {name: string, completed: boolean};

const allGoals: data[] = JSON.parse((localStorage.getItem('allGoals') as string)) || [
    {name: '', completed: false},
    {name: '', completed: false},
    {name: '', completed: false}
];

let progressValue = 0;
progressValueInLabel.textContent = `${progressValue}/3 completed`;

checks.forEach((check, index) => {
    check.addEventListener("click", (e)=>{
        const allGoalsAdded = [...inputs].every(function (input) {
            return input.value;
        })
        if(allGoalsAdded){
            check.parentElement?.classList.toggle("checked");
            activeChecks();
            progressBarChange();
            if(check.parentElement?.classList.contains('checked')){
                allGoals[index].completed = true;
                inputs[index].disabled = true;
            } else {
                allGoals[index].completed = false;
                inputs[index].disabled = false;
            }
            updateLocalStorage();
        } else {
            errorBox.classList.add("active");
        }
    }
)});

inputs.forEach((input)=>{
    input.addEventListener('focus', ()=>{
        errorBox.classList.remove("active");
    })
})

// for (let i = 0; i < inputs.length; i++) {
//     [...inputs][i].addEventListener('input', ()=>{
//         allGoals[i].name = inputs[i].value;
//         updateLocalStorage();
//     })
// }

inputs.forEach((input, index) => {
    input.addEventListener('input', ()=>{
        allGoals[index].name = input.value;
        updateLocalStorage();
    })
})

resetButton.addEventListener('click', ()=>{
    allGoals.forEach((goal, index) => {
        goal.completed = false;
        goal.name = '';
        inputs[index].value = '';
        inputs[index].disabled = false;
        checks[index].parentElement?.classList.remove('checked');
    });
    progressValue = 0;
    progressValueInLabel.textContent = `${progressValue}/3 completed`;
    progressLabel.textContent = allQuotes[progressValue];
    progressBarChange();
    updateLocalStorage();
})

initializeUI();

function activeChecks():void{
    progressValue=0;
    let checkedList = document.querySelectorAll('.checked');
    progressValue = checkedList.length;
    progressValueInLabel.textContent = `${progressValue}/3 completed`;
    progressLabel.textContent = allQuotes[progressValue]; 
}

function progressBarChange():void{
    progressValueInBar.style.width = `${(progressValue/3)*100}%`
    if(progressValue===0){
        setTimeout(()=>{
            progressValueInLabel.style.visibility = 'hidden';
        }, 30);
    } else {
        setTimeout(()=>{
            progressValueInLabel.style.visibility = 'visible';
        }, 30);
    }
}

function updateLocalStorage():void{
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
}

function initializeUI():void{
    allGoals.forEach((goal, index) => {
        inputs[index].value = goal.name;
        if (goal.completed) {
            checks[index].parentElement?.classList.add('checked');
            inputs[index].disabled = true;
        }
    });
    activeChecks();
    progressBarChange();
}
