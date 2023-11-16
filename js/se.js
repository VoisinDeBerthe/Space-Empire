/************************************************************************************************************/
/* Variables contenant toutes les données de référence du jeu
/************************************************************************************************************/
const dataTechnoBase = [
  { tech: "SS", researched: 0, libelle: "Ship Size", level: 0, grid: [[1, ], [2, 10], [3, 15], [4, 20], [5, 20], [6, 20]] },
  { tech: "A", researched: 0, libelle: "Attack", level: 0, grid: [[0, ], [1, 20], [2, 30], [3, 25]] },
  { tech: "D", researched: 1, libelle: "Defense", level: 1, grid: [[0, ], [1, 20], [2, 30], [3, 25]] },
  { tech: "Ta", researched: 0, libelle: "Tactic", level: 0, grid: [[0, ], [1, 15], [2, 15]] },
  { tech: "M", researched: 0, libelle: "Move", level: 0, grid: [[1, ], [2, 20], [3, 25], [4, 25], [5, 25], [6, 20], [7, 20]] },
  { tech: "SS", researched: 0, libelle: "Ship Yard", level: 0, grid: [[1, ], [2, 20], [3, 25]] },
  { tech: "Te", researched: 0, libelle: "Move", level: 0, grid: [[0, ], [1, 20]] },
  { tech: "E", researched: 0, libelle: "Exploration", level: 0, grid: [[0, ], [1, 15]] },
]
  ;

/************************************************************************************************************/
/* Initialisation des données la partie en fonction des choix de l'utilisateur
/************************************************************************************************************/
//TODO A faire plus tard, déjà essaye de le faire marcher avec le jeux de base ...


/************************************************************************************************************/
/* Modification du DOM en fonction de l'initialisation
/************************************************************************************************************/

//Aller on le tente avec les technologies. Franchement j'y crois pas trop mais si ça marche ben... ça marche quoi.

let template = document.getElementById("tech-template");

dataTechnoBase.forEach((el, i) => {
  let test = template.cloneNode(true);
  test.setAttribute("id",el.tech);
  let label = document.createElement("label");
  label.textContent = el.tech;
  label.title = el.libelle;
  test.appendChild(label);

  let button = document.createElement("button");
  button.textContent = '+';
  if (el.researched == 1) {
    button.setAttribute("class", "not-visible");
  }
  test.appendChild(button);

  button = document.createElement("button");
  button.textContent = '-';
  if (el.researched == 0) {
    button.setAttribute("class", "not-visible");
  }
  test.appendChild(button);

  button = document.createElement("button");
  button.textContent = 'Wreck';
  test.appendChild(button);

  el.grid.forEach((nivTech, j) => {
    let nivTechno = document.createElement("p");
    let prixTechno = document.createElement("span");
    prixTechno.setAttribute("class", "indice");
    prixTechno.textContent = nivTech[1];
    nivTechno.textContent = nivTech[0];
    if (j == el.level) {
      nivTechno.setAttribute("class", "label-tech");
    }

    test.appendChild(nivTechno);
    nivTechno.appendChild(prixTechno);

  })


  template.parentNode.appendChild(test);
})

//Suppression du template vide
template.remove();




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

function modifValeurNum(id, valeur) {
  let nbre = document.getElementById(id);
  nbre.value = parseInt(nbre.value) + valeur;
  calculEconomie();
}

function modifValeurNum(id){

}

function calculEconomie() {
  let report = parseInt(document.getElementById("report").value);
  let cp = parseInt(document.getElementById("colonie").value);
  let minerai = parseInt(document.getElementById('minerai').value);
  let pipeline = parseInt(document.getElementById('pipeline').value);
  let maint = parseInt(document.getElementById('maintenance').value);
  let init = parseInt(document.getElementById('init').value);
  let total = report + cp + minerai + pipeline - maint - init;

  document.getElementById('bt_economie').innerHTML = "Economie <br>CP :  " + total + "(" + total + ")" + " - Maint : " + maint + " Init : " + init;

}
