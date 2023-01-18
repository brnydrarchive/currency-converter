import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { currencyCodes } from './currency-codes.js';
import CurrencyService from './service.js';

//Business Logic

async function getRates(amount, country) {
  const response = await CurrencyService.getRates();
  if  (isNaN(amount) || amount === "" || !(`${country}` in response.conversion_rates) ) {
    printError(response, country, amount);
  } else {
    convertCurrency(amount, country, response);
  }
}

function convertCurrency(amount, country, response) {
  let exchangeRate= response.conversion_rates[`${country}`];
  let convertedAmount = amount * exchangeRate;
  printCurrency(amount, convertedAmount, country);
}
//UI Logic

function printCurrency(amount, convertedAmount, country) {
  document.querySelector('#showCurrency').innerText = `${amount} USD is ${convertedAmount} ${country}`;
}

function printError(response, country, amount) {
  if (isNaN(amount) || amount === "") {
    document.querySelector('#showCurrency').innerText = 'There was an error processing the exchange rate for the amount entered. Please make sure that the amount field only includes numbers and is not empty.'; 
  } else {
    document.querySelector('#showCurrency').innerText = `There was an error processing the exchange rate for currency code ${country}: ${response["error-type"]}. Please try again`;
  }
}
function handleFormSubmission(event) {
  event.preventDefault();
  const selectedCode = document.getElementById("dropDown");
  const amount = document.querySelector('#amount-usd').value;
  document.querySelector('#amount-usd').value = null;
  const country = selectedCode.value;
  document.getElementById('dropDown').value = "AED";
  getRates(amount, country);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

document.addEventListener('DOMContentLoaded', function() {
  let dropDown = document.getElementById('dropDown');
  let codes = currencyCodes;
  console.log(codes);
  codes.forEach(function(code) {
    const option = document.createElement("option");
    option.value = code[0];
    option.text = code[0];
    dropDown.appendChild(option);
  }); 
});