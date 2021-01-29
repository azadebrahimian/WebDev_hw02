(function () {
    "use strict";

    // Get all the items to interact with from calculator.
    const product = document.getElementById("product");
    const numbers = document.getElementsByClassName("number");
    const operations = document.getElementsByClassName("operation");
    const clear = document.getElementsByClassName("clear")[0];

    // Variables to represent the previous value entered/computed, the current value entered, and the current operator chosen.
    var previous = "";
    var current = "";
    var operator = null;

    // Clear the text output and wipe all existing variable data.
    function clearProduct() {
        current = "";
        previous = "";
        operator = null;
    }

    // Set the output box's text value to be what is currently entered/computed.
    function updateProduct() {
        product.innerHTML = current;
    }

    // Append the entered number to the existing number on output.
    function append(num) {
        // If decimal has already been entered, don't let another one be entered.
        if (num === "." && current.includes(".")) {
            return;
        }
        current = current.toString() + num.toString();
    }

    // Assign the operator variable to the operation chosen.
    function operate(op) {
        let isAddOrEqual = op === "+/=";

        // If no number has been entered at all, do not allow an .
        if (previous === "" && current === "") {
            return;
        } else if (
            (previous !== "" && current === "") ||
            (previous === "" && current !== "")
        ) {
            // If no operator has been selected yet, make previous value equal to current, and set current to empty to await next number for computation.
            // This is done to allow a user to change their operation choice without clearing their number entry.
            if (operator === null) {
                previous = current;
                current = "";
            }

            // If the operation chosen was +/=, assume operation of choice is + since there only exists one value of either previous or current. Else, set operation to what was chosen.
            if (isAddOrEqual) {
                operator = "+";
            } else {
                operator = op;
            }
        } else {
            // If the operation chosen was +/=, assume operation of choice is = since there now exists a value for both previous and current. Else, do nothing.
            if (isAddOrEqual) {
                calculate();
            } else {
                return;
            }
        }
    }

    // Calculate the expression entered by the user.
    function calculate() {
        let result;
        const prev = parseFloat(previous);
        const curr = parseFloat(current);
        switch (operator) {
            case "-":
                result = prev - curr;
                break;
            case "*":
                result = prev * curr;
                break;
            case "÷":
                result = prev / curr;
                break;
            default:
                result = prev + curr;
                break;
        }

        // Reset variables while setting computed result to current variable, to allow for continued calculations.
        operator = null;
        current = result;
        previous = "";
    }

    // Set event listener for the clear button.
    clear.addEventListener("click", () => {
        clearProduct();
        updateProduct();
    });

    // Set event listener for all number buttons.
    for (const number of numbers) {
        number.addEventListener("click", () => {
            append(number.innerHTML);
            updateProduct();
        });
    }

    // Set event listener for all operation buttons.
    for (const operation of operations) {
        operation.addEventListener("click", () => {
            operate(operation.innerHTML);
            updateProduct();
        });
    }
})();
