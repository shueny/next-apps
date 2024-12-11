---
title: Related Issues with Next.js
slug: next-js
description: Related Issues Encountered with Next.js.
tag: 'Next.js, React'
date: '2024-12-11'
---
# Next.js
## Module not found: Can't resolve 'fs'

在Next.js應用程式中，當您嘗試在客戶端程式碼中使用`fs`（檔案系統）模組時，會遇到「module not found」錯誤。這是因為`fs`模組是Node.js的內建模組，僅在伺服器端環境中可用。在客戶端瀏覽器環境中，`fs`模組不可用，因此Next.js在編譯客戶端程式碼時會拋出錯誤。

要解決這個問題，您可以在`next.config.js`中修改Webpack配置，將`fs`模組設定為`false`，以告知Webpack不要嘗試在客戶端程式碼中解析`fs`模組。這樣，Webpack就會將`fs`模組的所有參考替換為一個空對象，從而避免了模組未找到的錯誤。

需要注意的是，這種方法僅解決了客戶端程式碼中的“module not found”錯誤。您仍然需要確保不在客戶端程式碼中使用`fs`模組的任何功能。為了避免在客戶端程式碼中使用`fs`模組，您應該將`fs`模組的使用限制在伺服器端程式碼中，例如在`getStaticProps`或`getServerSideProps`函數中。


---
### Reference
1. [Module not found: Can't resolve 'fs' in Next.js application](https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application)
2. [Beginner - Next JS. 'fs' module not found issue. #12124](https://github.com/vercel/next.js/discussions/12124)
3. [常见问题](https://next.gujiakai.top/solutions.html)
