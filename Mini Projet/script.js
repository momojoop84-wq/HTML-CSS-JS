/* --- 1. INITIALISATION --- */
let amis = JSON.parse(localStorage.getItem('amis')) || [];
let taches = JSON.parse(localStorage.getItem('taches')) || [];
let filtreUtilisateur = "tous";

if (localStorage.getItem('dark') === 'true') document.body.classList.add('dark-mode');

/* --- 2. GESTION DE L'ÉQUIPE --- */
function ajouterAmi() {
    const input = document.querySelector('#nomAmi');
    if (!input.value) return alert("Indiquez un nom !");
    amis.push({ id: Date.now(), nom: input.value, statut: "actif" });
    input.value = "";
    sauvegarderEtAfficher();
}

function modifierAmi(id) {
    const nouveauNom = prompt("Nouveau nom pour ce membre ?");
    if (nouveauNom) {
        const ami = amis.find(a => a.id === id);
        // On met aussi à jour son nom dans ses tâches en cours
        taches.forEach(t => { if (t.responsable === ami.nom) t.responsable = nouveauNom; });
        ami.nom = nouveauNom;
        sauvegarderEtAfficher();
    }
}

function supprimerAmi(id) {
    if(confirm("Supprimer ce membre ? Cela ne supprimera pas ses tâches.")) {
        amis = amis.filter(a => a.id !== id);
        sauvegarderEtAfficher();
    }
}

function archiverAmi(id) {
    const ami = amis.find(a => a.id === id);
    ami.statut = (ami.statut === "actif") ? "archivé" : "actif";
    sauvegarderEtAfficher();
}

/* --- 3. GESTION DES MISSIONS --- */
function ajouterTache() {
    const texte = document.querySelector('#nomTache').value;
    const qui = document.querySelector('#choixAmi').value;
    const date = document.querySelector('#dateLimite').value;

    if (!texte || !qui) return alert("Mission et Responsable obligatoires !");

    taches.push({
        id: Date.now(),
        texte: texte,
        responsable: qui,
        date: date || "Non définie",
        difficulte: 0,
        commentaire: "",
        terminee: false
    });
    document.querySelector('#nomTache').value = "";
    sauvegarderEtAfficher();
}

function evaluerTache(id) {
    const t = taches.find(t => t.id === id);
    const d = prompt("Difficulté (1 à 5) :", t.difficulte);
    const c = prompt("Tes commentaires :", t.commentaire);
    if (d !== null) t.difficulte = d;
    if (c !== null) t.commentaire = c;
    sauvegarderEtAfficher();
}

function basculerTache(id) {
    const t = taches.find(t => t.id === id);
    t.terminee = !t.terminee;
    sauvegarderEtAfficher();
}

function supprimerTache(id) {
    if(confirm("Supprimer cette mission ?")) {
        taches = taches.filter(t => t.id !== id);
        sauvegarderEtAfficher();
    }
}

/* --- 4. MÉCANIQUE ET DESSIN --- */
function changerFiltre(nom) {
    filtreUtilisateur = nom;
    dessinerTout();
}

function basculerDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark', document.body.classList.contains('dark-mode'));
}

function sauvegarderEtAfficher() {
    localStorage.setItem('amis', JSON.stringify(amis));
    localStorage.setItem('taches', JSON.stringify(taches));
    dessinerTout();
}

function dessinerTout() {
    const corpsAmis = document.querySelector('#listeAmis');
    const corpsTaches = document.querySelector('#listeTaches');
    const select = document.querySelector('#choixAmi');
    const recherche = document.querySelector('#rechercheTache').value.toLowerCase();

    corpsAmis.innerHTML = ""; corpsTaches.innerHTML = "";
    select.innerHTML = "<option value=''>Attribuer à...</option>";

    // DESSIN ÉQUIPE
    amis.forEach(a => {
        corpsAmis.innerHTML += `
            <tr class="${a.statut}">
                <td><strong>${a.nom}</strong></td>
                <td>${a.statut}</td>
                <td>
                    <button class="btn btn-edit" onclick="modifierAmi(${a.id})">Modifier</button>
                    <button class="btn btn-archive" onclick="archiverAmi(${a.id})">Archiver</button>
                    <button class="btn btn-delete" onclick="supprimerAmi(${a.id})">Supprimer</button>
                    <button class="btn btn-filter" onclick="changerFiltre('${a.nom}')">Voir ses missions</button>
                </td>
            </tr>`;
        if (a.statut === "actif") select.innerHTML += `<option value="${a.nom}">${a.nom}</option>`;
    });

    // DESSIN MISSIONS
    taches.forEach(t => {
        if (t.texte.toLowerCase().includes(recherche) && (filtreUtilisateur === "tous" || t.responsable === filtreUtilisateur)) {
            corpsTaches.innerHTML += `
                <tr class="${t.terminee ? 'fait' : ''}">
                    <td><strong>${t.texte}</strong></td>
                    <td>${t.responsable}</td>
                    <td>
                        <div class="bulle-commentaire">💬 ${t.commentaire || 'Aucun retour'}</div>
                        <small>📅 Limite: ${t.date} | 💪 Diff: ${t.difficulte}/5</small>
                    </td>
                    <td>${t.terminee ? "✅ Finie" : "⏳ En cours"}</td>
                    <td>
                        <button class="btn btn-done" onclick="basculerTache(${t.id})">Terminer</button>
                        <button class="btn btn-comment" onclick="evaluerTache(${t.id})">Évaluer</button>
                        <button class="btn btn-delete" onclick="supprimerTache(${t.id})">Supprimer</button>
                    </td>
                </tr>`;
        }
    });
}
dessinerTout();
