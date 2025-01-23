'use strict'
import { animate, linear, swipe } from "../animation/animation.js";

const pagination     = document.querySelector('.vasyukovStages .pagination');
const stagesList     = document.querySelector('.vasyukovStages .vasyukovStages_list');
const mobileStages   = [...document.querySelectorAll('.vasyukovStages .vasyukovStages_card')].filter(card => !card.classList.contains('pc_flex'))
const paginationDots = document.querySelector('.vasyukovStages .pagination__dots');

// initialize dots
for(let i = 0; i < mobileStages.length; i++){
    const li = document.createElement('li');
    li.classList.add('pagination__dot')
    if(i === 0) li.classList.add('dot_selected')
    paginationDots.append(li)
}


const [arrow_left, arrow_right] = [...document.querySelectorAll('.vasyukovStages .pagination_arrow')];
const paginationDotArr = [...document.querySelectorAll('.vasyukovStages .pagination__dot')];
const maxStages = paginationDotArr.length;
let currentStage = 1;

pagination.onclick = (e) => {
    if(e.target.type !== 'button') return;

    paginationDotArr[currentStage - 1].classList.remove('dot_selected')

    arrow_left.disabled = true;
    arrow_right.disabled = true;

    if(e.target.classList.contains('arrow__right')){
        currentStage++;
        animate({timing: linear, draw:swipe(stagesList, -1), duration:550, onComplete:onComplete})
    }
    if(e.target.classList.contains('arrow__left')){
        currentStage--;
        animate({timing: linear, draw:swipe(stagesList, 1), duration:550, onComplete: onComplete})
    }

    paginationDotArr[currentStage-1].classList.add('dot_selected')

    function onComplete(){
        arrow_right.disabled = currentStage !== maxStages ?  false :  true
        arrow_left.disabled  = currentStage !== 1 ?  false :  true
    }
}
