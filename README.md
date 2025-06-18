# TP: OAuth & IDP

- Rémy LOURON
- Clément TRENS
- Killian PAVY

## Objectif

Ce TP a pour but d’implémenter une authentification OAuth avec Google, puis de mettre en place un fournisseur d'identité (IDP) pour gérer des utilisateurs authentifiés et connecter leurs comptes Google.

---

## Exercice 1 – Intégration OAuth avec Google

1. **Création d’une application Google :**  
   Depuis la Google Cloud Console, nous avons configuré un projet avec :
   - Une URL de redirection (callback) vers notre application
   - Un `clientId` et un `clientSecret` fournis par Google

2. **Déclenchement du flow OAuth :**  
   - L'utilisateur clique sur un bouton "Connecter Google"
   - Il est redirigé vers la page d'autorisation Google
   - Une fois l'autorisation accordée, il est redirigé vers notre URL de callback avec un `code`

3. **Traitement du code côté backend :**
   - Le backend échange le `code` contre un `access_token` via les API Google
   - Il utilise ensuite cet access_token pour récupérer les informations du profil (email, nom, avatar)

4. **Affichage côté frontend :**  
    - Le frontend reçoit ces données et les affiche à l'utilisateur, confirmant que son compte Google est connecté.

## Exercice 2 – Authentification centralisée avec un IDP

### Objectif

Dans cette partie, nous avons introduit un système d’authentification complet grâce à Auth0. L'objectif était d'obtenir un véritable système de gestion d’identité, capable d’émettre des `access_token` et `id_token` signés, utilisables pour sécuriser nos ressources.

1. **Connexion par email/mot de passe :**  
    - Auth0 permet de s’authentifier via email/password. Un dashboard nous permet également de gérer les utilisateurs manuellement.

2. **Intégration Google dans Auth0 :**  
   - Auth0 permet de configurer des connexions tierces, notamment Google
   - Nous avons donc recréé le flow OAuth de l'exercice 1
   - L'utilisateur peut, lorsqu'il est connecté, cliquer sur un bouton de connexion Google.
   - Une fois les informations Google récupérées, on les stocke dans Auth0.

3. **Stockage des sessions Google :**  
    - L’IDP (Auth0) conserve la connexion à Google, ce qui permet à l’utilisateur de rester connecté à son compte Google même lorsqu’il se reconnecte par email/mot de passe.


## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm

### Getting Started

Install dependencies:

```bash
npm i
```

Start the application:
```bash
npm start
```

Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the application.