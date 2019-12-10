//INITIALIZING

new WOW().init();

yepnope({  
    nope : "http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU",  
    callback : function(url, result, key){  
      $(function(){
        ymaps.ready(profile_map);
      });
    } 
});




//=====================STARS IN SOULMATEFINDER FORM=========================

// lets build all stars in their places with needed classes:
//allstars
  var _stars = 17;
  var starsContainer = document.querySelector(".star-container");
    for (var i = 1; i <= 17; i++) {
      var newStar = document.createElement("span");
      newStar.className = "glyphicon glyphicon-star fa-2x star"+i;
      starsContainer.appendChild(newStar);
    }
//fearures preparation (pre-building)
  var emo_stars = 0;
  var emoContainer = document.querySelector(".emo-container");
    for (var i = 1; i <= 7; i++) {
      var emoStar = document.createElement("span");
      emoStar.className = "glyphicon glyphicon-star fa-2x emo-star"+i;
      emoStar.style.opacity = 0.17;
      emoContainer.appendChild(emoStar);
    }
  var peace_stars = 0;
  var peaceContainer = document.querySelector(".peace-container");
    for (var i = 1; i <= 7; i++) {
      var peaceStar = document.createElement("span");
      peaceStar.className = "glyphicon glyphicon-star fa-2x peace-star"+i;
      peaceStar.style.opacity = 0.17;
      peaceContainer.appendChild(peaceStar);
    }
  var alltime_stars = 0;  
  var alltimeContainer = document.querySelector(".alltime-container");
    for (var i = 1; i <= 7; i++) {
      var alltimeStar = document.createElement("span");
      alltimeStar.className = "glyphicon glyphicon-star fa-2x alltime-star"+i;
      alltimeStar.style.opacity = 0.17;
      alltimeContainer.appendChild(alltimeStar);
    }
  var business_stars = 0;  
  var businessContainer = document.querySelector(".business-container");
    for (var i = 1; i <= 7; i++) {
      var businessStar = document.createElement("span");
      businessStar.className = "glyphicon glyphicon-star fa-2x business-star"+i;
      businessStar.style.opacity = 0.17;
      businessContainer.appendChild(businessStar);
    }
  var clear_stars = 0;
  var clearContainer = document.querySelector(".clear-container");
    for (var i = 1; i <= 7; i++) {
      var clearStar = document.createElement("span");
      clearStar.className = "glyphicon glyphicon-star fa-2x clear-star"+i;
      clearStar.style.opacity = 0.17;
      clearContainer.appendChild(clearStar);
    }
  var respect_stars = 0;
  var respectContainer = document.querySelector(".respect-container");
    for (var i = 1; i <= 7; i++) {
      var respectStar = document.createElement("span");
      respectStar.className = "glyphicon glyphicon-star fa-2x respect-star"+i;
      respectStar.style.opacity = 0.17;
      respectContainer.appendChild(respectStar);
    }
  var trust_stars = 0;
  var trustContainer = document.querySelector(".trust-container");
    for (var i = 1; i <= 7; i++) {
      var trustStar = document.createElement("span");
      trustStar.className = "glyphicon glyphicon-star fa-2x trust-star"+i;
      trustStar.style.opacity = 0.17;
      trustContainer.appendChild(trustStar);
    }

var starFeatures = document.querySelector(".star-features");
starFeatures.addEventListener("click",StarClicked,false);  

//defining hidden inputs
const emoInput = document.getElementById('emo-container');
const peaceInput = document.getElementById('peace-container');
const alltimeInput = document.getElementById('alltime-container');
const businessInput = document.getElementById('business-container');
const clearInput = document.getElementById('clear-container');
const respectInput = document.getElementById('respect-container');
const trustInput = document.getElementById('trust-container');


//CLICK HANDLER
function StarClicked(EO){
   EO=EO||window.event;
   var cla = EO.srcElement.className;
   var con; // current container
   var conStars; // last value of feature in curent container

    if (cla[31] == "e")
      {con = emoContainer;
       conStars = emo_stars;}
    if (cla[31] == "p")
      {con = peaceContainer;
       conStars = peace_stars;}
    if (cla[31] == "a")
      {con = alltimeContainer;
       conStars = alltime_stars;}
    if (cla[31] == "b")
      {con = businessContainer;
       conStars = business_stars;}
    if (cla[31] == "c")
      {con = clearContainer;
       conStars = clear_stars; }
    if (cla[31] == "r")
      {con = respectContainer;
       conStars = respect_stars; }
    if (cla[31] == "t")
      {con = trustContainer;
       conStars = trust_stars;}

//try to make exit in case of click in another area, out of stars
    var num = parseInt(cla[cla.length-1]); //actual (curent click) number of stars to this category

//here could be some code about if you want more than you have

    if ( num == conStars ){ // doing it for possibility to decrease by clicking on lastshining star
      num--;
     // _stars++;
    }

if ( num <= _stars + conStars ){ //decreasing of features doesn't work in this case

//hide all stars in curent container
    for (var n = 0; n < con.children.length; n++) {
     con.children[n].style.opacity = 0.17;
   }
//show actual quantity of stars
   for (var i = 0; i < num; i++) {
     con.children[i].style.opacity = 1;
   }
//balancing of allstars number
   _stars = _stars - num + conStars;
   allStars();
//actualizing value of feature in current container
    if (cla[31] == "e"){
    	emo_stars = num;
    	emoInput.setAttribute("value", emo_stars);
    }
    if (cla[31] == "p"){
    	peace_stars = num;
    	peaceInput.setAttribute("value", peace_stars);
    }
    if (cla[31] == "a"){
    	alltime_stars = num;
    	alltimeInput.setAttribute("value", alltime_stars);
    }
    if (cla[31] == "b"){
    	business_stars = num;
    	businessInput.setAttribute("value", business_stars);
    }
    if (cla[31] == "c"){
    	clear_stars = num;
    	clearInput.setAttribute("value", clear_stars);
    }
    if (cla[31] == "r"){
    	respect_stars = num;
    	respectInput.setAttribute("value", respect_stars);
    }
    if (cla[31] == "t"){
    	trust_stars = num;
    	trustInput.setAttribute("value", trust_stars);
    }
   }//end of if 
}


// STARS RE_RENDING AFTER EVERY CLICK
function allStars(){ // balancing of allstars
  for (var i = 0; i < starsContainer.children.length; i++) {
    starsContainer.children[i].style.opacity = 0.17;
  }
  for (var j = 0; j < _stars; j++) {
    starsContainer.children[j].style.opacity = 1;
  }
}

//=====================END OF STARS IN SOULMATEFINDER FORM=========================



$(function() {
      $('#form').submit(function(e) {
        var $form = $(this);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize()
        }).done(function() {
         alert('Заявка успешно отправлена. Мы свяжемся с Вами в течение суток.');
        }).fail(function() {
          alert('Что-то пошло не так, попробуйте отправить заявку еще раз.');
        });
        //отмена действия по умолчанию для кнопки submit
        e.preventDefault(); 
      });
    });   


      










   