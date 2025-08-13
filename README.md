這是一個為朋友製作的美容網站，採用 **React + Astro + Tailwind CSS** 開發。  
主要透過 **Astro** 生成靜態網站，並使用 **Tailwind CSS** 進行快速且響應式的切版。

## ✨ 專案特色
- **Astro**：高效生成靜態頁面，優化載入速度與 SEO 表現
- **React**：處理互動式元件與動態 UI
- **Tailwind CSS**：快速切版，保證設計一致性與 RWD 響應式效果
- **響應式設計**：支援桌面與行動裝置
- **完整部署流程**：從購買網域到正式上線

## 🌐 正式網站
可在正式網域上瀏覽：[https://home-spa.com.tw/](https://home-spa.com.tw/)

## 🛠 使用技術
- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📦 部署流程
1. **購買網域**  
   - 使用 [GoDaddy](https://www.godaddy.com/) 購買 `home-spa.com.tw`
2. **設定 GitHub Pages**  
   - 將專案推送到 GitHub
   - 在專案的 **Settings → Pages** 設定部署來源為 `main` 分支的 `/dist`（Astro build 輸出資料夾）
3. **網域綁定**  
   - 在 GoDaddy 後台將 DNS A 記錄與 CNAME 指向 GitHub Pages  
   - 在專案根目錄新增 `CNAME` 檔案，內容為 `home-spa.com.tw`
4. **上線完成**  
   - 網站可透過正式網域訪問