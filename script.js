// 1. On "attrape" le bouton et le titre dans la page
const bouton = document.getElementById('monBouton');
const titre = document.getElementById('monTitre');

// 2. On écoute quand quelqu'un clique sur le bouton
bouton.addEventListener('click', function() {
    // Changer le texte
    titre.innerText = "Bravo ! Le texte a changé.";
    // Changer la couleur en ajoutant la règle CSS qu'on a créée
    titre.classList.add('couleur-bleue');
});
