## 准备依赖
会用到 [node](https://nodejs.org/en/), [git](https://git-scm.com/). 项目是以如下标准为基础的[ES2015+](https://es6.ruanyifeng.com/)、[Vue.Js](https://vuejs.org/)、[Vuex](https://vuex.vuejs.org/)、[Vue-Router](https://router.vuejs.org/)、[antv-x6](https://x6.antv.vision/zh) 和 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/).

## 服务开始
```bash
# enter the project directory
cd primihub-webconsole

# install dependency
npm install

# develop
npm run dev
```

运行后会弹出以下链接 http://localhost:8080

## 构建服务

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## 浏览器支持
当前大部分浏览器和ie 10+.

<html>
 <head></head>
 <body>
  <table>
   <thead>
    <tr>
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />IE / Edge</th> 
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/firefox_48x48.png" alt="Firefox" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />Firefox</th> 
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/chrome_48x48.png" alt="Chrome" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />Chrome</th> 
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/safari_48x48.png" alt="Safari" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />Safari</th>
    </tr>
   </thead> 
   <tbody>
    <tr>
     <td>IE10, IE11, Edge</td> 
     <td>last 2 versions</td> 
     <td>last 2 versions</td> 
     <td>last 2 versions</td>
    </tr>
   </tbody>
  </table>
 </body>
</html>

