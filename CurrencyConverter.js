const src_web = "https://free.currencyconverterapi.com";
let from_currency = "USD";
let to_currency = "PHP";
let amt = 1;
let rating = 0;

// /api/v5/convert?q=USD_PHP,PHP_USD&compact=ultra&apiKey=[YOUR_API_KEY] 
//get rating "USD_PHP", "PHP_USD"
const main = document.querySelector('#main');

function convertNow(){
	let curr_fr = document.getElementById('CURR_FR');
	let curr_to = document.getElementById('CURR_TO');
	let amnt_fr = document.getElementById('CURR_FR_VAL');

	from_currency = curr_fr.options[curr_fr.selectedIndex].value;
	to_currency = curr_to.options[curr_to.selectedIndex].value;
	amt = amnt_fr.value;

}

window.addEventListener('load', async e => {
	getRatingsOnline();
});

async function getRatingsOnline(from_currency = "USD", to_currency = "PHP"){
	const res = await fetch(`${src_web}/api/v5/convert?q=${from_currency}_${to_currency}&compact=ultra&apiKey`);
	const json = await res.json();

	rating = json.USD_PHP;
	alert(rating);
}

// function supplyRatings(rating){
// 	return `
// 		<div class="rating">
// 			<h1>${rating.USD_PHP}</h1>
// 		</div>
// 	`;
// }