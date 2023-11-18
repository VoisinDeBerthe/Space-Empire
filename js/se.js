/************************************************************************************************************/
/* Variables contenant toutes les données de référence du jeu
/************************************************************************************************************/
const dataTechnoBase = [
  { id: 0, tech: "SS", researched: 0, libelle: "Ship Size", level: 3, grid: [[1,], [2, 10], [3, 15], [4, 20], [5, 20], [6, 20]] },
  { id: 1, tech: "A", researched: 0, libelle: "Attack", level: 0, grid: [[0,], [1, 20], [2, 30], [3, 25]] },
  { id: 2, tech: "D", researched: 0, libelle: "Defense", level: 0, grid: [[0,], [1, 20], [2, 30], [3, 25]] },
  { id: 3, tech: "Ta", researched: 0, libelle: "Tactic", level: 0, grid: [[0,], [1, 15], [2, 15]] },
  { id: 4, tech: "M", researched: 0, libelle: "Move", level: 0, grid: [[1,], [2, 20], [3, 25], [4, 25], [5, 25], [6, 20], [7, 20]] },
  { id: 5, tech: "SY", researched: 0, libelle: "Ship Yard", level: 0, grid: [[1,], [2, 20], [3, 25]] },
  { id: 6, tech: "Te", researched: 0, libelle: "Move", level: 0, grid: [[0,], [1, 20]] },
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
  { id: 6, construction: "CO", requiredTech: [[0, 1]], libelle: "Colony Ship", hull: 1, cost: 12, maint: 0, maxUnit: 0, upgradable: 0 },
  { id: 7, construction: "Ba", requiredTech: [[0, 1]], libelle: "Base", hull: 3, cost: 12, maint: 0, maxUnit: 4, upgradable: 0 },
  { id: 8, construction: "Mi", requiredTech: [[0, 1]], libelle: "Miner", hull: 1, cost: 5, maint: 0, maxUnit: 0, upgradable: 1 },
  { id: 9, construction: "De", requiredTech: [[0, 1]], libelle: "Decoy", hull: 0, cost: 1, maint: 0, maxUnit: 4, upgradable: 1 },
  { id: 10, construction: "SY", requiredTech: [[0, 1]], libelle: "Ship Yard", hull: 1, cost: 6, maint: 0, maxUnit: 36, upgradable: 0 }
]
  ;

/************************************************************************************************************/
/* Initialisation des données la partie en fonction des choix de l'utilisateur
/************************************************************************************************************/
//TODO A faire plus tard, déjà essaye de le faire marcher avec le jeux de base ...

/**
 * Variables globales
 */
var tour = { numTour: 1, totalCP: 0, remainingCP: 0, reportCP: 0, coutTechno: 0, coutConstruction: 0, maintenance: 0, futurMaintenance: 0 };
var constructionTotal = new Array(dataConstructionBase.length);;
var constructionTour = new Array(dataConstructionBase.length);
for (let index = 0; index < dataConstructionBase.length; index++) {
  constructionTour[index] = 0;
  constructionTotal[index] = 0;
}

//construction de départ
constructionTotal[getIdConstruction('SY')] = 5;
constructionTotal[getIdConstruction('CO')] = 3;
constructionTotal[getIdConstruction('SC')] = 3;
constructionTotal[getIdConstruction('Mi')] = 1;

// la méthode calcul() ici permet de mettre à jour tous les boutons du collapse avec les valeurs initialisées
calcul();

/************************************************************************************************************/
/* Modification du DOM en fonction de l'initialisation
/************************************************************************************************************/

//Aller on le tente avec les technologies. Franchement j'y crois pas trop mais si ça marche ben... ça marche quoi.

let template = document.getElementById("tech-template");

dataTechnoBase.forEach((el, i) => {
  let newLineTech = template.cloneNode(true);
  let idNewLineTech = el.id + '_' + el.tech;
  newLineTech.setAttribute("id", idNewLineTech);
  newLineTech.setAttribute("class", "technology");
  let label = document.createElement("label");
  label.textContent = el.tech;
  label.title = el.libelle;
  label.setAttribute("class", "libelle");
  newLineTech.appendChild(label);

  //création d'une div pour regrouper les boutons plus et moins dans la deuxième colonne de la ligne de techno
  let div = document.createElement('div');
  div.setAttribute('class', 'tab-techno');

  let button = createButton(el.tech + "_plus","bt","fa fa-plus");
  button.addEventListener('click', function () { modifNivTech(idNewLineTech, 'plus') });
  if (el.researched == 1) {
    button.setAttribute("class", "not-visible");
  }
  div.appendChild(button);

  button = createButton(el.tech + "_moins","bt","fa fa-minus");
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
  button.setAttribute("class", "wreck");
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
  template.parentNode.appendChild(newLineTech);
})

