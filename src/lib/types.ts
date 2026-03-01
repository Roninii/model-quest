// Types for Model Quest

export type ModelId = 'claude' | 'gpt' | 'gemini' | 'deepseek' | 'grok';

export interface Model {
  id: ModelId;
  name: string;
  shortName: string;
  colorVar: string; // CSS variable name like --color-claude
}

export type CategoryId =
  | 'conversational'
  | 'coding'
  | 'creative-writing'
  | 'reasoning'
  | 'instruction-following'
  | 'summarization';

export interface ModelRanking {
  model: ModelId;
  score: number;
}

export interface ExampleResponse {
  model: ModelId;
  content: string;
  isCode?: boolean;
}

export interface BenchmarkExample {
  prompt: string;
  responses: ExampleResponse[];
}

export interface CategoryData {
  id: CategoryId;
  label: string;
  icon: string;
  description: string;
  rankings: ModelRanking[];
  examples: BenchmarkExample[];
}

export interface BenchmarkData {
  [key: string]: CategoryData;
}

// Picker types
export type ModelTier = 'small' | 'medium' | 'large';

export interface UseCase {
  id: string;
  name: string;
  description: string;
  recommendedTier: ModelTier;
  reason: string;
  costComparison: string;
  gotcha: string;
}

export interface TierInfo {
  id: ModelTier;
  label: string;
  color: string; // CSS color or variable
  examples: string[];
  priceRange: string;
  speed: string;
}

// OpenRouter types
export interface OpenRouterModel {
  id: string;
  name: string;
  pricing?: {
    prompt: string;
    completion: string;
  };
  context_length?: number;
  description?: string;
}

export interface PlaygroundResponse {
  model: string;
  modelName: string;
  content: string;
  responseTime: number;
  isDemo?: boolean;
  error?: string;
}
