# Calamo API CLIMA

## Funcionalidades

Esta api sirve para consultar el tiempo de diversas ciudades del mundo, ofreciendo también una pequeña descripción de la ciudad.

Esta api es un ejemplo de uso de node con express y sus funcionalidades se limitan a realizar consultas sencillas a partir del nombre de una ciudad.

## Dependencias

Para las peticiones se utiliza la librería axios para realizar peticiones externas y la librería http para realizar peticiones a la propia API, que sirve de proxy entre las dos API que nutren de información a la APP. Esas dos API son:

- [OpenWeather](https://openweathermap.org/api/one-call-3)
- [Api de la Wikipedia](Wikipedia)

De OpenWeather se obtienen los datos del clima. Como la nueva versión de la api solo acepta coordenadas, se ha empleado la api de la Wikipedia para obtener dichas coordenadas más algunos datos extras.

> [!NOTE]
> Las imágenes de la Wikipedia no tienen gran calidad en algunas ocasiones, así que se está replanteando sacarlas de otra parte.