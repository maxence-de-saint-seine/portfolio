// Map options in a single object
const options = {
    lat: 0,
    lng: 0,
    zoom: 1.5,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

const mappa = new Mappa('Leaflet'); //Leaflet doesn t need API key: Mappa('Provider, key);

let dataTable;
let countries;
let highest;

function preload() {
    dataTable = loadTable('data_table.csv', 'header');
    countries = loadJSON('countries.json');
}

function setup(){
    canvas = createCanvas(700, 400);
    map = mappa.tileMap(options);
    map.overlay(canvas);

    for (id in countries) {
        countries[id][0] = parseFloat(countries[id][0]);
        countries[id][1] = parseFloat(countries[id][1]);
    }
    let circleSize = select("#circleSize");
    let circleColor = select("#circleColor");
    let dataSource = select("#dataSource");
    dataSource.changed(loadData);
    loadData();
  }
  
function draw() {
    clear();
    
    for (id in countries) {
        lat = countries[id][0];
        lng = countries[id][1];
        pix = map.latLngToPixel(lat, lng);
        
        diameter = sqrt(countries[id].data) * circleSize.value / sqrt(highest);
        fill(getColor());
        ellipse(pix.x, pix.y, diameter);
    }
}

function loadData() {
    highest = 0;
    for (id in countries) {
        countries[id].data = getData(id);
        if (countries[id].data > highest) { highest = countries[id].data; }
        if (!countries[id].data) { delete countries[id]; }
    }
    console.log(highest);
    console.log(countries);
}

function getData(id) {
    for (let row of dataTable.rows) {
        if (row.get('country_id').toLowerCase() == id) {
            return parseInt(row.get(dataSource.value));
        }
    }
}

function getColor() {
    switch (circleColor.value) {
        case 'purple':
            return [255, 0, 200, 50];
        case 'green':
            return [0, 255, 0, 50];
        case 'blue':
            return [0, 0, 255, 50];
        default:
            return [255, 0, 200, 50];
    }
}