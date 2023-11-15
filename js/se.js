/***********************************************************************************************************
Variables contenant toutes les données de référence du jeu
*************************************************************************************************************/
const  technoData =[
  {id: "SS1", tech: "SS", version: "1", libelle:"Ship Size", level : [1,0,2,10,3,15,4,20,5,20,6,20]},
  {id: "A1", tech: "A", version: "1", libelle:"Attack", level : [0,0,1,20,2,30,3,25]},
  {id: "D1", tech: "D", version: "1", libelle:"Defense", level : [0,0,1,20,2,30,3,25]},
]
 ;



/***********************************************************************************************************
Gestion de la BDD du navigateur
*************************************************************************************************************/

/* Initialisation de la base*/
const dbName = "se";

const request = indexedDB.open(dbName, 2);

request.onerror = (event) => {
  // Handle errors.
};
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore("technologie", { keyPath: "id" });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = (event) => {
    // Store values in the newly created objectStore.
    const technoObjectStore = db
      .transaction("technologie", "readwrite")
      .objectStore("technologie");
    technoData.forEach((techno) => {
      technoObjectStore.add(techno);
    });
  };
};








/***********************************************************************************************************
Gestion des onglets
*************************************************************************************************************/
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

/***********************************************************************************************************
gestion de l'accordeon panel
*************************************************************************************************************/
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

/***********************************************************************************************************
gestion des boutons PRODUCTION 
*************************************************************************************************************/

function modifValeurNum(id, valeur){
    let nbre = document.getElementById(id);
    nbre.value = parseInt(nbre.value) + valeur;
    calculEconomie();
}

function calculEconomie(){
  let report = parseInt(document.getElementById("report").value);
  let cp = parseInt(document.getElementById("colonie").value);
  let minerai = parseInt(document.getElementById('minerai').value);
  let pipeline = parseInt(document.getElementById('pipeline').value);
  let maint = parseInt(document.getElementById('maintenance').value);
  let init = parseInt(document.getElementById('init').value);
  let total = report + cp + minerai + pipeline - maint - init;

  document.getElementById('bt_economie').innerHTML = "Economie <br>CP :  " + total+"("+total+")" + " - Maint : " + maint + " Init : "+init;
}