//Suppression du template vide
template.remove();

//Bon ben puisque ça marche on passe aux constructions... même combat

majConstrucDispo();


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
  let nbre = document.getElementById(id);
  nbre.value = parseInt(nbre.value) + valeur;
  calcul();
}

//appelé par tous les boutons dans le bloc Technologie
function modifNivTech(idNewLineTech, type) {
  let tab = idNewLineTech.split('_');
  let boutonPlus = document.getElementById(tab[1] + '_plus');
  let boutonMoins = document.getElementById(tab[1] + '_moins');
  let level = dataTechnoBase[tab[0]].level;

  switch (type) {
    case 'plus':
      boutonPlus.setAttribute("class", "not-visible");
      boutonMoins.removeAttribute("class", "not-visible");
      dataTechnoBase[tab[0]].level = level + 1;
      dataTechnoBase[tab[0]].researched = 1;
      document.getElementById(dataTechnoBase[tab[0]].tech + '_' + (level + 1)).setAttribute("class", "label-tech");
      document.getElementById(dataTechnoBase[tab[0]].tech + '_' + level).removeAttribute("class", "label-tech");

      break;
    case 'moins':
      boutonMoins.setAttribute("class", "not-visible");
      boutonPlus.removeAttribute("class", "not-visible");
      dataTechnoBase[tab[0]].level = level - 1;
      dataTechnoBase[tab[0]].researched = 0;
      document.getElementById(dataTechnoBase[tab[0]].tech + '_' + (level - 1)).setAttribute("class", "label-tech");
      document.getElementById(dataTechnoBase[tab[0]].tech + '_' + level).removeAttribute("class", "label-tech");

      break;
    default: /* wreck*/
      if (confirm("Gagner un niveau en " + dataTechnoBase[tab[0]].libelle + " grâce au remorquage d'une épave ?")) {
        dataTechnoBase[tab[0]].level = level + 1;
        document.getElementById(dataTechnoBase[tab[0]].tech + '_' + (level + 1)).setAttribute("class", "label-tech");
        document.getElementById(dataTechnoBase[tab[0]].tech + '_' + level).removeAttribute("class", "label-tech");
        console.log(dataTechnoBase[tab[0]].grid.length);
        console.log(level + 1);
        if (dataTechnoBase[tab[0]].grid.length == level + 2) {
          gestionNivMax(tab[1]);
        }
      }
  }

  calcul();
}

//Permet de désactiver les boutons d'une technologie lorsqu'elle est niveau max
function gestionNivMax(id) {
  let boutonPlus = document.getElementById(id + '_plus');
  let boutonMoins = document.getElementById(id + '_moins');
  let boutonWreck = document.getElementById(id + '_wreck');
  boutonPlus.setAttribute('disabled', true);
  boutonMoins.setAttribute('disabled', true);
  boutonWreck.setAttribute('disabled', true);
}

//est appelé par tous les boutons du bloc construction
function modifConstruction(idNewLineConst, type) {

  let tab = idNewLineConst.split('_');
  let boutonPlus = document.getElementById(tab[1] + '_plus');
  let boutonMoins = document.getElementById(tab[1] + '_moins');
  if (type == 'plus') {
    if (getHullConstructTurn() + dataConstructionBase[tab[0]].hull > getHullCapacity()) {
      alert("Capacité de construction dépassée (max : " + getHullCapacity() + ')');
      return
    }
    constructionTour[tab[0]]++;

  } else {
    constructionTour[tab[0]]--;
  }

  calcul();
}

//Mets àjour l'affichage sur tous les bandeaux avec les valeurs actuelles en mémoires
function calcul() {
  calculTechnologie();
  calculConstruction();
  majConstrucDispo();
  calculEconomie();
}

function calculEconomie() {
  let report = parseInt(document.getElementById("report").value);
  let cp = parseInt(document.getElementById("colonie").value);
  let minerai = parseInt(document.getElementById('minerai').value);
  let pipeline = parseInt(document.getElementById('pipeline').value);
  let maint = parseInt(document.getElementById('maintenance').value);
  let init = parseInt(document.getElementById('init').value);
  tour.totalCP = report + cp + minerai + pipeline - maint - init;
  tour.remainingCP = tour.totalCP - tour.coutTechno - tour.coutConstruction;
  document.getElementById('bt_economie').innerHTML = "Economie <br>CP :  " + tour.remainingCP + "(" + tour.totalCP + ")" + " - Maint : " + maint + " Init : " + init;

}

