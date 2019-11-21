
// Dictionary to store all of my blob shapes
var blobDictionary = [];

// Input variables based on results of clustering algorithm
var duration = 0;
var energy = 2;
var tag = 0;
var imageI=0;
var currentsvg="";
var svgcc=false;
var oldxx=0;
var oldyy=0;

// Equation for converting duration value to "fuzziness" value
var variance = duration * (7.380165 + (12.03611 - 7.380165)/(1 + Math.pow(duration/5.366602),6.773093));

// Equation for converting pitch value to "opacity" value
var opacity = energy*12;


/**
 * Create polygon with 'n' number of sides
 */
function drawPolygon(n, x, y, duration) {
  var i;
  radius = 37.79609 + (25.54558 - 37.79609)/(1 + Math.pow((duration/2.382118),3.282129));
  
 
  
  // if (duration > 4){
  
  // } else {
  //   radius = 56.26509 + (24.43283 - 56.26509)/(1 + Math.pow((duration/5.21985), 1.635456));
  // }
  // 
  // altnerative
    // radius = 244.6255 + (24.62768 - 244.6255)/(1 + Math.pow((duration/5.794312),2.096778));
  // upperVariance = 35.66281 + (7.18025 - 35.66281)/(1 + Math.pow((variance/14.43395),2.403932));
  var polygonData = []
  for(i = 0; i < n; i++){
     // var entry = {"x": x + 0 +  radius * Math.cos(2 * Math.PI * i / n), "y": y + 0 + (radius * Math.sin(2 * Math.PI * i / n)), "variance": d3.randomUniform(2, variance)()};
       var entry = {"x": variance*5, "y": variance*5, "variance": variance};
      polygonData.push(entry);
  }

  return polygonData;
}

/**
 * Finds the midpoint of a given line segment described by x and y
 */
function findMidpoint(x1, x2, y1, y2, variance){
  var newX = ((x2 - x1)/2) + x1;
  newX = d3.randomNormal(newX, variance)();
  var newY = ((y2 - y1)/2) + y1;
  newY = d3.randomNormal(newY, variance)();
 // var newEntry = {'x': newX, 'y': newY, 'variance': variance-d3.randomUniform(0.05, 0.1)()};
  var newEntry = {'x': newX, 'y': newY, 'variance': variance*0.8};
  return newEntry;
}

/**
 * A function to create deep copies of an object, "o"
 */
function copy(o) {
 var output, v, key;
 output = Array.isArray(o) ? [] : {};
 for (key in o) {
     v = o[key];
     output[key] = (typeof v === "object") ? copy(v) : v;
 }
 return output;
}

/**
 * Deforms a given polygon by x number of times. More passes = more deformed. 
 */
function deform(polygon, passes) {
  if (passes == 0){
    return newPoly;
  }
  else {
    newPoly = [];
    var arrayLength = polygon.length;
    for (var i = 0; i < arrayLength-1; i++) {
      newPoly.push(polygon[i]);
      var newEntry = findMidpoint(polygon[i]['x'], polygon[i+1]['x'], polygon[i]['y'], polygon[i+1]['y'], polygon[i]['variance']);
      newPoly.push(newEntry)
    }
    newPoly.push(polygon[polygon.length-1]);
    var newEntry = findMidpoint(polygon[polygon.length-1]['x'], polygon[0]['x'], polygon[polygon.length-1]['y'], polygon[0]['y'], polygon[polygon.length-1]['variance']);
    newPoly.push(newEntry)
    return deform(newPoly, passes-1)
  }
}

/**
 * Returns the name of the appropriate color of .jpg file (handpainted watercolor texture) based on the tag
 */
function getColor(tag){
  var colors = ["image/green.jpg", "image/orange.jpg", "image/pink.jpg", "lightblue.jpg", "purple.jpg", "red.jpg"];
  return colors[tag];
}




//********************* d3.js stuff starts below ********************


var newPoly = [];
//var polygon = drawPolygon(12, 0, 0, duration); //Draw a polygon with 12 sides.... in reality this could be any number of sides. Variable polygon is a dictionary with the xy coordinates that make up the polygon
//var basePoly = copy(deform(polygon, 3));

//blobDictionary.push(basePoly);
var polygon
var basePoly

