//Color Bars Javascript

	//Width and height
	var w = 800;
	var h = 300;

	//shape of bars
	var barW = 25;
	var barH = 30;

	var xSpacing = 100;
	var ySpacing = 0;

	var xPosPadding = 2;
	var yPosPadding = 1;

	var bottomMargin = 30;

	//keeps track of how many occurences of each family color
	var numOfEachFamily = [0,0,0,0,0,0,0];
	
	//values of colors in hexidemical-------------------------------------------------------------------------------
	var dataset = [ ["FF0000",    "red"],["FF4040",   "red"],["FF7373",   "red"],["BF3030",   "red"],["A60000",   "red"],
					["FF7400", "orange"],["BF7130","orange"],["A64B00","orange"],["FF9640","orange"],["FFB273","orange"],
					["CD0074",    "red"],["85004B",   "red"],["E667AF",   "red"],["992667",   "red"],["E6399B",   "red"],
					["00CC07",  "green"],["26F926", "green"],["67E667", "green"],["99FF22", "green"],["39E639", "green"],
					["FFD300", "yellow"],
					["3914AF",   "blue"],
					["6C006C", "indigo"],
					["7109AA", "violet"]
				  ];

	var colorDataset ;		

	//load csv file
	d3.csv("colorDB.csv", function(data) { 
		colorDataset = data.slice(1,20);
		console.log(colorDataset);
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
				  
    //count how many occurences of each family color

    /**
	for (var i = 0; i < dataset.length; i++){
		if (dataset[i][1] == "red")
			numOfEachFamily[0] += 1;
		if (dataset[i][1] == "orange")
			numOfEachFamily[1] += 1
		if (dataset[i][1] == "yellow")
			numOfEachFamily[2] += 1
		if (dataset[i][1] == "green")
			numOfEachFamily[3] += 1
		if (dataset[i][1] == "blue")
			numOfEachFamily[4] += 1
		if (dataset[i][1] == "indigo")
			numOfEachFamily[5] += 1
		if (dataset[i][1] == "violet")
			numOfEachFamily[6] += 1
	}
	**/
	


	//create color family scale-------------------------------------------------------------------------------------
    var xScale = d3.scale.ordinal()
   				  .domain(["red","orange","yellow","green","blue","indigo","violet"])
   				  .rangeBands([0,w]);


	//Create SVG element---------------------------------------------------------------------------------------------
	var svg = d3.select("#firstGraph")
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	//Create bars----------------------------------------------------------------------------------------------------
	var rect = svg.selectAll("rect")
	   .data(dataset)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {

	   		return xScale(d[1]);

	   })
	   .attr("y", function(d,i) {

	   		var returnVar;

	   		if (d[1] == "red"){
				numOfEachFamily[0] += 1;
				returnVar = barH * numOfEachFamily[0];
			}
			if (d[1] == "orange"){
				numOfEachFamily[1] += 1;
				returnVar = barH * numOfEachFamily[1];
			}
			if (d[1] == "yellow"){
				numOfEachFamily[2] += 1;
				returnVar = barH * numOfEachFamily[2];
			}
			if (d[1] == "green"){
				numOfEachFamily[3] += 1;
				returnVar = barH * numOfEachFamily[3];
			}
			if (d[1] == "blue"){
				numOfEachFamily[4] += 1;
				returnVar = barH * numOfEachFamily[4];
			}
			if (d[1] == "indigo"){
				numOfEachFamily[5] += 1;
				returnVar = barH * numOfEachFamily[5];
			}
			if (d[1] == "violet"){
				numOfEachFamily[6] += 1;
				returnVar = barH * numOfEachFamily[6];
			}

			//reverse to bottom to top
			return h - returnVar - bottomMargin ;

	   })
	   //get rid of magic number 45 ?
	   .attr("transform", "translate(45,0)")
	   .attr("width" , barW - xPosPadding)
	   .attr("height", barH - yPosPadding)
	   .attr("fill", function(d,i) {
			
			return "#" + dataset[i][0];

	   });

	//append x axis----------------------------------------------------------------------------------------------------
	svg.append("g")
	   .attr("class","axis")

	   .attr("transform", "translate(0," + (h - 30 ) + ")")
	   .call(d3.svg.axis()
		       .scale(xScale)
		       .orient("bottom"));
	   
	d3.select("#title")
	  .on("click", function() {
		
		var color;

		for (var i = 0; i < dataset.length; i++){
			color = get_rand_color();
			dataset[i][1] = color;
		}

		rect
		.data(dataset) 
		.transition()
		.delay(function(d,i) {return i*50})
		.duration(500)
		.attr("fill",function(d) { return d[1];})   
		  
	});

	function get_rand_color(){

	    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
	    while(color.length < 6) {
	    	color = "0" + color;
	    }
	    return "#" + color;

	}




