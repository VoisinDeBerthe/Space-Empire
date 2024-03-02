/* ################################# 
    Onglet HISTORIQUE
   #################################  */



   

/* ################################# 
    Gestion  HISTORIQUE
   #################################  */

   /**
    * Desactive le ControleY et active le ControleZ (Boutons)
    */
   export function majBtnHistoAfterSaveUI() {
    document.getElementById('ctlz').removeAttribute("disabled");
    document.getElementById('ctly').setAttribute("disabled", "true");
}