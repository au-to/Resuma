# Resuma - 现代化在线简历制作工具

一个基于 Next.js 的现代化在线简历编辑器，支持用户注册登录、创建和编辑简历、保存到数据库、导出为 PDF，界面现代美观。

## 🚀 项目特性

- ✨ **现代化设计** - 使用 Tailwind CSS 和 shadcn/ui 构建美观的用户界面
- 🔐 **安全认证** - 集成 NextAuth.js 支持邮箱登录
- 📝 **富文本编辑** - 基于 TipTap 的强大简历编辑器
- 💾 **数据持久化** - 使用 Supabase PostgreSQL 数据库
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎨 **多种模板** - 提供多种精美的简历模板
- 📤 **PDF 导出** - 一键导出高质量的 PDF 简历
- 🔄 **实时预览** - 编辑时实时查看简历效果
- 🌐 **简历分享** - 支持生成公开链接分享简历

## 🛠 技术栈

### 前端
- **Next.js 15** - React 全栈框架 (App Router)
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 实用程序优先的 CSS 框架
- **shadcn/ui** - 现代化 React 组件库
- **Zustand** - 轻量级状态管理
- **TipTap** - 富文本编辑器
- **React Hook Form + Zod** - 表单管理和验证

### 后端/数据库
- **NextAuth.js** - 身份验证解决方案
- **Supabase** - PostgreSQL 数据库和实时功能
- **Next.js API Routes** - 服务端 API

### 其他工具
- **react-pdf** - PDF 生成和导出
- **Prettier** - 代码格式化
- **ESLint** - 代码质量检查

## 📦 安装和运行

### 1. 克隆项目

```bash
git clone https://github.com/your-username/resuma.git
cd resuma
```

### 2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 3. 环境配置

复制环境变量模板并填入你的配置：

```bash
cp env.example .env.local
```

在 `.env.local` 中配置以下变量：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 数据库初始化

在 Supabase 数据库中执行 `database/schema.sql` 文件来创建必要的表结构：

```sql
-- 在 Supabase SQL Editor 中运行 database/schema.sql 的内容
```

### 5. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
resuma/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── api/               # API 路由
│   │   ├── auth/              # 认证相关页面
│   │   ├── dashboard/         # 用户仪表板
│   │   ├── editor/            # 简历编辑器
│   │   └── preview/           # 简历预览
│   ├── components/            # React 组件
│   │   ├── ui/               # 基础 UI 组件
│   │   ├── forms/            # 表单组件
│   │   ├── layout/           # 布局组件
│   │   ├── editor/           # 编辑器组件
│   │   └── resume/           # 简历相关组件
│   ├── lib/                   # 工具库和配置
│   │   ├── auth.ts           # 认证配置
│   │   ├── utils.ts          # 工具函数
│   │   └── supabase/         # Supabase 客户端
│   ├── store/                 # Zustand 状态管理
│   ├── types/                 # TypeScript 类型定义
│   └── hooks/                 # 自定义 React Hooks
├── database/
│   └── schema.sql             # 数据库初始化脚本
├── public/                    # 静态资源
└── 配置文件...
```

## 🔧 开发指南

### 代码规范

项目使用 ESLint 和 Prettier 确保代码质量：

```bash
# 代码检查
npm run lint

# 代码格式化
npm run format

# 类型检查
npm run type-check
```

### 构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

### 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署完成

## 🎨 自定义配置

### 主题配置

在 `tailwind.config.ts` 中自定义颜色主题：

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      // 更多颜色配置...
    },
  },
},
```

### 添加新模板

1. 在 `database/schema.sql` 中添加模板数据
2. 创建对应的模板组件
3. 在简历编辑器中集成新模板

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目！

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详细信息。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 组件库
- [Supabase](https://supabase.com/) - 后端服务
- [TipTap](https://tiptap.dev/) - 富文本编辑器

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [提交问题](https://github.com/your-username/resuma/issues)
- Email: your-email@example.com

---

**Resuma** - 让简历制作变得简单而专业 ✨