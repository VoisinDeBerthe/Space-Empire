import { ui } from "./ui-element.js";



/* ################################# 
        Fonctions utilitaires 
   #################################  */



/**
 * 
 * @param {String} id : identifiant du bouton
 * @param {String} classes : class attribuées au bouton, séparées par une virgule
 * @param {String} icon : identifiant de l'icone font awesome
 * @returns renvoie le bouton créé, prêt à être attaché au DOM
 */
export function createButton(id, classes, icon) {
    let b = document.createElement("button");
    b.setAttribute("class", classes);
    b.setAttribute("id", id);

    let i = document.createElement("i");
    i.setAttribute("class", icon);

    b.appendChild(i);

    return b;
}


export function refreshInfoPartieUI(nomPartie, numTour) {
    ui.partie.nomElt.innerHTML = nomPartie;
    ui.partie.numTourElt.innerHTML = numTour;
}