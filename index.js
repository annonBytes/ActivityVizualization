import { 
  select, 
  csv, 
  scaleLinear, 
  max, 
  scaleBand, 
  axisLeft, 
  axisBottom 
} from 'd3';

const svg = select('svg');

const width = svg.attr('width');
const height = svg.attr('height');

const render = data => {
  
  const xValue = d => d.Value;
  const yValue = d => d.Year;
  const margin = {top: 50, right: 40, bottom: 80, left: 70}
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  
  const xScale = scaleLinear()
     .domain([0,max(data, xValue )])
     .range([0, innerWidth]);
  

  
  const yScale = scaleBand()
    .domain(data.map(yValue))
  	.range([0, innerHeight])
    .padding(0.1)
  ;
  
  const g = svg.append('g')
  		.attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  g.append('g').call(axisLeft(yScale))
   	.selectAll('.domain, .tick line')
    	.remove();
  
  const xAxisG = g.append('g').call(axisBottom(xScale))
  			.attr('transform', `translate(0, ${innerHeight})`);
  
  xAxisG		
  .select('.domain').remove();
  
    
  xAxisG.append('text')
  	.text('Steps Taken')
  	.attr('class', 'axis-label')
    .attr('x', innerWidth/2)
   	.attr('y', 50)
  	.attr('fill', 'black');
  
  g.selectAll('rect').data(data)
  	.enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
  		.attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
  
  g.append('text')
  	.text('Step Counts through the Years')
  	.attr('x', innerWidth/2)
  	.attr('class', 'title');
}

csv('data.csv').then( data => {
   data.forEach(d => {
      d.Value = +d.Value;
   })
   render(data)
})










