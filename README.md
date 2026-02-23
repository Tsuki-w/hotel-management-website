这是一个基于Next.js 16、和Tailwind CSS构建的酒店预订系统。允许用户浏览房间、进行预订以及管理他们的个人资料。

🌐 **在线体验**: [https://hotel-management-website-delta.vercel.app/](https://hotel-management-website-delta.vercel.app/)

## ✨ 功能特性

- **房间探索**：浏览可用的房间列表，查看房间详情。
- **安全认证**：由NextAuth.js支持的用户登录。
- **预订系统**：
  - 实时可用性检查。
  - 使用`react-day-picker`选择日期。
  - 预订的增删改查（创建、更新、删除）。
- **个人资料**：管理个人信息并查看历史订单。
- **后端集成**：
  - Server Actions 用于数据变更。-`unstable_cache`用于优化数据获取。

## 🛠️ 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS v4](https://tailwindcss.com/)
- **认证**: [NextAuth.js (Auth.js)](https://authjs.dev/)
- **日期处理**: [date-fns](https://date-fns.org/)

## 🚀 快速开始

### 前提条件

- Node.js v20.19.5
- npm v11.7.0

### 环境变量配置

本项目依赖环境变量进行配置。请在项目根目录创建 `.env` 文件，并参照 `.env.example` 填入相应的值：

需要的环境变量包括：

- `AUTH_GITHUB_ID`: GitHub OAuth Client ID
- `AUTH_GITHUB_SECRET`: GitHub OAuth Client Secret
- `AUTH_SECRET`: NextAuth 用于加密 session 的密钥
- `SUPABASE_URL`: Supabase 项目 URL
- `SUPABASE_KEY`: Supabase Anon Key

## 📂 项目结构

```
app/
├── _components/        # 共享UI组件 (Server & Client Components)
├── _lib/               # 业务逻辑、Auth 配置
├── _styles/            # 全局样式(Tailwind CSS)
├── _types/             # TypeScript类型定义
├── about/              # 介绍页面
├── account/            # 用户中心布局
│   ├── profile/        # 个人资料管理
│   └── reservation/    # 预订管理(查看、编辑)
├── api/                # API路由
├── cabins/             # 房间列表页面
│   └── [cabinId]/      # 房间详情动态路由页面
├── login/              # 登录页面
├── thankyou/           # 预订成功感谢页面
├── error.tsx           # 全局错误处理界面
├── layout.tsx          # 根布局组件
├── loading.tsx         # 全局加载状态
├── not-found.tsx       # 自定义 404 页面
└── page.tsx            # 首页
```
