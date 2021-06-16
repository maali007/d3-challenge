// @TODO: YOUR CODE HERE!
// Step 1: Using d3.csv, load data from data.csv
d3.csv("assets/data/data.csv").then(function(stateStats) {

  // Step 1.1: Parse the data to get poverty and healthcare values
  stateStats.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // Step 1.2: Set initial parameters of x and y axis
  var dataVar1 = "poverty";
  var dataVar2 = "healthcare";

  // Step 1.3: Make scale variable for both axes
  var scaleX = xScale(stateStats, dataVar1);
  var scaleY = yScale(stateStats, dataVar2);

  // Step 1.4: Update the horizontal and vertical scales to the selected data variables
  function xScale(stateStats, dataVar1) {
    var scaleX = d3.scaleLinear()
      .domain([d3.min(stateStats, d => d[dataVar1]) * 0.85 , d3.max(stateStats, d => d[dataVar1]) * 1.15])
      .range([0, chartWidth]);
    return scaleX;
  }

  function yScale(stateStats, dataVar2) {
    var scaleY = d3.scaleLinear()
      .domain([d3.min(stateStats, d => d[dataVar2]) * 0.85, d3.max(stateStats, d => d[dataVar2]) * 1.15])
      .range([chartHeight, 0]);
    return scaleY;
  }
  // Step 1.5: Create the axes
  var hAxis = d3.axisBottom(scaleX);
  var hAxis = chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(hAxis);
  var vAxis = d3.axisLeft(scaleY);
  var vAxis = chartGroup.append("g")
      .call(vAxis);

  // Step 1.6: Attach circles to data points for the state labels
  var stateCircles = chartGroup.selectAll("circle")
      .data(stateStats)
      .enter()
      .append("circle")
      .classed("stateCircle", true)
      .attr("cx", d => scaleX(d[dataVar1]))
      .attr("cy", d => scaleY(d[dataVar2]))
      .attr("r", 15)
  
  // Step 1.7: Create the state labels
  var stateLabels = chartGroup.selectAll(".stateText")
      .data(stateStats)
      .enter()
      stateLabels.append("text")
      .classed("stateText", true)
      .attr("x", d => scaleX(d[dataVar1]) )
      .attr("y", d => scaleY(d[dataVar2]))
      .attr('dy', 3)
      .attr("font-size", 12)
      .text(d => d.abbr);

  // Step 1.8: Append axes titles
  var xLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
      xLabelsGroup.append("text")
      .classed("aText", true)
      .classed("active", true)
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty")
      .text("In Poverty (%)");


  var yLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${0 - margin.left/4}, ${chartHeight/2})`)
      yLabelsGroup.append("text")
      .classed("aText", true)
      .classed("active", true)
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 20)
      .attr("x", 0)
      .attr("value", "healthcare")
      .text("Lacks Healthcare (%)");
  
  var stateCircles = updateToolTip(dataVar1, dataVar2, stateCircles);



}).catch(function(error) {
  console.log(error);
});

// Step 2: Specify SVG area dimensions
var svgWidth = 1000;
var svgHeight = 600;

// Step 3: Set the chart's margins
var margin = {
  top: 20,
  right: 40,
  bottom: 120,
  left: 100
};

// Step 4. Set chart area size
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

