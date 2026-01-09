// Global name origins database - non-African tribes and origins
// This helps users understand when a name has origins outside Africa

export interface GlobalOrigin {
  id: string;
  name: string;
  region: string;
  continent: string;
  countries: string[];
  description: string;
  namePrefixes?: string[];
  nameSuffixes?: string[];
  commonNames: {
    male: string[];
    female: string[];
  };
  religion?: 'muslim' | 'christian' | 'hindu' | 'buddhist' | 'jewish' | 'sikh' | 'other';
  culturalNotes?: string;
}

// Non-African global origins database
export const globalOrigins: GlobalOrigin[] = [
  // ============ EUROPEAN ORIGINS ============
  {
    id: 'anglo-saxon',
    name: 'Anglo-Saxon/English',
    region: 'British Isles',
    continent: 'Europe',
    countries: ['England', 'United Kingdom', 'Ireland'],
    description: 'Names of English and Anglo-Saxon origin, common across the Anglosphere.',
    commonNames: {
      male: ['john', 'william', 'james', 'robert', 'michael', 'david', 'richard', 'thomas', 'charles', 'edward', 'george', 'henry', 'arthur', 'albert', 'alfred', 'harry', 'jack', 'oliver', 'noah', 'leo'],
      female: ['mary', 'elizabeth', 'sarah', 'jane', 'ann', 'margaret', 'catherine', 'alice', 'emily', 'emma', 'olivia', 'charlotte', 'amelia', 'jessica', 'sophie', 'grace', 'lucy', 'hannah', 'lily', 'mia']
    },
    religion: 'christian',
    culturalNotes: 'Spread globally through British colonialism. Many became common Christian names worldwide.'
  },
  {
    id: 'germanic',
    name: 'Germanic',
    region: 'Central Europe',
    continent: 'Europe',
    countries: ['Germany', 'Austria', 'Switzerland', 'Netherlands'],
    description: 'Names of German and Germanic tribal origin.',
    commonNames: {
      male: ['hans', 'friedrich', 'wilhelm', 'karl', 'heinrich', 'otto', 'klaus', 'wolfgang', 'dieter', 'helmut', 'gerhard', 'manfred', 'werner', 'bernhard', 'stefan'],
      female: ['greta', 'helga', 'ingrid', 'brunhilde', 'gertrud', 'ursula', 'heidi', 'frieda', 'anna', 'maria', 'eva', 'lisa', 'julia', 'sarah', 'laura']
    },
    religion: 'christian'
  },
  {
    id: 'french',
    name: 'French',
    region: 'Western Europe',
    continent: 'Europe',
    countries: ['France', 'Belgium', 'Switzerland', 'Canada'],
    description: 'Names of French origin, influenced Latin and Celtic roots.',
    commonNames: {
      male: ['jean', 'pierre', 'jacques', 'louis', 'philippe', 'francois', 'michel', 'andre', 'nicolas', 'antoine', 'paul', 'henri', 'marc', 'laurent', 'thierry'],
      female: ['marie', 'jeanne', 'sophie', 'claire', 'monique', 'brigitte', 'isabelle', 'nathalie', 'sylvie', 'veronique', 'celine', 'aurelie', 'camille', 'lea', 'emma']
    },
    religion: 'christian',
    culturalNotes: 'French names are common in Francophone Africa due to colonial history.'
  },
  {
    id: 'italian',
    name: 'Italian',
    region: 'Southern Europe',
    continent: 'Europe',
    countries: ['Italy', 'Vatican City', 'San Marino'],
    description: 'Names of Italian/Roman origin with Latin roots.',
    nameSuffixes: ['ini', 'etti', 'ucci', 'ello', 'ella'],
    commonNames: {
      male: ['giuseppe', 'giovanni', 'marco', 'antonio', 'francesco', 'mario', 'luigi', 'paolo', 'roberto', 'andrea', 'luca', 'matteo', 'alessandro', 'davide', 'stefano'],
      female: ['maria', 'anna', 'lucia', 'giulia', 'francesca', 'rosa', 'angela', 'valentina', 'alessia', 'chiara', 'sofia', 'aurora', 'ginevra', 'beatrice', 'elena']
    },
    religion: 'christian'
  },
  {
    id: 'spanish',
    name: 'Spanish/Hispanic',
    region: 'Iberian Peninsula',
    continent: 'Europe',
    countries: ['Spain', 'Mexico', 'Argentina', 'Colombia', 'Peru'],
    description: 'Names of Spanish origin, widespread in Latin America.',
    nameSuffixes: ['ez', 'az', 'oz', 'iz'],
    commonNames: {
      male: ['jose', 'juan', 'carlos', 'miguel', 'francisco', 'antonio', 'luis', 'pedro', 'rafael', 'javier', 'alejandro', 'diego', 'pablo', 'sergio', 'manuel'],
      female: ['maria', 'carmen', 'ana', 'rosa', 'isabel', 'dolores', 'pilar', 'teresa', 'lucia', 'laura', 'sofia', 'elena', 'paula', 'marta', 'adriana']
    },
    religion: 'christian',
    culturalNotes: 'Common in Equatorial Guinea (Africa\'s only Spanish-speaking country).'
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    region: 'Iberian Peninsula',
    continent: 'Europe',
    countries: ['Portugal', 'Brazil', 'Mozambique', 'Angola', 'Cape Verde'],
    description: 'Names of Portuguese origin, common in Lusophone countries.',
    nameSuffixes: ['inho', 'inha', 'ão'],
    commonNames: {
      male: ['joao', 'jose', 'antonio', 'manuel', 'francisco', 'carlos', 'paulo', 'pedro', 'luis', 'miguel', 'rui', 'tiago', 'diogo', 'bruno', 'andre'],
      female: ['maria', 'ana', 'isabel', 'rosa', 'carla', 'sofia', 'ines', 'mariana', 'beatriz', 'catarina', 'joana', 'patricia', 'sara', 'daniela', 'rita']
    },
    religion: 'christian',
    culturalNotes: 'Portuguese names are common in Lusophone African countries like Angola, Mozambique, Cape Verde, and Guinea-Bissau.'
  },
  {
    id: 'slavic',
    name: 'Slavic',
    region: 'Eastern Europe',
    continent: 'Europe',
    countries: ['Russia', 'Poland', 'Ukraine', 'Czech Republic', 'Serbia'],
    description: 'Names of Slavic origin from Eastern European peoples.',
    nameSuffixes: ['ov', 'ova', 'ski', 'ska', 'vic', 'ich'],
    commonNames: {
      male: ['ivan', 'dimitri', 'vladimir', 'sergei', 'nikolai', 'alexei', 'boris', 'yuri', 'pavel', 'mikhail', 'andrei', 'oleg', 'igor', 'stanislav', 'jan'],
      female: ['natasha', 'olga', 'tatiana', 'svetlana', 'irina', 'marina', 'anya', 'katya', 'masha', 'dasha', 'vera', 'nina', 'galina', 'ludmila', 'elena']
    },
    religion: 'christian'
  },
  {
    id: 'greek',
    name: 'Greek',
    region: 'Southern Europe',
    continent: 'Europe',
    countries: ['Greece', 'Cyprus'],
    description: 'Names of Greek origin, many adopted as Christian names worldwide.',
    nameSuffixes: ['os', 'is', 'as', 'opoulos'],
    commonNames: {
      male: ['nikolaos', 'konstantinos', 'georgios', 'dimitrios', 'ioannis', 'christos', 'alexandros', 'andreas', 'michail', 'vasilis', 'kostas', 'yannis', 'stavros', 'petros', 'spiros'],
      female: ['maria', 'eleni', 'katerina', 'georgia', 'sophia', 'anastasia', 'christina', 'athena', 'dimitra', 'ioanna', 'alexandra', 'vasiliki', 'paraskevi', 'panagiota', 'eftychia']
    },
    religion: 'christian',
    culturalNotes: 'Many Greek names (like Alexander, Nicholas, Sophia) became global Christian names.'
  },
  {
    id: 'celtic',
    name: 'Celtic',
    region: 'British Isles',
    continent: 'Europe',
    countries: ['Ireland', 'Scotland', 'Wales', 'Brittany'],
    description: 'Names of Celtic origin from Irish, Scottish, Welsh, and Breton cultures.',
    namePrefixes: ['mac', 'mc', "o'", 'fitz'],
    commonNames: {
      male: ['sean', 'patrick', 'brendan', 'connor', 'ryan', 'liam', 'aidan', 'declan', 'cillian', 'oisin', 'eoin', 'ciaran', 'niall', 'brian', 'kevin'],
      female: ['siobhan', 'aoife', 'niamh', 'ciara', 'aisling', 'sinead', 'roisin', 'maire', 'orla', 'grainne', 'fiona', 'bridget', 'caoimhe', 'saoirse', 'clodagh']
    },
    religion: 'christian'
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian/Norse',
    region: 'Northern Europe',
    continent: 'Europe',
    countries: ['Norway', 'Sweden', 'Denmark', 'Iceland', 'Finland'],
    description: 'Names of Norse and Scandinavian origin.',
    nameSuffixes: ['sen', 'son', 'sson', 'dottir'],
    commonNames: {
      male: ['erik', 'lars', 'olaf', 'magnus', 'sven', 'bjorn', 'thor', 'leif', 'ragnar', 'anders', 'henrik', 'nils', 'jan', 'ole', 'axel'],
      female: ['astrid', 'freya', 'ingrid', 'sigrid', 'helga', 'gudrun', 'solveig', 'liv', 'maja', 'ebba', 'saga', 'elsa', 'linnea', 'ida', 'alma']
    },
    religion: 'christian'
  },

  // ============ ASIAN ORIGINS ============
  {
    id: 'indian-hindu',
    name: 'Indian (Hindu)',
    region: 'South Asia',
    continent: 'Asia',
    countries: ['India', 'Nepal', 'Sri Lanka', 'Mauritius', 'Fiji'],
    description: 'Names of Hindu origin from the Indian subcontinent.',
    nameSuffixes: ['kumar', 'devi', 'lal', 'ram', 'priya'],
    commonNames: {
      male: ['raj', 'ravi', 'vijay', 'arun', 'krishna', 'rahul', 'suresh', 'amit', 'pradeep', 'sanjay', 'deepak', 'manoj', 'rajesh', 'vikram', 'arjun'],
      female: ['priya', 'rani', 'lakshmi', 'sita', 'devi', 'asha', 'sunita', 'anita', 'kavita', 'meena', 'neha', 'pooja', 'anjali', 'divya', 'sneha']
    },
    religion: 'hindu',
    culturalNotes: 'Indian names are common in East African Indian diaspora communities.'
  },
  {
    id: 'indian-sikh',
    name: 'Indian (Sikh)',
    region: 'South Asia',
    continent: 'Asia',
    countries: ['India', 'Punjab'],
    description: 'Names of Sikh origin, typically ending in Singh (men) or Kaur (women).',
    nameSuffixes: ['singh', 'kaur', 'deep', 'preet', 'jit', 'pal'],
    commonNames: {
      male: ['gurpreet', 'harpreet', 'manpreet', 'jaspal', 'kuldeep', 'amarjit', 'balwinder', 'daljit', 'gurbir', 'harbhajan', 'jaswant', 'kartar', 'manjit', 'ranjit', 'satnam'],
      female: ['harpreet', 'manpreet', 'jasleen', 'simran', 'navneet', 'gurleen', 'rupinder', 'amandeep', 'baljit', 'charanjit', 'daljeet', 'gurmeet', 'kulwinder', 'manjeet', 'paramjit']
    },
    religion: 'sikh',
    culturalNotes: 'Sikh names often include religious titles. Common in East African Indian communities.'
  },
  {
    id: 'chinese',
    name: 'Chinese',
    region: 'East Asia',
    continent: 'Asia',
    countries: ['China', 'Taiwan', 'Hong Kong', 'Singapore', 'Malaysia'],
    description: 'Names of Chinese origin, typically with family name first.',
    commonNames: {
      male: ['wei', 'ming', 'chen', 'long', 'jian', 'hao', 'yang', 'jun', 'lei', 'feng', 'bo', 'tao', 'lin', 'kai', 'hong'],
      female: ['mei', 'li', 'xiu', 'ying', 'fang', 'lan', 'hua', 'yan', 'jing', 'xiao', 'lin', 'yu', 'hui', 'ning', 'yun']
    },
    culturalNotes: 'Chinese diaspora present in South Africa, Mauritius, and Madagascar.'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    region: 'East Asia',
    continent: 'Asia',
    countries: ['Japan'],
    description: 'Names of Japanese origin, often with nature-related meanings.',
    nameSuffixes: ['ko', 'mi', 'ro', 'ta', 'shi'],
    commonNames: {
      male: ['hiroshi', 'takeshi', 'kenji', 'masashi', 'yuki', 'akira', 'taro', 'kazuki', 'ryu', 'daiki', 'shota', 'haruki', 'kenta', 'yuto', 'sota'],
      female: ['yuki', 'sakura', 'hana', 'yumi', 'keiko', 'akiko', 'michiko', 'tomoko', 'naomi', 'aiko', 'emi', 'haruka', 'mika', 'rin', 'saki']
    }
  },
  {
    id: 'korean',
    name: 'Korean',
    region: 'East Asia',
    continent: 'Asia',
    countries: ['South Korea', 'North Korea'],
    description: 'Names of Korean origin, typically with hanja character meanings.',
    commonNames: {
      male: ['minho', 'jimin', 'sungho', 'jungkook', 'taehyung', 'seojun', 'hajoon', 'dohyun', 'junwoo', 'jiwon', 'hyunwoo', 'minseok', 'yoongi', 'namjoon', 'jinhyuk'],
      female: ['jiyeon', 'suji', 'yuna', 'somin', 'eunbi', 'soyeon', 'hayoung', 'minji', 'dahyun', 'chaeyoung', 'nayeon', 'jihyo', 'tzuyu', 'yeji', 'ryujin']
    }
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    region: 'Southeast Asia',
    continent: 'Asia',
    countries: ['Vietnam'],
    description: 'Names of Vietnamese origin, often poetic with nature meanings.',
    commonNames: {
      male: ['minh', 'duc', 'hung', 'tuan', 'quang', 'thanh', 'long', 'nam', 'dung', 'hieu', 'an', 'bao', 'cuong', 'dat', 'hai'],
      female: ['mai', 'lan', 'huong', 'trang', 'linh', 'thu', 'hanh', 'nga', 'phuong', 'tuyet', 'kim', 'hong', 'ngoc', 'yen', 'van']
    }
  },
  {
    id: 'thai',
    name: 'Thai',
    region: 'Southeast Asia',
    continent: 'Asia',
    countries: ['Thailand'],
    description: 'Names of Thai origin, often with auspicious meanings.',
    commonNames: {
      male: ['somchai', 'prasert', 'surapong', 'thongchai', 'wichai', 'nattapong', 'sakchai', 'kittisak', 'phichet', 'charoen'],
      female: ['pornpan', 'siriwan', 'supaporn', 'narinee', 'siriporn', 'pimchanok', 'nichapa', 'prapassorn', 'lalita', 'malee']
    },
    religion: 'buddhist'
  },
  {
    id: 'filipino',
    name: 'Filipino',
    region: 'Southeast Asia',
    continent: 'Asia',
    countries: ['Philippines'],
    description: 'Names of Filipino origin, often Spanish-influenced.',
    commonNames: {
      male: ['jose', 'juan', 'miguel', 'carlos', 'rafael', 'antonio', 'manuel', 'francisco', 'rodrigo', 'andres', 'romeo', 'ramon', 'eduardo', 'ricardo', 'ernesto'],
      female: ['maria', 'ana', 'rosa', 'elena', 'carmen', 'josefina', 'corazon', 'imelda', 'lourdes', 'milagros', 'esperanza', 'concepcion', 'remedios', 'angelica', 'marites']
    },
    religion: 'christian',
    culturalNotes: 'Spanish colonial influence makes Filipino names similar to Hispanic names.'
  },
  {
    id: 'indonesian',
    name: 'Indonesian',
    region: 'Southeast Asia',
    continent: 'Asia',
    countries: ['Indonesia'],
    description: 'Names from Indonesia, often Javanese or Islamic influenced.',
    commonNames: {
      male: ['agus', 'budi', 'dedi', 'eko', 'hendra', 'iwan', 'joko', 'kurniawan', 'rudi', 'susanto', 'wahyu', 'yudi', 'teguh', 'suryadi', 'bambang'],
      female: ['dewi', 'siti', 'sri', 'rina', 'wati', 'yanti', 'ratna', 'indah', 'putri', 'lestari', 'kartini', 'mega', 'fitri', 'ayu', 'cahya']
    },
    religion: 'muslim'
  },

  // ============ MIDDLE EASTERN ORIGINS (Muslim) ============
  {
    id: 'arab-muslim',
    name: 'Arab (Muslim)',
    region: 'Middle East & North Africa',
    continent: 'Asia/Africa',
    countries: ['Saudi Arabia', 'Egypt', 'UAE', 'Jordan', 'Iraq', 'Syria'],
    description: 'Arabic names, predominantly Islamic, common across the Muslim world.',
    namePrefixes: ['abdul', 'abu', 'ibn', 'bin', 'al-'],
    commonNames: {
      male: ['muhammad', 'mohammed', 'ahmed', 'ali', 'omar', 'yusuf', 'ibrahim', 'khalid', 'hassan', 'hussein', 'mustafa', 'mahmoud', 'karim', 'hamza', 'bilal', 'abdallah', 'abdullah', 'rashid', 'faisal', 'salem'],
      female: ['fatima', 'aisha', 'maryam', 'khadija', 'zainab', 'layla', 'noor', 'amina', 'huda', 'samira', 'yasmin', 'rania', 'sara', 'hanan', 'lubna', 'mariam', 'zahra', 'sumaya', 'asma', 'halima']
    },
    religion: 'muslim',
    culturalNotes: 'Islamic names are common across Africa wherever Islam spread, especially in North, West, and East Africa. These names connect to the broader Muslim Ummah.'
  },
  {
    id: 'persian',
    name: 'Persian/Iranian',
    region: 'Middle East',
    continent: 'Asia',
    countries: ['Iran', 'Afghanistan', 'Tajikistan'],
    description: 'Names of Persian origin, some pre-Islamic.',
    commonNames: {
      male: ['darius', 'cyrus', 'reza', 'ali', 'amir', 'behnam', 'farid', 'kamran', 'mehdi', 'navid', 'omid', 'parham', 'ramin', 'saman', 'shahram'],
      female: ['shirin', 'parvaneh', 'nasrin', 'azadeh', 'fatemeh', 'leila', 'mina', 'niloufar', 'parastoo', 'roxana', 'sahar', 'sepideh', 'yasaman', 'zahra', 'ziba']
    },
    religion: 'muslim'
  },
  {
    id: 'turkish',
    name: 'Turkish',
    region: 'Middle East/Europe',
    continent: 'Asia',
    countries: ['Turkey', 'Cyprus'],
    description: 'Names of Turkish origin, blend of Turkic and Islamic influences.',
    nameSuffixes: ['oglu', 'oğlu'],
    commonNames: {
      male: ['mehmet', 'mustafa', 'ahmet', 'ali', 'huseyin', 'hasan', 'ibrahim', 'ismail', 'osman', 'yusuf', 'kemal', 'emre', 'burak', 'cem', 'can'],
      female: ['ayse', 'fatma', 'emine', 'hatice', 'zeynep', 'elif', 'meryem', 'aysegul', 'sibel', 'deniz', 'ebru', 'esra', 'seda', 'tugba', 'melek']
    },
    religion: 'muslim'
  },
  {
    id: 'hebrew-jewish',
    name: 'Hebrew/Jewish',
    region: 'Middle East',
    continent: 'Asia',
    countries: ['Israel', 'USA', 'Russia'],
    description: 'Names of Hebrew origin, biblical names common globally.',
    commonNames: {
      male: ['david', 'daniel', 'michael', 'joshua', 'jacob', 'benjamin', 'samuel', 'noah', 'adam', 'abraham', 'isaac', 'aaron', 'moshe', 'yosef', 'chaim'],
      female: ['sarah', 'rachel', 'rebecca', 'leah', 'miriam', 'ruth', 'hannah', 'esther', 'naomi', 'abigail', 'deborah', 'judith', 'tamar', 'shoshana', 'michal']
    },
    religion: 'jewish',
    culturalNotes: 'Many Hebrew names became common Christian names and are used globally.'
  },

  // ============ AMERICAS ============
  {
    id: 'native-american',
    name: 'Native American',
    region: 'North America',
    continent: 'North America',
    countries: ['USA', 'Canada'],
    description: 'Indigenous names from various Native American nations.',
    commonNames: {
      male: ['chaska', 'takoda', 'dakota', 'koda', 'nashoba', 'ahanu', 'kitchi', 'chayton', 'hinto', 'kohana', 'mato', 'nikan', 'shilah', 'wapi', 'yanaba'],
      female: ['aiyana', 'kaya', 'winona', 'talulah', 'aponi', 'chenoa', 'halona', 'imala', 'kaliska', 'makawee', 'nayeli', 'olathe', 'poloma', 'sahkyo', 'tala']
    }
  },
  {
    id: 'latino',
    name: 'Latin American',
    region: 'Americas',
    continent: 'South America',
    countries: ['Brazil', 'Mexico', 'Argentina', 'Colombia', 'Peru'],
    description: 'Names common in Latin America, Spanish/Portuguese influenced.',
    commonNames: {
      male: ['santiago', 'mateo', 'sebastian', 'emiliano', 'leonardo', 'diego', 'valentino', 'joaquin', 'camilo', 'nicolas', 'thiago', 'lucas', 'gabriel', 'enzo', 'benjamín'],
      female: ['valentina', 'camila', 'isabella', 'sofia', 'victoria', 'martina', 'lucia', 'emilia', 'antonella', 'renata', 'catalina', 'gabriela', 'valeria', 'mariana', 'daniela']
    },
    religion: 'christian'
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    region: 'Caribbean',
    continent: 'North America',
    countries: ['Jamaica', 'Trinidad', 'Haiti', 'Barbados', 'Cuba'],
    description: 'Names from Caribbean cultures, often African-influenced.',
    commonNames: {
      male: ['dwayne', 'marlon', 'usain', 'shaggy', 'ziggy', 'damian', 'julian', 'andre', 'rihanna', 'sizzla', 'mavado', 'beenie', 'buju', 'chronixx', 'koffee'],
      female: ['nia', 'aaliyah', 'rihanna', 'keisha', 'shania', 'shanice', 'shakira', 'tamika', 'latoya', 'kimberley', 'shelly', 'tanesha', 'jamila', 'keyla', 'yolanda']
    },
    culturalNotes: 'Many Caribbean names have African Diaspora roots from the transatlantic slave trade.'
  },

  // ============ PACIFIC ============
  {
    id: 'polynesian',
    name: 'Polynesian',
    region: 'Pacific Islands',
    continent: 'Oceania',
    countries: ['Hawaii', 'Samoa', 'Tonga', 'Fiji', 'New Zealand'],
    description: 'Names from Polynesian cultures including Hawaiian, Samoan, and Māori.',
    commonNames: {
      male: ['kai', 'mana', 'keoni', 'tane', 'maui', 'koa', 'lono', 'nui', 'pua', 'rangi', 'aroha', 'tama', 'wiremu', 'hemi', 'ihaia'],
      female: ['moana', 'leilani', 'kaia', 'hina', 'tiare', 'maile', 'lani', 'mele', 'pua', 'aroha', 'mereana', 'hinemoana', 'anahera', 'wiremu', 'ataahua']
    }
  },

  // ============ AFRICAN DIASPORA ============
  {
    id: 'african-american',
    name: 'African American',
    region: 'North America',
    continent: 'North America',
    countries: ['USA'],
    description: 'Names unique to African American culture, often creative coinages.',
    namePrefixes: ['la', 'de', 'da', 'sha', 'ta', 'ty', 'ja', 'tre'],
    nameSuffixes: ['isha', 'ika', 'ique', 'etta', 'esha', 'asia', 'aisha'],
    commonNames: {
      male: ['jamal', 'tyrone', 'darnell', 'deshawn', 'marquis', 'terrell', 'jalen', 'malik', 'devonte', 'daquan', 'trayvon', 'keyon', 'lamar', 'trevor', 'bryson'],
      female: ['latoya', 'shaniqua', 'lakeisha', 'tanisha', 'ebony', 'destiny', 'imani', 'aaliyah', 'tiana', 'keisha', 'shanice', 'tamika', 'monique', 'jasmine', 'precious']
    },
    culturalNotes: 'Many African American names preserve or reinvent African naming traditions. Some names connect to African languages and meanings.'
  }
];

