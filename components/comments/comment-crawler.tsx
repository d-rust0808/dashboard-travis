"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, MessageSquare } from "lucide-react";
import { Comment, CommentAnalysis } from "@/types/comments";
import { useTranslations } from "next-intl";

interface CommentCrawlerProps {
  livestreamId?: string;
  onCommentsUpdate?: (comments: Comment[]) => void;
  onAnalysisUpdate?: (analysis: CommentAnalysis) => void;
}

export function CommentCrawler({
  livestreamId,
  onCommentsUpdate,
  onAnalysisUpdate,
}: CommentCrawlerProps) {
  const t = useTranslations("comments");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Mock comment data - sẽ thay bằng API call thực tế
  const mockComments: Comment[] = [
    {
      id: "1",
      author: "Nguyễn Văn A",
      content: "Sản phẩm này có tốt không? Giá bao nhiêu?",
      timestamp: new Date(),
      platform: "shopee",
      sentiment: "neutral",
      keywords: ["sản phẩm", "giá"],
    },
    {
      id: "2",
      author: "Trần Thị B",
      content: "Tuyệt vời! Mình đã mua và rất hài lòng",
      timestamp: new Date(),
      platform: "shopee",
      sentiment: "positive",
      keywords: ["hài lòng"],
    },
    {
      id: "3",
      author: "Lê Văn C",
      content: "Có ship nhanh không? Mình cần gấp",
      timestamp: new Date(),
      platform: "shopee",
      sentiment: "neutral",
      keywords: ["ship", "gấp"],
    },
    {
      id: "4",
      author: "Phạm Thị D",
      content: "Sản phẩm có bảo hành không?",
      timestamp: new Date(),
      platform: "shopee",
      sentiment: "neutral",
      keywords: ["bảo hành"],
    },
    {
      id: "5",
      author: "Hoàng Văn E",
      content: "Giá hơi cao, có giảm giá không?",
      timestamp: new Date(),
      platform: "shopee",
      sentiment: "negative",
      keywords: ["giá", "giảm giá"],
    },
  ];

  const crawlComments = async () => {
    setIsCrawling(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Analyze comments
    const analysis = analyzeComments(mockComments);
    
    setComments(mockComments);
    setLastUpdate(new Date());
    setIsCrawling(false);
    
    onCommentsUpdate?.(mockComments);
    onAnalysisUpdate?.(analysis);
  };

  const analyzeComments = (comments: Comment[]): CommentAnalysis => {
    const positiveCount = comments.filter((c) => c.sentiment === "positive").length;
    const negativeCount = comments.filter((c) => c.sentiment === "negative").length;
    const neutralCount = comments.filter((c) => c.sentiment === "neutral").length;

    // Extract keywords
    const keywordMap = new Map<string, number>();
    comments.forEach((comment) => {
      comment.keywords?.forEach((keyword) => {
        keywordMap.set(keyword, (keywordMap.get(keyword) || 0) + 1);
      });
    });

    const topKeywords = Array.from(keywordMap.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Extract questions
    const questions = comments
      .filter((c) => c.content.includes("?") || c.content.includes("không"))
      .map((c) => c.content)
      .slice(0, 5);

    // Determine engagement level
    const engagementLevel =
      comments.length > 20 ? "high" : comments.length > 10 ? "medium" : "low";

    return {
      totalComments: comments.length,
      positiveCount,
      negativeCount,
      neutralCount,
      topKeywords,
      engagementLevel,
      popularQuestions: questions,
      commonConcerns: questions.filter((q) =>
        q.toLowerCase().includes("giá") || q.toLowerCase().includes("ship")
      ),
    };
  };

  useEffect(() => {
    // Auto-crawl on mount
    crawlComments();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(crawlComments, 30000);
    return () => clearInterval(interval);
  }, [livestreamId]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {t("title")}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={crawlComments}
            disabled={isCrawling}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isCrawling ? "animate-spin" : ""}`}
            />
            {isCrawling ? t("crawling") : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isCrawling ? (
          <div className="text-center py-8 text-foreground-muted">
            {t("crawling")}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-foreground-muted">
            {t("noComments")}
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 rounded-lg border border-gray-200 bg-gray-50"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-foreground-muted">
                    {comment.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
                {comment.sentiment && (
                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        comment.sentiment === "positive"
                          ? "bg-primary/20 text-primary"
                          : comment.sentiment === "negative"
                          ? "bg-accent-pink/20 text-accent-pink"
                          : "bg-gray-200 text-foreground-muted"
                      }`}
                    >
                      {comment.sentiment}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {lastUpdate && (
          <div className="text-xs text-foreground-muted mt-4">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

