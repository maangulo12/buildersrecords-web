#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
    app.assets
    ~~~~~~~~~~

    This module is used for cssmin and jsmin.
"""

from flask.ext.assets import Bundle

from app import env


# Assets CSS
css_main = Bundle('css/main.scss',
                  filters='scss,cssmin',
                  output='css/main.min.css')

css_all = Bundle('css/bootstrap.min.css',
                 css_main,
                 filters='cssmin',
                 output='gen/all.css')

env.register('css_all', css_all)

# Assets JS
js_vendor = Bundle('vendor/jquery/jquery-1.11.3.min.js',
                   'vendor/bootstrap/bootstrap.min.js',
                   'vendor/angularjs/1.4.5/angular.min.js',
                   'vendor/angularjs/1.4.5/angular-messages.min.js',
                   'vendor/angular-ui/validate.min.js',
                   'vendor/angular-ui/angular-ui-router.min.js',
                   'vendor/angular-jwt/angular-jwt.min.js',
                   'vendor/angular-storage/angular-storage.min.js',
                   'vendor/smart-table/smart-table.min.js',
                   'vendor/highcharts/highcharts.min.js',
                   output='gen/vendor.js')

js_app = Bundle('angular/app.module.js',
                'angular/app.config.js',
                'angular/app.run.js',
                'angular/directives/email-availability.directive.js',
                'angular/directives/format.directive.js',
                'angular/directives/page-select.directive.js',
                'angular/directives/username-availability.directive.js',
                'angular/services/auth.service.js',
                'angular/services/category.service.js',
                'angular/services/chart.service.js',
                'angular/services/draw.service.js',
                'angular/services/expenditure.service.js',
                'angular/services/fund.service.js',
                'angular/services/item.service.js',
                'angular/services/project.service.js',
                'angular/services/stripe.service.js',
                'angular/services/subcontractor.service.js',
                'angular/services/user.service.js',
                'angular/services/utility.service.js',
                'angular/modules/home/home.module.js',
                'angular/modules/home/home.route.js',
                'angular/modules/home/home.controller.js',
                'angular/modules/login/login.module.js',
                'angular/modules/login/login.route.js',
                'angular/modules/login/login.controller.js',
                'angular/modules/signup/signup.module.js',
                'angular/modules/signup/signup.route.js',
                'angular/modules/signup/signup.controller.js',
                'angular/modules/tutorial/tutorial.module.js',
                'angular/modules/tutorial/tutorial.route.js',
                'angular/modules/tutorial/tutorial.controller.js',
                'angular/modules/projects/projects.module.js',
                'angular/modules/projects/projects.route.js',
                'angular/modules/projects/projects.controller.js',
                'angular/modules/overview/overview.module.js',
                'angular/modules/overview/overview.route.js',
                'angular/modules/overview/overview.controller.js',
                'angular/modules/funds/funds.module.js',
                'angular/modules/funds/funds.route.js',
                'angular/modules/funds/funds.controller.js',
                'angular/modules/budget/budget.module.js',
                'angular/modules/budget/budget.route.js',
                'angular/modules/budget/budget.controller.js',
                'angular/modules/expenditures/expenditures.module.js',
                'angular/modules/expenditures/expenditures.route.js',
                'angular/modules/expenditures/expenditures.controller.js',
                'angular/modules/subcontractors/subcontractors.module.js',
                'angular/modules/subcontractors/subcontractors.route.js',
                'angular/modules/subcontractors/subcontractors.controller.js',
                'angular/modules/account/account.module.js',
                'angular/modules/account/account.route.js',
                'angular/modules/account/account.controller.js',
                'angular/modules/billing/billing.module.js',
                'angular/modules/billing/billing.route.js',
                'angular/modules/billing/billing.controller.js',
                filters='jsmin',
                output='gen/all.js')

js_all = Bundle(js_vendor, js_app, output='gen/all.js')

env.register('js_all', js_all)
