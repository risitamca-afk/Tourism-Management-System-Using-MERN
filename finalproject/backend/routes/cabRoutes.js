import express from "express";
const router = express.Router();
import {addCab,getCabs} from '../controllers/cabController.js';

// POST - Add a new cab
router.post('/cabs', addCab);

// GET - Search and fetch cabs
router.get('/cabs', getCabs);


export default router;