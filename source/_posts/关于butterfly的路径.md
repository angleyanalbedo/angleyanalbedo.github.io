---
title: 关于butterfly的路径
date: 2024-04-19 09:17:51
tags: butterfly
categories:
 - 教程
 - 博客搭建
---

###  在使用butterfly配置文件和在markdown编写时我们都会遇到引用资源的问题

> 最简单的方法是使用网址引用，不需要考虑各种相对地址

###  在markdown中一般我们使用使用 Markdown 嵌入图片

> 我们只需要启动选项
>
> ``` yml
> post_asset_folder: true
> marked:
>   prependRoot: true
>   postAsset: true
> ```
>
> 启用后，资源图片将会被自动解析为其对应文章的路径。  
> 例如： `image.jpg` 位置为 `/2020/01/02/foo/image.jpg` ，这表示它是 `/2020/01/02/foo/` 文章的一张资源图片， `![](image.jpg)` 将会被解析为 `<img src="/2020/01/02/foo/image.jpg">` 。

- 所以注意的是这个是相对与文章路径的地址，每一个文章都会生成`文章名/index.html`

> ## 全局资源文件夹
>
> 资源（Asset）代表 `source` 文件夹中除了文章以外的所有文件，例如图片、CSS、JS 文件等。比方说，如果你的Hexo项目中只有少量图片，那最简单的方法就是将它们放在 `source/images` 文件夹中。然后通过类似于 `![](/images/image.jpg)` 的方法访问它们。
>
> ## 文章资源文件夹
>
> 对于那些想要更有规律地提供图片和其他资源以及想要将他们的资源分布在各个文章上的人来说，Hexo也提供了更组织化的方式来管理资源。这个稍微有些复杂但是管理资源非常方便的功能可以通过将 `config.yml` 文件中的 `post_asset_folder` 选项设为 `true` 来打开。
>
> \_config.yml
>
> <table><tbody><tr><td class="code"><pre><span class="line"><span class="attr">post_asset_folder:</span> <span class="literal">true</span></span><br></pre></td></tr></tbody></table>
>
> 当资源文件管理功能打开后，Hexo将会在你每一次通过 `hexo new [layout] <title>` 命令创建新文章时自动创建一个文件夹。这个资源文件夹将会有与这个文章文件一样的名字。将所有与你的文章有关的资源放在这个关联文件夹中之后，你可以通过相对路径来引用它们，这样你就得到了一个更简单而且方便得多的工作流。

### 在butterfly配置文件中的引用

1. 当然可以使用网址，简单
2. 在`background`的设置中这个这个需要使用`url()`来引用图像

3. 在普通的`index_img` 等引用的方面 还是如同全局资源的引用方式

还有需要注意的是除了`background` 可以使用`url()` 其他的使用会出现问题