// Muslim name patterns that connect to African Muslim tribes
export const muslimNameIndicators = {
  prefixes: ['abdul', 'abu', 'ibn', 'bin', 'al-', 'el-'],
  suffixes: ['ullah', 'allah', 'din', 'deen'],
  commonMaleNames: ['muhammad', 'mohammed', 'ahmed', 'ali', 'omar', 'yusuf', 'ibrahim', 'khalid', 'hassan', 'hussein', 'mustafa', 'mahmoud', 'karim', 'hamza', 'bilal', 'abdallah', 'abdullah', 'rashid', 'faisal', 'salem', 'ismail', 'idris', 'sulaiman', 'haroun', 'bashir', 'umar', 'uthman', 'zaid'],
  commonFemaleNames: ['fatima', 'aisha', 'maryam', 'khadija', 'zainab', 'layla', 'noor', 'amina', 'huda', 'samira', 'yasmin', 'rania', 'sara', 'hanan', 'lubna', 'mariam', 'zahra', 'sumaya', 'asma', 'halima', 'nafisa', 'ruqayya', 'safiya']
};

// Christian name patterns 
export const christianNameIndicators = {
  biblicalMale: ['peter', 'paul', 'john', 'james', 'matthew', 'mark', 'luke', 'david', 'daniel', 'joseph', 'michael', 'gabriel', 'raphael', 'samuel', 'joshua', 'abraham', 'isaac', 'jacob', 'moses', 'elijah', 'timothy', 'stephen', 'philip', 'andrew', 'thomas', 'simon', 'nathaniel', 'bartholomew'],
  biblicalFemale: ['mary', 'sarah', 'rachel', 'rebecca', 'ruth', 'hannah', 'esther', 'naomi', 'elizabeth', 'martha', 'magdalene', 'priscilla', 'lydia', 'miriam', 'deborah', 'judith', 'abigail', 'eve', 'delilah', 'salome', 'joanna', 'susanna'],
  saintsMale: ['patrick', 'augustine', 'francis', 'benedict', 'dominic', 'ignatius', 'xavier', 'anthony', 'sebastian', 'christopher', 'nicholas', 'george', 'martin', 'lawrence', 'vincent', 'gregory', 'basil', 'ambrose', 'jerome', 'leo'],
  saintsFemale: ['catherine', 'teresa', 'agnes', 'cecilia', 'monica', 'clare', 'brigid', 'scholastica', 'gertrude', 'hildegard', 'rose', 'veronica', 'lucy', 'agatha', 'bernadette', 'therese', 'joan', 'anne', 'margaret', 'felicity']
};

