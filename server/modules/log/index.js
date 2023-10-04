const axios = require(`axios`);
require("dotenv").config();

function _serialize(obj) {
  if (typeof obj === "function") {
    return false;
  }
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      obj[key] = _serialize(obj[key]);
    }
  }
  return obj;
}

async function uiray(query) {
  try {
    await axios.post(
      `${process.env.OPENV0__API}/dev/uiray/logs`,
      _serialize(query),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    true;
  }
  console.dir(query);
}
async function passThrough(query) {
  // console.dir(query);
  true;
}
module.exports = {
  uiray,
  passThrough,
};
