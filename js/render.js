// var content = document.querySelector('.post-content').innerHTML;

//     // 定义正则表达式
//     var regex = /\$\$(.*?)\$\$/g;

//     // 查找所有匹配的公式
//     var matches = Array.from(content.matchAll(regex));

//     // 遍历匹配结果并进行渲染
//     for (const match of matches) {
//       // match[1] 包含公式内容
//       var formula = match[1];

//       // 创建一个<span>元素，用于容纳渲染后的公式
//       var formulaContainer = document.createElement('span');

//       // 设置元素的class，用于样式控制
//       formulaContainer.className = 'katex';

//       // 将公式内容设置为元素的文本
//       formulaContainer.textContent = formula;

//       // 将<span>元素插入到匹配的位置
//       //match[0] = match[0].replace(/\$/g, '\\$'); // 在正则表达式中替换$字符
//       //content = content.replace(new RegExp(match[0], 'g'), formulaContainer.outerHTML);
//       //console.log('match'+ match[0]);
//       content = content.replace(match[0], formulaContainer.outerHTML);

//       // 渲染公式
//       katex.render(formula, formulaContainer);
//     }

//     // 更新网页内容
//     document.querySelector('.post-content').innerHTML = content;
//     console.log('content/n'+content);

var contentElement = document.querySelector('.post-content');
var content = contentElement.innerHTML;

// 定义正则表达式
var regex = /\$\$(.*?)\$\$/g;

// 查找所有匹配的公式
var matches = Array.from(content.matchAll(regex));

// 遍历匹配结果并进行渲染
for (const match of matches) {
  // match[1] 包含公式内容
  var formula = match[1];

  // 创建一个<span>元素，用于容纳渲染后的公式
  var formulaContainer = document.createElement('span');

  // 设置元素的class，用于样式控制
  formulaContainer.className = 'mathjax';

  // 设置公式容器的样式为display: inline;用于不换行
  formulaContainer.style.display = 'inline';

  // 将公式内容设置为元素的文本
  formulaContainer.textContent = formula;

  // 将<span>元素插入到匹配的位置
  content = content.replace(match[0], formulaContainer.outerHTML);

  // 渲染公式
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, formulaContainer]);
}

// 更新网页内容
contentElement.innerHTML = content;