//grstionAGS.js


//POUR L'AJOUT
function ajouter(){ 
    document.getElementById('insertion').style.display= 'block';
}

//POUR LA MODIFICATION
function modifier(id, nom, prix_a, prix_v, quantite, benefice){
    document.getElementById('insertion').style.display= 'block';

    document.getElementById('id').value = id;
    document.getElementById('nom').value = nom;
    document.getElementById('prix_a').value = prix_a;
    document.getElementById('prix_v').value = prix_v;
    document.getElementById('quantite').value = quantite;
    benefice = (prix_v - prix_a)*quantite;

    /*
    fetch('/produits/'+id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nom: nom, prix_a: prix_a, prix_v: prix_v, quantite: quantite, benefice: benefice})
    })*/

    /*
    let ligne = btn.parentNode.parentNode;
    let col_nom = ligne.cells[1];
    let col_prix_a = ligne.cells[2];
    let col_prix_v = ligne.cells[3];
    let col_q = ligne.cells[4];

    let new_nom = prompt("Modifier le nom : ", col_nom.innerText);
    let new_prix_a = prompt("Modifier le prix d'achat : ", col_prix_a.innerText);
    let new_prix_v = prompt("Modifier le prix de vente : ", col_prix_v.innerText);
    let new_q = prompt("Modifier la quantité : ", col_q.innerText);

    if(new_nom !== null && new_prix_a !== null && new_prix_v !== null && new_q !== null){
        col_nom.innerText = new_nom;
        col_prix_a.innerText = new_prix_a;
        col_prix_v.innerText = new_prix_v;
        col_q.innerText = new_q;
    }*/
}



//POUR LA VENTE

function vendre(btn, id){
    let ligne = btn.parentNode.parentNode;
    let q = parseInt(ligne.cells[4].innerText);
    let b = parseInt(ligne.cells[5].innerText);
    let prix_a = parseInt(ligne.cells[2].innerText);
    let prix_v = parseInt(ligne.cells[3].innerText);
    
    if(q > 0){
        ligne.cells[4].innerText = q-1;
        ligne.cells[5].innerText = (prix_v - prix_a) * ligne.cells[4].innerText;
        alert('1 '+ligne.cells[1].innerText+' a été vendu...');
        fetch('/vente', {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({id: id, quantite: ligne.cells[4].innerText, benefice: ligne.cells[5].innerText})
        })
    }else{
        alert('Stocke Vide !');
    }
    
}


//POUR L'ENREGISTREMENT

function enregistrer(){

    //Recuperation de l'id
    let id = document.getElementById("id").value;

    //Recuperation du nom
    let nom = document.getElementById("nom").value;

    //Recuperation du prix d'achat
    let prix_a = document.getElementById("prix_a").value;

    //Recuperation du prix de vente
    let prix_v = document.getElementById("prix_v").value;

    //Recuperation de la quantite
    let quantite = document.getElementById("quantite").value;

    let benefice = (prix_v - prix_a) * quantite ;

    //Ajouter une ligne
    let tableau = document.getElementById('tableau');
    let ligne = tableau.insertRow();

    if(nom == '' || prix_a == '' || prix_v == '' || quantite == ''){
        alert('Veuillez entrer toutes les informations !');
        return;
    }

    //ajouter les colones
    let ident = tableau.rows.length -1;
    ligne.insertCell(0).innerText = ident;
    ligne.insertCell(1).innerText = nom;
    ligne.insertCell(2).innerText = prix_a;
    ligne.insertCell(3).innerText = prix_v;
    ligne.insertCell(4).innerText = quantite;
    ligne.insertCell(5).innerText = benefice;
    
    ligne.insertCell(6).innerHTML =  
    "<button onclick='modifier(this)'>Modifier</button><button onclick='vendre(this)'>Vendre</button><button onclick='supprimer(this)'>Supprimer</button>";

    
    fetch('/produits', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id, nom: nom, prix_a: prix_a, prix_v: prix_v, quantite: quantite, benefice: benefice})
    })

    /*
    document.getElementById('nom').value = "";
    document.getElementById('prix_a').value = "";
    document.getElementById('prix_v').value = "";
    document.getElementById('quantite').value = "";
    */

}


//POUR CACHER LE CHAMP DE SAISIE

function effacer(){
    document.getElementById('insertion').style.display= 'none';
}


//POUR SUPPRIMER UNE LIGNE

function supprimer(btn, id){
    
    let ligne = btn.parentNode.parentNode;
    let valider = confirm("Voulez-vous vraiment SUPPRIMER l'objet "+ligne.cells[1].innerText.toUpperCase());
    if(valider){
        fetch('/supprimer/'+id, {method: 'DELETE'});
        ligne.remove();
    }
}

