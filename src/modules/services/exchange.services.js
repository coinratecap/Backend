
const Exchange = require('../models/Exchanges')

class ExchangeService {
    async add(body) {
        const exchange = new Exchange({
            name: body.name,
            volume: body.volume,
            trust: body.trust,
            trustRank: body.trustRank,
            centralized: body.centralized,
            image: body.image,
            website: body.website,
            facebook: body.facebook,
            twitter: body.twitter,
            reddit: body.reddit
        })
        return await exchange.save()
    }
    async update(body, id) {
        const exchange = await Exchange.findById(id)
        exchange.name = body.name || exchange.name
        exchange.volume = body.volume || exchange.volume
        exchange.trust = body.trust || exchange.trust
        exchange.trustRank = body.trustRank || exchange.trustRank
        exchange.centralized = body.centralized || exchange.centralized
        exchange.image = body.image || exchange.image
        exchange.website = body.website || exchange.website
        exchange.facebook = body.facebook || exchange.facebook
        exchange.twitter = body.twitter || exchange.twitter
        exchange.reddit = body.reddit || exchange.reddit
        return await exchange.save()
    }
    async delete(id) {
        return await Exchange.deleteOne({ _id: id })
    }
}

module.exports = new ExchangeService()