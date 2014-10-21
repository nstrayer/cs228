var padding = 8
var w = 150
var h = 600
var circRadius = 35

var cRed = "#E74327"
var cBrown = "#E8940C"
var cBlue = "#0CBDE8"
var cGreen = "#98C000"
var cGrey = "#3D4C53"


var startPositions = [  {"name": "me",       "color": cRed,    "x": w/2, "y": h/2},
						{"name": "resume",   "color": cBrown,  "x": w/2, "y": h/2}, 
						{"name": "projects", "color": cBlue ,  "x": w/2, "y": h/2},
						{"name": "contact",  "color": cGreen,  "x": w/2, "y": h/2}
				 	]

var menuPositions = [   {"name": "me", "color": cRed, "x": padding + circRadius, "y": h/5},
						{"name": "resume", "color": cBrown, "x": w - (padding + circRadius), "y": h/5 * 2}, 
						{"name": "projects", "color": cBlue , "x": padding + circRadius, "y": h/5 * 3},
						{"name": "contact", "color": cGreen, "x": w - (padding + circRadius), "y": h/5 * 4}
				 	]

var menuBar = d3.select('.menuSvg')

menuBar.selectAll('circle')
		.data(startPositions, function(d){return d.name;})
		.enter()
		.append('circle')
		.attr("cx", function(d) {return d.x;})
		.attr("cy", function(d) {return d.y;})
		.attr("r", 0)
		.attr("fill", function(d) {return d.color;})
		.attr("id", function(d) {return d.name + "Circ";})
		.attr("class", "menuCircles")
		.on("mouseover", function() {
			d3.select(this)
					.transition()
					.duration(200)
					.attr("r", circRadius + 8);
		})
		.on("mouseout", function() {
			d3.select(this)
					.transition()
					.duration(200)
					.attr("r", circRadius);
		})		
		.on("click", function(){
			var where = d3.select(this).attr('id');
			var navigateHere = "#" + where.substr(0 , where.length - 4) + "Div";
	
			d3.select("#homeDiv")
				.classed("hidden",true); 
		
			d3.select("#meDiv")
				.classed("hidden",true);
		
			d3.select("#resumeDiv")
				.classed("hidden",true);		
				
			d3.select("#projectsDiv")
				.classed("hidden",true);
		
			d3.select("#contactDiv")
				.classed("hidden",true);
	
			//make the selected div viewable
			d3.select(navigateHere)   
				.classed("hidden", false); 
			
			})
		
