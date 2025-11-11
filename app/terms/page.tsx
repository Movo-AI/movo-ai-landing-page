import { Header } from "@/components/header"

export default function TermsPage() {
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6">Terms & Conditions</h1>
          <p className="text-lg text-white/90">Last Updated: November of 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-8 uppercase tracking-wide">TERMS AND CONDITIONS</h2>
          <p className="text-base leading-relaxed text-gray-900 mb-8">
            PLEASE READ THESE TERMS AND CONDITIONS ("TERMS") CAREFULLY BEFORE USING THE SERVICE OFFERED BY MOVO AI, INC.
            ("MOVO"). BY MUTUALLY EXECUTING ONE OR MORE ORDER FORMS WITH MOVO WHICH REFERENCE THESE TERMS (EACH, AN
            "ORDER FORM"), YOU ("CUSTOMER") AGREE TO BE BOUND BY THESE TERMS (TOGETHER WITH ALL ORDER FORMS, THE
            "AGREEMENT") TO THE EXCLUSION OF ALL OTHER TERMS. IN ADDITION, ANY ONLINE ORDER FORM WHICH YOU SUBMIT VIA
            MOVO'S STANDARD ONLINE PROCESS AND WHICH IS ACCEPTED BY MOVO SHALL BE DEEMED TO BE MUTUALLY EXECUTED. IF YOU
            ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF AN ENTITY, THEN YOU REPRESENT AND WARRANT THAT YOU ARE
            AUTHORIZED TO BIND SUCH ENTITY TO THE TERMS OF THIS AGREEMENT. IF THE TERMS OF THIS AGREEMENT ARE CONSIDERED
            AN OFFER, ACCEPTANCE IS EXPRESSLY LIMITED TO SUCH TERMS.
          </p>
        </div>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">RECITALS</h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            <p>
              WHEREAS, Movo provides the Service (defined below) to enterprise customers to augment their marketing
              efforts; and
            </p>
            <p>
              WHEREAS, Customer desires to license from Movo the Service under the terms and conditions of this
              Agreement;
            </p>
            <p>
              NOW, THEREFORE, in consideration of the mutual premises and of the performance of the mutual covenants
              herein, the parties agree as follows:
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">1. DEFINITIONS</h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            <p>
              1.1. "Admin User" means a Customer employee or contractor designated with administrative privileges to
              manage Customer's account at the organization level, including provisioning Authorized Users and other
              configuration settings described in the Documentation.
            </p>
            <p>
              1.2. "Applicable Laws" means all applicable laws and regulations of the European Union, the European
              Economic Area and their member states, Switzerland, the United Kingdom and the United States applicable to
              (a) the access and processing of Personal Data and, (b) marketing and solicitation of individuals,
              including without limitation, the EU GDPR, the EU GDPR as it forms part of the law of England and Wales,
              Scotland and Northern Ireland by virtue of section 3 of the European Union (Withdrawal) Act 2018, the
              Telephone Consumer Protection Act, CAN-SPAM Act, and the California Consumer Privacy Act.
            </p>
            <p>
              1.3. "Authorized Users" means Customer's employees, consultants, and contractors authorized to access and
              use the Service.
            </p>
            <p>
              1.4. "Confidential Information" means any information or data disclosed by either party that is marked or
              otherwise designated as confidential or proprietary or that should otherwise be reasonably understood to
              be confidential in light of the nature of the information and the circumstances surrounding disclosure.
              However, "Confidential Information" will not include any information which (a) is publicly available
              through no fault of receiving party; (b) was properly known to receiving party, without restriction, prior
              to disclosure by the disclosing party; (c) was properly disclosed to receiving party, without restriction,
              by another person with the legal authority to do so; or (d) is independently developed by the receiving
              party without use of or reference to the disclosing party's Confidential Information. Customer Data and
              User Content is Customer's Confidential Information. All software, hardware, Documentation, and other
              information provided by Movo as part of the Service is Movo's Confidential Information.
            </p>
            <p>
              1.5. "Credits" means a unit of measure by which use of the Service by an Authorized User is tracked and
              billed.
            </p>
            <p>
              1.6. "Customer Data" means (a) all Customer-provided data and/or information provided to Movo by or on
              behalf of Customer, including Credits purchased and any data sets provided to Movo; and (b) User Content.
            </p>
            <p>
              1.7. "Documentation" means electronic or hardcopy manuals, designs, drawings, specifications, datasheets,
              slide decks or documents received from Movo in connection with the Service under this Agreement.
            </p>
            <p>
              1.8. "DPA" means the Data Processing Terms between Movo and Customer, hereby incorporated by reference and
              attached as Exhibit A.
            </p>
            <p>
              1.9. "EU GDPR" means Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April
              2016 on the protection of natural persons with regard to the processing of Personal Data and on the free
              movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation).
            </p>
            <p>
              1.10. "Feedback" means any suggestions, comments or other feedback provided by Customer to Movo, and
              relating to the Service.
            </p>
            <p>
              1.11. "Order Form" means an order form executed by Customer and Movo for the purchase of the Service,
              which is incorporated by reference.
            </p>
            <p>
              1.12. "Performance Data" means data, reports, and information derived from the use of the Service and
              Usage Data or aggregated data derived from Customer Data or Usage Data and all improvements,
              modifications, and derivatives thereof.
            </p>
            <p>1.13. "Personal Data" means the meaning given to it in the DPA.</p>
            <p>
              1.14. "Service" means the artificial intelligence-powered digital workers ("Alice" and "Julian") for
              marketing by email or phone, made available to Customer through the Movo platform.
            </p>
            <p>
              1.15. "User Content" means the content created by Customer for use by the Service for marketing outreach.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
            2. LICENSE; RESTRICTIONS; DATA PROCESSING
          </h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            <p>
              2.1. License. Subject to Customer's compliance with this Agreement and payment of all applicable fees,
              Movo grants to Customer a non-exclusive, non-transferable, non-sublicensable, license (a) to access and
              use the Service in accordance with the terms of the Order Form and the Documentation and for Customer's
              internal business purposes; and (b) to make a reasonable number of copies of the Documentation solely in
              connection with using the Service.
            </p>
            <p>2.2. Restrictions. Customer agrees not to, and will not allow any third party, to:</p>
            <p>
              2.2.1. use the Service for any illegal purpose or in violation of any local, state, national, or
              international law;
            </p>
            <p>
              2.2.2. violate, or encourage others to violate, any right of a third party, including by infringing or
              misappropriating any third party intellectual property right;
            </p>
            <p>
              2.2.3. interfere with security-related features of the Service, including by: (i) disabling or
              circumventing features that prevent or limit use or copying of any content; or (ii) reverse engineering or
              otherwise attempting to discover the source code of any portion of the Service except to the extent that
              the activity is expressly permitted by Applicable Law;
            </p>
            <p>
              2.2.4. interfere with the operation of the Service or any user's enjoyment of the Service, including by:
              (i) uploading or otherwise disseminating any virus, adware, spyware, worm, or other malicious code; (ii)
              making any unsolicited offer or advertisement to another user of the Service; (iii) collecting personal
              information about another user or third party without consent; or (iv) interfering with or disrupting any
              network, equipment, or server connected to or used to provide the Service;
            </p>
            <p>
              2.2.5. perform or attempt to perform any actions that would interfere with the proper working of the Service, prevent access to or use of the Service by Movo's other customers, or impose an unreasonable or disproportionately large load on Movo's infrastructure; access or use the Service for purposes of developing a similar or competing product;
            </p>
            <p>
              2.2.6. remove or otherwise alter any proprietary notices or labels from the Service or any portion
              thereof;
            </p>
            <p>
              2.2.7. reverse engineer, decompile, disassemble, or otherwise attempt to discover the underlying
              structure, ideas, or algorithms of the Service or any software used to provide or make the Service
              available;
            </p>
            <p>2.2.8. rent, resell or otherwise allow any third-party access to or use of the Service;</p>
            <p>
              2.2.9. use, inspect, analyze, or otherwise exploit the Service outside the scope of the express license
              granted in Section 2.1; or
            </p>
            <p>2.2.10. use the Service for benchmarking or competitive analysis.</p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">3. PROPRIETARY RIGHTS; IP</h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            <p>
              3.1. Proprietary Rights. As between the parties, Movo or its licensors exclusively owns all right, title,
              and interest in and to the Service and Documentation, and any software or other intellectual property
              created, used, provided or made available by Movo under or in connection with the Service, and Customer
              exclusively owns all right, title and interest in and to the Customer Data and Performance Data. Movo
              shall acquire no rights in or to the Customer Data or Performance Data, except for the license rights to
              Movo set forth in Section 3.2.
            </p>
            <p>3.2. License to Movo.</p>
            <p>
              3.2.1. Performance Data. Customer hereby grants Movo a limited license to aggregate, collect, analyze, and
              store Performance Data (a) to provide, maintain, and improve the Service, and (b) in aggregated,
              de-identified form for Movo's marketing purposes. For clarity, any Performance Data used for marketing
              purposes will not identify Customer.
            </p>
            <p>
              3.2.2. Customer Data. Customer hereby grants Movo a limited license to collect, store, and use Customer
              Data to provide, maintain, and improve the Service.
            </p>
            <p>
              3.2.3. Feedback. Customer has no obligation to disclose to Movo any Feedback. However, if Customer
              discloses Feedback to Movo, Customer shall grant, and hereby does grant, to Movo a non-exclusive,
              worldwide, non-terminable, royalty-free, transferable, sublicensable license to use, reproduce, prepare
              derivative works of, make, have made, import, offer for sale, sell, lease, distribute, publicly display,
              publicly perform, and otherwise exploit such intellectual property rights in or to any such Feedback in or
              with any Movo products or technology.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">4. FEES, PAYMENT</h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            <p>
              4.1. Fees. Upon execution of this Agreement, Movo will invoice Customer for access to the Service, which
              includes a mutually agreed number of Credits, at the frequency described in the Order Form. All Credits
              purchases are non-refundable. Movo will invoice Customer in advance quarterly for recurring fees.
            </p>
            <p>
              4.2. Overages. Movo provides notification to Authorized Users when their Credits balance is running low
              and does not allow further use of the Service when Customer's Credits balance is zero. Additional Credits
              may be purchased via Order Form, and once processed, the new Credits balance will be available on the
              Admin User's account dashboard.
            </p>
            <p>
              4.3. Payment. Customer shall pay those amounts due and not disputed in good faith within thirty (30) days
              from the date of each invoice from Movo. Customer will make all payments in U.S. dollars. If Customer
              fails to pay any amounts hereunder at least five (5) days past the applicable due date. If Movo has not
              received payment within five (5) days after the applicable due date, interest will accrue on past due
              amounts at the rate of one percent (1%) per month, but in no event greater than the highest rate of
              interest allowed by law, calculated from the date such amount was due until the date that payment is
              received by Movo.
            </p>
            <p>
              4.4. Taxes. All amounts payable hereunder are exclusive of any sales, use and other taxes or duties,
              however designated. Customer will be solely responsible for payment of all applicable taxes or duties,
              except for those taxes based on the income of Movo. Customer will not withhold any taxes from any amounts
              due to Movo.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">5. LIMITATION OF LIABILITY</h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            <p>
              EXCEPT WITH RESPECT TO EITHER PARTY'S GROSS NEGLIGENCE, WILLFUL MISCONDUCT OR FRAUD, UNDER NO LEGAL
              THEORY, WHETHER IN TORT, CONTRACT, OR OTHERWISE, WILL EITHER PARTY BE LIABLE TO THE OTHER UNDER THIS
              AGREEMENT FOR (A) ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES OF ANY CHARACTER,
              INCLUDING DAMAGES FOR LOSS OF GOODWILL, LOST PROFITS, LOST SALES OR BUSINESS, WORK STOPPAGE, COMPUTER
              FAILURE OR MALFUNCTION, LOST CONTENT OR DATA, EVEN IF A REPRESENTATIVE OF SUCH PARTY HAS BEEN ADVISED,
              KNEW OR SHOULD HAVE KNOWN OF THE POSSIBILITY OF SUCH DAMAGES, OR (B) ANY AGGREGATE DAMAGES, COSTS, OR
              LIABILITIES IN EXCESS OF THE AMOUNTS PAID BY CUSTOMER TO MOVO UNDER THIS AGREEMENT IN THE TWELVE (12)
              MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO SUCH CLAIM.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">10. MISCELLANEOUS</h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-900">
            <p>
              10.1. Entire Agreement. This Agreement, together with all Order Forms, is the complete and exclusive
              understanding and agreement between the parties regarding its subject matter, and supersedes all
              proposals, understandings or communications between the parties, oral or written, regarding its subject
              matter, unless the parties make reference to this Agreement and make a specific reference to the
              provisions of this Agreement they intend to amend.
            </p>
            <p>
              10.2. Publicity; References. Customer agrees that Movo may refer to Customer's name and trademarks on
              Movo's website, subject to Customer's trademark guidelines provided from time to time; however, Movo will
              not use Customer's name or trademarks in any other publicity (e.g., press releases and customer
              references) without Customer's prior written consent (which may be by email).
            </p>
            <p>
              10.3. Force Majeure. Neither Party will be deemed in breach hereunder for any cessation, interruption or
              delay in the performance of its obligations due to causes beyond its reasonable control ("Force Majeure
              Event"), including earthquake, flood, or other natural disaster, act of God, labor controversy, civil
              disturbance, terrorism, war (whether or not officially declared), cyber attacks (e.g., denial of service
              attacks), or the inability to obtain sufficient supplies, transportation, or other essential commodity or
              service required in the conduct of its business, or any change in or the adoption of any law, regulation,
              judgment or decree.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <p className="text-base leading-relaxed text-gray-900">
            For any questions regarding these Terms & Conditions, please contact us at{" "}
            <a href="mailto:legal@movoai.com" className="text-blue-600 hover:text-blue-800 underline">
              info@movoai.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
