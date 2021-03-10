/**
 * Issue router.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import express from 'express'
import { IssueController } from '../controllers/issue-controller.js'

export const router = express.Router()

const controller = new IssueController()

router.get('/', (req, res, next) => controller.index(req, res, next))
router.get('/:id/edit', (req, res, next) => controller.edit(req, res, next))
router.get('/:id/close', (req, res, next) => controller.close(req, res, next))
