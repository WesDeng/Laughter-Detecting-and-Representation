var app = new Vue({
  el: '#app',
  data: {
    isShow: false,
    list:[
      {name:'date', id:1},
      {name:'pitch', id:2},
      {name:'location', id:3},
    ],
    isChange_x:-1,
    isChange_y: -1,
    point_data: [
      { dataX: 720, dataY: 30, dataZ: 100, name: 'img1' },
      { dataX: 220, dataY: 195, dataZ: 180, name: 'img2' },
      { dataX: 1111, dataY: 320, dataZ: 90, name: 'img3' },
      { dataX: 311, dataY: 120, dataZ: 145, name: 'img4' },
      { dataX: 150, dataY: 450, dataZ: 400, name: 'img5' },
      { dataX: 840, dataY: 425, dataZ: 650, name: 'img6' },
      { dataX: 494, dataY: 416, dataZ: 220, name: 'img7' },
      { dataX: 1237, dataY: 349, dataZ: 310, name: 'img8' },
      // { dataX: 237, dataY: 149, dataZ: 110, name: 'img9' },
      { dataX: 425, dataY: 360, dataZ: 70, name: 'img10' },
      { dataX: 1100, dataY: 70, dataZ: 80, name: 'img11' },
      { dataX: 620, dataY: 149, dataZ: 110, name: 'img12' },
      { dataX: 770, dataY: 395, dataZ: 550, name: 'img13' },
      { dataX: 427, dataY: 333, dataZ: 310, name: 'img14' },
      { dataX: 537, dataY: 169, dataZ: 310, name: 'img15' }
    ]
  },
  watch: {
    isChange_x(){
      if (this.isChange_x == this.isChange_y && this.isChange_x != -1) {
        this.isChange_y = -1
      }
    },
    isChange_y(){
      if (this.isChange_x == this.isChange_y && this.isChange_y != -1) {
        this.isChange_x = -1
      }
    }
  },
  mounted: function(){
  },
  methods:{
    clickBtn_X(index){
        if(index!=this.isChange_x){
            this.isChange_x = index;
        }else{
            this.isChange_x = -1;
        }
    },
    clickBtn_Y(index){
      if(index!=this.isChange_y){
          this.isChange_y = index;
      }else{
          this.isChange_y = -1;
      }
    },
    draw() {
      if (this.isChange_x == -1 || this.isChange_y== -1) {
        return alert('Please check')
      }
      this.isShow = true
      let data = []
      let point_data = this.point_data
      for (let i = 0; i < point_data.length; i++) {
        let getData = { x: '', y: '', symbol: point_data[i].name}
        if (this.isChange_x === 1) {
          if (this.isChange_y === 2) {
            getData.x = point_data[i].dataX
            getData.y = point_data[i].dataY
          } else {
            getData.x = point_data[i].dataX
            getData.y = point_data[i].dataZ
          }
        } else if (this.isChange_x === 2) {
          if (this.isChange_y === 1) {
            getData.x = point_data[i].dataY
            getData.y = point_data[i].dataX
          } else {
            getData.x = point_data[i].dataY
            getData.y = point_data[i].dataZ
          }
        } else if (this.isChange_x === 3) {
          if (this.isChange_y === 1) {
            getData.x = point_data[i].dataZ
            getData.y = point_data[i].dataX
          } else {
            getData.x = point_data[i].dataZ
            getData.y = point_data[i].dataY
          }
        }
        data.push(getData)
      }
      data.forEach((item,index)=> {
        var img = document.getElementById(item.symbol)
        img.style.left = item.x + 'px'
        img.style.top = item.y + 'px'
        img.onmouseover=function() {
          var music = document.getElementById("audio"+ (index+1));
          music.play();
          var start = 0;

          music.addEventListener("ended",function() {
              start++;
              start == 1 && music.pause();
          });
        }
        img.onmousedown = function(evt) {
          var oEvent = evt || event; // Get the event.
          var disX = oEvent.clientX - parseInt(img.style.left);
          var disY = oEvent.clientY - parseInt(img.style.top);

          //Move in real time.
          document.onmousemove = function(evt) {
              var oEvent = evt || event;
              var movex = oEvent.clientX - disX
              var movey = oEvent.clientY - disY
              console.log(img.height)
              if (movex<61&&movey>600-img.height) {
                img.style.display = 'none'
              }
              img.style.zIndex = index+1
              img.style.left = movex + 'px';
              img.style.top = movey + 'px';
            }
            //Stop moving.
          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }
      })
    }
  }
});
