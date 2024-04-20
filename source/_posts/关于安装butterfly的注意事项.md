---
title: 关于安装butterfly的注意事项
date: 2024-04-17 09:50:49
tags: butterfly
categories: butterfly
cover: https://angleyanalbedo.github.io/img/cover/5.jpg
---

## 关于配置文件的问题

### 第一点 
> _config.butterfly.yml 是复制来自 butterfly 主题中的

### 第二点 就是部署的问题

> 关于使用官方所说的一键部署的时候 
>
> ```sh
> hexo d 
> ```
>
> 会出现 
>
> ```sh
> nothing to commit
> ```
>
> 这个时候需要运行
>
> ```sh
> hexo cl
> hexo g
> hexo d
> ```
### 关于美化的问题
> 首先美化应该一步一步来
> 如果你太执着于美化，那么你选择**hexo**的目的就错了
> 显然我们选择**hexo**的目的就是快速搭建一个博客
> 花费过多时间在美化上不太好，应该专注于写博客
> 所以我建议你先将博客搭建起来，然后慢慢去美化
> 有几个决定页面大表象的要更改
> ```yml
> index_img:
> ```
> **_config.yml** 按照hexo的文档改好之后
> 至于butterfly主题的配置文件不需要完全更改

### pjax会出现问题

> 会使导航栏的定位失效发生无效ajax请求

### 运行服务器时

> `hexo server -s` 静态模式下与部署环境不同会出现问题

