"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConversionRecommendation } from "@/types/comments";
import { useTranslations } from "next-intl";
import {
  Zap,
  MessageSquare,
  Users,
  AlertCircle,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIRecommendationsProps {
  recommendations: ConversionRecommendation[];
  comments?: string[];
  analysis?: any;
}

export function AIRecommendations({
  recommendations,
  comments = [],
  analysis,
}: AIRecommendationsProps) {
  const t = useTranslations("conversion");

  const getIcon = (type: string) => {
    switch (type) {
      case "flash-sale":
        return <Zap className="h-5 w-5 text-accent-orange" />;
      case "script-change":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case "engagement":
        return <Users className="h-5 w-5 text-primary" />;
      case "respond":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case "address":
        return <AlertCircle className="h-5 w-5 text-accent-orange" />;
      case "highlight":
        return <TrendingUp className="h-5 w-5 text-primary" />;
      default:
        return <Lightbulb className="h-5 w-5 text-primary" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-accent-pink bg-accent-pink/10";
      case "medium":
        return "border-accent-orange bg-accent-orange/10";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  // Generate AI recommendations based on comments and analysis
  const generateRecommendations = (): ConversionRecommendation[] => {
    const recs: ConversionRecommendation[] = [];

    // Analyze comments for common patterns
    const hasPriceQuestions = comments.some((c) =>
      c.toLowerCase().includes("giá") || c.toLowerCase().includes("price")
    );
    const hasShippingQuestions = comments.some((c) =>
      c.toLowerCase().includes("ship") || c.toLowerCase().includes("giao")
    );
    const hasQualityQuestions = comments.some((c) =>
      c.toLowerCase().includes("tốt") || c.toLowerCase().includes("chất lượng")
    );

    if (hasPriceQuestions && analysis?.negativeCount > 2) {
      recs.push({
        id: "1",
        type: "flash-sale",
        priority: "high",
        title: t("flashSale"),
        description:
          "Nhiều người hỏi về giá. Cân nhắc flash sale để tăng conversion.",
        basedOn: `${analysis.negativeCount} negative comments về giá`,
        expectedImpact: "Tăng conversion 15-25%",
      });
    }

    if (hasShippingQuestions) {
      recs.push({
        id: "2",
        type: "address",
        priority: "medium",
        title: t("addressConcerns"),
        description: "Nhiều câu hỏi về shipping. Nên giải thích rõ chính sách.",
        basedOn: "Multiple questions về shipping",
        expectedImpact: "Giảm cart abandonment 10-15%",
      });
    }

    if (hasQualityQuestions) {
      recs.push({
        id: "3",
        type: "highlight",
        priority: "medium",
        title: t("highlightBenefits"),
        description: "Nhấn mạnh chất lượng và benefits của sản phẩm.",
        basedOn: "Questions về chất lượng",
        expectedImpact: "Tăng trust và conversion 8-12%",
      });
    }

    if (analysis?.popularQuestions.length > 0) {
      recs.push({
        id: "4",
        type: "respond",
        priority: "high",
        title: t("respondToComments"),
        description: `Trả lời ${analysis.popularQuestions.length} câu hỏi phổ biến để tăng engagement.`,
        basedOn: "Popular questions từ comments",
        expectedImpact: "Tăng engagement 20-30%",
      });
    }

    // Default recommendations
    if (recs.length === 0) {
      recs.push({
        id: "5",
        type: "engagement",
        priority: "medium",
        title: t("engagement"),
        description: "Tổ chức Q&A hoặc minigame để tăng tương tác.",
        basedOn: "General best practice",
        expectedImpact: "Tăng viewer retention 10-15%",
      });
    }

    return recs;
  };

  const finalRecommendations =
    recommendations.length > 0
      ? recommendations
      : generateRecommendations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {finalRecommendations.map((rec) => (
          <div
            key={rec.id}
            className={`p-4 rounded-lg border bg-white ${getPriorityColor(
              rec.priority
            )}`}
          >
            <div className="flex items-start gap-3">
              {getIcon(rec.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      rec.priority === "high"
                        ? "bg-accent-pink/20 text-accent-pink"
                        : rec.priority === "medium"
                        ? "bg-accent-orange/20 text-accent-orange"
                        : "bg-gray-200 text-foreground-muted"
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-foreground-muted mb-2">
                  {rec.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground-muted">
                    Based on: {rec.basedOn}
                  </span>
                  <span className="text-primary font-medium">
                    {rec.expectedImpact}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => console.log("Apply recommendation", rec.id)}
                >
                  Apply This Action
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

