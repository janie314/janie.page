#!/bin/bash
rsync --info=NAME -r --delete /var/www/html-predeploy/ /var/www/html/
chown -Rv root:root /var/www/html/
find /var/www/html -mindepth 1 -exec restorecon -v {} \;