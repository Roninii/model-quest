import type { UseCase, TierInfo } from '../types';

export const MODEL_TIERS: TierInfo[] = [
  {
    id: 'small',
    label: 'Small',
    color: 'var(--color-success)',
    examples: ['Claude Haiku 4', 'Gemini 3.1 Flash', 'GPT-5.2 Mini', 'Llama 4 Scout', 'Mistral Small'],
    priceRange: '$0.05–0.50 / 1M tokens',
    speed: '< 1s median TTFT',
  },
  {
    id: 'medium',
    label: 'Medium',
    color: 'var(--color-warning)',
    examples: ['Claude Sonnet 4.6', 'GPT-5.2', 'Gemini 3.1 Pro', 'DeepSeek V3.2', 'Grok 4.20'],
    priceRange: '$0.50–5 / 1M tokens',
    speed: '1–3s median TTFT',
  },
  {
    id: 'large',
    label: 'Large / Frontier',
    color: 'var(--color-error)',
    examples: ['Claude Opus 4', 'GPT-5.2 Pro / o4', 'Gemini 3.1 Ultra', 'Llama 4 Maverick'],
    priceRange: '$5–60+ / 1M tokens',
    speed: '2–8s median TTFT',
  },
];

export const USE_CASES: UseCase[] = [
  {
    id: 'factual-qa',
    name: 'Quick Q&A / Factual lookup',
    description: 'Answering direct questions with known answers',
    recommendedTier: 'small',
    reason: 'Factual retrieval is primarily a memorization task. Small models trained on large corpora handle Wikipedia-class facts reliably. The added capacity of a large model provides minimal benefit here.',
    costComparison: '~100x cheaper with a small model, quality is 95%+ as good for well-defined factual questions.',
    gotcha: 'Fails on very recent events (knowledge cutoff), niche domain expertise, or questions requiring multi-step inference to resolve.',
  },
  {
    id: 'casual-chat',
    name: 'Casual conversation',
    description: 'Friendly back-and-forth, small talk, simple Q&A',
    recommendedTier: 'small',
    reason: "Small models handle light conversation well. Tone, humor, and empathy don't require frontier capacity — they require good instruction tuning, which smaller models have.",
    costComparison: '~80x cheaper. The difference in "vibe" is noticeable but not meaningful for most consumer chat use cases.',
    gotcha: 'Struggles with emotionally nuanced situations — grief, trauma, complex relationships. For mental health or support contexts, go medium or larger.',
  },
  {
    id: 'code-simple',
    name: 'Code generation (simple)',
    description: 'Functions, scripts, boilerplate under ~100 lines',
    recommendedTier: 'medium',
    reason: 'Simple coding tasks require understanding context, language idioms, and correctness — beyond small model reliability. Medium models produce clean, idiomatic code consistently.',
    costComparison: '~20x cheaper than frontier. Quality gap vs. large models is small for well-scoped tasks.',
    gotcha: 'Small models can handle trivial code (sorting algorithms, string manipulation). Upgrade if: multi-file context, uncommon frameworks, or correctness is critical.',
  },
  {
    id: 'code-complex',
    name: 'Code generation (complex architecture)',
    description: 'System design, multi-file refactors, novel algorithms',
    recommendedTier: 'large',
    reason: 'Complex architecture requires sustained coherence across a long context, deep understanding of tradeoffs, and the ability to hold multiple constraints simultaneously. This is where frontier models earn their cost.',
    costComparison: 'Worth it. A 3x cost increase that prevents one architectural mistake or a day of debugging is a strong ROI.',
    gotcha: "Even frontier models make architectural mistakes. Use them for generation + review, not as the only check. Code review by a human (or another model call) is essential.",
  },
  {
    id: 'creative-short',
    name: 'Creative writing (short)',
    description: 'Marketing copy, short stories, social posts, taglines',
    recommendedTier: 'medium',
    reason: 'Short-form creative work benefits from good instruction following and stylistic range. Medium models have this. The incremental quality from large models is real but subtle for most short tasks.',
    costComparison: '~10x cheaper. For A/B testing marketing copy at scale, medium is the clear choice.',
    gotcha: "If you're asking for a very specific voice or highly original content, large models show a noticeable quality difference. For generic copy, medium is fine.",
  },
  {
    id: 'creative-long',
    name: 'Creative writing (novel/screenplay)',
    description: 'Long-form narrative, consistent characters, sustained voice',
    recommendedTier: 'large',
    reason: 'Long-form creative work demands consistency of voice, character, and plot across thousands of tokens. Small and medium models lose coherence. Frontier models maintain character voice and thematic consistency far better.',
    costComparison: 'High cost, but you\'re not running this at scale. For a single novel chapter, the absolute dollar amount is low even at frontier rates.',
    gotcha: "No model reliably generates book-length content in one pass. Structure the workflow as: outline → scene-by-scene generation → editing pass, with explicit context injection at each stage.",
  },
  {
    id: 'data-extraction',
    name: 'Data extraction / formatting',
    description: 'Parsing structured data from text, JSON conversion, classification',
    recommendedTier: 'small',
    reason: 'Structured extraction is a pattern-matching task. Small models with well-designed prompts and JSON mode handle this reliably. The task is well-defined and success is objectively measurable.',
    costComparison: '~100x cheaper. This is the highest-ROI use case for small models — high volume, clear success criteria, trivially verifiable.',
    gotcha: "Fails on ambiguous or poorly structured source documents. If the source text requires real understanding to interpret (not just matching), upgrade to medium.",
  },
  {
    id: 'math-reasoning',
    name: 'Complex reasoning / math',
    description: 'Multi-step math, formal logic, proof-like reasoning',
    recommendedTier: 'large',
    reason: 'Mathematical reasoning requires maintaining correctness across many steps. Small and medium models produce plausible-looking but wrong intermediate steps. o4-class reasoning models are purpose-built for this.',
    costComparison: 'o4-class models are expensive but often the only option that works reliably. The alternative (wrong answers presented with confidence) has a much higher real cost.',
    gotcha: 'Even o3 makes arithmetic errors on very long calculations. Use a code interpreter or calculator tool for numerical work; LLMs for reasoning structure and proof strategy.',
  },
  {
    id: 'summarization-short',
    name: 'Summarization (short docs)',
    description: 'Summarizing articles, emails, short reports under 4k tokens',
    recommendedTier: 'small',
    reason: 'Extractive and abstractive summarization of short documents is a well-solved task for small models. They reliably identify key points and condense them.',
    costComparison: '~100x cheaper. For email summarization in a product, small models are almost always sufficient.',
    gotcha: "Small models miss subtle signals: sarcasm, buried important caveats, interdependencies between paragraphs. If the document's subtext matters, step up to medium.",
  },
  {
    id: 'summarization-long',
    name: 'Summarization (long docs)',
    description: '100-page reports, books, legal documents, codebases',
    recommendedTier: 'medium',
    reason: "Long-document summarization requires a large context window and the ability to maintain coherence across it. Medium models with 128k+ context windows handle this well; small models don't have the window or the capacity.",
    costComparison: 'Medium is the sweet spot — much cheaper than frontier, large enough context, reliably good quality.',
    gotcha: "At very long contexts (>100k tokens), all models start to miss information in the middle. Use a chunked summarization strategy (map-reduce) for documents over 50k tokens.",
  },
  {
    id: 'agentic',
    name: 'Agentic workflows',
    description: 'Multi-step autonomous tasks, tool use, planning loops',
    recommendedTier: 'medium',
    reason: 'Agents amplify both capability and errors. A small model that makes a 10% mistake rate on a single task makes multi-step errors that compound. Medium models have the reliability and instruction-following needed for stable agents.',
    costComparison: "The cost multiplier for agentic loops is already large (many calls per task). Start with medium to get reliability. Only upgrade to frontier if medium can't complete the task successfully.",
    gotcha: "Frontier models in agent loops are expensive and not necessarily better for well-scoped tasks. The bottleneck is usually prompt design, tool reliability, and error handling — not model raw capacity.",
  },
  {
    id: 'safety-critical',
    name: 'Safety-critical applications',
    description: 'Medical, legal, financial advice; content with real-world consequences',
    recommendedTier: 'large',
    reason: "When wrong answers have real consequences — medical misdiagnosis, bad legal advice, incorrect financial guidance — reliability and calibration matter more than cost. Frontier models have better factual accuracy and are better calibrated about what they don't know.",
    costComparison: 'No comparison to make. The cost of a frontier model call is trivial relative to the cost of a wrong answer in a high-stakes context.',
    gotcha: 'Even frontier models hallucinate and can be dangerously confident about wrong information. Safety-critical applications require human review loops regardless of model size.',
  },
];

