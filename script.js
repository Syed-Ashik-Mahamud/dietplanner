// Function to calculate BMI
function calculateBMI() {
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;

    var bmi = weight / ((height / 100) * (height / 100));
    var result = '';

    if (bmi < 18.5) {
        result = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        result = 'Normal weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
        result = 'Overweight';
    } else {
        result = 'Obesity';
    }

    document.getElementById('bmi-result').innerHTML = 'Your BMI is ' + bmi.toFixed(2) + ' (' + result + ')';
}

// Global object to store meals for each day
var weeklyMeals = {
    1: { breakfast: '', lunch: '', dinner: '' },
    2: { breakfast: '', lunch: '', dinner: '' },
    3: { breakfast: '', lunch: '', dinner: '' },
    4: { breakfast: '', lunch: '', dinner: '' },
    5: { breakfast: '', lunch: '', dinner: '' },
    6: { breakfast: '', lunch: '', dinner: '' },
    7: { breakfast: '', lunch: '', dinner: '' }
};

// Function to add meals for the selected day
function addMeals() {
    var day = document.getElementById('day-select').value;
    weeklyMeals[day].breakfast = document.getElementById('breakfast-input').value || 'None';
    weeklyMeals[day].lunch = document.getElementById('lunch-input').value || 'None';
    weeklyMeals[day].dinner = document.getElementById('dinner-input').value || 'None';

    // Update the routine table
    generatePlan();
}

// Function to generate the weekly routine table
function generatePlan() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var meals = ['Breakfast', 'Lunch', 'Dinner'];

    var table = document.createElement('table');
    table.classList.add('table');

    // Create table header with meal times
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // Empty top-left cell
    meals.forEach(meal => {
        var th = document.createElement('th');
        th.innerText = meal;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body with days and meals
    var tbody = document.createElement('tbody');
    days.forEach(day => {
        var bodyRow = document.createElement('tr');
        var dayCell = document.createElement('td');
        dayCell.innerText = day;
        bodyRow.appendChild(dayCell);

        meals.forEach(meal => {
            var td = document.createElement('td');
            td.innerText = weeklyMeals[days.indexOf(day) + 1][meal.toLowerCase()] || 'None';
            bodyRow.appendChild(td);
        });

        tbody.appendChild(bodyRow);
    });
    table.appendChild(tbody);

    // Append the table to the container
    var container = document.getElementById('routine-table-container');
    container.innerHTML = ''; // Clear previous content
    container.appendChild(table);
}

// Function to download the weekly routine as a PDF
function downloadRoutineAsPDF() {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();

    // Use jsPDF's html method to convert the table to PDF
    doc.html(document.getElementById('routine-table-container').innerHTML, {
        callback: function (doc) {
            doc.save('Weekly_Routine.pdf');
        },
        x: 10,
        y: 10
    });
}
