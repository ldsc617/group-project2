const canvas = d3.select(".canva");

var data = [
    { x: 10, y: 10 },
    { x: 15, y: 20 },
    { x: 20, y: 40 },
    { x: 25, y: 7 },
    { x: 30, y: 10 }
];

const svg = canvas.append("svg")
    .attr('width', 600)
    .attr('height', 600);

const margin = { top: 20, right: 20, bottom: 70, left: 70 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const area = svg.append('g') // creating a group
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

var linearGen = d3.line()
    .x((d, i) => d.x * i)
    .y((d, i) => d.y * i)
    .curve(d3.curveStepBefore)


area.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('d', linearGen(data));