import { useState, useMemo } from 'react';
import { CountryFlag } from '@/components/CountryFlag';
import { Link } from 'react-router-dom';
import { MapPin, Users, Compass, Info, ExternalLink, Globe, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { getCountries } from '@/lib/tribeDetection';

interface Tribe {
  id: string;
  name: string;
  slug: string;
  region: string;
  population: string;
  populationPercent: string;
  mapCoordinates: { lat: number; lng: number };
  counties: string[];
  countries?: string[];
}

interface DynamicMapViewProps {
  tribes: Tribe[];
  selectedTribe?: string;
  onTribeSelect?: (slug: string) => void;
  countryFilter?: string;
}

// Country bounding boxes for proper framing (minLat, maxLat, minLng, maxLng)
const countryBounds: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number; name: string }> = {
  'KE': { minLat: -4.7, maxLat: 4.6, minLng: 33.9, maxLng: 41.9, name: 'Kenya' },
  'TZ': { minLat: -11.7, maxLat: -1.0, minLng: 29.3, maxLng: 40.4, name: 'Tanzania' },
  'UG': { minLat: -1.5, maxLat: 4.2, minLng: 29.5, maxLng: 35.0, name: 'Uganda' },
  'RW': { minLat: -2.8, maxLat: -1.0, minLng: 28.8, maxLng: 30.9, name: 'Rwanda' },
  'BI': { minLat: -4.5, maxLat: -2.3, minLng: 29.0, maxLng: 30.8, name: 'Burundi' },
  'SS': { minLat: 3.5, maxLat: 12.2, minLng: 24.0, maxLng: 35.9, name: 'South Sudan' },
  'ET': { minLat: 3.4, maxLat: 14.9, minLng: 33.0, maxLng: 48.0, name: 'Ethiopia' },
  'SO': { minLat: -1.7, maxLat: 12.0, minLng: 40.9, maxLng: 51.4, name: 'Somalia' },
  'ER': { minLat: 12.3, maxLat: 18.0, minLng: 36.4, maxLng: 43.1, name: 'Eritrea' },
  'DJ': { minLat: 10.9, maxLat: 12.7, minLng: 41.7, maxLng: 43.4, name: 'Djibouti' },
  'CD': { minLat: -13.5, maxLat: 5.4, minLng: 12.2, maxLng: 31.3, name: 'DR Congo' },
  'NG': { minLat: 4.2, maxLat: 13.9, minLng: 2.7, maxLng: 14.7, name: 'Nigeria' },
  'GH': { minLat: 4.7, maxLat: 11.2, minLng: -3.3, maxLng: 1.2, name: 'Ghana' },
  'SN': { minLat: 12.3, maxLat: 16.7, minLng: -17.5, maxLng: -11.4, name: 'Senegal' },
  'GM': { minLat: 13.0, maxLat: 13.8, minLng: -16.8, maxLng: -13.8, name: 'Gambia' },
  'ZA': { minLat: -34.8, maxLat: -22.1, minLng: 16.5, maxLng: 32.9, name: 'South Africa' },
  'ZW': { minLat: -22.4, maxLat: -15.6, minLng: 25.2, maxLng: 33.1, name: 'Zimbabwe' },
  'ZM': { minLat: -18.1, maxLat: -8.2, minLng: 21.9, maxLng: 33.7, name: 'Zambia' },
  'BW': { minLat: -26.9, maxLat: -17.8, minLng: 19.9, maxLng: 29.4, name: 'Botswana' },
  'NA': { minLat: -28.9, maxLat: -17.0, minLng: 11.7, maxLng: 25.3, name: 'Namibia' },
  'MW': { minLat: -17.1, maxLat: -9.4, minLng: 32.7, maxLng: 35.9, name: 'Malawi' },
  'CM': { minLat: 1.6, maxLat: 13.1, minLng: 8.5, maxLng: 16.2, name: 'Cameroon' },
  'BF': { minLat: 9.4, maxLat: 15.1, minLng: -5.5, maxLng: 2.4, name: 'Burkina Faso' },
  'CI': { minLat: 4.3, maxLat: 10.7, minLng: -8.6, maxLng: -2.5, name: 'Côte d\'Ivoire' },
  'ML': { minLat: 10.1, maxLat: 25.0, minLng: -12.2, maxLng: 4.2, name: 'Mali' },
  'AO': { minLat: -18.0, maxLat: -4.4, minLng: 11.6, maxLng: 24.1, name: 'Angola' },
  'MZ': { minLat: -26.9, maxLat: -10.5, minLng: 30.2, maxLng: 40.8, name: 'Mozambique' },
  'MG': { minLat: -25.6, maxLat: -11.9, minLng: 43.2, maxLng: 50.5, name: 'Madagascar' },
  'ALL': { minLat: -35.0, maxLat: 37.0, minLng: -18.0, maxLng: 52.0, name: 'Africa' },
};

