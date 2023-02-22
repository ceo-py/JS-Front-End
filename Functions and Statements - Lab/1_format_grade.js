
function solve(grade){
    let output = ''
    grade = grade.toFixed(2)

    if (grade < 3.00){
        output = `Fail (2)`
    } else if (grade < 3.50){
        output = `Poor (${grade})`
    } else if (grade < 4.50){
        output = `Good (${grade})`
    } else if (grade < 5.50){
        output = `Very good (${grade})`
    } else if (grade >= 5.50){
        output = `Excellent (${grade})`
    }
    console.log(output)
}


solve(4.50)