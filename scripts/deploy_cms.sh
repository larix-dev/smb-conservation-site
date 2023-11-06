ssh-keyscan $SERVER_HOSTNAME >> ~/.ssh/known_hosts
ssh $SERVER_USER@$SERVER_HOSTNAME " \
  aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ECR_ACCOUNT_URL; \
  cd project && docker-compose pull && docker-compose up -d && docker system prune -af "