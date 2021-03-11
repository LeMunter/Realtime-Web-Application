/**
 * Module for a hook controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import { prepareIssue } from '../config/prepareIssue.js'

/**
 * Webhook controller.
 *
 */
export class HookController {
  /**
   * Display start page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async authorize (req, res, next) {
    try {
      // Validate the Gitlab Secret Token to be sure that the hook is from the correct sender.
      // This need to be in a database if we have multiple users.
      if (req.headers['x-gitlab-token'] !== process.env.HOOK_SECRET) {
        res.status(403).send('Incorrect Secret')
        return
      }
      res.status(200).send('Hook accepted')

      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Display start page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      // console.log(req.body.user)
      req.body.object_attributes.author = req.body.user

      const viewData = await prepareIssue([req.body.object_attributes])
      res.io.emit('issue', viewData.issues.pop())
    } catch (error) {
      next(error)
    }
  }
}
