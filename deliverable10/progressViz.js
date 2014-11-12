var currentProgress = successRate(userData[numberToSign],"current") //hard code a current progress for fun fix later

//var currentProgress = 100 //turn off for implimentation into full program.
var totalProgress = successRate(userData[numberToSign],"overall")

var lastTime = 70

var barScale = d3.scale.linear()
                    .domain([0,100])
                    .range([0,300])

var svg = d3.select("#numberCount")
            .append("svg")
            .attr("height", 400)
            .attr("width" , 300)

var current = svg.append("rect")
                .attr("id", "current")
                .attr("x", 0)
                .attr("y", 30)
                .attr("height", 50)
                .attr("fill", "#67a9cf")
                .attr("width" , barScale(0))
                .transition()
                .duration(2000)
                .attr("width" , barScale(currentProgress))

var total = svg.append("rect")
                .attr("id", "total")
                .attr("x", 0)
                .attr("y", 90)
                .attr("height", 50)
                .attr("fill", "#67a9cf")
                .attr("width" , barScale(0))
                .transition()
                .duration(2000)
                .attr("width" , barScale(totalProgress))

// var lastTime = svg.append("rect")
//                 .attr("id", "total")
//                 .attr("x", 0)
//                 .attr("y", 120)
//                 .attr("height", 50)
//                 .attr("fill", "#67a9cf")
//                 .attr("width" , barScale(0))
//                 .transition()
//                 .duration(2000)
//                 .attr("width" , barScale(lastTime))

var textLabels = [{"text": "Current", "position": 60},
                  {"text": "Overall", "position": 120},
                  //{"text": "Last Time", "position": 150}
                  ]


var labelText = svg.selectAll("text")
                    .data(textLabels)
                    .enter()
                    .append("text")
                    .text(function(d){return d.text;})
                    .attr("x", barScale(3))
                    .attr("y",function(d){return d.position;})
                    .attr("text-anchor", "begining")
                    .attr("font-size", 20)
                    .attr("fill", "white")

var percentLine = svg.append("line")
                     .attr("x1",barScale(100) )
                     .attr("x2",barScale(100) )
                     .attr("y1", 170)
                     .attr("y2", 0)
                     .attr("stroke-width", 4)
                     .attr("stroke", "black")

function updateBar(current, total){
    d3.select("#current")
          .transition()
          .duration(1000)
          .attr("width" , barScale(current))

    d3.select("#total")
              .transition()
              .duration(1000)
              .attr("width" , barScale(total))

    // newText = "Progress"
    // if (newProgress == 100){
    //     newText = "Perfect!"
    // } else if (90 < newProgress){
    //     newText = "Awesome!"
    // } else if (80  < newProgress){
    //     newText = "Getting good!"
    // } else if (60  < newProgress){
    //     newText = "Keep working!"
    // } else {
    //     newText = "You can do it!"
    // }
    //
    // d3.select("#currentText")
    //   .text(newText)
}
