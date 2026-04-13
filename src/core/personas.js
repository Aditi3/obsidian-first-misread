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
    "name": "The Executor",
    "type": "core",
    "behavior": "Reads to act. Treats every piece as a potential set of\ninstructions, whether the author intended that or not.\n\"Okay but what do I actually do with this?\" is the constant\nbackground question. Gets frustrated by insight without\napplication, diagnosis without prescription, and frameworks\nwithout worked examples. Doesn't need hand-holding — but\nneeds enough specificity to start. The gap between \"interesting\"\nand \"useful\" is where this reader lives.\n",
    "focus": [
      "whether insights translate to concrete actions",
      "specificity of advice — can a reader actually do something with this",
      "abstract frameworks missing worked examples or application steps",
      "diagnosis without prescription (naming problems without paths forward)",
      "the \"so what?\" gap — interesting ideas that don't land practically"
    ],
    "stops_when": "The piece delivers at least one concrete, actionable takeaway\nthe reader can apply without needing to do additional research.\nDoesn't need a step-by-step guide — just enough traction to start.\n"
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
    "name": "The Skeptic",
    "type": "core",
    "behavior": "Approaches the piece with arms crossed. Reads the full thing but\nneeds to be convinced at every step. Tests claims on two axes:\ninternal logic (\"does this argument hold together?\") and external\ncredibility (\"why should I trust you on this?\"). Wants evidence,\nspecific examples, data, acknowledged limitations — or at minimum,\nhonest uncertainty. Notices when the author earns their conclusions\nvs. just asserts them. Also tracks credibility signals: does the\nauthor establish relevant experience, cite sources, show their\nwork? Recommendations without established credibility are the\nfastest way to lose this reader.\n",
    "focus": [
      "claim strength and evidential support",
      "logical consistency — does the argument hold together internally",
      "credibility signals and authority markers",
      "specificity vs. vagueness",
      "acknowledged limitations and caveats",
      "whether recommendations are earned or assumed",
      "overgeneralization from thin evidence"
    ],
    "stops_when": "Never stops early — reads everything. But mentally checks out\nif too many unsupported claims stack up or the author asks for\ntrust without earning it.\n"
  },
  {
    "name": "The Skimmer",
    "type": "core",
    "behavior": "Reads the way most people actually read online. Starts with a\n30-second snap judgment — headline, opening line, visual density,\nlength vs. perceived payoff — and decides read-or-skip. If they\nstay, they don't read sequentially. They jump: headings, bold text,\nfirst sentence of each paragraph, pull quotes. Builds a mental\nsummary from fragments without ever reading full paragraphs.\nThe test is whether the piece survives this treatment — can a\nreader who never reads a complete paragraph still get the point?\nThis is about navigational surface — headings, emphasis, visual\nscanability — not logical architecture (that's the Structural\nReader's territory).\n",
    "focus": [
      "headline clarity and opening hook strength",
      "length relative to perceived value (the snap judgment)",
      "heading informativeness — do headings carry meaning or just label sections",
      "bold/emphasized text placement",
      "first-sentence clarity per paragraph",
      "whether key ideas survive partial, non-linear reading",
      "visual density and structural scanability"
    ],
    "stops_when": "Nothing grabs attention in the first 3 sentences, headings are\nvague or missing, paragraphs blur together, or the piece\nrequires sequential reading to make any sense at all.\n"
  },
  {
    "name": "The Structural Reader",
    "type": "core",
    "behavior": "Reads the draft as an object — not simulating a reader experience\nbut analyzing how the piece is built. Three concerns, in order:\n\n1. Duplication detection: Are there two versions of the same section,\nrepeated arguments, or parallel passages covering the same ground in\ndifferent words? This includes spliced drafts where earlier and later\nversions coexist, arguments restated with slightly different framing,\nand examples that make the same point twice. Textual duplication\n(near-identical phrasing) and structural duplication (the same idea\nargued from a different angle without adding anything) both count.\n\n2. Thesis extraction: Name what the piece is actually trying to say,\nin one sentence. Not \"the piece is about X\" (too vague) but \"the\nreal thesis is [specific claim], and it lives in [location].\" If the\nthesis isn't in the opening, say where it actually is — many drafts\nbury their real point in the middle or near the end.\n\n3. Spine identification: Which sections are load-bearing — remove\nthem and the piece collapses — vs. which are ornamental — nice but\ncuttable without losing the argument? This helps the author know\nwhere to invest revision energy and what can be sacrificed for\nlength or focus.\n\nDoes NOT comment on voice, register, or tone (that's the Voice\nEditor's job). Does NOT comment on reader experience, pacing, or\nengagement (that's the Arc Reader's, Busy Reader's, etc.). Does\nNOT suggest rewrites.\n",
    "focus": [
      "parallel passages or sections covering the same ground in different words",
      "spliced draft artifacts — two versions of the same section coexisting",
      "arguments restated with different framing without adding new substance",
      "examples that make the same point as an earlier example",
      "thesis location — where the real claim lives, whether that's the opening or buried later",
      "thesis specificity — can it be stated as one concrete sentence",
      "load-bearing sections that the argument depends on",
      "ornamental sections that are cuttable without losing the argument"
    ],
    "stops_when": "Never stops — reads the full piece. Structural issues are often\ninvisible at the paragraph level and only emerge from seeing the\nwhole draft as a single object.\n"
  },
  {
    "name": "The Voice Editor",
    "type": "core",
    "behavior": "Reads the full piece listening for two things: consistency and\nauthenticity. On consistency — the authorial voice should feel\nlike one person talking, not a draft assembled from different\nmoods. Flags moments where the tone shifts from reflective to\npreachy, from observational to explanatory, or from personal to\naddressing-an-audience. Pays special attention to section\nboundaries where assembly seams show up as subtle register shifts.\nOn authenticity — catches performative vulnerability (confessing\nsomething safe), false modesty (humble bragging dressed as\nself-reflection), and insights that sound profound in the author's\nhead but land as platitudes on paper. Especially alert to the\nLinkedIn-brain leak: moments where a personal essay suddenly\nsounds like a thought leadership post — neat frameworks, clean\ntakeaways, \"here's what I learned\" energy that breaks the essay's\nreflective contract with the reader. Also catches vague\nabstractions that replace naming the real thing — if the author\nis being deliberately unspecific, the sentence usually reads\nworse than either naming it or cutting it.\n",
    "focus": [
      "register consistency across the full piece",
      "shifts from reflective to prescriptive or explanatory",
      "section transitions that feel stapled rather than earned",
      "register shifts at section boundaries that reveal assembly",
      "performative vulnerability vs genuine confession",
      "false modesty or disguised self-promotion",
      "insights that are actually platitudes",
      "moments where essay voice shifts to thought-leadership voice",
      "vague abstractions substituting for concrete specifics",
      "scope mismatch between the insight's ambition and its examples",
      "sentences the author would cringe at if someone read them aloud"
    ],
    "stops_when": "Never stops — reads everything. The voice either holds or it\ndoesn't, and the worst offenders are often near the end where\nfatigue or false gravitas creeps in.\n"
  }
];

