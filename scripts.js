const form = document.querySelector("#equation-form")
const inputElement = document.getElementById("equation")
const outputElement = document.getElementById("result") 

const PARENTHESIS = /\((?<equation>[^\(\)]*)\)/
const MULTIPLY_AND_DIVIDE_RE= /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/
const ADD_AND_SUB= /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/
const EXPONENT = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/


form.addEventListener("submit", e => {
    e.preventDefault()
    const result = parse(inputElement.value)
    outputElement.textContent = result
})


function parse(equation) {
    if (equation.match(PARENTHESIS)) {
        const subEquation = equation.match(PARENTHESIS).groups.equation
        const result = parse(subEquation)
        const newEquation = equation.replace(PARENTHESIS, result)
        return parse(newEquation)
    }else if (equation.match(EXPONENT)) {
        const result = handle_math(equation.match(EXPONENT).groups)
        const newEquation = equation.replace(EXPONENT, result)
        return parse(newEquation)
    } else if (equation.match(MULTIPLY_AND_DIVIDE_RE)) {
        const result = handle_math(equation.match(MULTIPLY_AND_DIVIDE_RE).groups)
        const newEquation = equation.replace(MULTIPLY_AND_DIVIDE_RE, result)
        return parse(newEquation)
    } else if (equation.match(ADD_AND_SUB)) {
        const result = handle_math(equation.match(ADD_AND_SUB).groups)
        const newEquation = equation.replace(ADD_AND_SUB, result)
        return parse(newEquation)
    } else {
        return parseFloat(equation)
    }
    
}

function handle_math({operand1, operation, operand2}) {
    const number1 = parseFloat(operand1)
    const number2 = parseFloat(operand2)

    switch(operation) {
        case "*":
            return number1 * number2
        case "/":
            return number1 / number2
        case "+":
            return number1 + number2
        case "-":
            return number1 - number2
        case "^":
            return number1 ** number2
    }
}
