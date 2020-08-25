##### RESTful API具体什么样子？

- 基本的URI，如https://api.github.com/users
- 标准的HTTP方法，如GET,POST,PUT,PATCH,DELETE
- 传输的数据媒体类型，如JSON，XML

##### 现实举例

- GET        /users        # 获取 user 列表
- GET        /users/12  # 查看某个具体的user
- POST     /users        # 新建一个user
- PUT       /users/12  # 更新 user 12
- DELETE /users/12  # 删除 user 12

##### 请求设计规范

- URI 使用名词，尽量用复数，如 /users
- URI 使用嵌套表示关联关系，如 /users/12/repos/5
- 使用正确的HTTP 方法，如 GET/POST/PUT/DELETE
- 不符合CRUD的情况：POST/action/子资源

##### 相应设计规范

- 查询
- 分页
- 字段过滤
- 状态码
- 错误处理

##### 安全

- HTTPS
- 鉴权
- 限流

##### HTTP options方法的作用是什么？

- 检测服务器所支持的请求方法
- CORS中的预检请求

##### allowdMethods的作用

- 响应options方法，告诉它所支持的请求方法
- 相应地返回405（不允许）和501（没实现）

##### 什么是控制器？

- 拿到路由分配的任务，并执行
- 在Koa中，是一个中间件

##### 为什么要用控制器？

- 获取HTTP请求参数
  - Query String，如?q=keyword
  - Router Params，如/users/:id
  - Body，如{name: “李雷”}
  - Header，如Accept,Cookie
- 处理业务逻辑
- 发送HTTP相应
  - 发送Status，如200/400等
  - 发送Body，如{name: “李雷”}
  - 发送Header，如Allow、Content-Type

##### 编写控制器最佳实践

- 每个资源的控制器放在不同的文件里
- 尽量使用类+类方法的形式编写控制器
- 严谨的错误处理

##### 异常情况有哪些？

- 运行时错误，都返回500
- 逻辑错误，如找不到（404）、先决条件失败（412）、无法处理的实体（参数格式不对，422）等

##### 为什么要用错误处理？

- 防止程序挂掉
- 告诉用户错误信息
- 便于开发者调试

##### 为什么要用MongoDB?

- 性能好（内存计算）
- 大规模数据存储（可拓展性）
- 可靠安全（本地复制、自动故障转移）
- 方便存储复杂数据结构（Schema Free）

##### Session 优势

- 相比JWT，最大的优势就在于可以主动清除session
- session保存在服务器端，相对较为安全
- 结合cookie使用，较为灵活，兼容性好

##### Session 劣势

- cookie + session在跨域场景变现并不好
- 如果是分布式部署，需要做多机共享session机制
- 基于cookie 的机制很容易被CSRF
- 查询session信息可能会有数据库查询操作

##### 什么是JWT？

- JSON Web Token 是一个开放标准（RFC 7519）
- 定义了一种紧凑且独立的方式，可以将各方之间的信息作为JSON对象进行传输
- 该信息可以验证和信任，因为是经过数字签名的

##### JWT的构成

- 头部（Header）
  - typ: token的类型，这里固定为JWT
  - alg: 使用的hash算法，例如：HMAC SHA256 或者RSA
    - Header编码前后
      - {"alg": "HS256","typ": "JWT"}
      - 'asdGisadaweDASDisdsdassasfnblaskdjoj'

- 有效载荷（Payload）
  - 存储需要传递的信息，如用户ID、用户名等
  - 还包含元数据，如过期时间、发布人等
  - 与Header不同，Payload可以加密
    - Payload编码前后
      - {"user_id": "zhangsan"}
      - base64编码：'eyJ1c2Vy2kasdoqwehkasdlkjasd=='
      - base64 Url编码：'eyJ1c2Vy2kasdoqwehkasdlkjasd'

- 签名（Signature）
  - 对Header和Payload部分进行签名
  - 保证Token在传输的过程中没有被篡改或者损坏
    - Signature算法
      - Sibnature = HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret)

##### JWT vs. Session

- 可拓展性
- 安全性
- RESTful API
- 性能
- 时效性