var form = document.getElementById("brew-form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

// Grab the input field data and submit button and store in variables
let beerInput = document.getElementById('beerInput');
let submit = document.getElementById('submit');
let beerInfo = document.getElementById('beerInfo');
// Store the Root Endpoint
let root = 'https://api.punkapi.com/v2/beers';
let url = `${root}`

async function getBeerData() {
    let query = beerInput.value;
    let endPoint = url + "?" + "beer_name=" + query;
    try {
        const response = await fetch(endPoint);
        if(response.ok) {
            const jsonResponse = await response.json();
            return renderBeerInfo(jsonResponse);
        }
        throw new Error('Request Failed!');
    } catch (error) {
        console.log(error);
    }
}

const renderBeerInfo = res => {
    // Create empty obj to store JSON in key-value pairs
    let response = res;
    let rawJson = {};
    for(let key in response) {
        rawJson[key] = response[key];
    }
    let beerNames = [];
    for(let name in rawJson) {
        beerNames.push(rawJson[name].name);
    }
    // Convert JSON into a string and add line breaks to make
    // it easier to read
    // Adds data to the span on the page
    let beerNamesJoined = beerNames.slice(',').join("<br />");
    beerInfo.innerHTML = `<p><br><br>${beerNamesJoined}</p>`;
}

submit.addEventListener('click', getBeerData);