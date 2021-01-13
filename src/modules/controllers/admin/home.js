const express = require("express");
const { AddCoinToExchange } = require("../../services/admin.services");

class HomeCtrl {
  static async home(req, res, next) {
    res.send("respond with a resource from Coinratecap");
  }

  /** Controller to add coin to exchange
   * @param {express.Request} req - express request object
   * @param {express.Response} res - express response object
   * @param {express.NextFunction} next - express next function
   */
  static async addCoinToExchange(req, res, next) {
    const { exchangeId, coinId } = req.body;
    try {
      await AddCoinToExchange(exchangeId, coinId);
      return res.status(200).json({ error: false, message: "coin added" });
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .json({ error: true, message: "could not add coin to exchange" });
    }
  }
}

module.exports = HomeCtrl;
