var successHeight = $('body').height(),
    successWidth  = $('body').width();

var successSVG = d3.select("#celebration")
                .append("svg")
                .attr("height", successHeight)
                .attr("width", successWidth)
                .append("g")
                .attr("transform", "translate(" + successWidth/2 + "," + successHeight/2 + ")");


var fauxVals  = ["projects","resume","contact","me", "blah"],
    cRed      = "#E74327",
    cBrown    = "#E8940C",
    cBlue     = "#0CBDE8",
    cGreen    = "#98C000",
    cGrey     = "#3D4C53",
    colors    = [cRed, cBrown, cBlue, cGreen, cGrey],
    radius    = 100,
    menuTextSize = radius * 0.12,
    colorCounter = 0;

function colorChoose(){
    colorCounter++
    if (colorCounter > 4){
        colorCounter = 0
    }
    return colors[colorCounter];
}

var arc =
    d3.svg.arc()
        .outerRadius(radius*.7)
        .innerRadius(radius*.3);

var shrunkArc =
    d3.svg.arc()
        .outerRadius(2)
        .innerRadius(1);

var bigArc =
    d3.svg.arc()
        .outerRadius(successWidth * 1.5)
        .innerRadius(successWidth);

var pie =
    d3.layout.pie()
        .sort(null)
        .value(function(d) { return 10; });

var g = successSVG.selectAll(".arc")
        .data(pie(fauxVals))
        .enter().append("g")
        .attr("class", "arc")
        .attr("id", function(d){return d.data})

function celebrate(){
    g.append("path")
        .attr("d", shrunkArc)
        .style("fill", function() { return colorChoose(); })
        .transition()
        .ease("log")
        .duration(2500)
        .delay(function(d,i){ return 70*i;})
        .attr("d", bigArc )
        .each("end", function(){
            d3.select(this)
            .transition()
            .duration(300)
            .delay(function(d,i){ return 50*i;})
            .attr("d", shrunkArc)
            .each("end", function(){ d3.select(this).remove() })
            })
}

//celebrate()
