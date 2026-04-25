const bouton = document.querySelector('#btnTheme');
const corpsDePage = document.body; // On attrape directement toute la page

bouton.addEventListener('click', function() {
    // .toggle veut dire "Si la classe est là, enlève-la. Si elle n'est pas là, mets-la."
    // C'est exactement comme un interrupteur !
    corpsDePage.classList.toggle('theme-sombre');
    corpsDePage.classList.toggle('theme-clair');

    // On change aussi le texte du bouton pour s'adapter
    if (corpsDePage.classList.contains('theme-sombre')) {
        bouton.innerText = "Passer en Mode Clair";
    } else {
        bouton.innerText = "Passer en Mode Sombre";
    }
});
