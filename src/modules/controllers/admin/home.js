const express = require('express')
const ExchaneService = require('../../services/exchange.services')

class HomeCtrl {

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
