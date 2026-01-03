export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  platform: "shopee" | "facebook" | "tiktok";
  sentiment?: "positive" | "negative" | "neutral";
  keywords?: string[];
}

export interface CommentAnalysis {
  totalComments: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  topKeywords: Array<{ word: string; count: number }>;
  engagementLevel: "low" | "medium" | "high";
  popularQuestions: string[];
  commonConcerns: string[];
}

export interface ConversionRecommendation {
  id: string;
  type: "flash-sale" | "script-change" | "engagement" | "respond" | "address" | "highlight";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  basedOn: string; // What comment/analysis this is based on
  expectedImpact: string;
}

