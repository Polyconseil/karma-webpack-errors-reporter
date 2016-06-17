karma-webpack-error-reporter
============================

Extends `karma-mocha-reporter` with better error reporting, if you're using Webpack.

In a nutshell, you go from::

  /home/user/dev/stations-ui/src/modules/stations/tests/controllers.spec.js:100679:11 <- webpack:///src/modules/stations/controllers.js:124:0

to::

  file "src/modules/stations/controllers.js", line 124:
     raw.charge_points = raw.charge_points.map(cp => new ChargePoint(cp))


That's it.

Installation
============

Install it with::

  {
    reporters: ['webpack-error'],
  }


in your Karma configuration file.

License
=======

MIT
