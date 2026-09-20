import type { PublicService } from "../services/serviceFinder/types";

export const DEMO_SERVICES: PublicService[] = [
  /* ==================== EDUCATION ==================== */
  {
    id: "service-edu-001",
    name: "Demo Post-Matric Merit Scholarship Scheme",
    shortDescription: "Financial assistance and fee waiver for students pursuing higher education after 10th grade.",
    description: "The Demo Post-Matric Merit Scholarship provides financial support to meritorious students from economically weaker backgrounds to pursue technical, professional, and general degree courses.",
    category: "Education",
    tags: ["scholarship", "education", "college", "school fees", "padhai", "student aid", "merit"],
    audience: ["Students (Class 11 to Post-Graduate)", "Young Scholars"],
    benefits: [
      "Tuition fee reimbursement (up to ₹50,000/year)",
      "Monthly maintenance allowance",
      "Special incentive for STEM courses"
    ],
    eligibilityHints: [
      "Must have secured at least 60% marks in the preceding exam.",
      "Annual family income limit may apply (typically under ₹2.5 Lakhs).",
      "Available for recognized government & private institutions."
    ],
    requiredDocuments: [
      "Marksheet of previous qualifying examination",
      "Income certificate issued by competent authority",
      "Student Aadhaar card",
      "College admission fee receipt & ID proof"
    ],
    applicationSteps: [
      "Review eligibility guidelines on the official portal",
      "Prepare digital copies of required certificates",
      "Submit online registration through the state portal",
      "Submit physical verified copy to institution node officer"
    ],
    location: { state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "online",
    officialSource: { name: "Demo National Scholarship Portal", url: "https://scholarships.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-15",
    isActive: true,
  },
  {
    id: "service-edu-002",
    name: "Demo Girls Higher Education Incentive Scheme",
    shortDescription: "Special grant for female students enrolling in undergraduate and engineering courses.",
    description: "A dedicated initiative to promote female literacy and higher education enrollment by providing direct bank transfer stipends to young women entering college.",
    category: "Education",
    tags: ["scholarship", "girls education", "beti padhao", "female students", "college aid", "padhai"],
    audience: ["Female Students", "Girls Higher Education Aspirants"],
    benefits: [
      "One-time admission allowance of ₹15,000",
      "Free laptop/tablet scheme for top performers",
      "Subsidized hostel accommodation"
    ],
    eligibilityHints: [
      "Open to female candidates resident of the state.",
      "Enrolled in 1st year of regular degree program.",
      "No caste restrictions for general merit category."
    ],
    requiredDocuments: [
      "Domicile certificate of state",
      "12th Grade passing certificate",
      "Bank account details in student's name",
      "College enrollment ID card"
    ],
    applicationSteps: [
      "Visit official state women education cell",
      "Fill online scholarship application",
      "Upload college admission proof",
      "Track verification status online"
    ],
    location: { city: "Meerut", state: "Uttar Pradesh", nationwide: false },
    applicationMethod: "both",
    officialSource: { name: "Demo UP Education Portal", url: "https://scholarship.up.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-01",
    isActive: true,
  },
  {
    id: "service-edu-003",
    name: "Demo Free Coaching for Competitive Exams",
    shortDescription: "Free entrance coaching for NEET, JEE, UPSC, and State PSC for eligible youth.",
    description: "Provides specialized coaching, study material, and test series to aspirants preparing for competitive national and state competitive examinations.",
    category: "Education",
    tags: ["coaching", "upsc", "jee", "neet", "competitive exam", "free classes", "student"],
    audience: ["Competitive Exam Aspirants", "Graduates & 12th Pass Youth"],
    benefits: [
      "100% free physical & online classroom coaching",
      "Free reference books and digital tablet access",
      "Monthly stipend for outstation candidates"
    ],
    eligibilityHints: [
      "Enrolled via state competitive screening test.",
      "Reserved seats for economically weaker sections.",
      "Age limits apply according to target exam rules."
    ],
    requiredDocuments: [
      "Identity proof (Aadhaar/Voter ID)",
      "Educational qualification certificates",
      "Screening exam admit card / score card"
    ],
    applicationSteps: [
      "Register for state entrance exam for coaching",
      "Appear for written screening test",
      "Attend counseling and center allotment"
    ],
    location: { state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "online",
    officialSource: { name: "Demo Abhyudaya Coaching Scheme", url: "https://abhyuday.up.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-20",
    isActive: true,
  },

  /* ==================== HEALTHCARE ==================== */
  {
    id: "service-hlth-001",
    name: "Demo Universal Health Protection Insurance",
    shortDescription: "Free health cover up to ₹5 Lakhs per family per year for secondary & tertiary hospital care.",
    description: "Offers cashless health insurance coverage for thousands of surgical and medical procedures in empanelled public and private hospitals.",
    category: "Healthcare",
    tags: ["health", "hospital", "ayushman", "health insurance", "ilaaj", "medical", "treatment", "aspataal"],
    audience: ["Low-Income Families", "Senior Citizens", "General Citizens"],
    benefits: [
      "Cashless treatment up to ₹5,000,000 per family/year",
      "Pre and post-hospitalization medical coverage",
      "Covers 1,900+ procedures including cardiac & oncology"
    ],
    eligibilityHints: [
      "Family listed under Socio-Economic Caste Census or Priority Household ration card.",
      "All senior citizens aged 70+ eligible regardless of income under revised rules."
    ],
    requiredDocuments: [
      "Aadhaar card of family members",
      "Ration card or official eligibility slip",
      "Mobile number linked to Aadhaar"
    ],
    applicationSteps: [
      "Check eligibility using mobile number or Ration Card ID",
      "Visit nearest Empanelled Hospital Ayushman Mitra desk",
      "Generate e-Card instantly after biometrics"
    ],
    location: { nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo National Health Authority", url: "https://pmjay.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-10",
    isActive: true,
  },
  {
    id: "service-hlth-002",
    name: "Demo Affordable Medicine & Jan Aushadhi Kendras",
    shortDescription: "Generic medicines and surgical items at 50% to 90% discount compared to market brands.",
    description: "A nationwide initiative ensuring access to high-quality generic medicines at affordable prices through specialized Jan Aushadhi pharmacies.",
    category: "Healthcare",
    tags: ["medicines", "pharmacy", "generic drugs", "cheap medicine", "dawai", "medical shop"],
    audience: ["All Citizens", "Chronic Patients"],
    benefits: [
      "Generic drugs tested for international WHO-GMP quality",
      "Substantial reduction in monthly out-of-pocket medical bill",
      "Over 1,800 medicines and 280 surgical consumables available"
    ],
    eligibilityHints: [
      "Open to all citizens without income or card restrictions.",
      "Doctor's prescription recommended for prescription drugs."
    ],
    requiredDocuments: [
      "Valid doctor prescription for prescription medications"
    ],
    applicationSteps: [
      "Locate nearest Jan Aushadhi Kendra using official app",
      "Present prescription to store pharmacist",
      "Purchase generic substitute at discounted rate"
    ],
    location: { city: "Meerut", state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "offline",
    officialSource: { name: "Demo Pharmaceuticals Dept", url: "https://janaushadhi.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-30",
    isActive: true,
  },
  {
    id: "service-hlth-003",
    name: "Demo Teleconsultation & e-Sanjeevani Tele-Medicine",
    shortDescription: "Free online doctor consultation with government specialists from home.",
    description: "National telemedicine service bridging distance barriers, enabling citizens to consult doctors and medical specialists directly via video call.",
    category: "Healthcare",
    tags: ["telemedicine", "online doctor", "e-sanjeevani", "doctor consultation", "ilaaj", "health"],
    audience: ["Rural Residents", "Elderly", "General Public"],
    benefits: [
      "Zero registration or consultation fees",
      "Instant digital e-Prescription generated",
      "Access to specialized doctors (Cardiology, Dermatology, Pediatrics)"
    ],
    eligibilityHints: [
      "Open to all citizens with smartphone/internet or visiting local Health Wellness Center."
    ],
    requiredDocuments: [
      "Mobile number for OTP validation",
      "Previous medical records (optional upload)"
    ],
    applicationSteps: [
      "Download e-Sanjeevani app or open website",
      "Register with mobile number and select doctor specialty",
      "Wait in virtual queue & complete video consultation",
      "Download e-Prescription PDF"
    ],
    location: { nationwide: true },
    applicationMethod: "online",
    officialSource: { name: "Demo Teleconsultation Portal", url: "https://esanjeevani.mohfw.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-05",
    isActive: true,
  },

  /* ==================== EMPLOYMENT ==================== */
  {
    id: "service-emp-001",
    name: "Demo National Skill Development & Job Portal",
    shortDescription: "Free vocational skill training, apprenticeship placement, and job matching for youth.",
    description: "Connects job seekers with certified training providers and employers across IT, healthcare, retail, electronics, automotive, and solar energy sectors.",
    category: "Employment",
    tags: ["job", "employment", "naukri", "rojgar", "skills", "placement", "career", "work"],
    audience: ["Job Seekers", "Students", "Unemployed Youth"],
    benefits: [
      "Government-recognized skill certification",
      "Free 3-month to 6-month hands-on industry training",
      "Direct placement drives with accredited employers",
      "Post-placement monthly allowance for 3 months"
    ],
    eligibilityHints: [
      "Age: 18 to 35 years.",
      "Minimum education: 10th pass or ITI/Diploma."
    ],
    requiredDocuments: [
      "Aadhaar card",
      "Educational certificates (10th/12th/Graduation)",
      "Passport size photograph",
      "Bank account details"
    ],
    applicationSteps: [
      "Create profile on Demo Skill India Digital Portal",
      "Browse available training centers in your district",
      "Select desired skill course & submit application",
      "Attend screening interview at training institute"
    ],
    location: { city: "Meerut", state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "online",
    officialSource: { name: "Demo Skill India Digital", url: "https://skillindiadigital.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-10",
    isActive: true,
  },
  {
    id: "service-emp-002",
    name: "Demo Youth Apprenticeship Training Scheme",
    shortDescription: "Paid on-the-job apprenticeship with monthly government stipend support.",
    description: "Enables youth to work as apprentices in public sector undertakings and registered private firms while earning a regular monthly stipend.",
    category: "Employment",
    tags: ["apprenticeship", "stipend", "internship", "job training", "naukri", "employment"],
    audience: ["Graduates", "Diploma Holders", "ITI Passed Candidates"],
    benefits: [
      "Monthly stipend of ₹8,000 to ₹15,000 shared by govt & employer",
      "1-year practical industry exposure",
      "National Apprenticeship Certificate upon completion"
    ],
    eligibilityHints: [
      "Must have completed ITI, Diploma, or Degree within last 3 years.",
      "Should not have prior work experience exceeding 1 year."
    ],
    requiredDocuments: [
      "Degree/Diploma/ITI provisional certificate",
      "Aadhaar card",
      "Bank passbook copy"
    ],
    applicationSteps: [
      "Register on National Apprenticeship Training Portal (NATS)",
      "Search for vacancies in government/private establishments",
      "Apply directly to posted apprenticeship positions",
      "Accept contract letter digitally"
    ],
    location: { nationwide: true },
    applicationMethod: "online",
    officialSource: { name: "Demo NATS Portal", url: "https://nats.education.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-12",
    isActive: true,
  },
  {
    id: "service-emp-003",
    name: "Demo Self-Employment Micro-Loan Scheme",
    shortDescription: "Collateral-free loans up to ₹10 Lakhs for starting small businesses or shops.",
    description: "Provides financial credit support to micro-entrepreneurs, artisans, shopkeepers, and young innovators without requiring traditional collateral assets.",
    category: "Employment",
    tags: ["loan", "business loan", "self employment", "mudra", "dukan", "startup fund", "rojgar"],
    audience: ["Micro Entrepreneurs", "Artisans", "Small Shopkeepers"],
    benefits: [
      "Collateral-free bank loan facility",
      "Interest subsidy for prompt repayment",
      "Three categories: Shishu (up to ₹50k), Kishore (up to ₹5L), Tarun (up to ₹10L)"
    ],
    eligibilityHints: [
      "Indian citizen with viable business plan.",
      "No default history in existing bank loans."
    ],
    requiredDocuments: [
      "Business proposal / project report",
      "Identity and address proof",
      "Quotation of machinery/goods to purchase",
      "Bank statement of last 6 months"
    ],
    applicationSteps: [
      "Prepare simple 2-page business proposal",
      "Apply via Udyami Mitra portal or visit nearest public bank branch",
      "Complete loan interview with branch manager",
      "Receive sanction letter & disbursement"
    ],
    location: { nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo PMMY Portal", url: "https://mudra.org.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-25",
    isActive: true,
  },

  /* ==================== FINANCIAL ASSISTANCE ==================== */
  {
    id: "service-fin-001",
    name: "Demo Senior Citizen Pension & Financial Aid",
    shortDescription: "Monthly direct pension for elderly citizens aged 60 and above.",
    description: "Social security pension scheme delivering monthly financial aid directly to the bank accounts of senior citizens to support basic living expenses.",
    category: "Financial Assistance",
    tags: ["pension", "senior citizen", "old age pension", "financial aid", "bata", "sahayata", "elderly"],
    audience: ["Senior Citizens (60+ years)"],
    benefits: [
      "Monthly pension of ₹1,000 to ₹3,000 depending on state rules",
      "Direct Bank Transfer (DBT) every quarter",
      "Special higher rate for citizens aged 80+"
    ],
    eligibilityHints: [
      "Age must be 60 years or older.",
      "Applicant should belong to BPL category or have low income.",
      "Must not be receiving pension from other state/central government schemes."
    ],
    requiredDocuments: [
      "Age proof certificate (Birth certificate / Voter ID / Aadhaar)",
      "Income certificate issued by Tehsil officer",
      "Bank account details (linked with Aadhaar)",
      "Passport size photograph"
    ],
    applicationSteps: [
      "Fill online application form on State Social Welfare Portal",
      "Attach scanned copy of age & income certificates",
      "Submit application for verification by Block Development Officer",
      "Sanctioned pension deposited automatically to bank"
    ],
    location: { state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo UP SSPY Portal", url: "https://sspy-up.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-01",
    isActive: true,
  },
  {
    id: "service-fin-002",
    name: "Demo Small Farmers Income Support Scheme",
    shortDescription: "Annual direct income transfer of ₹6,000 for small and marginal landholders.",
    description: "Financial assistance program providing ₹6,000 per year in three equal installments of ₹2,000 directly to farmer bank accounts to assist with agricultural inputs.",
    category: "Financial Assistance",
    tags: ["farmer", "kisan", "pm kisan", "agriculture", "income aid", "kheti", "financial assistance"],
    audience: ["Farmers", "Agricultural Landowners"],
    benefits: [
      "Direct financial support of ₹6,000 per year",
      "Transferred directly into bank accounts via Aadhaar Payment Bridge",
      "Enables purchasing seeds, fertilizers, and equipment"
    ],
    eligibilityHints: [
      "Farmer family holding cultivable landholding in revenue records.",
      "Excludes institutional landholders and high-income tax payers."
    ],
    requiredDocuments: [
      "Land ownership record (Khatauni / Khasra document)",
      "Aadhaar card with e-KYC completed",
      "Bank passbook"
    ],
    applicationSteps: [
      "Self-register via Farmer Corner on PM-KISAN portal or visit CSC center",
      "Enter land holding registration details",
      "Complete facial/biometric e-KYC",
      "Verify status in beneficiary list"
    ],
    location: { nationwide: true },
    applicationMethod: "online",
    officialSource: { name: "Demo PM-KISAN Portal", url: "https://pmkisan.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-18",
    isActive: true,
  },
  {
    id: "service-fin-003",
    name: "Demo Disability Support Allowance",
    shortDescription: "Monthly stipend and free assistive device distribution for persons with disabilities.",
    description: "Comprehensive welfare program extending monthly financial pension and providing free wheelchairs, hearing aids, and prosthetic devices.",
    category: "Financial Assistance",
    tags: ["disability", "divyang", "pension", "wheelchair", "assistive device", "sahayata"],
    audience: ["Persons with Disabilities (PwD)"],
    benefits: [
      "Monthly pension stipend of ₹1,000 to ₹2,500",
      "100% free distribution of motorized tricycles, hearing aids, and braille kits",
      "Concessional travel pass in state transport buses"
    ],
    eligibilityHints: [
      "Must hold UDID disability card with 40% or more disability rating.",
      "Income limit varies by state social welfare norms."
    ],
    requiredDocuments: [
      "Unique Disability ID (UDID) Card / Medical Disability Certificate",
      "Aadhaar card",
      "Income certificate",
      "Bank account details"
    ],
    applicationSteps: [
      "Apply for UDID card online if not already obtained",
      "Submit pension application on State Welfare Portal",
      "Attend medical assessment camp for assistive devices"
    ],
    location: { nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo Swavlamban Card Portal", url: "https://swavlambancard.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-08",
    isActive: true,
  },

  /* ==================== HOUSING ==================== */
  {
    id: "service-hou-001",
    name: "Demo Affordable Urban Housing Grant",
    shortDescription: "Financial subsidy up to ₹2.5 Lakhs for constructing or purchasing a pucca house.",
    description: "Assists urban homeless and low-income families in constructing a permanent home or obtaining interest subsidy on home loans.",
    category: "Housing",
    tags: ["housing", "house", "home loan", "awas yojana", "ghar", "makan", "rent", "shelter"],
    audience: ["Homeless Urban Families", "EWS / LIG Categories"],
    benefits: [
      "Direct financial grant of ₹2.5 Lakhs for beneficiary-led construction",
      "Interest subsidy up to 6.5% on home loans for low income groups",
      "Mandatory eco-friendly and disaster-resistant design"
    ],
    eligibilityHints: [
      "Family must not own a pucca house anywhere in India.",
      "Annual household income under ₹3 Lakhs for EWS category."
    ],
    requiredDocuments: [
      "Land ownership document or municipal plot allotment paper",
      "Aadhaar card of all family members",
      "Income certificate",
      "Affidavit declaring no existing pucca house"
    ],
    applicationSteps: [
      "Apply through Common Service Centre (CSC) or municipal corporation portal",
      "Geo-tagging team inspects candidate plot",
      "Funds released in 3 installments based on construction progress photos"
    ],
    location: { city: "Meerut", state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo PMAY Urban Portal", url: "https://pmaymis.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-22",
    isActive: true,
  },
  {
    id: "service-hou-002",
    name: "Demo Night Shelter & Urban Transit Housing",
    shortDescription: "Free night shelters with clean bedding, security, and drinking water for workers & homeless.",
    description: "Provides emergency shelter, sanitation, security, and medical referral for migrant workers, daily wage laborers, and destitute persons in cities.",
    category: "Housing",
    tags: ["night shelter", "homeless", "rain basera", "temporary shelter", "ghar", "stay"],
    audience: ["Migrant Workers", "Daily Wage Laborers", "Homeless Persons"],
    benefits: [
      "Free overnight accommodation and clean bedding",
      "Clean drinking water and washroom facilities",
      "First-aid medical support and municipal care coordinator"
    ],
    eligibilityHints: [
      "Open to any homeless or transit citizen requiring temporary shelter.",
      "Valid ID required for check-in where available."
    ],
    requiredDocuments: [
      "Any photo ID card (Aadhaar/Voter ID) if available; non-restricted entry for emergency cases"
    ],
    applicationSteps: [
      "Walk in directly to any municipal Rain Basera / Night Shelter",
      "Sign entry register at front desk",
      "Assigned clean bed unit for the night"
    ],
    location: { city: "Meerut", state: "Uttar Pradesh", nationwide: false },
    applicationMethod: "offline",
    officialSource: { name: "Demo Meerut Municipal Corp", url: "https://meerut.nic.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-14",
    isActive: true,
  },

  /* ==================== FOOD & WELFARE ==================== */
  {
    id: "service-fd-001",
    name: "Demo National Food Security Ration Scheme",
    shortDescription: "Free monthly food grains (rice, wheat, coarse grains) for eligible priority households.",
    description: "Ensures food and nutritional security by distributing free grains to low-income households through Fair Price Shops under One Nation One Ration Card.",
    category: "Food & Welfare",
    tags: ["ration", "food", "free food", "wheat", "rice", "ration card", "khana", "welfare"],
    audience: ["Priority Households", "Antyodaya Card Holders"],
    benefits: [
      "5 kg free food grain per person per month (or 35 kg for Antyodaya families)",
      "Inter-state ration portability through One Nation One Ration Card",
      "Subsidized sugar and fortified rice distribution"
    ],
    eligibilityHints: [
      "Household holding valid NFSA Priority or Antyodaya Ration Card.",
      "Biometric verification at Fair Price Shop e-PoS machine."
    ],
    requiredDocuments: [
      "Ration Card number",
      "Aadhaar card for biometric authentication at e-PoS device"
    ],
    applicationSteps: [
      "Visit any nearby Fair Price Shop (Ration Dealer)",
      "Provide Ration Card or Aadhaar number",
      "Authenticate thumb impression on e-PoS device",
      "Collect free monthly grain quota"
    ],
    location: { nationwide: true },
    applicationMethod: "offline",
    officialSource: { name: "Demo NFSA Portal", url: "https://nfsa.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-28",
    isActive: true,
  },
  {
    id: "service-fd-002",
    name: "Demo Community Subsidized Canteen Scheme",
    shortDescription: "Hygienic hot meals provided at ₹5 for urban poor and daily workers.",
    description: "Operates canteens in urban centers offering nutritious cooked breakfast and lunch meals at nominal subsidized rates.",
    category: "Food & Welfare",
    tags: ["canteen", "cheap food", "thali", "5 rupee meal", "khana", "food security"],
    audience: ["Laborers", "Rickshaw Drivers", "Students", "Urban Poor"],
    benefits: [
      "Nutritious balanced meal (Roti, Rice, Dal, Sabzi) for ₹5",
      "Hygienic mechanized kitchen preparation",
      "Open for breakfast and lunch sessions daily"
    ],
    eligibilityHints: [
      "Open to all citizens; no ration card or token required."
    ],
    requiredDocuments: ["None required"],
    applicationSteps: [
      "Visit any community canteen booth during operating hours (11 AM to 3 PM)",
      "Purchase meal token at counter",
      "Receive fresh hot meal thali"
    ],
    location: { city: "Meerut", state: "Uttar Pradesh", nationwide: false },
    applicationMethod: "information_only",
    officialSource: { name: "Demo Municipal Canteen Cell", url: "https://meerut.nic.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-02",
    isActive: true,
  },

  /* ==================== DOCUMENTS & CERTIFICATES ==================== */
  {
    id: "service-doc-001",
    name: "Demo Income Certificate Facilitation Service",
    shortDescription: "Online application and verification process for obtaining an official income certificate.",
    description: "Guides citizens through issuing an official state income certificate required for student scholarships, welfare schemes, and fee concessions.",
    category: "Documents & Certificates",
    tags: ["income certificate", "aay praman patra", "certificate", "documents", "kaise banega", "tehsil"],
    audience: ["Students", "Scholarship Applicants", "Welfare Seekers"],
    benefits: [
      "Digitally signed certificate issued within 7-10 working days",
      "Valid for 3 years across all government schemes",
      "QR code for online instant verification"
    ],
    eligibilityHints: [
      "Resident of the district/state.",
      "Self-declaration of family income source supported by salary slip or Tehsil inquiry."
    ],
    requiredDocuments: [
      "Self-declaration form",
      "Ration Card or Electricity Bill copy",
      "Aadhaar card",
      "Salary slip / IT return / Gram Pradhan letter"
    ],
    applicationSteps: [
      "Login to e-District portal or visit nearest Jan Seva Kendra (CSC)",
      "Fill online income details form & upload self-declaration",
      "Pay nominal service fee (₹15-₹30)",
      "Download digitally signed certificate upon Tehsil approval"
    ],
    location: { state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo UP e-District Portal", url: "https://edistrict.up.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-11",
    isActive: true,
  },
  {
    id: "service-doc-002",
    name: "Demo Birth & Death Certificate Registration Portal",
    shortDescription: "Official registration and certificate issue within 21 days of birth or death.",
    description: "Enables online filing and download of legal birth and death certificates registered at hospitals or municipal registrar offices.",
    category: "Documents & Certificates",
    tags: ["birth certificate", "death certificate", "janam praman patra", "certificate", "documents"],
    audience: ["Parents of Newborns", "Family Members"],
    benefits: [
      "Free registration if filed within 21 days of event",
      "Permanent government digital birth record for school admissions",
      "Instant PDF download via Civil Registration System (CRS)"
    ],
    eligibilityHints: [
      "Event occurred within municipal jurisdiction.",
      "Hospital discharge slip required for institutional births."
    ],
    requiredDocuments: [
      "Hospital birth slip / discharge summary",
      "Parents Aadhaar cards",
      "Marriage registration certificate (optional)"
    ],
    applicationSteps: [
      "Obtain birth slip number from hospital administrator",
      "Visit CRS portal or Municipal Corporation counter",
      "Submit application & download verified digital certificate"
    ],
    location: { nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo Civil Registration System", url: "https://crsorgi.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-14",
    isActive: true,
  },
  {
    id: "service-doc-003",
    name: "Demo Domicile & Caste Certificate Facilitation",
    shortDescription: "Issuance of permanent residence (Niwas) and Category Caste certificates.",
    description: "Facilitates online application and verification for Domicile (Niwas Praman Patra) and SC/ST/OBC/EWS caste certificates required for reservations.",
    category: "Documents & Certificates",
    tags: ["domicile", "caste certificate", "niwas praman patra", "jati praman patra", "documents", "certificate"],
    audience: ["Students", "Job Seekers", "General Citizens"],
    benefits: [
      "Essential document for job reservation and educational quota",
      "Lifetime validity for caste certificates; digital QR verification",
      "Track application status live via SMS"
    ],
    eligibilityHints: [
      "Applicant or parents resident in state for 3+ years for domicile.",
      "Caste proof / parental caste certificate required for category certification."
    ],
    requiredDocuments: [
      "Residence proof (Electricity bill / Voter ID / Land document)",
      "School leaving certificate showing place of birth",
      "Father's caste certificate (for caste category applicants)",
      "Aadhaar card"
    ],
    applicationSteps: [
      "Submit application on e-District portal",
      "Revenue Inspector (Lekhpal) conducts field inquiry",
      "Tehsildar approves and signs digital certificate",
      "Download PDF certificate online"
    ],
    location: { state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo UP e-District", url: "https://edistrict.up.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-04",
    isActive: true,
  },

  /* ==================== WOMEN & CHILD SERVICES ==================== */
  {
    id: "service-wmn-001",
    name: "Demo Maternity Financial Assistance Scheme",
    shortDescription: "Financial grant of ₹6,000 for pregnant women and lactating mothers.",
    description: "Conditional cash transfer program compensating wages lost during pregnancy and encouraging institutional delivery and child vaccination.",
    category: "Women & Child Services",
    tags: ["maternity", "women", "pregnant women", "child care", "financial aid", "mahila", "bacche"],
    audience: ["Pregnant Women", "Lactating Mothers"],
    benefits: [
      "Direct bank transfer of ₹6,000 in 3 installments",
      "Free antenatal checkups and nutritional counseling at Anganwadi",
      "Free immunization for newborn up to 14 weeks"
    ],
    eligibilityHints: [
      "First or second live child of mother.",
      "Must register pregnancy at nearest Anganwadi / Health Center."
    ],
    requiredDocuments: [
      "Mother and Child Protection (MCP) Card",
      "Aadhaar card of mother and husband",
      "Bank account in mother's name linked to Aadhaar"
    ],
    applicationSteps: [
      "Register pregnancy at local Anganwadi center within 150 days",
      "Complete at least one ANC checkup to receive 1st installment",
      "Submit birth registration & child vaccination proof for final payout"
    ],
    location: { nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo PMMVY Portal", url: "https://pmmvy.wcd.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-29",
    isActive: true,
  },
  {
    id: "service-wmn-002",
    name: "Demo Women Entrepreneurship & Self-Help Group Fund",
    shortDescription: "Revolving fund credit & zero-interest micro-loans for women Self-Help Groups (SHGs).",
    description: "Empowers rural and urban women to form Self-Help Groups (SHGs), providing seed capital, skill training, and market linkage for micro-enterprises.",
    category: "Women & Child Services",
    tags: ["women business", "shg", "self help group", "women loan", "mahila rojgar", "microfinance"],
    audience: ["Women Entrepreneurs", "Self-Help Groups"],
    benefits: [
      "Revolving fund grant of ₹15,000 per SHG group",
      "Bank linkage loan up to ₹10 Lakhs with interest subvention",
      "Exhibition & e-commerce portal access to sell handcrafted products"
    ],
    eligibilityHints: [
      "SHG group consisting of 10-20 women.",
      "Group operating active savings account for at least 6 months."
    ],
    requiredDocuments: [
      "SHG resolution book and member roster",
      "Group bank passbook",
      "Aadhaar cards of group office bearers"
    ],
    applicationSteps: [
      "Register group with District Mission Management Unit (NRLM/NULM)",
      "Grade group performance after 6 months of internal lending",
      "Sanction bank credit linkage application"
    ],
    location: { nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo NRLM Portal", url: "https://nrlm.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-02-09",
    isActive: true,
  },

  /* ==================== SENIOR CITIZEN SERVICES ==================== */
  {
    id: "service-snr-001",
    name: "Demo Elderly Care & National Senior Helpline (14567)",
    shortDescription: "24/7 dedicated telephone helpline for senior citizen rescue, legal advice, and care.",
    description: "Toll-free helpline providing information, guidance, emotional support, and emergency intervention for abandoned, neglected, or abused senior citizens.",
    category: "Senior Citizen Services",
    tags: ["senior citizen", "helpline", "elder care", "14567", "old age", "rescue", "badasahab"],
    audience: ["Senior Citizens (60+)", "Caregivers"],
    benefits: [
      "Free toll-free telephone counseling on 14567",
      "Field officer intervention for pension, abuse, or abandoned cases",
      "Information on old age homes and geriatric medical centers"
    ],
    eligibilityHints: [
      "Open to all senior citizens aged 60+ and their family caregivers nationwide."
    ],
    requiredDocuments: ["None required for phone assistance"],
    applicationSteps: [
      "Dial 14567 from any landline or mobile phone",
      "Speak directly with trained elder care counselor",
      "Field officer assigned if physical rescue or legal aid needed"
    ],
    location: { nationwide: true },
    applicationMethod: "information_only",
    officialSource: { name: "Demo Ministry of Social Justice", url: "https://dosje.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-12",
    isActive: true,
  },

  /* ==================== OTHER / PUBLIC SERVICES ==================== */
  {
    id: "service-oth-001",
    name: "Demo District Free Legal Aid Service",
    shortDescription: "Free lawyer representation and legal consultation for citizens unable to afford legal fees.",
    description: "Provides free legal advice, court representation, and mediation services to low-income citizens, women, children, and custody detainees.",
    category: "Other",
    tags: ["legal aid", "lawyer", "court help", "free lawyer", "kanooni madad", "justice"],
    audience: ["Low Income Citizens", "Women", "ST/SC Categories", "Under-trial Prisoners"],
    benefits: [
      "Free appointment of qualified advocate for court litigation",
      "Payment of court fees and drafting expenses borne by Legal Services Authority",
      "Pre-litigation Lok Adalat dispute settlement"
    ],
    eligibilityHints: [
      "Annual income less than ₹3 Lakhs (varies by state).",
      "Women, children, and custody detainees eligible automatically regardless of income."
    ],
    requiredDocuments: [
      "Income proof or self-declaration affidavit",
      "Identity proof",
      "Case details / court notice copy"
    ],
    applicationSteps: [
      "Visit District Legal Services Authority (DLSA) office at District Court",
      "Fill simple 1-page free legal aid application form",
      "Legal Services Committee assigns panel lawyer within 7 days"
    ],
    location: { city: "Meerut", state: "Uttar Pradesh", nationwide: true },
    applicationMethod: "both",
    officialSource: { name: "Demo NALSA Legal Aid Portal", url: "https://nalsa.gov.in" },
    sourceType: "demo",
    lastReviewed: "2026-01-31",
    isActive: true,
  }
];
