const express = require("express");
const { AddCoinToExchange } = require("../../services/admin.services");

class HomeCtrl {


    /** Controller to add coin to exchange
     * @param {express.Request} req - express request object
     * @param {express.Response} res - express response object
     * @param {express.NextFunction} next - express next function
     */
    static async addCoinToExchange(req, res, next) {
        const { exchangeId, coins } = req.body;

        try {
            coins.forEach(async (coin) => {
                await AddCoinToExchange(exchangeId, coin);
            })

            return res.status(200).json({ error: false, message: "coin added" });
        } catch (e) {
            console.log(e);

            return res
                .status(401)
                .json({ error: true, message: "could not add coin to exchange" });
        }
    }



    static async home(req, res, next) {
        res.send('respond with a resource from Coinratecap');
    }
    static async addExchange(req, res, next) {
        try {
            const result = await ExchaneService.add(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async updateEchange(req, res, next) {
        try {
            const result = await ExchaneService.update(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async deleteExchange(req, res, next) {
        const id = req.params.id
        try {
            const result = await ExchaneService.delete(id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }



}

module.exports = HomeCtrl;