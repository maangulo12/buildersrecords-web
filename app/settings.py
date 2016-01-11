#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
    app.settings
    ~~~~~~~~~~~~

    This module contains the config variables of this application.
"""

import os


# Flask app secret key
SECRET_KEY = os.environ.get('SECRET_KEY', 'secret_key')

# WSGI server
SERVER_HOST = os.environ.get('SERVER_HOST', '0.0.0.0')
SERVER_PORT = os.environ.get('SERVER_PORT', 5555)
DEBUG       = os.environ.get('DEBUG', True)
TESTING     = os.environ.get('TESTING', False)
