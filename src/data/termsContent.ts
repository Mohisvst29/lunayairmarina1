export interface TermsClause {
  heading: string;
  body: string;
}

export interface TermsSectionCopy {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  clauses?: TermsClause[];
}

export interface TermsContent {
  siteName: string;
  lastUpdated: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  sections: TermsSectionCopy[];
}

export const defaultTermsContent: TermsContent = {
  siteName: "Lunier Marina",
  lastUpdated: "2025-11-27",
  contact: {
    email: "legal@luniermarina.com",
    phone: "+971 4 000 0000",
    address: "Building 4, Dubai Harbour, Dubai, UAE",
  },
  sections: [
    {
      id: "introduction",
      title: "Introduction & Acceptance",
      summary:
        "By using Lunier Marina’s digital services, you acknowledge that you have read, understood, and agree to abide by these Terms & Conditions.",
      fullText:
        "These Terms & Conditions constitute a legally binding agreement between the individual or entity accessing the services (“you”) and Lunier Marina (“we”, “us”, or “our”). By accessing or using our website, mobile applications, booking interfaces, concierge chat, or any digitally enabled marina services, you consent to be bound by these Terms as well as any additional guidelines, policies, or rules referenced herein. If you do not agree, you must immediately discontinue use of the services.",
      clauses: [
        {
          heading: "Contract Formation",
          body: "This agreement becomes effective when you first access the services or when you click to agree during onboarding. If you are using the services on behalf of an organization, you represent that you have authority to bind that organization.",
        },
        {
          heading: "Supplemental Policies",
          body: "Certain features—such as concierge chat, dock scheduling, or membership billing—may be subject to additional terms. Those supplemental terms will prevail in the event of conflict.",
        },
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      summary:
        "Clear definitions ensure mutual understanding regarding key terms referenced throughout this policy.",
      fullText:
        "“Services” refers to the publicly accessible website, authenticated client portals, concierge chat assistants, booking systems, and any documentation or content provided digitally by Lunier Marina. “Client” refers to any individual or entity that has entered into a service agreement or membership with Lunier Marina. “User” refers to anyone accessing the Services, whether or not they are a Client. “Content” includes text, graphics, images, audio, video, data, or any materials uploaded or made available through the Services.",
    },
    {
      id: "eligibility",
      title: "Use of Service & Eligibility",
      summary:
        "You must be at least 18 years old and capable of forming a binding contract to access the full-suite functionality.",
      fullText:
        "The Services are intended for individuals who are of legal age in their jurisdiction and who have the capacity to enter into binding contracts. Certain marina operations may require valid vessel registration, proof of insurance, and compliance with harbor regulations. We reserve the right to request documentation at any time and to suspend or terminate access if eligibility criteria are not met.",
    },
    {
      id: "accounts",
      title: "User Accounts & Security",
      summary:
        "Safeguard your credentials and notify us immediately of any unauthorized activity so we can help protect your account.",
      fullText:
        "When creating an account you must provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities undertaken through your account. If you believe your account has been compromised, contact security@luniermarina.com immediately. We may suspend accounts exhibiting suspicious behavior until ownership is verified.",
    },
    {
      id: "payments",
      title: "Payments & Subscriptions",
      summary:
        "Recurring services such as concierge retainers or berth subscriptions renew automatically unless cancelled within the notice window.",
      fullText:
        "Pricing for memberships, berth leases, or concierge retainers will be disclosed prior to purchase. Unless otherwise stated, fees are denominated in AED and exclusive of applicable taxes. Recurring plans renew automatically at the end of each billing cycle and the payment method on file will be charged. You may cancel renewals by providing at least 14 days’ written notice before the next cycle. Refunds are evaluated case-by-case and may be prorated when local regulations require.",
    },
    {
      id: "ownership",
      title: "Content Ownership & License",
      summary:
        "We retain all intellectual property rights to the platform while granting you a limited, revocable license to access the Services.",
      fullText:
        "All trademarks, service marks, logos, proprietary technology, and curated content displayed in the Services are owned or licensed by Lunier Marina. We grant you a non-transferable, non-exclusive, revocable license to access and use the Services in accordance with these Terms. You may not copy, modify, reverse-engineer, or distribute any portion of the Services without our prior written consent.",
    },
    {
      id: "conduct",
      title: "Prohibited Conduct",
      summary:
        "Maintain respectful, lawful use of the Services. Abuse, fraud, or interference with platform stability is strictly prohibited.",
      fullText:
        "You agree not to misuse the Services or assist anyone else in doing so. Prohibited conduct includes, but is not limited to, transmitting malicious code, attempting to gain unauthorized access to accounts or data, scraping content without permission, harassing other users, or violating local maritime regulations. We reserve the right to investigate and pursue legal remedies for any misuse.",
    },
    {
      id: "termination",
      title: "Suspension & Termination",
      summary:
        "We may suspend or terminate access when these Terms are breached, when required by law, or when safety is at risk.",
      fullText:
        "We may suspend or terminate the Services at our discretion if you breach these Terms, expose us to liability, engage in fraudulent or abusive practices, or if technical maintenance necessitates downtime. Upon termination, your license to use the Services ends immediately, but provisions relating to ownership, indemnity, limitation of liability, and dispute resolution will survive.",
    },
    {
      id: "warranties",
      title: "Warranties & Disclaimers",
      summary:
        "The Services are provided on an “as is” basis without warranties of uninterrupted availability.",
      fullText:
        "To the maximum extent permitted by law, we disclaim any implied warranties of merchantability, fitness for a particular purpose, quiet enjoyment, or non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or completely secure, nor do we guarantee that any specific outcome will result from using the Services.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      summary:
        "Our aggregate liability is limited to the greater of AED 5,000 or the fees paid in the twelve months preceding the claim.",
      fullText:
        "In no event will Lunier Marina, its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or relating to your use of the Services. The total cumulative liability shall not exceed the greater of AED 5,000 or the fees you paid during the twelve months preceding the event giving rise to the claim.",
    },
    {
      id: "governing-law",
      title: "Governing Law & Dispute Resolution",
      summary:
        "These Terms are governed by the laws of the United Arab Emirates. Disputes shall be submitted to the exclusive jurisdiction of Dubai courts.",
      fullText:
        "This agreement and any dispute or claim arising out of or in connection with it shall be governed by and construed in accordance with the laws of the United Arab Emirates. The parties submit to the exclusive jurisdiction of the courts of Dubai. We may seek injunctive relief in any jurisdiction to prevent irreparable harm.",
    },
    {
      id: "changes",
      title: "Changes to Terms",
      summary:
        "We will post updates to these Terms with a new effective date and will notify Clients of material revisions.",
      fullText:
        "We may modify these Terms at any time to reflect operational, legal, or regulatory updates. When changes are material, we will provide at least 14 days’ notice via email or in-product notification. Continued use of the Services after the effective date constitutes acceptance of the revised Terms.",
    },
    {
      id: "contact",
      title: "Contact & Support",
      summary:
        "Reach the legal or privacy team via email or phone. We aim to acknowledge submissions within two business days.",
      fullText:
        "For questions regarding these Terms, to report suspected violations, or to request copies of signed agreements, contact legal@luniermarina.com or call +971 4 000 0000. Physical correspondence may be sent to Lunier Marina, Building 4, Dubai Harbour, Dubai, UAE.",
    },
  ],
};







































