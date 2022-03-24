const img_background = 'BCK_Ground.jpg'
const date = require('./date_utils')

/************************************************************************
 * Génération du html de la page principale
 ************************************************************************/
function PageHTML(pTaskNew, pTaskList, pAfficDescr){

    let html = `
    <html>
        <head>
        <!-- Caratères accentués-->
        <meta charset="utf-8"/>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Bootstrap JavaScript -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Bootstrap Icons -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
        <link href="style.css" rel="stylesheet">
        </head>
        <body>
            <div class="container" style="margin-left:350px; margin-right:0">
                <div id="entete" class="row bg-danger">
                    <h1>Bienvenue dans votre pense<span style="color:grey"><em>[-pas-si]</em></span>-bête !</h1>
                    <h4><em>L'oubli est la condition indispensable de la mémoire (Alfred Jarry)</em></h4>
                </div>
                <div class="row">
                    <div id="formulaire" class="col-3 d-none d-sm-block">
                        ${pTaskNew}
                    </div>
                    <div id="liste" class="col-9 col-sm-6 offset-md-3">
                        <h4>Liste des tâches</h4>
                        <div style="height: 75vh; overflow:auto">
                            ${pTaskList}
                        </div>
                    </div>
                </div>
            </div>
            <script>
                ${pAfficDescr}
            </script>
        </body>
    </html>`

    return html
}

/************************************************************************
 * Génération du html pour le formulaire de création d'une nouvelle tâche
 ************************************************************************/
function newTask(dateJour){

    let html = `
    <form method="POST" action="/submit" enctype="application/x-www-form-urlencoded">
        <div class="row">
            <label for="task"><span style="font-weight: bold;">Tâche :</span></label><br />
            <input name="tache" placeholder="Saisissez une nouvelle tâche" id="nom_tache" size="30" required/>
        </div>
        <div class="row">
            <label for="descr"><span style="font-weight: bold;">Description:</span></label><br/>
            <textarea id="descr" name="descr" rows="5" cols="30" placeholder="Décrivez cette nouvelle tâche" required/></textarea>
        </div>
        <div class="row">
            <label for="deadline"><span style="font-weight: bold;">A faire avant le : </span></label>
            <input type="date" class="form-control" id="deadline" name="deadline" value="${dateJour}" min="${dateJour}" max="2040-01-01" required/>
        </div>
        <div class="row" style="padding: 15px;">
            <input id="ajout" type="submit" value="Ajouter"/>
        </div>
    </form>`

    return html
}

/************************************************************************
 * Génération du html pour l'affichage de la liste des tâches
 ************************************************************************/
function formTask(results){

    let html = ``

    for (let i = 0; i<results.length; i++){
        // Cacher par défaut la description de la tâche
        let displayDescr = `display: none`
        let idDescr =  `Descr${results[i]['idtask']}` // Créer un identifiant à chaque description pour gérer le display de l'élément
        let idButtonAffich = `Button${results[i]['idtask']}`  // Identifier le bouton d'affichage de la Description en fonction du numéro de tâche

        // affichage de la deadline
        let deadline = date.formatDateFr(results[i]['dead_line'])    // Récupérer la deadline de la tâche
        let htmlDeadline = `<span class="badge rounded-pill bg-danger"><i class="bi-alarm"></i> ${deadline}</span>` 

        // paramétrage pour prise en compte d'une tâche terminée en fonction de son statut
        let fin = `bi bi-dot`
        let classButton  = `class="btn-sm btn-outline-primary"`
        let checked = ``
        let date_fin = ``
        let htmlTermine = ``
        if (results[i]['statut'] == '1'){
            fin = `bi-check`    // "Cocher" la tâche
            classButton  = `class="btn-sm btn-primary"` // Modifier l'aspect du bouton "coché"
            checked = 'checked disabled'    // "Griser" l'intitulé et la description de la tâche
            results[i]['name']=`<del>${results[i]['name']}</del>`   // Rayer l'intitulé de la tâche
            date_fin = date.formatDateFr(results[i]['date_fin'])    // Récupérer la date de fin de la tâche 
            htmlTermine = `<span class="badge rounded-pill bg-secondary">Fini le ${date_fin}</span>`   // Afficher la date à laquelle la tâche s'est terminée
        }

        // rajout de la tâche dans le code HTML généré
        html = html + `
        <div class="row">
            <div class="col-10">
                <form class="form-inline">
                    <div class="form-check">  
                        <button type="submit" class="btn-sm btn-danger" formaction="/delete-task" formmethod="POST" formenctype="application/x-www-form-urlencoded">
                            <i class="bi-trash"></i>
                        </button>
                        <button type="submit" ${classButton} formaction="/update-task" formmethod="POST" formenctype="application/x-www-form-urlencoded"><i class="${fin}"></i></button>
                        <input class="form-check-input" type="checkbox" value="${checked}" name="checkbox" ${checked} hidden/>
                        <input type="text" name='statut' value="${results[i]['statut']}" hidden/>
                        <input type="text" name='idtask' value="${results[i]['idtask']}" hidden/>
                        <label class="form-check-label" for="flexCheckDefault"><span style="font-weight: bold;">${results[i]['name']}</span></label>
                        ${htmlDeadline}
                        ${htmlTermine}
                        <label class="form-check-label" for="flexCheckDefault" id="${idDescr}" style="${displayDescr}"><span style="font-style: italic;">${results[i]['description']}</span></label>
                    </div>
                </form>
            </div>
            <div class="col-2 d-none d-sm-block">
                <button class="btn btn-light btn-sm" id="${idButtonAffich}"><i class="bi bi-chevron-double-down"></i></button><br/>
            </div>
        </div>`
    }

    return html
}

/************************************************************************
 * Génération du script d'affichage/masquage pour le champs Description 
 ************************************************************************/
function AffichDescrTask(results) {
    
    let html =``

    for (let i = 0; i<results.length; i++){

        // Cacher par défaut la description de la tâche
        let displayDescr = `display: none`
        let idDescr =  `Descr${results[i]['idtask']}` // Créer un identifiant à chaque description pour gérer le display de l'élément
        let idButtonAffich = `Button${results[i]['idtask']}`  // Identifier le bouton d'affichage de la Description en fonction du numéro de tâche
        let elt = `elt${results[i]['idtask']}`
    
        html = html + `
            const ${elt} = document.getElementById('${idButtonAffich}');
            ${elt}.addEventListener("click", () => {
                objDisplay = document.getElementById('${idDescr}')
                if (objDisplay.style.display == "none"){
                    objDisplay.style.display = "block"
                } else {
                    objDisplay.style.display = "none"
                }
            })
        `
    }

    return html
}

/************************************************************************
 * Fonction "maître" récupérant les différents html générés pour pouvoir 
 * contruire le code html final et le renvoyer au serveur pour affichage
 ************************************************************************/
function ShowTasks(results){

    // génération du formulaire pour saisie d'une nouvelle tâche
    let htmlNewTask = newTask(date.dateJour())

    // génération de la liste des tâches à afficher
    let htmlListTask = formTask(results)

    // génération de la liste des tâches à afficher
    let scriptAfficDescr = AffichDescrTask(results)

    // renvoi du html global de la page à afficher
    let html_final = PageHTML(htmlNewTask, htmlListTask, scriptAfficDescr)

    return html_final
}

module.exports = {
    ShowTasks: ShowTasks,  
}