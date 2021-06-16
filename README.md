# d3-challenge
<p>The following is a cleaned work flow (after cobbling up different pieces of code and getting this to work):</p>
<ul>
  <li>Step 1: I specified SVG area dimensions.</li>
  <li>Step 2: Set the chart's margins.</li>
  <li>Step 3. Set chart area size.</li>
  <li>Step 4: Select the element to attach the SVG area to and set its size.</li>
  <li>Step 5: Append group area and set the margins.</li>
  <li>Step 6: Using d3.csv, load data from data.csv
    <ul>
      <li>Step 6.1: Parse the data to get poverty and healthcare values.</li>
      <li>Step 6.2: Set initial parameters of x and y axis.</li>
      <li>Step 6.3: Make scale variable for both axes.</li>
      <li>Step 6.4: Update the horizontal and vertical scales to the selected data variables limits.</li>
      <li>Step 6.5: Create the axes.</li>
      <li>Step 6.6: Attach circles to data points for the state labels.</li>
      <li>Step 6.7: Create the state labels.</li>
      <li>Step 6.8: Append axes titles.</li>
    </ul>
  </li>
</ul>
