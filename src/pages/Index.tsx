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
  
  const results = nameQuery ? detectTribe(nameQuery, timeQuery || undefined) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!results ? (
          // Landing view
          <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
            <div className="mb-8">
              <img 
                src={logo} 
                alt="TribeGuess" 
                className="w-32 h-32 mx-auto mb-6 animate-bounce-subtle"
              />
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Guess Her <span className="gradient-gold-text">Tribe</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Enter a Kenyan name to discover the tribe it likely belongs to, along with cultural insights and stereotypes.
              </p>
            </div>
            
            <GuessForm initialName={nameQuery} initialTime={timeQuery} />
            
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Try some popular names:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Wanjiku', 'Odhiambo', 'Cheruiyot', 'Nafula', 'Mutua', 'Moraa'].map(name => (
                  <a 
                    key={name}
                    href={`/?name=${name}`}
                    className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-secondary/50 rounded-xl max-w-md mx-auto">
              <p className="text-xs text-muted-foreground">
                ⚠️ <strong>Disclaimer:</strong> This tool is for entertainment and educational purposes only. 
                Stereotypes presented are common perceptions and may not apply to individuals.
              </p>
            </div>
          </div>
        ) : (
          // Results view
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                Results for "<span className="text-primary">{results.inputName}</span>"
              </h1>
              {results.timeOfBirth && (
                <p className="text-muted-foreground text-sm">
                  Born in the {results.timeOfBirth}
                </p>
              )}
            </div>
            
            <div className="mb-8">
              <GuessForm initialName={nameQuery} initialTime={timeQuery} />
            </div>
            
            <div className="space-y-4">
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
              <div className="mt-8 text-center">
                <a 
                  href={`/learn?tribe=${results.predictions[0].tribe.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Learn more about the {results.predictions[0].tribe.name} tribe →
                </a>
              </div>
            )}
            
            <div className="mt-8 p-4 bg-secondary/50 rounded-xl">
              <p className="text-xs text-muted-foreground text-center">
                ⚠️ <strong>Disclaimer:</strong> This tool is for entertainment and educational purposes only. 
                Predictions are based on common naming patterns and may not be accurate for all names.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
