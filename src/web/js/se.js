
/* import { DB_NAME, DB_VERSION } from './config/constante.js'; */

import { openDB } from "./idb/build/index.js";

const TEMPLATE_UPGRADE_INSUFFICIENT_CP = '#upgrade_insufficient_cp'

export const DB_NAME = 'se'
export const DB_VERSION = 10

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


/************************************************************************************************************/
/* Initialisation des données la partie en fonction des choix de l'utilisateur
/************************************************************************************************************/
//TODO A faire plus tard, déjà essaye de le faire marcher avec le jeux de base ...
/**
 * Constantes !!!!Attention à pas modifier!!!!!!!!!!!
 */
const REPORT_MAX_CP = 30;
const REPORT_MAX_RP = 30;
const NBRE_HISTORIQUE_MAX = 100;
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


for (let index = 0; index < partie.dataConstruction.length; index++) {
  tour.constructionTour[index] = 0;
  tour.constructionTotal[index] = 0;
}

//construction de départ
tour.constructionTotal[getIdConstruction('SY')] = 4;
tour.constructionTotal[getIdConstruction('CO')] = 3;
tour.constructionTotal[getIdConstruction('SC')] = 3;
tour.constructionTotal[getIdConstruction('Mi')] = 1;
tour.colonieCP = 20;
calculMaintenance();

const dbName = "se";
const dbVersion = 13;

//ouverture de la base avec un numéro de version, si la version en paramètre est supperieur à celle existante dans le navigateur
//ou si il n'y a pas de base alors création

// await initIndexDB(DB_NAME, DB_VERSION);


const db = await openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
      console.warn("Création base")
      if (!db.objectStoreNames.contains('partie')) {
          // s'il n'y a pas de magasin "partie"
          db.createObjectStore('partie', { keyPath: 'nomPartie' }); // créez-le
        }
        if (!db.objectStoreNames.contains('versions')) {
          // s'il n'y a pas de magasin "versions"
          var objStore = db.createObjectStore("versions", { keyPath: "version" });
        }          
  }
});

/* let request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
  // Handle errors.
  console.warn("Base Error")
};

request.onsuccess = (event) => {
  // Handle errors.
  console.warn("Base OK")
};

//onupgradeneeded est appelé lors d'une création ou d'une mise à jour si nouvelle version
request.onupgradeneeded = function (event) {
  console.warn("Création base")
  //Création de la base de données

  let db = event.target.result;
  if (!db.objectStoreNames.contains('partie')) {
    // s'il n'y a pas de magasin "partie"
    db.createObjectStore('partie', { keyPath: 'nomPartie' }); // créez-le
  }
  if (!db.objectStoreNames.contains('versions')) {
    // s'il n'y a pas de magasin "versions"
    var objStore = db.createObjectStore("versions", { keyPath: "version" });
  }

}; */