// Function to detect global origin
export function detectGlobalOrigin(name: string): {
  isNonAfrican: boolean;
  origins: GlobalOrigin[];
  religion?: 'muslim' | 'christian' | 'hindu' | 'buddhist' | 'jewish' | 'sikh' | 'other';
  religiousNote?: string;
  confidence: number;
} {
  const normalized = name.toLowerCase().trim().replace(/[^a-z]/g, '');
  if (normalized.length < 2) return { isNonAfrican: false, origins: [], confidence: 0 };
  
  const matchedOrigins: { origin: GlobalOrigin; confidence: number }[] = [];
  let detectedReligion: 'muslim' | 'christian' | 'hindu' | 'buddhist' | 'jewish' | 'sikh' | 'other' | undefined;
  let religiousNote: string | undefined;
  
  // Check Muslim name patterns first
  const isMuslimName = checkMuslimName(normalized);
  if (isMuslimName.isMuslim) {
    detectedReligion = 'muslim';
    religiousNote = isMuslimName.note;
  }
  
  // Check Christian name patterns
  const isChristianName = checkChristianName(normalized);
  if (isChristianName.isChristian && !detectedReligion) {
    detectedReligion = 'christian';
    religiousNote = isChristianName.note;
  }
  
  // Check each global origin
  for (const origin of globalOrigins) {
    let confidence = 0;
    
    // Check exact name matches
    const allNames = [...origin.commonNames.male, ...origin.commonNames.female];
    for (const originName of allNames) {
      if (normalized === originName.toLowerCase()) {
        confidence = Math.max(confidence, 90);
        break;
      }
      if (originName.toLowerCase().startsWith(normalized) || normalized.startsWith(originName.toLowerCase())) {
        const similarity = Math.min(normalized.length, originName.length) / Math.max(normalized.length, originName.length);
        if (similarity > 0.7) {
          confidence = Math.max(confidence, 70 * similarity);
        }
      }
    }
    
    // Check prefixes
    if (origin.namePrefixes) {
      for (const prefix of origin.namePrefixes) {
        if (normalized.startsWith(prefix.toLowerCase())) {
          confidence = Math.max(confidence, 60);
        }
      }
    }
    
    // Check suffixes
    if (origin.nameSuffixes) {
      for (const suffix of origin.nameSuffixes) {
        if (normalized.endsWith(suffix.toLowerCase())) {
          confidence = Math.max(confidence, 55);
        }
      }
    }
    
    if (confidence >= 50) {
      matchedOrigins.push({ origin, confidence });
    }
  }
  
  // Sort by confidence
  matchedOrigins.sort((a, b) => b.confidence - a.confidence);
  const topOrigins = matchedOrigins.slice(0, 3).map(m => m.origin);
  const bestConfidence = matchedOrigins.length > 0 ? matchedOrigins[0].confidence : 0;
  
  // Check if origin is also found in global origin religion
  if (!detectedReligion && topOrigins.length > 0 && topOrigins[0].religion) {
    detectedReligion = topOrigins[0].religion;
  }
  
  return {
    isNonAfrican: topOrigins.length > 0 && bestConfidence >= 60,
    origins: topOrigins,
    religion: detectedReligion,
    religiousNote,
    confidence: bestConfidence
  };
}

