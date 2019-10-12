# 项目介绍

这是从0开始配置的项目，webpack的配置是基于 tc_aciton 项目，所以需要 npm 安装对应的依赖。

## 第32节，创建项目

### 1，从0开始手动构建项目，

1，先安装react的依赖，和对应的声明文件
```
npm i react react-dom

npm i @types/react @types/react-dom -D
```

2，更改tsconfig.json配置项
```
{
  "compilerOptions": {
    // 3个值，
    // preserve：生成的代码保留jsx的格式，文件的扩展名是 jsx，这就可以被后续的转换操作继续使用，比如可以传递给 babel
    // react-native，生成的代码保留jsx的格式，文件的扩展名是 js
    // react，生成的代码不保留jsx的格式，而是纯的 js 语法，文件的扩展名是 js
    "jsx": "react",
  }
}
```

3，编写组件的问题

index.ts -> index.tsx，因为要使用react的语法，并且对应的webpack的入口文件也要改。


4，优化react的打包

因为react的包是很大的，一般情况下，库文件和业务文件会进行拆分，可以充分利用浏览器的缓存。

```
// entry: './src/index.tsx',
// 改为如下：
entry: {
    'app': './src/index.tsx',
},

output: {
    // filename: 'app.js'
    filename: '[name].[chunkhash:8].js'
},

// webpack的拆包，基于webpack4
// 这个配置，默认会将node-mudules中的包抽离出来，单独进行打包。
optimization: {
    splitChunks: {
        chunks: 'all'
    }
}
```

经过以上配置后，运行 `npm run build` ，

会在 dist 目录下打包出 vendors.xxx.js文件（库代码），和 app.xxx.js (业务代码)。

之后，如果只改变了业务代码，再次打包时，库代码并没有发生变化，可以充分的利用浏览器的缓存。

---

### 2，使用create-react-app 脚手架工具构建项目

npx命令，

可以避免全局安装，这样在装脚手架时，可以临时的下载到一个目录下，使用完脚手架，再删除。

这样可以保证安装的脚手架，总是最新的版本。

回到上级目录，使用下面的命令创建项目（新项目 ts_react_app 的要点，写在了对应的 README.md 文件中。）
```
// ts_react_app是项目名
// --typescript，基于 typescript 创建工程
npx create-react-app ts_react_app --typescript
```

### 3，使用npx遇到的问题，

系统环境为 Windows10

在执行上面的 npx 命令时，报错：
```
Could not install from "Files\nodejs\node_cache\_npx\12084" as it does not contain a package.json file.
```

在网上找到原因是因为，当初在安装 node.js 时，默认安装在了C盘的 Programm Files 文件夹中，

因为 Programm Files 中间有个空格，所以 node_cache所在的文件路径包含空格，导致的报错。

下面的命令，可查看node的cache所在路径。
```
npm config list
```

解决：[参考](https://blog.csdn.net/winne_shen/article/details/83686840)

更改node的cache所在路径即可。

这里重新指定了路径之后，npx 命令就可以正常使用了。
```
npm config set cache "C:\ProgramNodejs\nodejs\node_cache"
```

--- 

课程后半段接 [ts_react_app 项目](https://github.com/crane0/ts_react_app)