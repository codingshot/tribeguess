/** Nicknames and variants that map to canonical Western names in the mapping.
 *  Includes: nicknames, common typos, and language variants (Spanish, French, German, Italian, Portuguese, etc.) */
export const westernNameVariants: Record<string, string> = {
  // === John (and language variants) ===
  johnny: "john", jon: "john", jack: "john", johnnie: "john", juan: "john", jean: "john", giovanni: "john", hans: "john", ian: "john", sean: "john", shawn: "john", ivan: "john", evan: "john", jan: "john", joao: "john", johannes: "john", johann: "john", janos: "john", ion: "john", jens: "john", jochanan: "john",
  // === Michael (and language variants) ===
  mike: "michael", mikey: "michael", mick: "michael", mickey: "michael", miguel: "michael", mitchell: "michael", michel: "michael", mikhail: "michael", michele: "michael", michal: "michael", mihai: "michael", mikkel: "michael", michail: "michael",
  // === James ===
  jim: "james", jimmy: "james", jamie: "james", diego: "james", jaime: "james", jacques: "james", santiago: "james", thiago: "james", iago: "james",
  // === William ===
  bill: "william", billy: "william", will: "william", liam: "william", willy: "william", guillermo: "william", wilhelm: "william", willem: "william", guglielmo: "william",
  // === Robert ===
  bob: "robert", bobby: "robert", rob: "robert", robby: "robert", bert: "robert", roberto: "robert", rupert: "robert", robbert: "robert",
  // === David ===
  dave: "david", davey: "david", davide: "david", davor: "david", dawid: "david",
  // === Daniel ===
  danny: "daniel", dan: "daniel", dany: "daniel", danilo: "daniel", daniele: "daniel",
  // === Christopher (nicknames + typos + language variants) ===
  steve: "steven", stevie: "steven", chris: "christopher", kris: "christopher", topher: "christopher", kit: "christopher", chirs: "christopher", chriss: "christopher", christoper: "christopher", crystopher: "christopher", chritopher: "christopher", christoph: "christopher", cristobal: "christopher", cristoforo: "christopher", christophe: "christopher", kristoffer: "christopher", kristopher: "christopher", krzysztof: "christopher", kristof: "christopher",
  // === Matthew ===
  matt: "matthew", mattie: "matthew", matty: "matthew", mateo: "matthew", matteo: "matthew", mathieu: "matthew", mathias: "matthew", matthias: "matthew", matyas: "matthew", mateusz: "matthew",
  // === Joseph ===
  joe: "joseph", joey: "joseph", jose: "joseph", giuseppe: "joseph", josep: "joseph", jozef: "joseph", josef: "joseph", pepe: "joseph", ze: "joseph",
  // === Anthony, Thomas ===
  tony: "anthony", tom: "thomas", tommy: "thomas", tam: "thomas", antonio: "anthony", antónio: "anthony", antoine: "anthony", anton: "anthony", tomas: "thomas", tomasz: "thomas", tommaso: "thomas", tommi: "thomas",
  // === Samuel, Benjamin, Joshua ===
  sam: "samuel", sammy: "samuel", samuele: "samuel", ben: "benjamin", benny: "benjamin", binyamin: "benjamin", benito: "benjamin", benjamim: "benjamin", josh: "joshua", josua: "joshua",
  // === Andrew, Alexander, Nicholas ===
  andy: "andrew", alex: "alexander", alejandro: "alexander", alessandro: "alexander", alexandre: "alexander", aleksander: "alexander", aleksandr: "alexander", sandor: "alexander", xander: "alexander", sasha: "alexander", nick: "nicholas", nico: "nicholas", nicolas: "nicholas", nicolau: "nicholas", nikolai: "nicholas", nikola: "nicholas", niklas: "nicholas", nils: "nicholas", niko: "nicholas",
  // === Katherine (nicknames + language variants) ===
  kate: "katherine", kathy: "katherine", katie: "katherine", katy: "katherine",
  catherine: "katherine", cathy: "katherine", kathryn: "katherine", kaitlyn: "katherine", caitlin: "katherine", katelyn: "katherine",
  katarina: "katherine", katerina: "katherine", katrina: "katherine", ekaterina: "katherine", catarina: "katherine", caterina: "katherine",
  // === Elizabeth ===
  liz: "elizabeth", lizzy: "elizabeth", beth: "elizabeth", eliza: "elizabeth", betsy: "elizabeth", lisa: "elizabeth", betty: "elizabeth", ellen: "elizabeth",
  isabel: "elizabeth", isabella: "elizabeth", elisabeth: "elizabeth", elisabetta: "elizabeth", elzbieta: "elizabeth", elisavet: "elizabeth",
  // === Margaret, Anna, Susan ===
  meg: "margaret", maggie: "margaret", peg: "margaret", margot: "margaret", marguerite: "margaret", greta: "margaret", rita: "margaret",
  ann: "anna", anne: "anna", annie: "anna", anna: "anna",
  sue: "susan", suzy: "susan", susie: "susan", suzanne: "susan", susana: "susan", suzana: "susan", susanna: "susan",
  // === Jennifer, Amanda, Emily ===
  jenny: "jennifer", jen: "jennifer", jenn: "jennifer",
  amy: "amanda", mandy: "amanda", manda: "amanda",
  em: "emily", emmie: "emily", emma: "emily", emilie: "emily", emilia: "emily",
  // === Sarah, Rachel ===
  sara: "sarah", zarah: "sarah",
  rach: "rachel", raquel: "rachel", rachelle: "rachel",
  rick: "richard", rich: "richard", dick: "richard", ricardo: "richard", riccardo: "richard",
  ted: "theodore", teddy: "theodore", theo: "theodore", teodor: "theodore", teodoro: "theodore",
  ed: "edward", eddie: "edward", ned: "edward", eduardo: "edward", eduard: "edward", edouard: "edward", etienne: "edward",
  fred: "frederick", freddie: "frederick", federico: "frederick", frederik: "frederick", friedrich: "frederick",
  greg: "gregory", gregg: "gregory", grigorios: "gregory", gregorio: "gregory",
  jeff: "jeffrey", geoffrey: "jeffrey", geoff: "jeffrey",
  jonny: "jonathan", jonathon: "jonathan", jonothan: "jonathan", johathan: "jonathan",
  pat: "patrick", paddy: "patrick", patricio: "patrick", patrizio: "patrick",
  pete: "peter", pedro: "peter", pierre: "peter", pieter: "peter",
  paolo: "paul", pablo: "paul", paulo: "paul", pavel: "paul",
  randy: "randall",
  tim: "timothy", timmy: "timothy",
  abigail: "abby",
  carol: "caroline",
  deb: "deborah", debbie: "deborah",
  jess: "jessica", jessie: "jessica",
  molly: "mary", polly: "mary",
  nancy: "anna", nan: "anna",
  becky: "rebecca", becca: "rebecca",
  steph: "stephanie", steff: "stephanie",
  tina: "christina",
  vicky: "victoria", tori: "victoria",
  zoey: "zoe",
  cloe: "chloe",
  maddie: "madison", maddy: "madison",
  liv: "olivia", livvy: "olivia",
  sophie: "sophia",
  sofia: "sophia",
  charlie: "charles", carlos: "charles", karl: "charles", carlo: "charles", karel: "charles",
  noa: "noah", noe: "noah", noach: "noah",
  ollie: "oliver",
  harry: "harold",
  jake: "jacob",
  lucas: "luke",
  addie: "addison", addison: "addison",
  ellie: "eleanor", ella: "eleanor",
  prasoet: "prasert", phrasert: "prasert",
  somsuk: "somsak",
  witaya: "witthaya", wittaya: "witthaya",
  somporn: "somphon", somphorn: "somphon",
  boonchay: "boonchai",
  kitisak: "kittisak",
  siripon: "siriporn",
  duangjan: "duangchan", duangchuen: "duangchan",
  mallee: "malee",
  boedi: "budi",
  preeya: "priya",
  puja: "pooja",
  yuuto: "yuto",
  siwoo: "siu",
  woojin: "ujin",
  yijun: "ijun",
  seowoo: "seou",
  christine: "christina",
  kristen: "christina",
  kristin: "christina",
  kirsten: "christina",
  elena: "helen",
  helena: "helen",
  franco: "frank",
  felix: "felicity",
  // Common misspellings
  mcihael: "michael",
  micheal: "michael",
  alexandar: "alexander",
  nikolas: "nicholas",
  // Korean romanization variants
  minjung: "minjae",
  jiwun: "jiwon",
  // Ukrainian variants
  dmytryk: "dmytro",
  svetlana: "svitlana",
  // Serbian variants
  drago: "dragan",
  zora: "zoran",
  // Albanian variants
  burim: "bujar",
  // Mongolian variants
  batu: "batbayar",
  // Hausa variants
  garuba: "garba",
  // Yoruba variants
  baba: "babatunde_yr",
  titi: "titilayo",
  // Pashto variants
  zmarai: "zmaray",
  malala: "malalai",
  // Tibetan variants
  tenzing: "tenzin",
  vajra: "dorje",
};
