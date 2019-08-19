const canvas = d3.select('.canva');

var width = "100%";
var height = "100%";
const api_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// const api_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
const svg = canvas.append('svg')
    .attr('width', width)
    .attr('height', height)

// define the div for the tooltip
var div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

function timeStamptoDate(mtime) {
    var mDate = new Date(mtime);
    return mDate.toLocaleDateString('en-US');
};

// parse json 
d3.json(api_url)
    .then(data => {
        // place data to begin building 
        const circle = svg.selectAll('circle')
            .data(data.features);
        console.log(data.features);

        circle.attr('cx', (d, i) => Math.floor(Math.random() * 200) + d.properties.mag * i)
            .attr('cy', (d, i) => Math.floor(Math.random() * 150) + d.properties.mag)
            .attr('r', (d, i) => (d.properties.mag) * 2)
            .attr('fill', (d, i) => d.properties.alert);

        // append enter selection to add new circles 
        circle.enter()
            .append('circle')
            .attr('cx', (d, i) => Math.floor(Math.random() * 200) + d.properties.mag * i)
            .attr('cy', (d, i) => Math.floor(Math.random() * 150) + d.properties.mag)
            .attr('r', (d, i) => (d.properties.mag) * 2)
            .style('top', 156)
            .on('mouseover', function (d, i, n) {
                d3.select(n[i])
                    .transition()
                    .duration(100) // in milliseconds
                    .style('opacity', 0.7)
                    .style('fill', 'magenta')
                console.log(d.properties.mag);

                div.transition()
                    .duration(200)
                    .style('opacity', 0.9);
                div.html('<p> ' + 'Magnitude: ' + d.properties.mag + '</p>'
                    + '<p>' + 'Time: ' + timeStamptoDate(d.properties.time) + '</p>'
                    + '<p>' + 'Location: ' + d.properties.place.split('of')[1] + '</p>'
                    + '<p>' + 'Tsunami\'s: ' + d.properties.tsunami + '</p>')
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px')

            })
            .on('mouseout', function (d, i, n) {
                d3.select(n[i])
                    .transition()
                    .duration(100) // in milliseconds
                    .style('opacity', 1)
            })
            .on('mouseout', function (d, i, n) {
                d3.select(n[i])
                    .transition()
                    .duration(100)
                    // .attr('fill', (d, i) => d.properties.alert)
                    .style('fill', (d, i) => d.properties.alert)
                    .style('opacity', 1)

                div.transition(500)
                    .style('opacity', 0)
            })
            .attr('fill', (d, i) => d.properties.alert);


    });

