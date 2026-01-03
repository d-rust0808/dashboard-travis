"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GMVTrendChart } from "@/components/charts/gmv-trend-chart";
import { AlertBox } from "@/components/alerts/alert-box";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ReportPage() {
  const t = useTranslations("report");
  const tCommon = useTranslations("common");
  // Mock data
  const kpis = {
    liveDuration: 3, // hours
    peakViewers: 6500,
    totalOrders: 9250,
    totalRevenue: 390200000,
    target: 500000000,
  };

  const achievement = (kpis.totalRevenue / kpis.target) * 100;

  const gmvData = [
    { time: "0h", target: 0, expected: 0, actual: 0 },
    { time: "0.5h", target: 50, expected: 45, actual: 40 },
    { time: "1h", target: 100, expected: 90, actual: 85 },
    { time: "1.5h", target: 150, expected: 135, actual: 120 },
    { time: "2h", target: 200, expected: 180, actual: 160 },
    { time: "2.5h", target: 250, expected: 225, actual: 200 },
    { time: "3h", target: 300, expected: 270, actual: 240 },
  ];

  const activityMetrics = {
    conversionRate: { value: 14.7, trend: "down" },
    avgWatchTime: { value: "3m 25s", trend: "up" },
    addToCartRate: { value: 20.8, trend: "down" },
    newViewers: { value: 18290, trend: "up" },
  };

  const products = [
    {
      name: "Serum Dưỡng Trắng",
      units: 2950,
      revenue: 146800000,
      change: 3.9,
      image: "🧴",
    },
    {
      name: "Combo Áo Tập Gym",
      units: 2100,
      revenue: 92400000,
      change: -3.29,
      image: "👕",
    },
    {
      name: "Máy Hút Bụi Cầm Tay",
      units: 1500,
      revenue: 78000000,
      change: 79,
      image: "🧹",
    },
  ];

  return (
    <div className="space-y-4 px-4 pb-6 sm:space-y-6 sm:px-6">
      <div className="mb-4 sm:mb-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">{t("title")}</h1>
          <p className="text-sm text-foreground-muted">{t("subtitle")}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {t("liveDuration")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="break-words text-lg font-bold text-foreground sm:text-xl md:text-2xl lg:text-3xl">
              {kpis.liveDuration} {t("hours")}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {t("peakViewers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="break-words text-lg font-bold text-foreground sm:text-xl md:text-2xl lg:text-3xl">
              {formatNumber(kpis.peakViewers)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {t("totalOrders")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="break-words text-lg font-bold text-foreground sm:text-xl md:text-2xl lg:text-3xl">
              {formatNumber(kpis.totalOrders)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              {t("totalRevenue")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="break-words text-base font-bold text-foreground sm:text-lg md:text-xl lg:text-2xl">
              {formatCurrency(kpis.totalRevenue)}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm font-bold text-primary">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary"></span>
              {achievement.toFixed(0)}% {t("achieved")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Achievement */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-foreground">
            {t("targetAchievement", { percent: achievement.toFixed(0) })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-5 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
            <div
              className="flex h-5 items-center justify-end rounded-full bg-gradient-to-r from-primary via-primary-dark to-primary pr-3 shadow-md transition-all duration-500"
              style={{ width: `${Math.min(achievement, 100)}%` }}
            >
              <span className="text-xs font-bold text-white drop-shadow-sm">
                {achievement.toFixed(0)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {/* GMV Trend */}
          <Card>
            <CardHeader>
              <CardTitle>{t("gmvTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <GMVTrendChart data={gmvData} showAlert={true} alertMessage={t("chartAlert")} />
              <div className="bg-accent-orange/10 border-accent-orange/20 mt-4 rounded-lg border p-2 sm:p-3">
                <p className="flex items-start gap-2 text-xs text-foreground sm:items-center sm:text-sm">
                  <span className="text-accent-orange flex-shrink-0 text-sm font-bold sm:text-base">
                    ▲
                  </span>
                  <span className="break-words font-semibold">{t("revenueDropAlert")}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Results */}
          <Card className="bg-gradient-to-br from-primary/5 to-white">
            <CardHeader>
              <CardTitle>{t("keyResults")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-foreground-muted">
                    {tCommon("currentViewers")}
                  </div>
                  <div className="text-3xl font-bold text-foreground">26.000</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-foreground-muted">{t("keySKU")}</div>
                  <div className="text-3xl font-bold text-primary">35,6%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>{t("summaryTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>{t("recommendation1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>{t("recommendation2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>{t("recommendation3")}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Bottlenecks */}
          <AlertBox
            title={t("bottleneckTitle")}
            message={t("bottleneckMessage")}
            variant="danger"
          />

          {/* Activity Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>{t("activityMetrics")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                <span className="text-sm font-medium text-foreground">{t("conversionRate")}</span>
                <div className="flex items-center gap-2">
                  <ArrowDown className="text-accent-pink h-4 w-4" />
                  <span className="font-bold text-foreground">14,7%</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                <span className="text-sm font-medium text-foreground">{t("avgWatchTime")}</span>
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-success" />
                  <span className="font-bold text-foreground">3m 25s</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                <span className="text-sm font-medium text-foreground">{t("addToCartRate")}</span>
                <div className="flex items-center gap-2">
                  <ArrowDown className="text-accent-pink h-4 w-4" />
                  <span className="font-bold text-foreground">20,8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                <span className="text-sm font-medium text-foreground">{t("newViewers")}</span>
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-success" />
                  <span className="font-bold text-foreground">
                    {formatNumber(activityMetrics.newViewers.value)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Performance */}
          <Card>
            <CardHeader>
              <CardTitle>{t("productPerformance")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 rounded-lg border border-gray-300 p-3"
                >
                  <div className="text-3xl">{product.image}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-foreground-muted">
                      {formatNumber(product.units)} {t("orders")}
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {formatCurrency(product.revenue)}
                      {product.change > 0 ? (
                        <span className="ml-2 text-success">+{product.change}%</span>
                      ) : (
                        <span className="text-accent-pink ml-2">{product.change}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
