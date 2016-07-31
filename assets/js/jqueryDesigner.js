/*
	We need to convert to EaselJS
*/ 
//var canvas = document.getElementById("canvas");

var canvas = new fabric.Canvas('canvas');

var prodxmin,prodymin,prodxmax,prodymax,
    textDisplayed, designText, rotateCnt, imgLoaded, mouseDown, textx, texty, dragok, textMetircObj, fontSize, font,
    scalex, scaley, designx,designy,designw,designh, design, designLoaded, ddragok, outOfFrame, moffsetx, moffsety, imgoffset,
    prevx, prevy, prodImage, prodImageScale, prodLimtis; 

/*
	- Array of image paths for each product ... there is only three for now
	- Each array entry has an array of images. This array contains the four views of the product (front,side,back,side)
*/
var productImageArray, currentProdIndex, loadedProdImage;


var loading = false; //infinity scroll variable
var counter=19; //infinity scroll


function group(el,number){

	//console.log(counter,el)
	counter = counter-1;
	
	if([36,58,81,117,153,160,176,188,194,242].indexOf(counter) == -1){
		el=el.slice(0, -44);
		counter +=1;
	}else if(counter==36){
		el=el.slice(0, -44);
		el +="<tr class='danger'><td><h5 style='font-weight:bold'>Elite Editions</h5></td></tr>";
		counter +=1;			
	}else if(counter==58){
		el +="</div></td></tr><tr class='danger'><td><h5 style='font-weight:bold'>Europe</h5></td></tr>";	
		counter +=1;
	}else if(counter==81){
		el += "</div></td></tr><tr class='danger'><td><h5 style='font-weight:bold'>Asia Pacific</h5></td></tr>";
		counter +=1;
	}else if(counter==117){
		el=el.slice(0, -44);
		el +="<tr class='danger'><td><h5 style='font-weight:bold'>Africa</h5></td></tr>";
		counter +=1;
	}else if(counter==153){
		el=el.slice(0, -44);
		el +="<tr class='danger'><td><h5 style='font-weight:bold'>Oceania</h5></td></tr>";
		counter +=1;
	}else if(counter==160){
		el +="</div></td></tr><tr class='danger'><td><h5 style='font-weight:bold'>Latin America</h5></td></tr>";
		counter +=1;
	}else if(counter==176){
		el +="</div></td></tr><tr class='danger'><td><h5 style='font-weight:bold'>Caribbean</h5></td></tr>";
		counter +=1;
	}else if(counter==188){
		el=el.slice(0, -44);
		el +="<tr class='danger'><td><h5 style='font-weight:bold'>North America</h5></td></tr>";
		counter +=1;
	}else if(counter==194){
		el=el.slice(0, -44);
		el +="<tr class='danger'><td><h5 style='font-weight:bold'>United States</h5></td></tr>";
		counter +=1;
		
	}else if(counter==242){
		el=el.slice(0, -44);
		el +="<tr class='danger'><td><h5 style='font-weight:bold'>Provinces and Territories</h5></td></tr>";
		counter +=1;
	}
	
	
	console.log(el);
	$('#flags').append(el);	
	loading=false;	
	$('#loading').remove();
}


function load(){
	var ele='';
	
	for (i=19; i<37; i++){
	
		
	
		
		if(i%3==0){
			
			
			ele += "<button type='button' id="+counter+" class='flag btn btn-default'><img src='assets/vendor/images/flags/"+counter+".png'height='50'></button></div></td></tr><tr><td><div class='btn-group' role='group'>";			
			
			
		}else if(i == 19 ){
			
			
			ele += "<tr><td><div class='btn-group' role='group'><button type='button' id="+counter+" class='flag btn btn-default'><img src='assets/vendor/images/flags/"+counter+".png'height='50'></button>";		
			
				
		}else{
			
			ele += "<button type='button' id="+counter+" class='flag btn btn-default'><img src='assets/vendor/images/flags/"+counter+".png'height='50'></button>";
			
			
		}
		
		
		if([36,58,81,117,153,160,176,188,194,242,254].indexOf(counter) != -1){
			counter +=1;
			break;
		}
		
		counter +=1;
		
	}
	group(ele,counter);
	
}

function init() {

	prodImageScale = 0.4
	startx = 0.25 * canvas.width;
	starty = 0.25 * canvas.height;
	scalex = 0.4;
	scaley = 0.4;
	designx = 0.45 * canvas.width;
	designy = 0.45 * canvas.height;
	loadedProdImage = new Image();
	design = new Image();
	currentProdIndex = -1;
	loadedProdImage.id = "loadedProdImage";
	design.id = "loadedDesign";
	rotateCnt = 0;
	rotateCntMax = $('.product').length;
	imgLoaded = false;
	dragok = false;
	designLoaded = false;
	ddragok = false;
	fontSize = 24;
}


