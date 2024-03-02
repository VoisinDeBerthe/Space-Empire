import { calculMaintenanceMetier, calculUpgradeMetier, enregistrerPartieMetier, getHullCapacityMetier, getHullConstructTurnMetier } from "./metier/metier.js";
import "./data.js";
import { addHistoUpgradeHoldDivUI, hideHoldDivUI, hideMenuUI, initDivHoldTechUI, majListePartieUI, showLibelleTechUI } from "./ui/ui-menu.js";
import { majTabMouvementUI } from "./ui/ui-mouvement.js";
import { detruireMetier, eraseUpdateMetier } from "./metier/metier-mouvement.js";
import { chargerPartieMetier, nouveauTourMetier, nouvellePartieMetier } from "./metier/metier-menu.js";
import { majBandeauConstructionUI, majBandeauTechnologieUI, majEconomieUI, majTechnoUI } from "./ui/ui-production.js";
import { deletePartie, getListePartie, getPartie } from "./db.js";
import { calculConstructionMetier, calculEconomieMetier, calculTechnologieMetier, majConstrucDispoMetier } from "./metier/metier-production.js";
import { refreshInfoPartieUI } from "./ui/ui.js";
import { ui } from "./ui/ui-element.js";


/* ################################# 
        Events du HOLD DIV
   #################################  */

export function pressingDown(e) {
  e.preventDefault();
  showLibelleTechUI(tour.dataTechno);
}

export function notPressingDown(e) {
  hideHoldDivUI();
}


function pressingDownHisto(e) {
  e.preventDefault();
  //on vide la div HOLD
  initDivHoldTechUI();
  //calcul de l'index du tour dans le tableau d'historique
  // correspondance avec le numéro sur lequel l'utilisateur déclenche le hodEvent
  let index = partie.histoTour.length - parseInt(e.target.textContent);

  partie.histoTour[index].constructionTotal.forEach((c, i) => {
    if (c > 0 && partie.dataConstruction[i].upgradable == 1) {
      addHistoUpgradeHoldDivUI(partie.dataConstruction[i], calculUpgradeMetier(i, index));
    }
  })
}

function notPressingDownHisto(e) {
  let div = document.getElementById("hold-div");
  div.style.display = "none";
}



/* ################################# 
        Events de MOUVEMENT
   #################################  */
/**
* Permet de détruire une construction, met à jour l'onglet Mouvement et le collapse Construction dans l'onglet Production.
* Impacte également la maintenance du tour.
* @param {number} id index du tableau construction total dans lequel on détruit une construction
*/
export function destruction(id) {
  if (!confirm("Détruire un " + partie.dataConstruction[id].libelle + " ?")) {
    return;
  }
  detruireMetier(id);
  calculEtMajAll();
  enregistrerPartieMetier();
}


export function eraseUpgrade(idConstruction) {
  eraseUpdateMetier(idConstruction)
  calculEtMajAll();
  enregistrerPartieMetier();
}

/**
 * créé un upgrade pour les valeurs sélectionnées dans l'onglet mouvement
 */
export function upgrade() {

  let idConstruct = parseInt(document.getElementById('select-upgrade').value);
  let qte = parseInt(document.getElementById('qte-upgrade').value);
  let prix = 1;
  if (document.getElementById('upgrade-2CP').checked) {
    prix = 2;
  }
  let total = qte * prix * partie.dataConstruction[idConstruct].hull;
  if (total <= tour.reportCP) {
    let up = { id: idConstruct, qte: qte, prix: prix }
    tour.upgrade.push(up);
    tour.reportCP -= total;

    calculEtMajAll();
    enregistrerPartieMetier();
  } else {
    alert("Pas assez de report de CP du tour précédant pour payer ce(s) upgrade(s)");
  }
}


/* ################################# 
        Events de PRODUCTION
   #################################  */

//appelé par tous les boutons dans le bloc économie
export function modifValeurNum(id, valeur) {
  //TODO déporter dans métier
  switch (id) {
    case 'colonie': tour.colonieCP = tour.colonieCP + valeur;
      break;
    case 'minerai': tour.mineurCP = tour.mineurCP + valeur;
      break;
    case 'maintenance': tour.maintenance = tour.maintenance + valeur;
      break;
    case 'pipeline': tour.pipelineCP = tour.pipelineCP + valeur;
      break;
    case 'init': tour.bid = tour.bid + valeur;
      break;
  }
  //TODO déporter dans UI
  let nbre = document.getElementById(id);
  nbre.value = parseInt(nbre.textContent) + valeur;

  calculEtMajAll();
  enregistrerPartieMetier();
}

