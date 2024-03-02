import './data.js' ;
import { getListePartie } from './db.js';
import { destruction, eraseUpgrade } from './event.js';
import { calculUpgrade, chargerPartie, enregistrerPartie, getIdConstruction, majConstrucDispo, nouvellePartie } from './metier/metier.js';
import { majTabMouvement, majTechno } from './ui.js';



/************************************************************************************************************/
/* Initialisation des données la partie en fonction des choix de l'utilisateur
/************************************************************************************************************/
//TODO A faire plus tard, déjà essaye de le faire marcher avec le jeux de base ...


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
let request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
  // Handle errors.
};

//onupgradeneeded est appelé lors d'une création ou d'une mise à jour si nouvelle version
request.onupgradeneeded = function (event) {
  //Création de la base de données

  let db = event.target.result;
  if (!db.objectStoreNames.contains('partie')) {
    // s'il n'y a pas de magasin "partie"
    db.createObjectStore('partie', { keyPath: 'nomPartie' }); // créez-le
  }
  if (!db.objectStoreNames.contains('versions')) {
    // s'il n'y a pas de magasin "versions"
    let objStore = db.createObjectStore("versions", { keyPath: "version" });
  }

};







