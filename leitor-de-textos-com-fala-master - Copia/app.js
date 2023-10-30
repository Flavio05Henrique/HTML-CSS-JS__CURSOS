const main = document.querySelector('main')

const humanExpressions =[
    {'img': './img/drink.jpg', 'text': 'Estrou com sede'},
    {'img': './img/food.jpg', 'text': 'Estrou com fome'},
    {'img': './img/tired.jpg', 'text': 'Estrou com cansado'},
    {'img': './img/hurt.jpg', 'text': 'Estrou com machucado'},
    {'img': './img/happy.jpg', 'text': 'Estrou com feliz'},
    {'img': './img/angry.jpg', 'text': 'Estrou com raiva'},
    {'img': './img/sad.jpg', 'text': 'Estrou com triste'},
    {'img': './img/scared.jpg', 'text': 'Estrou assustado'},
    {'img': './img/outside.jpg', 'text': 'Quero ir lá fora'},
    {'img': './img/home.jpg', 'text': 'Quero ir para casa'},
    {'img': './img/school.jpg', 'text': 'Quero ir para escola'},
    {'img': './img/grandma.jpg', 'text': 'Quero ver a vovó'}
]

const createExpressionBox = ({img, text}) => {
    // const div = document.createElement('div')
    // div.classList.add('expression-box')
    // div.innerHTML = `
    //     <img src="${img}" alt="${text}>
    //     <p class="info">${text}</p>
    // `

    // main.appendChild(div)
    // console.log(div)

    main.innerHTML += `
        <div class="expression-box">
            <img src="${img}" alt="${text}>
            <p class="info">${text}</p>
        </div>
    `
}



humanExpressions.forEach(el => createExpressionBox(el))