function handleFiles(files) {
	var file = files[0];
	// Send file to server
	// append parent directory for testing purposes
	console.log(file.name);
	design.src =  '../../Pictures/' +  file.name;
	designLoaded = true;
	
	canvasDesign = new fabric.Image(design, {
		left: designx,
		top: designy,
		width: designh,
		height: designw
	});

	canvas.add(canvasDesign);


}
$(document).ready(function (){
	init();
	
	
	
	//--------------infinity scroll-----------------
	
	$("#scroll").scroll(function(){
		if(counter <=254){
		var paddT = $('#scroll').innerWidth() - $('#scroll').width();
		var currentScroll=Math.round($('#scroll').scrollTop())+paddT;
		var maxScroll=$('#scroll')[0].scrollHeight - $('#scroll').height();
		
		
		
		
		
		if((maxScroll*0.65 <= currentScroll) && !loading){
			
			loading=true;

			
			//$('#scroll').append("<div class='danger'>loadtrueing</div>")
			$('#scroll').scrollTop==$('#scroll').scrollHeight-$('#scroll').height;
			load();
		}
		}
		
	});
	
			
	//-------- OPEN POPUP----------------------
	
	
	$('#submit').on('click', function() {
	console.log('s');
	$('[data-popup=popup-1]').fadeIn(350);
	$("input").css('z-index', 0);
	});
	//----- CLOSE POPUP--------------------
    $('[data-popup-close]').on('click', function(e)  {
    $('[data-popup=popup-1]').fadeOut(350);
 
       e.preventDefault();
    
    });
	
	
	$("#checkout").on('click',function(){
		
		$("#terms").attr("checked") ? SubmitDesign() : $("#error").fadeIn(350);
		
		
	});


	$('.product').click(function (){
		canvas.clear();
		rotateCnt = 0;
		currentProdIndex = parseInt($(this).attr('id'));
		loadedProdImage.src = $(this).find('img').attr('src');
		var imgw = loadedProdImage.width * scalex;
		var imgh = loadedProdImage.height * scaley;
		startx = 0.5 * canvas.width - imgw * 0.5;
		starty = 0.5 * canvas.height - imgh * 0.5;
		prodxmin = 0.15 * imgw + startx;
		prodymin = 0.15 * imgh + starty;
		prodxmax = imgw + startx - 0.15 * imgw;
		prodymax = imgh + starty - 0.15 * imgh;
		imgLoaded = true;
		designw = scalex  * 0.3 * loadedProdImage.width;
		designh = scaley  * 0.3 * loadedProdImage.height;	
		
		if ( imgLoaded && currentProdIndex >= 0) {

			prodImage = new fabric.Image(loadedProdImage,{
				left: startx,
				top: starty,
				hoverCursor: 'pointer'
			});
			prodImage.scale(prodImageScale);
			prodImage.set('selectable', false);

			prodLimtis = new fabric.Rect({
				left: prodxmin,
				top: prodymin,
				width: prodxmax - prodxmin,
				height: prodymax - prodymin,
				fill: 'rgba(0,0,0,0)',
				stroke: 'black',
				strokeWidth: 1,
				hoverCursor: 'pointer'
			});

			prodLimtis.set('selectable', false);
			canvas.add(prodImage);
			canvas.add(prodLimtis);
		}

		//loadedProdImage.src = productImageArray[currentProdIndex][rotateCnt];
		// we should use the load event listener when we are loading from server

	});

	canvas.on('object:moving', function(options){

		if (options.target.getLeft() < prodxmin){
			options.target.left = prodxmin;
		}
		if (options.target.getLeft() + ( options.target.getWidth() * options.target.getScaleX() ) > prodxmax){
			options.target.left = prodxmax - options.target.getWidth() * options.target.getScaleX();
		}
		if (options.target.getTop() < prodymin){
			options.target.top = prodymin;
		}
		if (options.target.getTop() + ( options.target.getHeight() * options.target.getScaleY() ) > prodymax){
			options.target.top = prodymax - options.target.height * options.target.getScaleY();
		}
	});
	
	$('#rotate-btn').click(function (){
		rotateCnt += 1;
		if (rotateCnt >= rotateCntMax) {
			rotateCnt = 0;
		}
		loadedProdImage.src = productImageArray[currentProdIndex][rotateCnt];
	});

	$('#addText-btn').click(function (){
		designText = $('#textEntry').val();
		textDisplayed = ( (designText == '')? false : true);
		textx = canvas.width * 0.5;
		texty = canvas.height * 0.5;
		textMetircObj = ctx.measureText(designText);
		console.log(textMetircObj);
		ctx.fillText(designText, textx, texty);
	});

	

});


// 	if (textDisplayed) {
// 			ctx.fillText(designText, textx, texty);
// 	}
// 	if(designLoaded){
// 		ctx.drawImage(design, designx, designy, designw, designh)
// 	}




