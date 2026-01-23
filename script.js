const date = new Date();

const currentMonth = date.getMonth();
const currentDay = date.getDay();
const currentDate = date.getDate();
const currentYear = date.getFullYear();


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

 
 const title = document.getElementById("title");
    title.innerHTML = months[currentMonth];


 const habitTitle = document.getElementById("habitTitle");
 const savedHabit = localStorage.getItem("habit");

    if (savedHabit) {
    habitTitle.innerHTML = savedHabit;
}

    habitTitle.addEventListener("click", () => {
    const habit = prompt
    ("What habit would you like to track?", 
    habitTitle.innerHTML)
    if (!habit || habit.length == 0 ) {
        habitTitle.innerHTML = "Click to set your habit";
        localStorage.removeItem("habit");
    } else {
        habitTitle.innerHTML = habit;
        localStorage.setItem("habit", habit);
    }
 });

 
 const daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 const daysInThisMonth = daysInTheMonthList[currentMonth];

 let daysCompleted = 0;
 let totalDays = document.getElementById("totalDays");

 
let dayCount = 0;
let rowCount = 0;
const days = document.getElementsByClassName("days");

for(let i=0; i < days.length; i++ ){
    const day = days[rowCount].getElementsByClassName("day");
    for (let j=0; j < day.length; j++){

        if(dayCount == currentDate -1){
            day[j].setAttribute("style", "border:2px solid black");
        }
        if (dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount + 1));
            dayCount++;
        } else {
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color:antiquewhite");
        }
    }
    rowCount++;
}

const completed = new Array(31);
for (let i = 0; i < dayCount; i++) {
    const tempString =
    `${currentMonth + 1}-${i + 1}-${currentYear}`;
    
    const tempDay = localStorage.getItem(tempString);

    if(tempDay == null || tempDay == "false") {
        localStorage.setItem(tempString, "false");
    } else if (tempDay == "true") {
        daysCompleted++;
    }
    totalDays.innerHTML = 
    `${daysCompleted}/${daysInThisMonth}`;
}

for (let i = 0; i < currentDate; i++) {
    let tempString =
    `${currentMonth + 1}-${i + 1}-${currentYear}`;

    const chosenDay = localStorage.getItem(tempString);
    const chosenDayDiv = document.getElementById("day" + (i + 1));
    if (chosenDay === "true") {
        chosenDayDiv.style.backgroundColor = "#ff8605c2";
    } else if (chosenDay === "false") {
        chosenDayDiv.style.backgroundColor = "#faebd7";
    }
}

const dayDivs = document.querySelectorAll(".day");
for (let i = 0; i < currentDate; i++) {
    dayDivs[i].onclick = function (e) {
        const num = e.target.innerText;
        const selectedDate = document.getElementById(e.target.id);
        const storageString = 
        `${currentMonth + 1}-${num}-${currentYear}`;

        if (localStorage.getItem(storageString) === "false") {
            selectedDate.style.backgroundColor = "#ff8605c2";
            localStorage.setItem(storageString, "true");
            daysCompleted++;

        }else if (localStorage.getItem(storageString) === "true") {
             selectedDate.style.backgroundColor = "#faebd7";
             localStorage.setItem(storageString, "false");
             daysCompleted--;
        }

        totalDays.innerHTML = 
        `${daysCompleted}/${dayCount}`;
        if (daysCompleted === currentDate)
        alert ("Great progress!");
    }

}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    for (let i = 0; i < dayCount; i++) {
        let tempString =
        `${currentMonth + 1}-${i + 1}-${currentYear}`;
        localStorage.setItem(tempString, "false");
        const curDay = document.getElementById("day" + (i + 1));
        curDay.style.backgroundColor = "#faebd7";
    }
    daysCompleted = 0;
    totalDays.innerHTML = 
    `${daysCompleted}/${daysInThisMonth}`;

    localStorage.removeItem("habit");
    habitTitle.innerHTML = "Click to set your habit";
});
