#Raspberry pi 3 configuration script for Digger
echo "###### DIGGER FIRST TIME USE INSTALLATION ######"
echo "Starting Digger configuration"

echo "Cloning digger folder"
cd ~
git clone https://diggercam:CKan211+@github.com/ebourmalo/digger.git

echo "Starting NODE install"
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install nodejs

echo "Installing npm dependencies"
cd /home/pi/digger/server
npm install
npm rebuild

sudo cp  /home/pi/raspiConfig/autostartBrowser/autostart /home/pi/.config/lxsession/LXDE-pi/autostart
echo "Setting-up browser full screen auto start"

echo "Setting-up digger start script"
sudo cp  /home/pi/raspiConfig/startup/rc.local /etc/rc.local

echo "Installing LCD 3.5"
cd /home/pi/raspiConfig/LCD-show/
chmod +x LCD35-show
./LCD35-show

#silent plymouth messages on LCD35
sudo systemctl mask plymouth-start.service

echo "FIRST TIME USE INSTALLATION DONE"