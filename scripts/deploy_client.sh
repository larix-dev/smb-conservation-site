ssh-keyscan $SERVER_HOSTNAME >> ~/.ssh/known_hosts
sudo apt-get update && sudo apt-get install -y rsync
rsync -a --delete ~/project/client/build/ $SERVER_USER@$SERVER_HOSTNAME:~/public_html/