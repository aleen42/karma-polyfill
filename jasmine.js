module.exports = {
    'framework:jasmine-polyfill' : ['factory', Object.assign(files => {
        require('karma-jasmine')['framework:jasmine'][1](files);
        (files.find(({pattern}) => /jasmine-core\/jasmine\.js/.test(pattern)) || 0).pattern
            = require.resolve('@aleen42/karma-polyfill/dist/jasmine.min.js');
        return files;
    }, {$inject : ['config.files']})],
};
