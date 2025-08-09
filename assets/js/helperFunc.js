
export async function fetchCountries() {
     const response = await fetch('/data.json');
     const data = await response.json();

     let countries = data;

     countries = countries.map(country => {
          const { name, tld, population, region, subregion, capital, flags, currencies, languages, borders, cca3 } = country;
          const { png } = flags;
          return { name, tld, population, region, subregion, capital, png, currencies, languages, borders, cca3 };
     })

     return countries;
     
}



export const enableDarkMode = function (toggler){
     toggler.children[0].className ="fa fa-sun";
     document.documentElement.classList.add('darkmode');
     localStorage.setItem('darkmode', JSON.stringify('enabled'));
}


export const disableDarkMode = function (toggler){
     toggler.children[0].className ="fa fa-moon";
     document.documentElement.classList.remove('darkmode');
     localStorage.setItem('darkmode', JSON.stringify('disabled'));
}



export const toggleDarkMode = function(darkMode, toggler){
     darkMode = JSON.parse(localStorage.getItem('darkmode'));
     if(darkMode === 'enabled')
     {
          disableDarkMode(toggler);
     }else{
          enableDarkMode(toggler);
     }
}