// Distinct color palette for tribes - using hue separation for clarity
const tribeColorPalette = [
  { bg: 'rgba(220, 38, 38, 0.45)', border: 'rgb(220, 38, 38)', label: 'Red' },      // Red
  { bg: 'rgba(37, 99, 235, 0.45)', border: 'rgb(37, 99, 235)', label: 'Blue' },     // Blue
  { bg: 'rgba(22, 163, 74, 0.45)', border: 'rgb(22, 163, 74)', label: 'Green' },    // Green
  { bg: 'rgba(234, 88, 12, 0.45)', border: 'rgb(234, 88, 12)', label: 'Orange' },   // Orange
  { bg: 'rgba(147, 51, 234, 0.45)', border: 'rgb(147, 51, 234)', label: 'Purple' }, // Purple
  { bg: 'rgba(14, 165, 233, 0.45)', border: 'rgb(14, 165, 233)', label: 'Cyan' },   // Cyan
  { bg: 'rgba(236, 72, 153, 0.45)', border: 'rgb(236, 72, 153)', label: 'Pink' },   // Pink
  { bg: 'rgba(250, 204, 21, 0.45)', border: 'rgb(202, 138, 4)', label: 'Yellow' },  // Yellow
  { bg: 'rgba(20, 184, 166, 0.45)', border: 'rgb(20, 184, 166)', label: 'Teal' },   // Teal
  { bg: 'rgba(168, 85, 247, 0.45)', border: 'rgb(168, 85, 247)', label: 'Violet' }, // Violet
  { bg: 'rgba(249, 115, 22, 0.45)', border: 'rgb(249, 115, 22)', label: 'Amber' },  // Amber
  { bg: 'rgba(34, 197, 94, 0.45)', border: 'rgb(34, 197, 94)', label: 'Emerald' },  // Emerald
  { bg: 'rgba(99, 102, 241, 0.45)', border: 'rgb(99, 102, 241)', label: 'Indigo' }, // Indigo
  { bg: 'rgba(244, 63, 94, 0.45)', border: 'rgb(244, 63, 94)', label: 'Rose' },     // Rose
  { bg: 'rgba(6, 182, 212, 0.45)', border: 'rgb(6, 182, 212)', label: 'Sky' },      // Sky
];

