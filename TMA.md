# Documentation TMA

## Les types de maintenance

### Maintenance Corrective

C'est quand on corrige les bugs dans l'application.

Exemples:
- L'application crash quand on ajoute une tâche
- Les données se sauvegardent pas correctement
- Une tâche terminée s'affiche toujours comme active

Comment faire:
1. On reproduit le bug
2. On trouve d'où ça vient dans le code
3. On corrige
4. On teste que ça marche
5. On déploie la correction

Priorités:
- P1 (critique): l'app marche plus du tout → corriger en 4h max
- P2 (majeur): une fonction importante marche pas → corriger en 24h
- P3 (mineur): petit problème → corriger en 72h
- P4 (cosmétique): juste l'affichage → corriger quand on peut

### Maintenance Évolutive

C'est quand on ajoute des nouvelles fonctionnalités ou qu'on améliore ce qui existe.

Exemples:
- Ajouter des priorités aux tâches (haute/moyenne/basse)
- Mettre des catégories ou des tags
- Ajouter une date limite pour finir une tâche
- Pouvoir chercher dans les tâches
- Exporter en CSV

Comment faire:
1. On regarde si c'est faisable
2. On estime combien de temps ça va prendre
3. Le client valide
4. On développe
5. On teste
6. On documente
7. On met en production

### Maintenance Préventive

C'est pour éviter les problèmes avant qu'ils arrivent.

Actions à faire:
- Mettre à jour les dépendances npm régulièrement
- Vérifier les failles de sécurité avec `npm audit`
- Améliorer le code quand c'est trop compliqué
- Ajouter plus de tests
- Surveiller que le fichier data.json devient pas trop gros

Quand:
- Chaque semaine: check sécurité
- Chaque mois: màj des dépendances
- Tous les 3 mois: refactoring du code

## Processus de traitement d'un incident

### 1. Signalement
L'utilisateur signale le problème par email ou ticket.

Il faut noter:
- C'est quoi le problème
- Comment reproduire
- Le message d'erreur
- Son environnement (Windows/Mac, version Node, etc)

### 2. Qualification
On regarde:
- Est-ce qu'on arrive à reproduire le bug?
- C'est grave comment? (P1, P2, P3 ou P4)
- Ça impacte combien de gens?

### 3. Diagnostic
- On regarde les logs d'erreur
- On teste en local pour reproduire
- On trouve la cause dans le code
- On cherche si ça a déjà été corrigé avant

### 4. Résolution
```bash
git checkout -b fix/bug-nom-du-bug
# on corrige le code
# on ajoute des tests
npm test
npm run build
```

### 5. Déploiement
- On merge dans main
- On compile
- On teste en prod
- On prévient l'utilisateur que c'est corrigé

### 6. Documentation
- On documente comment on a corrigé
- On ferme le ticket

## Gestion des demandes d'évolution

### 1. Formulaire de demande

```
Titre: [nom court]
Qui demande: [nom]
Description: [détails]
Pourquoi: [justification]
Priorité: Haute/Moyenne/Basse
```

### 2. Analyse

On regarde:
- C'est faisable techniquement?
- Ça va prendre combien de temps?
- Ça va casser des trucs existants?
- C'est vraiment utile?

Exemple pour ajouter les priorités:
- Faisable: oui
- Temps: environ 3 jours
- Impact: il faut changer le modèle de données
- Décision: on le fait

### 3. Priorisation

Méthode MoSCoW:
- Must have: obligatoire
- Should have: important
- Could have: bien d'avoir
- Won't have: pas pour cette version

### 4. Développement

```bash
git checkout -b feature/nom-de-la-feature
# développement
# tests
npm test
git commit -m "Add: nouvelle fonctionnalité"
```

### 5. Tests

On vérifie:
- Les tests unitaires passent
- La fonctionnalité marche bien
- Ça a rien cassé d'autre
- L'utilisateur valide

### 6. Mise en prod

```bash
git checkout main
git merge feature/nom-de-la-feature
npm run build
# déploiement
```

On prévient les utilisateurs des nouveautés.

---

Version 1.0
