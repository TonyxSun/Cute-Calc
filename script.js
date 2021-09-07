const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = function (operation, a, b) {
    let ans = 0;
    switch (operation) {
        case 'add':
            ans = add(a, b);
            break;
        case 'subtract':
            ans = subtract(a, b);
            break;
        case 'multiply':
            ans = multiply(a, b);
            break;
        case 'subtract':
            ans = subtract(a, b);
            break;
    }
    return ans;
}

operate(multiply, 3,4);