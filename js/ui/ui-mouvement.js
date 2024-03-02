import { destruction, eraseUpgrade } from "../event.js";
import { calculUpgradeMetier } from "../metier/metier.js";
import { ui } from "./ui-element.js";
import { createButton } from "./ui.js";


/* ################################# 
        Onglet MOUVEMENT
   #################################  */




/**
* Met à jour l'affichage de l'onglet mouvement
*/
export function majTabMouvementUI(partie, tour) {

    ui.onglet.mouvement.reportCPElt.textContent = tour.reportCP;

    let temp = ui.onglet.mouvement.bodyElt;
    let tabMouvement = temp.cloneNode(false);
    temp.parentElement.replaceChild(tabMouvement, temp);
    ui.onglet.mouvement.bodyElt = tabMouvement;
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
                label.textContent = calculUpgradeMetier(i, 0);
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

    majSelectUpgrade(tour);
}

/**
* Permet de mettre à jour la dropdown dans l'onglet mouvement des vaisseau upgradables durant cette phase de mouvement
* Attache un listener sur l'event onchange pour mettre à jour la dropdown quantité
*/
function majSelectUpgrade(tour) {

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
