import { addConstructLineToCollapseUI, deleteAllConstructionUI } from "../ui/ui-production.js";
import "../data.js";


/**
* Met à jour l'affichage du collapse des Constructions possibles dans l'onglet Production
* Suppression de toutes les lignes
* Ajoute les lignes en fonction du niveau de ShipSize
*/
export function majConstrucDispoMetier() {
    deleteAllConstructionUI()

    partie.dataConstruction.forEach((el, i) => {
        if (isConstructionPossible(i)) {
            addConstructLineToCollapseUI(el, i)
        } else {
            //si on a pas le droit de construire on remet à 0 la qte construite ce tour ci (cas où finalement on annule une recherche pour faire autre chose)
            tour.constructionTour[i] = 0;
        }
    })
}


/**
 * Renvoie vrai si les technologies requises pour cette construction sont recherchées
 * @param {number} idConstruct : index dans le tableau des construction
 * @returns 
 */
function isConstructionPossible(idConstruct) {
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
 * calcul le total de CP du tour, et le total restant en fonction des achats du tour
 */
export function calculEconomieMetier() {
    tour.totalCP = tour.reportCP + tour.colonieCP + tour.mineurCP + tour.pipelineCP - tour.maintenance - tour.bid;
    tour.remainingCP = tour.totalCP - tour.coutTechno - tour.coutConstruction;
}



/**
 * recalcul tous les coûts liés aux construction en cours (cout de construction, futur maintenance supplémentaire)
 * et renvoir la String à afficher dans le bouton collapse Construction
 */
export function calculConstructionMetier() {
  tour.coutConstruction = 0;
  tour.futurMaintenance = 0;
  let stringBandeau = " ( "
  tour.constructionTour.forEach((qte, i) => {
    if (qte > 0) {
      tour.coutConstruction += partie.dataConstruction[i].cost * qte;
      stringBandeau += partie.dataConstruction[i].construction + ":" + qte + ' - ';
      tour.futurMaintenance += partie.dataConstruction[i].maint * qte;
    }
  })

  if (stringBandeau.length == 3) {
    stringBandeau = "";
  } else {
    stringBandeau = stringBandeau.slice(0, stringBandeau.length - 3);
    stringBandeau += ' )';
  }
  return "Construction <br>CP : - " + tour.coutConstruction + stringBandeau + ' +maint:' + tour.futurMaintenance;
}


/**
 * recalcul le coût des recherches technologiques du tour 
 * et renvoie la string a afficher sur le bouton du collapse Technologie
 */
export function calculTechnologieMetier() {
    tour.coutTechno = 0;
    let stringBandeau = " ( "
    tour.dataTechno.forEach((el, i) => {
      if (el.researched) {
        tour.coutTechno += el.grid[el.level][1];
        stringBandeau += el.tech + ":" + (el.level + el.grid[0][0]) + ' - ';
      }
    })
  
    if (stringBandeau.length == 3) {
      stringBandeau = "";
    } else {
      stringBandeau = stringBandeau.slice(0, stringBandeau.length - 3);
      stringBandeau += ' )';
    }
  
    return "Technologie <br>CP : - " + tour.coutTechno + stringBandeau;
  }