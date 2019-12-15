var audio = document.querySelector('#audioElement');

var audioCtx = new (window.AudioContext || window.webkitAudioContext ||  window.webAudioContext)();

var audioSrc = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);
analyser.connect(audioCtx.destination);


var bufferSize = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(bufferSize);
analyser.getByteFrequencyData(frequencyData);



var svgHeight = window.innerHeight - 100;
var svgWidth = window.innerWidth - 10;


var svg = d3.select('body').append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);


function AverageFrequency(frequencyData) {
  var totalVolume = getTotalVolume(frequencyData);
  var weightedSum = 0;
  for(var i = 0; i < frequencyData.length; i++) {
    weightedSum += (i * (frequencyData[i]/totalVolume));
  }
  return weightedSum;
}

function getTotalVolume(frequencyData) {
  var totalVol = 0;
  for(var i = 0; i < frequencyData.length; i++) {
    totalVol += frequencyData[i];
  }
  return totalVol;
}

function AverageVolume(frequencyData) {
  var averageVol = 0;
  for(var i = 0; i < frequencyData.length; i++) {
    averageVol += frequencyData[i];
  }
  return averageVol/frequencyData.length;
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}


var strokeDictionary = [];

function makePoints(p1, p2, nameFile) {


  analyser.getByteFrequencyData(frequencyData);

    var colorScale = d3.scaleLinear()
    .domain([0, 1000])
    //pink
    // .range(["#fff4fc", "#890066"]);
    //blue
    // .range(["#eff4ff", "#002c9b"]);
    //green
    // .range(["#f2fff4", "#007519"]);
    //orange
    .range(["#fff9ef", "#c47900"]);
    // purple
    // .range(["#fbf7ff", "#470089"]);

  setTimeout(function(){

    if (AverageVolume(frequencyData) == 0) {
      if (strokeDictionary[p1-2] != null){
        var blob = new Blob([JSON.stringify(strokeDictionary)], {type: "text/plain;charset=utf-8"});  
        saveAs(blob, nameFile);

        // var jsonData = JSON.stringify(strokeDictionary);
        // download(jsonData, 'json2.txt', 'text/plain');
        return;
      } else {
        makePoints(p1, p2, nameFile);
      }
    }

    else{
      var r = AverageVolume(frequencyData)/3;
      var cx = p1;
      var cy = svgHeight - AverageFrequency(frequencyData)/1.5;
      var fill = colorScale(AverageVolume(frequencyData)*12);


      var circle = svg.append('circle')
      .attr('r', function() { return  r;})
      .attr('cx', function() { return cx; })
      .attr('cy', function() { return cy; })
      .attr('fill', function() { return fill; });

      var dict = {
        "r": r,
        "cx": cx,
        "cy": cy,
        "fill": fill
      };

      strokeDictionary.push(dict);

    makePoints(p1+1, p2+1, nameFile);

    }
  }, 2);
}