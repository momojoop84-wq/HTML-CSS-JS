const formulaire = document.getElementById('monFormulaire');

formulaire.addEventListener('submit', function(event) {
    event.preventDefault(); // On empêche la page de se recharger

    // 1. On récupère les textes
    const nom = document.getElementById('nom').value;
    const age = document.getElementById('age').value;
    const pays = document.getElementById('pays').value;
    const message = document.getElementById('commentaire').value;

    // 2. On récupère le sexe (celui qui est coché)
    const sexe = document.querySelector('input[name="sexe"]:checked')?.value || "Non précisé";

    // 3. On récupère les loisirs (on peut en avoir plusieurs !)
    const casesLoisirs = document.querySelectorAll('input[name="loisir"]:checked');
    let listeLoisirs = [];
    casesLoisirs.forEach((caseCochee) => {
        listeLoisirs.push(caseCochee.value);
    });

    // 4. On vérifie si c'est vide (Validation)
    if (nom === "" || age === "") {
        alert("Zut ! Le nom et l'âge sont obligatoires.");
    } else {
        // On affiche tout le résultat !
        alert("Récapitulatif :\n" + 
              "Nom: " + nom + "\n" +
              "Âge: " + age + "\n" +
              "Sexe: " + sexe + "\n" +
              "Loisirs: " + listeLoisirs.join(", ") + "\n" +
              "Pays: " + pays + "\n" +
              "Message: " + message);
    }
});
