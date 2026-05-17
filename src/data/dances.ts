// African tribal dances & music — fact-checked cultural performances
import type { RecipeRegion } from '@/data/recipes';

export type DanceStyle = 'traditional' | 'modern' | 'ceremonial' | 'folk' | 'social';
export type CulturalMediaType = 'dance' | 'music';
export type MusicEra = 'traditional' | 'modern';
/** How closely the YouTube video matches the listing (dance vs music vs cultural doc) */
export type VideoContext = 'performance' | 'combined' | 'documentary';

export const danceRegions: { id: RecipeRegion; name: string; emoji: string }[] = [
  { id: 'east', name: 'East Africa', emoji: '🇰🇪' },
  { id: 'west', name: 'West Africa', emoji: '🇳🇬' },
  { id: 'southern', name: 'Southern Africa', emoji: '🇿🇦' },
  { id: 'central', name: 'Central Africa', emoji: '🇨🇩' },
  { id: 'north', name: 'North Africa', emoji: '🇲🇦' },
  { id: 'horn', name: 'Horn of Africa', emoji: '🇪🇹' },
];

export interface CulturalPerformance {
  id: string;
  name: string;
  localName?: string;
  contentType: CulturalMediaType;
  tribeSlug: string;
  tribeName: string;
  /** Dance style or music era */
  style: DanceStyle;
  musicEra?: MusicEra;
  occasion?: string;
  description: string;
  culturalSignificance: string;
  /** Primary embed ID — omit when sharedVideoFromId points at another entry's clip */
  youtubeVideoId?: string;
  /** Reuse another performance's video (same ceremony clip, music profile only) */
  sharedVideoFromId?: string;
  region?: RecipeRegion;
  country?: string;
  /** Links to tribe traditionalDance field when applicable */
  relatedForms?: string[];
  /** e.g. Benga, Afrobeats, Kiñit — shown on music pages */
  musicGenre?: string;
  instruments?: string[];
  videoContext?: VideoContext;
  /** When music shares the same clip as a dance entry */
  relatedPerformanceId?: string;
}

const tribeToRegion: Record<string, { region: RecipeRegion; country: string }> = {
  kamba: { region: 'east', country: 'KE' },
  maasai: { region: 'east', country: 'KE' },
  kisii: { region: 'east', country: 'KE' },
  meru: { region: 'east', country: 'KE' },
  luo: { region: 'east', country: 'KE' },
  zulu: { region: 'southern', country: 'ZA' },
  shona: { region: 'southern', country: 'ZW' },
  tswana: { region: 'southern', country: 'BW' },
  yoruba: { region: 'west', country: 'NG' },
  igbo: { region: 'west', country: 'NG' },
  mandinka: { region: 'west', country: 'SN' },
  wodaabe: { region: 'west', country: 'NE' },
  fulani: { region: 'west', country: 'NG' },
  bakongo: { region: 'central', country: 'CD' },
  oromo: { region: 'horn', country: 'ET' },
  amhara: { region: 'horn', country: 'ET' },
  tigre: { region: 'horn', country: 'ER' },
  somali: { region: 'horn', country: 'SO' },
};

