# Cloudflare 迁移指南

## 前置条件

1. 已有 Cloudflare 账号？ ➔ 登录 https://dash.cloudflare.com
2. 无账号 ➔ 注册（免费，5min）

## Step 1: 创建 Cloudflare Pages 项目

1. 登录 Cloudflare Dashboard → **Workers & Pages** → **Pages** → **Connect to Git**
2. 点击 **Connect to GitHub**
3. 授权访问 `johnny10bj-creator/GEODRIV` 仓库
4. 设置：
   - **Project name**: `geodriv-ci`
   - **Production branch**: `main`
   - **Build command**: (留空 — 纯静态HTML，无构建步骤)
   - **Build output**: `./`
   - **Root directory**: (留空)
5. 点击 **Save and Deploy**
6. 等待部署完成 → 会得到一个 `<project>.pages.dev` 地址

## Step 2: 创建 Workers（API 代理）

创建两个 Workers，代码已在本仓库 `workers/` 目录下

### Worker 1: feiye-api

1. Cloudflare Dashboard → **Workers & Pages** → **Workers** → **Create** → **Create Worker**
2. 名称输入 `feiye-api`
3. 代码编辑器 → 清空 → 复制 `workers/feiye-api.js` 内容粘贴 → **Save and Deploy**

### Worker 2: aerospace-api

1. 重复上述步骤，名称 `aerospace-api`
2. 复制 `workers/aerospace-api.js` → **Save and Deploy**

### 配置路由

1. Cloudflare Dashboard → **Workers & Pages** → 选择 `feiye-api` → **Triggers** → **Routes**
2. 添加路由：`ci.geodriv.com/feiye/api/dify/*` → Worker: `feiye-api` → 保存
3. 添加路由：`ci.geodriv.com/aerospace/api/*` → Worker: `aerospace-api` → 保存

## Step 3: 配置自定义域名

1. Cloudflare Dashboard → **Workers & Pages** → **Pages** → **geodriv-ci**
2. **Custom domains** → **Set up custom domain**
3. 输入 `ci.geodriv.com` → **Continue** → **Activate domain**

## Step 4: 迁移 DNS

1. Cloudflare Dashboard → 上方切换域名 → **Add site**
2. 输入 `ci.geodriv.com` → **Add site**
3. 选择 **Free** 计划
4. 自动扫描现有 DNS 记录

### 必须手动添加的 DNS 记录：
```
Type    Name            Content/Target                  TTL
CNAME   @ (root)        geodriv-ci.pages.dev            Auto
CNAME   www             geodriv-ci.pages.dev            Auto
```

### 可选旧记录（如不需要可跳过）：
```
Type    Name            Content
A       @               (旧服务器IP — 迁移后可删除)
```

5. 点击 **Continue**
6. Cloudflare 会给你两个 nameservers（如 `nancy.ns.cloudflare.com`, `john.ns.cloudflare.com`）

### 在域名注册商处修改 NS

登录 **DNSPod**（或您的域名注册商）：
- 找到 `ci.geodriv.com` 的 DNS 管理
- 将 nameservers 修改为 Cloudflare 给的 2 个
- 保存

> 全球 DNS 生效需要 **5 min – 24h**（通常 <30min）

## Step 5: 验证

部署完成后测试：

| 路径 | 预期结果 | 测试命令 |
|------|---------|---------|
| `https://ci.geodriv.com/` | 主站首页 | `curl -sI https://ci.geodriv.com/` |
| `https://ci.geodriv.com/feiye/` | 飞叶情报 | `curl -sI https://ci.geodriv.com/feiye/` |
| `https://ci.geodriv.com/aerospace/` | 航天情报 | `curl -sI https://ci.geodriv.com/aerospace/` |
| `https://ci.geodriv.com/blog/` | 博客列表页 | `curl -sI https://ci.geodriv.com/blog/` |

> 💡 测试时加上 `-H "Host: ci.geodriv.com"` 可绕过 DNS 缓存直接测试 CF

## 常见问题

**Q: 博客文章多了怎么办？**
A: Cloudflare Pages 纯静态，新增 HTML 文件后 push 到 GitHub 即自动部署。想升级到 SSG（如 Astro）随时可以。

**Q: Workers 免费额度够吗？**
A: 每天 10万请求，对个人 CI 网站绰绰有余。

**Q: 旧服务器上的 nginx 何时关？**
A: 确认 CF 上线后，SSH 进旧服务器关掉 nginx 即可。
