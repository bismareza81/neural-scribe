// @ts-nocheck

/** @type {Record<string, {label: {id: string, en: string}, icon: string, text: string}>} */
export const SAMPLES = {
  discharge: {
    label: { en: 'Discharge Summary', id: 'Ringkasan Pemulangan' },
    icon: '🏥',
    text: `DISCHARGE SUMMARY
Patient: John Smith | DOB: 1958-03-12 | MRN: 4820193
Admission: 2026-03-18 | Discharge: 2026-03-22

PRIMARY DIAGNOSIS: Acute decompensated heart failure with preserved ejection fraction (HFpEF), NYHA Class III.

SECONDARY DIAGNOSES: Type 2 diabetes mellitus, poorly controlled (HbA1c 9.2%); hypertension; stage 3 chronic kidney disease (eGFR 42 mL/min/1.73m²).

HOSPITAL COURSE: Mr. Smith presented with progressive dyspnea on exertion, orthopnea, bilateral lower extremity pitting edema (3+), and weight gain of 6kg over 2 weeks. BNP on admission was 1,840 pg/mL. Echo revealed EF of 58%, Grade II diastolic dysfunction, mild-moderate mitral regurgitation. IV furosemide diuresis achieved net negative fluid balance of 4.2L. Transitioned to oral furosemide 80mg BID. Endocrinology consulted for hyperglycemia management.

MEDICATIONS AT DISCHARGE:
- Furosemide 80mg PO BID
- Carvedilol 12.5mg PO BID
- Lisinopril 10mg PO daily (held due to CKD; restart when Cr < 1.8)
- Metformin 500mg PO BID
- Insulin glargine 18 units SQ QHS
- Spironolactone 25mg PO daily

FOLLOW-UP: Cardiology in 1 week. PCP in 3 days. Daily weights; return to ED if weight increases >2kg in 24 hrs.`
  },
  lab: {
    label: { en: 'Lab Results', id: 'Hasil Laboratorium' },
    icon: '🧪',
    text: `LABORATORY REPORT
Patient: Maria Santos | Accession: LAB-2026-093842
Collection: 2026-03-28 09:14

COMPLETE METABOLIC PANEL:
Sodium: 138 mEq/L [136-145] — NORMAL
Potassium: 3.2 mEq/L [3.5-5.0] — LOW (*)
Chloride: 101 mEq/L [98-107] — NORMAL
CO2: 29 mEq/L [22-29] — NORMAL
BUN: 24 mg/dL [7-20] — HIGH (*)
Creatinine: 1.1 mg/dL [0.6-1.1] — NORMAL
eGFR: 68 mL/min/1.73m² [>60] — NORMAL
Glucose: 178 mg/dL [70-99] — HIGH (*)
AST: 52 U/L [10-40] — HIGH (*)
ALT: 68 U/L [7-40] — HIGH (*)

LIPID PANEL:
Total Cholesterol: 241 mg/dL [<200] — HIGH
LDL: 158 mg/dL [<100] — HIGH
HDL: 38 mg/dL [>50] — LOW
Triglycerides: 312 mg/dL [<150] — HIGH

HbA1c: 8.4% [<5.7%] — HIGH (poorly controlled)
TSH: 1.8 mIU/L [0.4-4.0] — NORMAL`
  },
  cardio: {
    label: { en: 'Cardiology Note', id: 'Catatan Kardiologi' },
    icon: '❤️',
    text: `CARDIOLOGY CONSULTATION NOTE
Date: 2026-03-30 | Attending: Dr. Priya Rajan, MD, FACC

REASON FOR CONSULTATION: Evaluation of exertional chest pain and palpitations.

HISTORY: 55-year-old male with HTN, hyperlipidemia, and 30 pack-year smoking history presenting with 3-month history of substernal chest pressure radiating to left arm, reproducible with moderate exertion (climbing 1 flight of stairs), relieved with rest within 5 minutes. Associated with occasional palpitations and mild dyspnea. No syncope, no orthopnea.

EKG: Normal sinus rhythm, rate 74 bpm. Left ventricular hypertrophy pattern (Sokolow-Lyon criteria met). Nonspecific ST changes V4-V6. No acute ischemic changes.

ECHO (today): EF 55%, mild concentric LVH, no wall motion abnormalities. Grade I diastolic dysfunction. Mild aortic valve sclerosis without stenosis.

ASSESSMENT: Stable angina pectoris, likely secondary to obstructive coronary artery disease given risk factor burden. Cannot rule out microvascular disease.

PLAN: Nuclear stress test (adenosine perfusion) scheduled 2026-04-08. Initiate aspirin 81mg daily. Add amlodipine 5mg daily for symptomatic relief. Continue statin therapy. Smoking cessation counseling provided. If stress test positive, proceed to coronary angiography.`
  },
  radiology: {
    label: { en: 'Radiology Report', id: 'Laporan Radiologi' },
    icon: '🫁',
    text: `RADIOLOGY REPORT — CT CHEST WITH CONTRAST
Patient: Linda Park | Exam Date: 2026-03-29
Radiologist: Dr. Ahmed Khalil, MD

INDICATION: 62F with productive cough x3 weeks, night sweats, 8lb unintentional weight loss, prior PPD positive.

TECHNIQUE: Axial CT of the chest was performed with IV iodinated contrast. Coronal and sagittal reformations were obtained.

FINDINGS:
LUNGS: 2.4 cm cavitary lesion with thick irregular walls in the right upper lobe posterior segment. Surrounding ground-glass opacity and satellite nodules consistent with endobronchial spread. Small right upper lobe pleural effusion. Tree-in-bud opacities bilaterally in the upper lobes. Left upper lobe 8mm nodule — mildly FDG avid on prior PET.
MEDIASTINUM: Enlarged right paratracheal (station 4R) lymph nodes, largest 1.8cm short axis.
PLEURA: Trace right pleural effusion.
BONES: No lytic or blastic lesions.

IMPRESSION:
1. Right upper lobe cavitary mass with surrounding inflammatory/infectious changes highly suspicious for pulmonary tuberculosis. Infectious disease and pulmonology consultation recommended. Isolation precautions advised.
2. Bilateral lymphadenopathy — reactive vs. secondary involvement.
3. Left upper lobe 8mm nodule — recommend dedicated follow-up CT in 3 months.`
  }
};

