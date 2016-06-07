$(document).ready(function(){
	//-------- OPEN POPUP----------------------
    $('[data-popup=popup-1]').fadeIn(350);
	//----- CLOSE POPUP--------------------
    $('[data-popup-close]').on('click', function(e)  {
        $('[data-popup=popup-1]').fadeOut(350);
 
        e.preventDefault();
    });


});

