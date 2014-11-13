var currNumPerf = successRate(userData[numberToSign],"current") //hard code a current progress for fun fix later
var allNumPerf  = successRate(userData[numberToSign],"overAll")
var lastTime    = userData["lastSuccessRate"]
var everyone    = everyoneAvg() * 100

// var currNumPerf   = 30 //turn off for implimentation into full program.
// var allNumPerf    = 80
// var lastTime      = 70
// var everyone      = 50

var height = 720,
    width  = 300,
    padding = 30;

var progressScale = d3.scale.linear()
                            .domain([0,100])
                            .range([height - padding*.9,padding * 4 ])

var xScale        = d3.scale.ordinal()
                            .domain(d3.range(3))
                            .rangeRoundBands([padding * 3,width-padding/2],0.1);

var svg = d3.select("#numberCount")
            .append("svg")
            .attr("height", height)
            .attr("width" , width)


var currentNum = svg.append("rect")
                    .attr("id", "currentBar")
                    .attr("x", xScale(0))
                    .attr("y", height)
                    .attr("rx", 15)
                    .attr("ry", 15)
                    .attr("width", xScale.rangeBand())
                    .attr("height", height - progressScale(currNumPerf) + 10 )
                    .attr("fill", "#fb9a99")

var allNums = svg.append("rect")
                    .attr("id", "allBar")
                    .attr("x", xScale(1))
                    .attr("y", height)
                    .attr("rx", 15)
                    .attr("ry", 15)
                    .attr("width", xScale.rangeBand())
                    .attr("height", height - progressScale(allNumPerf) + 10 )
                    .attr("fill", "#fdbf6f")


var LastSession = svg.append("rect")
                    .attr("id", "lastBar")
                    .attr("x", xScale(2))
                    .attr("y", height)
                    .attr("rx", 15)
                    .attr("ry", 15)
                    .attr("width", xScale.rangeBand())
                    .attr("height", height - progressScale(lastTime) + 10 )
                    .attr("fill", "#b2df8a")
                    .transition()
                    .duration(1500)
                    .attr("y", progressScale(lastTime))


var averageLine = svg.append("line")
                     .attr("id", "averageLine")
                     .attr("x1", 23)
                     .attr("x2", width - padding/2)
                     .attr("y1", progressScale(everyone))
                     .attr("y2", progressScale(everyone))
                     .attr("stroke-width", 1)
                     .attr("stroke", "black")

var averageLineText = svg.append("text")
                        .attr("id", "averageLineText")
                        .attr("x", xScale(0) - 3)
                        .attr("y", progressScale(everyone) - 2)
                        .text("All Users")
                        .attr("font-size", 18)
                        .attr("text-anchor", "end")

var greatLine = svg.append("line")
                     .attr("id", "greatLine")
                     .attr("x1", 45)
                     .attr("x2", width - padding/2)
                     .attr("y1", progressScale(100))
                     .attr("y2", progressScale(100))
                     .attr("stroke-width", 1)
                     .attr("stroke", "black")

var greatLineText = svg.append("text")
                        .attr("id", "greatLine")
                        .attr("x", xScale(0) - 3)
                        .attr("y", progressScale(100) - 2)
                        .text("Great!")
                        .attr("font-size", 18)
                        .attr("text-anchor", "end")

var poorLine = svg.append("line")
                     .attr("id", "poorLine")
                     .attr("x1", 10)
                     .attr("x2", width - padding/2)
                     .attr("y1", progressScale(0) + 26)
                     .attr("y2", progressScale(0) + 26)
                     .attr("stroke-width", 1)
                     .attr("stroke", "black")

var poorLineText = svg.append("text")
                        .attr("id", "poorLine")
                        .attr("x", xScale(0) - 3)
                        .attr("y", progressScale(0) + 24)
                        .text("Keep it up!")
                        .attr("font-size", 18)
                        .attr("text-anchor", "end")

var introText = svg.append("text")
                        .attr("id", "intro")
                        .attr("x", xScale(1) + xScale.rangeBand()/2)
                        .attr("y", padding)
                        .text("Your Progress:")
                        .attr("font-size", 25)
                        .attr("text-anchor", "middle")

var labelText = ["Current #", "All #s", "Last Session"]

var labels = svg.selectAll(".labels")
                .data(labelText)
                .enter()
                .append("text")
                .text(function(d){return d;})
                .attr("font-size", 18)
                .attr("text-anchor", "begining")
                .attr("transform", function(d,i){
                    return "translate(" + ( xScale(i) + xScale.rangeBand()/3.65 ) + "," + (height - 10) +
                            ")rotate(-65)"
                    })

//rotate(180 x,y)

updateStatus(currNumPerf,allNumPerf)

function updateStatus(numToSign, allNums){

    d3.select("#currentBar")
          .transition()
          .duration(1500)
          .attr("y", progressScale(numToSign))
          .attr("height", height - progressScale(numToSign) + 10 )

    d3.select("#allBar")
          .transition()
          .duration(1500)
          .attr("y", progressScale(allNums))
          .attr("height", height - progressScale(allNums) + 10 )

}
