export interface NakshatraInfo {
  name: string;
  index: number;
  slug: string;
  startDegree: number;
  endDegree: number;
}

export const NAKSHATRAS: NakshatraInfo[] = [
  { name: 'Ashwini', index: 1, slug: 'ashwini', startDegree: 0, endDegree: 13.333333 },
  { name: 'Bharani', index: 2, slug: 'bharani', startDegree: 13.333333, endDegree: 26.666667 },
  { name: 'Krittika', index: 3, slug: 'krittika', startDegree: 26.666667, endDegree: 40 },
  { name: 'Rohini', index: 4, slug: 'rohini', startDegree: 40, endDegree: 53.333333 },
  { name: 'Mrigashira', index: 5, slug: 'mrigashira', startDegree: 53.333333, endDegree: 66.666667 },
  { name: 'Ardra', index: 6, slug: 'ardra', startDegree: 66.666667, endDegree: 80 },
  { name: 'Punarvasu', index: 7, slug: 'punarvasu', startDegree: 80, endDegree: 93.333333 },
  { name: 'Pushya', index: 8, slug: 'pushya', startDegree: 93.333333, endDegree: 106.666667 },
  { name: 'Ashlesha', index: 9, slug: 'ashlesha', startDegree: 106.666667, endDegree: 120 },
  { name: 'Magha', index: 10, slug: 'magha', startDegree: 120, endDegree: 133.333333 },
  { name: 'Purva Phalguni', index: 11, slug: 'purva-phalguni', startDegree: 133.333333, endDegree: 146.666667 },
  { name: 'Uttara Phalguni', index: 12, slug: 'uttara-phalguni', startDegree: 146.666667, endDegree: 160 },
  { name: 'Hasta', index: 13, slug: 'hasta', startDegree: 160, endDegree: 173.333333 },
  { name: 'Chitra', index: 14, slug: 'chitra', startDegree: 173.333333, endDegree: 186.666667 },
  { name: 'Swati', index: 15, slug: 'swati', startDegree: 186.666667, endDegree: 200 },
  { name: 'Vishakha', index: 16, slug: 'vishakha', startDegree: 200, endDegree: 213.333333 },
  { name: 'Anuradha', index: 17, slug: 'anuradha', startDegree: 213.333333, endDegree: 226.666667 },
  { name: 'Jyeshtha', index: 18, slug: 'jyeshtha', startDegree: 226.666667, endDegree: 240 },
  { name: 'Mula', index: 19, slug: 'mula', startDegree: 240, endDegree: 253.333333 },
  { name: 'Purva Ashadha', index: 20, slug: 'purva-ashadha', startDegree: 253.333333, endDegree: 266.666667 },
  { name: 'Uttara Ashadha', index: 21, slug: 'uttara-ashadha', startDegree: 266.666667, endDegree: 280 },
  { name: 'Shravana', index: 22, slug: 'shravana', startDegree: 280, endDegree: 293.333333 },
  { name: 'Dhanishta', index: 23, slug: 'dhanishta', startDegree: 293.333333, endDegree: 306.666667 },
  { name: 'Shatabhisha', index: 24, slug: 'shatabhisha', startDegree: 306.666667, endDegree: 320 },
  { name: 'Purva Bhadrapada', index: 25, slug: 'purva-bhadrapada', startDegree: 320, endDegree: 333.333333 },
  { name: 'Uttara Bhadrapada', index: 26, slug: 'uttara-bhadrapada', startDegree: 333.333333, endDegree: 346.666667 },
  { name: 'Revati', index: 27, slug: 'revati', startDegree: 346.666667, endDegree: 360 },
];

/**
 * Calculate Julian Day Number from a Date
 */
function getJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  let jd = jdn + (hour - 12) / 24 + minute / 1440 + second / 86400;
  
  return jd;
}

/**
 * Calculate Moon's ecliptic longitude using simplified formula
 * This is a simplified calculation based on Jean Meeus' astronomical algorithms
 */
function getMoonLongitude(jd: number): number {
  // Days since J2000.0
  const T = (jd - 2451545.0) / 36525;
  
  // Moon's mean longitude
  const L0 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000;
  
  // Moon's mean elongation
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000;
  
  // Sun's mean anomaly
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000;
  
  // Moon's mean anomaly
  const M1 = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000;
  
  // Moon's argument of latitude
  const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
  
  // Convert to radians
  const D_rad = (D * Math.PI) / 180;
  const M_rad = (M * Math.PI) / 180;
  const M1_rad = (M1 * Math.PI) / 180;
  const F_rad = (F * Math.PI) / 180;
  
  // Main periodic terms for longitude (simplified - using major terms)
  let longitude = L0;
  longitude += 6.288774 * Math.sin(M1_rad);
  longitude += 1.274027 * Math.sin(2 * D_rad - M1_rad);
  longitude += 0.658314 * Math.sin(2 * D_rad);
  longitude += 0.213618 * Math.sin(2 * M1_rad);
  longitude -= 0.185116 * Math.sin(M_rad);
  longitude -= 0.114332 * Math.sin(2 * F_rad);
  longitude += 0.058793 * Math.sin(2 * D_rad - 2 * M1_rad);
  longitude += 0.057066 * Math.sin(2 * D_rad - M_rad - M1_rad);
  longitude += 0.053322 * Math.sin(2 * D_rad + M1_rad);
  longitude += 0.045758 * Math.sin(2 * D_rad - M_rad);
  
  // Normalize to 0-360
  longitude = longitude % 360;
  if (longitude < 0) longitude += 360;
  
  return longitude;
}

/**
 * Calculate the Moon's sidereal longitude (Vedic/sidereal zodiac)
 * Using Lahiri ayanamsa
 */
export function getMoonSiderealLongitude(date: Date = new Date()): number {
  const jd = getJulianDay(date);
  const tropicalLongitude = getMoonLongitude(jd);
  
  // Calculate Lahiri ayanamsa (precession correction)
  const T = (jd - 2451545.0) / 36525;
  const ayanamsa = 23.85 + 0.013888889 * (jd - 2451545.0) / 365.25;
  
  // Convert tropical to sidereal
  let siderealLongitude = tropicalLongitude - ayanamsa;
  
  // Normalize to 0-360 range
  while (siderealLongitude < 0) siderealLongitude += 360;
  while (siderealLongitude >= 360) siderealLongitude -= 360;
  
  return siderealLongitude;
}

/**
 * Get the current Nakshatra based on Moon's sidereal longitude
 */
export function getCurrentNakshatra(date: Date = new Date()): NakshatraInfo {
  const longitude = getMoonSiderealLongitude(date);
  
  const nakshatra = NAKSHATRAS.find(
    (n) => longitude >= n.startDegree && longitude < n.endDegree
  );
  
  return nakshatra || NAKSHATRAS[0];
}

/**
 * Get Nakshatra by slug
 */
export function getNakshatraBySlug(slug: string): NakshatraInfo | undefined {
  return NAKSHATRAS.find((n) => n.slug === slug);
}

/**
 * Get Nakshatra by index (1-27)
 */
export function getNakshatraByIndex(index: number): NakshatraInfo | undefined {
  return NAKSHATRAS.find((n) => n.index === index);
}
