/*
 * npm modules required.
 */
const fs = require('fs');
const yargs = require('yargs');
const axios = require('axios');


/**
 * Method to get a dark sky API key from a file called api.json store from 
 * the previous command.
 */
var getApi = () => {
    try {
        var key = fs.readFileSync('api.json');
        return JSON.parse(key);
    } catch (e) {
        return [
            console.log('No API Key found. Run addAPI first.'),
        ];
    }
}

/**
 * Method to write an api key from dark sky to a json file called api.json
 */
var setApi = (api) => {
    fs.writeFileSync('api.json', JSON.stringify(api));
}

/**
 * Define program's available commands using yargs.
 */
const argv = yargs
    .command('addapikey', 'Adds an API to a file in the system called api.json.', {
        key: {
            describe: 'API token from the dark sky developer site.',
            demand: true,
            string: true
        }
    })
    .command('address', 'Checks the weather forecast for that address.', {
        address: {
            describe: 'Address or zip code you want to get forecast on.',
            demand: true,
            alias: 'a',
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

/**
 * Stores commands given by the user.
 */
var command = argv._[0];

if (command === 'addapikey') {

    var apiKey = setApi(argv.key);

} else if (command === 'address') {

    var encodedAddress = encodeURIComponent(argv.address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === '400') {
            throw new Error('Could not connect to Google APIs to get address.');
        }
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        } else {
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var api = getApi();
            var weatherURL = `https://api.darksky.net/forecast/${api}/${lat},${lng}?units=si`;
            console.log(response.data.results[0].formatted_address);
            return axios.get(weatherURL);
        }
    }).then((response) => {
        debugger;
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}ºC and it seems like it is ${apparentTemperature}ºC`);
    }).catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.')
        } else if (error.code === 404) {
            console.log("Unable to find that location in that locations weather.");
        } else {
            console.log(error.message);
        }
    });



}