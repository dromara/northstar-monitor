#!/bin/bash
npm i
npm run build
cd server
npm i
nohup npm start >monitor.log &