/**
 * Appelé par tous les boutons de changement de technologie.
 * Franchement j'ai pas su comment séparer l'ui du metier de cette usine à gaz
 * Il est tard, je suis fatigué, je commit... tant pis si je me sens sale...
 * @param {*} idNewLineTech 
 * @param {*} type 
 */
export function modifNivTech(idNewLineTech, type) {
  let tab = idNewLineTech.split('_');
  let boutonPlus = document.getElementById(tab[1] + '_plus');
  let boutonMoins = document.getElementById(tab[1] + '_moins');
  let level = tour.dataTechno[tab[0]].level;

  switch (type) {
    case 'plus':
      chgNivTech(tab[0], false, boutonPlus, boutonMoins, 1);

      break;
    case 'moins':
      chgNivTech(tab[0], false, boutonMoins, boutonPlus, -1);

      break;
    default: /* wreck*/
      if (confirm("Gagner un niveau en " + tour.dataTechno[tab[0]].libelle + " grâce au remorquage d'une épave ?")) {
        if (tour.dataTechno[tab[0]].researched == 1) {
          chgNivTech(tab[0], false, boutonMoins, boutonPlus, -1);
        }
        chgNivTech(tab[0], true, null, null, 1);

        if (tour.dataTechno[tab[0]].grid.length == tour.dataTechno[tab[0]].level + 1) {
          gestionNivMax(tab[1]);
        }
      }
  }

  calculEtMajAll();
  enregistrerPartieMetier();
}
/**
 * Petite soeur de celle du dessus, même symptomes... incurable
 * @param {*} index 
 * @param {*} isWreck 
 * @param {*} boutonAcacher 
 * @param {*} boutonAafficher 
 * @param {*} valeur 
 */
function chgNivTech(index, isWreck, boutonAcacher, boutonAafficher, valeur) {
  let level = tour.dataTechno[index].level;
  // +1 ou -1
  tour.dataTechno[index].level = level + valeur;

  if (!isWreck) {
    //inversion des boutons +/- 
    boutonAcacher.setAttribute("class", "not-visible");
    boutonAafficher.removeAttribute("class", "not-visible");
    boutonAafficher.setAttribute("class", "btn-small");

    //maj des data
    if (valeur == 1) {
      tour.dataTechno[index].researched = 1;
    } else {
      tour.dataTechno[index].researched = 0;
    }
  }

  //surlignage du bon niveau pour la tech
  document.getElementById(tour.dataTechno[index].tech + '_' + (level + valeur)).setAttribute("class", "label-tech");
  document.getElementById(tour.dataTechno[index].tech + '_' + level).removeAttribute("class", "label-tech");
}

/**
* est appelé par tous les boutons du bloc construction
* */
export function modifConstruction(idNewLineConst, type) {

  let tab = idNewLineConst.split('_');
  if (type == 'plus') {
    if (getHullConstructTurnMetier() + partie.dataConstruction[tab[0]].hull > getHullCapacityMetier()) {
      alert("Capacité de construction dépassée (max : " + getHullCapacityMetier() + ')');
      return
    }
    tour.constructionTour[tab[0]]++;
  } else {
    tour.constructionTour[tab[0]]--;
  }
  calculEtMajAll();
}




/* ################################# 
        Events du MENU
   #################################  */

/**
* Charge la partie sélectionnée dans la liste déroulante du menu
*/
export function chargerPartie() {
  /* Ne fonctionne pas je sais pas pourquoi ....  
  const nomPartie = ui.menu.listePartieElt.value */
  const nomPartie = document.getElementById('liste-partie').value;
  getPartie(nomPartie).then(data => {
    chargerPartieMetier(data)
    hideMenuUI();
    calculEtMajAll();

    //pour revenir sur l'onglet mouvement pour le début du nouveau tour
    ui.onglet.mouvement.tabElt.click();
  })

}

/**
 * Création d'une nouvelle partie
 */
