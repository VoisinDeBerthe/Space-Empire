/**
 * Constantes !!!!Attention à pas modifier!!!!!!!!!!!
 */


const constante = {
    REPORT_MAX_CP: 30,
    REPORT_MAX_RP: 30,
    NBRE_HISTORIQUE_MAX: 100,
    DB_NAME: "se",
    DB_VERSION: 13
}


/************************************************************************************************************/
/* Variables contenant toutes les données de référence du jeu
/************************************************************************************************************/

/////////////////////////////////////////
//Jeu de base V1.X
/////////////////////////////////////////
const dataTechnoBase = [
    { id: 0, tech: "SS", researched: 0, libelle: "Ship Size", level: 0, grid: [[1,], [2, 10], [3, 15], [4, 20], [5, 20], [6, 20]] },
    { id: 1, tech: "A", researched: 0, libelle: "Attack", level: 0, grid: [[0,], [1, 20], [2, 30], [3, 25]] },
    { id: 2, tech: "D", researched: 0, libelle: "Defense", level: 0, grid: [[0,], [1, 20], [2, 30], [3, 25]] },
    { id: 3, tech: "Ta", researched: 0, libelle: "Tactic", level: 0, grid: [[0,], [1, 15], [2, 15]] },
    { id: 4, tech: "M", researched: 0, libelle: "Move", level: 0, grid: [[1,], [2, 20], [3, 25], [4, 25], [5, 25], [6, 20], [7, 20]] },
    { id: 5, tech: "SY", researched: 0, libelle: "Ship Yard", level: 0, grid: [[1,], [2, 20], [3, 25]] },
    { id: 6, tech: "Te", researched: 0, libelle: "Terraformation", level: 0, grid: [[0,], [1, 20]] },
    { id: 7, tech: "E", researched: 0, libelle: "Exploration", level: 0, grid: [[0,], [1, 15]] }
]
    ;

const dataConstructionBase = [
    { id: 0, construction: "SC", requiredTech: [[0, 1]], libelle: "Scout", hull: 1, cost: 6, maint: 1, maxUnit: 36, upgradable: 1 },
    { id: 1, construction: "DD", requiredTech: [[0, 2]], libelle: "Destroyer", hull: 1, cost: 9, maint: 1, maxUnit: 36, upgradable: 1 },
    { id: 2, construction: "CA", requiredTech: [[0, 3]], libelle: "Cruiser", hull: 2, cost: 12, maint: 2, maxUnit: 36, upgradable: 1 },
    { id: 3, construction: "BC", requiredTech: [[0, 4]], libelle: "Battle Cruiser", hull: 2, cost: 15, maint: 2, maxUnit: 36, upgradable: 1 },
    { id: 4, construction: "BB", requiredTech: [[0, 5]], libelle: "BattleShip", hull: 3, cost: 20, maint: 3, maxUnit: 36, upgradable: 1 },
    { id: 5, construction: "DN", requiredTech: [[0, 6]], libelle: "Dreadnaught", hull: 3, cost: 24, maint: 3, maxUnit: 36, upgradable: 1 },
    { id: 6, construction: "CO", requiredTech: [[0, 1]], libelle: "Colony Ship", hull: 1, cost: 8, maint: 0, maxUnit: 0, upgradable: 0 },
    { id: 7, construction: "Ba", requiredTech: [[0, 2]], libelle: "Base", hull: 0, cost: 12, maint: 0, maxUnit: 4, upgradable: 0 },
    { id: 8, construction: "Mi", requiredTech: [[0, 1]], libelle: "Miner", hull: 1, cost: 5, maint: 0, maxUnit: 0, upgradable: 0 },
    { id: 9, construction: "De", requiredTech: [[0, 1]], libelle: "Decoy", hull: 0, cost: 1, maint: 0, maxUnit: 4, upgradable: 0 },
    { id: 10, construction: "SY", requiredTech: [[0, 1]], libelle: "Ship Yard", hull: 0, cost: 6, maint: 0, maxUnit: 36, upgradable: 0 }
]
    ;

/////////////////////////////////////////
//Jeu de base règles avancées V1.X
/////////////////////////////////////////


//option Ms Pipeline
const dataConstPipeline = [
    { id: 0, construction: "Ms", requiredTech: [[0, 1]], libelle: "MS Pipeline", hull: 1, cost: 3, maint: 0, maxUnit: 0, upgradable: 0 }]
//option Mine
const dataConstMine = [
    { id: 0, construction: "Mine", requiredTech: [[0, 1]], libelle: "Mine", hull: 1, cost: 5, maint: 0, maxUnit: 0, upgradable: 0 }]
const dataTechnoMine = [
    { id: 0, tech: "Mine", researched: 0, libelle: "Mine", level: 0, grid: [[0,], [1, 30]] }]
const dataConstMineSw = [
    { id: 0, construction: "MSw", requiredTech: [[0, 1]], libelle: "Mine Sweeper", hull: 1, cost: 6, maint: 1, maxUnit: 6, upgradable: 1 }]
const dataTechnoMineSw = [
    { id: 0, tech: "MSw", researched: 0, libelle: "Mine Sweeper", level: 0, grid: [[0,], [1, 10], [2, 15]] }]

// option raider / cloaking
const dataConstRaider = [
    { id: 0, construction: "R", requiredTech: [[0, 1]], libelle: "Raider", hull: 2, cost: 12, maint: 2, maxUnit: 36, upgradable: 1 }]
const dataTechnoCloaking = [
    { id: 0, tech: "Cl", researched: 0, libelle: "Cloaking", level: 0, grid: [[0,], [1, 30], [2, 30]] }]
