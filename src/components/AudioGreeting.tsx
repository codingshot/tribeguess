import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Volume2, Loader2 } from 'lucide-react';

interface AudioGreetingProps {
  phrase: string;
  meaning: string;
  phonetic?: string;
  languageFamily?: string;
  languageName?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Phonetic breakdown mappings for common African language sounds
const phoneticMappings: Record<string, string> = {
  // Kikuyu
  "Wĩmwega": "weem-WEH-gah",
  "Nĩ wega": "nee WEH-gah",
  "Nĩ ũhoro": "nee oo-HO-roh",
  "Ũhoro waku?": "oo-HO-roh WAH-koo",
  "Tigwo na wega": "teeg-WOH nah WEH-gah",
  "Nĩ ngũcamũkia": "nee ngoo-chah-MOO-kee-ah",
  "Thaai": "TAH-ee",
  "Ngai baba": "ngah-ee BAH-bah",
  
  // Luo
  "Misawa": "mee-SAH-wah",
  "Oyawore": "oh-yah-WOH-reh",
  "Nade": "NAH-deh",
  "Ber ahinya": "behr ah-HEEN-yah",
  "Oriti": "oh-REE-tee",
  "Erokamano": "eh-roh-kah-MAH-noh",
  
  // Maasai
  "Supai": "soo-PAH-ee",
  "Yeyo takwenya": "YEH-yo tahk-WEHN-yah",
  "Serian": "seh-ree-AHN",
  "Ashe oleng": "AH-sheh oh-LEHNG",
  "Sidai": "see-DAH-ee",
  "Keserian ingera": "keh-seh-ree-AHN een-GEH-rah",
  
  // Kalenjin
  "Chamgei": "chahm-GAY",
  "Subai": "soo-BAH-ee",
  "Mising": "mee-SEENG",
  "Kongoi": "kohn-GOH-ee",
  "Achamin": "ah-CHAH-meen",
  
  // Kamba
  "Uvoo": "oo-VOH-oh",
  "Wakya": "WAHK-yah",
  "Nesa": "NEH-sah",
  "Asyokya undu?": "ah-SHOHK-yah OON-doo",
  "Ni vata": "nee VAH-tah",
  
  // Luhya
  "Muraho": "moo-RAH-hoh",
  "Mulembe": "moo-LEHM-beh",
  "Oli otia?": "OH-lee oh-TEE-ah",
  "Nasimikhana": "nah-see-mee-KAH-nah",
  "Bulayi": "boo-LAH-yee",
  
  // Meru
  "Muuga": "MOO-gah",
  "Muga muno": "MOO-gah MOO-noh",
  "Niukwega?": "nee-oo-KWEH-gah",
  "Ni kuu": "nee KOO-oo",
  "Riruka": "ree-ROO-kah",
  
  // Kisii/Gusii
  "Bwakire": "bwah-KEE-reh",
  "Bwareire?": "bwah-REH-ee-reh",
  "Amabobo": "ah-mah-BOH-boh",
  "Ribogaine": "ree-boh-GAH-ee-neh",
  
  // Swahili
  "Jambo": "JAHM-boh",
  "Habari": "hah-BAH-ree",
  "Habari yako?": "hah-BAH-ree YAH-koh",
  "Nzuri sana": "n-ZOO-ree SAH-nah",
  "Karibu": "kah-REE-boo",
  "Asante": "ah-SAHN-teh",
  "Kwaheri": "kwah-HEH-ree",
  "Pole": "POH-leh",
  "Hakuna matata": "hah-KOO-nah mah-TAH-tah",
  
  // Yoruba
  "Ẹ kú": "eh KOO",
  "Ẹ kú àárọ̀": "eh KOO ah-AH-roh",
  "Báwo ni?": "BAH-woh nee",
  "Mo wà dáadáa": "moh wah DAH-dah",
  "Ẹ kú ọjọ́": "eh KOO oh-JOH",
  "O dàbọ̀": "oh DAH-boh",
  
  // Igbo
  "Kedụ": "keh-DOO",
  "Kedụ ka ị mere?": "keh-DOO kah ee MEH-reh",
  "Ọ dị mma": "oh dee MMAH",
  "Ndewo": "n-DEH-woh",
  "Ka ọ dị": "kah oh DEE",
  
  // Hausa
  "Sannu": "SAHN-noo",
  "Ina kwana?": "ee-nah KWAH-nah",
  "Lafiya lau": "lah-FEE-yah LAH-oo",
  "Yaya dai?": "YAH-yah dah-ee",
  "Sai anjima": "sah-ee ahn-JEE-mah",
  
  // Zulu
  "Sawubona": "sah-woo-BOH-nah",
  "Unjani?": "oon-JAH-nee",
  "Ngikhona": "ngee-KOH-nah",
  "Yebo": "YEH-boh",
  "Ngiyabonga": "ngee-yah-BOHN-gah",
  "Sala kahle": "SAH-lah KAH-leh",
  "Hamba kahle": "HAHM-bah KAH-leh",
  
  // Xhosa
  "Molo": "MOH-loh",
  "Molweni": "mohl-WEH-nee",
  "Unjani? (Xhosa)": "oon-JAH-nee",
  "Ndiyaphila": "ndee-yah-PEE-lah",
  "Enkosi": "ehn-KOH-see",
  
  // Amharic
  "Selam": "seh-LAHM",
  "Tena yistilign": "teh-nah yee-stee-LEEN",
  "Dehna neh?": "deh-NAH neh",
  "Egziabhier yimesgen": "ehg-zee-ahb-HEER yee-mehs-gehn",
  "Amesegnalehu": "ah-meh-sehg-nah-LEH-hoo",
  
  // Oromo
  "Akkam": "ahk-KAHM",
  "Fayyaa ta'ee?": "fah-YAH-ah tah-EE",
  "Nagaadha": "nah-GAH-dah",
  "Galatoomaa": "gah-lah-TOH-mah",
  
  // Wolof
  "Na nga def": "nah ngah DEHF",
  "Jërëjëf": "jeh-reh-JEHF",
  "Nanga def?": "NAHN-gah dehf",
  "Mangi fi rekk": "MAHN-gee fee rehk",
  
  // Ashanti/Akan
  "Ɛte sɛn?": "eh-teh SEHN",
  "Akwaaba": "ahk-WAH-bah",
  "Medaase": "meh-DAH-seh",
  "Nante yie": "NAHN-teh YEE-eh",
  
  // Shona
  "Mhoro": "mm-HOH-roh",
  "Makadii?": "mah-kah-DEE",
  "Tiripo": "tee-REE-poh",
  "Mazvita": "mahz-VEE-tah",
  
  // Chagga
  "Woshe": "WOH-sheh",
  "Oli kuryie?": "OH-lee koo-RYEE-eh",
  "Mashuki": "mah-SHOO-kee",
  
  // Tswana
  "Dumela": "doo-MEH-lah",
  "O tsogile jang?": "oh tsoh-GEE-leh jahng",
  "Ke tsogile sentle": "keh tsoh-GEE-leh SEHN-tleh",
  "Ke a leboga": "keh ah leh-BOH-gah",
  
  // Somali  
  "Salaam alaykum": "sah-LAHM ah-LAY-koom",
  "Iska warran": "EES-kah wah-RAHN",
  "Nabad": "nah-BAHD",
  "Mahadsanid": "mah-hahd-sah-NEED",
  
  // Tigrinya
  "Selam (Tigrinya)": "seh-LAHM",
  "Kemey aleka": "keh-MEY ah-LEH-kah",
  "Dehaando": "deh-hahn-DOH",
  "Yekenyelay": "yeh-kehn-yeh-LAY",
  
  // Bambara
  "I ni ce": "ee nee CHEH",
  "I ka kene wa?": "ee kah KEH-neh wah",
  "Toro te": "TOH-roh teh",
  "A ni ce": "ah nee CHEH",
  
  // Fulani/Fula
  "Jam waali": "jahm WAH-lee",
  "No mbadda?": "noh m-BAH-dah",
  "Jam tan": "jahm tahn",
  "Useko": "oo-SEH-koh",
  
  // Himba
  "Moro": "MOH-roh",
  "Wa penduka nawa?": "wah pehn-DOO-kah NAH-wah",
  "Nawa": "NAH-wah",
  
  // Berber/Amazigh phrases
  "Azul": "ah-ZOOL",
  "Tanmirt": "tah-neh-MEERT",
  "Tanemmirt": "tah-neh-MEERT",
  "Manzakin?": "mahn-zah-KEEN",
  "Labas": "lah-BAHS",
  "Ar tufat": "ahr too-FAHT",
  "Ayyuz": "ah-YOOZ",
  "Azul fellawen": "ah-ZOOL fell-AH-wehn",
  
  // Turkana
  "Yepa": "YEH-pah",
  "Ejok": "eh-JOHK",
  "Apolon": "ah-poh-LOHN",
  "Ejoka": "eh-JOH-kah",
  
  // Additional Nilotic phrasings
  "Nabad / Iska warran": "NAH-bahd / IS-kah WAH-rahn",
  "Nagaa / Akkam": "nah-GAH / AH-kahm",
  "Tanammerte": "tah-nahm-MER-teh",
  "Galatoomi": "gah-lah-TOH-mee",
  "Jambo / Habari": "JAHM-boh / hah-BAH-ree",
  "Mbote": "mm-BOH-teh",
};

// Language family to voice locale mapping for better pronunciation
const languageVoiceMap: Record<string, string> = {
  // East African Bantu languages - use Swahili base
  "Gĩkũyũ": "sw-KE",
  "Dholuo": "sw-KE",
  "Maa": "sw-KE",
  "Kalenjin": "sw-KE",
  "Kikamba": "sw-KE",
  "Luhya": "sw-KE",
  "Kimeru": "sw-KE",
  "Ekegusii": "sw-KE",
  "Kiswahili": "sw-KE",
  "Kichagga": "sw-KE",
  "Kinyarwanda": "sw-KE",
  "Kirundi": "sw-KE",
  "Luganda": "sw-KE",
  
  // Southern African - use Zulu/closest
  "isiZulu": "zu-ZA",
  "isiXhosa": "zu-ZA",
  "Setswana": "zu-ZA",
  "chiShona": "zu-ZA",
  "Otjiherero": "zu-ZA",
  
  // West African
  "Yorùbá": "yo-NG",
  "Igbo": "ig-NG",
  "Hausa": "ha-NG",
  "Wolof": "fr-SN",
  "Akan": "en-GH",
  "Twi": "en-GH",
  "Bambara": "fr-ML",
  "Fulfulde": "fr-SN",
  
  // Ethiopian/Eritrean
  "Amharic": "am-ET",
  "Afaan Oromoo": "am-ET",
  "Tigrinya": "am-ET",
  "Ge'ez": "am-ET",
  "Gurage": "am-ET",
  
  // Somali
  "Somali": "so-SO",
  
  // Arabic-influenced
  "Arabic": "ar-EG",
  
  // Berber/Amazigh
  "Tamazight": "ar-MA",
  "Kabyle": "ar-DZ", 
  "Riffian": "ar-MA",
  "Tuareg": "ar-DZ",
  "Tamasheq": "ar-ML",
  "Tachelhit": "ar-MA",
  "Shilha": "ar-MA",
  
  // Additional Nilotic
  "Maasai": "sw-KE",
  "Turkana": "sw-KE",
  "Dinka": "en-US",
  "Nuer": "en-US",
  "Acholi": "en-UG",
  "Alur": "en-UG",
  "Samburu": "sw-KE",
};

// Get phonetic pronunciation or generate a simple one
function getPhonetic(phrase: string): string {
  if (!phrase) return '';
  
  // Check exact match first
  if (phoneticMappings[phrase]) {
    return phoneticMappings[phrase];
  }
  
  // Check case-insensitive
  const lowerPhrase = phrase.toLowerCase();
  for (const [key, value] of Object.entries(phoneticMappings)) {
    if (key.toLowerCase() === lowerPhrase) {
      return value;
    }
  }
  
  // Generate basic phonetic hint
  return generateBasicPhonetic(phrase);
}

function generateBasicPhonetic(phrase: string): string {
  if (!phrase) return '';
  return phrase
    .toLowerCase()
    .replace(/ĩ/g, 'ee')
    .replace(/ũ/g, 'oo')
    .replace(/ọ/g, 'oh')
    .replace(/ẹ/g, 'eh')
    .replace(/ɛ/g, 'eh')
    .replace(/ɔ/g, 'aw')
    .replace(/ng/g, 'ng-')
    .replace(/mb/g, 'm-b')
    .replace(/nd/g, 'n-d')
    .replace(/nj/g, 'n-j')
    .split(' ')
    .join(' · ');
}

function getVoiceLocale(languageName?: string, languageFamily?: string): string {
  if (languageName && languageVoiceMap[languageName]) {
    return languageVoiceMap[languageName];
  }
  
  if (languageFamily) {
    if (languageFamily.includes('Bantu')) return 'sw-KE';
    if (languageFamily.includes('Nilotic')) return 'sw-KE';
    if (languageFamily.includes('Niger-Congo')) return 'sw-KE';
    if (languageFamily.includes('Afroasiatic')) return 'am-ET';
    if (languageFamily.includes('Cushitic')) return 'so-SO';
  }
  
  return 'sw-KE';
}

export function AudioGreeting({ 
  phrase, 
  meaning, 
  phonetic,
  languageFamily,
  languageName,
  size = 'md' 
}: AudioGreetingProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  /** Bumps when a new play starts so stale async work (voice wait) cannot call speak() after cancel. */
  const playGenerationRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          /* ignore */
        }
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    };
  }, []);

  const displayPhonetic = phonetic || getPhonetic(phrase);
  const voiceLocale = getVoiceLocale(languageName, languageFamily);

  const cleanup = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  }, []);

  const playAudio = useCallback(async () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !phrase) {
      return;
    }

    const synth = window.speechSynthesis;
    const generation = ++playGenerationRef.current;

    // Cancel any ongoing speech
    try {
      synth.cancel();
    } catch {
      /* ignore */
    }
    cleanup();

    setIsLoading(true);

    // Safety timeout — if speech never starts, reset state
    loadingTimeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setIsLoading(false);
      setIsPlaying(false);
    }, 3000);

    // Wait for voices to be loaded
    let voices: SpeechSynthesisVoice[] = [];
    try {
      voices = synth.getVoices();
    } catch {
      voices = [];
    }
    if (voices.length === 0) {
      await new Promise<void>((resolve) => {
        const handler = () => {
          try {
            voices = synth.getVoices();
          } catch {
            voices = [];
          }
          synth.removeEventListener('voiceschanged', handler);
          resolve();
        };
        synth.addEventListener('voiceschanged', handler);
        setTimeout(() => {
          synth.removeEventListener('voiceschanged', handler);
          resolve();
        }, 500);
      });
    }

    if (!mountedRef.current || generation !== playGenerationRef.current) return;

    // Find best matching voice
    const targetLocale = voiceLocale;
    const localeParts = targetLocale.split('-');
    const langPrimary = localeParts[0]?.trim() || '';

    const selectedVoice =
      voices.find(v => v.lang === targetLocale) ||
      (langPrimary ? voices.find(v => v.lang.startsWith(langPrimary)) : undefined) ||
      voices.find(v => v.lang === 'sw-KE' || v.lang === 'sw-TZ' || v.lang.startsWith('sw')) ||
      voices.find(v => v.lang === 'en-KE' || v.lang === 'en-TZ' || v.lang === 'en-NG' || v.lang === 'en-ZA') ||
      voices.find(v => ['zu-ZA', 'xh-ZA', 'af-ZA', 'yo-NG', 'ha-NG', 'ig-NG', 'am-ET'].includes(v.lang)) ||
      voices.find(v => v.lang.startsWith('en-') && !v.lang.includes('en-US') && !v.lang.includes('en-GB')) ||
      voices.find(v => v.lang.startsWith('en-')) ||
      voices[0];

    const utterance = new SpeechSynthesisUtterance(phrase);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 0.65;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      cleanup();
      if (!mountedRef.current) return;
      setIsLoading(false);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      if (!mountedRef.current) return;
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      cleanup();
      if (!mountedRef.current) return;
      setIsLoading(false);
      setIsPlaying(false);
      // Only warn for genuine errors, not user-initiated cancellation
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.warn('AudioGreeting: playback error', event.error);
      }
    };

    if (generation !== playGenerationRef.current) {
      return;
    }

    try {
      synth.speak(utterance);
    } catch {
      cleanup();
      if (mountedRef.current) {
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  }, [phrase, voiceLocale, cleanup]);

  const sizeClasses = {
    sm: {
      container: 'p-2 gap-2',
      phrase: 'text-sm',
      phonetic: 'text-xs',
      meaning: 'text-xs',
      button: 'p-1.5 min-w-[28px] min-h-[28px]',
      icon: 'w-3 h-3',
    },
    md: {
      container: 'p-3 gap-3',
      phrase: 'text-base',
      phonetic: 'text-sm',
      meaning: 'text-sm',
      button: 'p-2 min-w-[36px] min-h-[36px]',
      icon: 'w-4 h-4',
    },
    lg: {
      container: 'p-4 gap-4',
      phrase: 'text-xl',
      phonetic: 'text-base',
      meaning: 'text-sm',
      button: 'p-3 min-w-[44px] min-h-[44px]',
      icon: 'w-5 h-5',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center justify-between bg-background/50 rounded-lg ${classes.container}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className={`font-semibold text-primary ${classes.phrase}`}>
            "{phrase}"
          </p>
          {displayPhonetic && (
            <span className={`text-muted-foreground italic font-mono ${classes.phonetic}`}>
              [{displayPhonetic}]
            </span>
          )}
        </div>
        <p className={`text-muted-foreground ${classes.meaning}`}>
          {meaning}
        </p>
      </div>
      <button 
        onClick={playAudio}
        disabled={isPlaying || isLoading}
        className={`rounded-full transition-all flex-shrink-0 touch-manipulation ${classes.button} ${
          isPlaying 
            ? 'bg-primary text-primary-foreground animate-pulse' 
            : 'bg-primary/10 hover:bg-primary/20 text-primary'
        } focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        title={`Listen to "${phrase}" pronunciation`}
        aria-label={`Play pronunciation of ${phrase}`}
      >
        {isLoading ? (
          <Loader2 className={`${classes.icon} animate-spin`} />
        ) : isPlaying ? (
          <Volume2 className={classes.icon} />
        ) : (
          <Play className={classes.icon} />
        )}
      </button>
    </div>
  );
}

// Main greeting variant with larger size
export function MainGreeting({ 
  phrase, 
  meaning, 
  phonetic,
  languageFamily,
  languageName 
}: Omit<AudioGreetingProps, 'size'>) {
  return (
    <AudioGreeting 
      phrase={phrase} 
      meaning={meaning}
      phonetic={phonetic}
      languageFamily={languageFamily}
      languageName={languageName}
      size="lg" 
    />
  );
}
