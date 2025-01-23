'use strict'


const supportChessIdeaButton = document.querySelector('.header .button_darktheme')
const supportChessIdeaContent = document.querySelector('.content .chess')

supportChessIdeaButton.onclick = (e) => {
    supportChessIdeaContent.scrollIntoView({behavior: 'smooth'});
}



const aboutTournamentButton = document.querySelector('.header .button_lighttheme')
const tournamentContent = document.querySelector('.content .tournamentInfo')

aboutTournamentButton.onclick = (e) => {
    tournamentContent.scrollIntoView({behavior: 'smooth'});
}