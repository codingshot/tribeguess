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
  
  const results = nameQuery ? detectTribe(nameQuery, {
    timeOfBirth: timeQuery || undefined,
    region: regionQuery || undefined,
    build: buildQuery || undefined,
    personality: personalityQuery || undefined,
  }) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {!results ? (
          // Landing view
          <section className="max-w-2xl mx-auto text-center py-8 sm:py-12 animate-fade-in">
            <div className="mb-6 sm:mb-8">
              <img 
                src={logo} 
                alt="TribeGuess - Kenyan Tribe Guesser Logo" 
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 animate-bounce-subtle"
                width={128}
                height={128}
              />
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Guess Her <span className="gradient-gold-text">Tribe</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto px-2">
                Enter a Kenyan name to discover the tribe it likely belongs to, along with cultural insights and stereotypes.
              </p>
            </div>
            
            <GuessForm initialName={nameQuery} initialTime={timeQuery} initialRegion={regionQuery} initialBuild={buildQuery} initialPersonality={personalityQuery} />
            
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                Try some popular names:
              </p>
              <nav aria-label="Example names" className="flex flex-wrap justify-center gap-2">
                {['Wanjiku', 'Odhiambo', 'Cheruiyot', 'Nafula', 'Mutua', 'Moraa', 'Kipchoge', 'Fatuma'].map(name => (
                  <a 
                    key={name}
                    href={`/?name=${name}`}
                    className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 touch-manipulation"
                  >
                    {name}
                  </a>
                ))}
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
              <GuessForm initialName={nameQuery} initialTime={timeQuery} initialRegion={regionQuery} initialBuild={buildQuery} initialPersonality={personalityQuery} />
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
          © {new Date().getFullYear()} TribeGuess. Educational entertainment about Kenyan tribes.
        </p>
      </footer>
    </div>
  );
};

export default Index;
