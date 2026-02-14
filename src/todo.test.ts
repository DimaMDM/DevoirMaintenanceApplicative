import * as fs from 'fs';
import { TaskManager } from './todo';

describe('Tests du gestionnaire de tâches', () => {
  let gestionnaire: TaskManager;
  let fichierTest: string;

  beforeEach(() => {
    fichierTest = `test-${Date.now()}.json`;
    gestionnaire = new TaskManager(fichierTest);
  });

  afterEach(() => {
    if (fs.existsSync(fichierTest)) {
      fs.unlinkSync(fichierTest);
    }
  });

  // Test cas nominal - ajouter une tâche
  test('peut ajouter une tâche', () => {
    const tache = gestionnaire.addTask('Ma tâche');

    expect(tache.id).toBe(1);
    expect(tache.title).toBe('Ma tâche');
    expect(tache.completed).toBe(false);
  });

  // Test cas d'erreur - titre vide
  test('erreur si titre vide', () => {
    expect(() => gestionnaire.addTask('')).toThrow();
  });

  // Test lister les tâches
  test('peut lister les tâches', () => {
    gestionnaire.addTask('Tâche 1');
    gestionnaire.addTask('Tâche 2');

    const taches = gestionnaire.listTasks();
    const nb = taches.length;

    expect(nb).toBe(2);
  });

  // Test marquer comme terminée
  test('peut marquer une tâche terminée', () => {
    const tache = gestionnaire.addTask('Test');
    gestionnaire.completeTask(tache.id);

    const taches = gestionnaire.listTasks();
    expect(taches[0].completed).toBe(true);
  });

  // Test erreur tâche introuvable
  test('erreur si tâche introuvable', () => {
    expect(() => gestionnaire.completeTask(999)).toThrow();
  });

  // Test lister tâches actives
  test('liste les tâches actives', () => {
    gestionnaire.addTask('Tâche 1');
    const t2 = gestionnaire.addTask('Tâche 2');
    gestionnaire.completeTask(t2.id);

    const actives = gestionnaire.listActiveTasks();
    expect(actives.length).toBe(1);
  });

  // Test persistance
  test('sauvegarde les données', () => {
    gestionnaire.addTask('Test persistance');

    const nouveau = new TaskManager(fichierTest);
    const taches = nouveau.listTasks();

    expect(taches.length).toBe(1);
    expect(taches[0].title).toBe('Test persistance');
  });

  // Test supprimer tâche
  test('peut supprimer une tâche', () => {
    const t = gestionnaire.addTask('A supprimer');
    gestionnaire.deleteTask(t.id);

    expect(gestionnaire.getTaskCount()).toBe(0);
  });
});
