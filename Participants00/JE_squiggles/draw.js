
var temp = 0
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
function plotStatically(x, y, color, num) {

d3.json('json/'+color+ num +'.JSON').then(function(data){

  var svgHeight = 380
  var svgWidth = 400
  // fit the larger ones.... need to be changed.
  if (num == 8 || num == 12 || num == 2 || num == 9 || num == 10) {
    svgHeight = 400
    svgWidth = 800
  }
  if (num == 1) {
    svgWidth = 350
  }
  var domId = 'draw_'+color+'_'+num
    var svg = d3.select('#area_draw').append('div')
    .attr('style', "width:"+svgWidth +'px;height:'+svgHeight +'px')
    .attr("class", "drag")
      .attr('id', domId)
      .attr('data-color', color)
      .attr('data-drag', false)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .on('mouseover', function() {
        var audio = document.querySelector('#audioElement'+num)
        if(audio!==null){
          svg.selectAll("circle").attr('visibility', 'hidden')
              svg.selectAll("circle")
              .transition()
              .delay(function(d,i){ return 4.2*i; }) //Change to partly resolve sync issue.
              .duration(10)
              .attr('visibility', 'visible');
          if(audio.paused&&temp==0){
              temp = 1
              audio.play()
              audio.addEventListener('ended', function () {
                temp = 0
              }, false);
          }
        }
      })
      $('#area_draw #'+domId).hover(function(){
        $(this).fadeTo(20, 0.8);
      })
      $('#area_draw #'+domId).draggable({
		    cursor: "move",
        start: function( event, ui ) {
          $(this).attr('data-drag', true);
        }
      });
      $('.move_wrapper').droppable({
        drop:function(event,ui){
          var source = ui.draggable
          var top = event.clientY - 50
          source.css({'position':'fixed', 'left': ui.offset.left+'px', 'top': top +'px'})
          $(this).append(source)
        }
      });
      $('.delete_wrapper').droppable({
        drop:function(event,ui){
          var id = ui.draggable.attr('id').split('_')
          var item = id[1]+id[2]
          window.allData.remove(item)
          ui.draggable.remove()
        }
      });
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append('circle')
        .attr('r', function(d) { return d.r; })
        .attr('cx', function(d) { return d.cx + x; })
        .attr('cy', function(d) { return d.cy + y; })
        .attr('fill', function(d) { return d.fill; })

})
}
