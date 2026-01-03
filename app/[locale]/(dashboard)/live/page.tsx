"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GMVTrendChart } from "@/components/charts/gmv-trend-chart";
import { ViewerGauge } from "@/components/gauges/viewer-gauge";
import { RiskGauge } from "@/components/gauges/risk-gauge";
import { AlertBox } from "@/components/alerts/alert-box";
import { CommentCrawler } from "@/components/comments/comment-crawler";
import { CommentAnalysisDisplay } from "@/components/comments/comment-analysis";
import { AIRecommendations } from "@/components/conversion/ai-recommendations";
import { formatCurrency, formatDuration, formatNumber } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Comment, CommentAnalysis } from "@/types/comments";

export default function LiveDashboardPage() {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentAnalysis, setCommentAnalysis] = useState<CommentAnalysis | null>(null);

  // Mock data - will be replaced with real API data
  const metrics = {
    liveDuration: 85, // minutes
    currentViewers: 2150,
    totalOrders: 5600,
    revenue: 280500000,
    target: 500000000,
    conversionRate: 2.5,
  };

  const gmvData = [
    { time: "0m", target: 0, expected: 0, actual: 0 },
    { time: "20m", target: 50, expected: 45, actual: 40 },
    { time: "40m", target: 100, expected: 90, actual: 75 },
    { time: "60m", target: 150, expected: 135, actual: 110 },
    { time: "80m", target: 200, expected: 180, actual: 140 },
  ];

  const achievement = (metrics.revenue / metrics.target) * 100;
  const estimatedRevenue = (metrics.revenue / metrics.liveDuration) * 120; // assuming 2h session

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">{t("title")}</h1>
      </div>

      {/* Header Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {tCommon("liveDuration")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {formatDuration(metrics.liveDuration)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {tCommon("currentViewers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {formatNumber(metrics.currentViewers)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {tCommon("orders")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words">
              {formatNumber(metrics.totalOrders)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {tCommon("revenue")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground break-words">
              {formatCurrency(metrics.revenue)}
            </div>
            <div className="mt-1 text-xs font-semibold text-foreground-muted">
              {tCommon("target")}: {formatCurrency(metrics.target)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Progress */}
      <Card>
        <CardHeader>
          <CardTitle>{tCommon("target")} Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {tCommon("target")}: {formatCurrency(metrics.target)}
              </span>
              <span className="font-semibold">{achievement.toFixed(0)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="bg-accent-orange h-3 rounded-full transition-all"
                style={{ width: `${Math.min(achievement, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {/* GMV Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t("gmvTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <GMVTrendChart
                data={gmvData}
                showAlert={true}
                alertMessage="Below Target / Sales slowing down, 30% behind target"
              />
            </CardContent>
          </Card>

          {/* Viewers & Conversion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{tCommon("currentViewers")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ViewerGauge
                  value={metrics.currentViewers}
                  max={10000}
                  label="Viewers"
                  status="low"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ViewerGauge
                  value={metrics.conversionRate}
                  max={10}
                  label="Conversion"
                  status="medium"
                />
              </CardContent>
            </Card>
          </div>

          {/* Projection */}
          <Card>
            <CardHeader>
              <CardTitle>{t("projection")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-sm text-foreground-muted">Estimated Revenue</div>
                  <div className="text-2xl font-bold">{formatCurrency(estimatedRevenue)}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>At this pace</span>
                    <span className="font-semibold">
                      {((estimatedRevenue / metrics.target) * 100).toFixed(0)}% of target reached
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-warning"
                      style={{
                        width: `${Math.min((estimatedRevenue / metrics.target) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comment Crawler & Analysis */}
          <CommentCrawler onCommentsUpdate={setComments} onAnalysisUpdate={setCommentAnalysis} />

          {commentAnalysis && <CommentAnalysisDisplay analysis={commentAnalysis} />}
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Hot Product Alert */}
          <AlertBox
            title="Key Item Not Selling!"
            message="Top SKU hasn't sold in 15 minutes."
            variant="danger"
            action={{
              label: "Push Promotion Now",
              onClick: () => console.log("Push promotion"),
            }}
          />

          {/* Alerts & Warnings */}
          <Card>
            <CardHeader>
              <CardTitle>{t("alerts")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <AlertBox
                message="Sales Drop Alert: Revenue dropping fast, 60% below expected."
                variant="danger"
              />
              <AlertBox
                message="Idle Product Alert: Main item has zero sales in 15 mins."
                variant="danger"
              />
              <AlertBox
                message="Low Engagement Alert: High viewers, low interaction."
                variant="warning"
              />
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <AIRecommendations
            recommendations={[]}
            comments={comments.map((c) => c.content)}
            analysis={commentAnalysis}
          />

          {/* Risk Gauge */}
          <Card>
            <CardHeader>
              <CardTitle>{t("riskAssessment")}</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskGauge risk="high-risk" />
              <div className="mt-4 flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span>Stable</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-accent-orange h-3 w-3 rounded-full" />
                  <span>Caution</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-accent-pink h-3 w-3 rounded-full" />
                  <span>Danger</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
