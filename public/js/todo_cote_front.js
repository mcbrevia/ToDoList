function Task(props){
    let dateEnd=props.date_fin

    return (  
      <div>
        <h4>{props.nom}</h4>
        <p><em>{props.description}</em></p>
        <p><span style={{color: 'blue'}}>
            A faire avant : {props.deadline.substr(0,10)} /  
           {(() => {
                switch (props.statut) {
                case 0:  return " Tâche non terminée...";
                case 1:  return ` Terminé le : ${dateEnd.substr(0,10)}`;
                default: return " Statut de la tâche indéfini";
                }
            })()}</span></p>  
        <br/>  
      </div>
    )
}

function Page(props){

    let taskComponents = props.tasks.map(t => {
        return (
            <li><Task nom={t.name} description={t.description} statut={t.statut} deadline={t.dead_line} date_fin={t.date_fin}/></li>
        )
    })

    return (
        <div className="container">
            <div className="row">
                <div id="entete" className="row">
                    <h1>Bienvenue dans votre pense-bête !</h1>
                    <h4><em>L'oubli est la condition indispensable de la mémoire (Alfred Jarry)</em></h4>
                </div>
            </div>
            <div className="row">
                <div id="formulaire" className="col-3 d-none d-sm-block">
                </div>
                <div id="liste" className="col-8 col-sm-5 offset-md-4">
                    <h3>Liste des tâches : </h3>
                    <ul>
                    {taskComponents}
                    </ul>
                </div>
            </div>
        </div>
    )
}

fetch('/get-task-json')
    .then(function(response){
        return response.json()
    })
    .then(function(json){

        const domContainer = document.getElementById('root');
        ReactDOM.render(
            <Page tasks={json} />, 
            domContainer
        );
    })
