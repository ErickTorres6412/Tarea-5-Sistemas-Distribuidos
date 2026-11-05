"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

const list = "bookstore";

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return {statusCode: 200,headers,body: "OK"};
  }

  try {
    const id = parseInt(event.path.split("/").reverse()[0]);

    const request = JSON.stringify({entity: 'publisher', method: 'UPDATE', id, body: JSON.parse(event.body)});
    await redis.rpush(list, request);

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error.message) };
  }
};
