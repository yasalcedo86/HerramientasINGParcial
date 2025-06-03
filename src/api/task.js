// src/api/tasks.js
const express = require('express');
const router = express.Router();
const taskService = require('../services/taskServices');

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para gestión de tareas
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   title:
 *                     type: string
 *                     example: "Completar proyecto"
 *                   description:
 *                     type: string
 *                     example: "Finalizar el desarrollo"
 *                   completed:
 *                     type: boolean
 *                     example: false
 */
router.get('/', async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Completar proyecto"
 *                 description:
 *                   type: string
 *                   example: "Finalizar el desarrollo"
 *                 completed:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  if (task) res.json(task);
  else res.status(404).json({ error: 'Not found' });
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *               title:
 *                 type: string
 *                 example: "Nueva tarea"
 *               description:
 *                 type: string
 *                 example: "Descripción de la tarea"
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Nueva tarea"
 *                 description:
 *                   type: string
 *                   example: "Descripción de la tarea"
 *                 completed:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Error de validación (falta ID)
 */
router.post('/', async (req, res) => {
  const task = req.body;
  if (!task.id) return res.status(400).json({ error: 'ID requerido' });
  const created = await taskService.createTask(task);
  res.status(201).json(created);
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Tarea actualizada"
 *               description:
 *                 type: string
 *                 example: "Descripción actualizada"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Tarea actualizada"
 *                 description:
 *                   type: string
 *                   example: "Descripción actualizada"
 *                 completed:
 *                   type: boolean
 *                   example: true
 */
router.put('/:id', async (req, res) => {
  const updated = await taskService.updateTask(req.params.id, req.body);
  res.json(updated);
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente
 */
router.delete('/:id', async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.status(204).send();
});

module.exports = router;