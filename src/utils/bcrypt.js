const bcrypt = require("bcrypt");


let hash = async password => {
  let hashed = await bcrypt.hash(password, 10)
  return hashed
}
let compare = async (password, hashed) => {
  let match = await bcrypt.compare(password, hashed);
  return match
}


module.exports = {
  hash,
  compare
};