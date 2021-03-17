/**
 * Module for a issue controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import { prepareIssue } from '../config/prepareIssue.js'

/**
 * Main controller.
 *
 */
export class IssueController {
  /**
   * Display all issues.
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

      const viewData = await prepareIssue(data)
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
      const response = await fetch(`${process.env.GIT_API_URL}/${req.params.id}`, {
        headers: {
          'Private-Token': process.env.GIT_TOKEN
        }
      })
      const data = JSON.parse(await response.text())

      const viewData = await prepareIssue([data])

      res.render('issues/edit', viewData.issues.pop())
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates an issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      const titleResponse = await fetch(`${process.env.GIT_API_URL}/${req.params.id}?title=${req.body.nameValue}`, {
        method: 'PUT',
        headers: {
          'Private-Token': process.env.GIT_TOKEN
        }
      })

      const descResponse = await fetch(`${process.env.GIT_API_URL}/${req.params.id}?description=${req.body.descValue}`, {
        method: 'PUT',
        headers: {
          'Private-Token': process.env.GIT_TOKEN
        }
      })

      if (titleResponse.status === 200 && descResponse.status === 200) {
        req.session.flash = { type: 'success', text: 'The issue was updated successfully.' }
      } else {
        req.session.flash = { type: 'danger', text: 'The issue could not be updated.' }
      }

      res.redirect('../../')
    } catch (error) {
      res.render('issues/edit', {
        validationErrors: [error.message] || [error.errors.value.message]
      })
    }
  }

  /**
   * Close an issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async close (req, res) {
    try {
      const response = await fetch(`${process.env.GIT_API_URL}/${req.params.id}?state_event=close`, {
        method: 'PUT',
        headers: {
          'Private-Token': process.env.GIT_TOKEN
        }
      })

      if (response.status === 200) {
        req.session.flash = { type: 'success', text: 'The issue was closed successfully.' }
      } else {
        req.session.flash = { type: 'danger', text: 'The issue could not be closed.' }
      }

      res.redirect('../')
    } catch (error) {
      res.render('../', {
        validationErrors: [error.message] || [error.errors.value.message]
      })
    }
  }

  /**
   * Close an issue.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async open (req, res) {
    try {
      const response = await fetch(`${process.env.GIT_API_URL}/${req.params.id}?state_event=reopen`, {
        method: 'PUT',
        headers: {
          'Private-Token': process.env.GIT_TOKEN
        }
      })

      if (response.status === 200) {
        req.session.flash = { type: 'success', text: 'The issue was opened successfully.' }
      } else {
        req.session.flash = { type: 'danger', text: 'The issue could not be opened.' }
      }

      res.redirect('../')
    } catch (error) {
      res.render('../', {
        validationErrors: [error.message] || [error.errors.value.message]
      })
    }
  }
}
