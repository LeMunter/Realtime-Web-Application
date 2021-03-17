/**
 * Main router.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import express from 'express'
import { MainController } from '../controllers/main-controller.js'

export const router = express.Router()

const controller = new MainController()

router.get('/', (req, res, next) => controller.index(req, res, next))
