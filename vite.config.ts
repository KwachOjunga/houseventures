import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Google Gen AI initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Google Gen AI:", err);
  }
} else {
  console.log("No GEMINI_API_KEY environment variable found. Activating fallback heuristic generation engine.");
}

// REST APIs

// 1. Suggest dynamic, elite, metrics-focused bullet points
app.post("/api/resume/suggest-bullets", async (req, res) => {
  const { role, level } = req.body;
  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  // If AI exists, generate with Gemini
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Provide exactly 5 elite, metrics-driven professional resume bullet points for a '${role}' at a '${level || "Professional"}' career tier. 
Follow these strict resume style principles:
- Start each bullet point with a powerful action verb (e.g., spearheaded, engineered, optimized, pioneered).
- Focus on quantifiable business accomplishments, including placeholders for metrics like [X]%, $[Y]M, [Z] hours saved.
- Do not speak in first person (no "I", "we", "my").
- Tailor specifically to standard practices within the ${role} domain.
Response format must be a plain JSON array of strings: ["bullet 1", "bullet 2", ...]`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
      });

      const bullets = JSON.parse(response.text || "[]");
      if (Array.isArray(bullets) && bullets.length > 0) {
        return res.json({ bullets });
      }
    } catch (err) {
      console.error("Gemini suggestion failed, driving fallback execution:", err);
    }
  }

  // Fallback Heuristics
  const mockBulletsMap: Record<string, string[]> = {
    software: [
      "Engineered a high-performance, real-time event streaming pipeline that cut data ingestion latency by [X]% and saved $[Y]K annually in compute costs.",
      "Spearheaded the modular refactoring of a legacy monolithic platform into microservices, resulting in a [X]% increase in build-and-deploy velocity.",
      "Optimized database indices and query structures across Postgres collections, dropping average API query retrieval time from [X]ms to [Y]ms.",
      "Pioneered automated infrastructure-as-code scripts using Terraform, shortening cloud environment setup times by [X] hours per sprint.",
      "Led a cross-functional squad of [X] engineers to design and deliver high-availability customer-facing features, generating $[Y]M in net new ARR."
    ],
    product: [
      "Spearheaded the end-to-end product strategy and execution of a flagship mobile workflow utility, driving [X]% MoM user acquisition growth.",
      "Conducted precise funnel telemetry and cohort analysis, uncovering and resolving checkout bottlenecks to elevate checkout conversion by [X]%.",
      "Prioritized a complex roadmap of [X]+ features in collaboration with executive leadership, resulting in delivery [Y] weeks ahead of estimated target client milestones.",
      "Championed customer discovery workshops with [X]+ enterprise customers to formulate tailored solutions that prevented contract churn by $[Y]M.",
      "Coordinated with marketing, design, and engineering partners to launch an MVP dashboard that reached [X] active users in its first [Y] days."
    ],
    sales: [
      "Secured and retained key accounts that grew territory quarterly sales revenue by [X]% and landed $[Y]M in custom license expansions.",
      "Spearheaded a revised consultative sales pipeline that shrank the typical B2B conversion cycle from [X] days down to standard [Y] days.",
      "Delivered high-impact executive demos to C-level stakeholders, yielding a consistent [X]% win rate against competing tier-1 bids.",
      "Pioneered a training program for [X] junior account executives, accelerating overall regional quota achievement speed by [Y]%.",
      "Negotiated multi-year commercial enterprise renewals, boosting contract lifecycle profitability valuation metrics by [X]%."
    ],
    marketing: [
      "Designed and launched multi-channel programmatic advertising sweeps that maximized campaign ROI by [X]% and generated [Y]K qualified MQLs.",
      "Pioneered a unified organic search engine optimization strategy that escalated high-intent website organic traffic index by [X]% in [Y] months.",
      "Orchestrated brand sponsorship portfolios worth $[X]M, securing premium media brand placements and boosting social engagement reach metrics by [Y]%.",
      "Directed A/B multivariate email automation experiments, increasing open click-through responses by [X]% and reducing unsubscribe ratios.",
      "Synthesized competitor intelligence frameworks to reposition high-tier SaaS subscription plans, unlocking $[X]K in marginal revenue."
    ],
    management: [
      "Spearheaded administrative restructuring for [X] operating units, shaving overhead expense costs by [Y]% index points.",
      "Directed high-stakes digital transition initiatives supporting [X] team members, ensuring delivery within $[Y] budget limitations.",
      "Pioneered team development frameworks that reduced executive team employee turn rates by [X]% YoY.",
      "Refined internal communication flows, converting redundant syncs into automated telemetry reports to reclaim [X] hours weekly.",
      "Steered annual operational investment blueprints totaling $[X]M, consistently finishing under initial estimated projections."
    ]
  };

  const cleanRole = role.toLowerCase();
  let selectedBullets = mockBulletsMap.software;
  if (cleanRole.includes("product")) selectedBullets = mockBulletsMap.product;
  else if (cleanRole.includes("sale") || cleanRole.includes("bizdev") || cleanRole.includes("account")) selectedBullets = mockBulletsMap.sales;
  else if (cleanRole.includes("market") || cleanRole.includes("seo") || cleanRole.includes("growth")) selectedBullets = mockBulletsMap.marketing;
  else if (cleanRole.includes("manager") || cleanRole.includes("director") || cleanRole.includes("lead") || cleanRole.includes("exec")) selectedBullets = mockBulletsMap.management;

  // Personalize fallback search keys
  const customized = selectedBullets.map(b => b.replace(/Software/g, role).replace(/software/g, role.toLowerCase()));
  return res.json({ bullets: customized });
});

// 2. Polish existing resume sections/summaries
app.post("/api/resume/polish-text", async (req, res) => {
  const { text, type, role } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text to polish is required" });
  }

  if (ai) {
    try {
      const prompt = `You are a world-class resume editor. 
Please rewrite the following professional output text with an elite executive tone. 
Type: '${type || "summary"}'. Target Industry Role: '${role || "General Professional"}'.

Rules:
- Make it highly powerful, refined, and metric-oriented.
- Use outstanding professional vocabulary and active voice verbs.
- Remove passive language, padding, clichés, and first-person pronouns ("I", "my", "we").
- Integrate metric placeholders like '[X]%' or '$[Y]M' to encourage achievements if numerical metrics aren't present.
- Keep the length proportional and concise.

Original Text:
"${text}"

Provide ONLY the polished text as your raw response. Do not include markdown wraps or explanations.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const polished = response.text?.trim();
      if (polished) {
        return res.json({ polished });
      }
    } catch (err) {
      console.error("Gemini polish failed, using heuristic modifier:", err);
    }
  }

  // Fallback Polishing Engine
  let fallbackPolished = text;
  if (text.length < 50) {
    fallbackPolished = `Spearheaded standard operations in the ${role || "industry"} domain, delivering exceptional strategic program milestones that boosted functional throughput by [X]% while cutting associated manual operational delays.`;
  } else {
    // Basic rules replacements
    fallbackPolished = text
      .replace(/\b(I managed|I led|I did|I ran)\b/ig, "Spearheaded")
      .replace(/\b(worked on|helped with)\b/ig, "engineered and orchestrated")
      .replace(/\b(good)\b/ig, "exemplary")
      .replace(/\b(responsible for)\b/ig, "Held core accountability for driving")
      .replace(/\. /g, ". Successfully accomplished [X]% margin enhancement. ");
    
    if (!fallbackPolished.includes("[X]")) {
      fallbackPolished += " Successfully drove structural process optimizations that yielded a [X]% uptick in performance benchmarks.";
    }
  }

  return res.json({ polished: fallbackPolished });
});

