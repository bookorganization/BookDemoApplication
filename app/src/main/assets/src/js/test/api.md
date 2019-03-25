#### API

##### 首页
| 部分 | json格式 | 请求方式 |
| ------ | ------ | ------ |
| 轮播 | carousel.json | get |
| 推荐书籍 | bookrecommend.json | get |
| 图书列表 | booklist.json | get |

##### 亲近文学（视频类型：0标识亲近文学；1标识益智科普）
| 部分 | json格式 | 请求方式 |请求参数|
| ------ | ------ | ------ |------|
| 图书列表 | booklist.json | get |video_type|

##### 书籍详情
| 部分 | json格式 | 请求方式 |
| ------ | ------ | ------ |
| 关于图书 | onebook.json | get |
| 获取评论 | comments.json | get |
| 家长导读 | parental_guidance.json | get |

##### 关注讲师
| 部分 | json格式 | 请求方式 |
| ------ | ------ | ------ |
| 图书列表 | booklist.json | get |
| 讲师介绍 | teacher.json | get |

##### 我的页面
| 部分 | json格式 | 请求方式 |
| ------ | ------ | ------ |
| 用户信息 | user.json | get |

##### 登录注册
| 部分 | json格式 | 请求方式 |
| ------ | ------ | ------ |
| 注册信息 | register.json | post |
| 账号密码登录 | loginbypassword.json | post |
| 验证码登录 | loginbyverifycode.json | post |
| 发送验证码 | sendmsg.json|post|
| 注册、登陆成功后返回 | ResultUser.json|get|
