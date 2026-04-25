// --- 1. INITIALISATION & MÉMOIRE ---
// On récupère les données ou on crée des listes vides
let amis = JSON.parse(localStorage.getItem('amis')) || [];
let taches = JSON.parse(localStorage.getItem('taches')) || [];
let filtreUtilisateur = "tous"; 

// --- 2. FONCTIONS POUR LES UTILISATEURS ---

function ajouterAmi() {
    const input = document.querySelector('#nomAmi');
    if (!input.value) return alert("Veuillez saisir un nom.");

    const nouvelAmi = { 
        id: Date.now(), 
        nom: input.value, 
        statut: "actif" 
    };
    
    amis.push(nouvelAmi);
    input.value = "";
    sauvegarderEtAfficher();
}

function modifierAmi(id) {
    const nouveauNom = prompt("Entrez le nouveau nom de l'utilisateur :");
    if (nouveauNom) {
        const ami = amis.find(a => a.id === id);
        ami.nom = nouveauNom;
        // On met aussi à jour le nom dans les tâches qu'il possède
        taches.forEach(t => {
            if (t.responsable === ami.nom) t.responsable = nouveauNom;
        });
        sauvegarderEtAfficher();
    }
}

function archiverAmi(id) {
    const ami = amis.find(a => a.id === id);
    ami.statut = (ami.statut === "actif") ? "archivé" : "actif";
    sauvegarderEtAfficher();
}

// --- 3. FONCTIONS POUR LES TÂCHES ---

function ajouterTache() {
    const input = document.querySelector('#nomTache');
    const select = document.querySelector('#choixAmi');

    if (!input.value || !select.value) {
        return alert("Veuillez remplir la tâche et choisir un responsable.");
    }

    const nouvelleTache = {
        id: Date.now(),
        texte: input.value,
        responsable: select.value,
        terminee: false
    };

    taches.push(nouvelleTache);
    input.value = "";
    sauvegarderEtAfficher();
}

function basculerTache(id) {
    const tache = taches.find(t => t.id === id);
    tache.terminee = !tache.terminee;
    sauvegarderEtAfficher();
}

function supprimerTache(id) {
    if(confirm("Supprimer cette mission ?")) {
        taches = taches.filter(t => t.id !== id);
        sauvegarderEtAfficher();
    }
}

function changerFiltre(nom) {
    filtreUtilisateur = nom;
    dessinerTout();
}

// --- 4. LE SYSTÈME DE DESSIN (L'affichage) ---

function sauvegarderEtAfficher() {
    localStorage.setItem('amis', JSON.stringify(amis));
    localStorage.setItem('taches', JSON.stringify(taches));
    dessinerTout();
}

function dessinerTout() {
    const corpsAmis = document.querySelector('#listeAmis');
    const corpsTaches = document.querySelector('#listeTaches');
    const selectAmis = document.querySelector('#choixAmi');

    // On vide les tableaux
    corpsAmis.innerHTML = "";
    corpsTaches.innerHTML = "";
    selectAmis.innerHTML = "<option value=''>Attribuer à...</option>";

    // DESSINER LES UTILISATEURS
    amis.forEach(ami => {
        corpsAmis.innerHTML += `
            <tr class="${ami.statut}">
                <td><strong>${ami.nom}</strong></td>
                <td>${ami.statut}</td>
                <td>
                    <button class="btn btn-edit" onclick="modifierAmi(${ami.id})">Modifier</button>
                    <button class="btn btn-archive" onclick="archiverAmi(${ami.id})">${ami.statut === 'actif' ? 'Archiver' : 'Désarchiver'}</button>
                    <button class="btn btn-filter" onclick="changerFiltre('${ami.nom}')">Voir ses tâches</button>
                </td>
            </tr>`;
        
        // Seuls les membres actifs peuvent recevoir de nouvelles tâches
        if (ami.statut === "actif") {
            selectAmis.innerHTML += `<option value="${ami.nom}">${ami.nom}</option>`;
        }
    });

    // DESSINER LES TÂCHES (avec filtre)
    taches.forEach(tache => {
        if (filtreUtilisateur === "tous" || tache.responsable === filtreUtilisateur) {
            corpsTaches.innerHTML += `
                <tr>
                    <td class="${tache.terminee ? 'fait' : ''}">${tache.texte}</td>
                    <td><b>${tache.responsable}</b></td>
                    <td>${tache.terminee ? "✅ Terminée" : "⏳ En cours"}</td>
                    <td>
                        <button class="btn btn-done" onclick="basculerTache(${tache.id})">${tache.terminee ? 'Rétablir' : 'Terminer'}</button>
                        <button class="btn btn-delete" onclick="supprimerTache(${tache.id})">Supprimer</button>
                    </td>
                </tr>`;
        }
    });

    // Afficher un bouton pour annuler le filtre si on regarde un utilisateur précis
    if (filtreUtilisateur !== "tous") {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="4" style="text-align:center;">
            <button class="btn btn-add" onclick="changerFiltre('tous')">Afficher tout le monde</button>
        </td>`;
        corpsTaches.appendChild(tr);
    }
}

// Lancement au démarrage
dessinerTout();