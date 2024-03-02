import { notPressingDown, pressingDown } from "../event.js";
import { ui } from "./ui-element.js";
import { createButton } from "./ui.js";


/* ################################# 
        Onglet PRODUCTION
   #################################  */


/**
 * Mise à jour de tout le collapse economie de l'onglet PRODUCTION 
 * @param {*} tour 
 */
export function majEconomieUI(tour) {
    ui.onglet.production.economie.reportElt.textContent = tour.reportCP;
    ui.onglet.production.economie.colonieElt.textContent = tour.colonieCP;
    ui.onglet.production.economie.mineraiElt.textContent = tour.mineurCP
    ui.onglet.production.economie.pipelineElt.textContent = tour.pipelineCP;
    ui.onglet.production.economie.maintenanceElt.textContent = tour.maintenance;
    ui.onglet.production.economie.initiativeElt.textContent = tour.bid;
    ui.onglet.production.economie.collapseElt.innerHTML = "Economie <br>CP :  " + tour.remainingCP + "(" + tour.totalCP + ")" + " - Maint : " + tour.maintenance + " Init : " + tour.bid;
}



/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   DEBUT ---  Gestion de l'affichage des TECHNOLOGIES dans le collapse de l'onglet Production
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */

/**
 * Réinitialise l'affichage des technologies dans le collapse de l'onglet Production
 * @param {[Object]} dataTechnos : tableau de ligne de tech (cf data.js)
 */
export function majTechnoUI(dataTechnos) {
    deleteAllTechno()

    dataTechnos.forEach((tech) => {
        addTechnoLineToCollapse(tech)
    })
}

export function majBandeauTechnologieUI(texte){
    ui.onglet.production.technos.collapseElt.innerHTML = texte;
}

/**
 * Supprime toutes les lignes de technos dans le collapse de l'onglet production
 */
function deleteAllTechno() {
    let collapse = ui.onglet.production.technos.bodyElt
    while (collapse.firstChild) {
        collapse.removeChild(collapse.lastChild);
    }
}

/**
 * Rajoute la ligne de tech à l'affichage dans le collapse des technos de l'onglet Production
 * @param {Object} dataTechnoLine  ligne de dataTech (cf data.js)
 */
function addTechnoLineToCollapse(dataTechnoLine) {
    let newLineTech = document.createElement('div');
    let idNewLineTech = dataTechnoLine.id + '_' + dataTechnoLine.tech;
    newLineTech.setAttribute('id', idNewLineTech);
    newLineTech.setAttribute('class', 'body-accordeon-row technology');
    let label = document.createElement('label');
    label.textContent = dataTechnoLine.tech;
    label.title = dataTechnoLine.libelle;
    label.setAttribute('class', 'libelle');
    label.addEventListener('touchstart', pressingDown, false);
    label.addEventListener('touchend', notPressingDown, false);

    newLineTech.appendChild(label);

    //création d'une div pour regrouper les boutons plus et moins dans la deuxième colonne de la ligne de techno
    let div = document.createElement('div');
    div.setAttribute('class', 'tab-techno');
    let button = createButton(dataTechnoLine.tech + '_plus', 'btn-small', 'fa-solid fa-plus');
    button.addEventListener('click', function () { modifNivTech(idNewLineTech, 'plus') });
    if (dataTechnoLine.researched == 1) {
        button.setAttribute('class', 'not-visible');
    }
    div.appendChild(button);

    button = createButton(dataTechnoLine.tech + '_moins', 'btn-small', 'fa-solid fa-minus');
    button.addEventListener('click', function () { modifNivTech(idNewLineTech, 'moins') });
    if (dataTechnoLine.researched == 0) {
        button.setAttribute('class', 'not-visible');
    }
    div.appendChild(button);

    //on ajoute la div avec les deux boutons à la ligne de tech en cours
    newLineTech.appendChild(div);

    button = document.createElement('button');
    button.textContent = 'Wreck';
    button.setAttribute('id', dataTechnoLine.tech + '_wreck');
    button.addEventListener('click', function () { modifNivTech(idNewLineTech, 'wreck') });
    button.setAttribute('class', 'wreck btn-small');
    newLineTech.appendChild(button);


    //on crré une div qui regroupera tous les <p> des level de techno dans la 4ème colonne
    div = document.createElement('div');
    div.setAttribute('class', 'tab-techno');
    dataTechnoLine.grid.forEach((nivTech, j) => {
        /* on créé un paragraphe pour afficher le niveau de la techno */
        let nivTechno = document.createElement('p');
        nivTechno.textContent = nivTech[0];
        nivTechno.setAttribute('id', dataTechnoLine.tech + '_' + j);
        if (j == dataTechnoLine.level) {
            /* Si le niveau de la techno correspond au niveau de recherche actuelle de l'utilisateur 
            alors on applique la class de mise en valeur du niveau*/
            nivTechno.setAttribute('class', 'label-tech');
        }

        /*On rajoute le prix du niveau de technologie en indice du niveau
        Pour ça il faut rajouter un span à l'intérireur du paragraphe  */
        let prixTechno = document.createElement('span');
        prixTechno.setAttribute('class', 'indice');
        prixTechno.textContent = nivTech[1];
        nivTechno.appendChild(prixTechno);

        /**Puis on finit par ajouter le niveau à la suite dans la div de la 4ème colonne */
        div.appendChild(nivTechno);

    })


    //on ajoute la la div avec tous les niveau de la techno dans la ligne en cours (4eme colonne) 
    newLineTech.appendChild(div);
    /**On ajoute la ligne complète au parent de la ligne initial(c'est la div body-accordeon) 
     * Les nouvelles lignes sont placées à la suite après la ligne de template
    */
    ui.onglet.production.technos.bodyElt.appendChild(newLineTech);
    if (dataTechnoLine.level + 1 == dataTechnoLine.grid.length && dataTechnoLine.researched == 0) {

        gestionNivMax(dataTechnoLine.tech);

    }
}


