# 捞柑 App · 部署说明

这是一个用 React + Vite 搭建的前端原型。所有数据都是模拟的（刷新会重置），
适合用来展示界面、给人试玩、验证产品玩法。等需要真实注册和数据保存时，
再接 Supabase 后端（见最后一节）。

---

## 一、本地预览（可选，电脑上先看看）

需要先装 Node.js（https://nodejs.org ，选 LTS 版）。然后在项目文件夹里打开终端：

    npm install      # 第一次需要，安装依赖
    npm run dev       # 启动本地预览

终端会显示一个网址（通常 http://localhost:5173 ），用浏览器打开就能看到。

---

## 二、传上 GitHub

1. 注册 GitHub 账号：https://github.com
2. 点右上角 “+” → New repository，起个名字（例如 laogan-app），创建。
3. 把这个文件夹里的所有文件上传上去。两种方式任选：
   - 简单方式：在仓库页面点 “uploading an existing file”，把文件拖进去。
     注意：**不要**上传 node_modules 和 dist 文件夹（.gitignore 已帮你排除，
     如果你是手动拖拽，请跳过这两个文件夹，它们很大且不需要）。
   - 命令行方式（装了 git 的话）：
         git init
         git add .
         git commit -m "first commit"
         git branch -M main
         git remote add origin 你的仓库地址
         git push -u origin main

---

## 三、部署到 Vercel（上线）

1. 打开 https://vercel.com ，用 GitHub 账号登录。
2. 点 “Add New” → “Project”，选中刚才那个 GitHub 仓库，点 Import。
3. Vercel 会自动识别这是 Vite 项目，**所有设置保持默认即可**，直接点 Deploy。
4. 等一两分钟，部署完成，会给你一个网址（类似 laogan-app.vercel.app）。
   这时全世界都能打开了，https 已自动配好。

之后每次你更新 GitHub 上的代码，Vercel 会自动重新部署，不用手动操作。

---

## 四、绑定自己的域名（可选）

1. 注册一个域名（.com 在 Namecheap / Cloudflare，一年约 RM50–70）。
2. 在 Vercel 项目里 → Settings → Domains，输入你的域名，按页面提示
   去域名商后台改一下解析记录（DNS）。
3. 等十几分钟生效，就能用 yourbrand.com 访问了。

---

## 五、之后要做成真产品（接后端）

当前版本是纯前端、数据是假的。要让用户真能注册、捞柑、聊天、数据真实保存，
需要接 Supabase（https://supabase.com）：
- 建数据库表（用户、柑、动态、消息等）
- 开启邮箱注册登录
- 把代码里的模拟数据换成真实读写

这部分是开发工作，需要会写代码的人来做。做好后，前端部署方式跟上面完全一样。

---

## 技术栈
- React 18 + Vite 5
- Tailwind CSS 3
- lucide-react（图标）
