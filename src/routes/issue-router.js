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

router.get('/', controller.index)
router.get('/:id/edit', controller.edit)
router.get('/:id/close', controller.close)
router.get('/:id/open', controller.open)
router.post('/:id/edit/update', controller.update)
