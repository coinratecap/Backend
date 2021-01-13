const Exchanges = require("../models/Exchanges");

/** A function to allow admins add coins to exchanges.
 * @param {string} exchangeId - Id of exchange
 * @param {string} coinId - id of coin to add to exchange
 * @returns {Promise} The exchange
 */
async function AddCoinToExchange(exchangeId, coinId) {
  if (!exchangeId || typeof exchangeId !== "string") {
    throw new TypeError(
      `Invalid argument type, expected string but got ${typeof exchangeId}`
    );
  }

  if (!coinId || typeof coinId !== "string") {
    throw new TypeError(
      `Invalid argument type, expected string but got ${typeof coinId}`
    );
  }

  const exchange = await Exchanges.findById(exchangeId);
  await exchange.coins.push(coinId);

  return exchange;
}

module.exports = {
  AddCoinToExchange,
};
