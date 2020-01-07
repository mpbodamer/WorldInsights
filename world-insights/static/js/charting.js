function build_population_charts(country_name) {

    var url = "/api/getDataFromYearToNow?indicator_code=SP.POP.TOTL&year=2000";
    d3.json(url).then(function(response) {
        var all_country_names = response.map(response => response.country_name);
        var all_years = response.map(response => response.year);
        var all_values = response.map(response => response.value);
        var currentPopulation = [];
        var currentYear = [];

        function getCountryData(chosenCountry) {
            currentPopulation = [];
            currentYear = [];
            for (var i = 0 ; i < all_country_names.length ; i++){
                if ( all_country_names[i] === chosenCountry ) {
                    currentPopulation.push(all_values[i]);
                    currentYear.push(all_years[i]);
                }
            }
        };

        // Default Country Data
        setBubblePlot(country_name);
        function setBubblePlot(chosenCountry) {
            getCountryData(chosenCountry);

            var trace1 = {
                x: currentYear,
                y: currentPopulation,
                mode: 'lines+markers',
                type: 'bar',
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var data = [trace1];
            var layout = {
                title:'Population Total for country '+ chosenCountry,
                xaxis: { title: "Year" },
                yaxis: { title: "Population Total" },
                height: 500,
                width: 800
            };

            Plotly.newPlot('plot', data, layout);
        };
    });
}


function build_GDP_Growth_Percentage_charts(country_name) {

    var url = "/api/getDataFromYearToNow?indicator_code=NY.GDP.MKTP.KD.ZG&year=2000";
    d3.json(url).then(function(response) {
        var all_country_names = response.map(response => response.country_name);
        var all_years = response.map(response => response.year);
        var all_values = response.map(response => response.value);
        var currentGDP = [];
        var currentYear = [];

        function getCountryData(chosenCountry) {
            currentPopulation = [];
            currentYear = [];
            for (var i = 0 ; i < all_country_names.length ; i++){
                if ( all_country_names[i] === chosenCountry ) {
                    currentGDP.push(all_values[i]);
                    currentYear.push(all_years[i]);
                }
            }
        };

        // Default Country Data
        setBubblePlot(country_name);

        function setBubblePlot(chosenCountry) {
            getCountryData(chosenCountry);

            var trace2 = {
                x: currentYear,
                y: currentGDP,
                mode: 'lines+markers',
                type: "scatter",
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var data = [trace2];
            var layout = {
                title:'GDP Growth Percentage for country '+ chosenCountry,
                xaxis: { title: "Year" },
                yaxis: { title: "GDP Growth Percentage" },
                height: 500,
                width: 800
            };

            Plotly.newPlot('plot2', data, layout);
        };
    });
}


function build_GDP_Current_USD_charts(country_name) {

    var url = "/api/getDataFromYearToNow?indicator_code=NY.GDP.MKTP.CD&year=2000";
    d3.json(url).then(function(response) {
        var all_country_names = response.map(response => response.country_name);
        var all_years = response.map(response => response.year);
        var all_values = response.map(response => response.value);
        var currentGDP = [];
        var currentYear = [];

        function getCountryData(chosenCountry) {
            currentPopulation = [];
            currentYear = [];
            for (var i = 0 ; i < all_country_names.length ; i++){
                if ( all_country_names[i] === chosenCountry ) {
                    currentGDP.push(all_values[i]);
                    currentYear.push(all_years[i]);
                }
            }
        };

        // Default Country Data
        setBubblePlot(country_name);
        
        function setBubblePlot(chosenCountry) {
            getCountryData(chosenCountry);

            var trace3 = {
                x: currentYear,
                y: currentGDP,
                mode: 'lines+markers',
                type: "scatter",
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var data = [trace3];
            var layout = { 
                title:'GDP Current USD for country '+ chosenCountry,
                xaxis: { title: "Year" },
                yaxis: { title: "GDP Current USD" },
                height: 500,
                width: 800
            };

            Plotly.newPlot('plot_gdp_current_usd', data, layout);
        };
    });
}


function build_Unemployment_Total_charts(country_name) {

    var url = "/api/getDataFromYearToNow?indicator_code=SL.UEM.TOTL.ZS&year=2000";
    d3.json(url).then(function(response) {
        var all_country_names = response.map(response => response.country_name);
        var all_years = response.map(response => response.year);
        var all_values = response.map(response => response.value);
        var currentGDP = [];
        var currentYear = [];

        function getCountryData(chosenCountry) {
            currentPopulation = [];
            currentYear = [];
            for (var i = 0 ; i < all_country_names.length ; i++){
                if ( all_country_names[i] === chosenCountry ) {
                    currentGDP.push(all_values[i]);
                    currentYear.push(all_years[i]);
                }
            }
        };

        // Default Country Data
        setBubblePlot(country_name);
        
        function setBubblePlot(chosenCountry) {
            getCountryData(chosenCountry);

            var trace4 = {
                x: currentYear,
                y: currentGDP,
                mode: 'lines+markers',
                type: "scatter",
                marker: {
                    size: 12,
                    opacity: 0.5
                }
            };

            var data = [trace4];
            var layout = { 
                title:'Unemployment Total for country '+ chosenCountry,
                xaxis: { title: "Year" },
                yaxis: { title: "Unemployment Total" },
                height: 500,
                width: 800
            };

            Plotly.newPlot('plot_unemployment_usd', data, layout);
        };
    });
}



function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#countrydata");
  
    // Use the list of sample names to populate the select options
    d3.json("/api/getCountryNames?indicator_code=SP.POP.TOTL").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const country_name = sampleNames[0];
      build_population_charts(country_name);
      build_GDP_Growth_Percentage_charts(country_name);
      build_GDP_Current_USD_charts(country_name);
      build_Unemployment_Total_charts(country_name);

    //   buildMetadata(firstSample);
    });
  }

function optionChanged(country_name) {
    // Fetch new data each time a new sample is selected
    build_population_charts(country_name);
    build_GDP_Growth_Percentage_charts(country_name);
    build_GDP_Current_USD_charts(country_name);
    build_Unemployment_Total_charts(country_name);
  }


  // Initialize the dashboard
init();
// build_population_charts("USA");