//Permet de désactiver les boutons d'une technologie lorsqu'elle est niveau max
function gestionNivMax(id) {
    console.log(id)
    let boutonPlus = document.getElementById(id + '_plus');
    let boutonMoins = document.getElementById(id + '_moins');
    let boutonWreck = document.getElementById(id + '_wreck');
    if (boutonPlus != null)
        boutonPlus.setAttribute('disabled', true);
    if (boutonMoins != null)
        boutonMoins.setAttribute('disabled', true);
    if (boutonWreck != null)
        boutonWreck.setAttribute('disabled', true);
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    FIN --- Gestion de l'affichage des TECHNOLOGIES dans le collapse de l'onglet Production
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DEBUT --- Gestion de l'affichage des CONSTRUCTIONS possibles dans le collapse 
              de l'onglet Production
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */

/**
 * Supprime toutes les lignes de construction possible dans le collapse de l'onglet production
 */
export function deleteAllConstructionUI() {
    let collapse = ui.onglet.production.contructions.collapseElt
    while (collapse.firstChild) {
        collapse.removeChild(collapse.lastChild);
    }
}

export function majBandeauConstructionUI(texte){
    ui.onglet.production.contructions.collapseElt.innerHTML = texte;
}

/**
 * Rajoute la ligne de construction à l'affichage dans le collapse des constructions possibles
 *  de l'onglet Production
 * @param {Object} dataConstructLineUI  ligne de dataTech (cf data.js)
 */
export function addConstructLineToCollapseUI(dataConstructLine, index) {
    let newLineConstruct = document.createElement("div");
    newLineConstruct.setAttribute("class", "body-accordeon-row, construction");

    let idNewLineConstruct = dataConstructLine.id + '_' + dataConstructLine.construction;
    newLineConstruct.setAttribute("id", idNewLineConstruct);

    let construct = document.createElement("p");
    construct.textContent = dataConstructLine.construction + ' - ' + dataConstructLine.libelle;
    let prixConstruct = document.createElement("span");
    prixConstruct.setAttribute("class", "indice");
    prixConstruct.textContent = ' ' + dataConstructLine.cost;
    construct.appendChild(prixConstruct);
    construct.setAttribute("class", "libelle");
    newLineConstruct.appendChild(construct);

    let button = createButton(dataConstructLine.construction + "_moins", "bt-moins btn-small", "fa-solid fa-minus");
    button.addEventListener('click', function () { modifConstruction(idNewLineConstruct, 'moins') });
    if (tour.constructionTour[index] == 0) {
        button.setAttribute("disabled", true);
    }
    newLineConstruct.appendChild(button);


    button = createButton(dataConstructLine.construction + "_plus", "bt-plus btn-small", "fa-solid fa-plus");
    button.addEventListener('click', function () { modifConstruction(idNewLineConstruct, 'plus') });
    if (tour.constructionTour[index] + tour.constructionTotal[index] == dataConstructLine.maxUnit && dataConstructLine.maxUnit != 0) {
        button.setAttribute("disabled", true);
    }
    newLineConstruct.appendChild(button);

    let label = document.createElement("label");
    label.textContent = tour.constructionTour[index];
    label.setAttribute("id", dataConstructLine.construction + "_enCours_" + index);
    label.setAttribute("class", "qte-courante");
    newLineConstruct.appendChild(label);

    label = document.createElement("label");
    label.textContent = '( ' + tour.constructionTotal[index] + ' )';
    label.setAttribute("id", dataConstructLine.construction + "_total_" + index);
    label.setAttribute("class", "qte-totale");
    newLineConstruct.appendChild(label);

    ui.onglet.production.contructions.collapseElt.appendChild(newLineConstruct);

}



/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  FIN --- Gestion de l'affichage des CONSTRUCTIONS possibles dans le collapse 
            de l'onglet Production
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */
