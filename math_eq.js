// 2 + 4 * 3 - 7
// 2 + 12 - 7


const operators = {
    mul: '*',
    div: "/",
    add: "+",
    sub: "-"
}

function add(a, b) {
    return a + b
}

function sub(a, b) {
    return a - b
}

function mul(a, b) {
    return a * b
}

function div(a, b) {
    return a / b
}

function calculate(a, b, operation) {
    return operation(a, b)
}

export function parse(equation) {
    const step = getNextStep(equation) 
    const result = solve(step) 
    const newEquation = replaceNextStep(equation, step, result) 
    // return parse(newEquation)
}

function getNextStep(equation) {
    equation = equation.split(" ")
    for (let i = 0; i < equation.length; i++) {
        if(equation[i] === operators.mul || equation[i] === operators.div) {
            return [equation[i-1], equation[i], equation[i+1]]
        }
    }
    for (let i = 0; i < equation.length; i++) {
        if(equation[i] === operators.add || equation[i] === operators.sub) {
            return [equation[i-1], equation[i], equation[i+1]]
        }
    }
}

function solve(step) {
    let [fOperand, operation, sOperand] = step
    fOperand = parseFloat(fOperand)
    sOperand = parseFloat(sOperand)
    switch (operation) {
        case '*':
            return calculate(fOperand, sOperand, mul)
        case '/':
            return calculate(fOperand, sOperand, div)
        case '+':
            return calculate(fOperand, sOperand, add)
        case '-':
            return calculate(fOperand, sOperand, sub)
    }

}

function replaceNextStep(equation, step, result) {
    equation = equation.split(" ")
    let j = 0
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === step[j] && equation[i+1] === step[j+1] && equation[i+2] === step[j+2]) {
            equation[i] = result.toString()
            break
        }
    } 
    console.log(equation)
}