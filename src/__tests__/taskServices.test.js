const taskServices = require('../services/taskServices');

// Mock de Firebase
jest.mock('../firebase/firebase', () => {
  const mDoc = {
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const mCollection = {
    doc: jest.fn(() => mDoc),
    get: jest.fn(),
  };
  return {
    collection: jest.fn(() => mCollection),
  };
});

const db = require('../firebase/firebase');

describe('taskServices', () => {
  afterEach(() => jest.clearAllMocks());

  test('getAllTasks retorna tareas', async () => {
    const fakeDocs = [{ data: () => ({ id: 1, name: 'Test' }) }];
    db.collection().get.mockResolvedValue({ docs: fakeDocs });
    const result = await taskServices.getAllTasks();
    console.log(result);
    expect(result).toEqual([{ id: 1, name: 'Test' }]);
  });

  test('getTaskById retorna tarea si existe', async () => {
    db.collection().doc().get.mockResolvedValue({ exists: true, data: () => ({ id: 1 }) });
    const result = await taskServices.getTaskById('1');
    expect(result).toEqual({ id: 1 });
  });

  test('getTaskById retorna null si no existe', async () => {
    db.collection().doc().get.mockResolvedValue({ exists: false });
    const result = await taskServices.getTaskById('2');
    expect(result).toBeNull();
  });

  test('createTask guarda y retorna la tarea', async () => {
    db.collection().doc().set.mockResolvedValue();
    const task = { id: '3', name: 'Nueva' };
    const result = await taskServices.createTask(task);
    expect(result).toEqual(task);
    expect(db.collection().doc().set).toHaveBeenCalledWith(task);
  });

  test('updateTask actualiza y retorna la tarea', async () => {
    db.collection().doc().update.mockResolvedValue();
    db.collection().doc().get.mockResolvedValue({ data: () => ({ id: '4', name: 'Actualizada' }) });
    const result = await taskServices.updateTask('4', { name: 'Actualizada' });
    expect(result).toEqual({ id: '4', name: 'Actualizada' });
  });

  test('deleteTask elimina y retorna el id', async () => {
    db.collection().doc().delete.mockResolvedValue();
    const result = await taskServices.deleteTask('5');
    expect(result).toEqual({ id: '5' });
  });
});