// this API is fully designed by ANIEBIET AKPAN @elniebiet 
// this is a project for Andela 3.0 Google Scholarship.
// completed on 29th June 2018
// create indexedDB object and check platform compatibility


//declare static assets
const staticAssets = [
	'./',
	'./CurrencyConverter.js',
	'./css/foundation.min.css',
	'./css/main.css',
	'./css/styles.css',
];

//cache all static assets
self.addEventListener('install', async event => {
	const cache = await caches.open('CurrencyConverter');
	cache.addAll(staticAssets);
});

//attempt to fetch from internet if nw is available 
//else visit the cache for cached values
self.addEventListener('fetch', event => {
	const req = event.request;
	const url = new URL(req.url);

	if(url.origin == location.origin){
		event.respondWith(cacheFirst(req));
	}
	else {
		event.respondWith(networkFirst(req));
	}
});

//returns whats available in cache if available 
//else attempt to fetch from network
async function cacheFirst(req){
	const cachedResponse = await caches.match(req);
	return cachedResponse || fetch(req);
}

//connect to network, if not available visit the cache
async function networkFirst(req){
	//go to network, put in cache, if fails return that instead
	const cache = await caches.open('CCDynamic');
	try {
		const res = await fetch(req);
		cache.put(req, res.clone());
		return res;
	}
	catch(error){
		return await(cache.match(req));
	}
}
