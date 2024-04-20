---
title: spark淘宝数据可视化分析
date: 2024-04-20 13:46:13
tags: 大数据分析
---

### 数据预处理

```python
# 对重复数据做删除处理
data = data.drop_duplicates(inplace=False)
data.shape
# 此处虽然删除了重复值，但索引未变，因此应用以下方法进行重置索引
data.reset_index(inplace=True,drop=True)
# 查看缺失值
data.isnull().any()
# 查看数据结构
data.describe()
# 查看sale_count列的众数
mode_01 = data.sale_count.mode()
mode_01
# 查看comment_count列的众数
mode_02 = data.comment_count.mode()
mode_02
data = data.fillna(0)
data.isnull().sum()
```

这段代码是用于数据预处理的。下面是对每个步骤的解释：

1. ` data = data.drop_duplicates(inplace=False)`: 这行代码用于删除数据中的重复行。`drop_duplicates`函数会返回一个删除了重复行的新数据集，然后将其赋值给`data`变量。
2. ` data.shape`: 这行代码用于打印数据集的形状，即行数和列数。
3. `data.reset_index(inplace=True, drop=True)`: 这行代码用于重置数据集的索引。`reset_index`函数会重置数据集的索引，并将原来的索引作为一列添加到数据集中。`inplace=True`表示直接修改原始数据集，`drop=True`表示丢弃原来的索引列。
4. `data.isnull().any()`: 这行代码用于检查数据集中是否存在缺失值。`isnull()`函数会返回一个布尔类型的数据集，表示每个元素是否为缺失值，`any()`函数会检查每一列是否存在缺失值，并返回一个布尔值。
5. `data.describe()`: 这行代码用于生成数据集的统计描述。`describe()`函数会计算每个数值列的基本统计量，如计数、均值、标准差、最小值、25%分位数、中位数、75%分位数和最大值。
6. `mode_01 = data.sale_count.mode()`: 这行代码用于计算`sale_count`列的众数。`mode()`函数会返回一个包含众数的数据集，可能有多个众数。
7. `mode_02 = data.comment_count.mode()`: 这行代码用于计算`comment_count`列的众数，同样使用了`mode()`函数。
8. `data = data.fillna(0)`: 这行代码用于将数据集中的缺失值填充为0。`fillna(0)`函数会将所有缺失值替换为指定的值，这里使用的是0。
9. `data.isnull().sum()`: 这行代码用于计算数据集中每列的缺失值数量。`isnull().sum()`函数会返回每列缺失值的数量，通过对所有列求和得到总的缺失值数量。

这些步骤可以帮助清洗数据、处理重复值和缺失值，使数据集更适合进行后续的分析和建模。

### 数据分析

#### 给商品名称中文分词

```python
import jieba
# jieba.load_userdict('addwords.txt')
title_cut = []
for i in data.title:
    j = jieba.lcut(i)
    title_cut.append(j)
data['item_name_cut'] = title_cut
data[['title','item_name_cut']].head()
```

这段代码使用了中文分词库jieba来对`data`中的`title`列进行分词，并将分词结果存储在`title_cut`列表中。然后，通过将`title_cut`列表赋值给`data`的新列`item_name_cut`，将分词结果添加到`data`数据集中。

具体的步骤如下：

1. `import jieba`: 这行代码导入了jieba库，它是一个常用的中文分词库，用于将中文文本进行分词处理。
2. `title_cut = []`: 创建一个空列表`title_cut`，用于存储分词结果。
3. `for i in data.title:`: 这行代码使用一个循环遍历`data`数据集中的每个`title`值。
4. `j = jieba.lcut(i)`: 这行代码使用jieba库的`lcut`函数对当前`title`值进行分词，返回一个分词后的列表，并将其赋值给变量`j`。
5. `title_cut.append(j)`: 这行代码将分词结果`j`添加到`title_cut`列表中。
6. `data['item_name_cut'] = title_cut`: 这行代码将`title_cut`列表赋值给`data`数据集的新列`item_name_cut`，将分词结果添加到数据集中。
7. `data[['title','item_name_cut']].head()`: 这行代码打印`data`数据集中`title`列和`item_name_cut`列的前几行数据，以检查分词结果是否正确添加到了数据集中。

通过使用中文分词库jieba，可以将中文文本进行分词处理，将连续的文本切分成有意义的词语，为后续的文本挖掘、自然语言处理等任务提供基础。

#### 给商品分类

```python
data[['title','item_name_cut']].head()

#%%

# 给商品添加分类
sub_type = []   #子类别
main_type = []  #主类别
basic_config_data = """护肤品    套装    套装
护肤品    乳液类    乳液    美白乳    润肤乳    凝乳    柔肤液'    亮肤乳    菁华乳    修护乳
护肤品    眼部护理    眼霜    眼部精华    眼膜
护肤品    面膜类    面膜
护肤品    清洁类    洗面    洁面    清洁    卸妆    洁颜    洗颜    去角质    磨砂
护肤品    化妆水    化妆水    爽肤水    柔肤水    补水露    凝露    柔肤液    精粹水    亮肤水    润肤水    保湿水    菁华水    保湿喷雾    舒缓喷雾
护肤品    面霜类    面霜    日霜    晚霜    柔肤霜    滋润霜    保湿霜    凝霜    日间霜    晚间霜    乳霜    修护霜    亮肤霜    底霜    菁华霜
护肤品    精华类    精华液    精华水    精华露    精华素
护肤品    防晒类    防晒霜    防晒喷雾
化妆品    口红类    唇釉    口红    唇彩
化妆品    底妆类    散粉    蜜粉    粉底液    定妆粉     气垫    粉饼    BB    CC    遮瑕    粉霜    粉底膏    粉底霜
化妆品    眼部彩妆    眉粉    染眉膏    眼线    眼影    睫毛膏
化妆品    修容类    鼻影    修容粉    高光    腮红
其他    其他    其他"""

# 将字符串basic_config_data 转为字典 category_config_map
category_config_map = {}
for config_line in basic_config_data.split('\n'):
    basic_cateogry_list = config_line.strip().strip('\n').strip('    ').split('    ')
    main_category = basic_cateogry_list[0]
    sub_category = basic_cateogry_list[1]
    unit_category_list = basic_cateogry_list[2:-1]
    for unit_category in unit_category_list:
        if unit_category and unit_category.strip().strip('    '):
            category_config_map[unit_category] = (main_category,sub_category)
            
category_config_map
```
