fis.config.merge({
    urlPrefix: '',

    project: {
        include: 'app/**'
    },

    // fis插件配置
    modules: {
        // 配置编译器插件，将非标准语言编译成标准的html、js、css语言
        parser: {
            //.less后缀的文件使用fis-parser-less插件编译
            less: 'less'
        },

        // 在fis对js、css和类html文件进行语言能力扩展之后调用的插件配置，
        // 可以根据 文件后缀 对文件进行后处理。
        // 该阶段的插件可以获取文件对象的完整requires信息
        postprocessor: {
            js: ['jswrapper', 'require-async']
        },

        // 单文件编译过程中的代码检查插件
        lint: {
            js: 'jshint'
        },

        // 单文件编译过程中的最后阶段，对文件进行优化
        optimizer: {
            js: ['ng-annotate', 'uglify-js'],
            css: 'clean-css',
            png: 'png-compressor'
        },

        // 打包处理插件
        postpackager: ['modjs'],

        // 打包后处理csssprite的插件
        spriter: 'csssprites'
    },

    settings: {

        postprocessor: {
            jswrapper: {
                //用fis的js包装器，更方便书写
                type: 'amd'
            }
        },

        lint: {
            jshint: {
                //排除对lib和jquery、backbone、underscore的检查
                ignored: ['app/components/**', 'app/libs/**']
            }
        },

        postpackager: {
            modjs: {
                subpath: 'pack/map.js'
            }
        },

        spriter: {
            csssprites: {
                // 图之间的边距
                margin: 10,
                // 使用矩阵排列方式，默认为线性`linear`
                layout: 'matrix'
            }
        }
    },

    roadmap: {
        path: [
            {
                // modjs
                reg: /^\/app\/libs\/(.*)\.js$/i,
                //是组件化的，会被jswrapper包装
                isMod: false,
                useLint: false,
                useMap: false
            },
            {
                // 第三方库
                reg: /^\/app\/components\/(.*)\/([\w\-_\.]*)\.(js)$/i,
                isMod: true,
                useLint: false,
                id: '$2'
            },
            {
                // js文件
                reg: /^\/app\/js\/(.*)\.js$/i,
                //是组件化的，会被jswrapper包装
                isMod: true,
                isAngular: true,
                id: '$1',
            },
            {
                // css文件
                reg: /^\/app\/css\/(.*)\.css$/,
                //css文件会做csssprite处理
                useSprite: true,
                //不要放到js资源表里
                useMap: false
            },
            {
                // html模板文件
                reg: /^\/app\/js\/(.*)\.html$/,
                isMod: false,
                useSprite: false,
                isHbsFile: true,
                isHtmlLike: true,
                release: false
            },
            {
                // html文件
                reg: /^\/app\/pages\/(.*)\.html/,
                useMap: false,
                useCache: false ,
                release: '/app/$1.html'
            }

        ],
        ext: {
            //less输出为css文件
            less: 'css'
        }
    },

    pack: {
        'pack/lib.js': ['app/libs/**.js', 'app/components/**.js'],
        'pack/common.js': ['app/js/common/**.js'],
        'pack/login.js': ['app/js/login/**.js'],
        'pack/home.js': ['app/js/home/**.js']
    }
});

