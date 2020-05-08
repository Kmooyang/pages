function DataViz(data, options) {
  var cfg = {
    width: 800,
    height: 600,
	};

  if('undefined' !== typeof options){
    for(var i in options){
      if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
    }//for i
  }//if
// Add X axis
var x = d3.scaleLinear()
  .domain([1950, 2010])
  .range([ 0, cfg.width ]);
svg.append("g")
  .attr("transform", "translate(0," +cfg.height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()

  .domain([.9, 10])

  .range([ cfg.height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
// Its opacity is set to 0: we don't see it by default.
var tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 1)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")

// Color scale: give me a specie name, I return a color
var color = d3.scaleOrdinal()
  .domain(["setosa", "versicolor", "virginica" ])
  .range([ "#440154ff", "#21908dff", "#fde725ff"])


// A function that change this tooltip when the user hover a point.
// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
var mouseover = function(d) {
  tooltip
    .style("opacity", 1)
  selected_specie = d.years

  d3.selectAll(".dot")
    .transition()
    .html("The exact value of<br>the duration is: " + d.duration + "<br/>The name of the song is: " + d.track)(200)
    .style("fill", "lightgrey")
    .attr("r", 3)

  d3.selectAll("." + selected_specie)
    .transition()
    .duration(200)
    .style("fill", color(selected_specie))
    .attr("r", 7)
}

var mousemove = function(d) {
  tooltip
    .html("The exact value of<br>the duration is: " + d.duration + "<br/>The name of the song is: " + d.track)
    .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", (d3.mouse(this)[1]) + "px")
}

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
var mouseleave = function(d) {
  tooltip
    .transition()
    //.duration(200)
    .style("opacity", 0)
     d3.selectAll(".dot")
    .transition()
    //.duration(200)
    .style("fill", "lightgrey")
    .attr("r", 5 )
}

// Add dots
svg.append('g')
  .selectAll("dot")
  .data(data.filter(function(d,i){return i<1500})) // the .filter part is just to keep a few dots on the chart, not all of them
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(d.year); } )
    .attr("cy", function (d) { return y(d.duration); } )
    .attr("r", 7)
    .style("fill", "white")
    .style("opacity", 0.3)
    .style("stroke", "white")
  .on("mouseover", mouseover )
  .on("mousemove", mousemove )
  .on("mouseleave", mouseleave )
}
