function world_map_generator(year){
  console.log("Loaded "+year)
  // The svg
  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  // Map and projection
  var path = d3.geoPath();
  var projection = d3.geoMercator()
    .scale(100)
    .center([0,20])
    .translate([width / 2, height / 2]);

  // Data and color scale
  var data = d3.map();
  var colorScale = d3.scaleThreshold()
    .domain([100000000, 1000000000, 10000000000, 30000000000, 100000000000, 500000000000])
    .range(d3.schemeBlues[7]);


  // Load external data and boot
  d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, `/api/getGdpMap/${year}`, function(d){ 
      console.log(d);
      data.set(d.country_code, +d.value);
            console.log(data);

       })
    .await(ready);

 function ready(error, topo) {

  let mouseOver = function(d) {
    console.log("mouse over")
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  // Draw the map
 svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
    }

}


function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#yearData");
  
    // Use the list of sample names to populate the select options
    d3.json("/api/getYearList", function(sampleNames) {
      console.log(sampleNames);

      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);

      });

      const yearName = sampleNames[0];
  
    });
  }
init();