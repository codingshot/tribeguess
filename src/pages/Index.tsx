import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { GuessForm } from '@/components/GuessForm';
import { TribeResultCard } from '@/components/TribeResultCard';
import { detectTribe } from '@/lib/tribeDetection';
import logo from '@/assets/logo.png';

const Index = () => {
  const [searchParams] = useSearchParams();
  const nameQuery = searchParams.get('name') || '';
  const timeQuery = searchParams.get('time') || '';
  const regionQuery = searchParams.get('region') || '';
  const buildQuery = searchParams.get('build') || '';
  const personalityQuery = searchParams.get('personality') || '';
  const countryQuery = searchParams.get('country') || 'KE';
  
  // Track selected country from form - initialize with URL param or default
  const [selectedCountry, setSelectedCountry] = useState<string>(countryQuery);
  
  // Adjective forms for grammatically correct display
  const countryAdjectives: Record<string, string> = {
    'KE': 'Kenyan',
    'NG': 'Nigerian',
    'GH': 'Ghanaian',
    'ZA': 'South African',
    'ET': 'Ethiopian',
    'TZ': 'Tanzanian',
    'UG': 'Ugandan',
    'CD': 'Congolese',
    'SN': 'Senegalese',
    'ER': 'Eritrean',
  };
  // Use selectedCountry directly - it's always synced with form
  const activeCountry = selectedCountry;
  const countryAdjective = countryAdjectives[activeCountry] || 'Kenyan';
  
  let results = null;
  try {
    results = nameQuery ? detectTribe(nameQuery, {
      timeOfBirth: timeQuery || undefined,
      region: regionQuery || undefined,
      build: buildQuery || undefined,
      personality: personalityQuery || undefined,
      country: countryQuery || undefined,
    }) : null;
  } catch (e) {
    console.error('Detection error:', e);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {!results ? (
          // Landing view
          <section className="max-w-2xl mx-auto text-center py-8 sm:py-12 animate-fade-in">
            <div className="mb-6 sm:mb-8">
              {/* Hero with orbiting flags - all supported countries */}
              <div className="relative inline-block">
                {/* Orbiting flags behind logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <style>{`
                    @keyframes orbit {
                      from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
                      to { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
                    }
                  `}</style>
                  {['🇰🇪', '🇳🇬', '🇬🇭', '🇿🇦', '🇪🇹', '🇹🇿', '🇺🇬', '🇨🇩', '🇸🇳', '🇪🇷'].map((flag, i) => (
                    <span
                      key={flag}
                      className="absolute text-xl sm:text-2xl opacity-35"
                      style={{
                        animation: `orbit 15s linear infinite`,
                        animationDelay: `${-i * 1.5}s`,
                      }}
                    >
                      {flag}
                    </span>
                  ))}
                </div>
                <img 
                  src={logo} 
                  alt="TribeGuess - Tribe Guesser Logo" 
                  className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 animate-bounce-subtle"
                  width={128}
                  height={128}
                />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Guess Her <span className="gradient-gold-text">Tribe</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto px-2">
                Enter a name to discover the tribe it likely belongs to, along with cultural insights and stereotypes.
              </p>
            </div>
            
            <GuessForm 
              initialName={nameQuery} 
              initialTime={timeQuery} 
              initialRegion={regionQuery} 
              initialBuild={buildQuery} 
              initialPersonality={personalityQuery} 
              initialCountry={countryQuery}
              onCountryChange={setSelectedCountry}
            />
            
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                Try some popular {countryAdjective} names:
              </p>
              <nav aria-label="Example names" className="flex flex-wrap justify-center gap-2">
                {(() => {
                  const popularNames: Record<string, string[]> = {
                    'KE': ['Wanjiku', 'Odhiambo', 'Cheruiyot', 'Nafula', 'Mutua', 'Moraa', 'Kipchoge', 'Fatuma'],
                    'NG': ['Adaeze', 'Chidi', 'Ngozi', 'Oluwaseun', 'Amaka', 'Emeka', 'Funke', 'Tunde'],
                    'GH': ['Akosua', 'Kofi', 'Abena', 'Kwame', 'Yaa', 'Ama', 'Nana', 'Adjoa'],
                    'ZA': ['Thandiwe', 'Sipho', 'Nomvula', 'Thabo', 'Lindiwe', 'Mandla', 'Zinhle', 'Bongani'],
                    'ET': ['Tigist', 'Abebe', 'Meron', 'Haile', 'Bethlehem', 'Yohannes', 'Selamawit', 'Dawit'],
                    'TZ': ['Neema', 'Juma', 'Zawadi', 'Bakari', 'Hadija', 'Rajabu', 'Amina', 'Hamisi'],
                    'UG': ['Nakato', 'Mukasa', 'Nabirye', 'Wasswa', 'Auma', 'Okello', 'Nambi', 'Kato'],
                    'CD': ['Mamadou', 'Fatou', 'Kabongo', 'Mwamba', 'Ngalula', 'Lukusa', 'Mutombo', 'Kasongo'],
                    'SN': ['Aminata', 'Ousmane', 'Fatou', 'Ibrahima', 'Aissatou', 'Moussa', 'Mariama', 'Cheikh'],
                    'ER': ['Feven', 'Yonas', 'Selam', 'Bereket', 'Merhawi', 'Hirut', 'Samuel', 'Eden'],
                  };
                  const names = popularNames[activeCountry] || popularNames['KE'];
                  return names.map(name => (
                    <a 
                      key={name}
                      href={`/?name=${name}&country=${activeCountry}`}
                      className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 touch-manipulation"
                    >
                      {name}
                    </a>
                  ));
                })()}
              </nav>
            </div>
            
            <aside className="mt-6 sm:mt-8 p-3 sm:p-4 bg-secondary/50 rounded-xl max-w-md mx-auto">
              <p className="text-xs text-muted-foreground">
                ⚠️ <strong>Disclaimer:</strong> This tool is for entertainment and educational purposes only. 
                Stereotypes presented are common perceptions and may not apply to individuals.
              </p>
            </aside>
          </section>
        ) : (
          // Results view
          <section className="max-w-2xl mx-auto animate-fade-in" aria-label="Tribe prediction results">
            <header className="text-center mb-6 sm:mb-8">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                Results for "<span className="text-primary">{results.inputName}</span>"
              </h1>
              {results.timeOfBirth && (
                <p className="text-muted-foreground text-sm">
                  Born in the {results.timeOfBirth}
                </p>
              )}
            </header>
            
            <div className="mb-6 sm:mb-8">
              <GuessForm initialName={nameQuery} initialTime={timeQuery} initialRegion={regionQuery} initialBuild={buildQuery} initialPersonality={personalityQuery} initialCountry={countryQuery} />
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {results.predictions.map((prediction, index) => (
                <TribeResultCard 
                  key={prediction.tribe.id}
                  result={prediction}
                  rank={index + 1}
                  inputName={results.inputName}
                />
              ))}
            </div>
            
            {results.predictions.length > 0 && (
              <nav className="mt-6 sm:mt-8 text-center">
                <a 
                  href={`/learn/${results.predictions[0].tribe.slug || results.predictions[0].tribe.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm sm:text-base touch-manipulation p-2"
                >
                  Learn more about the {results.predictions[0].tribe.name} tribe →
                </a>
              </nav>
            )}
            
            <aside className="mt-6 sm:mt-8 p-3 sm:p-4 bg-secondary/50 rounded-xl">
              <p className="text-xs text-muted-foreground text-center">
                ⚠️ <strong>Disclaimer:</strong> This tool is for entertainment and educational purposes only. 
                Predictions are based on common naming patterns and may not be accurate for all names.
              </p>
            </aside>
          </section>
        )}
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-border mt-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TribeGuess. Educational entertainment about African tribes and ethnic groups.
        </p>
      </footer>
    </div>
  );
};

export default Index;
