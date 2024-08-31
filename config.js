'use strict'

const config = () => {
  const api_wiki = process.env.WIKIPEDIA_SOURCE;
  const port = process.env.PORT;
  const host = process.env.HOST;
  const api_key = process.env.API_KEY;
  const api_weather = process.env.API_WEATHER;
  const query_params = process.env.QUERY_PARAMS;

  return {
    api_wiki,
    port,
    host,
    api_key,
    api_weather,
    query_params
  }
}

export default config;