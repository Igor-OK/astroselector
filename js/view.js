//============================  VIEW   =====================================

var ViewH = {

SVG : document.querySelector('.svg'),
RED : document.querySelector('.RED'),
SVGdiv : document.querySelector('.image'),
SVGsquare : document.querySelector('.square'),
Time_span : document.querySelector('.time'),
User_span : document.querySelector('.user'),
Info : document.querySelector('.info'),
SVGHeight : null,
SVGWidth : null,
SVGopt : null,
BIG : null,  // proportion of all
GradCircle : null, //main circle
Arrow : null,  // arrow-svg-object
Axis : null,

Axis_speed : null, // 1 or -1 wide or collapse
Axis_R : null, // current radius of axis, in normal condiyions = 0
Left_Right : 0,
Angle : null, // angle of axis

User_text : null,
Time_text :null,

//====signs
Astro : null,
Red1 : null,
Red2 : null,
Red3 : null,
Red4 : null,
Red5 : null,
Red6 : null,
White1 : null,
White2 : null,
White3 : null,
Green1 : null,
Green2 : null,
Green3 : null,
Green4 : null,
Green5 : null,
Green6 : null,
Arrow_angle: 0, // angle of main arrow
Timer : null, //timer for transitions

// values-texts for signs-buttons
Red1_txt : [0,''],
Red2_txt : [0,''],
Red3_txt : [0,''],
Red4_txt : [0,''],
Red5_txt : [0,''],
Red6_txt : [0,''],
White1_txt : [0,''],
White2_txt : [0,''],
White3_txt : [0,''],
Green1_txt : [0,''],
Green2_txt : [0,''],
Green3_txt : [0,''],
Green4_txt : [0,''],
Green5_txt : [0,''],
Green6_txt : [0,''],

// opacities
Def_opa: 0.1, // default opacity
Red1_opa : 0,
Red2_opa : 0,
Red3_opa : 0,
Red4_opa : 0,
Red5_opa : 0,
Red6_opa : 0,
White1_opa : 0,
White2_opa : 0,
White3_opa : 0,
Green1_opa : 0,
Green2_opa : 0,
Green3_opa : 0,
Green4_opa : 0,
Green5_opa : 0,
Green6_opa : 0,



Opacity_update : function(){ //assign values of opacity to sign-btns depending of according text

  if(this.Red1_txt[0] != 0) this.Red1_opa = this.Red1_txt[0]*0.1+0.2; else this.Red1_opa = this.Def_opa;
  if(this.Red2_txt[0] != 0) this.Red2_opa = this.Red2_txt[0]*0.1+0.2; else this.Red2_opa = this.Def_opa;
  if(this.Red3_txt[0] != 0) this.Red3_opa = this.Red3_txt[0]*0.1+0.2; else this.Red3_opa = this.Def_opa;
  if(this.Red4_txt[0] != 0) this.Red4_opa = this.Red4_txt[0]*0.1+0.2; else this.Red4_opa = this.Def_opa;
  if(this.Red5_txt[0] != 0) this.Red5_opa = this.Red5_txt[0]*0.1+0.2; else this.Red5_opa = this.Def_opa;
  if(this.Red6_txt[0] != 0) this.Red6_opa = this.Red6_txt[0]*0.1+0.2; else this.Red6_opa = this.Def_opa;

  if(this.White1_txt[0] != 0) this.White1_opa = this.White1_txt[0]*0.1+0.2; else this.White1_opa = this.Def_opa;
  if(this.White2_txt[0] != 0) this.White2_opa = this.White2_txt[0]*0.1+0.2; else this.White2_opa = this.Def_opa;
  if(this.White3_txt[0] != 0) this.White3_opa = this.White3_txt[0]*0.1+0.2; else this.White3_opa = this.Def_opa;

  if(this.Green1_txt[0] != 0) this.Green1_opa = this.Green1_txt[0]*0.1+0.2; else this.Green1_opa = this.Def_opa;
  if(this.Green2_txt[0] != 0) this.Green2_opa = this.Green2_txt[0]*0.1+0.2; else this.Green2_opa = this.Def_opa;
  if(this.Green3_txt[0] != 0) this.Green3_opa = this.Green3_txt[0]*0.1+0.2; else this.Green3_opa = this.Def_opa;
  if(this.Green4_txt[0] != 0) this.Green4_opa = this.Green4_txt[0]*0.1+0.2; else this.Green4_opa = this.Def_opa;
  if(this.Green5_txt[0] != 0) this.Green5_opa = this.Green5_txt[0]*0.1+0.2; else this.Green5_opa = this.Def_opa;
  if(this.Green6_txt[0] != 0) this.Green6_opa = this.Green6_txt[0]*0.1+0.2; else this.Green6_opa = this.Def_opa;
},


Text_to_zero : function(){
this.Red1_txt[0] = 0; this.Red1_txt[1] = '';
this.Red2_txt[0] = 0; this.Red2_txt[1] = '';
this.Red3_txt[0] = 0; this.Red3_txt[1] = '';
this.Red4_txt[0] = 0; this.Red4_txt[1] = '';
this.Red5_txt[0] = 0; this.Red5_txt[1] = '';
this.Red6_txt[0] = 0; this.Red6_txt[1] = '';

this.White1_txt[0] = 0; this.White1_txt[1] = '';
this.White2_txt[0] = 0; this.White2_txt[1] = '';
this.White3_txt[0] = 0; this.White3_txt[1] = '';

this.Green1_txt[0] = 0; this.Green1_txt[1] = '';
this.Green2_txt[0] = 0; this.Green2_txt[1] = '';
this.Green3_txt[0] = 0; this.Green3_txt[1] = '';
this.Green4_txt[0] = 0; this.Green4_txt[1] = '';
this.Green5_txt[0] = 0; this.Green5_txt[1] = '';
this.Green6_txt[0] = 0; this.Green6_txt[1] = '';
},



ViewReady : function(){

// Main gradient (linear)
  var svgNS = svg.namespaceURI;
  var grad1  = document.createElementNS(svgNS,'linearGradient');
  grad1.setAttribute('id','grad1');
  grad1.setAttribute('x1','100%');
  grad1.setAttribute('y1','0%');
  grad1.setAttribute('x2','0%');
  grad1.setAttribute('y2','100%');
  var stop1 = document.createElementNS(svgNS,'stop');
  var stop2 = document.createElementNS(svgNS,'stop');
  stop1.setAttribute("offset",'0%');
  stop1.setAttribute("stop-color",'#555555');  
  stop2.setAttribute("offset",'100%');
  stop2.setAttribute("stop-color",'#000000');  
  grad1.appendChild(stop1);
  grad1.appendChild(stop2);
  var defs = this.SVG.insertBefore( document.createElementNS(svgNS,'defs'), this.SVG.firstChild );
  defs.appendChild(grad1);
// Main gradient (radial)
  var svgNS = svg.namespaceURI;
  var grad2  = document.createElementNS(svgNS,'radialGradient');
  grad2.setAttribute('id','grad2');
  var stop3 = document.createElementNS(svgNS,'stop');
  var stop4 = document.createElementNS(svgNS,'stop');
  stop3.setAttribute("offset",'93%');
  stop3.setAttribute("stop-color",'#000000');  
  stop4.setAttribute("offset",'100%');
  stop4.setAttribute("stop-color",'#555555');  
  grad2.appendChild(stop3);
  grad2.appendChild(stop4);
  var defs = this.SVG.insertBefore( document.createElementNS(svgNS,'defs'), this.SVG.firstChild );
  defs.appendChild(grad2);

this.User_span.textContent = this.User_text;  // showing user info after first loading
this.Time_span.textContent = this.Time_text;  // showing user info after first loading
this.Timer = setInterval(this.Transition,17);       //Starting timer

   this.SVGHeight = this.SVGdiv.offsetHeight;
   this.SVGWidth = this.SVGdiv.offsetWidth;
   this.SVGopt = ((this.SVGHeight>=this.SVGWidth)?this.SVGWidth:this.SVGHeight)*0.95; //width&height of devise round
   this.BIG = this.SVGopt/100;
   this.SVGsquare.style.width = 100*this.BIG + 'px';
   this.SVGsquare.style.height = 100*this.BIG + 'px';
   this.SVG.setAttribute("width",100*this.BIG);
   this.SVG.setAttribute("height",100*this.BIG);
   this.RED.setAttribute("r",50*this.BIG);
   this.RED.setAttribute("cx",50*this.BIG);
   this.RED.setAttribute("cy",50*this.BIG);
   this.RED.setAttribute("fill","url(#grad2)");
   this.GradCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
   this.GradCircle.setAttribute("r",47*this.BIG);
   this.GradCircle.setAttribute("cx",50*this.BIG);
   this.GradCircle.setAttribute("cy",50*this.BIG);
   this.GradCircle.setAttribute("fill","url(#grad1)");
   this.SVG.appendChild(this.GradCircle);

  for (var i=0; i<=14; i++) // adding colorfull points
  {
    var SPoint=document.createElementNS("http://www.w3.org/2000/svg",'line');
    SPoint.setAttribute("id","SPoint"+i);
    if(i<7){
      var R = 205;
      var G = i*i*4;
      var B = i*i*4;
        SPoint.setAttribute("stroke","rgb("+R+","+G+","+B+")");
    }
    else{
      var R = (15-i-1)*(15-i-1)*4;
      var G = 205;
      var B = (15-i-1)*(15-i-1)*4;
        SPoint.setAttribute("stroke","rgb("+R+","+G+","+B+")");
    }
    SPoint.setAttribute("stroke-width",2.5*this.BIG); 
    SPoint.setAttribute("stroke-linecap","round");         
    SPoint.setAttribute("fill","none");
    var alfa = i*180/14+270;
    var SPointX=Math.round(50*this.BIG+45*this.BIG*Math.sin(alfa/180*Math.PI));
    var SPointY=Math.round(50*this.BIG-45*this.BIG*Math.cos(alfa/180*Math.PI));
    SPoint.setAttribute("x1",SPointX);
    SPoint.setAttribute("y1",SPointY);
    SPoint.setAttribute("x2",SPointX);
    SPoint.setAttribute("y2",SPointY+7*this.BIG);
    SPoint.setAttribute("transform","rotate("+alfa+" "+SPointX+" "+SPointY+")");
    this.SVG.appendChild(SPoint);
  }

this.Arrow = document.createElementNS("http://www.w3.org/2000/svg",'rect'); // device arrow
this.Arrow.setAttribute("fill","white");
this.Arrow.setAttribute("stroke","dimgray");
this.Arrow.setAttribute("height", 45*this.BIG);
this.Arrow.setAttribute("width", 2*this.BIG);
this.Arrow.setAttribute("x",49*this.BIG);
this.Arrow.setAttribute("y",5*this.BIG);
this.Arrow.setAttribute("rx",this.BIG);
this.Arrow.setAttribute("ry",this.BIG);        
this.Arrow.setAttribute("transform","rotate("+this.Arrow_angle+" "+50*this.BIG+" "+50*this.BIG+")");   
this.SVG.appendChild(this.Arrow);

this.Axis = document.createElementNS("http://www.w3.org/2000/svg",'circle'); // device arrow axis
this.Axis.setAttribute("fill","#111111");
this.Axis.setAttribute("stroke","#222222");
this.Axis.setAttribute("stroke-width",0.5*this.BIG);
this.Axis.setAttribute("r",5.5*this.BIG+this.Axis_R*this.BIG);
this.Axis.setAttribute("cx",50*this.BIG);
this.Axis.setAttribute("cy",50*this.BIG);
this.SVG.appendChild(this.Axis);

this.Astro = document.createElement('img');
this.Astro.className = 'device-svg';
this.Astro.setAttribute("src", "img/sprite.svg#Astro"); 
this.Astro.setAttribute("height", 10*this.BIG);
this.Astro.setAttribute("width", 10*this.BIG);
//this.Astro.setAttribute('style', 'transition-duration: 0.75s;  transition-timing-function: linear; transform: translateZ(0) rotate(360deg) scale(10);');

this.Astro.style.left = 45*this.BIG +'px';
this.Astro.style.top = 45*this.BIG +'px';
this.Astro.style.opacity = 0.77;
this.SVGsquare.appendChild(this.Astro);




// ==== SIGNS
this.Red1 = document.createElement('img');
this.Red1.className = 'device-svg';
this.Red1.setAttribute("src", "img/sprites2.svg#Red1");
this.Red1.setAttribute("height", 9*this.BIG);
this.Red1.setAttribute("width", 9*this.BIG);
this.Red1.style.left = 7*this.BIG +'px';
this.Red1.style.top = 57*this.BIG +'px';
this.Red1.style.opacity = this.Red1_opa;
this.SVGsquare.appendChild(this.Red1);

this.Red2 = document.createElement('img');
this.Red2.className = 'device-svg';
this.Red2.setAttribute("src", "img/sprites2.svg#Red2");
this.Red2.setAttribute("height", 9*this.BIG);
this.Red2.setAttribute("width", 9*this.BIG);
this.Red2.style.left = 20*this.BIG +'px';
this.Red2.style.top = 57*this.BIG +'px';
this.Red2.style.opacity = this.Red2_opa;
this.SVGsquare.appendChild(this.Red2);

this.Red3 = document.createElement('img');
this.Red3.className = 'device-svg';
this.Red3.setAttribute("src", "img/sprites2.svg#Red3");
this.Red3.setAttribute("height", 9*this.BIG);
this.Red3.setAttribute("width", 9*this.BIG);
this.Red3.style.left = 33*this.BIG +'px';
this.Red3.style.top = 57*this.BIG +'px';
this.Red3.style.opacity = this.Red3_opa;
this.SVGsquare.appendChild(this.Red3);

this.Red4 = document.createElement('img');
this.Red4.className = 'device-svg';
this.Red4.setAttribute("src", "img/sprites.svg#Red4");
this.Red4.setAttribute("height", 9*this.BIG);
this.Red4.setAttribute("width", 15*this.BIG);
this.Red4.style.left = 14*this.BIG +'px';
this.Red4.style.top = 70*this.BIG +'px';
this.Red4.style.opacity = this.Red4_opa;
this.SVGsquare.appendChild(this.Red4);

this.Red5 = document.createElement('img');
this.Red5.className = 'device-svg';
this.Red5.setAttribute("src", "img/sprites2.svg#Red5m");
this.Red5.setAttribute("height", 9*this.BIG);
this.Red5.setAttribute("width", 9*this.BIG);
this.Red5.style.left = 33*this.BIG +'px';
this.Red5.style.top = 70*this.BIG +'px';
this.Red5.style.opacity = this.Red5_opa;
this.SVGsquare.appendChild(this.Red5);

this.Red6 = document.createElement('img');
this.Red6.className = 'device-svg';
this.Red6.setAttribute("src", "img/sprites2.svg#Red6");
this.Red6.setAttribute("height", 9*this.BIG);
this.Red6.setAttribute("width", 9*this.BIG);
this.Red6.style.left = 33*this.BIG +'px';
this.Red6.style.top = 83*this.BIG +'px';
this.Red6.style.opacity = this.Red6_opa;
this.SVGsquare.appendChild(this.Red6);

this.White1 = document.createElement('img');
this.White1.className = 'device-svg';
this.White1.setAttribute("src", "img/sprites2.svg#White1g");
this.White1.setAttribute("height", 9*this.BIG);
this.White1.setAttribute("width", 9*this.BIG);
this.White1.style.left = 46*this.BIG +'px';
this.White1.style.top = 57*this.BIG +'px';
this.White1.style.opacity = this.White1_opa;
this.SVGsquare.appendChild(this.White1);

this.White2 = document.createElement('img');
this.White2.className = 'device-svg';
this.White2.setAttribute("src", "img/sprites2.svg#White2g");
this.White2.setAttribute("height", 9*this.BIG);
this.White2.setAttribute("width", 9*this.BIG);
this.White2.style.left = 46*this.BIG +'px';
this.White2.style.top = 70*this.BIG +'px';
this.White2.style.opacity = this.White2_opa;
this.SVGsquare.appendChild(this.White2);

this.White3 = document.createElement('img');
this.White3.className = 'device-svg';
this.White3.setAttribute("src", "img/sprites2.svg#White3b");
this.White3.setAttribute("height", 9*this.BIG);
this.White3.setAttribute("width", 9*this.BIG);
this.White3.style.left = 46*this.BIG +'px';
this.White3.style.top = 83*this.BIG +'px';
this.White3.style.opacity = this.White3_opa;
this.SVGsquare.appendChild(this.White3);

this.Green1 = document.createElement('img');
this.Green1.className = 'device-svg';
this.Green1.setAttribute("src", "img/sprites2.svg#Green1");
this.Green1.setAttribute("height", 9*this.BIG);
this.Green1.setAttribute("width", 9*this.BIG);
this.Green1.style.left = 59*this.BIG +'px';
this.Green1.style.top = 57*this.BIG +'px';
this.Green1.style.opacity = this.Green1_opa;
this.SVGsquare.appendChild(this.Green1);

this.Green2 = document.createElement('img');
this.Green2.className = 'device-svg';
this.Green2.setAttribute("src", "img/sprites2.svg#Green2");
this.Green2.setAttribute("height", 9*this.BIG);
this.Green2.setAttribute("width", 9*this.BIG);
this.Green2.style.left = 72*this.BIG +'px';
this.Green2.style.top = 57*this.BIG +'px';
this.Green2.style.opacity = this.Green2_opa;
this.SVGsquare.appendChild(this.Green2);

this.Green3 = document.createElement('img');
this.Green3.className = 'device-svg';
this.Green3.setAttribute("src", "img/sprites2.svg#Green3");
this.Green3.setAttribute("height", 9*this.BIG);
this.Green3.setAttribute("width", 9*this.BIG);
this.Green3.style.left = 85*this.BIG +'px';
this.Green3.style.top = 57*this.BIG +'px';
this.Green3.style.opacity = this.Green3_opa;
this.SVGsquare.appendChild(this.Green3);

this.Green4 = document.createElement('img');
this.Green4.className = 'device-svg';
this.Green4.setAttribute("src", "img/sprites2.svg#Green4m");
this.Green4.setAttribute("height", 9*this.BIG);
this.Green4.setAttribute("width", 9*this.BIG);
this.Green4.style.left = 59*this.BIG +'px';
this.Green4.style.top = 70*this.BIG +'px';
this.Green4.style.opacity = this.Green4_opa;
this.SVGsquare.appendChild(this.Green4);

this.Green5 = document.createElement('img');
this.Green5.className = 'device-svg';
this.Green5.setAttribute("src", "img/sprites.svg#Green5");
this.Green5.setAttribute("height", 9*this.BIG);
this.Green5.setAttribute("width", 14*this.BIG);
this.Green5.style.left = 72*this.BIG +'px';
this.Green5.style.top = 70*this.BIG +'px';
this.Green5.style.opacity = this.Green5_opa;
this.SVGsquare.appendChild(this.Green5);

this.Green6 = document.createElement('img');
this.Green6.className = 'device-svg';
this.Green6.setAttribute("src", "img/sprites2.svg#Green6");
this.Green6.setAttribute("height", 9*this.BIG);
this.Green6.setAttribute("width", 9*this.BIG);
this.Green6.style.left = 59*this.BIG +'px';
this.Green6.style.top = 83*this.BIG +'px';
this.Green6.style.opacity = this.Green6_opa;
this.SVGsquare.appendChild(this.Green6);





//handlers for buttons-signs
this.Red1.addEventListener('mousedown',function() {if (ViewH.Red1.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red1_txt[1];},false); 
this.Red1.addEventListener('touchstart',function() {if (ViewH.Red1.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red1_txt[1];},false); 
this.Red2.addEventListener('mousedown',function() {if (ViewH.Red2.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red2_txt[1];},false); 
this.Red2.addEventListener('touchstart',function() {if (ViewH.Red2.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red2_txt[1];},false); 
this.Red3.addEventListener('mousedown',function() {if (ViewH.Red3.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red3_txt[1];},false); 
this.Red3.addEventListener('touchstart',function() {if (ViewH.Red3.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red3_txt[1];},false); 
this.Red4.addEventListener('mousedown',function() {if (ViewH.Red4.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red4_txt[1];},false); 
this.Red4.addEventListener('touchstart',function() {if (ViewH.Red4.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red4_txt[1];},false); 
this.Red5.addEventListener('mousedown',function() {if (ViewH.Red5.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red5_txt[1];},false); 
this.Red5.addEventListener('touchstart',function() {if (ViewH.Red5.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red5_txt[1];},false); 
this.Red6.addEventListener('mousedown',function() {if (ViewH.Red6.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red6_txt[1];},false); 
this.Red6.addEventListener('touchstart',function() {if (ViewH.Red6.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Red6_txt[1];},false); 

this.White1.addEventListener('mousedown',function() {if (ViewH.White1.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.White1_txt[1];},false); 
this.White1.addEventListener('touchstart',function() {if (ViewH.White1.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.White1_txt[1];},false); 
this.White2.addEventListener('mousedown',function() {if (ViewH.White2.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.White2_txt[1];},false); 
this.White2.addEventListener('touchstart',function() {if (ViewH.White2.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.White2_txt[1];},false); 
this.White3.addEventListener('mousedown',function() {if (ViewH.White3.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.White3_txt[1];},false); 
this.White3.addEventListener('touchstart',function() {if (ViewH.White3.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.White3_txt[1];},false); 

this.Green1.addEventListener('mousedown',function() {if (ViewH.Green1.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green1_txt[1];},false); 
this.Green1.addEventListener('touchstart',function() {if (ViewH.Green1.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green1_txt[1];},false); 
this.Green2.addEventListener('mousedown',function() {if (ViewH.Green2.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green2_txt[1];},false); 
this.Green2.addEventListener('touchstart',function() {if (ViewH.Green2.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green2_txt[1];},false); 
this.Green3.addEventListener('mousedown',function() {if (ViewH.Green3.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green3_txt[1];},false); 
this.Green3.addEventListener('touchstart',function() {if (ViewH.Green3.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green3_txt[1];},false); 
this.Green4.addEventListener('mousedown',function() {if (ViewH.Green4.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green4_txt[1];},false); 
this.Green4.addEventListener('touchstart',function() {if (ViewH.Green4.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green4_txt[1];},false); 
this.Green5.addEventListener('mousedown',function() {if (ViewH.Green5.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green5_txt[1];},false); 
this.Green5.addEventListener('touchstart',function() {if (ViewH.Green5.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green5_txt[1];},false); 
this.Green6.addEventListener('mousedown',function() {if (ViewH.Green6.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green6_txt[1];},false); 
this.Green6.addEventListener('touchstart',function() {if (ViewH.Green6.style.opacity>ViewH.Def_opa) ViewH.Info.textContent = ViewH.Green6_txt[1];},false); 


}, // ====================end of ViewReady




 ViewResize : function(){

var _to_body = document.querySelector('.to-body');
if (_to_body.style.display == 'block'){        // for adequate working resize while hello-window

   this.SVGHeight = this.SVGdiv.offsetHeight;
   this.SVGWidth = this.SVGdiv.offsetWidth;
   this.SVGopt = ((this.SVGHeight>=this.SVGWidth)?this.SVGWidth:this.SVGHeight)*0.95; //width&height of devise circle
   this.BIG = this.SVGopt/100;

   this.SVGsquare.style.width = 100*this.BIG + 'px';
   this.SVGsquare.style.height = 100*this.BIG + 'px';


   this.SVG.setAttribute("width",100*this.BIG);
   this.SVG.setAttribute("height",100*this.BIG);
   this.RED.setAttribute("r",50*this.BIG);
   this.RED.setAttribute("cx",50*this.BIG);
   this.RED.setAttribute("cy",50*this.BIG);

   this.GradCircle.setAttribute("r",47*this.BIG);
   this.GradCircle.setAttribute("cx",50*this.BIG);
   this.GradCircle.setAttribute("cy",50*this.BIG);

  for (var i=0; i<=14; i++) // changing colorfull points
  {
    var SPoint=document.getElementById("SPoint"+i);    
    var alfa = i*180/14+270;
    var SPointX=Math.round(50*this.BIG+45*this.BIG*Math.sin(alfa/180*Math.PI));
    var SPointY=Math.round(50*this.BIG-45*this.BIG*Math.cos(alfa/180*Math.PI));
    SPoint.setAttribute("x1",SPointX);
    SPoint.setAttribute("y1",SPointY);
    SPoint.setAttribute("x2",SPointX);
    SPoint.setAttribute("y2",SPointY+7*this.BIG);
    SPoint.setAttribute("transform","rotate("+alfa+" "+SPointX+" "+SPointY+")");
  }

// device arrow
this.Arrow.setAttribute("height", 45*this.BIG);
this.Arrow.setAttribute("width", 2*this.BIG);
this.Arrow.setAttribute("x",49*this.BIG);
this.Arrow.setAttribute("y",5*this.BIG);
this.Arrow.setAttribute("rx",this.BIG);
this.Arrow.setAttribute("ry",this.BIG);        
this.Arrow.setAttribute("transform","rotate("+this.Arrow_angle+" "+50*this.BIG+" "+50*this.BIG+")");


this.Axis.setAttribute("stroke-width",0.5*this.BIG);
this.Axis.setAttribute("r",5*this.BIG);
this.Axis.setAttribute("cx",50*this.BIG);
this.Axis.setAttribute("cy",50*this.BIG);

this.Astro.setAttribute("height", 10*this.BIG);
this.Astro.setAttribute("width", 10*this.BIG);
this.Astro.style.left = 45*this.BIG +'px';
this.Astro.style.top = 45*this.BIG +'px';


//  ====  Signs

this.Red1.setAttribute("height", 9*this.BIG);
this.Red1.setAttribute("width", 9*this.BIG);
this.Red1.style.left = 7*this.BIG +'px';
this.Red1.style.top = 57*this.BIG +'px';

this.Red2.setAttribute("height", 9*this.BIG);
this.Red2.setAttribute("width", 9*this.BIG);
this.Red2.style.left = 20*this.BIG +'px';
this.Red2.style.top = 57*this.BIG +'px';

this.Red3.setAttribute("height", 9*this.BIG);
this.Red3.setAttribute("width", 9*this.BIG);
this.Red3.style.left = 33*this.BIG +'px';
this.Red3.style.top = 57*this.BIG +'px';

this.Red4.setAttribute("height", 9*this.BIG);
this.Red4.setAttribute("width", 15*this.BIG);
this.Red4.style.left = 14*this.BIG +'px';
this.Red4.style.top = 70*this.BIG +'px';

this.Red5.setAttribute("height", 9*this.BIG);
this.Red5.setAttribute("width", 9*this.BIG);
this.Red5.style.left = 33*this.BIG +'px';
this.Red5.style.top = 70*this.BIG +'px';

this.Red6.setAttribute("height", 9*this.BIG);
this.Red6.setAttribute("width", 9*this.BIG);
this.Red6.style.left = 33*this.BIG +'px';
this.Red6.style.top = 83*this.BIG +'px';

this.White1.setAttribute("height", 9*this.BIG);
this.White1.setAttribute("width", 9*this.BIG);
this.White1.style.left = 46*this.BIG +'px';
this.White1.style.top = 57*this.BIG +'px';

this.White2.setAttribute("height", 9*this.BIG);
this.White2.setAttribute("width", 9*this.BIG);
this.White2.style.left = 46*this.BIG +'px';
this.White2.style.top = 70*this.BIG +'px';

this.White3.setAttribute("height", 9*this.BIG);
this.White3.setAttribute("width", 9*this.BIG);
this.White3.style.left = 46*this.BIG +'px';
this.White3.style.top = 83*this.BIG +'px';

this.Green1.setAttribute("height", 9*this.BIG);
this.Green1.setAttribute("width", 9*this.BIG);
this.Green1.style.left = 59*this.BIG +'px';
this.Green1.style.top = 57*this.BIG +'px';

this.Green2.setAttribute("height", 9*this.BIG);
this.Green2.setAttribute("width", 9*this.BIG);
this.Green2.style.left = 72*this.BIG +'px';
this.Green2.style.top = 57*this.BIG +'px';

this.Green3.setAttribute("height", 9*this.BIG);
this.Green3.setAttribute("width", 9*this.BIG);
this.Green3.style.left = 85*this.BIG +'px';
this.Green3.style.top = 57*this.BIG +'px';

this.Green4.setAttribute("height", 9*this.BIG);
this.Green4.setAttribute("width", 9*this.BIG);
this.Green4.style.left = 59*this.BIG +'px';
this.Green4.style.top = 70*this.BIG +'px';

this.Green5.setAttribute("height", 9*this.BIG);
this.Green5.setAttribute("width", 14*this.BIG);
this.Green5.style.left = 72*this.BIG +'px';
this.Green5.style.top = 70*this.BIG +'px';

this.Green6.setAttribute("height", 9*this.BIG);
this.Green6.setAttribute("width", 9*this.BIG);
this.Green6.style.left = 59*this.BIG +'px';
this.Green6.style.top = 83*this.BIG +'px';

} // end of IF
},  // =========== end of view resize




//this.White1.style.opacity = this.White1_opa;


//================================ Animate transitions   WORKS WITH TIMER makes sign opacity to zero while tranzitions
Transition : function(){

//Axis_speed = 1; // 1 or -1 wide or collapse -go to btn
if((ViewH.Axis_speed == 1) && (ViewH.Axis_R > 0) && (ViewH.Axis_R <= 42)){ // oll opacity-to zero here
  ViewH.Axis_R++; // current radius of axis, in normal condiyions = 0
  ViewH.Axis.setAttribute("r",5.5*ViewH.BIG+ViewH.Axis_R*ViewH.BIG);
  
  if(ViewH.Axis_R == 6)
    ViewH.White1.style.opacity = 0;
  if(ViewH.Axis_R == 10){
    ViewH.Red3.style.opacity = 0;
    ViewH.Green1.style.opacity = 0;
  }
  if(ViewH.Axis_R == 20){
    ViewH.Red2.style.opacity = 0;   
    ViewH.Red5.style.opacity = 0; 
    ViewH.White2.style.opacity = 0;  
    ViewH.Green2.style.opacity = 0;      
    ViewH.Green4.style.opacity = 0;
  }
  if(ViewH.Axis_R == 30){
    ViewH.Red1.style.opacity = 0;   
    ViewH.Red4.style.opacity = 0;
    ViewH.Red6.style.opacity = 0;     
    ViewH.White3.style.opacity = 0;  
    ViewH.Green3.style.opacity = 0;      
    ViewH.Green5.style.opacity = 0;
    ViewH.Green6.style.opacity = 0;    
  }

}//---------// oll opacity-to zero here


if((ViewH.Axis_speed == 1) && (ViewH.Axis_R == 43)){  // moment of maximum, all opacity calculatings should be here, and will visualise after, in next case
  ViewH.Arrow.setAttribute("transform","rotate("+ViewH.Arrow_angle+" "+50*ViewH.BIG+" "+50*ViewH.BIG+")");   // reimage of angle
  ViewH.Axis_speed = -1;
  if (ViewH.Left_Right == 1)
    ViewH.Astro.setAttribute('style', 'transition-duration: 0.77s;  transition-timing-function: linear; transform: translateZ(0) rotate(240deg) scale(1);');
  if (ViewH.Left_Right == -1)
    ViewH.Astro.setAttribute('style', 'transition-duration: 0.77s;  transition-timing-function: linear; transform: translateZ(0) rotate(-240deg) scale(1);');
  ViewH.Astro.style.left = 45*ViewH.BIG +'px';
  ViewH.Astro.style.top = 45*ViewH.BIG +'px';
  ViewH.Astro.style.opacity = 0.77;
}

if((ViewH.Axis_speed == -1) && (ViewH.Axis_R > 0)){  // visualating of new opacities
  ViewH.Axis_R--; // current radius of axis, in normal condiyions = 0

  if(ViewH.Axis_R == 30){
    ViewH.Red1.style.opacity = ViewH.Red1_opa;   
    ViewH.Red4.style.opacity = ViewH.Red4_opa;
    ViewH.Red6.style.opacity = ViewH.Red6_opa;     
    ViewH.White3.style.opacity = ViewH.White3_opa;  
    ViewH.Green3.style.opacity = ViewH.Green3_opa;       
    ViewH.Green5.style.opacity = ViewH.Green5_opa;
    ViewH.Green6.style.opacity = ViewH.Green6_opa;    
  }
  if(ViewH.Axis_R == 20){
    ViewH.Red2.style.opacity = ViewH.Red2_opa;   
    ViewH.Red5.style.opacity = ViewH.Red5_opa;
    ViewH.White2.style.opacity = ViewH.White2_opa;  
    ViewH.Green2.style.opacity = ViewH.Green2_opa;      
    ViewH.Green4.style.opacity = ViewH.Green4_opa;
  }
  if(ViewH.Axis_R == 10){
    ViewH.Red3.style.opacity = ViewH.Red3_opa;
    ViewH.Green1.style.opacity = ViewH.Green1_opa;
  }
  if(ViewH.Axis_R == 6)
    ViewH.White1.style.opacity = ViewH.White1_opa;

  ViewH.Axis.setAttribute("r",5.5*ViewH.BIG+ViewH.Axis_R*ViewH.BIG);
}

if((ViewH.Axis_speed == -1) && (ViewH.Axis_R == 0)){   // end of interaction
  ViewH.Axis_speed = 0;
  ViewH.Astro.setAttribute('style', 'transition-duration: 0.004s;  transition-timing-function: linear; transform: translateZ(0) rotate(0deg) scale(1);');
  ViewH.Astro.style.left = 45*ViewH.BIG +'px';
  ViewH.Astro.style.top = 45*ViewH.BIG +'px';
  ViewH.Astro.style.opacity = 0.77;
  ViewH.Left_Right = 0;
}

}, // =========== end of Transition =============






ViewUpdate : function(){  // btns starts it too
  this.Time_span.textContent = this.Time_text;  // update user info after next loading
  this.Axis_speed = 1;
  this.Axis_R = 1; 

this.Info.textContent = 'Нажмите на горящий индикатор, чтобы увидеть подробности.';

  if (this.Left_Right == 1){
    this.Astro.setAttribute('style', 'transition-duration: 0.73s;  transition-timing-function: linear; transform: translateZ(0) rotate(120deg) scale(10);');
    this.Astro.style.left = 45*this.BIG +'px';
    this.Astro.style.top = 45*this.BIG +'px';
    this.Astro.style.opacity = 0.77;
    //this.ClickSound_UP();
    if ( navigator.vibrate ){ // есть поддержка Vibration API
      window.navigator.vibrate([100,170,80,150,80,160,70,130,80,150,80,160,80,160,80]); // vibro synchro with my melody
    }
  }
    if (this.Left_Right == -1){
    this.Astro.setAttribute('style', 'transition-duration: 0.73s;  transition-timing-function: linear; transform: translateZ(0) rotate(-120deg) scale(10);');
    this.Astro.style.left = 45*this.BIG +'px';
    this.Astro.style.top = 45*this.BIG +'px';
    this.Astro.style.opacity = 0.77;
    //this.ClickSound_DOWN();
        if ( navigator.vibrate ){ // есть поддержка Vibration API
      window.navigator.vibrate([100,170,90,160,80,160,70,150,60,120,70,130,100,180,133]); // vibro synchro with my melody
    }
  }
},





// visualisation of loading AJAX of eph

Progress : function(EO){   
  if ( EO.lengthComputable )
    {
      var Perc=Math.round(EO.loaded/EO.total*100);
      document.querySelector('.ProgressPerc').style.width=Perc+"%";
    }
},

Complete : function(){
    document.querySelector('.ProgressPerc').style.display="none";
    document.querySelector('.Progress').style.display="none";
},







}; //====================== end of ViewH =============