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
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Nov%2010%202025-zboBrHYTW2QXmpWZFXp3wbILvXgiVr.png')",
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
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">1. Important information</h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">1.1. General terms</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              At MOVO AI, INC. ("Movo," "we," "us" or "our"), putting our users ("you" or "your") first means exceeding
              global privacy and data protection standards in order to keep important contacts and sensitive data and
              communications private, safe and secure. We set up our infrastructure, applications, and tools in a way
              that enables you to strengthen and leverage your important relationships when they matter the most,
              without having to worry about data security or privacy concerns.
            </p>
            <p>Our Privacy Promise:</p>
            <p>No one will access, read, or delete your emails.</p>
            <p>
              When Movo connects to your email server, we pull only the minimum amount of information required for our
              service to function.
            </p>
            <p>
              Our server only stores emails you have sent via Movo and any responses you received to those emails, so we
              can detect replies and you can have access to them from the application.
            </p>
            <p>Additional questions? Don't hesitate to send us an email at info@Movoai.co.</p>
            <p>
              Movo is committed to maintaining the privacy and security of any of your personal information on the
              website or in our applications or information received in any other manner. This Privacy Policy
              ("Agreement" or "Policy") defines how Movo uses and protects any personal information that it collects and
              stores.
            </p>
            <p>
              For the purpose of this Agreement, "Services" refers to the Company's website which can be viewed or
              accessed at www.Movoai.co ("Website"), our applications or any other services that we may supply to you
              which are further described in our Terms of Service.
            </p>
            <p>
              By accepting our Policy and our Terms of Service, you expressly consent to our collection, storage,
              processing, use and disclosure of your Personal information as described in this Policy.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">1.2. Revision of the Privacy Policy</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              Movo reserves the right to revise, modify or update this Policy at any time. Your continued use of the
              Services after any such revisions, modifications or updates constitutes your acceptance of any such
              change.
            </p>
            <p>
              If we make any material changes we will notify you by posting the revised Privacy Policy on our Website or
              conspicuously in the Services and, if you subscribe to our Subscription Service, providing notice through
              email.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">2. Use of our services</h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">2.1. Our customers use</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              You can use the Services to create communication campaigns in order to reach out to or nurture prospects
              with sales, marketing or customer success purposes.
            </p>
            <p>
              Movo does not control the content of campaigns (text, email or other communications templates) or the
              types of information that our customers may choose to collect or manage using the Services.
            </p>
            <p>
              That information belongs to you and is used, disclosed and protected by them according to their privacy
              policies and is not subject to this Privacy Policy. Movo processes our customers' information as they
              direct and in accordance with our agreements with our customers, and we store it on our service providers'
              servers, but we do not have control over its collection or management.
            </p>
            <p>
              We have no direct relationship with individuals who provide Personal Information to our customers. Movo
              acknowledges that you have the right to access your Personal Information. You control and are responsible
              for correcting, deleting or updating the information they have collected from you using the Services.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">2.2. Sensitive Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              This refers to credit or debit card numbers, personal financial account information, Social Security
              numbers, passport numbers, driver's license numbers or similar personal identifiers, racial or ethnic
              origin, physical or mental health condition or information, or other employment, financial or health
              information. Also, sensitive information includes credentials to Movo application services or email
              accounts (Google or other providers) that are connected to Movo application.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
            3. Information we collect and receive
          </h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.1. When You Visit our Website</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              You are free to explore our Website without providing any Personal Information about yourself. Movo
              collects your Personal Information when you register and open an account with Movo to help us operate and
              support the Services and to contact you in connection with your use of the Services.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.2. Account Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              When you provide Movo with your Personal Information you consent to our providing your information to any
              third parties that are necessary to offer, support and improve the Services. Movo also collects Personal
              Information from you when you place an order including your name, physical address, email address. Movo
              only uses this data for the purpose of fulfilling orders or communicating with you and Movo's partners
              regarding the Services.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.3. "Navigational Information"</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              "Navigational Information" refers to information about your computer and your visits to this website such
              as your IP address, geographical location, browser type, referral source, length of visit and pages
              viewed.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.4. Payment Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              We collect and process payment information from you when you subscribe to the Service, including credit
              card numbers and billing information, using third party PCI-compliant service providers. Except for this,
              we do not collect Sensitive Information from you.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.5. Information from Children</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              The Websites and our Services are not intended for or targeted at children under 13, and we do not
              knowingly or intentionally collect information about children under 13. If you believe that we have
              collected information about a child under 13, please contact us at info@Movoai.co, so that we may delete
              the information.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.6. Google User Data</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              Movoai.co use and transfer to any other app of information received from Google APIs will adhere to Google
              API Services User Data Policy, including the Limited Use requirements.
            </p>
            <p>
              If you choose to connect a Gmail account to Movo, we will ask you to grant Movo application permissions to
              access your Gmail account. These permissions are necessary to sustain the functionality of our Services.
              In particular, we will need to access your inbox folder to detect replies to emails that have been sent
              via Movo.
            </p>
            <p>
              Our servers only store emails that you have sent via Movo and any responses you have received to those
              emails so we can detect replies, classify them, and provide access to them in your Movo account.
            </p>
            <p>
              Also, we will store your authentication token and account email address. This data will be securely stored
              to be used by Movo to provide you with the Services. Under no circumstances will this data be voluntarily
              shared with any third parties.
            </p>
            <p>
              At Movo, we do not use data obtained from our customers (from their Google accounts) for advertising
              purposes; this includes personalized, re-targeted, and interest-based advertising.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">3.7. Cookies and Web Beacons</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's
              browser provides to the website each time the visitor returns. Movo uses cookies to identify and track
              visitors, and your website access preferences.
            </p>
            <p>
              Web beacons are electronic images that may be used in the Movo Services or in emails that help us to
              deliver cookies, count visits, understand usage and campaign effectiveness and determine whether an email
              has been opened and acted upon.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">4. How we use information</h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">4.1. Use of Navigational Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>We use Navigational Information to operate and improve the Services.</p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">4.2. Use of Personal Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              We may, from time to time, contact you on behalf of external business partners about a particular offering
              that may be of interest to you. In those cases, we do not transfer your unique Personal Information to the
              third party.
            </p>
            <p>
              If you do not want us to share your personal information with these companies, contact us at
              info@Movoai.co.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">4.3. Service Providers</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              We employ other companies and people to provide services to visitors to our Websites, our customers, and
              users of the Services and we may need to share your information with them to provide information, products
              or services to you.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">4.4. Security of Personal Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              We use a variety of security technologies and procedures to help protect your Personal Information from
              unauthorized access, use or disclosure. We secure the Personal Information you provide on computer servers
              in a controlled, secure environment, protected from unauthorized access, use or disclosure.
            </p>
            <p>
              All connections to our Website or Services are protected via the use of encrypted connections, such as the
              Secure Socket Layer (SSL) protocol.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">4.5. Retention of Personal Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              We retain Personal Information that you provide us as long as we consider it potentially useful in
              contacting you about the Service or our other services, or as needed to comply with our legal obligations,
              resolve disputes and enforce our agreements.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">4.6. International Transfer of Information</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              If you are located outside the United States, the information that we collect from you may be transferred
              to and stored and processed at, a destination in the United States. By submitting information, you agree
              to this transfer, storing or processing.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">4.7. Compelled Disclosure</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              We reserve the right to use or disclose your Personal Information if required by law or if we reasonably
              believe that use or disclosure is necessary to protect our rights, protect your safety or the safety of
              others, investigate fraud, or comply with a law, court order, or legal process.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">5. Your rights</h3>

          <h4 className="text-base font-bold text-gray-900 mb-4">5.1. Access and Correction</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              You have the right to access, update, and correct inaccuracies in your Personal Information in our custody
              and control, subject to certain exceptions prescribed by law.
            </p>
          </div>

          <h4 className="text-base font-bold text-gray-900 mb-4">5.2. Unsubscribe from Communications</h4>
          <div className="space-y-4 text-base leading-relaxed text-gray-900 mb-6">
            <p>
              You may unsubscribe from our marketing communications by clicking on the "unsubscribe" link located on the
              bottom of our emails, or by sending us an email at info@Movoai.co.
            </p>
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-600 leading-relaxed">
            For questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@movoai.com" className="text-blue-600 hover:text-blue-800 underline">
              privacy@movoai.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
