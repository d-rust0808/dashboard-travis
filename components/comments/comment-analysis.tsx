"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentAnalysis } from "@/types/comments";
import { useTranslations } from "next-intl";
import { TrendingUp, TrendingDown, Minus, Hash } from "lucide-react";

interface CommentAnalysisProps {
  analysis: CommentAnalysis;
}

export function CommentAnalysisDisplay({ analysis }: CommentAnalysisProps) {
  const t = useTranslations("comments");

  const sentimentPercentage = {
    positive: (analysis.positiveCount / analysis.totalComments) * 100,
    negative: (analysis.negativeCount / analysis.totalComments) * 100,
    neutral: (analysis.neutralCount / analysis.totalComments) * 100,
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Sentiment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("sentiment")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{analysis.positiveCount}</span>
              <span className="text-xs text-foreground-muted">
                ({sentimentPercentage.positive.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${sentimentPercentage.positive}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-accent-pink" />
              <span className="text-sm font-semibold text-foreground">Negative</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">{analysis.negativeCount}</span>
              <span className="text-xs font-medium text-foreground-muted">
                ({sentimentPercentage.negative.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-accent-pink"
              style={{ width: `${sentimentPercentage.negative}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-foreground-muted" />
              <span className="text-sm font-semibold text-foreground">Neutral</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">{analysis.neutralCount}</span>
              <span className="text-xs font-medium text-foreground-muted">
                ({sentimentPercentage.neutral.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-gray-500"
              style={{ width: `${sentimentPercentage.neutral}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Top Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Hash className="h-4 w-4" />
            {t("topKeywords")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analysis.topKeywords.map((keyword, index) => (
              <div
                key={keyword.word}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground-muted">#{index + 1}</span>
                  <span className="text-sm font-medium">{keyword.word}</span>
                </div>
                <span className="text-xs text-foreground-muted">{keyword.count} lần</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Level */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("engagement")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div
              className={`mb-2 text-3xl font-bold ${
                analysis.engagementLevel === "high"
                  ? "text-primary"
                  : analysis.engagementLevel === "medium"
                    ? "text-accent-orange"
                    : "text-accent-pink"
              }`}
            >
              {analysis.engagementLevel.toUpperCase()}
            </div>
            <div className="text-sm text-foreground-muted">{analysis.totalComments} comments</div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Popular Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {analysis.popularQuestions.map((question, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-2 text-sm">
                {question}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
