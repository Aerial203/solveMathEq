import { parse } from "./math_eq.js"

const inputEq = document.querySelector(".equation")
const answerDiv = document.querySelector(".solution")

document.addEventListener("click", e => {
    if (!e.target.matches(".solve-btn")) return
    const input = inputEq.value
    if (input === "") return
    const result = parse(input)
    answerDiv.innerText = result
    inputEq.value = ""
})