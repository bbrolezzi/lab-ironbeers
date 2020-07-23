const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { request } = require('http');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      response.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});
app.get('/random-beers', (request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here
      console.log('Random beers: ', responseFromAPI);
      response.render('random-beers.hbs', { responseFromAPI });
    })
    .catch(error => console.log(error));
});
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
