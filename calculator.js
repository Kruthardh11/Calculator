class Calculator{
    constructor(prevOperatorText, currentOperatorText){
        this.prevOperatorText = prevOperatorText
        this.currentOperatorText = currentOperatorText
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand =  this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.prevOperand !== ''){this.compute( )}
        this.operation = operation
        this.prevOperand = this.currentOperand;
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = '' 
    }
    getdisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperatorText.innerText = this.getdisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.prevOperatorText.innerText = `${this.getdisplayNumber(this.prevOperand)} ${this.operation}`
        } else{
            this.prevOperatorText.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButton  = document.querySelectorAll('[data-operation]')
const AllClear = document.querySelector('[data-allclear]')
const del = document.querySelector('[data-del]')
const equals = document.querySelector('[data-equal]')
const prevOperatorText = document.querySelector('[data-prev-operand]')
const currentOperatorText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperatorText, currentOperatorText)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButton.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    } )
})
equals.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})
AllClear.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
del.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})