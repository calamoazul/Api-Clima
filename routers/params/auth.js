
import useConfig from '../../config.js'
import DateService from '../../Services/DateService.js';
const {year} = DateService()

const {title_api, company_api} = useConfig()
const description_index = 'Escribe el nombre de la ciudad para descubrir el tiempo de hoy';
const heading_login = 'Login';
const description_login = 'Formulario de Login';
const basicVariables = {
    title: title_api,
    year: year(),
    company: company_api
}
export const renderIndex = {
    ...basicVariables,
    heading: title_api,
    description: description_index,
}

export const renderLogin = {
    ...basicVariables,
    heading: heading_login,
    description: description_login
}