# 1.登录接口

url: https://www.easy-mock.com/mock/5c563da78b11ef4ea290746e/course/login

method: post

req:

```
{
	userName:"wuhao",
	psw:"123",
	type:0, // 0:学生   1:管理员
}
```

res:

```
{
    "errcode": 0, // 0:成功  1:失败
    "errmsg": "成功",
    "data": {
        "userId": 1,
        "isAdmin": false,
        "userName": "wuhao"
    }
}
```

# 2.获取所有试卷接口

url: https://www.easy-mock.com/mock/5c563da78b11ef4ea290746e/course/paperList/all ?page=1&size=10

method: get

res:

```
{
    "errcode": 0,
    "errmsg": "成功",
    "total":200,
    "data": [
        {
            "testId": 1,
            "paperName": "JSONP跨域",
            "paperType": "前端",
            "creator": "jinge",
            "fullMark": 100,
            "passLine": 60,
            "desc": "前端系列考试(一),禁止作弊",
            "createTime": "2018/2/3",
            "updateTime": "2018/2/3"
        },
        {
            "testId": 2,
            "paperName": "nginx",
            "paperType": "前端",
            "creator": "jinge",
            "fullMark": 100,
            "passLine": 60,
            "desc": "前端系列考试(二),禁止作弊",
            "createTime": "2018/2/3",
            "updateTime": "2018/2/3"
        }
    ]
}
```

# 3.添加试卷接口

url: https://www.easy-mock.com/mock/5c563da78b11ef4ea290746e/course/paper/add

method: post

req:

```
[
    "paperName": "JSONP跨域",
    "paperType": "前端",
    "creator": "jinge",
    "fullMark": 100,
    "passLine": 60,
    "desc": "前端系列考试(一),禁止作弊",
    "createTime": "2018/2/3",
    "updateTime": "2018/2/3",
    content:{
          question: "题目一",
          correct: 2,
          score:20,
          opts: [
            {
              id: 1,
              txt: "选项一"
            },
            {
              id: 2,
              txt: "选项二"
            }
          ]
    },
]

```

res:

```
{
    "testId":1,
    "errcode": 0,
    "errmsg": "新增试卷成功",
    "data": {}
}
```

# 4.编辑试卷接口

url: https://www.easy-mock.com/mock/5c563da78b11ef4ea290746e/course/paper/edit

method: post

req:

```
[
    "testId":1,
    "paperName": "JSONP跨域",
    "paperType": "前端",
    "creator": "jinge",
    "fullMark": 100,
    "passLine": 60,
    "desc": "前端系列考试(一),禁止作弊",
    "createTime": "2018/2/3",
    "updateTime": "2018/2/3",
    content:{
          question: "题目一",
          correct: 2,
          score:20,
          opts: [
            {
              id: 1,
              txt: "选项一"
            },
            {
              id: 2,
              txt: "选项二"
            }
          ]
    },
]

```

res:

```
{
    "testId":1,
    "errcode": 0,
    "errmsg": "修改成功",
    "data": {}
}
```

5.获取试卷详情

url: https://www.easy-mock.com/mock/5c563da78b11ef4ea290746e/course/paperInfo/1

method: get

res:

```
{
    "testId":1,
    "paperName": "JSONP跨域",
    "paperType": "前端",
    "creator": "jinge",
    "fullMark": 100,
    "passLine": 60,
    "desc": "前端系列考试(一),禁止作弊",
    "createTime": "2018/2/3",
    "updateTime": "2018/2/3",
    "content":[
        {
          question: "题目一",
          correct: "A",
          score:50,
          opts: [
            {
              id: 1,
              txt: "选项一"
            },
            {
              id: 2,
              txt: "选项二"
            }
          ]
        },
        {
          question: "题目二",
          correct: "B",
          score:50,
          opts: [
            {
              id: 1,
              txt: "选项一"
            },
            {
              id: 2,
              txt: "选项二"
            }
          ]
        },
    ],
}
```