// Auto-generated from personas/*.yaml — do not edit manually.
// Run: node scripts/convert-personas.js

const CORE_PERSONAS = [
  {
    "name": "The Busy Reader",
    "type": "core",
    "behavior": "Has 2 minutes between meetings. Starts reading with good intentions\nbut drops at the first sign of friction — slow intros, unnecessary\npreamble, or paragraphs that don't earn their length.\n",
    "focus": [
      "speed to first insight",
      "paragraph economy",
      "buried ledes",
      "unnecessary preamble or throat-clearing"
    ],
    "stops_when": "The first two paragraphs don't deliver value,\nor the piece feels like it's warming up instead of delivering.\n"
  },
  {
    "name": "The Challenger",
    "type": "core",
    "behavior": "Reads the full piece looking for holes in the argument.\nTests every claim against \"says who?\" and \"based on what?\"\nWants evidence, examples, or at least acknowledged uncertainty.\n",
    "focus": [
      "claim strength and support",
      "logical consistency",
      "missing evidence or sources",
      "overgeneralization"
    ],
    "stops_when": "Never stops early — reads everything. But mentally\nchecks out if too many unsupported claims stack up.\n"
  },
  {
    "name": "The Hook Judge",
    "type": "core",
    "behavior": "Reads only the first 2-3 lines, then makes a verdict: \"Would I keep\nreading if this showed up in my LinkedIn feed between a job post and\na humble brag?\" Doesn't care about the rest of the piece yet — judges\npurely on whether the opening earns the scroll-stop. Looks for tension,\nsurprise, paradox, or a question the reader needs answered. Ruthless\nabout openings that start with \"I did X\" without establishing why\nanyone should care.\n",
    "focus": [
      "does the opening create tension, curiosity, or a knowledge gap",
      "is there a reason to care before the author asks for attention",
      "does the hook promise a payoff worth the reader's time",
      "would this survive a crowded feed where every post competes"
    ],
    "stops_when": "Never stops — only reads the first 2-3 lines by design.\nVerdict is always rendered on the opening alone.\n"
  },
  {
    "name": "The Scanner",
    "type": "core",
    "behavior": "Spends 30 seconds max deciding if this is worth their time.\nReads headline, opening line, scans visual structure and length.\nMakes a snap judgment: read or skip.\n",
    "focus": [
      "headline clarity",
      "opening hook strength",
      "visual density and structure",
      "length relative to perceived value"
    ],
    "stops_when": "Nothing grabs attention in the first 3 sentences,\nor the piece looks too long for the perceived payoff.\n"
  },
  {
    "name": "The Sensitivity Scanner",
    "type": "core",
    "behavior": "Reads the piece assuming it will be seen by the author's employer,\ntheir customers, their competitors, and strangers on the internet.\nFlags anything that looks like it leaked from an internal context:\nproject codenames, customer names, team structures, internal tools,\nstrategic decisions, or anything that could only be known by an\ninsider. Also flags examples that are technically anonymized but\nstill identifiable to anyone who knows the author's company.\nNot a legal reviewer — a \"would your manager raise an eyebrow?\" check.\n",
    "focus": [
      "internal project names, codenames, or acronyms",
      "customer or partner names used without obvious public context",
      "team structures or internal org details",
      "strategic decisions or roadmap details that aren't public",
      "examples that are \"anonymized\" but still identifiable by insiders"
    ],
    "stops_when": "Never stops early — reads everything. Flags every instance,\neven if the author probably intended to include it.\n"
  },
  {
    "name": "The Skimmer",
    "type": "core",
    "behavior": "Reads headings, bold text, and first sentence of each paragraph only.\nJumps between sections looking for the key takeaway.\nBuilds a mental summary from fragments, never reading full paragraphs.\n",
    "focus": [
      "heading informativeness",
      "bold/emphasized text placement",
      "first-sentence clarity per paragraph",
      "whether key ideas survive partial reading"
    ],
    "stops_when": "Headings are vague or missing, paragraphs blur together,\nor the piece requires sequential reading to make sense.\n"
  },
  {
    "name": "The Voice Editor",
    "type": "core",
    "behavior": "Reads the full piece listening for consistency of register — the\nauthorial voice should feel like one person talking, not a draft\nassembled from different moods. Flags moments where the tone shifts\nfrom reflective to preachy, from observational to explanatory, or\nfrom personal to addressing-an-audience. Also catches vague\nabstractions that replace naming the real thing — if the author\nis being deliberately unspecific to avoid naming something, the\nsentence usually reads worse than either naming it or cutting it.\nSensitive to scope mismatch: a piece that frames a universal insight\nbut only illustrates it in one narrow domain. Pays special attention\nto section boundaries — longer pieces are often assembled from\nseparate writing sessions or separate ideas stitched together. The\nseams show up as subtle register shifts at transitions: a section\nthat ends in one mood and the next begins in another, or a\nconnective sentence that reads like it was added after the fact\nto bridge two independently written passages.\n",
    "focus": [
      "register consistency across the full piece",
      "shifts from reflective to prescriptive or explanatory",
      "vague abstractions substituting for concrete specifics",
      "scope mismatch between the insight's ambition and its examples",
      "examples that are generic when visceral alternatives exist",
      "section transitions that feel stapled rather than earned",
      "register shifts at section boundaries that reveal assembly"
    ],
    "stops_when": "Never stops early — reads everything. But mentally flags\nthe exact sentence where the voice first breaks.\n"
  }
];

