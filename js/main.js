import './data.js'
import { getListePartie } from './db.js';
import { chargerPartie, createHistorique, ctlzy, effacerPartie, modifConstruction, modifNivTech, modifValeurNum, nouveauTour, nouvellePartie, upgrade } from './event.js';


import { majListePartieUI, showMenuUI } from './ui/ui-menu.js';


//Affichage du menu quand on refresh
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
    if (entry.type === "reload") {
        getListePartie().then(tab => {
            majListePartieUI(tab);
            showMenuUI();
        })
    }
});


/*************************************************************************************************************/
/* Gestion des onglets
/*************************************************************************************************************/
Array.from(document.querySelectorAll('.tabs')).forEach((tab_container, TabID) => {
    const registers = tab_container.querySelector('.tab-registers');
    const bodies = tab_container.querySelector('.tab-bodies');

    Array.from(registers.children).forEach((el, i) => {
        el.setAttribute('aria-controls', `${TabID}_${i}`)
        bodies.children[i]?.setAttribute('id', `${TabID}_${i}`)

        el.addEventListener('click', (ev) => {
            let activeRegister = registers.querySelector('.active-tab');
            activeRegister.classList.remove('active-tab')
            activeRegister = el;
            activeRegister.classList.add('active-tab')
            changeBody(registers, bodies, activeRegister)
        })
    })
})


function changeBody(registers, bodies, activeRegister) {
    Array.from(registers.children).forEach((el, i) => {
        if (bodies.children[i]) {
            bodies.children[i].style.display = el == activeRegister ? 'block' : 'none'
        }

        el.setAttribute('aria-expanded', el == activeRegister ? 'true' : 'false')
    })
}

/************************************************************************************************************/
/* gestion de l'accordeon panel
/*************************************************************************************************************/
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}



window.nouvellePartie = nouvellePartie

window.effacerPartie = effacerPartie

window.nouveauTour = nouveauTour

window.upgrade = upgrade

window.ctlzy = ctlzy

window.chargerPartie = chargerPartie

window.modifConstruction = modifConstruction

window.modifValeurNum = modifValeurNum

window.modifNivTech = modifNivTech

window.afficherMenu = showMenuUI

window.createHistorique = createHistorique