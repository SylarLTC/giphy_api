import {apiKey} from "./api_keys.js";

const baseURL = 'http://api.giphy.com/v1/gifs/search?'
const telegramURL = 'https://t.me/share/url?'
const giphyURL = 'https://giphy.com/gifs/'

const app = document.createElement('div')
const divContainer = document.querySelector('.container')

const loading = document.createElement('div')
const loadingBall = document.createElement('div')
const loadingText = document.createElement('p')
loading.classList.add('spinner')
loadingBall.classList.add('ball')
loading.appendChild(loadingBall)
loadingText.innerText = 'Loading'
loadingText.classList.add('loading-text')
loading.appendChild(loadingText)

const inputSearch = document.querySelector('.search-input')
const buttonSearch = document.querySelector('.fas')

app.classList.add('app')
divContainer.append(app)

buttonSearch.addEventListener('click', searchClick)

function searchClick() {
    inputSearch.value = inputSearch.value.replace([/' *'/], '')
    reRender()
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        inputSearch.value = inputSearch.value.replace([/' *'/], '')
        reRender()
    }
})

async function reRender() {
    const gifElement = document.getElementById('gifContainer')
    if (gifElement) {
        gifElement.remove()
    }
    app.append(loading)
    const gif = await getGifs()
    loading.remove()
    app.append(createGifs(gif))
}

async function getGifs() {
    const response = await fetch(`${baseURL}q=${inputSearch.value}&api_key=${apiKey}&limit=15`)
    const result = response.json()
    return result
}

function createGifs(gif) {
    const gifElement = document.createElement('div')
    gifElement.id = 'gifContainer'
    gifElement.classList.add('gif-container')

    const gifImages = document.createElement('div')
    gifImages.classList.add('gif-images')
    gif.data.forEach((elem) => {
        const aTelegram = document.createElement('a')
        const gifImage = document.createElement('img')
        const spanTelegram = document.createElement('span')
        const iconTelegram = document.createElement('i')

        aTelegram.target = '_blank'
        aTelegram.classList.add('a-telegram')
        gifImage.classList.add('gif-image')
        spanTelegram.classList.add('span-telegram')
        spanTelegram.classList.add('fadeIn')
        spanTelegram.setAttribute('data-fading', 'fadeIn')
        // spanTelegram.id = 'fadeIn'
        iconTelegram.classList.add('fab')
        iconTelegram.classList.add('fa-telegram')
        gifImage.src = elem.images.original.url
        aTelegram.href = `${telegramURL}url=${elem.url}`
        
        spanTelegram.append(iconTelegram)
        aTelegram.append(gifImage)
        aTelegram.append(spanTelegram)
        gifImages.append(aTelegram)
    })
    gifElement.append(gifImages)
    console.log(getGifs())

    return gifElement
}

// async function fadeInFadeOut() {
//     await reRender()
//     const gifElement = document.querySelector('#gifContainer')
//     const spanTelegram = document.querySelector('.span-telegram')
//     gifElement.addEventListener('mouseover', () => {
//         spanTelegram.removeAttribute('fadeIn')
//         spanTelegram.setAttribute('data-fading', 'fadeOut')
//     })
//     gifElement.addEventListener('mouseout', () => {
//         spanTelegram.removeAttribute('fadeOut')
//         spanTelegram.setAttribute('data-fading', 'fadeIn')
//     })
// }
// fadeInFadeOut()





