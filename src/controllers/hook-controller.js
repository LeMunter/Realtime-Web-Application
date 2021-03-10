/**
 * Module for a issue controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import moment from 'moment'

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

      console.log('auth')
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
      console.log(req.body.object_attributes)
      const data = {
        id: req.body.object_attributes.iid,
        title: req.body.object_attributes.title,
        description: req.body.object_attributes.description,
        state: req.body.object_attributes.state,
        createdAt: moment(req.body.object_attributes.created_at).fromNow()
      }

      res.io.emit('issue', data)
      console.log('emitiisiisisisisi')
    } catch (error) {
      next(error)
    }
  }
}
