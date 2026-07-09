# DNS 切换 —— geodriv.com → GitHub Pages

## 方案 1：CNAME 记录（优先）

登录 DNSPod，确认已添加 `geodriv.com` 域名后：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|-------|-----|
| CNAME | **留空** 或 **@** 或 **geodriv.com** 看哪个能提交 | johnny10bj-creator.github.io | 600 |

如果提示「与其他记录冲突」，或者「ci」不让写，用方案 2。

## 方案 2：A 记录（GitHub Pages IP）

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|-------|-----|
| A | 留空 | 185.199.108.153 | 600 |
| A | 留空 | 185.199.109.153 | 600 |
| A | 留空 | 185.199.110.153 | 600 |
| A | 留空 | 185.199.111.153 | 600 |

## 验证

```bash
nslookup geodriv.com
# 应返回 185.199.x.x (GitHub Pages IPs)
```
或浏览器打开 https://geodriv.com/CI-blog/ 确认页面正常。
