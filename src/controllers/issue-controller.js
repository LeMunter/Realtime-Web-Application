/**
 * Module for a issue controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import fetch from 'node-fetch'

/**
 * Main controller.
 *
 */
export class IssueController {
  /**
   * Display start page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    console.log(process.env.GIT_API_URL)
    const response = await fetch(process.env.GIT_API_URL, {
      headers: {
        'Private-Token': process.env.GIT_TOKEN
      }
    })

    const data = await response.text()
    console.log(JSON.parse(data))

    res.io.emit('issue', {
      hej: 'hej'
    })
    res.render('main')
  }
}
