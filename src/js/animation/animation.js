export function animate({timing, draw, duration, onComplete}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction);
  
      draw(progress); 
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else{
        onComplete()
      }
    });
}

export function linear(timeFraction) {
    return timeFraction;
}


export function swipe(elem, offsetX){ // offsetX 1 or -1 dependion on what direction (swipe to the left or right)
    let elemStyles = window.getComputedStyle(elem);
    let matrix = new WebKitCSSMatrix(elemStyles.transform);

    return (progress) => {
        let targetPosition = matrix.m41 + (elem.offsetWidth * progress) * offsetX;
        elem.style.transform = `translate(${targetPosition}px)`;
    }
}