/** UI string translations */
export const UI = {
  en: {
    tagline:        'Medical Record Simplifier',
    badge:          'NLP · AI-Powered',
    eyebrow:        'Plain language. Clear understanding.',
    heroLine1:      'Your medical records,',
    heroLine2:      'explained simply.',
    heroDesc:       "Paste any clinical note, discharge summary, or lab result. Neural Scribe's NLP engine rewrites it into language you can actually understand.",
    panelLabel:     'Medical Record',
    chars:          'chars',
    loadSample:     'Load sample:',
    placeholder:    'Paste your medical record here — discharge summary, lab results, radiology report, or clinical notes…',
    readLevelLabel: 'Reading level',
    readLevels:     { simple: 'Simple (Grade 6)', standard: 'Standard (Grade 9)', detailed: 'Detailed (educated)' },
    focusLabel:     'Focus on',
    focusAreas:     { all: 'Full summary', diagnosis: 'Diagnosis only', medications: 'Medications', followup: 'Follow-up plan' },
    analyzeBtn:     'Simplify this record',
    analyzing:      'Analyzing record…',
    emptyTitle:     'Your report will appear here',
    emptySub:       'Paste a medical record on the left and click Simplify',
    loadingText:    'Reading your record…',
    loadingSteps:   ['Parsing clinical language', 'Identifying key findings', 'Translating for patients'],
    metReadability: 'Readability',
    metShorter:     'Shorter',
    metReadTime:    'Read time',
    metMin:         'min',
    copyBtn:        'Copy report',
    copied:         'Copied!',
    newRecord:      'New record',
    disclaimer:     'Neural Scribe is an AI tool for informational purposes only. Always consult your healthcare provider with questions about your medical care.',
    footerLeft:     'Neural Scribe · For informational use only',
    footerRight:    'Not a substitute for professional medical advice',
    mobileInput:    'Record',
    mobileResult:   'Report',
    urgency: {
      routine: 'Routine',
      monitor: 'Monitor closely',
      urgent:  'Needs attention'
    }
  },
  id: {
    tagline:        'Penyederhana Rekam Medis',
    badge:          'NLP · Bertenaga AI',
    eyebrow:        'Bahasa sederhana. Pemahaman yang jelas.',
    heroLine1:      'Rekam medis Anda,',
    heroLine2:      'dijelaskan dengan mudah.',
    heroDesc:       'Tempel catatan klinis, ringkasan pemulangan, atau hasil lab. Mesin NLP Neural Scribe akan menulisnya ulang dalam bahasa yang benar-benar Anda pahami.',
    panelLabel:     'Rekam Medis',
    chars:          'karakter',
    loadSample:     'Muat contoh:',
    placeholder:    'Tempel rekam medis Anda di sini — ringkasan pemulangan, hasil lab, laporan radiologi, atau catatan klinis…',
    readLevelLabel: 'Tingkat bacaan',
    readLevels:     { simple: 'Sederhana (Kelas 6)', standard: 'Standar (Kelas 9)', detailed: 'Mendetail (terdidik)' },
    focusLabel:     'Fokus pada',
    focusAreas:     { all: 'Ringkasan lengkap', diagnosis: 'Diagnosis saja', medications: 'Obat-obatan', followup: 'Rencana tindak lanjut' },
    analyzeBtn:     'Sederhanakan rekam medis ini',
    analyzing:      'Menganalisis rekam medis…',
    emptyTitle:     'Laporan Anda akan muncul di sini',
    emptySub:       'Tempel rekam medis di sebelah kiri dan klik Sederhanakan',
    loadingText:    'Membaca rekam medis Anda…',
    loadingSteps:   ['Mengurai bahasa klinis', 'Mengidentifikasi temuan utama', 'Menerjemahkan untuk pasien'],
    metReadability: 'Keterbacaan',
    metShorter:     'Lebih singkat',
    metReadTime:    'Waktu baca',
    metMin:         'mnt',
    copyBtn:        'Salin laporan',
    copied:         'Tersalin!',
    newRecord:      'Rekam medis baru',
    disclaimer:     'Neural Scribe adalah alat AI hanya untuk tujuan informasi. Selalu konsultasikan dengan tenaga kesehatan Anda untuk pertanyaan tentang perawatan medis Anda.',
    footerLeft:     'Neural Scribe · Hanya untuk tujuan informasi',
    footerRight:    'Bukan pengganti saran medis profesional',
    mobileInput:    'Rekam Medis',
    mobileResult:   'Laporan',
    urgency: {
      routine: 'Rutin',
      monitor: 'Perlu dipantau',
      urgent:  'Perlu perhatian'
    }
  }
};

