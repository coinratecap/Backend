## Coin listing technical architecture :

- make api calls to each exchange for each coin it supports

- parse the response separately for each exchange and coin
- inject the response into an intermediate coin exchange listing collection (db)
- aggregate the results of multiple exchanges for each coin through volume weighted average to find the price of coin
- inject the aggregated price into a coin listing collection which will later be used for analysis
- repeat the above data fetching steps at regular intervals through cron jobs

## Implementation details :

- Each exchange end point with the coin are fetched from db instead of hardcoding in the code

- Exchange api structure schema

```js
const exchangeApiStructureSchema = mongoose.Schema({
  exchange: {
    type: mongoose.Types.ObjectId,
    ref: 'Exchange',
    required: true,
  },
  coin: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Coin',
  },
  endPointPath: {
    type: String,
    required: true,
  },
  queryParams: {
    type: Map,
    of: String,
  },
  ///See https://www.npmjs.com/package/jsonpath for syntax reference
  priceJsonPath: {
    type: String,
    required: true,
  },

  ///See https://www.npmjs.com/package/jsonpath for syntax reference
  volumeJsonPath: {
    type: String,
    required: true,
  },
})
```

- The `endPointPath` is the path parameter to be used for the exchange api site.
- `queryParams` is a map of strings that will be parsed into url encoded query parameters during the api call

- For each entry in the above collection, we make the api call with the above parameters and the response will be parsed based on the `priceJsonPath` and `volumeJsonPath`

- The `priceJsonPath` and `volumeJsonPath` will contain the json path structure at which we can access those data points in the response of that exchange api for that particular coin