import { Header } from "@/components/header"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner with Sports Field Image */}
      <div className="relative h-[400px] md:h-[500px] mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/chatgpt-20image-20nov-2010-202025.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6">Privacy Policy</h1>
          <p className="text-lg text-white/90">Last Updated: September of 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">1. Important Information</h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">1.1. General Terms</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              At MOVO AI, INC. ("Movo," "we," "us" or "our"), putting our users ("you" or "your") first means exceeding
              global privacy and data protection standards to keep all important contacts, communications, and sensitive
              data private, safe, and secure.
            </p>
            <p>
              We design our infrastructure, applications, and tools so you can focus on your relationships, business
              workflows, and customer interactions — without worrying about data misuse or unauthorized access.
            </p>
            <p className="font-semibold">Our Privacy Promise:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                No one at Movo will access, read, or delete your emails or communications unless you explicitly
                authorize it for support purposes.
              </li>
              <li>Movo only pulls the minimum data necessary for the service to function.</li>
              <li>
                We only store communications that pass through Movo (outbound or inbound) solely to provide the service
                (e.g., classification, reply detection, analytics you view inside Movo).
              </li>
              <li>You own your data.</li>
              <li>Your data will be kept private and handled according to this policy and applicable law.</li>
            </ul>
            <p>
              Questions? Contact us at{" "}
              <a href="mailto:info@movoai.co" className="text-blue-600 hover:text-blue-800 underline">
                info@movoai.co
              </a>
              .
            </p>
            <p>
              This Privacy Policy ("Policy") explains how Movo collects, uses, stores, processes, and protects personal
              information.
            </p>
            <p>
              For the purpose of this Policy, "Personal Information" means information about an identifiable individual
              (name, contact, identifiers, behavioral data, etc.). Aggregated and anonymous data that cannot identify an
              individual is not Personal Information.
            </p>
            <p>
              "Services" refers to our website (
              <a href="https://www.movoai.co" className="text-blue-600 hover:text-blue-800 underline">
                www.movoai.co
              </a>
              ), our applications, our AI voice/email/text agent services, CRM integrations, and any other services
              described in our Terms of Service.
            </p>
            <p>
              By using our Services, you consent to our collection, storage, use, processing, and disclosure of your
              Personal Information as described in this Policy.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">1.2. Revisions to This Policy</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              We may modify or update this Policy at any time. Your continued use of the Services after revisions
              constitutes acceptance.
            </p>
            <p>If we make material changes, we will notify you via:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Website</li>
              <li>In-app notices</li>
              <li>Email (if you have an account)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">2. Use of Our Services</h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">2.1. Customer Use</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              You may use the Services to power communication campaigns, automate parent outreach, handle calls, send
              messages, manage inbound inquiries, or integrate with your CRM or scheduling systems.
            </p>
            <p>
              Movo does not control the content our customers send through the Service (text, voice calls, email
              campaigns, automated sequences, booking workflows, etc.). That data belongs to you and is governed by your
              privacy policies.
            </p>
            <p>We process this data only under your direction and store it securely with our service providers.</p>
            <p>
              We have no direct relationship with your customers/end-users. You control the Personal Information you
              collect, store, transmit, or process through Movo.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">2.2. Sensitive Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>Sensitive Information includes, but is not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Financial data</li>
              <li>Identification numbers (SSN, passport, driver's license)</li>
              <li>Health information</li>
              <li>Racial or ethnic origin</li>
              <li>Credentials for connected email systems or third-party services</li>
            </ul>
            <p>
              Movo does not intentionally collect Sensitive Information unless required to process payments or
              authenticate integrations.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">3. Information We Collect</h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.1. Account Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>We collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email</li>
              <li>Phone</li>
              <li>Business information</li>
              <li>Login credentials (encrypted)</li>
              <li>Billing + subscription data</li>
            </ul>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.2. Communications Data</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>When you use Movo to send or receive communications (calls, SMS, email), we may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Outbound messages sent through Movo</li>
              <li>Inbound responses</li>
              <li>Call audio, transcripts (if enabled)</li>
              <li>Call metadata (timestamps, durations, caller ID)</li>
              <li>Parent inquiries</li>
              <li>Booking and scheduling data</li>
            </ul>
            <p>
              This is necessary for AI processing, reply detection, classification, analytics, follow-ups, and
              delivering the service.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">
            3.3. Data From Integrated Systems (CRMs, Scheduling Tools, etc.)
          </h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>If you connect a system such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Jackrabbit</li>
              <li>LeagueApps</li>
              <li>Salesforce</li>
              <li>iClassPro</li>
              <li>HighLevel</li>
              <li>Any CRM or scheduling tool</li>
            </ul>
            <p>we may process:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact lists</li>
              <li>Leads</li>
              <li>Parent information</li>
              <li>Program information</li>
              <li>Enrollment or scheduling data</li>
              <li>Tags, notes, statuses</li>
            </ul>
            <p>All processing occurs solely to perform the workflows you instruct our AI to perform.</p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.4. Navigational / Technical Data</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device identifiers</li>
              <li>Geolocation (approximate)</li>
              <li>Pages viewed</li>
              <li>Session duration</li>
              <li>Cookies, pixels, tracking technologies</li>
            </ul>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.5. Payment Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>Collected via PCI-compliant third-party processors only.</p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.6. Children's Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>Movo does not knowingly collect data directly from children under 13.</p>
            <p>
              If you believe we have — contact{" "}
              <a href="mailto:info@movoai.co" className="text-blue-600 hover:text-blue-800 underline">
                info@movoai.co
              </a>{" "}
              immediately.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.7. Google API Data</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>If you connect Gmail or Google Workspace:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Movo complies with Google API Services User Data Policy and Limited Use requirements.</li>
              <li>
                We only store emails sent via Movo + replies, and the minimum metadata needed to operate the service.
              </li>
              <li>We do not use Google-derived data for advertising or model training.</li>
              <li>We do not allow employee access unless you explicitly authorize for support.</li>
            </ul>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.8. Cookies, Web Beacons, Analytics</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>Used for functionality, performance, security, and understanding traffic behavior.</p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">4. How We Use Information</h3>

          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>We use Personal Information only to:</p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">4.1. Provide and improve the Services</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Run the AI communication engine</li>
              <li>Deliver voice calls, SMS, and emails</li>
              <li>Detect responses</li>
              <li>Enhance call accuracy, transcription, reasoning</li>
              <li>Recommend next steps</li>
              <li>Train private, non-generalized models solely for your account (if applicable)</li>
            </ul>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">4.2. Support and Customer Service</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Troubleshooting</li>
              <li>Responding to help requests</li>
              <li>Diagnosis of issues</li>
            </ul>
            <p>Access to your data for support only occurs with your explicit permission.</p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">4.3. Communications</h4>
            <p>
              We may send administrative messages, onboarding content, service updates, and (rarely) marketing emails.
            </p>
            <p>You may opt out of marketing at any time.</p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">4.4. Security, Fraud Prevention, Legal</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Detect suspicious activity</li>
              <li>Prevent abuse</li>
              <li>Comply with laws</li>
              <li>Enforce Terms of Service</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">5. Data Sharing</h3>

          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p className="font-semibold">We do not sell Personal Information.</p>
            <p>We may share data with:</p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">5.1. Service Providers</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hosting platforms</li>
              <li>Cloud infrastructure</li>
              <li>Speech-to-text and LLM vendors</li>
              <li>Email/SMS delivery partners</li>
              <li>Payment processors</li>
              <li>CRM integration systems</li>
            </ul>
            <p>These vendors are contractually obligated to protect your data.</p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">5.2. Legal / Safety</h4>
            <p>We may disclose information if required to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comply with legal obligations</li>
              <li>Respond to law enforcement</li>
              <li>Protect Movo, our customers, or the public</li>
            </ul>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">5.3. Business Transfers</h4>
            <p>
              If Movo is acquired, merged, or undergoes financing, Personal Information may be transferred under
              confidentiality obligations.
            </p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">5.4. Mobile Numbers and SMS Consent</h4>
            <p>
              We only use mobile numbers and SMS consent information to deliver service-related communications requested
              by the user. We do not sell, share, or disclose mobile numbers, SMS consent data, or message-related
              personal information with third parties, partners, or affiliates for marketing or promotional purposes.
              Any sharing with service providers is strictly for operating our platform under confidentiality
              obligations.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">6. Data Retention</h3>

          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>We retain Personal Information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>For as long as your account is active, and</li>
              <li>As needed to comply with legal, tax, fraud, and audit requirements</li>
            </ul>
            <p>When your account is closed:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data is deleted or anonymized within a reasonable timeframe</li>
              <li>Communications, logs, and transcripts are removed unless legally required to retain</li>
            </ul>
            <p>You may request deletion at any time (see Section 7).</p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
            7. User Choices & Data Rights
          </h3>

          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>You have the right to:</p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">7.1. Request deletion of your data</h4>
            <p>
              Email{" "}
              <a href="mailto:privacy@movoai.co" className="text-blue-600 hover:text-blue-800 underline">
                privacy@movoai.co
              </a>
              . We will delete account data unless retention is required by law.
            </p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">7.2. Opt out of marketing</h4>
            <p>
              Click "unsubscribe" or email{" "}
              <a href="mailto:info@movoai.co" className="text-blue-600 hover:text-blue-800 underline">
                info@movoai.co
              </a>
              .
            </p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">7.3. Access or correct your data</h4>
            <p>
              Request via{" "}
              <a href="mailto:privacy@movoai.co" className="text-blue-600 hover:text-blue-800 underline">
                privacy@movoai.co
              </a>
              .
            </p>

            <h4 className="text-base font-bold text-gray-900 mb-2 mt-6">7.4. Restrict or object to processing</h4>
            <p>Available to EU/EEA users under GDPR.</p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">8. Security</h3>

          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption in transit (TLS)</li>
              <li>Encryption at rest</li>
              <li>Access controls</li>
              <li>SOC2-aligned practices</li>
              <li>Zero employee access to emails or message contents unless explicitly authorized</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">9. International Transfers</h3>

          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>Data may be processed in the U.S. or other jurisdictions. Safeguards (SCCs) apply where required.</p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">10. Contact</h3>

          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              <a href="mailto:privacy@movoai.co" className="text-blue-600 hover:text-blue-800 underline">
                privacy@movoai.co
              </a>
            </p>
            <p>Movo AI, Inc.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
