"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Search, Plus, Edit2, BarChart3 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
}

export default function SetupPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("setup");
  const tCommon = useTranslations("common");

  const [revenueGoal, setRevenueGoal] = useState(500000000);
  const [duration, setDuration] = useState({ hours: 2, minutes: 0 });
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([
    { id: "1", name: "Serum Dưỡng Trắng", sku: "SF001" },
    { id: "2", name: "Combo Áo Tập Gym", sku: "GYM001" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const suggestedProducts: Product[] = [
    { id: "3", name: "Kem Chống Nắng SPF 50+", sku: "SPF001" },
    { id: "4", name: "Combo Dầu Gội xả", sku: "SH001" },
    { id: "5", name: "Máy Lọc Không Khí Mini", sku: "AIR001" },
    { id: "6", name: "Bộ Đồ Chơi Lắp Ghép", sku: "TOY001" },
  ];

  const presetRevenue = [300000000, 500000000, 700000000, 1000000000];
  const presetDuration = [60, 120];

  const handleAddProduct = (product: Product) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const handleStartLivestream = () => {
    console.log("Starting livestream with:", {
      revenueGoal,
      duration,
      products: selectedProducts,
    });
    // Navigate to live dashboard
    router.push(`/${locale}/live`);
  };

  return (
    <div className="space-y-4 px-4 pb-6 sm:space-y-6 sm:px-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">{t("title")}</h1>
        <p className="text-sm text-foreground-muted">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left Column - Main Settings */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {/* Revenue Goal */}
          <Card>
            <CardHeader>
              <CardTitle>{t("revenueGoal")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="number"
                  value={revenueGoal}
                  onChange={(e) => setRevenueGoal(Number(e.target.value))}
                  className="flex-1"
                />
                <div className="flex flex-wrap gap-2">
                  {presetRevenue.map((amount) => (
                    <Button
                      key={amount}
                      variant={revenueGoal === amount ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRevenueGoal(amount)}
                      className="min-h-[44px]"
                    >
                      {amount >= 1000000000 ? "₫1B" : `₫${amount / 1000000}M`}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="text-sm text-foreground-muted">
                {t("currentGoal")}: {formatCurrency(revenueGoal)}
              </div>
            </CardContent>
          </Card>

          {/* Duration */}
          <Card>
            <CardHeader>
              <CardTitle>{t("duration")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-2">
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <Input
                    type="number"
                    value={duration.hours}
                    onChange={(e) =>
                      setDuration({
                        ...duration,
                        hours: Number(e.target.value),
                      })
                    }
                    className="min-h-[44px] w-20"
                  />
                  <span className="text-sm font-medium">{t("hours")}</span>
                  <Input
                    type="number"
                    value={duration.minutes}
                    onChange={(e) =>
                      setDuration({
                        ...duration,
                        minutes: Number(e.target.value),
                      })
                    }
                    className="min-h-[44px] w-20"
                  />
                  <span className="text-sm font-medium">{t("minutes")}</span>
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  {presetDuration.map((mins) => (
                    <Button
                      key={mins}
                      variant={
                        duration.hours * 60 + duration.minutes === mins ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setDuration({ hours: Math.floor(mins / 60), minutes: mins % 60 })
                      }
                      className="min-h-[44px]"
                    >
                      {mins} {t("minutes")}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="text-sm text-foreground-muted">
                {t("totalDuration")}: {duration.hours * 60 + duration.minutes} {t("minutes")}
              </div>
            </CardContent>
          </Card>

          {/* Main Products */}
          <Card>
            <CardHeader>
              <CardTitle>{t("products")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-foreground-muted" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5"
                  >
                    <span className="text-sm">{product.name}</span>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-foreground-muted hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Suggested Products & Actions */}
        <div className="space-y-4 sm:space-y-6">
          {/* Suggested Products */}
          <Card>
            <CardHeader>
              <CardTitle>{t("suggestedProducts")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedProducts
                .filter(
                  (p) =>
                    !selectedProducts.find((sp) => sp.id === p.id) &&
                    (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
                  >
                    <div>
                      <span className="text-sm font-medium">{product.name}</span>
                      <div className="text-xs text-foreground-muted">{product.sku}</div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleAddProduct(product)}>
                      <Plus className="mr-1 h-4 w-4" />
                      {tCommon("add")}
                    </Button>
                  </div>
                ))}
              {suggestedProducts.filter(
                (p) =>
                  !selectedProducts.find((sp) => sp.id === p.id) &&
                  (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
              ).length === 0 && (
                <div className="py-4 text-center text-sm text-foreground-muted">
                  {t("noSuggestedProducts")}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selected Products List */}
          {selectedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t("selectedProducts")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border border-gray-300 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{product.name}</span>
                      <span className="text-xs text-foreground-muted">{product.sku}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card>
            <CardContent className="space-y-3 pt-6">
              <Button onClick={handleStartLivestream} className="min-h-[44px] w-full" size="lg">
                {t("startLivestream")}
              </Button>
              <Button
                variant="outline"
                className="min-h-[44px] w-full"
                onClick={() => router.back()}
              >
                {tCommon("cancel")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
