import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service | African Tribe Names</title>
        <meta name="description" content="Terms of service for African Tribe Names - an educational platform for exploring African cultural heritage and naming traditions." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: January 4, 2026
          </p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Entertainment Disclaimer</h2>
            <p className="text-foreground/80 mb-4">
              This platform is designed for <strong>entertainment and educational purposes only</strong>. 
              The cultural information, naming conventions, and tribal descriptions presented are meant to 
              celebrate and share African heritage in a respectful and informative manner.
            </p>
            <p className="text-foreground/80">
              While we strive for accuracy, cultural practices vary widely among communities, and the 
              information should not be used as definitive anthropological or academic reference material.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Acceptance of Terms</h2>
            <p className="text-foreground/80">
              By accessing and using African Tribe Names, you accept and agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Use of Content</h2>
            <p className="text-foreground/80 mb-4">
              All content on this platform is provided for personal, non-commercial use. You may:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li>Browse and explore cultural information freely</li>
              <li>Share content for educational purposes with attribution</li>
              <li>Use the name suggestions for personal inspiration</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Cultural Sensitivity</h2>
            <p className="text-foreground/80">
              We are committed to presenting all tribal and ethnic groups with respect and dignity. 
              Any descriptions or characterizations are presented to celebrate diversity, not to 
              stereotype or diminish any cultural group. If you notice any content that may be 
              culturally insensitive, please contact us so we can review and address it.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Accuracy of Information</h2>
            <p className="text-foreground/80">
              While we make every effort to ensure the accuracy of the information presented, 
              African cultures are rich and diverse. Information may not represent all perspectives 
              within a community, and cultural practices evolve over time.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Modifications</h2>
            <p className="text-foreground/80">
              We reserve the right to modify these terms at any time. Continued use of the platform 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact</h2>
            <p className="text-foreground/80">
              For questions about these terms or our content, please reach out through our platform.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Terms;