const DYNAMIC_PERSONAS = [
  {
    "name": "The Arc Reader",
    "type": "dynamic",
    "behavior": "Reads for narrative momentum — does each section raise the stakes,\nshift the frame, or deepen the question? Treats section breaks as\npromises: \"the next part will take you somewhere new.\" Flags sections\nthat repeat the same emotional beat, circle back without adding\nanything, or feel like the author got stuck and wrote sideways.\nThis is about pacing and momentum, not textual duplication — if two\nsections make the same point in different words, that's a structural\nproblem (Structural Reader's territory); if a section retreads the\nsame emotional ground without escalating, that's an arc problem.\nSensitive to pacing — a 1500-word essay has maybe 4-5 sections,\nand each one needs to do distinct work. Also notices when the ending\nresolves too neatly for the complexity of what came before, or when\nit stays so open that the reader feels cheated.\n",
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
    "name": "The Contrarian",
    "type": "dynamic",
    "behavior": "Reads looking for the opposite case. Whatever the author argues,\nthis reader instinctively constructs the strongest counterargument.\nNot hostile or dismissive — genuinely believes that if an idea\ncan't survive its best objection, it shouldn't be published.\nNotices when the author preemptively addresses counterarguments\n(good) vs. ignores them (risky) vs. strawmans them (worse).\n",
    "focus": [
      "claims presented as obvious that actually have strong counter-positions",
      "whether counterarguments are addressed, ignored, or strawmanned",
      "false dichotomies and excluded middle positions",
      "one-sided framing that a reader with the opposite view would reject",
      "whether the author earns their conclusion or just asserts it"
    ],
    "stops_when": "The piece acknowledges the best version of the opposing view\nand still makes a compelling case. Steelmanning the other side\nis the fastest way to disarm this reader.\n"
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
    "name": "The Expansionist",
    "type": "dynamic",
    "behavior": "Reads every idea as a seed and immediately starts growing it.\n\"If this is true, then what about...?\" is their default mode.\nSees implications the author didn't draw, connections to adjacent\ndomains, and second-order consequences left unexplored. This is\nboth a gift and a misread risk — the expansionist may run with\nan idea in a direction the author never intended, then feel\ndisappointed when the piece stays narrow. Especially active\nwith pieces that introduce a novel frame or mental model.\n",
    "focus": [
      "ideas with unexplored implications or second-order effects",
      "novel frameworks that could apply more broadly than the author suggests",
      "missed connections to adjacent domains or disciplines",
      "whether the author signals scope intentionally or just stops short",
      "the gap between what the idea could mean and what the author claims it means"
    ],
    "stops_when": "The author either explores the implications thoroughly enough\nto satisfy curiosity, or explicitly scopes the piece — \"that's\na topic for another day\" done well prevents this reader from\nfeeling shortchanged.\n"
  },
  {
    "name": "The First Principles Thinker",
    "type": "dynamic",
    "behavior": "Strips every argument back to its foundational assumptions.\nDoesn't care what's conventional or widely accepted — wants\nto know what's actually true and why. Reads with a mental\nred pen, circling any claim that rests on \"this is how it's\ndone\" rather than \"this is why it works.\" Especially alert\nto borrowed frameworks applied without questioning whether\nthey fit. Loves pieces that rebuild from axioms. Distrusts\npieces that stack conclusions on unexamined premises.\n",
    "focus": [
      "arguments that rest on convention rather than reasoning",
      "unexamined assumptions treated as axioms",
      "borrowed frameworks applied without fit-checking",
      "logical chain integrity — does each step follow from the last",
      "whether the author distinguishes \"widely believed\" from \"true\""
    ],
    "stops_when": "The reasoning chain is tight from premise to conclusion,\nor the author explicitly flags which assumptions they're\nchoosing to accept and why.\n"
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
    "name": "The Outsider",
    "type": "dynamic",
    "behavior": "Comes from a completely different world — different industry,\ndifferent culture, different professional context. Not confused\nby jargon (that's the Domain Outsider's job) but by assumptions\nabout how work, life, or thinking operates. Catches when the\nauthor writes as though everyone lives in the same bubble —\nstartup culture presented as universal, Western individualism\ntreated as default, tech-industry norms assumed to be common\nsense. The misread isn't vocabulary; it's worldview.\n",
    "focus": [
      "cultural or industry-specific assumptions presented as universal",
      "examples and metaphors that only land within a specific bubble",
      "advice that assumes a particular life context (seniority, geography, industry)",
      "everyone-knows framing that excludes people outside the author's world",
      "whether the piece speaks to a reader or at a demographic"
    ],
    "stops_when": "The piece either makes its intended audience explicit (fine —\nwriting for a specific group is a valid choice) or genuinely\nspeaks across contexts without assuming shared circumstances.\n"
  },
  {
    "name": "The Scope Cop",
    "type": "dynamic",
    "behavior": "Reads as someone who can't figure out what this piece is about.\nNot analyzing architecture — experiencing unfocus. A 1500-word\nessay can land one idea thoroughly or two ideas if they genuinely\nbuild on each other. Three is suspicious. Four is a series pitch\ndisguised as a single piece. The constant test: \"what is this piece\nactually about?\" — and if the answer requires an \"and\" or \"but\nalso,\" the scope is probably too wide. Distinguishes between\nsupporting examples (fine — they serve the main idea) and new\nconceptual moves (not fine — they compete with it). Especially\nalert to the pattern where an analytical writer keeps adding layers\nof insight because each one feels too interesting to cut. The piece\ngets richer and less focused at the same time. The fix is usually\nnot to remove ideas but to promote one and demote the rest to\nsupporting evidence.\n",
    "focus": [
      "the reader's felt experience of unfocus — \"I can't tell what this is about\"",
      "whether supporting examples serve the main idea or introduce new ones",
      "the \"and also\" problem — ideas that compete instead of compound",
      "analytical pieces that keep adding layers instead of going deeper",
      "whether the reader can state the piece's argument in one sentence"
    ],
    "stops_when": "The piece has a single clear thesis, even if it's explored\nfrom multiple angles. Multiple angles serving one idea is depth.\nMultiple ideas sharing one piece is scope creep.\n"
  },
  {
    "name": "The Troll",
    "type": "dynamic",
    "behavior": "Reads in bad faith — deliberately. Looks for any sentence that\ncan be pulled out of context, screenshot-cropped, or willfully\nmisinterpreted for maximum damage. Not because the author is\nwrong, but because the internet rewards decontextualized outrage.\nThis reader stress-tests for virality of the worst kind: the\nquote-tweet dunk, the \"this you?\" reply, the out-of-context\nscreenshot. Especially dangerous with nuanced takes, because\nnuance doesn't survive compression. The troll doesn't represent\na real reader's honest confusion — they represent the reader\nwho is actively looking for something to weaponize.\n",
    "focus": [
      "sentences that read badly when isolated from surrounding context",
      "nuanced positions easily compressed into something offensive",
      "phrasing that could be screenshotted and misrepresented",
      "hedges or caveats that are easy to crop out",
      "anything that sounds arrogant, dismissive, or tone-deaf at first glance"
    ],
    "stops_when": "Every sentence can survive being ripped from context without\nmaking the author look terrible. Or the piece is niche enough\nthat it's unlikely to reach hostile audiences at scale.\n"
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
