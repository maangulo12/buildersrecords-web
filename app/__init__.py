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

from flask import Flask, render_template
from flask.ext.assets import Environment


# Create Flask application
app = Flask(__name__)

# Configurations
app.config.from_pyfile('settings.py')

# Extensions
env = Environment(app)

# Assets
from app import assets

# Views
@app.route('/', defaults={'url': ''})
@app.route('/<path:url>')
def catch_all(url):
    return render_template('index.html')
