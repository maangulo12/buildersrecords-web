#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
    BuildersRecords Web App
    ~~~~~~~~~~~~~~~~~~~~~~~
    :copyright: (c) 2016

    Run this module to deploy the application.

    -How to run it (type the following in the command-line):
        python application.py
"""

from flask import Flask, render_template


app = Flask(__name__, static_folder='src', template_folder='src')

@app.route('/', defaults={'url': ''})
@app.route('/<path:url>')
def catch_all(url):
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
