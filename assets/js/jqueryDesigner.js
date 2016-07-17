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
	//-------- OPEN POPUP----------------------
    //$('[data-popup=popup-1]').fadeIn(350);
	//$("input").css('z-index', 0);
	//----- CLOSE POPUP--------------------
    //$('[data-popup-close]').on('click', function(e)  {
        //$('[data-popup=popup-1]').fadeOut(350);
 
        //e.preventDefault();
    
    //});

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




