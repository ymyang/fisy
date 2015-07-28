fis.config.merge({
    urlPrefix: '',

    project: { charset: 'utf8'},

    roadmap: {
        path: [
            {
                reg: /^\/app\/components\/(.*)\/([\w\-_\.]*)\.(js)$/i,
                isMod: true,
                useSprite: false,
                useOptimizer: false,
                id: '$2'
            },
            {
                reg: /^\/app\/js\/(.*)\.(js|coffee)$/i,
                //是组件化的，会被jswrapper包装
                isMod: true,
                useSprite: false,
                isAngular: true,
                //id是去掉sea-modules和.js后缀中间的部分
                id: '$1',
                //url: '/yliyun/sea-modules/app/$1.$2',
                //release: '/app/js/$1.$2'
            },
            {
                //.mixin.less后缀的文件
                reg: /\.mixin\.less$/,
                //仅当做函数调用，不发布
                release: false
            },
            {
                //其他js、css、coffee、less文件
                reg: /\.(js|coffee|css|less)$/,
                //less和css文件会做csssprite处理
                useSprite: true,
                //不要放到js资源表里
                useMap: false
            },
            {
                //sea-modules目录下的其他文件
                reg: /^\/app\/js\/(.*)\.tpl$/i,
                isMod: false,
                useSprite: false,
                isHbsFile: true,
                isHtmlLike: true,
                release: false
            },
            {
                reg: /^\/app\/pages\/(.*)\.html/i,
                useMap: false,
                useCache: false
                //release: '/app/$1.html'
            },
            {
                //前端模板
                reg: '**.tmpl',
                //当做类js文件处理，可以识别__inline, __uri等资源定位标识
                isJsLike: true,
                //只是内嵌，不用发布
                release: false
            }
        ],
        ext: {
            //less输出为css文件
            less: 'css',
            //coffee输出为js文件
            coffee: 'js',
            // tpl 编译为js模版函数
            tpl: 'js'
        }
    },

    modules: {//fis插件配置
        parser: {
            //.tmpl后缀的文件使用fis-parser-utc插件编译
            tmpl: 'utc',
            //.coffee后缀的文件使用fis-parser-coffee-script插件编译
            coffee: 'coffee-script',
            //.less后缀的文件使用fis-parser-less插件编译
            less: 'less'
        },

        postprocessor: {
            js: ['jswrapper', 'require-async']
        },

        lint: {
            js: 'jshint'
        },

        postpackager: ['modjs', 'autoload', 'simple'],

        optimizer: {
            js: ['ng-annotate', 'uglify-js'],
            css: 'clean-css',
            png: 'png-compressor'
        }
    },

    settings: {
        parser: {
            'coffee-script': {
                //不用coffee-script包装作用域
                bare: true
            }
        },
        //lint: {
        //    jshint: {
        //        //排除对lib和jquery、backbone、underscore的检查
        //        ignored: ['app/components/**', /jquery|backbone|underscore|\$|bootstrap/i],
        //        //使用中文报错
        //        i18n: 'zh-CN'
        //    }
        //},
        postprocessor: {
            jswrapper: {
                //用fis的js包装器，更方便书写
                type: 'amd'
            }
        },
        postpackager: {
            modjs: {
                subpath: 'pack/map.js'
            }
        }
    }
});
