import { parse } from "./math_eq.js"

const form = document.querySelector("#equation-form")
const equation = document.getElementById("equation")
const result = document.getElementById("result") 


form.addEventListener("submit", e => {
    e.preventDefault()
    const answer = parse(equation.value)
    result.innerText = answer
    equation.value = ""
})
