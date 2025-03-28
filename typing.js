//***************ELEMENTS****************//
const $quoteText 	= document.querySelector('#intro-text');
const $quoteAuthor 	= document.querySelector('#intro-author');

//***************VARIABLES***************//
let quote 			= '> vzalxndr --20 "human"';
let author 			= '';
let text 			= '';
let firstTaskFlag	= false;
let speed           = 130;

//************GETTING DATA****************//

typeText(quote, 'cursor-quote-type', $quoteText, 0);


//********TYPING EFFECT FUNCTION*********//
function typeText(textToType, cursorClass, $textElement, iteration) {
	text = textToType.slice(0, iteration);
	$textElement.innerHTML = text + '<span class="' + cursorClass + '">|</span>';
	(iteration++ <= textToType.length) ? setTimeout(function () 
			{typeText(textToType, cursorClass, $textElement, iteration)}, 
				(Math.floor(Math.random() * Math.floor(speed)))) :
	 	 			newTypeTasks($textElement, text)
};

//****REMOVE CURSOR & ADD NEW TASKS****//
function newTypeTasks($textElement, text) {
	$textElement.innerHTML = text;
	if (!firstTaskFlag) {
		// typeText(author, 'cursor-author-type', $quoteAuthor, 0);
		firstTaskFlag = true;
	}
};