function solve(num1, num2) {
    const factorial = (n) => {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    };
    const factorial1 = factorial(num1);
    const factorial2 = factorial(num2);
    const result = (factorial1 / factorial2).toFixed(2);
    console.log(result);
}


solve(5, 2); // Outputs: 40.00
