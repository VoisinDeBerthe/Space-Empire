

import { ui } from "./ui-element.js";



/* ################################# 
        Gestion du Menu
   #################################  */

/**
 * Cache la div du menu
 */
export function hideMenuUI() {
    ui.menu.elt.style.display = "none";
}

/**
 * Affiche le menu et initialise l'input pour le nom de la nouvelle partie
 * Si tab de String en paramètre , met à jour le select des noms de parties dans le menu.
 */
export function showMenuUI(tabParties) {
    let div = ui.menu.elt;
    div.style.display = "block";
    ui.menu.nomNewPartie.value = "";
    if ( ! tabParties === undefined) {
        majListePartieUI(tabParties)
    }
}

/**
 * Met à jour la liste déroulante des parties dans le menu
 * @param {[String]} tabParties tableau de toutes les parties à afficher
 */
export function majListePartieUI(tabParties) {
    let old = ui.menu.listePartieElt;
    let select = old.cloneNode(false);
    old.parentElement.replaceChild(select, old);
    ui.menu.listePartieElt = select;

    tabParties.forEach(nom => {
        let option = document.createElement("option");
        option.textContent = nom;
        option.value = nom;
        select.appendChild(option);
    });
}

/* ################################# 
        Hold div
   #################################  */

export function hideHoldDivUI() {
    ui.hold.divElt.style.display = "none";
}

export function showHoldDivUI() {
    ui.hold.divElt.style.display = "block";
}

export function showLibelleTechUI(tabTech) {
    showHoldDivUI();
    d = initDivHoldTechUI();
    tabTech.forEach(t => {
        let p = document.createElement("p");
        p.innerHTML = t.tech + " - " + t.libelle
        d.append(p);
    })
}

export function showHistoUpgradeUI(tabTech) {
    showHoldDivUI();
    d = initDivHoldTechUI();
    tabTech.forEach(t => {
        let p = document.createElement("p");
        p.innerHTML = t.tech + " - " + t.libelle
        d.append(p);
    })
}

export function initDivHoldTechUI(){
    let old = ui.hold.divTechElement;
    let d = old.cloneNode(false);
    old.parentElement.replaceChild(d, old);
    ui.hold.divTechElt = d;
    return d;
}

export function addHistoUpgradeHoldDivUI(dataConstruction, stringUpdate){
    let div = document.createElement("div");
        div.setAttribute("class", "mouvement");
        let label = document.createElement("label");
        label.textContent = dataConstruction.construction + ' - ' + dataConstruction.libelle;
        label.setAttribute("class", "col1-mvt");
        div.appendChild(label);
        label = document.createElement("label");
        label.textContent = c;
        label.setAttribute("class", "col2-mvt");
        div.appendChild(label);
        let button = createButton("", "col3-mvt btn-small", "fa-solid fa-skull");
        div.appendChild(button);
        label = document.createElement("label");
        if (dataConstruction.upgradable == 1) {
          label.textContent = stringUpdate;
        }
        label.setAttribute("class", "col4-mvt");
        label.style = "padding-left:7px;"
        div.appendChild(label);
  
        button = createButton("", "col5-mvt btn-small", "fa-solid fa-trash");
        if (dataConstruction.upgradable == 0) {
          button.setAttribute("style", "display:none;")
        }
  
        div.appendChild(button);
        ui.hold.divTechElt.appendChild(div);
}


