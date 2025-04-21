//***************ELEMENTS****************//
const $quoteText 	= document.querySelector('#intro-text');
const $quoteAuthor 	= document.querySelector('#intro-author');
const $menuBtn     = document.querySelector('.menu-btn');

//***************VARIABLES***************//
let speed = 130;

//**************TYPING EFFECT FUNCTION**************//
function typeText({textToType, cursorClass, $textElement, iteration = 0, callback}) {
  const text = textToType.slice(0, iteration);
  $textElement.innerHTML = text + `<span class="${cursorClass}">|</span>`;

  if (iteration < textToType.length) {
    setTimeout(function () {
      typeText({textToType, cursorClass, $textElement, iteration: iteration + 1, callback});
    }, Math.random() * speed);  // Random speed per letter
  } else {
    // Remove cursor and trigger the callback (to run further actions like showing author)
    $textElement.innerHTML = text;
    if (callback) callback();
  }
}

//************START THE TYPING EFFECT************//
function startTyping() {
  const quote = '> vzalxndr --20 "human"';
  const author = ''; 

  typeText({
    textToType: quote,
    cursorClass: 'cursor-quote-type',
    $textElement: $quoteText,
    callback: function() {
	$menuBtn.classList.add('visible'); 
      if (author) {
        typeText({
          textToType: author,
          cursorClass: 'cursor-author-type',
          $textElement: $quoteAuthor
        });
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', startTyping);