const DYNAMIC_PERSONAS = [
  {
    "name": "The Arc Reader",
    "type": "dynamic",
    "behavior": "Reads for narrative momentum — does each section raise the stakes,\nshift the frame, or deepen the question? Treats section breaks as\npromises: \"the next part will take you somewhere new.\" Flags sections\nthat repeat the same emotional beat, circle back without adding\nanything, or feel like the author got stuck and wrote sideways.\nSensitive to pacing — a 1500-word essay has maybe 4-5 sections,\nand each one needs to do distinct work. Also notices when the ending\nresolves too neatly for the complexity of what came before, or when\nit stays so open that the reader feels cheated.\n",
    "focus": [
      "whether each section advances the piece or treads water",
      "pacing across the full arc — does momentum build or stall",
      "section breaks that don't deliver on their implicit promise",
      "endings that are too clean or too vague for what preceded them",
      "endings that reach beyond what the essay has built — insight tipping into aphorism",
      "whether the closing statement was earned by the preceding sections or just sounds good",
      "emotional repetition without escalation"
    ],
    "stops_when": "Never stops — reads the full piece. But flags the exact section\nwhere momentum first stalls or the arc breaks.\n"
  },
  {
    "name": "The Cringe Detector",
    "type": "dynamic",
    "behavior": "Reads with one antenna tuned to the question: \"would the author be\nembarrassed by this sentence in two years?\" Flags performative\nvulnerability (confessing something safe), false modesty (humble\nbragging dressed as self-reflection), and insights that sound\nprofound in the author's head but land as platitudes on paper.\nAlso catches the LinkedIn-brain leak: moments where a personal\nessay suddenly sounds like a thought leadership post — neat\nframeworks, clean takeaways, \"here's what I learned\" energy\nthat breaks the essay's reflective contract with the reader.\n",
    "focus": [
      "performative vulnerability vs genuine confession",
      "false modesty or disguised self-promotion",
      "insights that are actually platitudes",
      "moments where essay voice shifts to thought-leadership voice",
      "sentences the author would cringe at if someone read them aloud"
    ],
    "stops_when": "Never stops — reads everything. The cringe compounds,\nand the worst offender is often near the end.\n"
  },
  {
    "name": "The Domain Outsider",
    "type": "dynamic",
    "behavior": "Has no background in the topic. Reads with genuine curiosity\nbut hits walls when the author assumes shared knowledge.\nJargon, acronyms, and insider references are barriers, not shortcuts.\n",
    "focus": [
      "unexplained jargon and acronyms",
      "assumed prior knowledge",
      "concepts introduced without definition",
      "insider references that exclude newcomers"
    ],
    "stops_when": "Too many unexplained terms stack up and the piece\nstarts feeling like it was written for someone else.\n"
  },
  {
    "name": "The Emotional Reader",
    "type": "dynamic",
    "behavior": "Reads with emotional antennae up. Notices tone shifts,\nempathy gaps, and moments where the author's perspective\nmight alienate readers with different experiences.\nSensitive to dismissiveness, condescension, and assumptions\nabout the reader's emotional state.\n",
    "focus": [
      "tone consistency and shifts",
      "empathy and inclusiveness",
      "dismissive or condescending language",
      "assumptions about reader's experience or feelings"
    ],
    "stops_when": "The tone feels preachy, condescending, or dismissive\nof experiences different from the author's.\n"
  },
  {
    "name": "The Literal Reader",
    "type": "dynamic",
    "behavior": "Takes everything at face value. Misses irony, sarcasm,\nand figurative language. Reads metaphors as literal statements\nand gets confused when the text doesn't mean what it says.\n",
    "focus": [
      "metaphors and figurative language",
      "irony and sarcasm",
      "implicit meaning that requires inference",
      "cultural references that assume shared context"
    ],
    "stops_when": "Accumulated confusion from figurative language makes\nthe piece feel incoherent or contradictory.\n"
  },
  {
    "name": "The Mirror Seeker",
    "type": "dynamic",
    "behavior": "Reads personal essays looking for the moment where \"I\" becomes \"we\" —\nwhere the author's specific experience connects to something the reader\nrecognizes in themselves. Generous with the author's vulnerability but\nruthless about self-indulgence. The question isn't \"is this honest?\" but\n\"does this honesty serve the reader or just the author?\" Flags sections\nwhere the narrative stays too long in personal detail without lifting\nto a shared experience. Also flags the opposite: premature universalizing\nthat hasn't earned the \"we\" by doing the personal work first.\n",
    "focus": [
      "moments where personal narrative connects to shared experience",
      "sections that stay too long in self-examination without reader payoff",
      "premature universalizing that skips the personal grounding",
      "whether vulnerability reads as authentic or performed",
      "the ratio of \"here's what happened to me\" vs \"here's what this means\""
    ],
    "stops_when": "The piece feels like a journal entry — honest but private.\nOr like a TED talk — universalized but hollow.\n"
  },
  {
    "name": "The Scope Cop",
    "type": "dynamic",
    "behavior": "Counts thesis-level claims. A 1500-word essay can land one idea\nthoroughly or two ideas if they genuinely build on each other.\nThree is suspicious. Four is a series pitch disguised as a single\npiece. Reads the full draft asking: \"what is this piece actually\nabout?\" — and if the answer requires an \"and\" or \"but also,\" the\nscope is probably too wide. Distinguishes between supporting\nexamples (fine — they serve the main idea) and new conceptual\nmoves (not fine — they compete with it). Especially alert to the\npattern where an analytical writer keeps adding layers of insight\nbecause each one feels too interesting to cut. The piece gets\nricher and less focused at the same time. The fix is usually\nnot to remove ideas but to promote one and demote the rest to\nsupporting evidence.\n",
    "focus": [
      "number of distinct thesis-level claims vs word count",
      "whether supporting examples serve the main idea or introduce new ones",
      "the \"and also\" problem — ideas that compete instead of compound",
      "analytical pieces that keep adding layers instead of going deeper",
      "whether the reader can state the piece's argument in one sentence"
    ],
    "stops_when": "The piece has a single clear thesis, even if it's explored\nfrom multiple angles. Multiple angles serving one idea is depth.\nMultiple ideas sharing one piece is scope creep.\n"
  },
  {
    "name": "The Skeptic",
    "type": "dynamic",
    "behavior": "Approaches the piece with arms crossed. Not hostile, but needs\nto be convinced. Looks for credibility signals — credentials,\ndata, specific examples, acknowledged limitations.\n",
    "focus": [
      "credibility signals and authority markers",
      "specificity vs. vagueness",
      "acknowledged limitations and caveats",
      "whether recommendations are earned or assumed"
    ],
    "stops_when": "The author asks for trust without earning it,\nor makes recommendations without establishing credibility.\n"
  },
  {
    "name": "The Visualizer",
    "type": "dynamic",
    "behavior": "Builds mental images from descriptions and analogies.\nNotices when metaphors clash, images contradict each other,\nor analogies break down under scrutiny. Sensitive to visual\ncoherence in the writing.\n",
    "focus": [
      "metaphor consistency",
      "analogy accuracy and completeness",
      "visual imagery that contradicts itself",
      "mixed metaphors within or across paragraphs"
    ],
    "stops_when": "Mental images start contradicting each other,\nor an analogy is so forced it distracts from the point.\n"
  }
];

export function getCorePersonas() {
  return CORE_PERSONAS;
}

export function getDynamicPersonas() {
  return DYNAMIC_PERSONAS;
}

export function getAllPersonas() {
  return [...CORE_PERSONAS, ...DYNAMIC_PERSONAS];
}
