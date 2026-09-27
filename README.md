# SarkariAI Hub 🇮🇳
### Bharat's #1 All-in-One AI Exam & Board Utility Portal

A complete, production-ready web portal designed for millions of Indian students applying for government jobs (SSC, Railways, UPSC, State Police, Banking, Defence) and school boards (CBSE, ICSE, UP Board, Bihar Board, etc.).

---

## 🌟 Key Features

1. **Universal Photo & Signature Resizer Lab**
   - 50+ pre-sets (SSC CGL/CHSL/GD, Railway ALP, UP Police, Bihar Police, NEET UG, JEE Main, CBSE 10th/12th, etc.).
   - Exact KB limits (e.g., 20KB - 50KB) and pixel dimensions.
   - **Candidate Name & Date of Photo (DOOP) Stamper** directly on canvas (mandatory in SSC, UPSC, and State Police forms).
   - Iterative binary search JPEG compression runs 100% in browser (0 server load, complete privacy).

2. **AI Sarkari Notification Decoder (Google AI Studio / Gemini 1.5 Flash)**
   - Paste 60-80 page recruitment circulars or board notices.
   - Instantly extracts:
     - 📅 Critical Dates (Apply, Last Date, Exam Schedule)
     - 👥 Total Vacancies & Category Split (Gen, OBC, SC, ST, EWS)
     - 🎓 Educational Eligibility & Physical Standards (Height, Chest, Running)
     - 📝 Exam Pattern & Negative Marking
     - ⚠️ Crucial Form Rejection Pitfalls to avoid
   - Multilingual output in 14 Indian languages.

3. **Sarkari Age & Eligibility Calculator**
   - Precise age math (Years, Months, Days) computed on the notification's specific cutoff date (e.g., 01/08/2026).
   - Automatic category relaxation:
     - OBC-NCL: +3 Years
     - SC / ST: +5 Years
     - PwD: +10 to +15 Years
     - Ex-Servicemen (ESM)
   - Dynamic Green/Red status badge comparing against target exam age limits.

4. **All-India Boards & Exams Directory**
   - 60+ exams cataloged with official portals, direct result servers, and one-click photo resize presets.
   - Filter pills: [All] [10th/12th Boards] [Central & Defence] [Police Bharti] [NEET/JEE/CUET] [Teaching/TET].

5. **₹10 Micro-UPI Notes & Formula Vault**
   - Instant micropayments (₹9 / ₹19) via dynamic NPCI UPI QR code (`upi://pay?pa=...`).
   - Deep links for Google Pay, PhonePe, and Paytm.
   - Instant client-side multi-page PDF generation using `jsPDF`.

6. **14 Major Indian Languages Supported (i18n)**
   - English, हिन्दी (Hindi), Hinglish, தமிழ் (Tamil), తెలుగు (Telugu), ಕನ್ನಡ (Kannada), മലയാളം (Malayalam), বাংলা (Bengali), मराठी (Marathi), ગુજરાતી (Gujarati), ਪੰਜਾਬੀ (Punjabi), اردو (Urdu - with RTL layout), संस्कृतम् (Sanskrit), ଓଡ଼ିଆ (Odia).

7. **Responsive & AdSense Ready**
   - Mobile-first, tablet, laptop, and desktop views tested.
   - High-CTR AdSense placeholders in top, mid-page, and bottom positions.

---

## 🚀 How to Run Locally

1. Open PowerShell / Terminal in project directory:
   ```powershell
   cd C:\Users\guddu\.gemini\antigravity\scratch\sarkari-ai-portal
   ```

2. Start the server:
   ```powershell
   npm start
   ```

3. Open in your browser:
   ```
   http://localhost:3000
   ```

---

## ⚙️ Configuration (.env)

Open `.env` in the project root:

```env
PORT=3000

# Optional: Add your Google AI Studio Gemini API Key (starts with AIzaSy...)
# Get a free key at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=

# Your UPI ID to receive payments (PhonePe / Google Pay / Paytm UPI ID)
UPI_ID=yourname@upi
```

*Note: If `GEMINI_API_KEY` is left blank, the portal automatically uses the built-in Smart Heuristic Parser so it never crashes and functions 100% offline!*
