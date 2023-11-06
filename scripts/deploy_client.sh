ssh-keyscan $SERVER_HOSTNAME >> ~/.ssh/known_hosts
rsync -a --delete ~/project/client/build/ $SERVER_USER@$SERVER_HOSTNAME:~/public_html/