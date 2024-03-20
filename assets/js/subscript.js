let url = new URL(window.location.toString());
let countryName = url.searchParams.get('country');
const countryInfo = document.getElementById('country-info');
const themeToggler = document.getElementById('theme-toggler');
import {enableDarkMode, fetchCountries, toggleDarkMode } from "./helperFunc.js";

fetchCountries().
     then(countries => {
          renderInfo(countryName, countries)
     })

function renderInfo(countryName, countries) {
     let html = '';
     let hasNeighbors = false;
     countries.filter(country => country.name.common === countryName).forEach(country => {
          let currencies = '', languages = '', borders = '', nativeNames = '';
          for (const key in country.currencies) {
               currencies += country.currencies[key].name
          }

          for (const key in country.languages) {
               languages += `${country.languages[key]}, `
          }

          languages = languages.slice(0, languages.length - 2);
          let borderNames = [];
          country?.borders?.forEach(border => {
               let borderCountry = countries.filter(country => country.cca3 === border);
               let name = borderCountry[0]?.name.common;
               borderNames.push(name);
          })

          borderNames.forEach(name => {
               if (name !== undefined) {
                    borders += `<button class="btn-sm">${name}</button>`
               }
          })

          hasNeighbors = borders.trim() !== '';

          for (const key in country.name.nativeName) {
               nativeNames += `${country.name.nativeName[key].official}, `
          }

          nativeNames = nativeNames.slice(0, nativeNames.length - 2);

          html += `<div class="flag">
               <img src="${country.png}" alt="" >
          </div>
          <div class="info">
               <h2 class="coutry-name">${country.name.official}</h2>
               <div class="info-main">
                    <div>
                         <h5>Native Name: <span>${nativeNames}</span></h5>
                         <h5>Population: <span>${country.population}</span></h5>
                         <h5>Region: <span>${country.region}</span></h5>
                         <h5>Sub Region: <span>${country.subregion}</span></h5>
                         <h5>Capital: <span>${country.capital ? country.capital : "---"}</span></h5>
                    </div>
                    <div>
                         <h5>Top Level Domain: <span>${country.tld}</span></h5>
                         <h5>Currencies: <span>${currencies}</span></h5>
                         <h5>Languages: <span>${languages}</span></h5>
                    </div>
               </div>
               <div class="borders">
                    <h5>Border Countries:</h5>
                    ${borders.trim() ? borders : 'None'}
               </div>
          </div>`
     })

     countryInfo.innerHTML = html;

     if (hasNeighbors) {
          const btns = document.querySelectorAll('.btn-sm');
          btns.forEach(btn => {
               btn.onclick = (e) => {
                    let countryName = e.currentTarget.innerHTML;
                    renderInfo(countryName, countries);
               }
          })
     }
}

let darkMode = JSON.parse(localStorage.getItem('darkmode')) ? JSON.parse(localStorage.getItem('darkmode')) : 'disabled';

if(darkMode === 'enabled'){
     enableDarkMode(themeToggler);
}

themeToggler.onclick = (e) =>{
     toggleDarkMode(darkMode, e.currentTarget)
};