function ctlzy(sens) {

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
      majTechno();
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


function enregistrerPartie() {
  if (partie.histoTour[0].numTour > 0) {
    request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {
      let db = event.target.result;
      const transaction = db.transaction(["partie", "versions"], "readwrite");


      let objectStore = transaction.objectStore("versions");

      const requestCount = objectStore.count(partie.version);

      requestCount.onsuccess = (event) => {
        document.getElementById("v").innerHTML = partie.versionPrecedante + '< ' + partie.version + ' >' + partie.versionSuivante;
        partie.versionPrecedante = partie.version;
        if (partie.version < NBRE_HISTORIQUE_MAX) {
          partie.version++;
        } else {
          partie.version = 1;
        }

        versionEnCours = partie.version;
        document.getElementById("v2").innerHTML = partie.versionPrecedante + '< ' + partie.version + ' >' + partie.versionSuivante;

        document.getElementById("v3").innerHTML = versionEnCours;
        partie.versionSuivante = partie.version + 1;
        if (partie.versionSuivante > NBRE_HISTORIQUE_MAX) {
          partie.versionSuivante = 1
        }

        let requestVersion;
        if (event.target.result > 0) {
          requestVersion = objectStore.put(partie)
        } else {
          requestVersion = objectStore.add(partie)
        }
        requestVersion.onsuccess = (event) => {
          document.getElementById('ctlz').removeAttribute("disabled");

          document.getElementById('ctly').setAttribute("disabled", "true");
          objectStore = transaction.objectStore("partie");
          const requestUpdate = objectStore.put(partie);



        }
      };

    };

    request.onerror = (event) => {
      console.log('Enregistrement - Echec ouverture BDD');
    }
  }

};

function effacerPartie() {
  const nomPartie = document.getElementById('liste-partie').value;
  if (nomPartie != "" && nomPartie != null) {
    if (confirm("Tu veux vraiment supprimer la partie " + nomPartie + " ?")) {
      if (confirm("Vraiment sûr ???")) {
        indexedDB.open(dbName, dbVersion).onsuccess = (event) => {
          db = event.target.result;
          const transaction = db.transaction(["partie"], "readwrite");
          const objectStore = transaction.objectStore("partie");
          const requestUpdate = objectStore.delete(nomPartie);
          afficherMenu();
        };
      }
    }
  }

}


function chargerPartie() {
  const nomPartie = document.getElementById('liste-partie').value;
  request = indexedDB.open(dbName, dbVersion);

  request.onsuccess = (event) => {
    db = event.target.result;
    const transaction = db.transaction(["partie"], "readonly");
    const objectStore = transaction.objectStore("partie");
    const requestUpdate = objectStore.get(nomPartie);
    requestUpdate.onerror = (event) => {
      console.log('echec lors du chargement de la partie : ' + nomPartie);
    };
    requestUpdate.onsuccess = (event) => {
      console.log('Chargement de la partie :' + nomPartie);
      partie = event.target.result;
      histoTour = partie.histoTour;
      tour = histoTour[0];
      document.getElementById("numTour").textContent = "Tour : " + tour.numTour;
      document.getElementById("nomPartie").textContent = partie.nomPartie;
      let div = document.getElementById("menu-div");
      div.style.display = "none";
      majTechno();
      calcul(true);
      //pour revenir sur l'onglet mouvement pour le début du nouveau tour
      document.getElementById("bt-tab-mouvement").click();
    };
  };

  request.onerror = (event) => {
    console.log('echec ouverture base');
  }
};



function getObjectStore(store, rights = "readonly", objectName) {
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {

      const db = event.target.result;

      const transaction = db.transaction(store, rights );
      const objectStore = transaction.objectStore(objectName);
      
      /* 
      const requestUpdate = objectStore.getAllKeys();

      requestUpdate.onerror = (event) => {
        console.log('echec lors du chargement des noms des parties enregistrées');
        reject();
      };
      requestUpdate.onsuccess = (event) => {
        console.log('Récupération des noms des parties enregistrées');
        resolve(event.target.result);
      }; */

      resolve( objectStore );
    };

    request.onerror = (event) => {
      reject('Echec ouverture base.');
    }

  })
}



async function getListePartie() {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {

      const db = event.target.result;
      const transaction = db.transaction(["partie"], "readonly");
      const objectStore = transaction.objectStore("partie");
      const requestUpdate = objectStore.getAllKeys();

      requestUpdate.onerror = (event) => {
        console.log('echec lors du chargement des noms des parties enregistrées');
        reject();
      };
      requestUpdate.onsuccess = (event) => {
        console.log('Récupération des noms des parties enregistrées');
        resolve(event.target.result);

      };
    };

    request.onerror = (event) => {
      console.log('echec ouverture base');
      reject();
    }
  })

};



// la méthode calcul() ici permet de mettre à jour tous les boutons du collapse avec les valeurs initialisées


/************************************************************************************************************/
/* Modification du DOM en fonction de l'initialisation
/************************************************************************************************************/

//Aller on le tente avec les technologies. Franchement j'y crois pas trop mais si ça marche ben... ça marche quoi.

//Bon ben puisque ça marche on passe aux constructions... même combat
majTechno();
majConstrucDispo();
calcul(true);

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

/*************************************************************************************************************/
/* gestion des boutons PRODUCTION 
/*************************************************************************************************************/

//appelé par tous les boutons dans le bloc économie
function modifValeurNum(id, valeur) {
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
  let nbre = document.getElementById(id);
  nbre.value = parseInt(nbre.textContent) + valeur;
  calcul(true);
}

//appelé par tous les boutons dans le bloc Technologie
function modifNivTech(idNewLineTech, type) {
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

  calcul(true);
}

