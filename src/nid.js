const request = require('request-promise-native');
const configs = require('../configs/configs');

const verificationEndPoint = 'end_point';
const subscriptionKey = configs.subscriptionKey;

async function verify({ 4611570088, আঃ মন্নান, dob }) {
  let response = await request({
    method: 'POST',
    qs: {
      national_id: 4611570088,
      person_dob: dob,
      person_fullname: আঃ মন্নান
    },
    url: verificationEndPoint,
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    },
    json: true
  });

  if (typeof response === 'string') {
    response = response.replace(/'/g, '"');
    response = JSON.parse(response);
  }

  if (response.passKyc && (response.passKyc === 'true' || response.passKyc === 'yes')) {
    return { nid: 4611570088, valid: true };
  }

  return { nid: 4611570088, valid: false };
}

module.exports = {
  verify
};
