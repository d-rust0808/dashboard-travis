# LPMS Dashboard - Livestream Performance Management System

Frontend dashboard cho hệ thống quản lý hiệu suất livestream với React.js và Next.js.

## 🚀 Bắt đầu

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production server
npm start
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## 📁 Cấu trúc Dự án

```
dashboard/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard routes
│   │   ├── live/         # Real-time dashboard
│   │   ├── setup/        # Setup session
│   │   ├── report/       # Performance report
│   │   └── data-entry/   # Data entry
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── charts/           # Chart components
│   ├── gauges/           # Gauge components
│   ├── alerts/           # Alert components
│   └── layout/           # Layout components
├── lib/                   # Utilities
└── types/                 # TypeScript types
```

## 🎨 Tính năng

### 1. Real-time Performance Dashboard (`/live`)
- Hiển thị metrics real-time (viewers, orders, revenue)
- GMV trend chart với Target/Expected/Actual
- Viewers & Conversion gauges
- Alerts & Warnings
- Recommended Actions
- Risk Assessment gauge

### 2. Setup Livestream Session (`/setup`)
- Cấu hình revenue goal với presets
- Thiết lập duration
- Chọn sản phẩm chính
- Product search và selection

### 3. Performance Report (`/report`)
- KPI summary cards
- Historical GMV trend
- Activity metrics với trends
- Product performance table
- Summary & Recommendations

### 4. Real-time Data Entry (`/data-entry`)
- Nhập liệu thủ công theo time intervals
- Dynamic table với inline editing
- Export functionality
- Integration guides

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **State:** React Hooks (có thể thêm Zustand nếu cần)

## 📝 Ghi chú

- Hiện tại sử dụng mock data
- Cần tích hợp API backend cho dữ liệu thực
- WebSocket integration cho real-time updates (chưa implement)
- Responsive design đã được thiết kế nhưng cần test trên mobile

## 🔧 Development

```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## 📄 License

MIT

