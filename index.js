const betList = document.querySelector('.betList')
const result = document.querySelector('.result')
const formControll = document.querySelector('.formControll')
const formInput = document.querySelector('.formInput')
const yourBet = document.querySelector('.yourBet .betMoney')
const betItems = document.querySelectorAll('.betList .betItem')
const yourMoney = document.querySelector('.yourMoney p:nth-child(2)')
const roll = document.querySelector('button.submit')
const resultList = document.querySelector('.result ul')

const data = [
    {
        name: 'bau',
        price: 0,
        img: './img/3800521.png',
    },
    {
        name: 'cua',
        price: 0,
        img: './img/235447.png',
    },
    {
        name: 'tom',
        price: 0,
        img: './img/2346897.png',
    },
    {
        name: 'ca',
        price: 0,
        img: './img/1864557.png',
    },
    {
        name: 'huou',
        price: 0,
        img: './img/2223053.png',
    },
    {
        name: 'ga',
        price: 0,
        img: './img/20200511.png',
    },
]

let myMoney = 500000
let bet = 0
let resultItems = []

const handleSubmitBet = event => {
    event.preventDefault()
    bet = Number(formInput.value)
    yourBet.innerText = bet.toString()
    formInput.value = ''
}

const handleRender = (currentMoney, list) => {
    const html = list.map(
        item => `<li style="background-image: url(${item.img})"></li>`
    )
    resultList.innerHTML = html.join('')
    yourMoney.innerText = currentMoney.toString()
}

const handleRefund = list => {
    list.forEach(item => (myMoney += item.price))
    handleRender(myMoney, resultItems)
}

const handleRoll = () => {
    resultItems = []
    for (let i = 0; i < 3; i++) {
        resultItems = [
            ...resultItems,
            data[Math.floor(Math.random() * data.length)],
        ]
    }
    console.log(resultItems)
    handleRender(myMoney, resultItems)
    handleRefund(resultItems)
    data.forEach(item => {
        if (item.price !== 0) item.price = 0
    })
    console.log(data)
}

const handleClickItem = event => {
    if (myMoney > 0) {
        const name = event.target.getAttribute('name')
        console.log(name)
        data.forEach(item => {
            if (item.name === name) {
                myMoney -= bet
                item.price += bet
            }
        })
        console.log(data)
        handleRender(myMoney, resultItems)
    } else {
        alert('no enough money...')
    }
}

formControll.addEventListener('submit', handleSubmitBet)
betItems.forEach(item => {
    item.addEventListener('click', handleClickItem)
})
roll.addEventListener('click', handleRoll)
