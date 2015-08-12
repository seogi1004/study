module.exports = function(config) {
    'use strict';

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        // basePath folder : WEB-INF
        basePath: '',

        hostname: 'local.localhost.com',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['requirejs', 'jasmine', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            // resources
            'resources/components/jquery/jquery-1.11.0.js',
            'resources/components/jasmine/jasmine.js',
            'resources/components/jasmine-jquery/jasmine-jquery.js',
            'resources/components/sinon/sinon-1.14.1.js',

            {pattern:'resources/components/**/*', included:false},
            {pattern:'resources/common/**/*', included:false},

            // require spec
            {pattern:'test/specs/**/*.spec.js', included:false},

            // require fixtures
            {pattern:'test/fixtures/**/*', included:false},

            'test-main.js'
        ],

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'resources/common/**/*.js': 'coverage'
        },

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        /* Start these browsers, currently available:
         * - Chrome
         * - ChromeCanary
         * - Firefox
         * - Opera
         * - Safari (only Mac)
         * - PhantomJS
         * - IE (only Windows)
         */
        browsers: ['PhantomJS'],

        autoWatch: true,
        singleRun: false
    });
};