// Territory sizes in degrees for tribes - verified against actual geographic data
// Sources: Ethnologue, Joshua Project, Wikipedia geographic references
const tribeTerritoryDegrees: Record<string, { latSpan: number; lngSpan: number }> = {
  // ===== KENYA - based on actual county coverage =====
  'Kikuyu': { latSpan: 1.4, lngSpan: 1.2 },
  'Luhya': { latSpan: 1.2, lngSpan: 1.0 },
  'Kalenjin': { latSpan: 2.5, lngSpan: 2.0 },
  'Luo': { latSpan: 1.4, lngSpan: 1.2 },
  'Kamba': { latSpan: 1.8, lngSpan: 1.5 },
  'Maasai': { latSpan: 3.0, lngSpan: 2.2 },
  'Meru': { latSpan: 1.0, lngSpan: 0.9 },
  'Kisii': { latSpan: 0.7, lngSpan: 0.6 },
  'Gusii': { latSpan: 0.7, lngSpan: 0.6 },
  'Mijikenda': { latSpan: 1.5, lngSpan: 0.6 },
  'Turkana': { latSpan: 3.0, lngSpan: 2.5 },
  'Samburu': { latSpan: 1.8, lngSpan: 1.5 },
  'Embu': { latSpan: 0.8, lngSpan: 0.7 },
  'Mbeere': { latSpan: 0.6, lngSpan: 0.6 },
  'Swahili': { latSpan: 1.2, lngSpan: 0.5 },
  'Pokot': { latSpan: 1.5, lngSpan: 1.2 },
  'Taita': { latSpan: 0.8, lngSpan: 0.7 },
  'Teso': { latSpan: 0.7, lngSpan: 0.6 },
  'Suba': { latSpan: 0.5, lngSpan: 0.5 },
  'Gabra': { latSpan: 1.5, lngSpan: 1.5 },
  'Borana': { latSpan: 2.0, lngSpan: 1.8 },
  'Rendille': { latSpan: 1.2, lngSpan: 1.2 },
  'El Molo': { latSpan: 0.3, lngSpan: 0.3 },
  'Kuria': { latSpan: 0.5, lngSpan: 0.5 },
  
  // ===== NIGERIA - based on state coverage =====
  'Yoruba': { latSpan: 3.0, lngSpan: 3.5 },
  'Igbo': { latSpan: 2.2, lngSpan: 2.0 },
  'Hausa': { latSpan: 5.0, lngSpan: 6.0 },
  'Fulani': { latSpan: 4.0, lngSpan: 8.0 },
  'Ijaw': { latSpan: 1.8, lngSpan: 1.8 },
  'Tiv': { latSpan: 2.0, lngSpan: 2.2 },
  'Edo': { latSpan: 1.2, lngSpan: 1.2 },
  'Nupe': { latSpan: 1.5, lngSpan: 1.5 },
  'Kanuri': { latSpan: 2.5, lngSpan: 2.5 },
  'Ibibio': { latSpan: 1.2, lngSpan: 1.0 },
  'Efik': { latSpan: 0.8, lngSpan: 0.8 },
  'Urhobo': { latSpan: 1.0, lngSpan: 1.0 },
  'Isoko': { latSpan: 0.6, lngSpan: 0.6 },
  'Idoma': { latSpan: 1.2, lngSpan: 1.2 },
  'Igede': { latSpan: 0.6, lngSpan: 0.6 },
  'Jukun': { latSpan: 1.5, lngSpan: 1.5 },
  'Ebira': { latSpan: 1.0, lngSpan: 1.0 },
  'Gwari': { latSpan: 1.2, lngSpan: 1.2 },
  'Berom': { latSpan: 0.8, lngSpan: 0.8 },
  
  // ===== SOUTH AFRICA =====
  'Zulu': { latSpan: 3.0, lngSpan: 2.5 },
  'Xhosa': { latSpan: 2.5, lngSpan: 2.0 },
  'Sotho': { latSpan: 2.0, lngSpan: 2.0 },
  'Tswana': { latSpan: 2.5, lngSpan: 2.5 },
  'Pedi': { latSpan: 1.5, lngSpan: 1.5 },
  'Venda': { latSpan: 1.0, lngSpan: 1.0 },
  'Ndebele': { latSpan: 1.2, lngSpan: 1.2 },
  'Swazi': { latSpan: 1.2, lngSpan: 1.0 },
  'Tsonga': { latSpan: 1.5, lngSpan: 1.5 },
  
  // ===== GHANA =====
  'Ashanti': { latSpan: 1.8, lngSpan: 1.8 },
  'Akan': { latSpan: 2.5, lngSpan: 2.5 },
  'Ewe': { latSpan: 1.5, lngSpan: 1.2 },
  'Ga-Adangbe': { latSpan: 0.8, lngSpan: 0.8 },
  'Ga': { latSpan: 0.6, lngSpan: 0.6 },
  'Dagomba': { latSpan: 1.5, lngSpan: 1.5 },
  'Fante': { latSpan: 1.0, lngSpan: 1.0 },
  
  // ===== ETHIOPIA =====
  'Oromo': { latSpan: 5.0, lngSpan: 4.5 },
  'Amhara': { latSpan: 3.5, lngSpan: 3.0 },
  'Tigrinya': { latSpan: 2.0, lngSpan: 1.8 },
  'Tigray': { latSpan: 2.0, lngSpan: 1.8 },
  'Somali': { latSpan: 5.0, lngSpan: 6.0 },
  'Afar': { latSpan: 2.5, lngSpan: 2.0 },
  'Gurage': { latSpan: 1.0, lngSpan: 1.0 },
  'Sidama': { latSpan: 1.0, lngSpan: 1.0 },
  'Wolayta': { latSpan: 0.8, lngSpan: 0.8 },
  'Harari': { latSpan: 0.3, lngSpan: 0.3 },
  'Tigre': { latSpan: 1.5, lngSpan: 1.5 },
  
  // ===== UGANDA =====
  'Baganda': { latSpan: 1.8, lngSpan: 1.8 },
  'Banyankole': { latSpan: 1.5, lngSpan: 1.5 },
  'Basoga': { latSpan: 1.0, lngSpan: 1.0 },
  'Bakiga': { latSpan: 0.8, lngSpan: 0.8 },
  'Acholi': { latSpan: 1.5, lngSpan: 1.5 },
  'Langi': { latSpan: 1.2, lngSpan: 1.2 },
  'Karamojong': { latSpan: 1.5, lngSpan: 1.5 },
  'Iteso': { latSpan: 1.2, lngSpan: 1.2 },
  'Lugbara': { latSpan: 1.0, lngSpan: 1.0 },
  'Banyoro': { latSpan: 1.2, lngSpan: 1.2 },
  'Batoro': { latSpan: 1.0, lngSpan: 1.0 },
  
  // ===== TANZANIA =====
  'Sukuma': { latSpan: 2.5, lngSpan: 2.5 },
  'Chagga': { latSpan: 0.6, lngSpan: 0.6 },
  'Haya': { latSpan: 1.2, lngSpan: 1.0 },
  'Nyamwezi': { latSpan: 2.0, lngSpan: 2.0 },
  'Makonde': { latSpan: 1.0, lngSpan: 1.0 },
  'Hehe': { latSpan: 1.5, lngSpan: 1.5 },
  'Gogo': { latSpan: 2.0, lngSpan: 2.0 },
  'Ha': { latSpan: 1.0, lngSpan: 1.0 },
  'Pare': { latSpan: 0.6, lngSpan: 0.5 },
  'Iraqw': { latSpan: 0.8, lngSpan: 0.8 },
  
  // ===== SENEGAL / WEST AFRICA =====
  'Wolof': { latSpan: 2.0, lngSpan: 2.5 },
  'Serer': { latSpan: 1.2, lngSpan: 1.2 },
  'Mandinka': { latSpan: 2.5, lngSpan: 3.0 },
  'Diola': { latSpan: 1.0, lngSpan: 1.0 },
  'Jola': { latSpan: 1.0, lngSpan: 1.0 },
  
  // ===== ZIMBABWE / ZAMBIA / MALAWI =====
  'Shona': { latSpan: 3.0, lngSpan: 2.5 },
  'Ndebele (Zimbabwe)': { latSpan: 2.0, lngSpan: 2.0 },
  'Bemba': { latSpan: 2.5, lngSpan: 2.5 },
  'Tonga (Zambia)': { latSpan: 1.5, lngSpan: 1.5 },
  'Chewa': { latSpan: 2.0, lngSpan: 2.0 },
  'Yao': { latSpan: 1.5, lngSpan: 1.5 },
  'Lozi': { latSpan: 2.0, lngSpan: 2.0 },
  'Tumbuka': { latSpan: 1.2, lngSpan: 1.2 },
  
  // ===== NAMIBIA / BOTSWANA =====
  'Himba': { latSpan: 1.5, lngSpan: 1.5 },
  'Herero': { latSpan: 2.0, lngSpan: 2.0 },
  'Ovambo': { latSpan: 1.5, lngSpan: 2.0 },
  'San': { latSpan: 3.0, lngSpan: 3.0 },
  'Damara': { latSpan: 2.0, lngSpan: 2.0 },
  'Nama': { latSpan: 2.5, lngSpan: 2.5 },
  
  // ===== DR CONGO =====
  'Luba': { latSpan: 3.0, lngSpan: 2.5 },
  'Kongo': { latSpan: 2.5, lngSpan: 2.0 },
  'Mongo': { latSpan: 3.0, lngSpan: 3.0 },
  'Lunda': { latSpan: 2.5, lngSpan: 2.5 },
  'Mangbetu': { latSpan: 1.5, lngSpan: 1.5 },
  'Azande': { latSpan: 2.5, lngSpan: 2.5 },
  'Tetela': { latSpan: 1.5, lngSpan: 1.5 },
  
  // ===== RWANDA / BURUNDI =====
  'Hutu': { latSpan: 1.5, lngSpan: 1.2 },
  'Tutsi': { latSpan: 1.5, lngSpan: 1.2 },
  'Twa': { latSpan: 1.0, lngSpan: 1.0 },
  'Banyarwanda': { latSpan: 1.8, lngSpan: 1.5 },
  
  // ===== SAHEL / SAHARA =====
  'Tuareg': { latSpan: 6.0, lngSpan: 8.0 },
  'Songhai': { latSpan: 2.5, lngSpan: 3.0 },
  'Mossi': { latSpan: 2.5, lngSpan: 2.5 },
  'Bambara': { latSpan: 3.0, lngSpan: 3.5 },
  'Dogon': { latSpan: 1.0, lngSpan: 1.0 },
  'Songhay': { latSpan: 2.5, lngSpan: 3.0 },
  'Djerma': { latSpan: 2.0, lngSpan: 2.0 },
  
  // ===== CAMEROON =====
  'Bamileke': { latSpan: 1.2, lngSpan: 1.2 },
  'Beti-Pahuin': { latSpan: 2.0, lngSpan: 2.0 },
  'Beti': { latSpan: 2.0, lngSpan: 2.0 },
  'Fulbe': { latSpan: 2.0, lngSpan: 2.0 },
  'Fang': { latSpan: 2.0, lngSpan: 2.0 },
  'Duala': { latSpan: 0.8, lngSpan: 0.8 },
  'Bassa': { latSpan: 1.0, lngSpan: 1.0 },
  
  // ===== NORTH AFRICA =====
  'Berber': { latSpan: 5.0, lngSpan: 8.0 },
  'Amazigh': { latSpan: 5.0, lngSpan: 8.0 },
  'Kabyle': { latSpan: 1.5, lngSpan: 1.5 },
  'Riffian': { latSpan: 1.0, lngSpan: 1.5 },
  'Shilha': { latSpan: 2.0, lngSpan: 2.0 },
  'Nubian': { latSpan: 3.0, lngSpan: 2.0 },
  'Copts': { latSpan: 4.0, lngSpan: 3.0 },
  'Beja': { latSpan: 3.0, lngSpan: 2.5 },
  
  // ===== ANGOLA / MOZAMBIQUE =====
  'Ovimbundu': { latSpan: 2.5, lngSpan: 2.5 },
  'Mbundu': { latSpan: 2.0, lngSpan: 2.0 },
  'Bakongo': { latSpan: 2.0, lngSpan: 2.0 },
  'Makua': { latSpan: 3.0, lngSpan: 2.5 },
  'Sena': { latSpan: 1.5, lngSpan: 1.5 },
  
  // ===== SUDAN / SOUTH SUDAN =====
  'Dinka': { latSpan: 4.0, lngSpan: 3.5 },
  'Nuer': { latSpan: 3.0, lngSpan: 2.5 },
  'Shilluk': { latSpan: 1.5, lngSpan: 1.5 },
  'Bari': { latSpan: 1.5, lngSpan: 1.5 },
  'Fur': { latSpan: 2.5, lngSpan: 2.5 },
  'Zaghawa': { latSpan: 2.0, lngSpan: 2.0 },
  
  // ===== MADAGASCAR =====
  'Merina': { latSpan: 2.5, lngSpan: 2.0 },
  'Betsileo': { latSpan: 2.0, lngSpan: 1.5 },
  'Betsimisaraka': { latSpan: 3.0, lngSpan: 1.0 },
  'Sakalava': { latSpan: 4.0, lngSpan: 2.0 },
  'Antandroy': { latSpan: 1.5, lngSpan: 2.0 },
  'Mahafaly': { latSpan: 1.5, lngSpan: 1.5 },
  
  // ===== HORN OF AFRICA =====
  'Bilen': { latSpan: 0.5, lngSpan: 0.5 },
  'Saho': { latSpan: 1.0, lngSpan: 0.8 },
  'Kunama': { latSpan: 1.0, lngSpan: 1.0 },
};

