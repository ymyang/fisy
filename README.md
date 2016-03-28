![](https://raw.githubusercontent.com/fex-team/fis3/master/doc/logo.png)

# FIS3
![](https://img.shields.io/npm/v/fis3.svg) ![](https://img.shields.io/npm/dm/fis3.svg)
[![Build Status](https://travis-ci.org/fex-team/fis3.svg?branch=master)](https://travis-ci.org/fex-team/fis3)
[![Coverage Status](https://coveralls.io/repos/fex-team/fis3/badge.svg?branch=master&service=github)](https://coveralls.io/github/fex-team/fis3?branch=master)

FIS3 面向**前端**的**工程构建系统**。解决前端工程中性能优化、资源加载（异步、同步、按需、预加载、依赖管理、合并、内嵌）、模块化开发、自动化工具、开发规范、代码部署等问题。

> 如果对FIS先有些了解，但理解不深的，可试着带着这句话去看文档 <br>
> FIS3 会在配置文件中给文件添加相应属性，用于控制文件的编译、合并等各种操作；文件属性包括基本属性和插件属性，[详细请参考](https://github.com/fex-team/fis3/blob/master/doc/docs/api/config-props.md#文件属性)

```
npm install -g fisy
```

## 文档

快速入门、配置、插件开发以及原理等文档 [doc/docs/INDEX.md](doc/docs/INDEX.md)

## 例子

*fis-conf.js 的例子*

```js
// default settings. fisy release

// Global start
fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

fis.match('*.js', {
  optimizer: fis.plugin('uglify-js') // js 压缩
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css') // css 压缩
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor') // png 图片压缩
});

// Global end

// default media is `dev`
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  });

// extends GLOBAL config
fis.media('production');
```


## 命令

通过以下命令查看 FIS3 提供了哪些命令。

```bash
~ fisy -h

[INFO] Currently running fisy (/usr/local/lib/node_modules/fis3/)

 Usage: fisy <command>

 Commands:

   init                     scaffold with specifed template.
   install                  install components
   release [media name]     build and deploy your project
   server                   launch a php-cgi server
   inspect [media name]     inspect the result of fis.match

 Options:

   -h, --help                print this help message
   -v, --version             print product version and exit
   -r, --root <path>         specify project root
   -f, --file <filename>     specify the file path of `fis-conf.js`
   --no-color                disable colored output
   --verbose                 enable verbose mode
```

通过帮助信息，不难发现 FIS3 默认内置了命令 `release`、`install`、`init`、`server`、`inspect`等命令，这些命令都是 FIS `fis-command-*` 插件提供，通过

```bash
fisy <command>
```

来调用，详见以下文档介绍内置的命令。

### release

> `fisy-command-release` 插件提供，默认内置

编译发布一个 FIS3 项目

```bash
$ fisy release -h

 [INFO] Currently running fisy (/usr/local/lib/node_modules/fis3/)

 Usage: fisy release [media name]

 Options:

   -h, --help            print this help message
   -d, --dest <path>     release output destination
   -l, --lint            with lint
   -w, --watch           monitor the changes of project
   -L, --live            automatically reload your browser
   -c, --clean           clean compile cache
   -u, --unique          use unique compile caching
```

添加 `-h` 或者 `--help` 参数可以看到如上帮助信息，其中标明此命令有哪些参数并且起到什么作用。

- `-h`、`--help` 打印帮助信息
- `-d`、`--dest` 编译产出到一个特定的目录

  ```
  fisy release -d ./output
  ```
  发布到当前命令执行目录下的 `./output` 目录下。

  ```
  fisy release -d ../output
  ```
  发布到当前命令执行目录服目录的 `../output` 目录下, 即上一级的 `output` 目录。

- `-l`, `--lint` 启用文件格式检测

  ```
  fis3 release -l
  ```

  默认 `fisy release` 不会启用 lint 过程，只有通过命令行参数指定了才会开启。

- `-w`、`--watch` 启动文件监听

  ```
  fisy release -w
  ```

  会启动文件监听功能，当文件变化时会编译发布变化了的文件以及依赖它的文件。加了此参数，命令不会马上退出，而是常驻且监听文件变化，并按需再次执行。想停止命令需要使用快捷键 <kbd>CTRL</kbd>+<kbd>c</kbd> 来强制停止。

- `-L`、`--live` 启动 `livereload` 功能

  ```
  fisy release -L
  ```

  `livereload` 功能应该跟 `watch` 功能一起使用（`-w` 在开启 `liveload` 的前提下，自动开启），当某文档做了修改时，会自动刷新页面。

- `-c`, `--clean` 清除编译缓存

  ```
  fisy release -c
  ```

  默认 fis 的每次编译都会检测编译缓存是否有效，如果有效 fis 是不会重复编译的。开启此选项后，fis 编译前会做一次缓存清理。

- `-u`, `--unique` 启用独立缓存

  为了防止多个项目同时编译时缓存文件混乱，启用此选项后，会使用独立的缓存文件夹。一般用于编译机。


### server

> `fis-command-server` 插件提供，默认内置

fis3 内置了一个小型 web server, 可以通过 `fis3 server start` 快速开启。如果一切正常，开启后它将自动弹出浏览器打开 `http://127.0.0.1:8080/`。

需要说明的是，fis3 自带的 server 默认是通过 java 内嵌 jetty 然后桥接 php-cgi 的方式运行的。所以，要求用户机器上必须安装有 jre 和 php-cgi 程序。

另外, fis server 是后台进行运行的，不会随着进程的结束而停止。如果想停止该服务器，请使用 `fis3 server stop` 进行关闭。

更多说明请参考命令行使用说明。

```bash
$ fisy server --help

 [INFO] Currently running fisy (/usr/local/lib/node_modules/fis3/)

  Usage: server <command> [options]

  Commands:

    start                  start server
    stop                   shutdown server
    restart                restart server
    info                   output server info
    open                   open document root directory
    clean                  clean files in document root
    install <name>         install server framework

  Options:

    -h, --help                     output usage information
    -p, --port <int>               server listen port
    --root <path>                  document root
    --type <php|java|node>         process language
    --rewrite [script]             enable rewrite mode
    --repos <url>                  install repository
    --timeout <seconds>            start timeout
    --php_exec <path>              path to php-cgi executable file
    --php_exec_args <args>         php-cgi arguments
    --php_fcgi_children <int>      the number of php-cgi processes
    --php_fcgi_max_requests <int>  the max number of requests
    --registry <registry>          set npm registry
    --include <glob>               clean include filter
    --exclude <glob>               clean exclude filter
    --https                        start https server

```
