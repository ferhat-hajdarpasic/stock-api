# stock-api

# Install later version of nodejs
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

sudo apt-get install -y nodejs

# Configure graphics subsystem on Linux
# 1. Install dependencies
apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb
    
npm install segmentio/nightmare

# 2. Start Xvfb
Xvfb -ac -screen scrn 1280x2000x24 :9.0 & export DISPLAY=:9.0
