---
title: butterfly图片部署在gitpage不显示
date: 2024-04-18 16:39:57
tags: butterfly
categories: butterfly
description:
cover: https://angleyanalbedo.github.io/img/cover/5.jpg
---
# butterfly图片部署在gitpage不显示

## topimg等banner不显示

### 问题描述

在butterfly中的`_config.butterfly.yml`中的图片设置插入图片，图片在本地显示正常，部署到gitpage后图片不显示。
```yml
index_img: img/xxx.jpg
```

### 解决方法

在图片地址前加上`你的网址`，即`https://xxxx.github.io/`。
还有可能是你需要使用绝对路径，即`/img/xxx.jpg`而不是 `img/xxx.jpg`


## 文章的cover显示404

### 问题描述

文章的cover显示404，当然本地也显示404图片

### 解决方法

看看图片的链接是不是写错了

