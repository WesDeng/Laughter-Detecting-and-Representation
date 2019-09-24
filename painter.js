  function plotConsecutively(x, y, nameFile) {

    d3.json(nameFile).then(function(data){

      var svgHeight = window.innerHeight - 100;
      var svgWidth = window.innerWidth - 10;

      var svg = d3.select('body').append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append('circle')
          .attr('r', function(d) { return d.r; })
          .attr('cx', function(d) { return d.cx + x; })
          .attr('cy', function(d) { return d.cy + y; })
          .attr('fill', function(d) { return d.fill; })
          .attr('visibility', 'hidden')

      svg.selectAll("circle")
      .transition()
      .delay(function(d,i){ return 5.1*i; })
      .duration(10)
      .attr('visibility', 'visible');
    })
  }


  function plotStatically(x, y, nameFile) {

  d3.json(nameFile).then(function(data){

      var svgHeight = window.innerHeight - 100;
      var svgWidth = window.innerWidth - 10;

      var svg = d3.select('body').append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append('circle')
          .attr('r', function(d) { return d.r; })
          .attr('cx', function(d) { return d.cx; })
          .attr('cy', function(d) { return d.cy; })
          .attr('fill', function(d) { return d.fill; });


  })
}
