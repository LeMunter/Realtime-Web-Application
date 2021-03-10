/**
 * Module for a main controller.
 *
 * @author Anton Munter
 * @version 1.0.0
 */

/**
 * Main controller.
 *
 */
export class MainController {
  /**
   * Display start page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    res.render('main')
  }
}
