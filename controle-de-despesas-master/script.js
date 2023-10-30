const transactionUL = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay =document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector("#amount")


const localStorangeTrasactions = JSON.parse(localStorage
    .getItem('transactions'))
let Transactions = localStorage
    .getItem('transactions') !== null ? localStorangeTrasactions : []

const removeTransaction = ID => {
    Transactions = Transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorange()
    init()
}

const addTransactionInToDom = ({id, name, amount}) => {
    const operator = amount < 0 ? '-' : '+'
    const cssClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = ` 
        <span>${name} ${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `
    transactionUL.appendChild(li)
}

const getExpenses = transactionsAmounts =>  expense = Math.abs(transactionsAmounts
        .filter(transaction => transaction < 0)
        .reduce( (acc, val) => acc + val, 0))
        .toFixed(2)


const getIncome = transactionsAmounts => income = transactionsAmounts
        .filter(transaction => transaction > 0)
        .reduce( (acc, val) => acc + val, 0)
        .toFixed(2)


const getTotal = transactionsAmounts =>total = transactionsAmounts
        .reduce((acc, transaction) => acc + transaction, 0)
        .toFixed(2)


const updateBalanceValues = () => {
    const transactionsAmounts =  Transactions.map(({amount}) => amount)

    balanceDisplay.textContent = `R$ ${getTotal(transactionsAmounts)}`
    incomeDisplay.textContent = `R$ ${getIncome(transactionsAmounts)}`
    expenseDisplay.textContent = `R$ ${getExpenses(transactionsAmounts)}` 
}

const init = () => {
    transactionUL.innerHTML = ''
    Transactions.forEach(addTransactionInToDom)
    updateBalanceValues()
}

init()

const updateLocalStorange = () => {
    localStorage.setItem('transactions', JSON.stringify(Transactions))
}

const generateID = () => Math.round(Math.random() *1000)

const clearInputs = () => {
    inputTransactionName.innerHTML = ''
    inputTransactionAmount.innerHTML = ''
}

const addToTransactionsArray = (transactionName, transctionAmount) => {
    const transaction = { 
        id:generateID(), 
        name: transactionName, 
        amount: Number(transctionAmount)
    }
    Transactions.push(transaction)
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transctionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === ''


    if(isSomeInputEmpty){
        alert('Por favor, preencha os dois campos')
        return
    }

    addToTransactionsArray(transactionName, transctionAmount)
    init()
    updateLocalStorange()
    clearInputs()
}

form.addEventListener('submit', handleFormSubmit)