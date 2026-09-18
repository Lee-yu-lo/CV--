# CHEN DESIGN 风格动态简历

这是一个数据驱动的叙事设计师个人简历 / 作品集静态网页。

## 文件结构

- `index.html`：语义化页面结构，以及顶部的可编辑简历数据区
- `styles.css`：响应式视觉样式、布局与微交互
- `script.js`：数据渲染、滚动显现、移动端菜单与加载动画

## 如何修改内容

打开 `index.html`，找到：

```html
<script type="application/json" id="resume-data">
```

只修改这个 JSON 对象中的内容即可更新页面：

- `meta`：姓名、职位、简介、所在地和合作状态
- `about`：关于我和统计信息
- `responsibilities.items`：职责方向卡片
- `tools.items`：工具列表，可替换为 Figma、Adobe Creative Suite、Blender、Procreate 等
- `method.steps`：叙事设计工作流步骤
- `contact`：邮箱、联系文案和页脚

修改数组中的对象可以增加或减少列表项，不需要改动页面结构或 JavaScript。

## 本地预览

直接用浏览器打开 `index.html` 即可预览。若使用 VS Code，可通过 Live Server 启动本地服务。

## 发布

仓库启用 GitHub Pages 后，页面可通过以下地址访问：

`https://lee-yu-lo.github.io/CV--/`
