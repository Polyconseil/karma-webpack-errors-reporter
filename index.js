'use strict'

var fs = require('fs')
var byline = require('byline')

// Works and not likely to break (it's Karma plugin API)
var KarmaMochaReporter = require('karma-mocha-reporter')['reporter:mocha'][1]


var WEBPACK_REGEXP = new RegExp('.*webpack:\\/\\/\\/(.*)', 'g')

var WebpackErrorsReporter = function (baseReporterDecorator, formatError, config) {

  function webpackFormatError (msg, indentation) {
    var output = formatError(msg, indentation)

    output = output.replace(WEBPACK_REGEXP, function (_, group) {
      var splitted = group.split(':')
      var fileName = splitted[0]
      var lineNumber = parseInt(splitted[1])

      if (fileName[0] === '~') {  // webpack convention for node_modules
        fileName = './node_modules' + fileName.substring(1)
      }

      // Already quite better
      var formattedOutput = '' + indentation + 'file "' + fileName + '", line ' + splitted[1]

      // Try and get info from source files
      if (lineNumber !== 0) {
        try {
          var data = fs.readFileSync(fileName).toString().split('\n');
          formattedOutput += ':\n' + indentation + data[lineNumber - 1]
        } catch (exc) {
          // not a big deal, just print normal error output.
        }
      }

      return formattedOutput
    })

    return '\n' + output
  }

  return KarmaMochaReporter.call(this, baseReporterDecorator, webpackFormatError, config)
}

WebpackErrorsReporter.$inject = ['baseReporterDecorator', 'formatError', 'config']

module.exports = {
  'reporter:webpack-error': ['type', WebpackErrorsReporter],
}
