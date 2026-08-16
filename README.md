# Aria — Personal Homepage

## GitHub Pages 部署指南

### 方式一：直接部署（推荐）

1. **创建新的 GitHub 仓库**
   - 在 GitHub 上创建新仓库，例如 `aria-homepage`

2. **上传文件**
   将本文件夹内所有文件上传到仓库的 `main` 分支：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/aria-homepage.git
   git push -u origin main
   ```

3. **开启 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 首次推送后会自动触发部署

4. **访问网站**
   - 部署完成后，通过 `https://你的用户名.github.io/aria-homepage` 访问

### 方式二：从源码构建部署

如果以后需要修改源码重新构建，请使用项目根目录的原始文件，修改后运行：

```bash
npm install
npm run build
```

然后将 `dist` 目录内容上传到仓库即可。

---

**注意**：当前 `dist` 文件使用相对路径 `./`，适配 GitHub Pages 项目页面部署。如果部署到自定义域名，需将 `vite.config.ts` 中的 `base` 改为 `base: '/'` 后重新构建。
