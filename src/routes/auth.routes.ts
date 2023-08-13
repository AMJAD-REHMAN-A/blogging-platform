import express from 'express';
import { getToken } from "../controllers/auth.controller"

const router = express.Router();

/**
 * @swagger
 * /token:
 *   get:
 *     summary: Get a JWT token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.get('/token', getToken);

export default router;