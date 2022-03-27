$(function(){
	$("#map_cover_ins1").css("opacity","0");
	$("#map_cover_ins2").css("opacity","0");
});

$("#map_cover").click(function(){
	$("#map_cover_text").animate({opacity:"0"},0, function(){
		$("#map_cover_text").hide();
		$("#map_cover").animate({"background-color":"rgba(0,0,0,0)"},9000,'swing',function(){
			$("#map_cover").hide();
		});
		$("#map_cover_ins1").animate({opacity:"1"},3000, function(){
			$("#map_cover_ins1").animate({opacity:"0"},800,function(){
				$("#map_cover_ins1").hide();
			});
			$("#map_cover_ins2").animate({opacity:"1"},3000,function(){
				$("#map_cover_ins2").animate({opacity:"0"},1000,function(){
					$("#map_cover_ins2").hide();

				});
			});
		});
	});
});

//opening
$(function(){
	//初始化
	$("#op1").css("top", "-50%").css("left", "40%").css("opacity","0").css("width", "70%");
	$("#op2").css("top", "50%").css("left","50%").css("width","60%").css("opacity","0");
	$("#op3").css("top", "35%").css("left","20%").css("width","140%").css("opacity","0");
	$("#op4").css("top", "50%").css("left","60%").css("width","140%").css("opacity","0");
	$("#op5").css("opacity","0").css("width","200%");
	$("#opening").show();
	//主要動畫控制
	$("#op1").animate({opacity:"1",width:"80%"},2250,function(){
			$(this).animate({opacity:"0"},1250); 
		});
	$("#op2").animate({left: '80%', opacity: "1"},2000,function(){
			$(this).animate({opacity:"0"},1500); 
		});
	$("#op3").animate({left: '60%', opacity: "1"},2500,function(){
			$(this).animate({opacity:"0"},1000); 
		});
	$("#op4").animate({left: '15%', opacity: "1"},3000,function(){
			$(this).animate({opacity:"0"},500); 
			$("#op5").animate({opacity:"1"},1000,function(){
				$(this).animate({opacity:"0"},2000,function(){
					$(this).hide();
				});
				$("#opening").animate({opacity:"0"},2000,function(){
					$(this).hide();
				});
			});
		});
	
});

/*page2，箭頭跳動*/
$(function() {
		function loop() {
			$('.glyphicon-arrow-down').css({top:30});
			$('.glyphicon-arrow-down').animate ({
				top: '+=30',
			}, "slow", 'swing', function() {
				loop2();
			});
		};
		
		function loop2(){
			$('.glyphicon-arrow-down').animate({
				top:"-=30",
			}, "slow", 'swing', function(){
				loop();
			});
		};		
		loop();
});

/*page2，十大景點*/
$("#block2").scroll(function() {
	var y = $(this).scrollTop();
	console.log(y);
	if (y<300){
		$('.img_style').hide();
	}
	if (y<500){
		$('#top1_img').fadeIn(1000);
		$('#top2_img').fadeOut(1000);
	}else if (y<1000 & y>=500){
		$('#top1_img').fadeOut(1000);
		$('#top2_img').fadeIn(1000);
		$('#top3_img').fadeOut(1000);
	}else if (y<1500 & y>=1000){
		$('#top2_img').fadeOut(1000);
		$('#top3_img').fadeIn(1000);
		$('#top4_img').fadeOut(1000);
	}else if (y<2000 & y>=1500){
		$("#top3_img").fadeOut(1000);
		$('#top4_img').fadeIn(1000);
		$('#top5_img').fadeOut(1000);
	}else if (y<2500 &y>=2000){
		$('#top4_img').fadeOut(1000);
		$('#top5_img').fadeIn(1000);
		$('#top6_img').fadeOut(1000);
	}else if (y<3000 &y>=2500){
		$('#top5_img').fadeOut(1000);
		$('#top6_img').fadeIn(1000);
		$('#top7_img').fadeOut(1000);
	}else if (y<3500 &y>=3000){
		$('#top6_img').fadeOut(1000);
		$('#top7_img').fadeIn(1000);
		$('#top8_img').fadeOut(1000);
	}else if (y<4000 &y>=3500){
		$('#top7_img').fadeOut(1000);
		$('#top8_img').fadeIn(1000);
		$('#top9_img').fadeOut(1000);
	}else if (y<4500 &y>=4000){
		$('#top8_img').fadeOut(1000);
		$('#top9_img').fadeIn(1000);
		$('#top10_img').fadeOut(1000);
	}else if (y<5000 &y>=4500){
		$('#top9_img').fadeOut(1000);
		$('#top10_img').fadeIn(1000);
	};
});

/*page3，開頭動畫*/
$(function(){
	//初始化
	$("#map_cover_web3").css("opacity","0.7");
	$("#p3_op1").css("top", "90%").css("left","-20%").css("width","130%").css("opacity","0");
	$("#p3_op2").css("top", "75%").css("left","30%").css("width","140%").css("opacity","0");
	$("#p3_op3").css("top", "70%").css("left","20%").css("width","140%").css("opacity","0");
	$("#opening").show();
	/*主要動畫控制*/
	$("#p3_op1").animate({left: '0%', opacity: "1"},1000,function(){
			$(this).animate({opacity:"0"},1000); 
		});
	$("#p3_op2").animate({left: '-20%', opacity: "1"},2500,function(){
			$(this).animate({opacity:"0"},800); 
		});
	$("#p3_op3").animate({left: '35%', opacity: "1"},1400,function(){
			$(this).animate({opacity:"0"},950); 
		});
	$("#map_cover_web3").animate({opacity: "0"},3000,function(){
		$(this).hide();
	});
	
});