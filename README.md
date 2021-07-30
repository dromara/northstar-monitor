# Northstar 网页监控端

**开源声明：**

**本项目归入 dromara 开源组织运营的初心，是希望可以有更多志同道合的朋友一起参与项目的开发，并且能借其在交易市场上有所收获！**  
**借用组织的口号：一个人或许能走的更快，但一群人会走的更远。**

本前端界面是对接 northstar 量化交易平台用的，具体设计请移步  
https://gitee.com/dromara/northstar

# 使用说明

https://gitee.com/dromara/northstar-monitor/wikis

## 启动步骤

假设当前环境是全新的服务器

下载项目

```
cd ~
git clone https://gitee.com/dromara/northstar-monitor.git
```

构建程序（每次代码更新后运行）

```
cd ~/northstar-monitor
bash build.sh
```

运行程序

```
cd ~/northstar-monitor
bash startup.sh
```

终止程序

```
cd ~/northstar-monitor
bash shutdown.sh
```

## 本地开发

项目目录包含了 express 作为前端服务，用作反向代理  
项目启动有两种模式：
一种是与 JAVA 服务端交互

```
npm run start
```

另一种是 mock 数据

```
npm run start-mock
```

目前的 Mock 数据还不完备，仅对少量接口提供了 mock 数据，可以自行添加  
详细添加方法可参考 server/mock/api 下的例子
