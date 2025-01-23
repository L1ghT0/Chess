'use strict'
import { animate, linear, swipe } from "../animation/animation.js";

const paginationPc = document.querySelector('.participants .pagination.pc_flex');
const paginationMobile = document.querySelector('.participants .pagination.mobile');
const participantsList = document.querySelector('.participants .participants_list');
const pagination_arrows = [...document.querySelectorAll('.participants .pagination_arrow')];
const paginationCurrentStagePC = document.querySelector('.participants .pc_flex .pagination_numberOne');
const paginationCurrentStageMobile = document.querySelector('.participants .mobile .pagination_numberOne');

let currentStage;
let step;
let maxStages = 6;
let offsetX = 1;
if (window.innerWidth <= 770) { 
    currentStage = 1;
    step = 1;
    offsetX = 1;
} else {
    currentStage = 3;
    step = 3;
    offsetX = 1.015; 
}
let virtualStages = currentStage // TODO: get rid of this variable :(

paginationPc.onclick = swipeParticipants
paginationMobile.onclick = swipeParticipants

const pretendEvent = {target:{type:'button',classList: {contains: (str) => str === 'arrow__right'}}}
let timerId = setTimeout(() => swipeParticipants(pretendEvent), 5000);

function swipeParticipants(e){
    if(e.target.type !== 'button') return;
    clearTimeout(timerId);
    pagination_arrows.forEach(arrow => arrow.disabled = true)

    if(e.target.classList.contains('arrow__right')){
        currentStage += step
        virtualStages += step
        if(currentStage === maxStages + step) currentStage = step
        if(virtualStages > maxStages){
            virtualStages = step
            participantsList.style.transform = `translateX(${0}%)`
        }
        animate({timing: linear, draw:swipe(participantsList, -offsetX), duration:1000, onComplete:onComplete})
    }
    if(e.target.classList.contains('arrow__left')){
        currentStage -= step
        virtualStages -= step
        if(currentStage === 0) currentStage = maxStages
        if(virtualStages < 0){
            virtualStages = maxStages - step
            participantsList.style.transform = `translateX(${-(offsetX*100)*(maxStages/step)}%)`
        }
        animate({timing: linear, draw:swipe(participantsList, offsetX), duration:1000, onComplete: onComplete})
    }
    
    paginationCurrentStageMobile.innerHTML = currentStage
    paginationCurrentStagePC.innerHTML = currentStage

    function onComplete(){
        pagination_arrows.forEach(arrow => arrow.disabled = false)
        timerId = setTimeout(() => swipeParticipants(pretendEvent), 5000)
    }
}

window.addEventListener('resize', (e) => {
    if (window.innerWidth <= 770) { 
        currentStage = 1;
    } else {
        currentStage = 3;
    }
    virtualStages = currentStage

    paginationCurrentStageMobile.innerHTML = currentStage
    paginationCurrentStagePC.innerHTML = currentStage

    participantsList.style.transform = `translateX(${-(offsetX*100)}%)`
})