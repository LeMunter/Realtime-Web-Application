/**
 * Module for a issue controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import moment from 'moment'

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
    try {
      const response = await fetch(process.env.GIT_API_URL, {
        headers: {
          'Private-Token': process.env.GIT_TOKEN
        }
      })
      const data = JSON.parse(await response.text())

      const viewData = {
        issues: data.map(issue => ({
          id: issue.iid,
          title: issue.title,
          description: issue.description,
          state: issue.state,
          createdAt: moment(issue.created_at).fromNow(),
          author: issue.author.name,
          author_url: issue.author.avatar_url
        }))
          .sort((a, b) => a.value - b.value)
      }

      res.render('issues/issues', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Display form to edit issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async edit (req, res, next) {
    try {
      console.log('edit')

      res.render('issues/issues')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Close an issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async close (req, res, next) {
    try {
      console.log('close')

      res.render('issues/issues')
    } catch (error) {
      next(error)
    }
  }
}
