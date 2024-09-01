'use strict';


const formSearch = document.querySelector('#form-api');
const citySearch = document.querySelector('#city-search');
const containerInfoWeather = document.querySelector('aside.data-weather');
const containerIcon = document.querySelector('#container-icon-data > img');
const containerDescription = document.querySelector('container-general-data');
const headingData = document.querySelector('#heading-weather-data');
let headingCreated = false;

formSearch.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    try {
        const cityUrl = '/city/' + encodeURIComponent(citySearch.value)
        const cityResponse = await fetch(cityUrl)
        const cityData = await cityResponse.json()
       // const headingSearch = document.querySelector('.heading-city')
        renderCity(cityData)
    }
    catch(error){
        console.error(error)
    }
    
})

citySearch.addEventListener('input', (evt) => {

    headingData.innerHTML = citySearch.value
   
})

const renderCity =  (city) => {
    renderImageCity(city);
    renderDescription(city);
}

const renderImageCity = ({image, name}) => {
    containerIcon.classList.add('icon')
    containerIcon.alt = name
    containerIcon.src = image;
    containerIcon.width = 50
    containerIcon.height = 50
    containerIcon.classList.remove('hidden');
}

const renderDescription = ({description, lat, long}) => {

    const children = Array.from(containerInfoWeather.children)
    const renderArticle = Array.from(children.filter(child => child.nodeName == 'ARTICLE'));

    if(renderArticle.length > 0){
         containerInfoWeather.removeChild(renderArticle[0])
    }

    const article = document.createElement('article')
    const capitalizeDescription = description.charAt(0).toUpperCase() + description.slice(1);
    article.classList.add('container-general-data');
    article.innerHTML = `<header><p class="description-city">${capitalizeDescription}</p></header>
    <div class="coordinates">
        <p><strong>Latitud:</strong> ${lat}</p>
        <p><strong>Longitud:</strong> ${long}</p>
    </div>`
    containerInfoWeather.appendChild(article);
    
    

}
