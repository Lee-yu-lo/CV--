# CHEN DESIGN · 叙事设计师网页

这是一个纯静态、数据驱动的单页简历 / 作品集页面，无需构建工具即可运行。

## 访问

提交到 GitHub Pages 后访问：

`https://lee-yu-lo.github.io/CV--/`

## 修改内容

打开 `index.html`，找到顶部的：

```html
<script type="application/json" id="resume-data">
```

只修改这段 JSON 中的文字、数组和联系方式即可。不要删除 JSON 的引号、逗号或大括号。

- `meta`：首页姓名、身份、地点、简介
- `nav`：导航文字
- `about`：关于我和统计信息
- `responsibilities.items`：职责卡片，可复制对象追加项目
- `tools.items`：软件工具列表，可追加工具名称
- `method.steps`：工作流程，可修改步骤标题和描述
- `contact`：联系 CTA、邮箱、页脚
- `ui`：加载文案、品牌名、菜单和底部辅助文字

## 文件说明

- `index.html`：语义化页面结构 + 顶部可编辑数据
- `styles.css`：纸色 / 墨色视觉系统、杂志排版、响应式布局与动效
- `script.js`：数据渲染、滚动渐显、加载动画、移动端菜单

页面使用 Google Fonts；如果访问环境无法加载字体，会自动回退到 Georgia、Arial 等系统字体。
