// On utilise querySelector avec le '#' pour dire qu'on cherche un ID
const bouton = document.querySelector('#btnAjouter');
const liste = document.querySelector('#maListe');
const champTexte = document.querySelector('#monEntree');

bouton.addEventListener('click', function() {
    const texteSaisi = champTexte.value;

    if (texteSaisi !== "") {
        const nouvelleBranche = document.createElement('li');
        nouvelleBranche.innerText = texteSaisi;

        // On accroche la branche
        liste.appendChild(nouvelleBranche);

        // Effet "Magique" : on vide le champ et on remet le curseur dedans
        champTexte.value = "";
        champTexte.focus(); 
    }
});
