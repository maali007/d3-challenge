// @TODO: YOUR CODE HERE!
// Step 1: Using d3.csv, load data from data.csv
d3.csv("assets/data/data.csv").then(function(stateStats) {

  // Step 1.1: Parse the data to get poverty and healthcare values
  stateStats.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });



}).catch(function(error) {
  console.log(error);
});

