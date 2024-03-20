
import { enableDarkMode, fetchCountries, toggleDarkMode } from "./helperFunc.js";

const countryContainer = document.getElementById('country-container');

const form = document.getElementById('form');

const search = document.getElementById('search');

const dropdown = document.querySelector('.dropdown-content');

const dropdownToggler = document.getElementById('dropdown-btn');

const themeToggler = document.getElementById('theme-toggler');
let filterBtns = [];

dropdownToggler.addEventListener('click', (e) => {

     if (dropdown.classList.contains('hide')) {
          dropdown.classList.remove('hide');
     }
     else {
          dropdown.classList.add('hide')
     }
})

let darkMode = JSON.parse(localStorage.getItem('darkmode')) ? JSON.parse(localStorage.getItem('darkmode')) : 'disabled';

if(darkMode === 'enabled'){
     enableDarkMode(themeToggler);
}

themeToggler.onclick = (e) =>{
     toggleDarkMode(darkMode, e.currentTarget)
};


class countryAPI {
     setUppFilters(countries) {
          let regions = countries.map(country => {
               const { region } = country;
               return region;
          })

          regions = unique(regions);

          let buttons = '';

          regions.forEach(region => {
               buttons += `<button class ="filter-btn">${region}</button>`;
          })

          dropdown.innerHTML = buttons;

     }

     getButtons(countries) {
          let btns = document.querySelectorAll('.filter-btn');
          filterBtns = btns;
          let filteredCountry = []

          filterBtns.forEach(filter => {
               filter.addEventListener('click', (e) => {
                    filteredCountry = countries.filter(country => country.region === e.target.innerHTML);
                    this.displayCountries(filteredCountry);
                    addCardEvent();
               })
          })
     }

     displayCountries(countries) {
          let html = '';
          countries.forEach(country => {
               html += `<div role="button" class="card justify-between" data-country="${country.name.common?country.name.common:country.name}">
                              <img src="${country.png}" alt="${country.name.common?country.name.common:country.name}" class="img-fluid" />
                              <div class="flex flex-col">
                                   <h2 class="country-name">${country.name.official?country.name.official:country.name}</h2> 
                                   <h3>Population: <span>${country.population}</span></h3>
                                   <h3>Region: <span>${country.region}</span></h3>
                                   <h3>Capital: <span>${country.capital?country.capital:"---" }</span></h3>
                              </div>
                         </div>`
          })

          countryContainer.innerHTML = html;
     }
}

const myCountryAPI = new countryAPI();
document.addEventListener('DOMContentLoaded', () => {

     fetchCountries()
          .then(countries => {
               myCountryAPI.displayCountries(countries)
               return countries;
          }).then(countries => {
               myCountryAPI.setUppFilters(countries)
               return countries
          })
          .then(countries => myCountryAPI.getButtons(countries))
          .then(()=>
               addCardEvent()
          )

})


fetchCountries();

function addCardEvent(){
     const cards = document.querySelectorAll('div[role="button"]')

     cards.forEach(card => {
          card.addEventListener('click', (e) => {
               const {country} = e.currentTarget.dataset
               window.location.assign(`./country.html?country=${country}`)
          })
     })
} 


search.oninput = () => {
     fetchCountries()
          .then(countries => {
               countries = countries.filter(country => country.name?.official.toLowerCase().includes(search.value.toLowerCase()))
               myCountryAPI.displayCountries(countries)
          }).then(()=>
          addCardEvent()
     )

}


function unique(array) {
     let uniqueArray = [];
     if (array.length > 1) {
          array.forEach(element => {
               if (uniqueArray.indexOf(element) === -1) {
                    uniqueArray.push(element)
               }
          });
     }

     return uniqueArray;
}
