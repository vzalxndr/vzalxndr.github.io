// let isScrolling = false;

// function smoothScroll(direction) {
//   if (isScrolling) return;
//   isScrolling = true;

//   let viewportHeight = window.innerHeight;
//   let start = window.scrollY;
//   let end = start + direction * viewportHeight;

//   end = Math.max(0, Math.min(end, document.documentElement.scrollHeight - viewportHeight));

//   function scroll() {
//     let currentPos = window.scrollY;
//     let diff = end - currentPos;

//     if (Math.abs(diff) < 5) { 
//       window.scrollTo(0, end);
//       isScrolling = false;
//       return;
//     }

//     let step = Math.abs(diff) * 0.5; 
//     step = Math.max(8, Math.min(step, 70)); 

//     window.scrollTo(0, currentPos + Math.sign(diff) * step);
//     requestAnimationFrame(scroll);
//   }

//   scroll();
// }

// window.addEventListener("wheel", (event) => {
//   smoothScroll(event.deltaY > 0 ? 1 : -1);
//   event.preventDefault();
// }, { passive: false });

// window.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowDown") {
//     smoothScroll(1);
//   } else if (event.key === "ArrowUp") {
//     smoothScroll(-1);
//   }
// });
