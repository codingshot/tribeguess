import { memo } from 'react';

interface CountryFlagProps {
  /** ISO 3166-1 alpha-2 country code (e.g. "KE", "NG") */
  code: string;
  /** Size in pixels. Defaults to 16. */
  size?: number;
  /** Optional CSS class */
  className?: string;
  /** Alt text / tooltip */
  label?: string;
}

/**
 * Renders a country flag as an SVG image from flagcdn.com.
 * Works consistently across all devices and platforms unlike emoji flags.
 */
export const CountryFlag = memo(function CountryFlag({ 
  code, 
  size = 16, 
  className = '',
  label 
}: CountryFlagProps) {
  if (!code || code === 'ALL') {
    return (
      <span 
        className={`inline-flex items-center justify-center ${className}`} 
        style={{ width: size, height: size }}
        role="img" 
        aria-label={label || 'All countries'}
      >
        🌍
      </span>
    );
  }

  const lowerCode = code.toLowerCase();
  // Use 2x width for flag aspect ratio (flags are wider than tall)
  const width = Math.round(size * 1.33);

  return (
    <img
      src={`https://flagcdn.com/${lowerCode}.svg`}
      alt={label || code}
      title={label}
      width={width}
      height={size}
      loading="lazy"
      decoding="async"
      className={`inline-block rounded-[1px] object-cover ${className}`}
      style={{ width, height: size }}
      onError={(e) => {
        // Fallback: hide broken image and show code text
        const target = e.currentTarget;
        target.style.display = 'none';
        const fallback = document.createElement('span');
        fallback.textContent = code;
        fallback.className = 'text-xs text-muted-foreground';
        target.parentNode?.insertBefore(fallback, target.nextSibling);
      }}
    />
  );
});

/** Map common country names to ISO codes for diaspora/religion data */
export const countryNameToCode: Record<string, string> = {
  'United States': 'US', 'USA': 'US',
  'United Kingdom': 'GB', 'UK': 'GB',
  'Canada': 'CA', 'Germany': 'DE', 'France': 'FR',
  'Australia': 'AU', 'South Africa': 'ZA',
  'Tanzania': 'TZ', 'Uganda': 'UG', 'Kenya': 'KE',
  'Ethiopia': 'ET', 'Nigeria': 'NG', 'Ghana': 'GH',
  'Netherlands': 'NL', 'Belgium': 'BE',
  'Sweden': 'SE', 'Norway': 'NO',
  'Italy': 'IT', 'Spain': 'ES',
  'UAE': 'AE', 'Saudi Arabia': 'SA',
  'China': 'CN', 'India': 'IN', 'Brazil': 'BR',
  'Egypt': 'EG', 'Algeria': 'DZ', 'Morocco': 'MA',
  'Sudan': 'SD', 'South Sudan': 'SS',
  'DR Congo': 'CD', 'Congo-Brazzaville': 'CG',
  'Angola': 'AO', 'Mozambique': 'MZ', 'Zimbabwe': 'ZW',
  'Botswana': 'BW', 'Eswatini': 'SZ', 'Eritrea': 'ER',
  'Rwanda': 'RW', 'Burundi': 'BI', 'Cameroon': 'CM',
  'Mali': 'ML', 'Burkina Faso': 'BF',
  'Benin': 'BJ', 'Togo': 'TG',
  'Senegal': 'SN', 'Somalia': 'SO',
  'Zambia': 'ZM', 'Malawi': 'MW', 'Namibia': 'NA',
  'Lesotho': 'LS', 'Madagascar': 'MG',
  'Haiti': 'HT', 'Cuba': 'CU',
  "Côte d'Ivoire": 'CI', 'Ivory Coast': 'CI',
  'Other': '', 'Other diaspora': '', 'Diaspora': '',
  'Brazil (Candomblé)': 'BR', 'Cuba (Santería)': 'CU',
  'Haiti (diaspora)': 'HT',
};

/** Get ISO code from a country name, with fallback */
export function getCodeFromName(name: string): string {
  return countryNameToCode[name] || '';
}
