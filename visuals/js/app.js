
const canvas = d3.select('.canva');

// var dataArray = [4, 15, 34, 123, 23, 0];

// JSON - Javascript Object Notation 
// var dataArray = [
//     {
//         width: 25,
//         height: 4,
//         fill: "pink"
//     },
//     { width: 25, height: 4, fill: 'pink' },
//     { width: 25, height: 14, fill: 'purple' },
//     { width: 25, height: 44, fill: 'orange' },
//     { width: 25, height: 94, fill: 'green' },
//     { width: 25, height: 12, fill: 'grey' },
//     { width: 25, height: 32, fill: 'red' },

// ];

d3.json('text.json')
    .then(data => {
        console.log(data);
        // code here to actually draw elements on screen 

        // add an svg element 
        const svg = canvas.append('svg')
            .attr('width', '600')
            .attr('height', '600');

        const rect = svg.selectAll('rect');

        rect.data(data)
            .enter().append('rect')
            .attr('width', d => d.width * 0.7)
            .attr('fill', (d, i) => d.fill)
            .attr('height', function (d) {
                return d.height * 1;
            })
            .attr('x', function (d, i) {
                console.log(d);
                return i * 18;
            })
            .attr('rx', 2.5)
            .attr('y', function (d, i) {
                return 200 - (d.height * 1);
            })

        console.log(rect);


    })


