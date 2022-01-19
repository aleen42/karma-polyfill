require('core-js/stable');
require('@babel/polyfill');

function overwrite(Fn, cb) {
    function CLS() { return cb(Fn, this, arguments); }
    // Keep the same prototype
    CLS.prototype = Fn.prototype;

    // Keep static methods
    Object.getOwnPropertyNames(Fn).forEach(i => {
        try {
            if (({}).toString.call(Fn[i]) === '[object Function]') {
                CLS[i] = Fn[i];
            }
        } catch { return false; }
    });

    return CLS;
}

// a patch for jasmine under IE9- to avoid NPE
// REF: https://github.com/jasmine/jasmine/pull/1953
(() => {
    try { throw new Error(); } catch (e) { return !e.stack; }
})() && (window.Error = overwrite(Error, (Fn, context, args) => {
    const err = Fn.apply(context, args);
    err.stack || (err.stack = 'Unknown Error Stack\n    at errorWithStack (unknown)\n    at callerFile (unknown)');
    return err;
}));