export function nouvellePartie() {
  //pour revenir sur l'onglet mouvement pour le début du nouveau tour
  ui.onglet.mouvement.tabElt.click();

  const nom = ui.menu.nomNewPartie.value;
  if (nom != "") {
    nouvellePartieMetier().then(() => {
      hideMenuUI();
      calculEtMajAll();

    })
  } else {
    alert("C'est mieux avec un nom de partie...");
  }
}


/**
 * Supprimer une partie
 */
export function effacerPartie() {
  const nomPartie = document.getElementById('liste-partie').value;
  if (nomPartie != "" && nomPartie != null) {
    if (confirm("Tu veux vraiment supprimer la partie " + nomPartie + " ?")) {
      if (confirm("Vraiment sûr ???")) {
        deletePartie(nomPartie)
        getListePartie().then(tab => majListePartieUI(tab))
      }
    }
  }

}


/**
 * Méthode qui créer un nouveau tour, historise l'ancien et mets à jour tout l'affichage
 * @returns rien du tout, juste pas de création de nouveau tour si le solde de CP est négatif
 */
export function nouveauTour() {
  //Nouveau tour impossible si le solde de CP est négatif
  if (tour.remainingCP < 0) {
    alert('Nouveau tour impossible, la maison ne fait pas crédit');
    return;
  }
  if (tour.remainingCP > constante.REPORT_MAX_CP) {
    if (!confirm('Attention report max de CP : ' + constante.REPORT_MAX_CP + '\n\nTu veux vraiment perdre tes ressources ?')) {
      return;
    };
  }
  if (!confirm("Passer au tour suivant ?")) {
    return;
  }

  nouveauTourMetier();

  calculEtMajAll();

  enregistrerPartieMetier();

  //pour revenir sur l'onglet mouvement pour le début du nouveau tour
  document.getElementById("bt-tab-mouvement").click();
}


/* ################################# 
      Events de HISTORIQUE
      TODO faur refactorer tous la gestion de lh'istorique : db, metier, ui....mais tard, fatigue,honte...commit
 #################################  */

export function ctlzy(sens) {

  let request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = (event) => {
    let db = event.target.result;
    const transaction = db.transaction(["versions"], "readonly");
    let versionCible = partie.versionSuivante;
    if (sens < 0) {
      versionCible = partie.versionPrecedante;
    }
    let requestVersion = transaction.objectStore("versions").get(versionCible);
    requestVersion.onsuccess = (event) => {
      partie = event.target.result;
      histoTour = partie.histoTour;
      tour = histoTour[0];
      document.getElementById("numTour").textContent = "Tour : " + tour.numTour;
      document.getElementById("nomPartie").textContent = partie.nomPartie;
      majTechnoUI();
      calcul(false);
      //pour revenir sur l'onglet mouvement pour le début du nouveau tour
      document.getElementById("bt-tab-mouvement").click();
      if (partie.versionPrecedante == versionEnCours || partie.versionPrecedante == null) {
        //désactiver le bouton précédant
        document.getElementById('ctlz').setAttribute("disabled", "true");
      } else {
        document.getElementById('ctlz').removeAttribute("disabled");
      }
      if (partie.version == versionEnCours || partie.versionSuivante == null) {
        //desactiver le bouton suivant
        document.getElementById('ctly').setAttribute("disabled", "true");
      } else {
        document.getElementById('ctly').removeAttribute("disabled");
      }
      document.getElementById("v2").innerHTML = partie.versionPrecedante + '< ' + partie.version + ' >' + partie.versionSuivante;

      document.getElementById("v3").innerHTML = versionEnCours;

    }

  }

}

