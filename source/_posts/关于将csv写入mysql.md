---
title: 关于将csv写入mysql
date: 2024-04-20 16:53:38
tags: [mysql,数据库]
---

```python
import csv
import pymysql


# 数据库连接信息
host = '127.0.0.1'
user = 'root'
password = '123456'
database = 'makeup'

# CSV文件路径和表名
csv_file = 'demo.csv'
table_name = 'makeupdatademo'

# 替换年份

with open(csv_file, 'r',encoding='utf-8') as file:
    data = file.read()

# 替换文本内容
data = data.replace('2016', '2023')

with open(csv_file, 'w',encoding='utf-8') as file:
    file.write(data)





# 读取CSV文件的字段
with open(csv_file, 'r',encoding='utf-8') as file:
    reader = csv.reader(file)
    fields = next(reader)

# 创建数据库连接
db = pymysql.connect(host=host, user=user, password=password, database=database)

# 创建游标对象
cursor = db.cursor()


# 创建表
create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ({','.join([field + ' VARCHAR(255)' for field in fields])});"
cursor.execute(create_table_query)

# 读取CSV文件数据并插入表中
with open(csv_file, 'r',encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        values = []
        for field in fields:
            values.append(row[field])
        insert_query = f"INSERT INTO {table_name} ({','.join(fields)}) VALUES ({','.join(['%s'] * len(fields))});"
        print(insert_query)
        cursor.execute(insert_query, tuple(values))

# 提交事务并关闭连接
db.commit()
cursor.close()
db.close()

```

这段代码实现了将CSV文件中的数据读取并插入到MySQL数据库中的功能。具体的步骤如下：

1. 导入所需的模块：`csv` 用于读写CSV文件，`pymysql` 用于与MySQL数据库建立连接和执行SQL语句。
2. 设定数据库连接信息：指定数据库的主机名、用户名、密码和数据库名。
3. 指定CSV文件路径和目标表名：设置CSV文件路径和要插入数据的目标表名。
4. 打开CSV文件并替换文本内容：使用`open`函数打开CSV文件，并读取文件内容。然后使用字符串的`replace`方法将文件中的"2016"替换为"2023"，并写回文件。
5. 读取CSV文件字段：再次打开CSV文件，使用`csv.reader`读取文件内容，并通过`next`函数获取字段名，存储在`fields`列表中。
6. 建立数据库连接：使用`pymysql.connect`函数建立与MySQL数据库的连接，传入主机名、用户名、密码和数据库名。
7. 创建游标对象：通过连接的`cursor`方法创建游标对象，用于执行SQL语句。
8. 创建表：使用`create_table_query`变量构建创建表的SQL语句，并执行该语句，创建目标表。
9. 读取CSV文件数据并插入表中：使用`csv.DictReader`读取CSV文件内容，并以字典形式迭代每一行数据。对于每一行数据，提取对应字段的值，并使用占位符构建插入语句。然后执行插入语句，将数据插入到表中。
10. 提交事务并关闭连接：使用`commit`方法提交事务，将插入的数据永久保存到数据库中。然后关闭游标和数据库连接，释放资源。

总体而言，这段代码实现了将CSV文件的数据导入到MySQL数据库中的功能.