const dataTechnoScanner = [
    { id: 0, tech: "Sc", researched: 0, libelle: "Scanner", level: 0, grid: [[0,], [1, 20], [2, 20]] }]


// option fighter 
const dataConstCarrier = [
    { id: 0, construction: "CV", requiredTech: [[0, 1]], libelle: "Carrier", hull: 1, cost: 12, maint: 1, maxUnit: 36, upgradable: 1 }]
const dataConstFighter = [
    { id: 0, construction: "F", requiredTech: [[0, 1]], libelle: "Fighter", hull: 1, cost: 5, maint: 1, maxUnit: 36, upgradable: 1 }]
const dataTechnoFighter = [
    { id: 0, tech: "Fi", researched: 0, libelle: "Fighter", level: 0, grid: [[0,], [1, 25], [2, 25], [3, 25]] }]
const dataTechnoDefense = [
    { id: 0, tech: "PD", researched: 0, libelle: "Point Defense", level: 0, grid: [[0,], [1, 20], [2, 20], [3, 20]] }]


/////////////////////////////////////////
//Close encounters
/////////////////////////////////////////

//option titan
const dataConstTitan = [
    { id: 0, construction: "TN", requiredTech: [[0, 7]], libelle: "Titan", hull: 5, cost: 32, maint: 5, maxUnit: 24, upgradable: 1 }];

// option boarding
const dataConstBoarding = [
    { id: 0, construction: "BD", requiredTech: [[0, 1]], libelle: "Boarding Ship ", hull: 2, cost: 12, maint: 2, maxUnit: 36, upgradable: 1 }]
const dataTechnoBoarding = [
    { id: 0, tech: "BoS", researched: 0, libelle: "Boarding Ship", level: 0, grid: [[0,], [1, 20], [2, 25]] }]

// option fast BC
const dataTechnofastBC = [
    { id: 0, tech: "FBC", researched: 0, libelle: "Fast BC", level: 0, grid: [[0,], [1, 10], [2, 10]] }]

//option infantry
const dataConstInfantry = [
    { id: 0, construction: "Tran", requiredTech: [[0, 1]], libelle: "Transport", hull: 1, cost: 6, maint: 1, maxUnit: 36, upgradable: 1 },
    { id: 0, construction: "Inf", requiredTech: [[0, 1]], libelle: "Infantry", hull: 1, cost: 2, maint: 0, maxUnit: 36, upgradable: 1 },
    { id: 0, construction: "Mar", requiredTech: [[0, 2]], libelle: "Space Marines", hull: 2, cost: 3, maint: 0, maxUnit: 36, upgradable: 1 },
    { id: 0, construction: "HI", requiredTech: [[0, 2]], libelle: "Heavy Infantry", hull: 2, cost: 3, maint: 0, maxUnit: 36, upgradable: 1 },
    { id: 0, construction: "Grav", requiredTech: [[0, 3]], libelle: "Grav Armor", hull: 2, cost: 4, maint: 0, maxUnit: 36, upgradable: 1 }
];

const dataTechnoGround = [
    { id: 0, tech: "GC", researched: 0, libelle: "Ground Combat", level: 0, grid: [[1,], [2, 10], [3, 15]] }]

const dataTechnoSecurity = [
    { id: 0, tech: "SF", researched: 0, libelle: "Security Force", level: 0, grid: [[0,], [1, 15], [2, 15]] }]




/**
 * Variables globales
 */
var versionEnCours = 0; // pour stocker la version en cours, comprendre le numéro de la dernière version modifiée
// cette version permet de bloque le retour en arriere de l'historique (éviter le chevauchement de version)
//Si tu as toujours pas compris c'est pas la peine d'aller plus loin, ferme se fichier... tu vas te blesser si tu continue de réchéflir...



var tour = { //Mon objet JSon tour qui fait tout, même le café. Après j'ai jamais dit qui le faisait bien...
    nomPartie: 'test',
    version: 0, // numéro de version actuelle
    versionPrecedante: null, // permet la navigabilité entre les versions
    versionSuivante: null, // permet la navigabilité entre les versions
    numTour: 0, //N° de tour
    reportCP: 0, // CP reportés du tour précédant
    totalCP: 0, // total des CP gagné durant ce tour de production
    colonieCP: 0, // CP gagnés grâce aux colonies et à la planète mère
    mineurCP: 0, // CP gagnés grâce au vaisseaux mineur (minerai et exploitation de nébuleuse)
    pipelineCP: 0, // CP gagnés grâce aux routes commerciales des MS pipeline
    remainingCP: 0, // CP qui restent au fr et à mesure des dépenses du tour (deviendra le reportCP au prochain tour)
    maintenance: 0, // Maintenance à payer ce tour ci de production (ne tient pas compte des nouvelles constructions)
    bid: 0, // montant parié pour l'initiative
    coutTechno: 0, // cout total en CP des technologies ce tour ci
    coutConstruction: 0, // cout total des constructions ce tour ci
    futurMaintenance: 0, // le surcout de maintenance au prochain tour en prévision
    constructionTotal: new Array(), // tableau qui contient la quantité total de chaque construction (même index que dataConstrucion)
    constructionTour: new Array(), // tableau qui contient les nouvelles constructions du tour(aditionnées à constructionTotal à chaque nouveau tour)
    upgrade: [], // tableau d'historique des upgrades du tour pendant la phase de mouvement
    dataTechno: [].concat(dataTechnoBase)
};

var histoTour = [tour];//Comme son nom l'indique contient l'historique de tous les tours de France le [0] étant toujours le dernier inséré 

var partie = { histoTour: histoTour, dataConstruction: [].concat(dataConstructionBase), nomPartie: 'Test' }
