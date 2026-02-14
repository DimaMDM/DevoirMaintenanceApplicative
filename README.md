# Gestionnaire de Tâches

Application de gestion de tâches en TypeScript.

## Structure du projet

```
devoir/
├── src/
│   ├── todo.ts          # Code principal
│   └── todo.test.ts     # Tests
├── dist/                # Code compilé
├── data.json            # Données sauvegardées
├── package.json
├── tsconfig.json
├── jest.config.js
├── README.md
└── TMA.md
```

## Comment lancer l'application

### Installation

```bash
npm install
npm run build
```

### Utilisation

```bash
# Ajouter une tâche
npm start add "Ma tâche"

# Voir toutes les tâches
npm start list

# Voir juste les tâches actives
npm start list active

# Voir les tâches terminées
npm start list completed

# Marquer une tâche comme terminée
npm start complete 1

# Supprimer une tâche
npm start delete 1

# Aide
npm start
```

## Comment exécuter les tests

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage
```

Les tests couvrent:
- Ajout de tâches (cas normal + erreurs)
- Listage des tâches
- Marquage comme terminée
- Suppression
- Sauvegarde des données

## Lien vers mon GitHub

https://github.com/DimaMDM/DevoirMaintenanceApplicative