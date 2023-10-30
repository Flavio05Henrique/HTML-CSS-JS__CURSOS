const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const buttonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivText = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')

const humanExpressions =[
    {img: './img/drink.jpg', text: 'Estou com sede'},
    {img: './img/food.jpg', text: 'Estou com fome'},
    {img: './img/tired.jpg', text: 'Estou cansado'},
    {img: './img/hurt.jpg', text: 'Estou com machucado'},
    {img: './img/happy.jpg', text: 'Estou feliz'},
    {img: './img/angry.jpg', text: 'Estou com raiva'},
    {img: './img/sad.jpg', text: 'Estou triste'},
    {img: './img/scared.jpg', text: 'Estou assustado'},
    {img: './img/outside.jpg', text: 'Quero ir lá fora'},
    {img: './img/home.jpg', text: 'Quero ir para casa'},
    {img: './img/school.jpg', text: 'Quero ir para escola'},
    {img: './img/grandma.jpg', text: 'Quero ver a vovó'}
]

const utterance =  new SpeechSynthesisUtterance()

const setTextMessage = text => {
    utterance.text = text
}

const speakText = () => {
    speechSynthesis.speak(utterance)
}

const setVoice = event => {
    const voiceValue = event.target.value
    const selectdVoice = voices.find( voice => voice.name === voiceValue)
    utterance.voice = selectdVoice
}

const addExpressionBoxesInDom = () => {
    main.innerHTML = humanExpressions.map( ({img, text}) => 
        `<div class="expression-box" data-js="${text}">
            <img src="${img}" alt="${text}">
            <p class="info">${text}</p>
        </div>`
    ).join('')
}
addExpressionBoxesInDom()

const setStyleClickedDiv = div => {
    div.classList.add('active')
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000)
}

main.addEventListener('click', event => {
    const clickedElement = event.target
    const checkIdClickedCardIdValid = clickedElement.parentNode.tagName === 'DIV' && clickedElement.tagName != 'MAIN'
    
    if(checkIdClickedCardIdValid){
        const div = clickedElement.parentNode
        const divText = div.dataset.js
        setTextMessage(divText)
        speakText()
        setStyleClickedDiv(div)
    }
})

const insertOptionsElementsIntoDOM = voices => {
    selectElement.innerHTML = voices.reduce((acc, { name, lang }) => {
        acc += `<option value="${name}">${lang} | ${name}</option>`
        return acc
    }, '')
}

const setUtteranceVoice = (voiceElement) => {
    utterance.voice = voiceElement
    const voiceOpetion = selectElement
        .querySelector(`[value="${voiceElement.name}"]`)
    voiceOpetion.selected = true
}

const setPtBR = voices => {
    const googleVoice = voices.find(voice => 
        voice.name === 'Google português do Brasil')
    const microsoftVoice = voices.find(voice => 
        voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)')

    if (googleVoice) {
        setUtteranceVoice(googleVoice)
    } else if (microsoftVoice){
        setUtteranceVoice(microsoftVoice)
    }
}
let voices = []

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()

    insertOptionsElementsIntoDOM(voices)
    setPtBR(voices)
})

buttonInsertText.addEventListener('click', () => {
    divTextBox.classList.add('show')
})

closeDivText.addEventListener('click', () => {
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', event => {
    setVoice(event)
})

buttonReadText.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})