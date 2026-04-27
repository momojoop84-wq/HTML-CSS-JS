/* --- BOUTON RETOUR AUTOMATIQUE --- */
// 1. On crée l'élément bouton en mémoire
const boutonRetour = document.createElement("button");

// 2. On écrit le texte dessus
boutonRetour.innerHTML = "🏠 Retour au Menu";

// 3. On lui donne un style "flottant" pour qu'il soit joli et visible
boutonRetour.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    z-index: 1000;
`;

// 4. On lui dit quoi faire quand on clique (aller vers index.html)
boutonRetour.onclick = function() {
    window.location.href = "../navigating.html"; // Change l'adresse de la page
};

// 5. On l'ajoute officiellement au corps de la page (body)
document.body.appendChild(boutonRetour);
