//Color Bars Javascript

	//Width and height
	var w = 800;
	var h = 500;
	var midX = w/2;
	var midY = h/2;
	var barH = 70;
	var barW = 70;

	var numOfEachFamily = [0,0,0,0,0,0,0,0,0,0];

	//Create SVG element---------------------------------------------------------------------------------------------
	var svg = d3.select("#graphHolder")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	var dataset = [];

	//load csv file
	d3.csv("logoData.csv", function(data) { 

		for (var i = 0; i < data.length; i++){
			dataset.push([data[i].url, data[i].color])
		}
		
	});

	//red green orange yellow blue pink black brown grey white
       
    d3.select("#red").on("click",function(){

    	visualizeData(dataset,"red");

    });
    d3.select("#orange").on("click",function(){
    	
    	visualizeData(dataset,"orange");

    });
    d3.select("#yellow").on("click",function(){
    	
    	visualizeData(dataset,"yellow");

    });
    d3.select("#green").on("click",function(){

    	visualizeData(dataset,"green");

    });
    d3.select("#blue").on("click",function(){

		visualizeData(dataset,"blue");

    });
    d3.select("#pink").on("click",function(){

    	visualizeData(dataset,"pink");

    });
    d3.select("#black").on("click",function(){

    	visualizeData(dataset,"black");

    });
    d3.select("#brown").on("click",function(){

    	visualizeData(dataset,"brown");

    });
    d3.select("#gray").on("click",function(){

    	visualizeData(dataset,"gray");

    });
    d3.select("#white").on("click",function(){

    	visualizeData(dataset,"white");

    });

	function visualizeData(data,color){

		//clean slate
		svg.selectAll("image").remove();

		var counter = 0;
		var ycounter = 0;

		var newData = [];

		for (var i = 0; i < data.length; i++){
			if ( data[i][1] === color )
				newData.push(data[i]);
		}

		svg.selectAll("image")
		   .data(newData)
		   .enter()
		   .append("svg:image")
		   .transition(1000)
		   .delay(function(d,i){
		   	return i*20;
		   })
		   .attr("xlink:href", function(d){
		  		return "logos/" + d[0]; 
		   })
		   .attr("x", function(d, i) {
		   		
		   		if (d[1] !== color){
		   			return 0		   			
		   		}
		   		else{
		   			counter++;
		   			return (counter * barW) % 700;
		   		}
		   			
		   })
		   .attr("y", function(d,i) {
		   		console.log(ycounter);
		   		if ( (i % 10 === 0) && (i !== 0) ){
		   			ycounter++;
		   		}
		   		return ycounter * barH;
		   })
		   .attr("opacity",function(d){
		   		if (d[1] !== color)
		   			return 0;
		   		else 
		   			return 100;
		   })
		   .attr("height",50)
		   .attr("width" ,50);
		   
	}



