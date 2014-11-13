var showMe  = numberToSign, //hard code some test numbers.
    showing = -10;

var numbers = [0,1,2,3,4,5,6,7,8,9],
    h       = 720,
    w       = 200,
    padding = 30,
    duration= 1000;

var yScale = d3.scale.linear()
                .domain([0,9]) //ala the numbers to sign
                .range([padding * 3, h-padding])

var numbersViz = d3.select("#numbersViz")
                .append("svg")
                .attr("height", h)
                .attr("width",  w)

var nums = numbersViz.selectAll("text")
                     .data(numbers)
                     .enter()
                     .append("text")
                     .text(function(d){return d;})
                     .attr("id", function(d){return "n" + d;})
                     .attr("class", "numbers")
                     .attr("x", w/2)
                     .attr("y", function(d){return yScale(d);})
                     .attr("font-size", 25)
                     .attr("text-anchor", "middle")

var showMeMarker = numbersViz.append("circle")
                             .attr("id", "showMe")
                             .attr("cx", padding)
                             .attr("cy", yScale(-10) - 8.5)
                             .attr("r", padding)
                             .attr("fill", "#666666")
                             .attr("fill-opacity", 0.8)

var showingMarker = numbersViz.append("circle")
                              .attr("id", "showing")
                              .attr("cx", w - padding)
                              .attr("cy", yScale(3) - 8.5)
                              .attr("r", padding)
                              .attr("fill", "#666666")
                              .attr("fill-opacity", 0.8)

var wantText = numbersViz.append("text")
                         .text("Want")
                         .attr("x",padding)
                         .attr("y", padding)
                         .attr("text-anchor", "middle")
                         .attr("font-size", 25)

var haveText = numbersViz.append("text")
                         .text("Have")
                         .attr("x",w - padding)
                         .attr("y", padding)
                         .attr("text-anchor", "middle")
                         .attr("font-size", 25)

var seperation = numbersViz.append("line")
                     .attr("x1",padding*0.7 )
                     .attr("x2",w - padding*0.7 )
                     .attr("y1", padding * 1.5)
                     .attr("y2", padding * 1.5)
                     .attr("stroke-width", 1)
                     .attr("stroke", "black")
moveShowMe(showMe)

function moveShowMe(where){
    showMeMarker
        .transition()
        .ease("elastic")
        .duration(duration)
        .attr("cy", yScale(where) - 8.5)

    d3.select("#numbersViz").selectAll(".numbers")
        .transition()
        .duration(duration)
        .attr("font-size", 25)
        .attr("y", function(d){return yScale(d) - 8;})

    d3.select("#n" + where)
        .transition()
        .duration(duration/2)
        .attr("font-size", 50)
        .attr("y", function(d){return yScale(d);})
}

function moveShowing(where){
    if (where !== "_"){
        showingMarker
            .transition()
            .duration(400)
            .ease("elastic")
            .duration(duration)
            .attr("cy", yScale(where) - 8.5)
        }
}
