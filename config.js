'use strict'

const config = () => {
  const api_wiki = process.env.WIKIPEDIA_SOURCE;
  const port = process.env.PORT;
  const host = process.env.HOST;
  const secret_key = process.env.SECRET_KEY;
  const api_key = process.env.API_KEY;
  const api_weather = process.env.API_WEATHER;
  const api_user = process.env.API_USER;
  const api_password = process.env.API_PASSWORD;
  const db_name = process.env.DB_NAME;
  const table_users = process.env.TABLE_USERS;
  const title_api = process.env.API_TITLE
  const company_api = process.env.API_COMPANY
  const params = {
    action: 'query',
    prop: 'coordinates|pageimages|description',
    format: 'json',
    origin: '*'
};
  return {
    api_wiki,
    port,
    host,
    secret_key,
    api_key,
    api_weather,
    api_user,
    api_password,
    db_name,
    table_users,
    params,
    title_api,
    company_api
  }
}

export default config;