const getTerritoryDegrees = (tribeName: string, counties: string[]): { latSpan: number; lngSpan: number } => {
  // Direct match
  if (tribeTerritoryDegrees[tribeName]) {
    return tribeTerritoryDegrees[tribeName];
  }
  
  // Try to match partial names (e.g., "Bambara (Bamana)" should match "Bambara")
  const simpleName = tribeName.split(' ')[0].split('(')[0].trim();
  if (tribeTerritoryDegrees[simpleName]) {
    return tribeTerritoryDegrees[simpleName];
  }
  
  // Try matching without parenthetical content
  const cleanName = tribeName.replace(/\s*\([^)]*\)\s*/g, '').trim();
  if (tribeTerritoryDegrees[cleanName]) {
    return tribeTerritoryDegrees[cleanName];
  }
  
  // Fallback based on county count - more granular
  const countyCount = counties.length;
  if (countyCount >= 8) return { latSpan: 3.5, lngSpan: 3.2 };
  if (countyCount >= 6) return { latSpan: 2.8, lngSpan: 2.5 };
  if (countyCount >= 4) return { latSpan: 2.0, lngSpan: 1.8 };
  if (countyCount >= 2) return { latSpan: 1.5, lngSpan: 1.3 };
  return { latSpan: 1.0, lngSpan: 1.0 };
};

