import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { TribeData } from '@/types/tribe';

interface TribeFAQSectionProps {
  tribe: TribeData;
  countryNames: string;
}

interface FAQ {
  question: string;
  answer: string;
}

function generateFAQs(tribe: TribeData, countryNames: string): FAQ[] {
  const faqs: FAQ[] = [];
  const name = tribe.name;
  const lang = tribe.language;
  const religion = typeof tribe.religion === 'string' ? tribe.religion : '';
  const pop = tribe.population || 'several million';
  const region = tribe.region || 'their traditional homeland';
  const desc = tribe.description || '';

  // 1. What are the [Tribe] known for?
  faqs.push({
    question: `What are the ${name} people known for?`,
    answer: desc.slice(0, 300) || `The ${name} are one of Africa's notable ethnic groups, known for their rich cultural heritage, traditional practices, and contributions to their region.`
  });

  // 2. Where do they live?
  faqs.push({
    question: `Where do the ${name} live?`,
    answer: `The ${name} people are found in ${countryNames}, primarily in ${region}. They have a population of approximately ${pop}.`
  });

  // 3. Language
  if (lang?.name) {
    faqs.push({
      question: `What language do the ${name} speak?`,
      answer: `The ${name} speak ${lang.name}${lang.family ? `, which belongs to the ${lang.family} language family` : ''}${lang.speakers ? `. There are approximately ${lang.speakers} speakers` : ''}.`
    });
  }

  // 4. Population
  faqs.push({
    question: `What is the population of the ${name}?`,
    answer: `The ${name} have a population of approximately ${pop}${tribe.populationPercent ? `, making up about ${tribe.populationPercent} of the national population` : ''}.`
  });

  // 5. Religion
  if (religion) {
    faqs.push({
      question: `What religion do the ${name} practice?`,
      answer: `The ${name} people practice ${religion}. Many also maintain elements of their traditional spiritual practices alongside modern religious beliefs.`
    });
  }

  // 6. Names
  if (tribe.commonNames?.female?.length || tribe.commonNames?.male?.length) {
    const examples = [
      ...(tribe.commonNames?.female?.slice(0, 3) || []),
      ...(tribe.commonNames?.male?.slice(0, 3) || [])
    ].join(', ');
    faqs.push({
      question: `What are common ${name} names?`,
      answer: `Common ${name} names include ${examples}. Names in ${name} culture often reflect circumstances of birth, family lineage, or spiritual significance.`
    });
  }

  // 7. Greeting
  if (lang?.greeting) {
    faqs.push({
      question: `How do you greet someone in ${lang.name || name}?`,
      answer: `A common greeting is "${lang.greeting}"${lang.greetingMeaning ? ` which means "${lang.greetingMeaning}"` : ''}. Greetings are an important part of ${name} social etiquette.`
    });
  }

  // 8. Cultural traits
  if (tribe.culturalTraits && tribe.culturalTraits.length > 0) {
    faqs.push({
      question: `What are the cultural traditions of the ${name}?`,
      answer: `Key cultural traits of the ${name} include: ${tribe.culturalTraits.slice(0, 4).join(', ')}. These traditions are passed down through generations and remain an important part of their identity.`
    });
  }

  // 9. Related tribes
  if (tribe.relatedTribes && tribe.relatedTribes.length > 0) {
    faqs.push({
      question: `Which tribes are related to the ${name}?`,
      answer: `The ${name} share cultural and linguistic connections with several neighboring ethnic groups. They are part of a larger network of ${region} communities with shared history and traditions.`
    });
  }

  // 10. Fun facts
  if (tribe.funFacts && tribe.funFacts.length > 0) {
    faqs.push({
      question: `What are interesting facts about the ${name}?`,
      answer: tribe.funFacts.slice(0, 2).join(' ')
    });
  }

  return faqs.slice(0, 10);
}

export function TribeFAQSection({ tribe, countryNames }: TribeFAQSectionProps) {
  const faqs = generateFAQs(tribe, countryNames);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="border-t border-border pt-6">
      <h2 className="font-display text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
        ❓ Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={`${tribe.id}-faq-${i}-${faq.question.slice(0, 48)}`} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-secondary/50 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-sm sm:text-base text-foreground pr-2">{faq.question}</span>
              {openIndex === i ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Generate FAQ structured data for JSON-LD
 */
export function generateFAQStructuredData(tribe: TribeData, countryNames: string) {
  const faqs = generateFAQs(tribe, countryNames);
  if (faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
