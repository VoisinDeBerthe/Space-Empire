
function openDBTransaction(tabObjectStore, etat) {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(constante.DB_NAME, constante.DB_VERSION);

        request.onsuccess = (event) => {
            let db = event.target.result;
            resolve(db.transaction(tabObjectStore, etat));
        }
        request.onerror = (event) => {
            reject('Erreur IndexDB')
        }
    })
}

/**
 * Renvoie la liste des partie sous forme de tableau de String
 * @returns Une promesse donnant la liste des parties enregistrées dans ce navigateur
 */
export function getListePartie() {
    return new Promise((resolve, reject) => {

        openDBTransaction(["partie"], "readonly").then(transaction => {
            const objectStore = transaction.objectStore("partie");
            const requestUpdate = objectStore.getAllKeys();
            requestUpdate.onerror = (event) => {
                console.log('echec lors du chargement des noms des parties enregistrées');
            };
            requestUpdate.onsuccess = (event) => {
                console.log('Récupération des noms des parties enregistrées');
                resolve(event.target.result);
            };
        })

    })
};


/**
 * 
 * @param {String} nomPartie Nom de la partie a chargé
 * @returns L'objet partie (cf data.js pour la structure de l'objet)
 */
export async function getPartie(nomPartie) {
    return new Promise((resolve, reject) => {
        openDBTransaction(["partie"], "readonly").then(transaction => {
            const objectStore = transaction.objectStore("partie");
            const requestUpdate = objectStore.get(nomPartie);
            requestUpdate.onerror = (event) => {
                reject('echec lors du chargement de la partie : ' + nomPartie);
            };
            requestUpdate.onsuccess = (event) => {
                console.log('Chargement de la partie :' + nomPartie);
                resolve(event.target.result);
            };
        })
    })
}

export function saveNewPartie(partie) {
    return new Promise((resolve, reject) => {
        openDBTransaction(["partie"], "readwrite").then(transaction => {
            let objectStore = transaction.objectStore("partie");
            const requestUpdate = objectStore.add(partie);
            requestUpdate.onerror = (event) => {
                reject('echec creation partie');
            };
            requestUpdate.onsuccess = (event) => {
                resolve();
            };
        })
    })
}

export function saveHistorique(partie) {
    return new Promise((resolve, reject) => {
        openDBTransaction(["versions"], "readwrite").then(transaction => {
            const objectStore = transaction.objectStore("versions");
            objectStore.count(partie.version).onsuccess = (event => {
                if (event.target.result > 0) {
                    objectStore.put(partie).onsuccess = (() => { resolve(); })
                } else {
                    objectStore.add(partie).onsuccess = (() => { resolve(); })
                }
            });
        })
    })
}

export function clearHistorique() {
    return new Promise((resolve, reject) => {
        openDBTransaction(["versions"], "readwrite").then(transaction => {
            const objectStore = transaction.objectStore("versions");
            objectStore.clear().onsuccess = (() => {
                resolve();
            });
        })
    })
}

export function savePartie(partie) {
    return new Promise((resolve, reject) => {
        openDBTransaction(["partie"], "readwrite").then(transaction => {
            let objectStore = transaction.objectStore("partie");
            const requestUpdate = objectStore.put(partie);
            requestUpdate.onerror = (event) => {
                reject('echec creation partie : ' + partie);
            };
            requestUpdate.onsuccess = (event) => {
                resolve();
            };
        })
    })
}


export function deletePartie(partie) {
    return new Promise((resolve, reject) => {
        openDBTransaction(["partie"], "readwrite").then(transaction => {
            let objectStore = transaction.objectStore("partie");
            const requestUpdate = objectStore.delete(partie);
            requestUpdate.onerror = (event) => {
                reject('echec suppression partie :' + partie);
            };
            requestUpdate.onsuccess = (event) => {
                resolve();
            };
        })
    })
}