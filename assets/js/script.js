window.addEventListener("DOMContentLoaded", () => {
    const dayOutput = document.querySelector(".output-day span");
    const monthOutput = document.querySelector(".output-month span");
    const yearOutput = document.querySelector(".output-year span");
    const ageForm = document.querySelector("#age-form");
    const formFields = document.querySelectorAll(".form-field");

    formFields.forEach((field) => {
        const input = field.querySelector(".form-control");
        const error = field.querySelector("span");
        input.addEventListener("input", (e) => {
            validateDate(e.target.value, error, e.target.name, field);
        });
    });

    ageForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formFields = document.querySelectorAll(".form-field");
        formFields.forEach((field) => {
            const value = field.querySelector(".form-control").value;
            const targetName = field.querySelector(".form-control").name;
            const errorContainer = field.querySelector("span");

            validateDate(value, errorContainer, targetName, field);
        });

        const error = document.querySelector(".error");
        if (error == null) {
            // geting valid date
            const day = Number(document.querySelector("#day").value);
            const month = Number(document.querySelector("#month").value);
            const year = Number(document.querySelector("#year").value);

            const DAYS_IN_MONTH = getDaysInMonth(month - 1, year);
            const TOTAL_MONTH = 12;

            // initilizing calculated date
            let calcDay = 0,
                calcMonth = 0,
                calcYear = 0;

            const currentDate = new Date();

            let currnetDay = currentDate.getDate();
            let currnetMonth = currentDate.getMonth() + 1;
            let currnetYear = currentDate.getFullYear();

            // calculating day
            if (currnetDay < day) {
                currnetMonth -= 1;
                calcDay = currnetDay + DAYS_IN_MONTH - day;
            } else {
                calcDay = currnetDay - day;
            }

            // calculating month
            if (currnetMonth < month) {
                currnetYear -= 1;
                calcMonth = currnetMonth + TOTAL_MONTH - month;
            } else {
                calcMonth = currnetMonth - month;
            }

            // calculate year
            calcYear = currnetYear - year;

            // updating the calculated value
            animateOutput(dayOutput, calcDay);
            animateOutput(monthOutput, calcMonth);
            animateOutput(yearOutput, calcYear);
            return;
        }

        dayOutput.textContent = "--";
        monthOutput.textContent = "--";
        yearOutput.textContent = "--";
    });

    function animateOutput(element, number) {
        let count = 0;
        const interval = setInterval(() => {
            if (count > number) {
                clearInterval(interval);
                element.textContent = number;
            }

            element.textContent = count;
            count++;
        }, 25);
    }

    function validateDate(value, error, targetName, field) {
        if (value == "") {
            showError(field, error, "This field is required");
            return;
        } else if (isNaN(value)) {
            showError(field, error, "The field must be a number");
        } else if (value < 1) {
            showError(field, error, `Must be valiid ${targetName}`);
        } else {
            removeError(field, error, "");
        }

        switch (targetName) {
            case "day":
                if (value > 31 && value != "") {
                    showError(field, error, "Must be valid day");
                }
                break;
            case "month":
                if (value > 12 && value != "") {
                    showError(field, error, "Must be valid month");
                }
                break;
            case "year":
                const currentYear = new Date().getFullYear();
                if (value < 999) {
                    showError(field, error, "Must be 4 digit");
                }
                if (value > currentYear && value != "") {
                    showError(field, error, "Must be in the past");
                }
                break;
        }
    }

    function getDaysInMonth(m, y) {
        switch (m) {
            case 1:
                return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
            case 8:
            case 3:
            case 5:
            case 10:
                return 30;
            default:
                return 31;
        }
    }

    function showError(parent, errorElm, message) {
        parent.classList.add("error");
        errorElm.textContent = message;
    }
    function removeError(parent, errorElm, message) {
        parent.classList.remove("error");
        errorElm.textContent = message;
    }
});
