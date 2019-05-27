export function fetchQuakes() {
  let currentDay = new Date();
  let previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1)

  return fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${previousMonth.toDateString()}&endtime=${currentDay.toDateString()}&minmagnitude=5`)
    .then((res) => res.json())
}

// This will fetch earth quake location date for a month as a test 