export const RULES_OF_THUMB: string[] = [
  "If the task has a clear right answer, small models are usually fine.",
  "If you need consistency across many calls, go larger — small models have higher variance.",
  "If users will see the output directly, go one tier up from minimum. Stakes go up when humans read it.",
  "Reasoning models (o4-class) are only worth it for genuinely hard logical problems. Don't use a reasoning model to classify sentiment.",
  "For agentic loops, reliability matters more than raw intelligence. Start with the smallest model that completes the task without failing.",
  "Measure don't guess: the best way to know which model you need is to run both and compare outputs on your actual data.",
  "When in doubt, start small. You can always upgrade — you rarely need to.",
  "The most expensive mistake is shipping a product built for a frontier model when a small one would have worked.",
];

export const CALCULATOR_USE_CASES = [
  { id: 'factual-qa', label: 'Quick Q&A / Factual lookup' },
  { id: 'casual-chat', label: 'Casual conversation' },
  { id: 'code-simple', label: 'Code generation (simple)' },
  { id: 'code-complex', label: 'Code generation (complex)' },
  { id: 'creative-short', label: 'Creative writing (short)' },
  { id: 'creative-long', label: 'Creative writing (long-form)' },
  { id: 'data-extraction', label: 'Data extraction / formatting' },
  { id: 'math-reasoning', label: 'Complex reasoning / math' },
  { id: 'summarization-short', label: 'Summarization (short docs)' },
  { id: 'summarization-long', label: 'Summarization (long docs)' },
  { id: 'agentic', label: 'Agentic workflows' },
  { id: 'safety-critical', label: 'Safety-critical applications' },
];

