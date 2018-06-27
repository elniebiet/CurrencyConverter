const src_web = "https://free.currencyconverterapi.com";
let from_currency = "USD";
let to_currency = "PHP";
let currencies = [];
let amt = 1;
let rating = 0;

// /api/v5/convert?q=USD_PHP,PHP_USD&compact=ultra&apiKey=[YOUR_API_KEY] 
//get rating "USD_PHP", "PHP_USD"

const main = document.querySelector('#main');

async function convertNow(){
	let curr_fr = document.getElementById('CURR_FR');
	let curr_to = document.getElementById('CURR_TO');
	let amnt_fr = document.getElementById('CURR_FR_VAL');
	let disp = await document.getElementById('displayResult');
	
	disp.innerHTML = `<input type="text" id="CURR_VAL" readonly placeholder="converting..." 
	style="background-color: #eee; font-weight: bold;" />`;

	from_currency = curr_fr.options[curr_fr.selectedIndex].value;
	to_currency = curr_to.options[curr_to.selectedIndex].value;
	await getRatingOnline(from_currency, to_currency);

	amt = amnt_fr.value;
	let res = rating*amt;

	disp.innerHTML = `<input type="text" id="CURR_VAL" readonly placeholder="${res}" 
	style="background-color: #eee; font-weight: bold;" />`;
}

window.addEventListener('load', async e => {
	getRatingsOnline();
});

async function getRatingOnline(from_currency = "USD", to_currency = "PHP"){
	let res = await fetch(`${src_web}/api/v5/convert?q=${from_currency}_${to_currency}&compact=ultra&apiKey`);
	let json = await res.json();
	let to_fr = `${from_currency}_${to_currency}`;
	rating = json[to_fr];
}

async function getRatingsOnline(){
	getCurrencies(); 
	getRatingOnline(from_currency, to_currency);
}
async function getCurrencies(){
	let res = await fetch(`${src_web}/api/v5/currencies?apiKey`);
	let json = await res.json();
	let code = "";
	let index = 0;

	curr_json = JSON.stringify(json)

	
	index = curr_json.indexOf(`"id"`);
			currencies[0] = `${curr_json.charAt(index+6)}${curr_json.charAt(index+7)}${curr_json.charAt(index+8)}`;
	index++;

	for(let i=1; i<1000; i++){
		index = curr_json.indexOf(`"id"`,index);
		if(index !== -1){
			currencies[i] = `${curr_json.charAt(index+6)}${curr_json.charAt(index+7)}${curr_json.charAt(index+8)}`;
			index++;
		}
		else break;
	}
}