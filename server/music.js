module.exports = {
  start,
  getMusic,
  updateDecadeUp,
  updateDecadeDown,
  updateCountryUp,
  updateCountryDown,
  getContext
}

const radiooo = require('./radiooo')
const context = {
  decade: 1960,
  country: 'FRA',
  countries: []
}

function getContext() {
  return context
}

function getMusic() {
  return radiooo.getMusic(context)
}

function updateCountries(countries) {
  context.countries = countries
}

function updateDecadeUp(decade) {
  if (!decade) decade = context.decade + 10
  context.decade = decade
  if (context.decade > 2010) context.decade = 2010

  return radiooo.getCountriesByDecade(context.decade)
    .then(updateCountries)
}

function updateDecadeDown(decade) {
  if (!decade) decade = context.decade - 10
  context.decade = decade
  if (context.decade < 1900) context.decade = 1900

  return radiooo.getCountriesByDecade(context.decade)
    .then(updateCountries)
}

function updateCountryUp() {
  const currentIndex = context.countries.indexOf(context.country)
  const isLastIndex = currentIndex === context.countries.length - 1

  const newIndex = isLastIndex
    ? 0
    : currentIndex + 1

  context.country = context.countries[newIndex]
}



function updateCountryDown() {
  const currentIndex = context.countries.indexOf(context.country)
  const isFirstIndex = currentIndex === 0

  const newIndex = isFirstIndex
    ? context.countries.length
    : currentIndex - 1

  context.country = context.countries[newIndex]
}


function start() {
  updateDecadeUp(context.decade)
}

// function start() {
//   updateDecadeDown(context.decade)
// }
