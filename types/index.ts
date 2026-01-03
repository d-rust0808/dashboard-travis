export interface LivestreamSession {
  id: string;
  revenueGoal: number;
  duration: number; // in minutes
  startTime?: Date;
  endTime?: Date;
  status: "pending" | "active" | "completed";
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl?: string;
}

export interface LivestreamMetrics {
  currentViewers: number;
  totalOrders: number;
  revenue: number;
  liveDuration: number; // in minutes
  conversionRate: number;
}

export interface Alert {
  id: string;
  type: "sales-drop" | "idle-product" | "low-engagement" | "hot-product";
  severity: "warning" | "danger";
  message: string;
  timestamp: Date;
}

export interface Recommendation {
  id: string;
  type: "flash-sale" | "script-change" | "engagement";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

