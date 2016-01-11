#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
    app package
    ~~~~~~~~~~~
    :copyright: (c) 2016

    This is the core package of this application.

    Flask and extensions:
        -Flask        : http://flask.pocoo.org/
        -Flask-Assets : http://flask-assets.readthedocs.org/en/latest/
"""

from flask import Flask, make_response, render_template
from flask.ext.assets import Environment, Bundle


# Create Flask application
app = Flask(__name__)

# Configurations
app.config.from_pyfile('settings.py')

# Extensions
assets = Environment(app)

# Assets
css = Bundle('/css/main.scss', filters='scss', output='/css/main.min.css',
              debug=app.config['DEBUG'])

# assets.register(css)

# Views
@app.route('/', defaults={'url': ''})
@app.route('/<path:url>')
def catch_all(url):
    return render_template('index.html')


@app.errorhandler(404)
def page_not_found(e):
    return make_response(open('app/templates/error/404_error.html').read())