function startDraw(xx,yy,tag1,duration1){
  imageI++;
tag=tag1
duration=duration1
	
// Equation for converting duration value to "fuzziness" value
variance = duration * (7.380165 + (12.03611 - 7.380165)/(1 + Math.pow(duration/5.366602),6.773093));

// Equation for converting pitch value to "opacity" value
 opacity = energy*12;

blobDictionary = [];
	
newPoly = [];
polygon = drawPolygon(12, xx, yy, duration); //Draw a polygon with 12 sides.... in reality this could be any number of sides. Variable polygon is a dictionary with the xy coordinates that make up the polygon
basePoly = copy(deform(polygon, 3));
blobDictionary.push(basePoly);

// Drawing function d3.js
var drawPath = 
  d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveLinearClosed);


// Create the svg container with a given width and size
var svgContainer = d3.select("body")
      .append("svg")
      .attr("width", variance*10)
      .attr("height", variance*10)
      .style("position", "absolute")
      .style("left", xx-variance*5)
      .style("top", yy-variance*5)
	    .style("z-index", "0")
      .attr("id","svg"+$('#drag img').attr("src").split("/")[1].split(".")[0])
      .attr("sound", $('#drag img').attr("src").split("/")[1].split(".")[0]);


      $("svg").mouseenter(function(){
        $("audio").attr("src","audio/"+$(this).attr("sound")+".mp3")
        $("audio")[0].play();    
        })

        $('svg').mousedown(function(e){
   var positionDiv = $(this).offset();
    currentsvg=$(this).attr("id");
    svgcc=true;
    oldxx=$(this).width()/2
    oldyy=$(this).height()/2
    
    $(document).off('mousemove'); 
          $(document).mousemove(function(e){
            if(svgcc){             
              $('#'+currentsvg).css({
                  'left':(e.pageX -oldxx)+'px',
                  'top':(e.pageY -oldyy )+'px',
              });   
            }      
          });     
          $(document).mouseup(function(e){
              $(document).off('mousemove');
              svgcc=false
          });
      });
       
       
        
     
/*
    //是否拖动
var bb_tuodong=false;
//鼠标在上次的位置
var oldx_tuodong=0;
var oldy_tuodong=0;
//深度，让点击按钮显示在最顶层
var index=0;
//当前拖动的按钮
var currentmc_tuodong;
document.addEventListener("mousemove",mousemove_tuodong)
document.addEventListener("mouseup",mouseup_tuodong);
function mousedown_tuodong(e){
 
	bb_tuodong=true;
	currentmc_tuodong=e.target;
	oldx_tuodong=e.clientX-parseInt(currentmc_tuodong.style.left);
  oldy_tuodong=e.clientY-parseInt(currentmc_tuodong.style.top);
  document.title=$("#svg1").css("left")+":"+$("#svg1").css("top");
}
function mouseup_tuodong(e){
	bb_tuodong=false;
}
function mousemove_tuodong(e){
	if(bb_tuodong){
	currentmc_tuodong.style.left=(e.clientX-oldx_tuodong)+"px";
	currentmc_tuodong.style.top=(e.clientY-oldy_tuodong)+"px";
	}
}
*/


var defs = svgContainer.append('defs');


defs.append('pattern')
    .attr('id', "paint"+imageI)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 1500)
    .attr('height', 1500)
  .append('svg:image')
    .attr('xlink:href', getColor(tag))
    .attr("width", 3300)
    .attr("height", 3300)
    .attr("x", d3.randomUniform(-500, -1500)())
    .attr("y", d3.randomUniform(-1000, -1300)());


// Draw the base polygon
var enterElements = 
    svgContainer.append("path")
        .attr("d", drawPath(basePoly))
        .attr("fill-opacity", 0.03)
        .attr("stroke-opacity", 0)
        .attr("stroke", "#7d5b7f")
        .attr("stroke-width", 0.1)
        .attr("fill", "url(#paint1)");

// Draw a ton more shapes onto the base polygon
for (var i = 0; i < opacity; i++) {
  newPoly = [];
  var poly1 = copy(deform(basePoly, 3));
  blobDictionary.push(poly1);
  var enterElements2= 
    svgContainer.append("path")
                .attr("d", drawPath(poly1))
                .attr("fill-opacity", .03)
                .attr("stroke-opacity", 0.03)
                .attr("stroke", "#7d5b7f")
                .attr("stroke-width", .1)
                .attr("fill", "url(#paint"+imageI+")");
}

//var blob = new Blob([JSON.stringify(blobDictionary)], {type: "text/plain;charset=utf-8"});  
//saveAs(blob, "nameFile.JSON");

}

