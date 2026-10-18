# release — 混淆发布副本

**这个目录是自动生成的，不要在这里手改。** 修改请回到 `src/` 和 `public/`，
然后重新执行 `python tools/make_release.py`。

## 构建

```bash
cd release
npm install
npm run build
```

## 这个副本做了什么

| 变换 | 说明 |
| --- | --- |
| 删除注释 | HTML、CSS、JS、Astro frontmatter 的注释全部清除 |
| 字符串转义 | 普通字符串字面量转成 `\xNN` / `\uNNNN`，中文与 URL 同样处理 |
| CSS 值改写 | `#ffffff` -> `#fff`，`0.5` -> `.5` 等等价写法 |
| 死代码散布 | 约 630 个 JS 变量、1090 个 TS 变量、260 条 CSS 规则，只落在语句边界 |

## 刻意保留明文的部分

转义这些会直接破坏构建或改变语义：

- **模块说明符** `import ... from '../layouts/BaseLayout.astro'`：打包器在构建期静态解析路径
- **`'use strict'`**：转义后不再是指令字面量，严格模式会静默失效
- **模板字面量**：反引号包裹的内容整体保留
- **二进制资源**：图片、音频原样复制
