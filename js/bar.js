$(document).ready(function () {
 showTotalGraph();
});

// Global Options:
Chart.defaults.global.defaultFontColor = 'dodgerblue';
Chart.defaults.global.defaultFontSize = 12;


function showTotalGraph(){{
  // This is the data.php file we created earlier, its JSON output will be processed in this function
    $.post("data.php",
    function (data){
        console.log(data);
        // Parsing JSON object
        response = JSON.parse(data)
        // Map function used to round off numbers to two decimal places
        var output = response.map(function(e) {
            return {
                PolymerType: e.PolymerType,
                Total: Math.round(e.Total*100) /100
            }
        });


        // Parsing JSON object to remove any escape sequences
        console.log(output)
        // Declare the variables for your graph (for X and Y Axis) 
        var type = []; // X Axis Label
        var total = []; // Value and Y Axis basis

        // Pushing data into the arrays 
        for (var i in output) {
            // PolymerType is taken from JSON output
            type.push(output[i].PolymerType);
            total.push(output[i].Total);
        }



       // Configuration options for charts
        var options = {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return"Length:" + Number(tooltipItem.yLabel) + " mm";
                    }
                }
            },
                title: {
                          display: true,
                          text: 'Plastic Pollution in Australian Waters',
                      },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Plastic Type'
                        }
                    }]
                }
        };
              
        var chartdata = {
            labels: type,
            datasets: [
                {
                    backgroundColor:['rgb(255, 99, 132)','rgb(0, 255, 0)','rgb(255, 99, 132)','rgb(128, 255, 0)','rgb(0, 255, 255)'],
                    borderColor: ['rgb(255, 99, 132)','rgb(0, 255, 0)','rgb(255, 99, 132)','rgb(128, 255, 0)','rgb(0, 255, 255)'],
                    hoverBackgroundColor: ['rgb(255, 99, 132)','rgb(0, 255, 0)','rgb(255, 99, 132)','rgb(128, 255, 0)','rgb(0, 255, 255)'],
                    hoverBorderColor: ['rgb(255, 99, 132)','rgb(0, 255, 0)','rgb(255, 99, 132)','rgb(128, 255, 0)','rgb(0, 255, 255)'],
                    data: total
                }
            ]
        
        };

        //This is the div ID (within the HTML content) where you want to display the chart
        var graphTarget = $("#chartcanvas"); 
        var barGraph = new Chart(graphTarget, {
            type: 'bar',
            data: chartdata,
            options: options
        });
    });
}}