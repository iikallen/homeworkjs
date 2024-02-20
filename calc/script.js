document.addEventListener("DOMContentLoaded", function() {
    const inputDisplay = document.querySelector('.input');
    const resultDisplay = document.querySelector('.result');

    let currentInput = '';
    let currentResult = null;
    let operator = null;

    function updateDisplay() {
        inputDisplay.textContent = currentInput;
        resultDisplay.textContent = currentResult === null ? '' : currentResult;
    }

    function clearCalculator() {
        currentInput = '';
        currentResult = null;
        operator = null;
        updateDisplay();
    }

    function calculate() {
        let result;
        const num1 = parseFloat(currentResult);
        const num2 = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'x':
                result = num1 * num2;
                break;
            case '÷':
                if (num2 === 0) {
                    result = 'Error';
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                return;
        }
        currentResult = result.toString();
        currentInput = '';
        operator = null;
    }

    document.querySelectorAll('[data-key]').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key');
            if (key === '=') {
                if (operator && currentInput !== '') {
                    calculate();
                }
            } else if (key === 'del') {
                currentInput = currentInput.slice(0, -1); // Удаляем последний символ
                updateDisplay();
                return; // Добавленный код для корректного завершения выполнения функции
            } else if (['+', '-', 'x', '÷'].includes(key)) {
                if (currentInput !== '') {
                    if (currentResult === null) {
                        currentResult = currentInput;
                    } else if (operator) {
                        calculate();
                    }
                    operator = key;
                    currentInput = '';
                }
            } else {
                currentInput += key;
            }
            updateDisplay();
        });
    });

    clearCalculator();
});
