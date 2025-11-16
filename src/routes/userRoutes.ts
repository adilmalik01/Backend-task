import { Router } from "express";
import {
    getUserById,
    createUser,
    clearCache,
    cacheStatus,
    getAllUser
} from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User API endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns list of all users
 */
router.get("/", getAllUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/", createUser);

/**
 * @swagger
 * /api/users/cache/clear:
 *   delete:
 *     summary: Clear the entire cache
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Cache cleared
 */
router.delete("/cache/clear", clearCache);

/**
 * @swagger
 * /api/users/cache/status:
 *   get:
 *     summary: Get cache statistics
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Cache stats returned
 */
router.get("/cache/status", cacheStatus);

export default router;