export const culturalPerformances: CulturalPerformance[] = [
  // ─── DANCES (user-curated, embed-verified) ─────────────────────────
  {
    id: 'kamba-kilumi-dance',
    name: 'Kamba Kilumi Dance',
    localName: 'Kilumi',
    contentType: 'dance',
    tribeSlug: 'kamba',
    tribeName: 'Kamba',
    style: 'traditional',
    occasion: 'Celebrations, weddings, community gatherings',
    description: 'Acrobatic Kamba dance accompanied by drums and whistles, performed across Ukambani in eastern Kenya.',
    culturalSignificance: 'Kilumi is the signature Kamba dance form — energetic, acrobatic, and central to Kamba identity and social celebration.',
    youtubeVideoId: 'EtaTySkv7rM',
    relatedForms: ['Kilumi', 'Mwali'],
  },
  {
    id: 'zulu-indlamu-dance',
    name: 'Traditional Zulu Dance',
    localName: 'Indlamu',
    contentType: 'dance',
    tribeSlug: 'zulu',
    tribeName: 'Zulu',
    style: 'traditional',
    occasion: 'Ceremonies, heritage events, Umkhosi Womhlanga',
    description: 'Powerful Zulu war dance with high kicks, stomping, and regimented movement in traditional regalia.',
    culturalSignificance: 'Indlamu expresses Zulu martial heritage and communal pride; related to isicathamiya and reed-dance traditions.',
    youtubeVideoId: 'gHzyv6yJcRo',
    relatedForms: ['Indlamu'],
  },
  {
    id: 'oromo-cultural-dance',
    name: 'Oromo Cultural Dance',
    contentType: 'dance',
    tribeSlug: 'oromo',
    tribeName: 'Oromo',
    style: 'folk',
    occasion: 'Irreecha, weddings, community festivals',
    description: 'Oromo group dance with shoulder and hip movements, often performed at Irreecha thanksgiving and diaspora cultural events.',
    culturalSignificance: 'Dance is central to Oromo Gada-age grades and seasonal festivals; styles vary by region (e.g. Dhichisaa in western Oromia).',
    youtubeVideoId: 'dV_-c0ZshcI',
    relatedForms: ['Dhichisaa'],
  },
  {
    id: 'yoruba-bata-dance',
    name: 'Yoruba Bata Cultural Dance',
    localName: 'Bata',
    contentType: 'dance',
    tribeSlug: 'yoruba',
    tribeName: 'Yoruba',
    style: 'ceremonial',
    occasion: 'Festivals, Sango worship, cultural days',
    description: 'Sacred Yoruba dance performed to the talking-drum rhythms of bata drums, often in honor of Orisha traditions.',
    culturalSignificance: 'Bata drumming and dance connect Yoruba communities to Ifá, Sango, and ancestral performance arts across Nigeria and the diaspora.',
    youtubeVideoId: 'AI4IOKxGJiw',
    relatedForms: ['Bata'],
  },
  {
    id: 'igbo-cultural-dance',
    name: 'Igbo Cultural Dance',
    contentType: 'dance',
    tribeSlug: 'igbo',
    tribeName: 'Igbo',
    style: 'folk',
    occasion: 'Culture day, weddings, New Yam festivals',
    description: 'Igbo community dance performances featuring coordinated group movement, colorful attire, and festival energy.',
    culturalSignificance: 'Igbo dance traditions include Atilogwu acrobatics, Ikpirikpi-ogu war dances, and masquerade-linked performances at Ofala and Iri Ji.',
    youtubeVideoId: 'FUixG0rBoF4',
    relatedForms: ['Atilogwu', 'Koroso'],
  },
  {
    id: 'meru-traditional-dance',
    name: 'Meru Traditional Dance',
    contentType: 'dance',
    tribeSlug: 'meru',
    tribeName: 'Meru',
    style: 'traditional',
    occasion: 'Circuits, cultural festivals, community events',
    description: 'Meru traditional dance performed by cultural groups on Kenya\'s eastern slopes of Mount Kenya.',
    culturalSignificance: 'Meru dance shares roots with Embu and Kikuyu highland traditions, often accompanied by drums and call-and-response singing.',
    youtubeVideoId: 'DEXYtLS-d4E',
  },
  {
    id: 'tigre-traditional-dance',
    name: 'Tigre Traditional Dance',
    contentType: 'dance',
    tribeSlug: 'tigre',
    tribeName: 'Tigre',
    style: 'traditional',
    occasion: 'Weddings, holidays, community gatherings',
    description: 'Traditional Tigre dance from Eritrea and Sudan, with distinctive shoulder and rhythmic movements.',
    culturalSignificance: 'Tigre dance (related to highland Eskista-style movement) marks life-cycle events across the Horn.',
    youtubeVideoId: 'ghXxZFO2-Q8',
    relatedForms: ['Kuda'],
  },
  {
    id: 'bakongo-dance',
    name: 'Bakongo Dance',
    contentType: 'dance',
    tribeSlug: 'bakongo',
    tribeName: 'Bakongo',
    style: 'folk',
    occasion: 'Community celebrations, cultural showcases',
    description: 'Bakongo dance performance from the Kongo cultural sphere in Central Africa.',
    culturalSignificance: 'Dance in Kongo societies links to initiation, ancestor veneration, and nkisi spiritual traditions.',
    youtubeVideoId: 'nPHReI0Kf1Q',
  },
  {
    id: 'mandinka-kombo-lengjong',
    name: 'Mandinka Kombo Lengjong',
    contentType: 'dance',
    tribeSlug: 'mandinka',
    tribeName: 'Mandinka',
    style: 'traditional',
    occasion: 'Festivals, griot performances',
    description: 'Typical Mandinka Kombo Lengjong dance from the Senegambia region, performed with kora and percussion.',
    culturalSignificance: 'Mandinka dance accompanies griot oral history; rhythms underpin West African diaspora musical traditions.',
    youtubeVideoId: '9q1zH-5ZyvU',
  },
  {
    id: 'somali-dhaanto-dance',
    name: 'Somali Dhaanto Dance',
    localName: 'Dhaanto',
    contentType: 'dance',
    tribeSlug: 'somali',
    tribeName: 'Somali',
    style: 'folk',
    occasion: 'Weddings, Eid, cultural festivals',
    description: 'Energetic Somali Dhaanto line dance popular in Djibouti, eastern Ethiopia, and Somalia.',
    culturalSignificance: 'Dhaanto is a unifying Somali cultural expression, performed at celebrations across the Horn and diaspora.',
    youtubeVideoId: 'ObS-u4XXYb0',
    relatedForms: ['Dhaanto'],
  },
  {
    id: 'somali-museum-dance',
    name: 'Somali Traditional Dance',
    contentType: 'dance',
    tribeSlug: 'somali',
    tribeName: 'Somali',
    style: 'traditional',
    occasion: 'Cultural exhibitions, anniversaries',
    description: 'Somali Museum Dance Troupe performance preserving Somali dance heritage in the diaspora.',
    culturalSignificance: 'Institutional troupes help preserve Somali dance forms for younger generations abroad.',
    youtubeVideoId: 'mQyBFtanRzM',
  },
  {
    id: 'kisii-folk-dance',
    name: 'Kisii Folk Dance',
    contentType: 'dance',
    tribeSlug: 'kisii',
    tribeName: 'Kisii',
    style: 'folk',
    occasion: 'Community events, cultural showcases',
    description: 'Kisii (Abagusii) folk dance from western Kenya featuring rhythmic movement and song.',
    culturalSignificance: 'Kisii dance traditions include Ekerongo performances with the obokano lyre at celebrations.',
    youtubeVideoId: 'ZXjtcWiKvOw',
    relatedForms: ['Ekerongo'],
  },
  {
    id: 'luo-traditional-dance',
    name: 'Luo Traditional Dance',
    contentType: 'dance',
    tribeSlug: 'luo',
    tribeName: 'Luo',
    style: 'traditional',
    occasion: 'Utamaduni Day, Bomas of Kenya, festivals',
    description: 'Electrifying Luo dance by Kagan Traditional Dancers, showcasing Ohangla-influenced movement.',
    culturalSignificance: 'Luo dance spans Ohangla, Benga, and Dodo forms tied to Lake Victoria fishing culture and political song traditions.',
    youtubeVideoId: 'P0GAFqqexbM',
    relatedForms: ['Ohangla', 'Benga'],
  },
  {
    id: 'shona-traditional-dance',
    name: 'Shona Traditional Dance',
    contentType: 'dance',
    tribeSlug: 'shona',
    tribeName: 'Shona',
    style: 'traditional',
    occasion: 'Village ceremonies, heritage tourism',
    description: 'Shona village traditional dance from Zimbabwe with drumming and communal participation.',
    culturalSignificance: 'Shona dance includes Jerusarema (UNESCO-listed) and mbira-accompanied spiritual performances.',
    youtubeVideoId: 'bYddfIvs-UI',
    relatedForms: ['Jerusarema'],
  },
  {
    id: 'tswana-swana-dance',
    name: 'Tswana (Swana) Dance',
    contentType: 'dance',
    tribeSlug: 'tswana',
    tribeName: 'Tswana',
    style: 'folk',
    occasion: 'Community gatherings, cultural days',
    description: 'Tswana traditional dance performance from Botswana and South Africa.',
    culturalSignificance: 'Tswana dance forms include Setapa and Borankana, performed at weddings and independence celebrations.',
    youtubeVideoId: 'Yv1zqa9hZy0',
  },
  {
    id: 'amhara-eskista-dance',
    name: 'Amhara Eskista Dance',
    localName: 'Eskista',
    contentType: 'dance',
    tribeSlug: 'amhara',
    tribeName: 'Amhara',
    style: 'traditional',
    occasion: 'Weddings, Timkat, holidays',
    description: 'Wello Amhara Eskista — iconic Ethiopian shoulder-shaking dance from the Amhara highlands.',
    culturalSignificance: 'Eskista is among Ethiopia\'s most recognized dances, expressing joy at Orthodox Christian and secular celebrations.',
    youtubeVideoId: '_Ix2d1_EZ70',
    relatedForms: ['Eskista'],
  },
  {
    id: 'wodaabe-gerewol-dance',
    name: 'Wodaabe Gerewol Courtship Dance',
    localName: 'Gerewol',
    contentType: 'dance',
    tribeSlug: 'wodaabe',
    tribeName: 'Wodaabe',
    style: 'ceremonial',
    occasion: 'Geerewol festival — male beauty competition',
    description: 'Famous Wodaabe male wooing dance where women choose partners among Fulani sub-groups in Niger and Chad.',
    culturalSignificance: 'Gerewol is a unique courtship ritual of the Wodaabe (Mbororo) Fulani, documented globally as a living heritage practice.',
    youtubeVideoId: 'PjmgRlR3zeM',
    relatedForms: ['Gerewol'],
  },

  // ─── TRADITIONAL MUSIC ───────────────────────────────────────────────
  {
    id: 'kamba-traditional-drumming',
    name: 'Kamba Traditional Drumming & Song',
    contentType: 'music',
    tribeSlug: 'kamba',
    tribeName: 'Kamba',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Kilumi percussion',
    instruments: ['Drums', 'Whistles', 'Vocals'],
    videoContext: 'combined',
    relatedPerformanceId: 'kamba-kilumi-dance',
    sharedVideoFromId: 'kamba-kilumi-dance',
    description: 'Traditional Kamba percussion and vocal music underpinning Kilumi and Mwali dances.',
    culturalSignificance: 'Kamba drumming traditions use whistles, drums, and call-and-response vocals at ceremonies across Ukambani.',
    relatedForms: ['Kilumi music'],
  },
  {
    id: 'zulu-traditional-choral',
    name: 'Zulu Traditional Music & Isicathamiya',
    contentType: 'music',
    tribeSlug: 'zulu',
    tribeName: 'Zulu',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Isicathamiya, ceremonial song',
    instruments: ['Vocals', 'Drums', 'Ululations'],
    videoContext: 'performance',
    relatedPerformanceId: 'zulu-indlamu-dance',
    sharedVideoFromId: 'zulu-indlamu-dance',
    description: 'Zulu musical traditions in live performance — choral harmony, drumming, and dance song.',
    culturalSignificance: 'Zulu music spans praise poetry (izibongo), wedding songs, and migrant-labor choral forms that influenced Ladysmith Black Mambazo.',
  },
  {
    id: 'luo-ohangla-traditional',
    name: 'Luo Ohangla & Benga Roots',
    contentType: 'music',
    tribeSlug: 'luo',
    tribeName: 'Luo',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Ohangla, Benga',
    instruments: ['Nyatiti', 'Drums', 'Horns'],
    videoContext: 'performance',
    relatedPerformanceId: 'luo-traditional-dance',
    sharedVideoFromId: 'luo-traditional-dance',
    description: 'Ohangla and Benga rhythms in the same Kagan Traditional Dancers performance — music and movement together.',
    culturalSignificance: 'Luo musicians pioneered Benga, which spread across East Africa; ohangla remains a popular festival genre.',
    relatedForms: ['Ohangla', 'Benga', 'Nyatiti'],
  },
  {
    id: 'yoruba-bata-drumming',
    name: 'Yoruba Bata Drumming Tradition',
    contentType: 'music',
    tribeSlug: 'yoruba',
    tribeName: 'Yoruba',
    style: 'ceremonial',
    musicEra: 'traditional',
    musicGenre: 'Sacred Bata, Orisha',
    instruments: ['Bata drums', 'Talking drum', 'Choir'],
    videoContext: 'combined',
    relatedPerformanceId: 'yoruba-bata-dance',
    sharedVideoFromId: 'yoruba-bata-dance',
    description: 'Sacred Yoruba bata talking-drum ensembles used in Sango and Orisha worship.',
    culturalSignificance: 'Bata drums "speak" Yoruba tones; master drummers (ayan) guard repertoires passed through guilds.',
    relatedForms: ['Bata'],
  },
  {
    id: 'amhara-kinjit-traditional',
    name: 'Amhara Traditional Music (Kiñit & Eskista)',
    contentType: 'music',
    tribeSlug: 'amhara',
    tribeName: 'Amhara',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Kiñit, Azmari',
    instruments: ['Krar', 'Masenqo', 'Kebero drums'],
    videoContext: 'combined',
    relatedPerformanceId: 'amhara-eskista-dance',
    sharedVideoFromId: 'amhara-eskista-dance',
    description: 'Ethiopian pentatonic Kiñit music with eskista dance — krar, masenqo, and shoulder rhythm.',
    culturalSignificance: 'Amhara music uses unique Kiñit modes on krar and masenqo; azmari poets improvise social commentary.',
    relatedForms: ['Kiñit', 'Azmari', 'Eskista'],
  },
  {
    id: 'oromo-dhichisaa-music',
    name: 'Oromo Traditional Song & Dance Music',
    contentType: 'music',
    tribeSlug: 'oromo',
    tribeName: 'Oromo',
    style: 'folk',
    musicEra: 'traditional',
    musicGenre: 'Dhichisaa, Irreecha',
    instruments: ['Drums', 'Horns', 'Vocals'],
    videoContext: 'combined',
    relatedPerformanceId: 'oromo-cultural-dance',
    sharedVideoFromId: 'oromo-cultural-dance',
    description: 'Oromo musical accompaniment for Dhichisaa and Irreecha celebrations.',
    culturalSignificance: 'Oromo music reinforces Gada governance cycles and seasonal thanksgiving at sacred lakes.',
    relatedForms: ['Dhichisaa'],
  },
  {
    id: 'somali-heello-traditional',
    name: 'Somali Heello & Qaraami Tradition',
    contentType: 'music',
    tribeSlug: 'somali',
    tribeName: 'Somali',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Heello, Qaraami',
    instruments: ['Oud', 'Drums', 'Vocals'],
    videoContext: 'performance',
    relatedPerformanceId: 'somali-museum-dance',
    sharedVideoFromId: 'somali-museum-dance',
    description: 'Classical Somali poetic song and dance — heello and qaraami performed with oud and drums.',
    culturalSignificance: 'Somali oral poetry (gabay, heello) is among Africa\'s richest literary-musical traditions.',
  },
  {
    id: 'shona-mbira-music',
    name: 'Shona Mbira & Traditional Music',
    contentType: 'music',
    tribeSlug: 'shona',
    tribeName: 'Shona',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Mbira, Chimurenga roots',
    instruments: ['Mbira', 'Hosho rattles', 'Drums'],
    videoContext: 'combined',
    relatedPerformanceId: 'shona-traditional-dance',
    sharedVideoFromId: 'shona-traditional-dance',
    description: 'Shona mbira (thumb piano) music and dance for ancestor ceremonies (bira) and gatherings.',
    culturalSignificance: 'Mbira dzavadzimu mediates contact with ancestral spirits; Thomas Mapfumo popularized chimurenga from these roots.',
    relatedForms: ['Mbira', 'Jerusarema'],
  },
  {
    id: 'mandinka-kora-music',
    name: 'Mandinka Kora & Griot Music',
    contentType: 'music',
    tribeSlug: 'mandinka',
    tribeName: 'Mandinka',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Griot, Kora',
    instruments: ['Kora', 'Balafon', 'Vocals'],
    videoContext: 'combined',
    relatedPerformanceId: 'mandinka-kombo-lengjong',
    sharedVideoFromId: 'mandinka-kombo-lengjong',
    description: 'Mandinka jali (griot) kora and Kombo Lengjong dance music of the Senegambia.',
    culturalSignificance: 'Griots preserve genealogies and epics; the 21-string kora is iconic across West Africa.',
  },
  {
    id: 'kisii-ekerongo-music',
    name: 'Kisii Ekerongo & Obokano Music',
    contentType: 'music',
    tribeSlug: 'kisii',
    tribeName: 'Kisii',
    style: 'folk',
    musicEra: 'traditional',
    musicGenre: 'Ekerongo folk',
    instruments: ['Obokano lyre', 'Drums', 'Vocals'],
    videoContext: 'combined',
    relatedPerformanceId: 'kisii-folk-dance',
    sharedVideoFromId: 'kisii-folk-dance',
    description: 'Kisii folk music with the eight-string obokano lyre accompanying Ekerongo dance.',
    culturalSignificance: 'The obokano is central to Kisii storytelling and celebration alongside call-and-response singing.',
    relatedForms: ['Ekerongo', 'Obokano'],
  },
  {
    id: 'tigre-traditional-music',
    name: 'Tigre Traditional Music',
    contentType: 'music',
    tribeSlug: 'tigre',
    tribeName: 'Tigre',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Highland song',
    instruments: ['Drums', 'Vocals', 'String instruments'],
    videoContext: 'combined',
    relatedPerformanceId: 'tigre-traditional-dance',
    sharedVideoFromId: 'tigre-traditional-dance',
    description: 'Tigre traditional song and dance music from Eritrea and Sudan.',
    culturalSignificance: 'Tigre musical style shares rhythmic features with highland eskista while retaining its own melodic patterns.',
  },
  {
    id: 'bakongo-rhythm-music',
    name: 'Bakongo Drum & Dance Music',
    contentType: 'music',
    tribeSlug: 'bakongo',
    tribeName: 'Bakongo',
    style: 'folk',
    musicEra: 'traditional',
    musicGenre: 'Nkisi ceremony music',
    instruments: ['Drums', 'Ngoma', 'Vocals'],
    videoContext: 'combined',
    relatedPerformanceId: 'bakongo-dance',
    sharedVideoFromId: 'bakongo-dance',
    description: 'Bakongo polyrhythmic drumming underpinning community dance in the Kongo cultural sphere.',
    culturalSignificance: 'Rhythm patterns from Kongo traditions influenced Caribbean and diaspora musical forms.',
  },

  // ─── MODERN MUSIC (contemporary genres — cultural overview clips where noted) ──
  {
    id: 'luo-benga-modern',
    name: 'Luo Benga & Contemporary Pop',
    contentType: 'music',
    tribeSlug: 'luo',
    tribeName: 'Luo',
    style: 'modern',
    musicEra: 'modern',
    musicGenre: 'Benga, Ohangla fusion',
    instruments: ['Electric guitar', 'Drum kit', 'Bass'],
    videoContext: 'documentary',
    description: 'Cultural overview of Luo heritage and how Benga and ohangla evolved into contemporary Kenyan pop.',
    culturalSignificance: 'Artists like D.O. Misiani pioneered Benga; today\'s ohangla stars pack stadiums across East Africa.',
    youtubeVideoId: '8yN643vymPg',
    relatedForms: ['Benga', 'Ohangla'],
  },
  {
    id: 'yoruba-afrobeats-modern',
    name: 'Yoruba Afrobeats & Fuji Lineage',
    contentType: 'music',
    tribeSlug: 'yoruba',
    tribeName: 'Yoruba',
    style: 'modern',
    musicEra: 'modern',
    musicGenre: 'Afrobeats, Fuji, Jùjú',
    instruments: ['Talking drum', 'Synthesizer', 'Percussion'],
    videoContext: 'documentary',
    description: 'How Yoruba rhythm traditions — from bata to Fuji — feed modern Afrobeats and Naija pop worldwide.',
    culturalSignificance: 'Fela Kuti (Yoruba) created Afrobeat; today\'s Afrobeats stars fuse Yoruba percussion with global pop.',
    youtubeVideoId: '_W1cHwldsCI',
  },
  {
    id: 'igbo-highlife-modern',
    name: 'Igbo Highlife & Modern Nigerian Sound',
    contentType: 'music',
    tribeSlug: 'igbo',
    tribeName: 'Igbo',
    style: 'modern',
    musicEra: 'modern',
    musicGenre: 'Highlife, Gospel pop',
    instruments: ['Guitar', 'Trumpet', 'Vocals'],
    videoContext: 'documentary',
    description: 'Igbo highlife heritage and its influence on modern Nigerian guitar-band and gospel-pop styles.',
    culturalSignificance: 'Chief Osita Osadebe and Oliver de Coque defined Igbo highlife; the genre still shapes Nigerian weddings and radio.',
    youtubeVideoId: 't9F3eIJgD2I',
  },
  {
    id: 'zulu-gqom-modern',
    name: 'Zulu-Linked Gqom & SA House',
    contentType: 'music',
    tribeSlug: 'zulu',
    tribeName: 'Zulu',
    style: 'modern',
    musicEra: 'modern',
    musicGenre: 'Gqom, Kwaito, House',
    instruments: ['Drum machine', 'Bass', 'Vocals'],
    videoContext: 'documentary',
    description: 'Overview of Zulu cultural roots and how Durban townships birthed gqom and South African house.',
    culturalSignificance: 'Durban\'s Zulu-majority communities shaped gqom — minimal, bass-heavy club music with global reach.',
    youtubeVideoId: 'Jh5VQYwJfNY',
  },
  {
    id: 'somali-pop-modern',
    name: 'Modern Somali Pop & Dhaanto',
    contentType: 'music',
    tribeSlug: 'somali',
    tribeName: 'Somali',
    style: 'modern',
    musicEra: 'modern',
    musicGenre: 'Dhaanto, Qaraami revival',
    instruments: ['Keyboard', 'Drums', 'Vocals'],
    videoContext: 'combined',
    relatedPerformanceId: 'somali-dhaanto-dance',
    sharedVideoFromId: 'somali-dhaanto-dance',
    description: 'Dhaanto line-dance performance — the same festive style that became modern Somali wedding and festival pop.',
    culturalSignificance: 'Dhaanto crossed from traditional celebration to chart-topping Somali pop in Mogadishu and the diaspora.',
  },
  {
    id: 'maasai-adumu-music',
    name: 'Maasai Song & Adumu Rhythm',
    contentType: 'music',
    tribeSlug: 'maasai',
    tribeName: 'Maasai',
    style: 'traditional',
    musicEra: 'traditional',
    musicGenre: 'Warrior song',
    instruments: ['Vocals', 'Call-and-response', 'Body percussion'],
    videoContext: 'documentary',
    description: 'Maasai vocal music and rhythm accompanying the adumu jumping dance at ceremonies.',
    culturalSignificance: 'Maasai men compose songs praising cattle and courage; rhythm drives the competitive adumu jump.',
    youtubeVideoId: 'GsDCFDLOQFo',
  },
];

