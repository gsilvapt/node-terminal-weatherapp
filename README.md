[![Build Status](https://travis-ci.org/gsilvapt/node-terminal-weatherapp.svg?branch=master)](https://travis-ci.org/gsilvapt/node-terminal-weatherapp)

# Node.JS terminal weather app

This app was built during Udemy's Node.JS developer course, where the goal was to explore Promises, HTTP requests and Node itself.

The app is very simple. Based of a string, it fetches the geolocation of that string in Google Maps API and then passes that data to another API call to 
[darksky](https://darksky.net/dev) to get the current temperature of that location.

Moreover, it felt a good opportunity to explore how Travis works, how it is configured and what are the possibilities with it.

## Usage

To experiment with the app, you can clone and use `npm install` to fetch all requirements. After that, the command list is short:

* `npm lib/app.js addapikey -key='yourDarkSkykey'` which will store your token in a json file to reuse it whenever you call the address option in the terminal;

* `npm lib/app.js address -a 'some address or zip code'` which will fetch this information 

The dark sky api is a free-to-use api to get weather data based on a geolocation.
A free account grants 1.000 free calls.

## Features and functionality

There are other nice-to-haves I plan on implementing here, most that will come later with the development of this course (for instance, creating test cases to see Travis having a go with that.)