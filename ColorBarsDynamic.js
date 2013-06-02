//Color Bars Javascript

	//Width and height
	var w = 800;
	var h = 300;

	var xSpacing = 100;
	var ySpacing = 0;

	var xPosPadding = 2;
	var yPosPadding = 1;

	var leftPadding = 150;

	var bottomMargin = 30;
	var interationCounter = 1;

	var jump = 100;

	//shape of bars
	var barW = w/jump * 3;
	var barH = h/jump * 2;


	//keeps track of how many occurences of each family color
	var numOfEachFamily = [0,0,0,0,0,0];

	var colorDataset ;	
	var datasetSpring = [];
	var datasetSummer = [];
	var datasetAutumn = [];
	var datasetWinter = [];	


	//Create SVG element---------------------------------------------------------------------------------------------
	var svg = d3.select("#graphHolder1")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	//load csv file
	d3.csv("colorDB.csv", function(data) { 

		colorDataset = data;
		
		//parse out 20 values, format is (HexNotation, Hue in Degrees)
		var subset = [];
		for (var i = 0; i < jump; i++){
			thisElement = [colorDataset[i].HexNotation,Math.floor(colorDataset[i].Hue)];
			subset.push(thisElement);
		}
		createVisualization(subset);

		//fill in arrays for other season datasets
		for (var i = 0; i < jump; i++){
			datasetSpring.push( [data[i+100].HexNotation, Math.floor(data[i+100].Hue)] );
			datasetSummer.push( [data[i+200].HexNotation, Math.floor(data[i+200].Hue)] );
			datasetAutumn.push( [data[i+300].HexNotation, Math.floor(data[i+300].Hue)] );
			datasetWinter.push( [data[i+400].HexNotation, Math.floor(data[i+400].Hue)] );
		}

	});

	/**
	Hue angle breakpoints:

	331-360 + 0-15 -  RED
	16-35          -  ORANGE
	36-90          -  YELLOW
	91-130         -  GREEN
	131-175        -  CYAN
	176-225        -  BLUE
	226-300        -  VIOLET
	301-330        -  MAGENTA
	**/				 						   

	/**

	Clicking the buttons
	
	**/

	d3.select("#title")
	  .on("click", function() {
		
		numOfEachFamily = [0,0,0,0,0,0];

		var s = [];
		for (var i = interationCounter*jump; i < interationCounter*jump + jump; i++){
			thisElement = [colorDataset[i].HexNotation,Math.floor(colorDataset[i].Hue)];
			s.push(thisElement);
		}
	
	//Create bars----------------------------------------------------------------------------------------------------
	svg.selectAll("rect")
	   .data(s)
	   .transition(100)
	   .delay(function(d,i){return d[1]})
	   .attr("x", function(d) {

	   		var returnVar;

	   		if ( isBetween(d[1],330,360) || isBetween(d[1],0,30) ){
				returnVar = barW;
			}
			if (isBetween(d[1],31,90)){
				returnVar = 50 + barW * 2;
			}
			if (isBetween(d[1],91,150)){
				returnVar = 100 + barW * 3;
			}
			if (isBetween(d[1],151,210)){
				returnVar = 150 + barW * 4;
			}
			if (isBetween(d[1],211,275)){
				returnVar = 200 + barW * 5;
			}
			if (isBetween(d[1],276,329)){
				returnVar = 250 + barW * 6;
			}

			return returnVar + leftPadding;
	   })
	   .attr("y", function(d) {

	   		var returnVar;
	   		
	   		if ( isBetween(d[1],330,360) || isBetween(d[1],0,30) ){
				numOfEachFamily[0] += 1;
				returnVar = barH * numOfEachFamily[0];
			}
			if (isBetween(d[1],31,90)){
				numOfEachFamily[1] += 1;
				returnVar = barH * numOfEachFamily[1];
			}
			if (isBetween(d[1],91,150)){
				numOfEachFamily[2] += 1;
				returnVar = barH * numOfEachFamily[2];
			}
			if (isBetween(d[1],151,210)){
				numOfEachFamily[3] += 1;
				returnVar = barH * numOfEachFamily[3];
			}
			if (isBetween(d[1],211,275)){
				numOfEachFamily[4] += 1;
				returnVar = barH * numOfEachFamily[4];
			}
			if (isBetween(d[1],276,329)){
				numOfEachFamily[5] += 1;
				returnVar = barH * numOfEachFamily[5];
			}

			//reverse to bottom to top
			return h - returnVar - bottomMargin ;

	   })
	   //get rid of magic number 45 ?
	   .attr("transform", "translate(45,0)")
	   .transition()
	   .attr("width" , barW - xPosPadding)
	   .attr("height", barH - yPosPadding)
	   .attr("fill", function(d,i) {
			
			return s[i][0];

	   });

		interationCounter++;
		  
	});
	

	d3.select("#spring").on("click",function() { 
		numOfEachFamily = [0,0,0,0,0,0];
		clickTransition(datasetSpring); 
	});

	d3.select("#summer").on("click",function() { 
		numOfEachFamily = [0,0,0,0,0,0];
		clickTransition(datasetSummer); 
	});

	d3.select("#autumn").on("click",function() { 
		numOfEachFamily = [0,0,0,0,0,0];
		clickTransition(datasetAutumn); 
	});

	d3.select("#winter").on("click",function() { 
		numOfEachFamily = [0,0,0,0,0,0];
		clickTransition(datasetWinter); 
	});

