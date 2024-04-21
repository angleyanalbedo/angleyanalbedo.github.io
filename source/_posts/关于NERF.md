---
title: 关于NERF
date: 2024-04-18 17:22:06
tags: nerf
categories: 机器学习
katex: true
---

### NERF的数学原理

`nerf`简单的来讲就是，或者说其中的核心逻辑就是`camera pose`作为输入，`real image`作为输出监督，从而得到一个场景的隐式表示。

但是想要进一步学习，**理解NeRF中的渲染公式为什么长下面这个样子？黎曼和的形式是如何推导出来的？**
$$
C(\mathbf{r})=\int_{t_n}^{t_f} T(t) \sigma(\mathbf{r}(t)) \mathbf{c}(\mathbf{r}(t), \mathbf{d}) d t, \text { where } T(t)=\exp \left(-\int_{t_n}^t \sigma(\mathbf{r}(s)) d s\right)
$$




### NERF的技术原理



