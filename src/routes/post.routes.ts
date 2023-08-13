import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog Posts
 *   description: API endpoints for managing blog posts
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get a list of all blog posts
 *     tags: [Blog Posts]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/api/posts', getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a specific blog post by its ID
 *     tags: [Blog Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Blog post not found
 */
router.get('/api/posts/:id', getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *               - author
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: The created blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *     examples:
 *       authHeaderExample:
 *         value:
 *           title: Example Blog Post
 *           content: This is an example content.
 *           author: John Doe
 *         summary: Example Request Body with Authorization Header
 *         description: This example shows how to provide the Authorization header.
 *         headers:
 *           Authorization: Bearer YOUR_TOKEN_HERE
 */
router.post('/api/posts', authMiddleware, createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update an existing blog post
 *     tags: [Blog Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPost'
 *     responses:
 *       200:
 *         description: The updated blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */
router.put('/api/posts/:id', authMiddleware, updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blog Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog post
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Blog post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */
router.delete('/api/posts/:id', authMiddleware, deletePost);

export default router;
