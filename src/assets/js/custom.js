$(document).ready(function(){
	"use strict";
    
        /*==================================
* Author        : "ThemeSine"
* Template Name : Listrace directory HTML Template
* Version       : 1.0
==================================== */




/*=========== TABLE OF CONTENTS ===========
1. Scroll To Top 
2. slick carousel
3. welcome animation support
4. feather icon
5. counter
======================================*/

    // 1. Scroll To Top 
		$(window).on('scroll',function () {
			if ($(this).scrollTop() > 600) {
				$('.return-to-top').fadeIn();
			} else {
				$('.return-to-top').fadeOut();
			}
		});
		$('.return-to-top').on('click',function(){
				$('html, body').animate({
				scrollTop: 0
			}, 1500);
			return false;
		});
	
	
	// 2. slick carousel

	    $(".testimonial-carousel").slick({
	        infinite: true,
	        centerMode: true,
	        autoplay:true,
	        slidesToShow: 5,
	        slidesToScroll: 3,
	        autoplaySpeed:1500,
	        // the magic
			responsive: [
				{

					breakpoint:1440,
					settings: {
					slidesToShow:3
					}

				},
				{

					breakpoint: 1024,
					settings: {
					slidesToShow:2,
					
					}

				}, 
				{

					breakpoint:991,
					settings: {
					slidesToShow:2,
					centerMode:false,
					}

				},
				{

					breakpoint:767,
					settings: {
					slidesToShow:1,
					}

				}
			]
	    });



    // 3. welcome animation support

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").removeClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-serch-box").removeClass("animated fadeInDown").css({'opacity':'0'});
        });

        $(window).load(function(){
        	$(".welcome-hero-txt h2,.welcome-hero-txt p").addClass("animated fadeInUp").css({'opacity':'0'});
            $(".welcome-hero-serch-box").addClass("animated fadeInDown").css({'opacity':'0'});
        });

	// 4. feather icon

		feather.replace();

	// 5. counter
		$(window).on('load', function(){	
			$('.counter').counterUp({
				delay: 10,
				time: 3000
			});	
		});

	// 6. slide
  
			function slide(e) {
			  if (typeof e.data === 'undefined' || typeof e.data.left === 'undefined') {
				var direction = 0;
			  }
			  else {
				var direction = e.data.left;
			  }
			  
			  var wrap = $('.sliderWrap');
			  var wWidth = wrap.width();
			  var content = $('.sliderContent');
			  var cWidth = content.width();
			  var left = parseFloat(content.css('left'));
			  var items = content.find('li');
			  var iWidth = items.eq(1).position().left - items.eq(0).position().left;
			  var pos;
			  
			  var moveBy = Math.max(1, Math.floor(wWidth / iWidth)) * iWidth;
			  if (direction == 1) { // Moving Left
				if (Math.abs(left) == cWidth - wWidth) {
				  pos = 0; // Fly to start of list if we've reached the end
				}
				else {
				  pos = left - moveBy;
				  pos = Math.min((cWidth - wWidth), Math.abs(pos)) * Math.sign(pos);
				}
			  }
			  else {
				if (left == 0) {
				  pos = -(cWidth - wWidth); // Fly to end of list
				}
				else {
				  pos = left + moveBy;
				  pos = Math.min(0, pos);
				}
			  }
			  content.css('left', pos);
			}
			
			$('button.right').on('click', {left: 1}, slide);
			$('button.left').on('click', {left: 0}, slide);
});