/**
 * @param {string} input
 * @param {string} readLevel
 * @param {string} focusArea
 * @param {'en'|'id'} lang
 */
// @ts-nocheck

// ... (Biarkan SAMPLES dan UI tetap seperti aslinya)

export async function analyzeRecord(input, lang, readLevel, focusArea) {
  if (!lang || !['en', 'id'].includes(lang)) lang = 'en';
  if (!readLevel || !['simple', 'standard', 'detailed'].includes(readLevel)) readLevel = 'standard';
  if (!focusArea || !['all', 'diagnosis', 'medications', 'followup'].includes(focusArea)) focusArea = 'all';
  const levelDesc = {
    en: {
      simple:   'Grade 6 reading level',
      standard: 'Grade 9 reading level',
      detailed: 'College reading level'
    },
    id: {
      simple:   'Tingkat pembacaan Kelas 6',
      standard: 'Tingkat pembacaan Kelas 9',
      detailed: 'Tingkat pembacaan perguruan tinggi'
    }
  };

  const focusDesc = {
    en: {
      all:         'Cover all key aspects: main diagnosis, key findings, medications with purpose, and follow-up plan.',
      diagnosis:   'Focus only on explaining the diagnosis, what it means, and how it affects daily life.',
      medications: 'Focus exclusively on each medication: what it does, why it was prescribed, and important warnings.',
      followup:    'Focus only on follow-up actions: upcoming appointments, warning signs, lifestyle changes needed.'
    },
    id: {
      all:         'Bahas semua aspek utama: diagnosis utama, temuan kunci, obat-obatan beserta tujuannya, dan rencana tindak lanjut.',
      diagnosis:   'Fokus hanya pada penjelasan diagnosis, artinya bagi Anda, dan bagaimana pengaruhnya terhadap kehidupan sehari-hari.',
      medications: 'Fokus khusus pada setiap obat: kegunaannya, alasan diresepkan, dan peringatan penting yang perlu diketahui.',
      followup:    'Fokus hanya pada tindakan tindak lanjut: janji temu mendatang, tanda-tanda peringatan, dan perubahan gaya hidup yang diperlukan.'
    }
  };

  const langInstruction = lang === 'id'
    ? 'Tulis SELURUH respons dalam Bahasa Indonesia yang hangat dan mudah dipahami. Gunakan kata "Anda" untuk berbicara langsung kepada pasien. Semua heading seksi harus dalam Bahasa Indonesia.'
    : 'Write the ENTIRE response in warm, clear English. Speak directly to the patient using "you" / "your". All section headings must be in English.';

  const wordsBefore = input.trim().split(/\s+/).length;

  const prompt = `You are Neural Scribe, a compassionate AI medical translator. Convert this medical record into a patient-friendly report using ${levelDesc[lang][readLevel]}.

MEDICAL RECORD:
${input}

INSTRUCTIONS:
- ${focusDesc[lang][focusArea]}
- ${langInstruction}
- Be warm, clear, and reassuring without being dismissive
- Organize the response into 3-4 named sections appropriate to the content
- Each section should be 2-4 sentences
- Flag urgency level: "routine", "monitor", or "urgent"

Respond ONLY with a valid JSON object (no markdown fences, no preamble):
{
  "title": "${lang === 'id' ? 'judul laporan yang ramah, maksimal 6 kata dalam Bahasa Indonesia' : 'friendly report title in English, 6 words max'}",
  "tags": ["tag1", "tag2", "tag3"],
  "urgency": "routine|monitor|urgent",
  "readabilityScore": 75,
  "sections": [
    { "heading": "Section heading in ${lang === 'id' ? 'Indonesian' : 'English'}", "content": "2-4 sentences in ${lang === 'id' ? 'Indonesian' : 'English'}.", "type": "diagnosis|medications|findings|followup|lifestyle" }
  ]
}`;

  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDraHTfzg_mpS33XVG7lsDBo90WqmLxeqo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const data = await res.json();
  const raw = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(raw);

  const wordsAfter = parsed.sections.reduce(
    (/** @type {number} */ a, /** @type {{content:string}} */ s) => a + s.content.split(/\s+/).length, 0
  );

  return { ...parsed, wordsBefore, wordsAfter };
}
