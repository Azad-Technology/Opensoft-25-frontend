# VibeCatcher: AI-Powered Employee Well-being Platform

## 🎯 Overview

VibeCatcher's frontend provides an intuitive interface for employee well-being monitoring and support. Built with React + Vite, it offers real-time mood tracking, AI-powered chat support, and comprehensive analytics dashboards.

<!-- First row of images -->
<p align="center">
  <img src="assets/image (3).png" width="48%" />
  &nbsp; &nbsp;
  <img src="assets/image (4).png" width="48%" />
</p>

<!-- Adding some vertical space between rows -->
<br>

<!-- Second row of images -->
<p align="center">
  <img src="assets/image (1).png" width="48%" />
  &nbsp; &nbsp;
  <img src="assets/image (2).png" width="48%" />
</p>
## 🚀 Quick Setup

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Environment Setup

Create `.env` file:

```env
VITE_API_URL=your_backend_url
```

### Installation

```bash
# Using npm
npm install
npm run dev

# Using yarn
yarn
yarn dev

# Using pnpm
pnpm install
pnpm dev
```

### Docker Deployment

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f
```

## 📁 Project Structure

```
src/
├── assets/              # Static files
├── components/          # Reusable components
│   ├── common/         # Shared components
│   ├── dashboard/      # Dashboard components
│   └── chat/          # Chat interface components
├── pages/              # Page components
├── context/            # React context
├── hooks/              # Custom hooks
├── services/           # API services
├── store/              # State management
├── styles/             # Global styles
└── utils/              # Helper functions
```

## 🎨 Features

### Employee Dashboard
- Real-time mood tracking
- Performance metrics visualization
- Leave management interface
- Activity monitoring

### Chat Interface
- AI-powered conversation
- Real-time message updates
- Emoji support

### Analytics Dashboard
- Comprehensive well-being metrics
- Team performance tracking
- Trend analysis
- Custom report generation

### Mentor Portal
- Case management
- Employee progress tracking
- Communication tools
- Resource management

## 🔐 Security Features

- JWT authentication
- Role-based access control
- API request encryption