function calculTechnologie() {
  tour.coutTechno = 0;
  let stringBandeau = " ( "
  dataTechnoBase.forEach((el, i) => {
    if (el.researched) {
      tour.coutTechno += el.grid[el.level][1];
      stringBandeau += el.tech + ":" + (el.level + el.grid[0][0]) + ' - ';
      if (dataTechnoBase.length > i) {

      } else {

      }
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

function calculConstruction() {
  tour.coutConstruction = 0;
  tour.futurMaintenance = 0;

  let stringBandeau = " ( "
  constructionTour.forEach((qte, i) => {
    if (qte > 0) {
      tour.coutConstruction += dataConstructionBase[i].cost * qte;
      stringBandeau += dataConstructionBase[i].construction + ":" + qte + ' - ';
      tour.futurMaintenance += dataConstructionBase[i].maint * qte;
      if (dataTechnoBase.length > i) {

      } else {

      }
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


/**Renvoie le niveau d'une technologie donnée en paramètre. renvoie -1 si la techno n'est pas dans connue */
function getNiveauTech(tech) {
  let resultat = -1;

  dataTechnoBase.forEach(el => {
    //parfois le niveau de départ est 0, parfois 1 dans le tableau (grid), l'attribut level fais toujours référence 
    //au premier niveau avec 0 comme valeur, c'est pourquoi on y ajoute le premier élément de la grille (soit 0, soit 1) 
    if (el.tech == tech) {
      resultat = (el.level + parseInt(el.grid[0]));
    }
  })
  return resultat;
}

/**Retourne l'index d'une construction dans le tableau dataConstruction */
function getIdConstruction(construction) {
  let resultat = 0;
  dataConstructionBase.forEach(el => {
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
  dataConstructionBase[idConstruct].requiredTech.forEach(req => {
    if (dataTechnoBase[req[0]].level + parseInt(dataTechnoBase[req[0]].grid[0]) >= req[1]) {
      resultat = resultat & true;
    } else {
      resultat = false;
    }
  })

  return resultat;
}

/**
 * Renvoie la capacité de construction de point de coque totale en tenant compte 
 * du nombre de chantier et de leurs niveau technologique
 * @returns 
 */
function getHullCapacity() {

  let resultat = constructionTotal[getIdConstruction('SY')];
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
 * @returns 
 */
function getHullConstructTurn() {
  result = 0;
  constructionTour.forEach((qte, i) => {
    result += dataConstructionBase[i].hull * qte;
  })
  return result;
}



/**On clone le body des constructions mais sans aucune ligne puis on reconstruit tout avec les data
 * en fonction du niveau de ShipSize
 */
function majConstrucDispo() {
  //on supprime toutes 
  let template = document.getElementById("body-construction");
  let newBodyConstruction = template.cloneNode(false);
  template.parentNode.replaceChild(newBodyConstruction, template);

  dataConstructionBase.forEach((el, i) => {
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

      button = createButton(el.construction + "_moins","bt-moins","fa fa-minus");
      button.addEventListener('click', function () { modifConstruction(idNewLineConstruct, 'moins') });
      if (constructionTour[i] == 0) {
        button.setAttribute("disabled", true);
      }
      newLineConstruct.appendChild(button);


      button = createButton(el.construction + "_plus","bt-plus","fa fa-plus");
      button.addEventListener('click', function () { modifConstruction(idNewLineConstruct, 'plus') });
      if (constructionTour[i] + constructionTotal[i] == el.maxUnit && el.maxUnit != 0) {
        button.setAttribute("disabled", true);
      }
      newLineConstruct.appendChild(button);

      label = document.createElement("label");
      label.textContent = constructionTour[i];
      label.setAttribute("id", el.construction + "_enCours_" + i);
      label.setAttribute("class", "qte-courante");
      newLineConstruct.appendChild(label);

      label = document.createElement("label");
      label.textContent = '( ' + constructionTotal[i] + ' )';
      label.setAttribute("id", el.construction + "_total_" + i);
      label.setAttribute("class", "qte-totale");
      newLineConstruct.appendChild(label);

      newBodyConstruction.appendChild(newLineConstruct);
    } else {
      //si on a pas le droit de construire on remet à 0 la qte construite ce tour ci (cas où finalement on annule une recherche pour faire autre chose)
      constructionTour[i] = 0;
    }
  })

}
/**
 * 
 * @param {String} id : identifiant du bouton
 * @param {String} classes : class attribuées au bouton, séparées par une virgule
 * @param {String} icon : identifiant de l'icone font awesome
 * @returns renvoie le bouton créé, prêt à être attaché au DOM
 */
      function createButton(id,classes,icon){
        let b = document.createElement("button");
        b.setAttribute("class",classes);
        b.setAttribute("id",id);

        let i = document.createElement("i");
        i.setAttribute("class",icon);

        b.appendChild(i);

        return b;
      }