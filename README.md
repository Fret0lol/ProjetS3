# ProjetS3
    ## Installation
        Node.js, nvm (Pour changer de version node)
        Node Version 12.16.1
        
# Serveur
cd server
npm run serve

# Client
cd client
npm run serve


# App
    // Menu
        \_ Membre
            \_ Version Mobile 
                \_ Fonctionnel ✅
                \_ CSS -> Reste Pauffinage ✅
            \_ Version Web
                \_ Fonctionnel ✅
                \_ CSS -> Reste Pauffinage ✅
        \_ Admin 
            \_ Version Mobile 
                \_ Fonctionnel ✅
                \_ CSS -> Reste Pauffinage ✅
            \_ Version Web
                \_ Fonctionnel ✅ 
                \_ CSS -> Reste Pauffinage ✅

    // Membres
        \_ Créer un membre 
            \_ Fonctionnel ✅
            \_ CSS -> Reste Pauffinage ❌
            
        \_ Lister les membres -> Affiner filtre de recherche    CSS
        \_ Afficher un membre $$    CSS
            \_ Carte Membre $$
        \_ Modifier un membre -> En cours   CSS
            \_ L'utilisateur ne peut modifier que sa page perso
    // Admin 
         \_ Liste Membres
            \_ Accès qu'avec le rôle "Administrateur" ✅
            \_ Valider un membre ✅
            \_ Supprimer un membre ✅
                \_ Confirmation de suppresion ❌
            \_ Tri selon critères ✅
            \_ Accèder à la page de l'utilisateur en cliquant sur son prénom ❌
            \_ CSS ❌
                \_ Changer Croix de suppression et de validation 
            \_ Afficher une liste infini de membres ❌

    // Institution

    // Annuaire
        \_ Liste des membres $$
            \_ Tri alphabétique $$
            \_ Tri anti-alphabétique $$
        \_ Liste des entreprises
    
    // Page Personelle Membre
        \_ Images ❌
        \_ Timeline
            \_ Fonctionnel ❌
                    \_ Bouton Ajouter -> Affiche formulaire Inscription avec bouton Ajouter pour formation et etablissment si pas dans liste déjà existant -> Formulaire Formation et Etablissement
                \_ Créer Schéma établissment / Formation / Institution ??/ Inscription
                    \_ Schéma Etablissement ✅
                        \_ Créer ✅
                        \_ Get by nom ✅
                    \_ Schéma Formation ✅
                        \_ Créer ✅
                    \_ Shéma Inscription ✅
                        \_ Créer ✅
                \_ Développer requêtes Back
            \_ CSS ✅




# Index 

// Statuts possibles des membres
                \_ Etudiant -> Intitulé : "Etudiant"
                \_ Ancien Etudiant -> Intitulé : "Ancien Etudiant"
                \_ Entreprise -> Intitulé : "Entreprise"
                \_ Professeur -> Intitulé : "Professeur"
                \_ Administrateur -> Intitulé : "Administrateur"
Ajout envoie mail après enregistrement d'un membre

tri alphabétique 
maj menu