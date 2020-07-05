# northstar-monitor

> 北极星交易平台监控端

## Linux下基于Docker的部署方法

以下代码运行之前，先确保系统环境已经有docker

``` bash
# 先下载代码
git clone xxx
cd northstar-monitor

# 安装依赖项
npm install

# 打包构建
npm run dockerbuild

# 启动容器，命名为Monitor
docker run -d --net host --name Monitor northstar-monitor
```