function checkMuslimName(normalized: string): { isMuslim: boolean; note?: string } {
  // Check prefixes
  for (const prefix of muslimNameIndicators.prefixes) {
    if (normalized.startsWith(prefix.toLowerCase())) {
      return { isMuslim: true, note: `The "${prefix}" prefix is characteristic of Arabic/Islamic naming traditions.` };
    }
  }
  
  // Check suffixes
  for (const suffix of muslimNameIndicators.suffixes) {
    if (normalized.endsWith(suffix.toLowerCase())) {
      return { isMuslim: true, note: `The "${suffix}" suffix indicates Islamic origin, often meaning "of Allah/God".` };
    }
  }
  
  // Check common names
  if (muslimNameIndicators.commonMaleNames.includes(normalized) || 
      muslimNameIndicators.commonFemaleNames.includes(normalized)) {
    return { isMuslim: true, note: 'This is a common Islamic/Arabic name found across the Muslim world.' };
  }
  
  return { isMuslim: false };
}

function checkChristianName(normalized: string): { isChristian: boolean; note?: string } {
  // Check biblical names
  if (christianNameIndicators.biblicalMale.includes(normalized) ||
      christianNameIndicators.biblicalFemale.includes(normalized)) {
    return { isChristian: true, note: 'This is a Biblical name, common in Christian communities worldwide.' };
  }
  
  // Check saints names
  if (christianNameIndicators.saintsMale.includes(normalized) ||
      christianNameIndicators.saintsFemale.includes(normalized)) {
    return { isChristian: true, note: 'This name honors a Christian saint and is common in Catholic and Orthodox communities.' };
  }
  
  return { isChristian: false };
}

// Get African tribes that match a religion
export function getAfricanTribesByReligion(religion: 'muslim' | 'christian'): string[] {
  if (religion === 'muslim') {
    return ['somali', 'hausa', 'fulani', 'wolof', 'tuareg', 'amazigh', 'tigre', 'afar', 'beja', 'harari', 'swahili', 'dinka', 'nuer', 'mandinka', 'soninke', 'bambara', 'songhai', 'kanuri'];
  }
  if (religion === 'christian') {
    return ['kikuyu', 'luo', 'luhya', 'kamba', 'kalenjin', 'yoruba', 'igbo', 'zulu', 'xhosa', 'shona', 'amhara', 'tigrinya', 'oromo', 'baganda', 'hutu_tutsi', 'tswana', 'sotho', 'akan', 'ewe', 'fon'];
  }
  return [];
}