export function createHistorique() {
  let columns = partie.histoTour.length;
  let olddivHisto = document.getElementById("tab-historique");
  let divHisto = olddivHisto.cloneNode(false);
  olddivHisto.parentElement.replaceChild(divHisto, olddivHisto);
  let column = document.createElement('div');
  column.className = 'column';
  let cell = createHistoCell('Tour', 'cell');
  cell.style = "font-size:large; padding:7px 0;";
  column.append(cell);
  column.append(createHistoCell('Economie', 'cell-highlight'));
  column.append(createHistoCell('Report', 'cell'));
  column.append(createHistoCell('Colonie CP', 'cell'));
  column.append(createHistoCell('Minerai', 'cell'));
  column.append(createHistoCell('MS Pipeline', 'cell'));
  column.append(createHistoCell('Maintenance', 'cell'));
  column.append(createHistoCell('Initiative', 'cell'));
  column.append(createHistoCell('Technologie', 'cell-highlight'));
  tour.dataTechno.forEach(tech => {
    column.append(createHistoCell(tech.libelle, 'cell'));
  });
  column.append(createHistoCell('Construction', 'cell-highlight'));
  partie.dataConstruction.forEach(construct => {
    column.append(createHistoCell(construct.libelle, 'cell'));
  });
  divHisto.append(column);


  for (let i = 0; i < columns; i++) {

    column = document.createElement('div');

    column.className = 'column';

    let cell = document.createElement('div');
    cell.className = 'cell';
    cell.style = "font-size:large; padding:7px 0;";
    cell.textContent = partie.histoTour[i].numTour
    cell.addEventListener("touchstart", pressingDownHisto, false);
    cell.addEventListener("touchend", notPressingDownHisto, false);
    column.append(cell);

    column.append(createHistoCell(partie.histoTour[i].remainingCP + "(" + partie.histoTour[i].totalCP + ")", 'cell-highlight'));

    column.append(createHistoCell(partie.histoTour[i].reportCP, 'cell'));

    column.append(createHistoCell(partie.histoTour[i].colonieCP, 'cell'));

    column.append(createHistoCell(partie.histoTour[i].mineurCP, 'cell'));

    column.append(createHistoCell(partie.histoTour[i].pipelineCP, 'cell'));

    column.append(createHistoCell(partie.histoTour[i].maintenance + "(" + partie.histoTour[i].futurMaintenance + ")", 'cell'));

    column.append(createHistoCell(partie.histoTour[i].bid, 'cell'));

    column.append(createHistoCell(partie.histoTour[i].coutTechno, 'cell-highlight'));

    for (let j = 0; j < partie.histoTour[i].dataTechno.length; j++) {
      let tech = partie.histoTour[i].dataTechno[j];

      let texte = tech.level + tech.grid[0][0];
      let className = 'cell';
      if (i < columns - 1) {
        //on traite toutes les colonnes sauf la dernière qui correspond au premier tour
        let techMoinsUn = partie.histoTour[i + 1].dataTechno[j];
        if (tech.researched) {
          className = 'gold';
          texte += " (" + tech.grid[tech.level][1] + ")";
          if (tech.level - techMoinsUn.level > 1) {
            texte += "w";
          }
        } else if (tech.level - techMoinsUn.level > 0) {
          className = 'gold';
          texte += "w";
        }
      } else {
        // dernière colonne, donc premier tour, on ne peut pas comparer avec le tour d'avant
        // dpremier tour donc sufiit de tester level et researched
        if (tech.level > 0) {
          //on considere qu'il n'y a pas de wreck possible au premier tour sinon c'est triché
          texte += " (" + tech.grid[tech.level][1] + ")";
          className = 'gold';
        }
      }
      column.append(createHistoCell(texte, className));
    }

    column.append(createHistoCell(partie.histoTour[i].coutConstruction, 'cell-highlight'));


    for (let j = 0; j < partie.histoTour[i].constructionTotal.length; j++) {
      let texte = partie.histoTour[i].constructionTour[j] + " ( " + partie.histoTour[i].constructionTotal[j] + " )";
      if (partie.histoTour[i].constructionTour[j] > 0 || partie.histoTour[i].constructionTotal[j] > 0) {
        column.append(createHistoCell(texte, 'gold'));
      } else {
        column.append(createHistoCell('-', 'cell'));
      }

    }

    divHisto.append(column);
  }
}

function createHistoCell(texte, className) {
  let cell = document.createElement('div');
  cell.textContent = texte
  cell.className = className;

  return cell;
}


function calculEtMajAll() {
  calculEconomieMetier();
  majEconomieUI(tour);
  let bandeau = calculConstructionMetier()
  majBandeauConstructionUI(bandeau);
  bandeau = calculTechnologieMetier();
  majBandeauTechnologieUI(bandeau);
  majTechnoUI(tour.dataTechno);
  refreshInfoPartieUI(partie.nomPartie, tour.numTour);
  majTabMouvementUI(partie, tour);
}

