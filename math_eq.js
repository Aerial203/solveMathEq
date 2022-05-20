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
    const _test = equation.includes("+") || equation.includes("/") || equation.includes("-") || equation.includes("*")
    if (_test && equation.length > 1) {
        const step = getNextStep(equation)
        const result = solve(step)
        const newEquation = replaceNextStep(equation, step, result)
        return parse(newEquation)
    } 
    return equation    
}

function getNextStep(equation) {
    equation = equation.split(" ")
    if (equation.includes("(")) {
        for(let i = equation.indexOf("(") + 1; i < equation.indexOf(")"); i++) {
            if (equation[i] === operators.mul || equation[i] === operators.div) {
                return [equation[i - 1], equation[i], equation[i + 1]]
            }
        }

        for(let i = equation.indexOf("(") + 1; i < equation.indexOf(")"); i++) {
            if (equation[i] === operators.add || equation[i] === operators.sub) {
                return [equation[i - 1], equation[i], equation[i + 1]]
            }
        }
        
    } 

    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === operators.mul || equation[i] === operators.div) {
            return [equation[i - 1], equation[i], equation[i + 1]]
        }
    }
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === operators.add || equation[i] === operators.sub) {
            return [equation[i - 1], equation[i], equation[i + 1]]
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
    let j = 0, i
    if (equation.includes("(") && ((equation.indexOf(")") - equation.indexOf("(")) === 2)) {
        equation = _makeElementBackward(equation.indexOf("(")-1, equation)
        equation = _makeElementBackward(equation.indexOf(")")-1, equation)
        return equation.join(" ")
    }

    for (i = 0; i < equation.length; i++) {
        if (equation[i] === step[j] && equation[i + 1] === step[j + 1] && equation[i + 2] === step[j + 2]) {
            equation[i] = result.toString()
            break
        }
    }
    equation = _makeElementBackward(i, equation)
    equation = _makeElementBackward(i, equation)
    return equation.join(" ")
}

function _makeElementBackward(i, equation) {
    for (i = i + 1; i < equation.length; i++) {
        equation[i] = equation[i + 1]
    }
    equation.pop()
    return equation
}