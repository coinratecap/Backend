# Backend
This is the backend of coinratecap

The Backend project structure flow goes this way
Model --- Services --- Controllers ---- Routes ---- Route handler ---- root app.js file

Note that any form of route handler should be written in the root app.js file

##  Coin Listing Methodology
### Price
Using Bitcoin (BTC) as an example, and assuming we only track two exchanges, A and B:

Exchange A: BTC/USD = USD 1,000 / BTC @ 15,000 BTC Trading Volume (rolling 24 hours)

Exchange B: BTC/USD = USD 1,050 / BTC @ 10,000 BTC Trading Volume (rolling 24 hours)

We will then calculate the global volume-weighted average price. In this case, it will be:

BTC Price (USD)

= [Volume % *  First Exchange USD Price] + [Volume % * Second Exchange USD Price]

= [ 15,000 / (15,000 + 10,000) ] * USD 1,000 + [ 10,000 / (15,000 + 10,000) ] * USD 1,050

= 0.6 * USD 1,000 + 0.4 * USD 1,050

= USD 1020

#### Why global volume-weighted average price?
Because the higher the amount of BTC traded in a particular exchange, the higher it mush have an impact on the price of the BTC.  That way if some exchange has a high deviation in value of BTC but low volume traded, it will have a low impact on the price of the crypto in our platform.

## Donate

All donations will go to thenewboston to help fund the team to continue to develop the community and create new content.

| Coin                                                       | Address                                                          |
| ---------------------------------------------------------- | ---------------------------------------------------------------- |
|  Thenewboston Coins                                        | b6e21072b6ba2eae6f78bc3ade17f6a561fa4582d5494a5120617f2027d38797 |
|  Bitcoin                                                   | bc1q3gyjcthfk95jpnemt9er9w3rfvafm32vnu7wqh                               |
|  Ethereum                                                  | 0xCbE45BB332Ae80F94C14A5891f1622d5C4B336B4                     |

## License

Coinratecap is [MIT licensed](http://opensource.org/licenses/MIT).
