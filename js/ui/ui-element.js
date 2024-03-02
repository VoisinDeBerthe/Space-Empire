const numTourElement = document.getElementById('numTour');
const nomElement = document.getElementById('nomPartie');

const mouvementTabElement = document.getElementById('bt-tab-mouvement');
const mouvementBodyElement = document.getElementById('body-mouvement');
const mouvementReportElement = document.getElementById("upgrade-reportCP");

const prodTechnosElement = document.getElementById('tab-techno');
const prodBTTechnosElement = document.getElementById('bt_technologie');


const prodConstructsElement = document.getElementById("body-construction");
const prodReportElement = document.getElementById("report");
const prodColonieElement = document.getElementById("colonie");
const prodMineraiElement = document.getElementById("minerai");
const prodPipelineElement = document.getElementById("pipeline");
const prodMaintenanceElement = document.getElementById("maintenance");
const prodInitElement = document.getElementById("init");
const prodBtEconomieElement = document.getElementById("bt_economie");

const prodBtConstructionElement = document.getElementById('bt_construction');



const menuElement = document.getElementById('menu-div');
const menuListePartieElement = document.getElementById('liste-partie');
const menuNomNewPartieElement = document.getElementById('nomNewPartie');
const menuAvancePipeline = document.getElementById('ms-pipeline');
const menuAvanceRaider = document.getElementById('raider');
const menuAvanceFighter = document.getElementById('fighter');
const menuAvanceMine = document.getElementById('mine');
const menuCloseEncBoarding = document.getElementById('boarding');
const menuCloseEncTitan = document.getElementById('titan');
const menuCloseEncHarvest = document.getElementById('harvest-nebulae');
const menuCloseEncReaction = document.getElementById('reaction-move');
const menuCloseEncFastBC = document.getElementById('fast-bc');
const menuCloseEncInfantry = document.getElementById('infantry');


const holdDiv = document.getElementById('hold-div');
const holdDivTech = document.getElementById('hold-tech');

export const ui = {
    partie: {
        numTourElt: numTourElement,
        nomElt: nomElement
    },
    onglet: {
        mouvement: {
            tabElt: mouvementTabElement,
            bodyElt: mouvementBodyElement,
            reportCPElt: mouvementReportElement
        },
        production: {
            economie:{
                collapseElt : prodBtEconomieElement,
                reportElt: prodReportElement,
                colonieElt: prodColonieElement,
                mineraiElt: prodMineraiElement,
                pipelineElt: prodPipelineElement,
                maintenanceElt: prodMaintenanceElement,
                initiativeElt : prodInitElement
            },
            technos: {
                collapseElt: prodBTTechnosElement,
                bodyElt:prodTechnosElement
            },
            contructions: {
                collapseElt: prodBtConstructionElement,
                bodyElt: prodConstructsElement
            }
        },
        historique: {

        }
    },
    menu: {
        elt: menuElement,
        listePartieElt: menuListePartieElement,
        nomNewPartie: menuNomNewPartieElement,
        avance: {
            pipelineElt: menuAvancePipeline,
            raiderElt: menuAvanceRaider,
            fighterElt: menuAvanceFighter,
            mineElt: menuAvanceMine
        },
        closeEncounter: {
            boardingElt: menuCloseEncBoarding,
            titanElt: menuCloseEncTitan,
            harvestNebulaeElt: menuCloseEncHarvest,
            reactionMouvElt: menuCloseEncReaction,
            fastBCElt: menuCloseEncFastBC,
            infantryElt: menuCloseEncInfantry
        },
        replicator: {

        }
    },
    hold: {
        divElt: holdDiv,
        divTechElt: holdDivTech
    }
}
