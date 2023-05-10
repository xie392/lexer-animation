本地运行方法有多种，我这里只是简单介绍一种

1、安装 http-server
npm install -g http-server

2、运行
http-server



服务器运行

配置 nginx

server{
  listen 80;                # 端口
  server_name 192.....;     # 写服务器ip地址或域名 

  location /{
    root  /home/dist;       # 路径写你存放 dist 的路径， 我这里存放在 home 目录下
    index index.html;       # 首页    
    try_files $uri $uri/ /index.html;   # 解决vue中历史模式访问页面丢失情况
  }

}

访问： 你的ip地址或域名