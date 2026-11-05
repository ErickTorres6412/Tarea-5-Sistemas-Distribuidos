"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

const list = "bookstore";
const entity = "book";

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  const url = (process.env.URL || 'https://' + event.headers.host) + '/.netlify/functions/';

  try {
    const items = await redis.lrange(list, 0, -1);
    let processed = 0;
    for (const item of items) {
      const request = JSON.parse(item);
      if (request.entity != entity) continue;
      if (await redis.lrem(list, 1, item) == 0) continue;
      let response;
      switch (request.method) {
        case "DELETE":
          response = await fetch(url+'bookDeleteBatch/'+request.id, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}});
          break;
        case "UPDATE":
          response = await fetch(url+'bookUpdateBatch/'+request.id, {
            headers: {"Content-type": "application/json"},
            method: "PUT", body: JSON.stringify(request.body)});
          break;
        case "INSERT":
          response = await fetch(url+'bookInsertBatch', {
            headers: {"Content-type": "application/json"},
            method: "POST",body: JSON.stringify(request.body)});
          break;
      }
      if (response && !response.ok)
        console.log(request.method, 'failed:', await response.text());
      processed++;
    }
    return { statusCode: 200, headers, body: JSON.stringify({processed})};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error.message) };
  }
};
