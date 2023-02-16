// The `console` will be null under IE8 when the devtool is closed
// https://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer

const console = (self.console = self.console || {});
// define undefined methods as noop to prevent errors
const noop = () => {};
// Union of Chrome, Firefox, IE, Opera, and Safari console methods
const methods = ['assert', 'cd', 'clear', 'count', 'countReset',
                 'dir', 'dirxml', 'exception', 'group', 'groupCollapsed',
                 'groupEnd', 'markTimeline', 'profile', 'profileEnd',
                 'select', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline',
                 'timelineEnd',
];

['log', 'debug', 'info', 'warn', 'error'].forEach(method => {
    if (console[method] instanceof Function && (() => {
        // IE11 will throw an error when try to call a holding `console[method]`
        const o = console[method];
        try {
            o('1');
            return true;
        } catch (ignore) { return false; }
    })()) {
        // just fine
    } else if (console[method] == null) {
        console[method] = console.log || noop;
    } else {
        // IE problem: console.log.call(...) not works  (what typeof console.log === 'object')
        console[method] = Function.prototype.call.bind(console[method], console);
    }
});

methods.forEach(method => {
    if (console[method] == null) {
        console[method] = noop;
    }
});
