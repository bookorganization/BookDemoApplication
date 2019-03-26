#### API

##### 首页
| 部分 | json格式 | 请求方式 |url|参数|
| ------ | ------ | ------ |------|------|
| 轮播 | carousel.json | get |||
| 推荐书籍 | bookrecommend.json |get|  ||
| 图书列表 | booklist.json | get |||
| 搜索 | booklist.json | post ||video_name||

##### 亲近文学（视频类型：0标识亲近文学；1标识益智科普）
| 部分 | json格式 | 请求方式 |请求参数|
| ------ | ------ | ------ |------|
| 图书列表 | booklist.json | get |video_type|

##### 书籍详情
| 部分 | json格式 | 请求方式 |参数|
| ------ | ------ | ------ |------|
| 关于图书 | onebook.json | get |video_id|
| 获取评论 | comments.json | get |video_id|
| 家长导读 | parental_guidance.json | get |video_id|

##### 关注讲师
| 部分 | json格式 | 请求方式 |参数|
| ------ | ------ | ------ |------ |
| 图书列表 | booklist.json | get |lecturer_id|
| 讲师介绍 | teacher.json | get |lecturer_id|
| 得到所有讲师姓名 | teacher_name.json | get ||

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