export function calculateRecommendation(
  useCaseId: string,
  qualityWeight: number,
  costWeight: number,
  speedWeight: number
): { tier: TierInfo; reasoning: string } {
  const useCase = USE_CASES.find(u => u.id === useCaseId);
  if (!useCase) return { tier: MODEL_TIERS[1], reasoning: 'Select a use case to get a recommendation.' };

  const baseTierScore = { small: 0, medium: 1, large: 2 };
  let score = baseTierScore[useCase.recommendedTier];

  // Quality preference pushes toward larger
  if (qualityWeight >= 4) score += 0.5;
  if (qualityWeight <= 2) score -= 0.5;

  // Cost preference pushes toward smaller
  if (costWeight >= 4) score -= 0.5;
  if (costWeight <= 2) score += 0.3;

  // Speed preference pushes toward smaller
  if (speedWeight >= 4) score -= 0.3;

  const clampedScore = Math.max(0, Math.min(2, score));
  const tierIndex = Math.round(clampedScore);
  const tier = MODEL_TIERS[tierIndex];

  let reasoning = useCase.reason;

  if (tierIndex < baseTierScore[useCase.recommendedTier]) {
    reasoning += ' Given your emphasis on cost and speed, a smaller model may be worth trying first — just validate quality on a sample of your real use cases.';
  } else if (tierIndex > baseTierScore[useCase.recommendedTier]) {
    reasoning += ' With your emphasis on quality, erring toward a larger model makes sense. Consider whether the specific quality dimensions you care about actually differ between tiers before committing.';
  }

  return { tier, reasoning };
}
