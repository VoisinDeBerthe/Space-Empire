
import "../data.js";

/**
 * Détruit une construction
 * @param {integer} idConstruction index de la construction à détruire
 */
export function detruireMetier(idConstruction){
    if (tour.constructionTotal[idConstruction] > 0) {
        tour.constructionTotal[idConstruction]--;
    }
}

/**
 * Supprime les upgrades du tour en cours pour une construction 
 * Recrédite les CP dans le reportCP
 * @param {integer} idConstruction index de la construction
 */
export function eraseUpdateMetier(idConstruction){
    for (let index = 0; index < tour.upgrade.length; index++) {
        if (tour.upgrade[index].id == idConstruction) {
            tour.reportCP += partie.dataConstruction[idConstruction].hull * tour.upgrade[index].qte * tour.upgrade[index].prix;
            tour.upgrade.splice(index, 1);
            index--;
        }
    }
}