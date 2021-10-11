#!/bin/bash
cd /home/ubuntu/Ohjeju/server

export RDS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PORT --query Parameters[0].Value | sed 's/"//g')
export RDS_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_USERNAME --query Parameters[0].Value | sed 's/"//g')
export RDS_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DB_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DB_NAME --query Parameters[0].Value | sed 's/"//g')
export RDS_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_HOST --query Parameters[0].Value | sed 's/"//g')

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')

export KAKAO_JS_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_JS_KEY --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REST_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REST_KEY --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')

export KAKAO_LOGIN_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_LOGIN_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_LOGIN_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_LOGIN_PASSWORD --query Parameters[0].Value | sed 's/"//g')

export SERVER_URL=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_URL --query Parameters[0].Value | sed 's/"//g')
export CLIENT_URL=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_URL --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js