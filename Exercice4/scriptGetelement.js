const bouton = document.getElementById('btnAjouter');
const liste = document.getElementById('maListe');
const champTexte = document.getElementById('monEntree');

bouton.addEventListener('click', function() {
    // 1. On récupère ce que tu as écrit
    const texteSaisi = champTexte.value;

    if (texteSaisi !== "") {
        // 2. On crée une nouvelle petite branche "li" (list item)
        const nouvelleBranche = document.createElement('li');

        // 3. On met ton texte à l'intérieur de cette branche
        nouvelleBranche.innerText = texteSaisi;

        // 4. On accroche cette branche à notre arbre (la liste "ul")
        liste.appendChild(nouvelleBranche);

        // 5. On vide la case pour écrire le mot suivant
        champTexte.value = "";
    }
});
