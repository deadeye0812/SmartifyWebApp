/**
 * Liefert die Daten (heute + nächste 5 Tage) als Array im Format "yyyy-MM-dd".
 */
export function getDatesNext5Days(data) {
  const times = data.hourly.time;
  const dates = [...new Set(times.map((t) => t.substring(0, 10)))];
  return dates.slice(0, 6); // heute + 5 Tage = 6
}

/**
 * Gruppiert einen beliebigen hourly-Wert nach Datum.
 * Interne Hilfsfunktion.
 */
function groupByDay(data, fieldName) {
  const times = data.hourly.time;
  const values = data.hourly[fieldName];
  const byDay = {};

  times.forEach((timestamp, i) => {
    const date = timestamp.substring(0, 10);
    if (!byDay[date]) byDay[date] = [];
    byDay[date].push(values[i]);
  });

  return byDay;
}

/**
 * Begrenzt auf heute + 5 Tage und berechnet Max oder Durchschnitt pro Tag.
 */
function limitToNext5Days(byDay, useMax = true) {
  const result = {};
  const entries = Object.entries(byDay).slice(0, 6); // heute + 5 Tage

  entries.forEach(([date, values]) => {
    result[date] = useMax
      ? Math.max(...values)
      : values.reduce((sum, v) => sum + v, 0) / values.length;
  });

  return result;
}

/**
 * Liefert pro Tag Min- und Max-Temperatur.
 */
export function getMinMaxTemperatureNext5Days(data) {
  const byDay = groupByDay(data, "temperature_2m");
  const result = {};

  Object.entries(byDay)
    .slice(0, 6)
    .forEach(([date, values]) => {
      result[date] = {
        min: Math.min(...values),
        max: Math.max(...values),
      };
    });

  return result;
}

/**
 * Liefert pro Tag die maximale Niederschlagswahrscheinlichkeit in %.
 * Erwartet, dass "precipitation_probability" in der Response enthalten ist.
 */
export function getPrecipitationProbabilityNext5Days(data) {
  const byDay = groupByDay(data, "precipitation_probability");
  return limitToNext5Days(byDay, true);
}

/**
 * Liefert pro Tag die maximale Windgeschwindigkeit in km/h.
 * Erwartet, dass "windspeed_10m" in der Response enthalten ist.
 */
export function getWindSpeedNext5Days(data) {
  const byDay = groupByDay(data, "windspeed_10m");
  return limitToNext5Days(byDay, true);
}