function chgNivTech(index, isWreck, boutonAcacher, boutonAafficher, valeur) {
  let level = tour.dataTechno[index].level;
  tour.dataTechno[index].level = level + valeur;
  if (!isWreck) {
    boutonAcacher.setAttribute("class", "not-visible");
    boutonAafficher.removeAttribute("class", "not-visible");
    boutonAafficher.setAttribute("class", "btn-small");
    if (valeur == 1) {
      tour.dataTechno[index].researched = 1;
    } else {
      tour.dataTechno[index].researched = 0;
    }
  }

  document.getElementById(tour.dataTechno[index].tech + '_' + (level + valeur)).setAttribute("class", "label-tech");
  document.getElementById(tour.dataTechno[index].tech + '_' + level).removeAttribute("class", "label-tech");
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

/**
 * est appelé par tous les boutons du bloc construction
 * */
function modifConstruction(idNewLineConst, type) {

  let tab = idNewLineConst.split('_');
  let boutonPlus = document.getElementById(tab[1] + '_plus');
  let boutonMoins = document.getElementById(tab[1] + '_moins');
  if (type == 'plus') {
    if (getHullConstructTurn() + partie.dataConstruction[tab[0]].hull > getHullCapacity()) {
      alert("Capacité de construction dépassée (max : " + getHullCapacity() + ')');
      return
    }
    tour.constructionTour[tab[0]]++;
  } else {
    tour.constructionTour[tab[0]]--;
  }
  calcul(true);
}

/**
 * Permet de détruire une construction, met à jour l'onglet Mouvement et le collapse Construction dans l'onglet Production.
 * Impacte également la maintenance du tour.
 * @param {number} id index du tableau construction total dans lequel on détruit une construction
 */
function destruction(id) {
  if (!confirm("Détruire un " + partie.dataConstruction[id].libelle + " ?")) {
    return;
  }
  if (tour.constructionTotal[id] > 0) {
    tour.constructionTotal[id]--;
  }
  calculMaintenance();
  calculEconomie();
  majTabMouvement();
  majConstrucDispo();
  enregistrerPartie();
}

/**
 * Mets à jour TOUT l'affichage avec les valeurs actuelles en mémoires, c'est barbare je sais... Oui c'est appelé à chaque petite modif...
 * j'ai honte de faire du sale comme ça ... mais ... mais ... trop la flemme de faire du propre quand le sale
 * marche si bien ! 
 * Promis si un jour j'ai des problèmes de performances j'acheterai un téléphone plus puissant !
 * Putain avec l'historisation ça fout la merde... l'occasion de tout refaire  propre
 * Non je déconne je rajoute un sale bool si c'est faut pas de sauvegarde en base
 * Pour féter ça je mets même pas d'accolade
 * */
function calcul(bool) {
  calculTechnologie();
  calculConstruction();
  majConstrucDispo();
  calculEconomie();
  majTabMouvement();

  if (bool) enregistrerPartie();
}

/**
 * Calcul tout ce qu'il faut sur la production de CP et met à jour tout l'affichage du collapse Economie dans l'onglet Production
 */
function calculEconomie() {
  document.getElementById("report").textContent = tour.reportCP;
  document.getElementById("colonie").textContent = tour.colonieCP;
  document.getElementById('minerai').textContent = tour.mineurCP
  document.getElementById('pipeline').textContent = tour.pipelineCP;
  document.getElementById('maintenance').textContent = tour.maintenance;
  document.getElementById('init').textContent = tour.bid;
  tour.totalCP = tour.reportCP + tour.colonieCP + tour.mineurCP + tour.pipelineCP - tour.maintenance - tour.bid;
  tour.remainingCP = tour.totalCP - tour.coutTechno - tour.coutConstruction;
  document.getElementById('bt_economie').innerHTML = "Economie <br>CP :  " + tour.remainingCP + "(" + tour.totalCP + ")" + " - Maint : " + tour.maintenance + " Init : " + tour.bid;

}

/**
 * recalcul le coût des recherches technologiques du tour et met à jour l'information dans le bouton du collapse Technologie
 */
function calculTechnologie() {
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

  document.getElementById('bt_technologie').innerHTML = "Technologie <br>CP : - " + tour.coutTechno + stringBandeau;

}

/**
 * recalcul tous les coûts liés aux construction en cours (cout de construction, futur maintenance supplémentaire)
 * et met à jour les infos du bouton collapse Construction
 */
function calculConstruction() {
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
  document.getElementById('bt_construction').innerHTML = "Construction <br>CP : - " + tour.coutConstruction + stringBandeau + ' +maint:' + tour.futurMaintenance;
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
 * Retourne l'index d'une construction dans le tableau dataConstruction */
function getIdConstruction(construction) {
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
 * Renvoie la capacité de construction de point de coque totale en tenant compte 
 * du nombre de chantier et du niveau technologique
 * @returns 
 */
function getHullCapacity() {

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
function getHullConstructTurn() {
  result = 0;
  tour.constructionTour.forEach((qte, i) => {
    result += partie.dataConstruction[i].hull * qte;
  })
  return result;
}

/**
 * Met à jour l'affichage du collapse Technologie dans l'onglet Production
 */
function majTechno() {
  let tab = document.getElementById("tab-techno");

  while (tab.firstChild) {
    tab.removeChild(tab.lastChild);
  }

  tour.dataTechno.forEach((el, i) => {
    let newLineTech = document.createElement("div");
    let idNewLineTech = el.id + '_' + el.tech;
    newLineTech.setAttribute("id", idNewLineTech);
    newLineTech.setAttribute("class", "body-accordeon-row technology");
    let label = document.createElement("label");
    label.textContent = el.tech;
    label.title = el.libelle;
    label.setAttribute("class", "libelle");
    label.addEventListener("touchstart", pressingDown, false);
    label.addEventListener("touchend", notPressingDown, false);

    newLineTech.appendChild(label);

    //création d'une div pour regrouper les boutons plus et moins dans la deuxième colonne de la ligne de techno
    let div = document.createElement('div');
    div.setAttribute('class', 'tab-techno');
    let button = createButton(el.tech + "_plus", "btn-small", "fa-solid fa-plus");
    button.addEventListener('click', function () { modifNivTech(idNewLineTech, 'plus') });
    if (el.researched == 1) {
      button.setAttribute("class", "not-visible");
    }
    div.appendChild(button);

    button = createButton(el.tech + "_moins", "btn-small", "fa-solid fa-minus");
    button.addEventListener('click', function () { modifNivTech(idNewLineTech, 'moins') });
    if (el.researched == 0) {
      button.setAttribute("class", "not-visible");
    }
    div.appendChild(button);

    //on ajoute la div avec les deux boutons à la ligne de tech en cours
    newLineTech.appendChild(div);

    button = document.createElement("button");
    button.textContent = 'Wreck';
    button.setAttribute("id", el.tech + "_wreck");
    button.addEventListener('click', function () { modifNivTech(idNewLineTech, 'wreck') });
    button.setAttribute("class", "wreck btn-small");
    newLineTech.appendChild(button);


    //on crré une div qui regroupera tous les <p> des level de techno dans la 4ème colonne
    div = document.createElement('div');
    div.setAttribute('class', 'tab-techno');
    el.grid.forEach((nivTech, j) => {
      /* on créé un paragraphe pour afficher le niveau de la techno */
      let nivTechno = document.createElement("p");
      nivTechno.textContent = nivTech[0];
      nivTechno.setAttribute("id", el.tech + '_' + j);
      if (j == el.level) {
        /* Si le niveau de la techno correspond au niveau de recherche actuelle de l'utilisateur 
        alors on applique la class de mise en valeur du niveau*/
        nivTechno.setAttribute("class", "label-tech");
      }

      /*On rajoute le prix du niveau de technologie en indice du niveau
      Pour ça il faut rajouter un span à l'intérireur du paragraphe  */
      let prixTechno = document.createElement("span");
      prixTechno.setAttribute("class", "indice");
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
    tab.appendChild(newLineTech);
    if (el.level + 1 == el.grid.length && el.researched == 0) {

      gestionNivMax(el.tech);

    }
  })

}



/**
 * Met à jour l'affichage du collapse Construction dans l'onglet Production
 * On clone le body des constructions mais sans aucune ligne puis on reconstruit tout avec les data
 * en fonction du niveau de ShipSize
 */
function majConstrucDispo() {
  //on supprime toutes 
  let template = document.getElementById("body-construction");
  let newBodyConstruction = template.cloneNode(false);
  template.parentNode.replaceChild(newBodyConstruction, template);

  partie.dataConstruction.forEach((el, i) => {
    if (isConstructionPossible(i)) {
      let newLineConstruct = document.createElement("div");
      newLineConstruct.setAttribute("class", "body-accordeon-row, construction");

      let idNewLineConstruct = el.id + '_' + el.construction;
      newLineConstruct.setAttribute("id", idNewLineConstruct);

      let construct = document.createElement("p");
      construct.textContent = el.construction + ' - ' + el.libelle;
      let prixConstruct = document.createElement("span");
      prixConstruct.setAttribute("class", "indice");
      prixConstruct.textContent = ' ' + el.cost;
      construct.appendChild(prixConstruct);
      construct.setAttribute("class", "libelle");
      newLineConstruct.appendChild(construct);

      let button = createButton(el.construction + "_moins", "bt-moins btn-small", "fa-solid fa-minus");
      button.addEventListener('click', function () { modifConstruction(idNewLineConstruct, 'moins') });
      if (tour.constructionTour[i] == 0) {
        button.setAttribute("disabled", true);
      }
      newLineConstruct.appendChild(button);


      button = createButton(el.construction + "_plus", "bt-plus btn-small", "fa-solid fa-plus");
      button.addEventListener('click', function () { modifConstruction(idNewLineConstruct, 'plus') });
      if (tour.constructionTour[i] + tour.constructionTotal[i] == el.maxUnit && el.maxUnit != 0) {
        button.setAttribute("disabled", true);
      }
      newLineConstruct.appendChild(button);

      let label = document.createElement("label");
      label.textContent = tour.constructionTour[i];
      label.setAttribute("id", el.construction + "_enCours_" + i);
      label.setAttribute("class", "qte-courante");
      newLineConstruct.appendChild(label);

      label = document.createElement("label");
      label.textContent = '( ' + tour.constructionTotal[i] + ' )';
      label.setAttribute("id", el.construction + "_total_" + i);
      label.setAttribute("class", "qte-totale");
      newLineConstruct.appendChild(label);

      newBodyConstruction.appendChild(newLineConstruct);
    } else {
      //si on a pas le droit de construire on remet à 0 la qte construite ce tour ci (cas où finalement on annule une recherche pour faire autre chose)
      tour.constructionTour[i] = 0;
    }
  })
}

/**
 * Met à jour l'affichage de l'onglet mouvement
 */
function majTabMouvement() {

  document.getElementById("upgrade-reportCP").textContent = tour.reportCP;

  let temp = document.getElementById("tab-mouvement");
  let tabMouvement = temp.cloneNode(false);
  temp.parentElement.replaceChild(tabMouvement, temp);
  tour.constructionTotal.forEach((c, i) => {
    if (c > 0) {
      let div = document.createElement("div");
      div.setAttribute("class", "mouvement");
      let label = document.createElement("label");
      label.textContent = partie.dataConstruction[i].construction + ' - ' + partie.dataConstruction[i].libelle;
      label.setAttribute("class", "col1-mvt");
      div.appendChild(label);
      label = document.createElement("label");
      label.textContent = c;
      label.setAttribute("class", "col2-mvt");
      div.appendChild(label);
      let button = createButton("", "col3-mvt btn-small", "fa-solid fa-skull");
      button.addEventListener('click', function () { destruction(i) });
      div.appendChild(button);
      label = document.createElement("label");
      if (partie.dataConstruction[i].upgradable == 1) {
        label.textContent = calculUpgrade(i, 0);
      }
      label.setAttribute("class", "col4-mvt");
      label.style = "padding-left:7px;"
      div.appendChild(label);

      button = createButton("", "col5-mvt btn-small", "fa-solid fa-trash");
      button.addEventListener('click', function () { eraseUpgrade(i) });
      if (partie.dataConstruction[i].upgradable == 0) {
        button.setAttribute("style", "display:none;")
      }

      div.appendChild(button);
      tabMouvement.appendChild(div);
    }
  })

  majSelectUpgrade();
}


/**
 * 
 * @param {String} id : identifiant du bouton
 * @param {String} classes : class attribuées au bouton, séparées par une virgule
 * @param {String} icon : identifiant de l'icone font awesome
 * @returns renvoie le bouton créé, prêt à être attaché au DOM
 */
function createButton(id, classes, icon) {
  let b = document.createElement("button");
  b.setAttribute("class", classes);
  b.setAttribute("id", id);

  let i = document.createElement("i");
  i.setAttribute("class", icon);

  b.appendChild(i);

  return b;
}

/**
 * Méthode récursive permettant de cloner réellement un JSON 
 * @param {JSON} obj 
 * @returns un clone de obj
 */
function cloneJSON(obj) {
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

function calculMaintenance() {
  tour.maintenance = 0;
  tour.constructionTotal.forEach((qte, i) => {
    tour.maintenance += qte * partie.dataConstruction[i].maint;
  })
}

/**
 * Méthode qui créer un nouveau tour, historise l'ancien et mets à jour tout l'affichage
 * @returns rien du tout, juste pas de création de nouveau tour si le solde de CP est négatif
 */
function nouveauTour() {
  //Nouveau tour impossible si le solde de CP est négatif
  if (tour.remainingCP < 0) {
    alert('Nouveau tour impossible, la maison ne fait pas crédit');
    return;
  }
  if (tour.remainingCP > REPORT_MAX_CP) {
    if (!confirm('Attention report max de CP : ' + REPORT_MAX_CP + '\n\nTu veux vraiment perdre tes ressources ?')) {
      return;
    };
  }
  if (!confirm("Passer au tour suivant ?")) {
    return;
  }

  let newTurn = cloneJSON(tour);
  newTurn.numTour++;
  document.getElementById("numTour").textContent = "Tour : " + newTurn.numTour;
  newTurn.coutConstruction = 0;
  newTurn.coutTechno = 0;
  newTurn.futurMaintenance = 0;
  newTurn.maintenance = 0;
  newTurn.upgrade = [];
  newTurn.reportCP = tour.remainingCP;
  if (newTurn.reportCP > REPORT_MAX_CP) {
    newTurn.reportCP = REPORT_MAX_CP;
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
    if (tech.researched == 1) { // Si la techno a été rechechée sur le tour on refait apparaitre le bouton plus pour le nouveau tour
      document.getElementById(tech.tech + '_plus').removeAttribute("class", "not-visible");
      document.getElementById(tech.tech + '_moins').setAttribute("class", "not-visible");
      tech.researched = 0;
    }

  })


  histoTour.splice(0, 0, newTurn);
  tour = newTurn;
  calcul(true);

  //pour revenir sur l'onglet mouvement pour le début du nouveau tour
  document.getElementById("bt-tab-mouvement").click();
}

/**
 * Permet de mettre à jour la dropdown dans l'onglet mouvement des vaisseau upgradables durant cette phase de mouvement
 * Attache un listener sur l'event onchange pour mettre à jour la dropdown quantité
 */
function majSelectUpgrade() {

  let old = document.getElementById("select-upgrade");
  let dropDown = document.createElement("Select");
  //papa.replaceChild(dropDown, document.getElementById("select-upgrade"));
  dropDown.setAttribute("id", "select-upgrade");
  dropDown.setAttribute("class", "const-mvt-down");
  old.parentNode.replaceChild(dropDown, old);


  tour.constructionTotal.forEach((qte, i) => {
    if (qte > 0 && partie.dataConstruction[i].upgradable == 1) {
      let option = document.createElement("option");
      option.setAttribute('value', i);
      let optionText = document.createTextNode(partie.dataConstruction[i].construction);
      option.appendChild(optionText);
      dropDown.appendChild(option);
    }
  });

  dropDown.addEventListener("change", function () {
    majQteUpgrade(dropDown.value);
  });


  majQteUpgrade(dropDown.value);
}

/**
 * Permet de mettre à jour la dropdown dans l'onglet mouvement représentant la quantité de vaisseau à upgrade
 * @param {number} id : index du tableau correspondant à la construction concernée
 */
function majQteUpgrade(id) {
  let old = document.getElementById("qte-upgrade");
  let dropDown = document.createElement("Select");
  dropDown.setAttribute("id", "qte-upgrade");
  dropDown.setAttribute("class", "qte-mvt-down")
  old.parentNode.replaceChild(dropDown, old);
  for (let index = 0; index < tour.constructionTotal[id]; index++) {
    let option = document.createElement("option");
    option.setAttribute('value', index + 1);
    let optionText = document.createTextNode(index + 1);
    option.appendChild(optionText);
    dropDown.appendChild(option);
  }
}

/**
 * créé un upgrade pour les valeurs sélectionnées dans l'onglet mouvement
 */
function upgrade() {

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
    calcul(true);
  } else {


    showDialog(TEMPLATE_UPGRADE_INSUFFICIENT_CP)
    // alert("Pas assez de report de CP du tour précédant pour payer ce(s) upgrade(s)");
  }
}

function showDialog(templateId) {
  dialog.innerHTML = ''
  dialog.appendChild(getDialogContent(templateId));
  dialog.showModal();

}

function getDialogContent(templateId = null) {
  const template = document.querySelector(templateId);

  if (!template || template.nodeName !== 'TEMPLATE') return 'No content found!';

  console.log(template)

  return template.content.cloneNode(true);
}


function calculUpgrade(id, indexTour) {
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

function eraseUpgrade(id) {


  for (let index = 0; index < tour.upgrade.length; index++) {
    if (tour.upgrade[index].id == id) {
      tour.reportCP += partie.dataConstruction[id].hull * tour.upgrade[index].qte * tour.upgrade[index].prix;
      tour.upgrade.splice(index, 1);
      index--;

    }
  }
  calcul(true);
}


const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  if (entry.type === "reload" || entry.type === "navigate") {
    afficherMenu();
  }
});

function afficherMenu(e) {
  let div = document.getElementById("menu-div");
  initListePartie()
  div.style.display = "block";
  document.getElementById('nomNewPartie').value = "";
}

async function initListePartie() {
  let old = document.getElementById("liste-partie");
  let select = old.cloneNode(false);
  old.parentElement.replaceChild(select, old);


  const tab = await getListePartie();
  tab.forEach(nom => {
    let option = document.createElement("option");
    option.textContent = nom;
    option.value = nom;
    select.appendChild(option);
  });
}


function nouvellePartie() {
  //pour revenir sur l'onglet mouvement pour le début du nouveau tour
  document.getElementById("bt-tab-mouvement").click();

  const nom = document.getElementById('nomNewPartie').value;
  if (nom != "") {
    let div = document.getElementById("menu-div");
    div.style.display = "none";
    tour = { //Mon objet JSon tour qui fait tout, même le café. Après j'ai jamais dit qui le faisait bien...
      numTour: 1, //N° de tour
      reportCP: 0, // CP reportés du tour précédant
      totalCP: 0, // total des CP gagné durant ce tour de production
      colonieCP: 20, // CP gagnés grâce aux colonies et à la planète mère
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

    histoTour = [tour];//Comme son nom l'indique contient l'historique de tous les tours de France le [0] étant toujours le dernier inséré 

    partie = {
      histoTour: histoTour,
      dataConstruction: [].concat(dataConstructionBase),
      nomPartie: nom,
      version: 1,
      versionPrecedante: null,
      versionSuivante: null
    };






    let tailleTech = null;

    //parametrage de la partie avec les options avec les checkbox
    if (document.getElementById("ms-pipeline").checked) {
      ajoutConst(dataConstPipeline, tailleTech);
    }


    if (document.getElementById("boarding").checked) {
      tailleTech = ajoutTech(dataTechnoBoarding);
      ajoutConst(dataConstBoarding, tailleTech);
    }
    if (document.getElementById("raider").checked) {
      tailleTech = ajoutTech(dataTechnoCloaking);
      ajoutConst(dataConstRaider, tailleTech);

      tailleTech = ajoutTech(dataTechnoScanner);
    }
    if (document.getElementById("fighter").checked) {
      tailleTech = ajoutTech(dataTechnoFighter);
      ajoutConst(dataConstCarrier, tailleTech);
      ajoutConst(dataConstFighter, tailleTech);

      tailleTech = ajoutTech(dataTechnoDefense);
    }

    if (document.getElementById("mine").checked) {

      tailleTech = ajoutTech(dataTechnoMine);
      ajoutConst(dataConstMine, tailleTech);

      tailleTech = ajoutTech(dataTechnoMineSw);
      ajoutConst(dataConstMineSw, tailleTech);
    }

    if (document.getElementById("titan").checked) {
      let id = getIdConstruction("DN");
      partie.dataConstruction.splice(id + 1, 0, [].concat(dataConstTitan)[0]);

      tour.dataTechno[0].grid.push([7, 30]);
    }

    if (document.getElementById("harvest-nebulae").checked) {
      tour.dataTechno[6].grid.push([2, 25]);
    }

    if (document.getElementById("reaction-move").checked) {
      tour.dataTechno[7].grid.push([2, 15]);
    }

    if (document.getElementById("fast-bc").checked) {
      ajoutTech(dataTechnofastBC);
    }

    if (document.getElementById("infantry").checked) {
      tailleTech = ajoutTech(dataTechnoSecurity);
      tailleTech = ajoutTech(dataTechnoGround);

      dataConstInfantry.forEach(t => {
        ajoutConst(t, tailleTech);
      })
    }


    for (let index = 0; index < partie.dataConstruction.length; index++) {
      partie.dataConstruction[index].id = index;
      tour.constructionTour[index] = 0;
      tour.constructionTotal[index] = 0;
    }

    //construction de départ
    tour.constructionTotal[getIdConstruction('SY')] = 4;
    tour.constructionTotal[getIdConstruction('CO')] = 3;
    tour.constructionTotal[getIdConstruction('SC')] = 3;
    tour.constructionTotal[getIdConstruction('Mi')] = 1;

    calculMaintenance();

    let request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {
      let db = event.target.result;
      const transaction = db.transaction(["partie", "versions"], "readwrite");
      let objectStore = transaction.objectStore("partie");
      const requestUpdate = objectStore.add(partie);
      requestUpdate.onerror = (event) => {
        console.log('echec creation partie');
      };
      requestUpdate.onsuccess = (event) => {
        console.log('Création partie');
        majTechno();
        majConstrucDispo();

        calcul(true);

        document.getElementById("numTour").textContent = "Tour : " + tour.numTour;
        document.getElementById("nomPartie").textContent = partie.nomPartie;
      };
      

      objectStore = transaction.objectStore("versions");
      objectStore.clear();
      objectStore.add(partie);

    };

    request.onerror = (event) => {
      console.log('Création - Echec ouverture BDD');
    }



  } else {
    alert("C'est mieux avec un nom de partie...");
  }

}

function ajoutTech(dataTech) {
  let tailleTech = tour.dataTechno.length;
  if (dataTech != null) {
    tour.dataTechno[tailleTech] = [].concat(dataTech)[0];
    tour.dataTechno[tailleTech].id = tailleTech;
  }
  return tailleTech
}

function ajoutConst(dataConst, indexReqTech) {
  let tailleConst = partie.dataConstruction.length;
  partie.dataConstruction[tailleConst] = [].concat(dataConst)[0];
  partie.dataConstruction[tailleConst].id = tailleConst;
  if (indexReqTech != null) {
    partie.dataConstruction[tailleConst].requiredTech[0][0] = indexReqTech;
  }
}

function pressingDown(e) {
  e.preventDefault();
  let div = document.getElementById("hold-div");
  div.style.display = "block";
  let old = document.getElementById("hold-tech");
  let d = old.cloneNode(false);
  old.parentElement.replaceChild(d, old);
  tour.dataTechno.forEach(t => {
    let p = document.createElement("p");
    p.innerHTML = t.tech + " - " + t.libelle
    d.append(p);
  })
}

function notPressingDown(e) {
  let div = document.getElementById("hold-div");
  div.style.display = "none";
}

function pressingDownHisto(e) {
  e.preventDefault();
  let div = document.getElementById("hold-div");
  div.style.display = "block";
  let old = document.getElementById("hold-tech");
  let d = old.cloneNode(false);
  old.parentElement.replaceChild(d, old);
  let index = partie.histoTour.length - parseInt(e.target.textContent);
  partie.histoTour[index].constructionTotal.forEach((c, i) => {
    if (c > 0 && partie.dataConstruction[i].upgradable == 1) {
      let div = document.createElement("div");
      div.setAttribute("class", "mouvement");
      let label = document.createElement("label");
      label.textContent = partie.dataConstruction[i].construction + ' - ' + partie.dataConstruction[i].libelle;
      label.setAttribute("class", "col1-mvt");
      div.appendChild(label);
      label = document.createElement("label");
      label.textContent = c;
      label.setAttribute("class", "col2-mvt");
      div.appendChild(label);
      let button = createButton("", "col3-mvt btn-small", "fa-solid fa-skull");
      div.appendChild(button);
      label = document.createElement("label");
      if (partie.dataConstruction[i].upgradable == 1) {
        label.textContent = calculUpgrade(i, index);
      }
      label.setAttribute("class", "col4-mvt");
      label.style = "padding-left:7px;"
      div.appendChild(label);

      button = createButton("", "col5-mvt btn-small", "fa-solid fa-trash");
      if (partie.dataConstruction[i].upgradable == 0) {
        button.setAttribute("style", "display:none;")
      }

      div.appendChild(button);
      d.appendChild(div);
    }
  })
}

function notPressingDownHisto(e) {
  let div = document.getElementById("hold-div");
  div.style.display = "none";
}


function createHistorique() {
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


/* ************************************************************************************* 
Raccrochage des fucntions au scope window. Nécessaire à cause de la modularisation du js
qui limite la portée des éléments au script.
*                           ***************                                              */

window.ctlzy = ctlzy
window.afficherMenu = afficherMenu
window.nouvellePartie = nouvellePartie
window.nouveauTour = nouveauTour
