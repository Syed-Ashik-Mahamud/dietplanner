function calculateBMI() {
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;

    var bmi = weight / ((height / 100) * (height / 100));
    var result = '';
    var calorieIntakeSuggestion = '';
    var calorieBurnSuggestion = '';

    if (bmi < 18.5) {
        result = 'Underweight';
        calorieIntakeSuggestion = 'Consume approximately 2500 calories/day';
        calorieBurnSuggestion = 'Burn around 200 calories/day';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        result = 'Normal weight';
        calorieIntakeSuggestion = 'Consume approximately 2000 calories/day';
        calorieBurnSuggestion = 'Burn around 500 calories/day';
    } else if (bmi >= 25 && bmi <= 29.9) {
        result = 'Overweight';
        calorieIntakeSuggestion = 'Consume approximately 1500 calories/day';
        calorieBurnSuggestion = 'Burn around 700 calories/day';
    } else {
        result = 'Obesity';
        calorieIntakeSuggestion = 'Consume approximately 1200 calories/day';
        calorieBurnSuggestion = 'Burn around 1000 calories/day';
    }

    var bmiMessage = 'Your BMI is ' + bmi.toFixed(2) + ' (' + result + ').';
    var calorieMessage = 'Suggested calorie intake: ' + calorieIntakeSuggestion + '. Suggested calorie burn: ' + calorieBurnSuggestion + '.';
    var disclaimer = 'Note: These are general suggestions. Individual needs may vary. Consult with a healthcare provider for personalized advice.';

    document.getElementById('bmi-result').innerHTML = bmiMessage + '<br>' + calorieMessage + '<br>' + disclaimer;
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

// ... existing JavaScript functions ...

function downloadRoutineAsPDF() {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF('landscape'); // Change to landscape mode for wider content

    // Capture the routine table using html2canvas
    html2canvas(document.getElementById('routine-table-container'), {
        scale: 1, // Adjust scale as needed for better resolution
        onclone: function (clonedDoc) {
            // Apply styles to cloned document if needed
        }
    }).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 280; // Adjust width to fit landscape page
        var imgHeight = canvas.height * imgWidth / canvas.width;

        // Check if height exceeds PDF page size, then adjust
        var pageHeight = doc.internal.pageSize.getHeight();
        if (imgHeight > pageHeight) {
            imgHeight = pageHeight;
            imgWidth = canvas.width * imgHeight / canvas.height;
        }

        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        doc.save('Weekly_Routine.pdf');
    });
}
