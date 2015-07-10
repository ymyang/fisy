/**
 * Created by yang on 2015/7/10.
 */
// 设置图片合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 20);
fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);

//如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
//否则png图片透明部分在ie下会显示灰色背景
//使用spmx release命令时，添加--optimize或-o参数即可生效
//fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用pure release命令时，添加--lint或-l参数即可生效
fis.config.set('settings.lint.jshint.ignored', [ 'lib/**', /jquery|backbone|underscore/i ]);

// 开启simple插件
fis.config.set('modules.postpackager', 'simple');

// 设置打包规则
fis.config.set('pack', {
    '/pkg/lib.js': [
        'js/lib/jquery.js',
        'js/lib/underscore.js',
        'js/lib/backbone.js',
        'js/lib/backbone.localStorage.js',
    ],
    // 设置CSS打包规则，CSS打包的同时会进行图片合并
    '/pkg/aio.css': '**.css'
});

fis.config.set('modules.preprocessor.js', 'annotate');
// 开启simple对零散资源的自动合并
 fis.config.set('settings.postpackager.simple.autoCombine', true);