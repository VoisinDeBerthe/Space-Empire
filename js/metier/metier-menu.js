import "../data.js";
import { clearHistorique, saveHistorique, saveNewPartie } from "../db.js";
import { ui } from "../ui/ui-element.js";
import { calculMaintenanceMetier, cloneJSON, getIdConstructionMetier } from "./metier.js";

/* ################################# 
        Gestion du Menu
   #################################  */

/**
 * Cache le menu
 */
/* export function hideMenu() {
    hideMenuUI();
} */

/**
 * Initialise les variables globales partie, histoTour et tour 
 * @param {Object} partieParam 
 */
export function chargerPartieMetier(partieParam) {
    partie = partieParam;
    histoTour = partie.histoTour;
    tour = histoTour[0];
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DEBUT --- ensemble des fonctions liées à la création d'une nouvelle partie
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */

/**
 * Initialise une nouvelle partie, retourne une prommesse pour être sûr que la partie est bien finie
 * sauvegardée avant de continuer (si besoin)
 */
export function nouvellePartieMetier(nomPartie) {

    return new Promise((resolve, reject) => {
        //initialisation
        initDataBase(nomPartie);
        initOption();

        //constructions de départ :4 Ship Yard, 3 Colony Ship, 3 Scout et 1 Miner
        tour.constructionTotal[getIdConstructionMetier('SY')] = 4;
        tour.constructionTotal[getIdConstructionMetier('CO')] = 3;
        tour.constructionTotal[getIdConstructionMetier('SC')] = 3;
        tour.constructionTotal[getIdConstructionMetier('Mi')] = 1;

        calculMaintenanceMetier();

        //sauvegarde et mise à jour de l'ui
        saveNewPartie(partie)

        //Création de l'historique
        clearHistorique().then(() => {
            saveHistorique(partie);
        })
        resolve();
    })


}

/**
 * Initialise les datas de base de la partie
 */
function initDataBase(nomPartie) {
    //Mon objet JSon tour qui fait tout, même le café. Après j'ai jamais dit qui le faisait bien...
    tour.numTour = 1; //N° de tour
    tour.reportCP = 0; // CP reportés du tour précédant
    tour.totalCP = 0; // total des CP gagné durant ce tour de production
    tour.colonieCP = 20; // CP gagnés grâce aux colonies et à la planète mère
    tour.mineurCP = 0; // CP gagnés grâce au vaisseaux mineur (minerai et exploitation de nébuleuse)
    tour.pipelineCP = 0; // CP gagnés grâce aux routes commerciales des MS pipeline
    tour.remainingCP = 0; // CP qui restent au fr et à mesure des dépenses du tour (deviendra le reportCP au prochain tour)
    tour.maintenance = 0; // Maintenance à payer ce tour ci de production (ne tient pas compte des nouvelles constructions)
    tour.bid = 0; // montant parié pour l'initiative
    tour.coutTechno = 0; // cout total en CP des technologies ce tour ci
    tour.coutConstruction = 0; // cout total des constructions ce tour ci
    tour.futurMaintenance = 0; // le surcout de maintenance au prochain tour en prévision
    tour.constructionTotal = new Array(); // tableau qui contient la quantité total de chaque construction (même index que dataConstrucion)
    tour.constructionTour = new Array(); // tableau qui contient les nouvelles constructions du tour(aditionnées à constructionTotal à chaque nouveau tour)
    tour.upgrade = []; // tableau d'historique des upgrades du tour pendant la phase de mouvement
    tour.dataTechno = [].concat(dataTechnoBase);

    histoTour.splice(0, histoTour.length);
    histoTour.push(tour);//Comme son nom l'indique contient l'historique de tous les tours de France le [0] étant toujours le dernier inséré 


    partie.histoTour = histoTour;
    partie.dataConstruction = [].concat(dataConstructionBase);
    partie.nomPartie = nomPartie;
    partie.version = 1;
    partie.versionPrecedante = null;
    partie.versionSuivante = null;


    for (let index = 0; index < partie.dataConstruction.length; index++) {
        partie.dataConstruction[index].id = index;
        tour.constructionTour[index] = 0;
        tour.constructionTotal[index] = 0;
    }
}


/**
 * Ajoute les datas liées aux options cochées dans le menu aux datas de base
 * de la nouvelle partie.
 * (Data TECHNO et CONSTRUCTION)
 */
function initOption() {
    let tailleTech = null;

    //parametrage de la partie avec les options avec les checkbox
    if (ui.menu.avance.pipelineElt.checked) {
        ajoutConst(dataConstPipeline, tailleTech);
    }


    if (ui.menu.closeEncounter.boardingElt.checked) {
        tailleTech = ajoutTech(dataTechnoBoarding);
        ajoutConst(dataConstBoarding, tailleTech);
    }
    if (ui.menu.avance.raiderElt.checked) {
        tailleTech = ajoutTech(dataTechnoCloaking);
        ajoutConst(dataConstRaider, tailleTech);

        tailleTech = ajoutTech(dataTechnoScanner);
    }
    if (ui.menu.avance.fighterElt.checked) {
        tailleTech = ajoutTech(dataTechnoFighter);
        ajoutConst(dataConstCarrier, tailleTech);
        ajoutConst(dataConstFighter, tailleTech);

        tailleTech = ajoutTech(dataTechnoDefense);
    }

    if (ui.menu.avance.mineElt.checked) {

        tailleTech = ajoutTech(dataTechnoMine);
        ajoutConst(dataConstMine, tailleTech);

        tailleTech = ajoutTech(dataTechnoMineSw);
        ajoutConst(dataConstMineSw, tailleTech);
    }

    if (ui.menu.closeEncounter.titanElt.checked) {
        let id = getIdConstructionMetier("DN");
        partie.dataConstruction.splice(id + 1, 0, [].concat(dataConstTitan)[0]);

        tour.dataTechno[0].grid.push([7, 30]);
    }

    if (ui.menu.closeEncounter.harvestNebulaeElt.checked) {
        tour.dataTechno[6].grid.push([2, 25]);
    }

    if (ui.menu.closeEncounter.reactionMouvElt.checked) {
        tour.dataTechno[7].grid.push([2, 15]);
    }

    if (ui.menu.closeEncounter.fastBCElt.checked) {
        ajoutTech(dataTechnofastBC);
    }

    if (ui.menu.closeEncounter.infantryElt.checked) {
        tailleTech = ajoutTech(dataTechnoSecurity);
        tailleTech = ajoutTech(dataTechnoGround);

        dataConstInfantry.forEach(t => {
            ajoutConst(t, tailleTech);
        })
    }

}

/**
 * Permet de rajouter une technologie optionnelle aux techs de la partie
 * @param {Object} dataTech la ligne de dataTechnologie à rajouter
 * @returns 
 */
function ajoutTech(dataTech) {
    let tailleTech = tour.dataTechno.length;
    if (dataTech != null) {
        tour.dataTechno[tailleTech] = [].concat(dataTech)[0];
        tour.dataTechno[tailleTech].id = tailleTech;
    }
    return tailleTech
}

/**
 * Permet de rajouter une construction optionnelle au constructions de bases de la partie
 * @param {Object} dataConst la ligne de dataConstruction à rajouter
 * @param {int} indexReqTech le niveau technologique de Ship Size requis pour la construction
 */
function ajoutConst(dataConst, indexReqTech) {
    let tailleConst = partie.dataConstruction.length;
    partie.dataConstruction[tailleConst] = [].concat(dataConst)[0];
    partie.dataConstruction[tailleConst].id = tailleConst;
    if (indexReqTech != null) {
        partie.dataConstruction[tailleConst].requiredTech[0][0] = indexReqTech;
    }
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    FIN --- ensemble des functions liées à la création d'une nouvelle partie
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */

/**
 * Création d'un nouveau tour
 */
export function nouveauTourMetier() {
    let newTurn = cloneJSON(tour);
    newTurn.numTour++;
    newTurn.coutConstruction = 0;
    newTurn.coutTechno = 0;
    newTurn.futurMaintenance = 0;
    newTurn.maintenance = 0;
    newTurn.upgrade = [];
    newTurn.reportCP = tour.remainingCP;
    if (newTurn.reportCP > constante.REPORT_MAX_CP) {
        newTurn.reportCP = constante.REPORT_MAX_CP;
    }
    newTurn.mineurCP = 0;
    newTurn.remainingCP = tour.colonieCP;

    newTurn.constructionTotal.forEach((qte, i) => {
        //Les constructions du tour sont cumulées dans les constructions totales 
        newTurn.constructionTotal[i] += tour.constructionTour[i];
        // RAZ des construction du tour
        newTurn.constructionTour[i] = 0;
        // Calcul de la maintenance 
        newTurn.maintenance += newTurn.constructionTotal[i] * partie.dataConstruction[i].maint
    })

    //Remise à zero des evolutions du tour de technologie
    newTurn.dataTechno.forEach(tech => {
        if (tech.researched == 1) { 
            tech.researched = 0;
        }
    })

    histoTour.splice(0, 0, newTurn);
    tour = newTurn;
}




/* ################################# 
        Gestion du Hold
   #################################  */


