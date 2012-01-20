#!/bin/bash
cd ~/limejs/{name}
rsync -av build/ gmp26@maths.org:/www/nrich/html/lime/{name}