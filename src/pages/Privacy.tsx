import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | African Tribe Names</title>
        <meta name="description" content="Privacy policy for African Tribe Names - learn how we handle your data and protect your privacy." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
          
          <p className="text-muted-foreground mb-6">
            Last updated: January 4, 2026
          </p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-foreground/80">
              African Tribe Names ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when 
              you use our educational platform.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-foreground/80 mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li><strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited, time spent, and features used.</li>
              <li><strong>Device Information:</strong> Browser type, device type, and operating system for optimization purposes.</li>
              <li><strong>Cookies:</strong> Small files stored on your device to enhance user experience and remember preferences.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground/80 mb-4">
              We use collected information to:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li>Improve and optimize our platform's performance</li>
              <li>Understand user preferences and enhance content</li>
              <li>Analyze usage patterns to create better features</li>
              <li>Ensure platform security and prevent abuse</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Sharing</h2>
            <p className="text-foreground/80">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              anonymized, aggregate data for analytical purposes.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-foreground/80">
              We implement reasonable security measures to protect your information. However, no method 
              of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Third-Party Services</h2>
            <p className="text-foreground/80">
              Our platform may use third-party services (such as analytics tools) that collect and 
              process data according to their own privacy policies. We encourage you to review those 
              policies for more information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Children's Privacy</h2>
            <p className="text-foreground/80">
              Our platform is designed to be educational and family-friendly. We do not knowingly 
              collect personal information from children under 13 without parental consent.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Your Rights</h2>
            <p className="text-foreground/80 mb-4">
              Depending on your location, you may have certain rights regarding your data, including:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li>Right to access your personal information</li>
              <li>Right to request correction of inaccurate data</li>
              <li>Right to request deletion of your data</li>
              <li>Right to opt-out of certain data collection</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Changes to This Policy</h2>
            <p className="text-foreground/80">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page with an updated revision date.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Contact Us</h2>
            <p className="text-foreground/80">
              If you have any questions about this Privacy Policy, please contact us through our platform.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Privacy;