export function DynamicMapView({ tribes, selectedTribe, onTribeSelect, countryFilter = 'KE' }: DynamicMapViewProps) {
  const [hoveredTribe, setHoveredTribe] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const allCountries = getCountries();
  const baseBounds = countryBounds[countryFilter] || countryBounds['KE'];
  const countryInfo = allCountries.find(c => c.code === countryFilter);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.5, 8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  // Compute base bounds (before zoom)
  const baseBoundsComputed = useMemo(() => {
    if (countryFilter && countryFilter !== 'ALL' && countryBounds[countryFilter]) {
      const b = countryBounds[countryFilter];
      const latPad = (b.maxLat - b.minLat) * 0.1;
      const lngPad = (b.maxLng - b.minLng) * 0.1;
      return {
        minLat: Math.max(-85, b.minLat - latPad),
        maxLat: Math.min(85, b.maxLat + latPad),
        minLng: Math.max(-180, b.minLng - lngPad),
        maxLng: Math.min(180, b.maxLng + lngPad),
      };
    }

    if (tribes.length > 0) {
      const lats = tribes.map(t => t.mapCoordinates.lat);
      const lngs = tribes.map(t => t.mapCoordinates.lng);

      let minLat = Math.min(...lats);
      let maxLat = Math.max(...lats);
      let minLng = Math.min(...lngs);
      let maxLng = Math.max(...lngs);

      const latRange = Math.max(2, maxLat - minLat);
      const lngRange = Math.max(2, maxLng - minLng);

      const padLat = latRange * 0.2;
      const padLng = lngRange * 0.2;

      return {
        minLat: Math.max(-85, minLat - padLat),
        maxLat: Math.min(85, maxLat + padLat),
        minLng: Math.max(-180, minLng - padLng),
        maxLng: Math.min(180, maxLng + padLng),
      };
    }

    const africa = countryBounds['ALL'];
    return { minLat: africa.minLat, maxLat: africa.maxLat, minLng: africa.minLng, maxLng: africa.maxLng };
  }, [tribes, countryFilter]);

  // Apply zoom to bounds
  const osmBounds = useMemo(() => {
    const centerLat = (baseBoundsComputed.minLat + baseBoundsComputed.maxLat) / 2;
    const centerLng = (baseBoundsComputed.minLng + baseBoundsComputed.maxLng) / 2;
    
    const latHalf = (baseBoundsComputed.maxLat - baseBoundsComputed.minLat) / 2 / zoomLevel;
    const lngHalf = (baseBoundsComputed.maxLng - baseBoundsComputed.minLng) / 2 / zoomLevel;

    return {
      minLat: Math.max(-85, centerLat - latHalf),
      maxLat: Math.min(85, centerLat + latHalf),
      minLng: Math.max(-180, centerLng - lngHalf),
      maxLng: Math.min(180, centerLng + lngHalf),
    };
  }, [baseBoundsComputed, zoomLevel]);

  const osmEmbedUrl = useMemo(() => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${osmBounds.minLng}%2C${osmBounds.minLat}%2C${osmBounds.maxLng}%2C${osmBounds.maxLat}&layer=mapnik`;
  }, [osmBounds]);

  const osmFullUrl = `https://www.openstreetmap.org/?bbox=${osmBounds.minLng}%2C${osmBounds.minLat}%2C${osmBounds.maxLng}%2C${osmBounds.maxLat}&layer=mapnik`;

  const activeId = hoveredTribe || selectedTribe;
  const activeTribe = tribes.find(t => t.slug === activeId);

  // Web Mercator projection functions
  const toWorldX = (lng: number) => (lng + 180) / 360;
  const toWorldY = (lat: number) => {
    const rad = (lat * Math.PI) / 180;
    return (1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2;
  };

  // Convert geographic coordinates to percentage position on the map
  const coordToPercent = (lat: number, lng: number) => {
    const xMin = toWorldX(osmBounds.minLng);
    const xMax = toWorldX(osmBounds.maxLng);
    const yTop = toWorldY(osmBounds.maxLat);
    const yBottom = toWorldY(osmBounds.minLat);

    const left = ((toWorldX(lng) - xMin) / (xMax - xMin)) * 100;
    const top = ((toWorldY(lat) - yTop) / (yBottom - yTop)) * 100;

    return { left, top };
  };

  // Convert degree span to percentage width/height on the map using proper Mercator projection
  const degreesToPercent = (latSpan: number, lngSpan: number, centerLat: number) => {
    // Use Web Mercator projection for accurate sizing
    const xMin = toWorldX(osmBounds.minLng);
    const xMax = toWorldX(osmBounds.maxLng);
    const yTop = toWorldY(osmBounds.maxLat);
    const yBottom = toWorldY(osmBounds.minLat);
    
    // Calculate width in Mercator coordinates
    const widthPercent = (lngSpan / 360) / (xMax - xMin) * 100;
    
    // Calculate height using Mercator Y difference at center latitude
    const topY = toWorldY(centerLat + latSpan / 2);
    const bottomY = toWorldY(centerLat - latSpan / 2);
    const heightPercent = Math.abs(bottomY - topY) / Math.abs(yBottom - yTop) * 100;
    
    return { widthPercent, heightPercent };
  };

  // Assign colors to tribes based on index for consistent coloring
  const getTribeColor = (index: number) => {
    return tribeColorPalette[index % tribeColorPalette.length];
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              <CountryFlag code={countryInfo?.code || ''} size={18} label={countryInfo?.name} /> {baseBounds.name} Tribal Territories
            </h3>
            {zoomLevel !== 1 && (
              <span className="text-xs text-muted-foreground ml-2">({Math.round(zoomLevel * 100)}% zoom)</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{tribes.length} tribes</span>
            <a
              href={osmFullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <span>Full Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Map Area */}
      <div className="relative" style={{ paddingBottom: '70%' }}>
        {/* OpenStreetMap Background */}
        <iframe
          src={osmEmbedUrl}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          title={`Map of ${baseBounds.name} showing tribal territories`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
        />
        
        {/* Territory Region Overlays - drawn as percentage-based ellipses */}
        <div className="absolute inset-0 overflow-hidden">
          {tribes.map((tribe, index) => {
            const { left, top } = coordToPercent(tribe.mapCoordinates.lat, tribe.mapCoordinates.lng);
            const isActive = tribe.slug === activeId;
            const color = getTribeColor(index);
            
            // Get territory size in degrees
            const territoryDegrees = getTerritoryDegrees(tribe.name, tribe.counties);
            const { widthPercent, heightPercent } = degreesToPercent(
              territoryDegrees.latSpan, 
              territoryDegrees.lngSpan,
              tribe.mapCoordinates.lat
            );
            
            // Clamp sizes to reasonable values
            const clampedWidth = Math.min(Math.max(widthPercent, 8), 60);
            const clampedHeight = Math.min(Math.max(heightPercent, 6), 50);
            
            // Skip if center is outside visible area
            if (left < -20 || left > 120 || top < -20 || top > 120) return null;
            
            return (
              <div key={`territory-${tribe.id}-${index}`}>
                {/* Territory region - ellipse sized by geographic extent */}
                <div
                  className={`absolute transition-all duration-300 pointer-events-none ${isActive ? 'z-10' : 'z-0'}`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${clampedWidth}%`,
                    height: `${clampedHeight}%`,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(ellipse 100% 100% at 50% 50%, 
                      ${color.bg} 0%, 
                      ${color.bg.replace('0.45', '0.3')} 40%, 
                      ${color.bg.replace('0.45', '0.15')} 70%,
                      transparent 100%)`,
                    borderRadius: '50%',
                    border: isActive ? `3px solid ${color.border}` : `2px dashed ${color.border}66`,
                    opacity: isActive ? 1 : 0.85,
                  }}
                />
                
                {/* Inner core - shows population center */}
                <div
                  className={`absolute transition-all duration-200 pointer-events-none ${isActive ? 'z-11' : 'z-1'}`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${clampedWidth * 0.4}%`,
                    height: `${clampedHeight * 0.4}%`,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(ellipse 100% 100% at 50% 50%, 
                      ${color.bg.replace('0.45', '0.6')} 0%, 
                      ${color.bg.replace('0.45', '0.35')} 60%,
                      transparent 100%)`,
                    borderRadius: '50%',
                  }}
                />
              </div>
            );
          })}
          
          {/* Interactive markers on top of territories */}
          {tribes.map((tribe, index) => {
            const { left, top } = coordToPercent(tribe.mapCoordinates.lat, tribe.mapCoordinates.lng);
            const isActive = tribe.slug === activeId;
            const color = getTribeColor(index);
            
            if (left < -10 || left > 110 || top < -10 || top > 110) return null;
            
            return (
              <Link
                key={`marker-${tribe.id}-${index}`}
                to={`/learn/${tribe.slug}`}
                className="pointer-events-auto absolute cursor-pointer group"
                style={{ 
                  left: `${left}%`, 
                  top: `${top}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isActive ? 30 : 20,
                }}
                onMouseEnter={() => setHoveredTribe(tribe.slug)}
                onMouseLeave={() => setHoveredTribe(null)}
                onClick={() => onTribeSelect?.(tribe.slug)}
              >
                {/* Pulse animation when active */}
                {isActive && (
                  <div 
                    className="absolute rounded-full animate-ping"
                    style={{ 
                      width: '40px',
                      height: '40px',
                      left: '-20px',
                      top: '-20px',
                      background: color.bg,
                    }}
                  />
                )}
                
                {/* Center marker dot */}
                <div 
                  className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white transition-all duration-200 group-hover:scale-125"
                  style={{ 
                    width: isActive ? '28px' : '22px', 
                    height: isActive ? '28px' : '22px',
                    left: isActive ? '-14px' : '-11px',
                    top: isActive ? '-14px' : '-11px',
                    background: color.border,
                    fontSize: '9px',
                  }}
                >
                  {parseInt(tribe.populationPercent) > 5 ? tribe.populationPercent : ''}
                </div>
                
                {/* Name label */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-bold shadow-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-foreground text-background scale-110' 
                      : 'bg-card/95 text-foreground border border-border'
                  }`}
                  style={{ top: isActive ? '18px' : '14px' }}
                >
                  {tribe.name}
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Country Label */}
        <div className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-border z-40">
          <div className="flex items-center gap-2">
            {countryInfo && <CountryFlag code={countryInfo.code} size={22} label={countryInfo.name} />}
            <div>
              <p className="text-sm font-bold text-foreground">{baseBounds.name}</p>
              <p className="text-[10px] text-muted-foreground">Tribal Territories</p>
            </div>
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="absolute top-3 right-14 flex flex-col gap-1 z-40">
          <button
            onClick={handleZoomIn}
            className="bg-background/95 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center shadow-lg border border-border hover:bg-primary/10 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-background/95 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center shadow-lg border border-border hover:bg-primary/10 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-foreground" />
          </button>
          {zoomLevel !== 1 && (
            <button
              onClick={handleResetZoom}
              className="bg-background/95 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center shadow-lg border border-border hover:bg-primary/10 transition-colors"
              title="Reset zoom"
            >
              <RotateCcw className="w-4 h-4 text-foreground" />
            </button>
          )}
        </div>
        
        {/* Compass */}
        <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-border z-40">
          <Compass className="w-5 h-5 text-primary" />
        </div>
        
        {/* Hover Info Card */}
        {activeTribe && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-80 bg-card/95 backdrop-blur-sm rounded-lg border border-border p-3 shadow-lg animate-fade-in z-40">
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: getTribeColor(tribes.findIndex(t => t.id === activeTribe.id)).bg }}
              >
                <MapPin className="w-5 h-5" style={{ color: getTribeColor(tribes.findIndex(t => t.id === activeTribe.id)).border }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-foreground text-base">{activeTribe.name}</h4>
                <p className="text-xs text-muted-foreground">{activeTribe.region}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{activeTribe.population}</span>
                  </div>
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ 
                      background: getTribeColor(tribes.findIndex(t => t.id === activeTribe.id)).bg,
                      color: getTribeColor(tribes.findIndex(t => t.id === activeTribe.id)).border
                    }}
                  >
                    {activeTribe.populationPercent}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  📍 {activeTribe.counties.slice(0, 3).join(', ')}{activeTribe.counties.length > 3 ? ` +${activeTribe.counties.length - 3} more` : ''}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="p-4 bg-secondary/30 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Tribes in {baseBounds.name}</span>
        </div>
        
        {/* Tribe Quick Links with color indicators */}
        <div className="flex flex-wrap gap-1.5">
          {tribes.map((tribe, index) => {
            const color = getTribeColor(index);
            return (
              <Link
                key={`link-${tribe.id}-${index}`}
                to={`/learn/${tribe.slug}`}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  tribe.slug === activeId
                    ? 'ring-2 ring-offset-1 ring-foreground'
                    : 'hover:scale-105'
                }`}
                style={{
                  background: color.bg,
                  color: color.border,
                  borderColor: color.border,
                }}
                onMouseEnter={() => setHoveredTribe(tribe.slug)}
                onMouseLeave={() => setHoveredTribe(null)}
              >
                <span 
                  className="w-2 h-2 rounded-full border border-white" 
                  style={{ background: color.border }} 
                />
                {tribe.name}
              </Link>
            );
          })}
        </div>
        
        {tribes.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            No tribes found for this region. Try selecting a different country or clearing filters.
          </p>
        )}
      </div>
    </div>
  );
}