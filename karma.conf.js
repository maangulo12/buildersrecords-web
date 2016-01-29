module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        preprocessors: {
            'tests/*spec.js':    ['browserify'],
            'tests/**/*spec.js': ['browserify']
        },
        frameworks: [
            'browserify',
            'mocha'
        ],
        files: [
            'tests/*spec.js',
            'tests/**/*spec.js'
        ],
        plugins: [
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-browserify'
        ]
    });
};
