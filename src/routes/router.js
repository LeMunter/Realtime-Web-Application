/**
 * The routes.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as mainRouter } from './main-router.js'
import { router as issueRouter } from './issue-router.js'
import { router as hookRouter } from './hook-router.js'

export const router = express.Router()

router.use('/', mainRouter)
router.use('/issues', issueRouter)
router.use('/hook', hookRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
