/*
 * fis 模块入口
 */

var fis = module.exports = require('fis3');
fis.require.prefixes.unshift('fisy');
fis.cli.name = 'fisy';
fis.cli.info = require('./package.json');


fis.config.set("project.watch.usePolling", true);
fis.set('prefix', '');
//fis.hook('relative');
//fis.hook('cmd');
fis.hook('module', {
    mode: 'amd' // 模块化支持 amd 规范，适应 require.js
});

/*************************目录规范*****************************/
fis.match('*', {
    relative: false,
    useHash: false,
    useDomain: false,
    domain: false,
    release: false,
    useSprite: false,
    __RESOURCE_MAP: true
})
    .match('/app/libs/**.js', {
        isMod: false,
        release: '${prefix}/$&'
    })
    .match('/app/components/**/(*).js', {
        isMod: true,
        id: '$1',
        release: '${prefix}/$&',
        postprocessor: fis.plugin('jswrapper', {
            type: 'amd',
            wrapAll: true
        })
    })
    .match('/app/js/(**).js', {
        isMod: true,
        isAngular: true,
        //useHash: true,
        id: '$1',
        release: '${prefix}/$&',
        postprocessor: fis.plugin('jswrapper', {
            type: 'amd',
            wrapAll: true
        })
    })
    .match('/app/css/**.{css,less}', {
        release: '${prefix}/$&'
    })
    .match('/app/css/**.less', {
        rExt: '.css',
        parser: fis.plugin('less')
    })
    .match('/app/css/fonts/*.*', {
        release: '${prefix}/$&'
    })
    .match('/app/pages/(*.html)', {
        useCache: false,
        release: '${prefix}/$1'
    });

fis.match('::packager', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

fis.media('prod')
    .match('/app/libs/**.js', {
        useHash: true,
        optimizer: fis.plugin('uglify-js'),
        //packTo: '/js/libs.min.js'
    })
    .match('/app/components/**.js', {
        useHash: true,
        optimizer: fis.plugin('uglify-js'),
        //packTo: '/js/components.min.js'
    })
    .match('/app/js/**.js', {
        useHash: true,
        preprocessor: fis.plugin('annotate'),
        optimizer: fis.plugin('uglify-js'),
        //packTo: '/js/main.min.js'
    })
    .match('/app/css/**.{css,less}', {
        useSprite: true,
        useHash: true,
        optimizer: fis.plugin('clean-css')
    })
    .match('/app/css/fonts/*.*', {
        useHash: true
    });