// 3. ATS Evaluation Engine
app.post("/api/ats/analyze", async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: "Resume text content is required" });
  }

  if (ai) {
    try {
      const prompt = `You are an advanced Applicant Tracking System (ATS) matching algorithm and talent acquisition auditor.
Analyze the following resume text against the target job description (if provided). If no job description is provided, grade the resume generally based on elite corporate standards.

Resume Text:
${resumeText}

Target Job Description:
${jobDescription || "Not provided (Grade based on general outstanding resume heuristics)"}

You must return a complete analysis in JSON format.
The JSON must follow this precise typescript schema:
{
  "score": number (0 to 100),
  "grammarRating": string (e.g., "Exceptional", "Averaging Small Typos", "Action Required"),
  "keywordsRating": string (e.g., "Aligned", "Partially Aligned", "Substandard"),
  "actionVerbsRating": string (e.g., "Strong", "Moderate", "Weak"),
  "metricsScore": number (0 to 100 representing percentage of bullet points with quantitative metrics),
  "foundKeywords": string[],
  "missingKeywords": string[],
  "suggestions": string[],
  "improvedSummary": string (A highly optimized, ATS-compliant rewrited professional summary of the user's details if missing or weak)
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              grammarRating: { type: Type.STRING },
              keywordsRating: { type: Type.STRING },
              actionVerbsRating: { type: Type.STRING },
              metricsScore: { type: Type.INTEGER },
              foundKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              improvedSummary: { type: Type.STRING },
            },
            required: ["score", "grammarRating", "keywordsRating", "actionVerbsRating", "metricsScore", "foundKeywords", "missingKeywords", "suggestions", "improvedSummary"],
          },
        },
      });

      const result = JSON.parse(response.text || "{}");
      return res.json(result);
    } catch (err) {
      console.error("Gemini ATS scan error, defaulting to heuristic scan:", err);
    }
  }

  // Fallback ATS analysis algorithm
  // Extract keywords based on common software / bizdev terms
  const parsedKeywords: string[] = jobDescription
    ? (jobDescription.toLowerCase().match(/\b(react|typescript|node|python|agile|api|cloud|aws|kubernetes|sql|ci\/cd|pipeline|product|sales|leads|revenue|conversion|telemetry|analytics)\b/g) || ["management", "optimization", "metrics"])
    : ["leadership", "innovation", "strategy", "metrics", "scalability"];

  const uniqueTargetKeywords = Array.from(new Set(parsedKeywords)).slice(0, 10);
  const matched: string[] = [];
  const missing: string[] = [];

  const resumeLower = resumeText.toLowerCase();
  uniqueTargetKeywords.forEach((kw: string) => {
    if (resumeLower.includes(kw)) {
      matched.push(kw.toUpperCase());
    } else {
      missing.push(kw.toUpperCase());
    }
  });

  const rawScore = 55 + (matched.length / Math.max(1, uniqueTargetKeywords.length)) * 35;
  const score = Math.min(98, Math.round(rawScore));
  const suggestions = [
    "Inject more numerical metrics of accomplishment (e.g., dollars, percentages, time frames) in your bullet points.",
    `Include important key competencies like ${missing.slice(0, 3).join(", ") || "quantitative benchmarks"} directly under your skills chart.`,
    "Ensure all work history highlights begin with strong action-packed verbs rather than passive phrases.",
    "Tailor your Professional Summary specifically to match target requirements in the job description."
  ];

  return res.json({
    score,
    grammarRating: "Exceptional",
    keywordsRating: matched.length > 5 ? "Aligned" : "Partially Aligned",
    actionVerbsRating: resumeLower.includes("spearheaded") || resumeLower.includes("engineered") ? "Strong" : "Moderate",
    metricsScore: resumeLower.includes("[x]") || resumeLower.match(/\b\d+%\b/) ? 65 : 20,
    foundKeywords: matched,
    missingKeywords: missing.length > 0 ? missing : ["DATA TELEMETRY", "COMPLIANCE"],
    suggestions,
    improvedSummary: "Elite operational expert backed by dynamic accomplishments driving critical digital transformations. Pioneered robust metric-oriented architectural optimizations enhancing total processing speeds by 42% while controlling structural overheads."
  });
});

// 4. Cover Letter Generator
app.post("/api/coverletter/generate", async (req, res) => {
  const { personalInfo, summary, jobDescription, tone } = req.body;

  if (ai) {
    try {
      const prompt = `You are a career growth architect and professional copywriter.
Generate a premium, top-tier cover letter utilizing the following candidate specifications:

Candidate Info:
- Name: ${personalInfo?.fullName || "Candidate"}
- Title: ${personalInfo?.targetTitle || "Expert Professional"}
- Email: ${personalInfo?.email || "candidate@email.com"}
- Phone: ${personalInfo?.phone || "Phone Not Provided"}
- Location: ${personalInfo?.location || "Location Not Provided"}

Candidate Background:
"${summary || "A dedicated professional with extensive business track records."}"

Target Job Opportunity / Job Description:
"${jobDescription || "An elite role matching the candidate's career level and executive trajectory."}"

Tone/Aesthetic Style:
"${tone || "professional"}" (Could be: professional/authoritative, bold/high-impact, minimal/precise)

The letter must contain:
- Recipient block (Recipient, Target Enterprise, address placeholders)
- Current Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
- Specific subject line indicating application
- Compelling opening hooking the recruiter
- Powerful mid-story linking candidate background to target opportunity
- Distinct request for interview with a professional closing

Response format must be a clean JSON object following this schema:
{
  "recipientName": "Hiring Executive or Hiring Coordinator",
  "recipientCompany": "Target Corporation",
  "recipientAddress": "Corporate Headquarters Address",
  "date": "May 2026",
  "subject": "APPLICATION FOR THE POSITION...",
  "letterContent": "Full letter text with paragraphs separating sections."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recipientName: { type: Type.STRING },
              recipientCompany: { type: Type.STRING },
              recipientAddress: { type: Type.STRING },
              date: { type: Type.STRING },
              subject: { type: Type.STRING },
              letterContent: { type: Type.STRING },
            },
            required: ["recipientName", "recipientCompany", "recipientAddress", "date", "subject", "letterContent"],
          },
        },
      });

      const result = JSON.parse(response.text || "{}");
      return res.json(result);
    } catch (err) {
      console.error("Gemini Cover Letter failed, utilizing robust heuristic writing:", err);
    }
  }

  // Fallback Cover Letter generator
  const targetCompany = jobDescription ? (jobDescription.match(/\b(Google|Apple|Stripe|Microsoft|Amazon|Netflix|Meta|Enterprise)\b/i)?.[0] || "Your Esteemed Organization") : "Your Organization";
  const dateFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return res.json({
    recipientName: "Hiring Executive & Talent Director",
    recipientCompany: targetCompany,
    recipientAddress: "Corporate Recruitment Department HQ",
    date: dateFormatted,
    subject: `Application for ${personalInfo?.targetTitle || "Designated Strategic Role"} - House Venture Candidate Portfolio`,
    letterContent: `Dear Hiring Committee,

I am writing to express my enthusiastic interest in joining ${targetCompany} as your next ${personalInfo?.targetTitle || "designated specialist"}. With highly validated milestones in directing digital transformations and optimization, I am confident that my strategic perspective aligns immediately with your team's expansion targets.

In my prior undertakings, I engineered critical execution frameworks that resolved multi-layered inefficiencies and generated quantifiable improvements, including elevating productivity indexes and controlling operational overhead fees. As someone who thrives at the intersection of standard rigor and agile innovation, I look forward to contributing similar elite standards to your premium business pipelines.

Thank you for your valuable time and consideration. I welcome the opportunity to connect with your leadership squad to discuss how my qualifications will support your critical business blueprints.

Sincerely,

${personalInfo?.fullName || "Candidate"}`
  });
});

// Setup Vite Dev server or static asset serving
async function bootstrapServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static distribution path mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`House Venture Resumes server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrapServer();
