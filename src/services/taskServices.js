const db = require('../firebase/firebase');
const COLLECTION = 'tasks';

const getAllTasks = async () => {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map(doc => doc.data());
};

const getTaskById = async (id) => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? doc.data() : null;
};

const createTask = async (task) => {
  const ref = db.collection(COLLECTION).doc(task.id);
  await ref.set(task);
  return task;
};

const updateTask = async (id, data) => {
  const ref = db.collection(COLLECTION).doc(id);
  await ref.update(data);
  const updated = await ref.get();
  return updated.data();
};

const deleteTask = async (id) => {
  await db.collection(COLLECTION).doc(id).delete();
  return { id };
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};