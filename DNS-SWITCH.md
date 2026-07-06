# ── DNS 切换 —— 让 ci.geodriv.com 指向 GitHub Pages ──
# ci.geodriv.com 是子域名 → 用 CNAME 记录

登录 DNSPod（或你的域名注册商）：
1. 找到 ci.geodriv.com 的 DNS 管理
2. 添加或修改以下 DNS 记录：

| Type  | Name (主机记录) | Value (记录值)                    | TTL |
|-------|----------------|-----------------------------------|-----|
| CNAME | ci             | johnny10bj-creator.github.io.     | 600 |

3. 保存并等待生效（通常几分钟）

验证生效方式：
```bash
dig ci.geodriv.com CNAME +short
# 期望返回: johnny10bj-creator.github.io.
```
或浏览器打开 https://ci.geodriv.com/blog/ 确认能看到博客列表页

旧服务器上的 nginx 可以在 DNS 切换确认后关闭。
