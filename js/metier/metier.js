import "../data.js";
import { saveHistorique, savePartie } from "../db.js";
import { majBtnHistoAfterSaveUI } from "../ui/ui-historique.js";





/**
 * Enregistre la partie et gère le versionning dans indexDB
 */
export function enregistrerPartieMetier() {
    if (partie.histoTour[0].numTour > 0) {
        partie.versionPrecedante = partie.version;
        if (partie.version < constante.NBRE_HISTORIQUE_MAX) {
            partie.version++;
        } else {
            partie.version = 1;
        }
        versionEnCours = partie.version;
        partie.versionSuivante = partie.version + 1;
        if (partie.versionSuivante > constante.NBRE_HISTORIQUE_MAX) {
            partie.versionSuivante = 1
        }
        saveHistorique(partie).then(() => {
            //Des qu'on sauvegarde on desactive la possibilité de "retour en avant"
            majBtnHistoAfterSaveUI();
        });
        savePartie(partie);
    }
}


/* ################################# 
        Fonctions utilitaires
   #################################  */

/**
 * Retourne l'index d'une construction dans le tableau dataConstruction */
export function getIdConstructionMetier(construction) {
    let resultat = 0;
    partie.dataConstruction.forEach(el => {
        if (el.construction == construction) {
            resultat = el.id;
        }
    })
    return resultat;
}

/**
 * Renvoie vrai si les technologies requises pour cette construction sont recherchées
 * @param {number} idConstruct : index dans le tableau des construction
 * @returns 
 */
function isConstructionPossibleMetier(idConstruct) {
    let resultat = true;
    partie.dataConstruction[idConstruct].requiredTech.forEach(req => {
        if (tour.dataTechno[req[0]].level + parseInt(tour.dataTechno[req[0]].grid[0]) >= req[1]) {
            resultat = resultat & true;
        } else {
            resultat = false;
        }
    })

    return resultat;
}

/**
 * Renvoie le niveau d'une technologie donnée en paramètre. renvoie -1 si la techno n'est pas dans connue 
 * */
function getNiveauTech(tech) {
    let resultat = -1;

    tour.dataTechno.forEach(el => {
        //parfois le niveau de départ est 0, parfois 1 dans le tableau (grid), l'attribut level fais toujours référence 
        //au premier niveau avec 0 comme valeur, c'est pourquoi on y ajoute le premier élément de la grille (soit 0, soit 1) 
        if (el.tech == tech) {
            resultat = (el.level + parseInt(el.grid[0]));
        }
    })
    return resultat;
}

/**
 * Renvoie la capacité de construction de point de coque totale en tenant compte 
 * du nombre de chantier et du niveau technologique
 * @returns 
 */
export function getHullCapacityMetier() {

    let resultat = tour.constructionTotal[getIdConstruction('SY')];
    switch (getNiveauTech('SY')) {
        case 3:
            resultat = resultat * 2;
            break;
        case 2:
            resultat = resultat * 1.5
            break;
        default: // level 1 pas de facteur multiplicateur
    }
    return resultat;
}

/**
 * Renvoie le nombre de point de coque construit pendant ce tour
 * Pour des raisons de facilités les bases, les chantiers, les decoy ont 0 points de coques dans les data
 * ça évite un attribut supplémentaire pour gérer les unités ne nécessitant pas de chantier pour être construites
 * @returns 
 */
export function getHullConstructTurnMetier() {
    result = 0;
    tour.constructionTour.forEach((qte, i) => {
        result += partie.dataConstruction[i].hull * qte;
    })
    return result;
}

/**
 * Calcul et contruit le String d'affichage pour les upgrades d'une construction pour un tour donné
 * @param {integer} id index de la construction
 * @param {integer} indexTour index du tour pour lequel il faut calculer
 * @returns La chaine de caractères prête à afficher avec le détail du calcul
 */
export function calculUpgradeMetier(id, indexTour=0) {
    let qte1 = 0;
    let qte2 = 0;
  
    partie.histoTour[indexTour].upgrade.forEach(up => {
      if (up.id == id) {
        if (up.prix == 1) {
          qte1 += up.qte;
        } else {
          qte2 += up.qte;
        }
      }
    });
    let total = (qte1 + qte2 * 2) * partie.dataConstruction[id].hull;
    return " (" + qte1 + "x1, " + qte2 + "x2) " + total + " CP";
  }


  /**
 * Méthode récursive permettant de cloner réellement un JSON 
 * @param {JSON} obj 
 * @returns un clone de obj
 */
export function cloneJSON(obj) {
    // basic type deep copy
    if (obj === null || obj === undefined || typeof obj !== 'object') {
      return obj
    }
    // array deep copy
    if (obj instanceof Array) {
      var cloneA = [];
      for (var i = 0; i < obj.length; ++i) {
        cloneA[i] = cloneJSON(obj[i]);
      }
      return cloneA;
    }
    // object deep copy
    var cloneO = {};
    for (var i in obj) {
      cloneO[i] = cloneJSON(obj[i]);
    }
    return cloneO;
  }


  /**
   * Calcul le cout de la maintenance pour le tour en cours
   */
  export function calculMaintenanceMetier() {
    tour.maintenance = 0;
    tour.constructionTotal.forEach((qte, i) => {
      tour.maintenance += qte * partie.dataConstruction[i].maint;
    })
  }