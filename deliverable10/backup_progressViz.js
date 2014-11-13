var currentProgress = successRate(userData[numberToSign],"current") //hard code a current progress for fun fix later
var totalProgress = successRate(userData[numberToSign],"overAll")
var everyone = everyoneAvg() * 100
var lastTime = userData["lastSuccessRate"]
// var currentProgress = 100 //turn off for implimentation into full program.
// var totalProgress = 80

//var lastTime = 70

var height = 720,
    width  = 300,
    padding = 30;

var progressScale =  d3.scale.linear()
                            .domain([0,100])
                            .range([height - padding*.9,padding * 4 ])


var svg = d3.select("#numberCount")
            .append("svg")
            .attr("height", height)
            .attr("width" , width)

var centerLine =  width/2 - 5
var line   = svg.append("line")
                .attr("x1",centerLine )
                .attr("x2",centerLine )
                .attr("y1", progressScale(0))
                .attr("y2", progressScale(100))
                .attr("stroke-width", 1)
                .attr("stroke", "black")

var topLine = svg.append("line")
                 .attr("x1", centerLine - 30 )
                 .attr("x2", centerLine + 30 )
                 .attr("y1", progressScale(100))
                 .attr("y2", progressScale(100))
                 .attr("stroke-width", 1)
                 .attr("stroke", "black")

var bottomLine = svg.append("line")
                    .attr("x1", centerLine - 30 )
                    .attr("x2", centerLine + 30 )
                    .attr("y1", progressScale(0))
                    .attr("y2", progressScale(0))
                    .attr("stroke-width", 1)
                    .attr("stroke", "black")

var current = svg.append("circle")
                .attr("id", "currentCirc")
                .attr("cx", centerLine - 80)
                .attr("cy", padding*1.5 )
                .attr("r",  30)
                .attr("fill", "#fdc086")
                .attr("fill-opacity", 0.8)


var currentKey = svg.append("circle")
                    .attr("cx", centerLine - 80)
                    .attr("cy", padding*1.5 )
                    .attr("r",  30)
                    .attr("fill", "#fdc086")
                    .attr("fill-opacity", 0.8)

var currentKeyText = svg.append("text")
                        .text("3")
                        .attr("x", centerLine - 80)
                        .attr("y", padding*1.5 + 10 )
                        .attr("text-anchor", "middle")
                        .attr("font-size", 20)

var overAll = svg.append("circle")
                .attr("id", "overAllCirc")
                .attr("cx", centerLine + 80)
                .attr("cy", padding*1.5)
                .attr("r",  30)
                .attr("fill", "#beaed4")
                .attr("fill-opacity", 0.8)

var overAllKey = svg.append("circle")
                    .attr("cx", centerLine + 80)
                    .attr("cy", padding*1.5)
                    .attr("r",  30)
                    .attr("fill", "#beaed4")
                    .attr("fill-opacity", 0.8)

var overAllKeyText = svg.append("text")
                        .text("0-9")
                        .attr("x", centerLine + 80)
                        .attr("y", padding*1.5 + 10 )
                        .attr("text-anchor", "middle")
                        .attr("font-size", 20)

var progressTextData = [{"text": "Great!",        "pos": 100},
                        {"text": "Keep working!", "pos": 0}   ]

var progressText = svg.selectAll(".progressText")
                        .data(progressTextData, function(d){return d.text})
                        .enter()
                        .append("text")
                        .text(function(d){return d.text;})
                        .attr("class", "progressText")
                        .attr("x", centerLine + 32)
                        .attr("y", function(d){return progressScale(d.pos);})
                        .attr("font-size", 15)
                        .attr("text-anchor", "begining")

var everyoneAverage = svg.append("text")
                        .attr("id", "everyoneValue")
                        .attr("x", centerLine + 5)
                        .attr("y", progressScale(everyone))
                        .text("Average Player")
                        .attr("text-anchor", "begining")
                        .attr("font-size", 20)

var lastSession = svg.append("text")
                        .attr("id", "lastSession")
                        .attr("x", centerLine - 5)
                        .attr("y", progressScale(lastTime))
                        .text("Last Time")
                        .attr("text-anchor", "end")
                        .attr("font-size", 20)


updateStatus(numberToSign,currentProgress,totalProgress)

function updateStatus(numToSign, current, total){
    d3.select("#currentCirc")
          .transition()
          .duration(2000)
          .attr("cx", centerLine)
          .attr("cy", progressScale(current) )

    currentKeyText.text(numToSign)

    d3.select("#overAllCirc")
          .transition()
          .duration(2000)
          .attr("cx", centerLine)
          .attr("cy", progressScale(total) )
}
