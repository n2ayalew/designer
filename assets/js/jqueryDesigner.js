/*
	We need to convert to EaselJS
*/ 
//var canvas = document.getElementById("canvas");

var cnvs = new fabric.Canvas('canvas');
var ctx = cnvs.getContext("2d");

var prodxmin,prodymin,prodxmax,prodymax,
    textDisplayed, designText, rotateCnt, imgLoaded, mouseDown, textx, texty, dragok, textMetircObj, fontSize, font,
    scalex, scaley, designx,designy,designw,designh, design, designLoaded, ddragok, outOfFrame, moffsetx, moffsety, imgoffset,
    prevx, prevy; 

/*
	- Array of image paths for each product ... there is only three for now
	- Each array entry has an array of images. This array contains the four views of the product (front,side,back,side)
*/
var productImageArray, currentProdIndex, loadedProdImage;

function init() {

	var rect = new fabric.Rect({
  		left: 100,
  		top: 100,
  		fill: 'red',
  		width: 20,
  		height: 20
	});
	cnvs.add(rect);
	startx = 0.25 * canvas.width;
	starty = 0.25 * canvas.height;
	scalex = 0.4;
	scaley = 0.4;
	designx = 0.45 * canvas.width;
	designy = 0.45 * canvas.height;
	//productImageArray = [['../Pictures/curiosity.jpg'],['../Pictures/12.jpg']];
	loadedProdImage = new Image();
	design = new Image();
	currentProdIndex = -1;
	loadedProdImage.id = "loadedProdImage";
	design.id = "loadedDesign";
	rotateCnt = 0;
	rotateCntMax = $('.product').length;
	imgLoaded = false;
	ctx.textBaseline = "hanging";
	ctx.font = "24px Tahoma, Geneva, sans-serif";
	dragok = false;
	designLoaded = false;
	ddragok = false;
	fontSize = 24;
	window.requestAnimationFrame(draw);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
    };
}

function moveText(e){
	if (dragok) {
		var cord = getMousePos(canvas, e);
		textx = cord.x;
		texty = cord.y;
	}
}

function moveDesign(e) {
	if (ddragok && !outOfFrame) {
		var cord = getMousePos(canvas, e);
		designx = cord.x;// - prevx;
		designy = cord.y;// - prevy;
	}
}

function handleFiles(files) {
	var file = files[0];
	// Send file to server
	// append parent directory for testing purposes
	console.log(file.name);
	design.src =  '../../Pictures/' +  file.name;
	designLoaded = true;
	
	
}
$(document).ready(function (){
	init();
	//-------- OPEN POPUP----------------------
    //$('[data-popup=popup-1]').fadeIn(350);
	//----- CLOSE POPUP--------------------
    //$('[data-popup-close]').on('click', function(e)  {
        //$('[data-popup=popup-1]').fadeOut(350);
 
        //e.preventDefault();
        $('#canvas').css('background', 'rgba(0,0,0,0)');
    //});

	$('.product').click(function (){
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
		//loadedProdImage.src = productImageArray[currentProdIndex][rotateCnt];
		// we should use the load event listener when we are loading from server

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


	$('#canvas').mousemove(function (e){
		var cord = getMousePos(canvas, e);

		//console.log('x pos: ' + cord.x + 'y pos: ' + cord.y);


		var dx = cord.x - prevx;
		var dy = cord.y - prevy;
		
		if (designx < cord.x && cord.x < designx + designw && designy < cord.y && cord.y < designy + designh) {
			$('#canvas').css('cursor', 'pointer');
		} else {
			$('#canvas').css('cursor','auto');
			ddragok = false;
		}

		outOfFrame = false;
		
		//console.log('adfadsf');
		if (e.which == 1 &&
				textx < cord.x && cord.x < textx + textMetircObj.width
				&& texty < cord.y && cord.y < texty + fontSize && !outOfFrame) {
			textx = (cord.x - prevx) + textx 
			texty = (cord.y - prevy) + texty;
			dragok = true;
			canvas.onmousemove = moveText;
			//console.log('x pos:' + textx + 'y pos:' + texty);
		}

		if (e.which == 1 &&
				designx < cord.x && cord.x < designx + designw
				&& designy < cord.y && cord.y < designy + designh) {
			
			if ( (designx + dx) < prodxmin || cord.x < prodxmin) {
				designx = prodxmin;
				ddragok = false;
				canvas.onmousemove = null;
				outOfFrame = true;
			} 

			if ( (designx + designw) + dx > prodxmax || cord.x > prodxmax) {
				designx = prodxmax - designw;
				ddragok = false;
				canvas.onmousemove = null;
				outOfFrame = true;
			}

			if ( (designy + dy) < prodymin || cord.y < prodymin) {
				designy = prodymin;
				ddragok = false;
				canvas.onmousemove = null;
				outOfFrame = true;
			}

			if ( (designy + designh) + dy > prodymax || cord.y > prodymax) {
				designy = prodymax - designh;
				ddragok = false;
				canvas.onmousemove = null;
				outOfFrame = true;
			}


			if (!outOfFrame) {
				designx = (cord.x - prevx) + designx;
				designy = (cord.y - prevy) + designy;
				ddragok = true;
				canvas.onmousemove = moveDesign;
			}
		}

		prevx = cord.x;
		prevy = cord.y;
		
	});
	$('#canvas').mouseup(function(e){
		//outOfFrame = false;
		dragok = false;
		ddragok = false;
		canvas.onmousemove = null;
	});
});

// function draw() {
	
// 	//ctx.clearRect(0, 0, canvas.width, canvas.height);

// 	if ( imgLoaded && currentProdIndex >= 0) {
// 		var imgw = loadedProdImage.width * scalex;
// 		var imgh = loadedProdImage.height * scaley;
// 		ctx.drawImage(loadedProdImage, startx , starty, imgw, imgh);
// 		ctx.beginPath();
// 		ctx.rect(prodxmin, prodymin,prodxmax - prodxmin,prodymax - prodymin);
// 		ctx.stroke();
// 	}
// 	if (textDisplayed) {
// 			ctx.fillText(designText, textx, texty);
// 	}
// 	if(designLoaded){
// 		ctx.drawImage(design, designx, designy, designw, designh)
// 	}
	
// 	window.requestAnimationFrame(draw);
// }



