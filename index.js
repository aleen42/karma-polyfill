module.exports = {
    'framework:polyfill' : ['factory', Object.assign(files => {
        files.unshift({
            pattern  : require.resolve('@aleen42/karma-polyfill/dist/index.min.js'),
            included : true,
            served   : true,
            watched  : false,
        });
    }, {$inject : ['config.files', 'config.polyfill']})],
};