// Apply region mappings
culturalPerformances.forEach((p) => {
  if (!p.region && tribeToRegion[p.tribeSlug]) {
    p.region = tribeToRegion[p.tribeSlug].region;
    p.country = tribeToRegion[p.tribeSlug].country;
  }
});

export const getAllPerformances = (): CulturalPerformance[] => [...culturalPerformances];

export const getPerformanceById = (id: string): CulturalPerformance | undefined =>
  culturalPerformances.find((p) => p.id === id);

export const getPerformancesByTribe = (tribeSlug: string): CulturalPerformance[] =>
  culturalPerformances.filter((p) => p.tribeSlug === tribeSlug);

export const getDancesOnly = (): CulturalPerformance[] =>
  culturalPerformances.filter((p) => p.contentType === 'dance');

export const getMusicOnly = (): CulturalPerformance[] =>
  culturalPerformances.filter((p) => p.contentType === 'music');

export const getTraditionalMusic = (): CulturalPerformance[] =>
  culturalPerformances.filter((p) => p.contentType === 'music' && p.musicEra === 'traditional');

export const getModernMusic = (): CulturalPerformance[] =>
  culturalPerformances.filter((p) => p.contentType === 'music' && p.musicEra === 'modern');

export const getMusicByTribe = (
  tribeSlug: string,
  era?: MusicEra
): CulturalPerformance[] =>
  culturalPerformances.filter(
    (p) =>
      p.contentType === 'music' &&
      p.tribeSlug === tribeSlug &&
      (!era || p.musicEra === era)
  );

export const getDancesByTribe = (tribeSlug: string): CulturalPerformance[] =>
  culturalPerformances.filter((p) => p.contentType === 'dance' && p.tribeSlug === tribeSlug);

export const getPerformanceTribeSlugs = (): string[] =>
  [...new Set(culturalPerformances.map((p) => p.tribeSlug))].sort();

export function isMusicDocumentary(perf: CulturalPerformance): boolean {
  return perf.contentType === 'music' && perf.videoContext === 'documentary';
}

/** Resolve embed ID from own field or shared source performance */
export function getResolvedYoutubeId(perf: CulturalPerformance): string | undefined {
  if (perf.youtubeVideoId) return perf.youtubeVideoId;
  if (perf.sharedVideoFromId) {
    const source = getPerformanceById(perf.sharedVideoFromId);
    if (!source) return undefined;
    return getResolvedYoutubeId(source);
  }
  return undefined;
}

export function usesSharedVideo(perf: CulturalPerformance): boolean {
  return Boolean(perf.sharedVideoFromId);
}
