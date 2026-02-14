import * as fs from 'fs';

// Interface pour une tâche
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

// Classe pour gérer les tâches
export class TaskManager {
  private taches: Task[] = [];
  private fichierDonnees: string;
  private prochainId: number = 1;

  constructor(fichierDonnees: string = './data.json') {
    this.fichierDonnees = fichierDonnees;
    this.chargerTaches();
  }

  // Charge les tâches depuis le fichier
  private chargerTaches(): void {
    try {
      if (fs.existsSync(this.fichierDonnees)) {
        const donnees = fs.readFileSync(this.fichierDonnees, 'utf-8');
        if (donnees.trim()) {
          const parsed = JSON.parse(donnees);
          // TODO: voir si on peut optimiser ça
          this.taches = parsed.tasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            completedAt: task.completedAt ? new Date(task.completedAt) : undefined
          }));
          this.prochainId = parsed.nextId || 1;
        }
      }
    } catch (erreur) {
      // console.log('Erreur:', erreur);
      throw new Error(`Erreur chargement: ${erreur}`);
    }
  }

  // Sauvegarde les données
  private sauvegarderTaches(): void {
    try {
      const donnees = {
        tasks: this.taches,
        nextId: this.prochainId
      };
      fs.writeFileSync(this.fichierDonnees, JSON.stringify(donnees, null, 2), 'utf-8');
    } catch (erreur) {
      throw new Error(`Erreur sauvegarde: ${erreur}`);
    }
  }

  // Fonction pour ajouter une tâche
  addTask(title: string): Task {
    if (!title || title.trim() === '') {
      throw new Error('Le titre ne peut pas être vide');
    }

    const titrePropre = title.trim();

    const nouvelleTache: Task = {
      id: this.prochainId,
      title: titrePropre,
      completed: false,
      createdAt: new Date()
    };

    this.prochainId++;
    this.taches.push(nouvelleTache);
    this.sauvegarderTaches();
    return nouvelleTache;
  }

  // Lister les tâches
  listTasks(): Task[] {
    return this.taches;
  }

  // Liste juste les tâches actives
  listActiveTasks(): Task[] {
    const tachesActives = [];
    let count = 0;
    for (let i = 0; i < this.taches.length; i++) {
      if (!this.taches[i].completed) {
        tachesActives.push(this.taches[i]);
        count++;
      }
    }
    return tachesActives;
  }

  // Lister les tâches terminées
  listCompletedTasks(): Task[] {
    const tachesTerminees = [];
    for (let i = 0; i < this.taches.length; i++) {
      if (this.taches[i].completed) {
        tachesTerminees.push(this.taches[i]);
      }
    }
    return tachesTerminees;
  }

  // Marquer comme terminée
  completeTask(id: number): Task {
    let tacheTrouvee = null;
    let temp;

    for (let i = 0; i < this.taches.length; i++) {
      if (this.taches[i].id === id) {
        tacheTrouvee = this.taches[i];
        break;
      }
    }

    if (!tacheTrouvee) {
      throw new Error(`Tâche ${id} introuvable`);
    }

    if (tacheTrouvee.completed) {
      throw new Error(`La tâche ${id} est déjà terminée`);
    }

    tacheTrouvee.completed = true;
    temp = new Date();
    tacheTrouvee.completedAt = temp;
    this.sauvegarderTaches();
    return tacheTrouvee;
  }

  // Supprimer une tâche
  deleteTask(id: number): void {
    let index = -1;
    // Chercher la tâche
    for (let i = 0; i < this.taches.length; i++) {
      if (this.taches[i].id === id) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      throw new Error(`Tâche ${id} introuvable`);
    }

    // Supprimer
    this.taches.splice(index, 1);
    this.sauvegarderTaches();
  }

  // Nombre de tâches
  getTaskCount(): number {
    return this.taches.length;
  }
}

// Fonction principale
function main(): void {
  const gestionnaire = new TaskManager();
  const args = process.argv.slice(2);
  const commande = args[0];

  try {
    // Commande pour ajouter
    if (commande === 'add') {
      if (args.length < 2) {
        console.error('Usage: npm run dev add <titre>');
        process.exit(1);
      }
      const titre = args.slice(1).join(' ');
      const nouvelleTache = gestionnaire.addTask(titre);
      console.log(`Tâche ajoutée: [${nouvelleTache.id}] ${nouvelleTache.title}`);
    }
    else if (commande === 'list') {
      const filtre = args[1];
      let taches: Task[];

      if (filtre === 'active') {
        taches = gestionnaire.listActiveTasks();
        console.log('\nTâches actives:');
      } else if (filtre === 'completed') {
        taches = gestionnaire.listCompletedTasks();
        console.log('\nTâches terminées:');
      } else {
        taches = gestionnaire.listTasks();
        console.log('\nToutes les tâches:');
      }

      if (taches.length === 0) {
        console.log('  Aucune tâche');
      } else {
        for (let i = 0; i < taches.length; i++) {
          const statut = taches[i].completed ? '[X]' : '[ ]';
          console.log(`  ${statut} [${taches[i].id}] ${taches[i].title}`);
        }
      }
      console.log('');
    }
    else if (commande === 'complete') {
      if (args.length < 2) {
        console.error('Usage: npm run dev complete <id>');
        process.exit(1);
      }
      const id = parseInt(args[1]);
      const tache = gestionnaire.completeTask(id);
      console.log(`Tâche terminée: [${tache.id}] ${tache.title}`);
    }
    else if (commande === 'delete') {
      if (args.length < 2) {
        console.error('Usage: npm run dev delete <id>');
        process.exit(1);
      }
      const id = parseInt(args[1]);
      gestionnaire.deleteTask(id);
      console.log(`Tâche supprimée`);
    }
    else {
      console.log(`
Gestionnaire de Tâches

Commandes:
  npm run dev add <titre>        - Ajouter une tâche
  npm run dev list [filtre]      - Lister les tâches (active/completed)
  npm run dev complete <id>      - Terminer une tâche
  npm run dev delete <id>        - Supprimer une tâche

Exemples:
  npm run dev add "Faire les courses"
  npm run dev list active
  npm run dev complete 1
      `);
    }
  } catch (erreur) {
    console.error(`Erreur: ${erreur}`);
    process.exit(1);
  }
}

// Lance le programme
if (require.main === module) {
  main();
}
