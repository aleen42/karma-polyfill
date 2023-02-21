## karma-polyfill

Load patches for Jasmine, or polyfills like `core-js/stable` and `@babel/polyfill`, before running Karma tests.

### Usage

1. Install the plugin with `npm`:

    ```bash
    npm install @aleen42/karma-polyfill --save-dev
    ```

2. Configure Karma to load the plugin as a framework:

    ```js
    // karma.config.js 
    module.exports = config => {
        config.set({
            frameworks : [
                'jasmine',
                'polyfill',
                // ...
            ],
            plugins    : [
                'karma-jasmine',
                '@aleen42/karma-polyfill',
                // ...
            ],
            // ...
        });
    };
    ```
   
3. If you want to test under IE7 / IE8, you may need the shimmed Jasmine framework:

    ```diff
    // karma.config.js 
    module.exports = config => {
        config.set({
            frameworks : [
    -           'jasmine',
    +           'jasmine-polyfill',
                'polyfill',
                // ...
            ],
            plugins    : [
    -           'karma-jasmine',
    +           '@aleen42/karma-polyfill/jasmine',
                '@aleen42/karma-polyfill',
                // ...
            ],
            // ...
        });
    };
    ```

### Release History

* ==================== **1.0.0 Initial release** ====================
    * 1.0.1 shims for Karma and Jasmine under IE7 / IE8

### :fuelpump: How to contribute

Have an idea? Found a bug? See [How to contribute](https://wiki.aleen42.com/contribution.html).

### :scroll: License

[MIT](https://wiki.aleen42.com/MIT.html) © aleen42

----

For more information on Karma see the [homepage](http://karma-runner.github.io/).