var welcomeCircle = function() {
menuBar.append('circle')
		.attr("cx", w/2)
		.attr("cy", h/2 + 15)
		.attr("r", 1)
		.attr("fill", cGrey)
		.attr("id", "welcomeCirc")
		.on("mouseover", function(){
			d3.select(this)
				.transition()
				.duration(200)
				.attr("r", circRadius * 2 )
				.attr("fill",cGreen);
						
		})
		.on("mouseout", function(){
			
			movingCircle()

			d3.select(this)
				.attr("fill",cGrey)		
		})		
		.on("click", function(){
			d3.select(this)
				.remove();
			d3.select("#welcomeText")
				.remove()
					
			d3.selectAll('circle')
				.data(menuPositions, function(d){return d.name;})
				.transition()
				.delay(function(d, i) {return i * 50;})
				.ease("elastic")
				.duration(1100)
				.attr("cx", function(d) {return d.x;})
				.attr("cy", function(d) {return d.y;})
				.attr("r", circRadius) ;	
				
			menuBar.selectAll('text')
				.data(menuPositions, function(d){return d.name;})
				.enter()
				.append('text')
				.text(function(d){return d.name;} )
				.attr("x", function(d) {return d.x;})
				.attr("y", function(d) {return d.y + 3;})
				.attr("id", function(d) {return d.name;})
				.attr("font-family", "Optima") 
				.attr("font-size", "16px")
				.attr("fill", "white")
				.attr("text-anchor", "middle")
				.on("mouseover", function() {
					d3.select( "#" + d3.select(this).attr("id") + "Circ" )
							.transition()
							.duration(200)
							.attr("r", circRadius + 8);

				})
				.on("mouseout", function() {
					d3.select( "#" + d3.select(this).attr("id") + "Circ" ) 
							.transition()
							.duration(200)
							.attr("r", circRadius);
				
				}) 
				.on("click", function(){
					var where = d3.select(this).attr('id');
					var navigateHere = "#" + where + "Div";
		
					d3.select("#homeDiv")
						.classed("hidden",true); 
			
					d3.select("#meDiv")
						.classed("hidden",true);
			
					d3.select("#resumeDiv")
						.classed("hidden",true);		
					
					d3.select("#projectsDiv")
						.classed("hidden",true);
			
					d3.select("#contactDiv")
						.classed("hidden",true);
		
					//make the selected div viewable
					d3.select(navigateHere)   
						.classed("hidden", false);
				
				
				})
})	
		.transition()
		.duration(800)
		.attr("r", (circRadius * 2) - 10)

menuBar.append('text')
		.text("welcome")
		.attr("x", w/2)
		.attr("y", h/2 + 19)
		.attr("id","welcomeText")
		.attr("font-family", "Optima") 
		.attr("font-size", "24px")
		.attr("fill", "white")
		.attr("text-anchor", "middle")
		.on("mouseover", function(){
			d3.select("#welcomeCirc")
				.transition()
				.duration(200)
				.attr("r", circRadius * 2 )
				.attr("fill",cGreen);
						
		})
		.on("mouseout", function(){
			d3.select("#welcomeCirc")
				.transition()
				.duration(200)
				.attr("r", (circRadius * 2) - 10)
				.attr("fill",cGrey);
		})
		.on("click", function(){
			d3.select(this)
				.remove();
			d3.select("#welcomeCirc")
				.remove() 	
				
			d3.selectAll('circle')
				.data(menuPositions, function(d){return d.name;})
				.transition()
				.delay(function(d, i) {return i * 50;})
				.ease("elastic")
				.duration(1100)
				.attr("cx", function(d) {return d.x;})
				.attr("cy", function(d) {return d.y;})
				.attr("r", circRadius) ;	
				
			menuBar.selectAll('text')
					.data(menuPositions, function(d){return d.name;})
					.enter()
					.append('text')
					.text(function(d){return d.name;} )
					.attr("x", function(d) {return d.x;})
					.attr("y", function(d) {return d.y + 3;})
					.attr("id", function(d) {return d.name;})
					.attr("font-family", "Optima") 
					.attr("font-size", "16px")
					.attr("fill", "white")
					.attr("text-anchor", "middle")
					.on("mouseover", function() {
						d3.select( "#" + d3.select(this).attr("id") + "Circ" )
								.transition()
								.duration(200)
								.attr("r", circRadius + 8);

					})
					.on("mouseout", function() {
						d3.select( "#" + d3.select(this).attr("id") + "Circ" ) 
								.transition()
								.duration(200)
								.attr("r", circRadius);
					
					}) 
		
					.on("click", function(){
						var where = d3.select(this).attr('id');
						var navigateHere = "#" + where + "Div";
			
						d3.select("#homeDiv")
							.classed("hidden",true); 
				
						d3.select("#meDiv")
							.classed("hidden",true);
				
						d3.select("#resumeDiv")
							.classed("hidden",true);		
						
						d3.select("#projectsDiv")
							.classed("hidden",true);
				
						d3.select("#contactDiv")
							.classed("hidden",true);
			
						//make the selected div viewable
						d3.select(navigateHere)   
							.classed("hidden", false);
					
					
					})			
			});

}

welcomeCircle()		

var movingCircle = function(){
	d3.select("#welcomeCirc")
		.transition()
		.duration(800)
		.ease("sin")
		.attr("r", circRadius * 2)
		.each("end", function(){
			d3.select(this)
				.transition()
				.duration(800)
				.ease("sin")
				.attr("r", circRadius * 2 - 10)
				.each("end",function(){
					movingCircle()
				})

		})
}
//lets get this ball rolling:	
movingCircle()


d3.select("p")
		.on("click", function(){

			d3.select("#meDiv")
				.classed("hidden",true);

			d3.select("#resumeDiv")
				.classed("hidden",true);		
	
			d3.select("#projectsDiv")
				.classed("hidden",true);

			d3.select("#contactDiv")
				.classed("hidden",true);	
		
			d3.select("#homeDiv")
				.classed("hidden",false); 

})				

//Return to welcome functions:
var returnToWelcome = function(){
	d3.selectAll(".menuCircles")
		.data(startPositions, function(d){return d.name;})
        .transition()
        .duration(1000)
        .attr("cx", function(d) {return d.x;})
		.attr("cy", function(d) {return d.y;})
		.each("end", function(){
			movingCircle()
		})

	welcomeCircle()

}

d3.selectAll(".header")
	.on("click",function(){
		returnToWelcome()
	})

var returnWelcomeData = ["return to welcome"]

d3.select(".menuSvg")
	.selectAll("text")
	.data(returnWelcomeData,function(d){return d})
	.enter()
	.append('text')
	.text(function(d){return d})
	.attr("x", 5)
	.attr("y", 18)
	.attr("id", "returnWelcomeText")
	.attr("font-family", "Optima") 
	.attr("font-size", "16px")
	.attr("fill", "black")
	.attr("text-anchor", "begining")
	.on("click",function(){
		returnToWelcome()
		d3.selectAll(".sectionDivs")
			.classed("hidden",true)
		d3.select("#homeDiv")
			.classed("hidden",false)
	})