function createVisualization(thisData){

	//Create bars----------------------------------------------------------------------------------------------------
	svg.selectAll("rect")
	   .data(thisData)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {

	   		var returnVar;

	   		if ( isBetween(d[1],330,360) || isBetween(d[1],0,30) ){
				returnVar = barW;
			}
			if (isBetween(d[1],31,90)){
				returnVar = 50 + barW * 2;
			}
			if (isBetween(d[1],91,150)){
				returnVar = 100 + barW * 3;
			}
			if (isBetween(d[1],151,210)){
				returnVar = 150 + barW * 4;
			}
			if (isBetween(d[1],211,275)){
				returnVar = 200 + barW * 5;
			}
			if (isBetween(d[1],276,329)){
				returnVar = 250 + barW * 6;
			}

			return returnVar + leftPadding;

	   })
	   .attr("y", function(d,i) {

	   		var returnVar;

	   		if ( isBetween(d[1],330,360) || isBetween(d[1],0,30) ){
				numOfEachFamily[0] += 1;
				returnVar = barH * numOfEachFamily[0];
			}
			if (isBetween(d[1],31,90)){
				numOfEachFamily[1] += 1;
				returnVar = barH * numOfEachFamily[1];
			}
			if (isBetween(d[1],91,150)){
				numOfEachFamily[2] += 1;
				returnVar = barH * numOfEachFamily[2];
			}
			if (isBetween(d[1],151,210)){
				numOfEachFamily[3] += 1;
				returnVar = barH * numOfEachFamily[3];
			}
			if (isBetween(d[1],211,275)){
				numOfEachFamily[4] += 1;
				returnVar = barH * numOfEachFamily[4];
			}
			if (isBetween(d[1],276,329)){
				numOfEachFamily[5] += 1;
				returnVar = barH * numOfEachFamily[5];
			}

			//reverse to bottom to top
			return h - returnVar - bottomMargin ;

	   })
	   //get rid of magic number 45 ?
	   .attr("transform", "translate(45,0)")
	   .transition()
	   .attr("width" , barW - xPosPadding)
	   .attr("height", barH - yPosPadding)
	   .attr("fill", function(d,i) {
			
			return thisData[i][0];

	   });


}//end function: createVisualization()	  

function clickTransition(thisData)  {

	//Create bars----------------------------------------------------------------------------------------------------
	svg.selectAll("rect")
	   .data(thisData)
	   .transition(100)
	   .delay(function(d,i){return d[1]})
	   .attr("x", function(d) {

	   		var returnVar;

	   		if ( isBetween(d[1],330,360) || isBetween(d[1],0,30) ){
				returnVar = barW;
			}
			if (isBetween(d[1],31,90)){
				returnVar = 50 + barW * 2;
			}
			if (isBetween(d[1],91,150)){
				returnVar = 100 + barW * 3;
			}
			if (isBetween(d[1],151,210)){
				returnVar = 150 + barW * 4;
			}
			if (isBetween(d[1],211,275)){
				returnVar = 200 + barW * 5;
			}
			if (isBetween(d[1],276,329)){
				returnVar = 250 + barW * 6;
			}

			return returnVar + leftPadding;
	   })
	   .attr("y", function(d) {

	   		var returnVar;
	   		
	   		if ( isBetween(d[1],330,360) || isBetween(d[1],0,30) ){
				numOfEachFamily[0] += 1;
				returnVar = barH * numOfEachFamily[0];
			}
			if (isBetween(d[1],31,90)){
				numOfEachFamily[1] += 1;
				returnVar = barH * numOfEachFamily[1];
			}
			if (isBetween(d[1],91,150)){
				numOfEachFamily[2] += 1;
				returnVar = barH * numOfEachFamily[2];
			}
			if (isBetween(d[1],151,210)){
				numOfEachFamily[3] += 1;
				returnVar = barH * numOfEachFamily[3];
			}
			if (isBetween(d[1],211,275)){
				numOfEachFamily[4] += 1;
				returnVar = barH * numOfEachFamily[4];
			}
			if (isBetween(d[1],276,329)){
				numOfEachFamily[5] += 1;
				returnVar = barH * numOfEachFamily[5];
			}

			//reverse to bottom to top
			return h - returnVar - bottomMargin ;

	   })
	   //get rid of magic number 45 ?
	   .attr("transform", "translate(45,0)")
	   .transition()
	   .attr("width" , barW - xPosPadding)
	   .attr("height", barH - yPosPadding)
	   .attr("fill", function(d,i) {
			
			return thisData[i][0];

	   });

}

	function get_rand_color(){

	    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
	    while(color.length < 6) {
	    	color = "0" + color;
	    }
	    return "#" + color;

	}

	function isBetween(num, min, max){
		if (num >= min && num <= max)
			return true;
		else
			return false;
	}




