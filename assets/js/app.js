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



}).catch(function(error) {
  console.log(error);
});

