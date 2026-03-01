import type { BenchmarkData, Model } from './types';

export const MODELS: Model[] = [
  { id: 'claude',   name: 'Claude Sonnet 4.6',   shortName: 'Claude',   colorVar: '--color-claude'   },
  { id: 'gpt',      name: 'GPT-5.2',             shortName: 'GPT-5.2',  colorVar: '--color-gpt'      },
  { id: 'gemini',   name: 'Gemini 3.1 Pro',      shortName: 'Gemini',   colorVar: '--color-gemini'   },
  { id: 'deepseek', name: 'DeepSeek V3.2',        shortName: 'DeepSeek', colorVar: '--color-deepseek' },
  { id: 'grok',     name: 'Grok 4.20',            shortName: 'Grok',     colorVar: '--color-grok'     },
];

export const FEATURED_MODELS_CODEX: Model[] = [
  { id: 'gpt', name: 'GPT-5.3 Codex', shortName: 'GPT-5.3 Codex', colorVar: '--color-gpt' },
  { id: 'claude', name: 'Claude Sonnet 4.6', shortName: 'Claude', colorVar: '--color-claude' },
  { id: 'deepseek', name: 'DeepSeek V3.2', shortName: 'DeepSeek', colorVar: '--color-deepseek' },
];

export const benchmarks: BenchmarkData = {
  conversational: {
    id: 'conversational',
    label: 'Conversational',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    description: 'Empathy, tone, nuance, and the ability to hold a meaningful, human-feeling dialogue.',
    rankings: [
      { model: 'claude',   score: 9.6 },
      { model: 'grok',     score: 9.0 },
      { model: 'gpt',      score: 8.8 },
      { model: 'gemini',   score: 8.5 },
      { model: 'deepseek', score: 7.8 },
    ],
    examples: [
      {
        prompt: "I'm feeling overwhelmed with work. Any advice?",
        responses: [
          {
            model: 'claude',
            content: `That sounds really exhausting — when everything feels urgent at once, it's hard to even know where to start.

A few things that might help right now:

**First, just pause.** Seriously. Take two minutes away from the screen. Overwhelm often compounds because we keep pushing through it.

**Then, do a brain dump.** Write down everything that's weighing on you — not to organize it yet, just to get it out of your head and onto paper. The act of externalizing it reduces the mental load.

**Next, ask: what's one thing?** Not the most important thing, not the thing with the closest deadline — just one thing you can move forward on today. Starting somewhere breaks the paralysis.

Is there something specific that's driving the overwhelm? Work volume, a specific project, something outside work bleeding in? I'm happy to think through it with you.`,
          },
          {
            model: 'gpt',
            content: `Feeling overwhelmed is common, especially with demanding work. Here are some practical strategies:

**Prioritize ruthlessly**
- Use the Eisenhower Matrix: categorize tasks by urgency vs. importance
- Focus only on the top 1-3 tasks today
- Defer, delegate, or drop the rest

**Break the cycle**
- Schedule a 5-minute break every 90 minutes
- Step outside if you can — even a short walk measurably reduces cortisol

**Set boundaries**
- Block focus time on your calendar
- Silence non-critical notifications during deep work
- Communicate your bandwidth honestly to your manager

**Longer-term**
- Review whether the workload is sustainable
- Have a conversation with your manager about capacity

Would you like help prioritizing a specific project or crafting that manager conversation?`,
          },
          {
            model: 'gemini',
            content: `Work overwhelm is one of the most common experiences in high-demand jobs — and research shows it often stems from a mismatch between what's demanded and what feels controllable, not just sheer volume.

**In the short term:**
Give yourself permission to triage rather than tackle everything. A quick 10-minute list of what's actually critical this week versus what *feels* urgent but isn't can create immediate relief.

**The science of recovery:**
Studies from the Journal of Occupational Health Psychology suggest that psychological detachment — genuinely switching off from work, even briefly — is one of the most effective recovery mechanisms. Even a 20-minute lunch without screens helps.

**Something worth reflecting on:**
Is this a temporary crunch, or a persistent state? Temporary overwhelm calls for coping strategies. Persistent overwhelm calls for structural changes — to how work is scoped, assigned, or resourced.

What does your situation feel more like?`,
          },
        ],
      },
      {
        prompt: "Explain quantum entanglement like I'm curious but not a physicist.",
        responses: [
          {
            model: 'claude',
            content: `Imagine you have a pair of magic coins. You put one in your pocket and mail the other to a friend in Tokyo. Now here's the strange part: before either of you looks at your coin, neither coin has a definite face — they exist in a kind of superposition of both heads and tails simultaneously.

The moment you peek at your coin and see heads, your friend's coin *instantly* becomes tails — not because you sent a signal, but because the two coins were "entangled." They share a single quantum state, no matter how far apart they are.

Einstein hated this. He called it "spooky action at a distance" and thought it proved quantum mechanics was incomplete. But decades of experiments have confirmed: it's real.

The catch: you can't use entanglement to send information faster than light. The coin in your pocket is random — you can't choose what you'll see. You can only *compare notes* with your friend afterward and notice the correlation.

What it tells us is something genuinely strange about reality: quantum objects don't have definite properties until they're observed, and some pairs of objects are connected across any distance in ways that defy our classical intuitions about separateness.`,
          },
          {
            model: 'gpt',
            content: `Quantum entanglement is one of physics' most counterintuitive phenomena. Here's the simplest way to picture it:

Two particles interact in a way that permanently links their quantum states. After this, measuring one particle instantly determines the corresponding property of the other — regardless of the distance between them. This has been verified experimentally across distances of over 1,000 km.

**The key nuances:**
- This doesn't violate relativity — no usable information travels faster than light
- The correlation is real, but the outcomes are random; you can't control what you get
- It's not that particles "send signals" — they're better understood as a single quantum system that was never truly separate

**What it's used for:**
Quantum cryptography leverages entanglement to detect eavesdropping. Any interception disturbs the entangled state, revealing the intrusion.

Quantum computers also use entanglement to process certain problems exponentially faster than classical hardware.`,
          },
          {
            model: 'deepseek',
            content: `Two particles interact and become "entangled" — their quantum states are correlated regardless of distance.

Measure one: its partner's corresponding property is instantly determined. Confirmed by experiment. Not a hidden variable (Bell's theorem rules that out).

Why it's not magic:
- The outcomes are random — you can't choose what you measure
- No information travels instantaneously (relativity is safe)
- The correlation only becomes visible when you compare results over a classical channel

Practical uses: Quantum key distribution (cryptography), foundational to quantum computing.

The philosophical implication: particles may not have definite properties until measured. Reality at the quantum level is genuinely probabilistic, not just uncertain from our vantage point.`,
          },
        ],
      },
    ],
  },

  coding: {
    id: 'coding',
    label: 'Coding',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    description: 'Code generation quality, correctness, TypeScript fluency, and architectural thinking.',
    rankings: [
      { model: 'gpt',      score: 9.7 },
      { model: 'claude',   score: 9.4 },
      { model: 'deepseek', score: 9.1 },
      { model: 'gemini',   score: 8.6 },
      { model: 'grok',     score: 7.9 },
    ],
    examples: [
      {
        prompt: "Write a debounce function in TypeScript",
        responses: [
          {
            model: 'gpt',
            isCode: true,
            content: `// Debounce with full TypeScript generics and overloads

type AnyFunction = (...args: any[]) => any;

interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
}

function debounce<T extends AnyFunction>(
  fn: T,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean }
): DebouncedFunction<T> {
  const { leading = false, trailing = true } = options ?? {};
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;
  let lastResult: ReturnType<T> | undefined;

  const debounced = (...args: Parameters<T>): void => {
    lastArgs = args;
    const callNow = leading && !timer;

    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      if (trailing && lastArgs) {
        lastResult = fn(...lastArgs);
      }
    }, wait);

    if (callNow) {
      lastResult = fn(...args);
    }
  };

  debounced.cancel = (): void => {
    clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  debounced.flush = (): ReturnType<T> | undefined => {
    if (timer && lastArgs) {
      clearTimeout(timer);
      timer = undefined;
      lastResult = fn(...lastArgs);
    }
    return lastResult;
  };

  return debounced;
}

// Usage
const search = debounce((query: string) => fetchResults(query), 300);
const searchLeading = debounce(handleInput, 250, { leading: true, trailing: false });`,
          },
          {
            model: 'claude',
            isCode: true,
            content: `/**
 * Creates a debounced version of the provided function that delays
 * invoking it until after \`wait\` milliseconds have elapsed since
 * the last time it was invoked.
 */
function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function debounced(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

// Example: debounce a search input handler
const handleSearch = debounce((query: string) => {
  console.log('Searching for:', query);
  // API call here
}, 300);

// In an event listener:
// input.addEventListener('input', (e) => handleSearch(e.target.value));`,
          },
          {
            model: 'deepseek',
            isCode: true,
            content: `function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let t: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}`,
          },
        ],
      },
      {
        prompt: "How would you architect a multi-tenant SaaS database schema?",
        responses: [
          {
            model: 'claude',
            content: `There are three main approaches, each with different tradeoffs:

**1. Shared schema, tenant ID column** (most common)
Every table has a \`tenant_id\` column. Simple to implement, easiest to add features. The risk: a missing WHERE clause exposes other tenants' data. Mitigate with row-level security (PostgreSQL RLS) at the database level.

\`\`\`sql
-- RLS policy example
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
\`\`\`

**2. Schema-per-tenant**
Each tenant gets their own PostgreSQL schema (namespace). Stronger isolation without full database overhead. Migration complexity grows with tenant count.

**3. Database-per-tenant**
Maximum isolation; great for compliance-heavy customers. Operationally expensive — typically reserved for enterprise tiers.

**My recommendation for most SaaS:**
Start with approach #1 plus RLS. Add schema-per-tenant as an option for enterprise customers who need stronger isolation guarantees. The hybrid lets you serve both segments without rebuilding your data layer.

**A few things to get right from day one:**
- Index tenant_id on every table (mandatory)
- Include tenant_id in composite primary keys where applicable
- Design your ORM layer to always inject tenant context automatically — don't rely on application code remembering to filter`,
          },
          {
            model: 'gpt',
            content: `Multi-tenant database architecture has three primary models. Here's a decision framework:

**Option A: Shared tables with tenant_id**
- All tenants share tables; every row has a tenant_id foreign key
- Pros: Simple, cost-effective, easy querying across tenants
- Cons: Data isolation relies on application logic; noisy neighbor risk
- Best for: SMB SaaS, cost-sensitive products, early stage

**Option B: Schema-per-tenant (PostgreSQL)**
- Each tenant has an isolated schema namespace
- Pros: Strong logical isolation, easy per-tenant migrations
- Cons: Schema proliferation, tooling complexity at scale
- Best for: Mid-market SaaS, regulated industries

**Option C: Database-per-tenant**
- Each tenant has a dedicated database instance
- Pros: Maximum isolation, compliance-friendly
- Cons: High operational overhead, expensive
- Best for: Enterprise with strict data residency requirements

**Recommended stack:**
1. Start with Option A + PostgreSQL Row Level Security
2. Add Option B for enterprise customers on request
3. Consider PlanetScale or CockroachDB for global multi-region later

**Key indexes to add immediately:**
\`\`\`sql
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_events_tenant_time ON events(tenant_id, created_at DESC);
\`\`\``,
          },
          {
            model: 'deepseek',
            content: `Three patterns:

**1. Row-level isolation** (tenant_id on every table)
Simplest. Use PostgreSQL RLS to enforce at DB level rather than trusting app code. Always index tenant_id. Best default.

**2. Schema isolation** (one schema per tenant)
PostgreSQL schemas are namespaces. Good isolation without DB overhead. Hard to maintain at 1000+ tenants.

**3. DB isolation**
One DB per tenant. Maximum isolation, maximum cost. Enterprise only.

**Start with #1, migrate enterprises to #2 on demand.**

Critical: make tenant injection automatic in your ORM/middleware. One leaked query is a SOC 2 incident.`,
          },
        ],
      },
    ],
  },

  'creative-writing': {
    id: 'creative-writing',
    label: 'Creative Writing',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    description: 'Voice, originality, narrative craft, and the ability to write with genuine literary quality.',
    rankings: [
      { model: 'claude',   score: 9.5 },
      { model: 'gemini',   score: 9.0 },
      { model: 'gpt',      score: 8.7 },
      { model: 'grok',     score: 8.3 },
      { model: 'deepseek', score: 7.5 },
    ],
    examples: [
      {
        prompt: "Write the opening paragraph of a story about the last librarian on Earth.",
        responses: [
          {
            model: 'claude',
            content: `The last library card was issued on a Tuesday, which felt wrong to Miriam. Events of significance should at least have the decency to fall on a Monday, or perhaps a Sunday — something with gravity to it. But there she was, sliding the laminated card across the circulation desk to a twelve-year-old who wouldn't look up from his phone, and when the automatic doors sighed shut behind him, the library held its breath. She had catalogued four hundred thousand volumes over the course of her career. She had repaired spines, chased down overdue fines, read to children who fell asleep in her arms, and twice called the police. She had watched the reading rooms empty not all at once but incrementally, like the tide going out — slowly, then not.`,
          },
          {
            model: 'gemini',
            content: `There were still books everywhere, of course. That was the thing people never understood — it wasn't that the books had disappeared. They were stacked in the subway stations where commuters used to wait, arranged along windowsills by whoever had lived in these apartments last, pressed like artifacts into the mud of parks that had grown wild. Elena moved through them the way archaeologists moved through a dig site: carefully, with a reverence bordering on grief. She was the last one trained to understand what they meant, not just as objects but as a system — the Dewey decimal order of things, the invisible architecture of human knowledge sorted and cross-referenced and cared for. Without her, they would just be paper.`,
          },
          {
            model: 'gpt',
            content: `Marcus hadn't spoken to another person in four months, a fact that bothered him less than it should have. The solar panels kept the lights on. The rainwater collection system kept him hydrated. And the library kept him sane — all 847,000 volumes of it, give or take the water damage on sub-level two. Every morning he performed his rounds: checking temperature and humidity, reshelving what had been disturbed by the previous night's wind through a broken skylight, updating the catalog system that no one but him would ever search. Librarians were trained to organize knowledge for future users. He had come to understand that the future was the point, not the users. Somewhere, eventually, there would be readers again.`,
          },
        ],
      },
    ],
  },

  reasoning: {
    id: 'reasoning',
    label: 'Reasoning',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    description: 'Multi-step logic, mathematical thinking, causal inference, and handling complex edge cases.',
    rankings: [
      { model: 'gpt',      score: 9.6 },
      { model: 'claude',   score: 9.3 },
      { model: 'deepseek', score: 9.1 },
      { model: 'gemini',   score: 8.8 },
      { model: 'grok',     score: 8.2 },
    ],
    examples: [
      {
        prompt: "Three switches control three light bulbs in another room. You can only enter the room once. How do you determine which switch controls which bulb?",
        responses: [
          {
            model: 'gpt',
            content: `**Solution using heat as a second signal:**

1. Turn on Switch 1 and leave it on for ~10 minutes
2. Turn Switch 1 off. Turn Switch 2 on.
3. Enter the room immediately.

**In the room:**
- The bulb that's **on** → controlled by Switch 2
- The bulb that's **off but warm** → controlled by Switch 1 (was on, now off)
- The bulb that's **off and cold** → controlled by Switch 3

**Why it works:**
The puzzle seems to have only 2 bits of information from one visit (on/off per bulb), but heat provides a third state: "was on recently." This turns a binary state into a ternary one, making all three bulbs distinguishable.

**Edge cases:**
This relies on incandescent or halogen bulbs generating heat. LED bulbs produce very little heat. If LEDs are specified, you'd need to leave Switch 1 on much longer or use a different approach (e.g., varying brightness if the bulbs are dimmable, or using timing).`,
          },
          {
            model: 'claude',
            content: `The trick is that light bulbs have *three* observable states, not two: you can detect whether they're currently on, recently on (warm), or off and cold.

**Here's what you do:**

Turn Switch 1 on. Wait 5-10 minutes. Turn Switch 1 off. Turn Switch 2 on. Now walk into the room.

- **Lit bulb** → Switch 2
- **Dark but warm bulb** → Switch 1 (was on, heated up, now off)
- **Dark and cool bulb** → Switch 3 (never touched)

**The insight:** The puzzle appears unsolvable because you're mapping 3 switches to 3 bulbs with only one observation. But the observation has more dimensions than just on/off — you can also *feel* the bulb. That third dimension (thermal state) provides enough information to distinguish all three.

This pattern — expanding the information channel by using a different sensory modality — is a good mental model for a class of lateral thinking puzzles where the apparent constraint is fewer states than needed, and the solution is finding a hidden third state.`,
          },
          {
            model: 'deepseek',
            content: `Heat is the key.

**Protocol:**
1. Switch 1 ON — wait 10 minutes
2. Switch 1 OFF, Switch 2 ON
3. Enter room

**Identification:**
- Bulb ON → Switch 2
- Bulb OFF + warm → Switch 1
- Bulb OFF + cold → Switch 3

**Assumption:** Incandescent/halogen bulbs. LEDs run cool — if using LEDs, leave Switch 1 on for much longer (~30 min) or the thermal difference may be imperceptible.

The core insight: you're not limited to visual observation. Physical properties persist briefly after state changes, giving you a third distinguishable state.`,
          },
        ],
      },
    ],
  },

  'instruction-following': {
    id: 'instruction-following',
    label: 'Instruction Following',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>',
    description: 'Accurately following complex, multi-step, or constrained instructions without deviation.',
    rankings: [
      { model: 'claude',   score: 9.7 },
      { model: 'gpt',      score: 9.3 },
      { model: 'gemini',   score: 9.0 },
      { model: 'grok',     score: 8.5 },
      { model: 'deepseek', score: 8.2 },
    ],
    examples: [
      {
        prompt: "Write a product description for a coffee mug. Rules: exactly 3 sentences, include the word 'morning' exactly once, end with a question, use no adjectives.",
        responses: [
          {
            model: 'claude',
            content: `This mug holds your coffee from the first pour of morning until the last sip of the workday. The ceramic resists heat, the handle fits your grip, and the base sits flat on any surface. What will you accomplish today?`,
          },
          {
            model: 'gpt',
            content: `Start your morning with a vessel built for the demands of the day, holding 12 ounces of your beverage of choice. This mug features a handle, a base, and walls of ceramic that have been tested for heat retention and durability over time. When you reach for it at your desk, what thoughts will you find waiting in the cup?`,
          },
          {
            model: 'gemini',
            content: `Our mug is a companion for the morning commute, the desk session, and the moments in between that belong only to you. It holds liquid, fits in a cupholder, and survives the dishwasher — a tool that earns its place in the cabinet. Isn't that exactly what you've been looking for?`,
          },
        ],
      },
    ],
  },

  summarization: {
    id: 'summarization',
    label: 'Summarization',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>',
    description: 'Distilling long-form content accurately while preserving key information and nuance.',
    rankings: [
      { model: 'gemini',   score: 9.5 },
      { model: 'claude',   score: 9.2 },
      { model: 'gpt',      score: 8.9 },
      { model: 'deepseek', score: 8.4 },
      { model: 'grok',     score: 8.0 },
    ],
    examples: [
      {
        prompt: "Summarize the key points of the transformer architecture paper ('Attention is All You Need') for a senior engineer who hasn't read it.",
        responses: [
          {
            model: 'gemini',
            content: `**The core contribution:** Transformers replace recurrent networks entirely with attention mechanisms, enabling full parallelization during training — the primary bottleneck of LSTMs/RNNs.

**Architecture:** Encoder-decoder structure. Each layer has (1) multi-head self-attention and (2) position-wise feed-forward networks. Positional encodings (sine/cosine) inject sequence order since there's no inherent ordering from convolutions or recurrence.

**Multi-head attention:** Rather than one attention function, you run h parallel attention heads over projections of Q, K, V — each learning different relational patterns. Results are concatenated and re-projected.

**Scaled dot-product attention:** \`softmax(QK^T / √d_k)V\`. The scaling by √d_k prevents vanishing gradients in the softmax when d_k is large.

**Why it mattered:** 
- State-of-the-art translation with dramatically less training time
- O(1) path length between any two positions (RNNs are O(n)) — better long-range dependency modeling
- Interpretable attention maps as a side benefit

**What it didn't address:** Quadratic attention complexity (O(n²)) — the central problem that all subsequent "efficient attention" work (Longformer, Performer, FlashAttention) has tried to solve.`,
          },
          {
            model: 'claude',
            content: `**tl;dr:** Replace all recurrence and convolution with pure attention. Train dramatically faster. Match or exceed SOTA on translation.

**The mechanism:** Attention computes a weighted sum of values (V), where weights come from the compatibility between a query (Q) and keys (K). Self-attention means Q, K, V all come from the same sequence — each position attends to every other.

**Multi-head:** Run this 8 times in parallel with different learned projections. Each head learns to attend to different aspects (syntax, coreference, etc.). Concatenate, project.

**Architecture:**
- 6 encoder layers, 6 decoder layers
- Each layer: multi-head attention + feed-forward + residuals + layer norm
- Decoder adds cross-attention over encoder output

**The engineering win:** Because there's no recurrence, every position is computed in parallel — you can use modern GPU/TPU hardware efficiently. LSTM training was fundamentally sequential.

**The scaling insight (not stated in the paper, but what it unlocked):** This architecture scales. More parameters, more data, more compute → reliably better. GPT, BERT, and everything after it are transformers.`,
          },
          {
            model: 'gpt',
            content: `**Core thesis:** You don't need recurrence or convolution for sequence modeling. Attention alone is sufficient and superior.

**Key contributions:**

1. **Self-attention replaces RNN sequential processing** — O(1) operations between any two positions vs. O(n) for RNNs. Long-range dependencies are much easier to capture.

2. **Multi-head attention** — 8 parallel attention heads, each attending to different feature subspaces. More expressive than single-head attention.

3. **Positional encoding** — Sinusoidal functions injected at input to preserve token order (no recurrence = no implicit ordering).

4. **Full parallelism** — The entire encoder/decoder stack computes in parallel during training. This is what made large-scale pretraining economically viable.

**Results:** New SOTA on English-German and English-French translation. 3.5 days training on 8 GPUs. Previous SOTA took weeks.

**What to know as context for modern LLMs:** This paper is the foundation. GPT = decoder-only transformer. BERT = encoder-only. T5 = full encoder-decoder. The attention mechanism has been largely unchanged; all subsequent innovation is optimization (FlashAttention), scaling (GPT-3/4), or fine-tuning methodology (RLHF).`,
          },
        ],
      },
    ],
  },
};

export const CATEGORY_ORDER: Array<keyof typeof benchmarks> = [
  'conversational',
  'coding',
  'creative-writing',
  'reasoning',
  'instruction-following',
  'summarization',
];
