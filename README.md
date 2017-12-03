# 服务模块

> 模块代码：ibird-service

> Deprecated!!!

开发者可以通过使用该模块来获取应用内所有的服务接口列表，包括每个接口的接口地址、请求方式、参数列表、参数类型等信息。

## 安装模块

```js
npm i ibird-service -S
```

## 引用模块

```js
const serve = require('ibird-service');
```

## 服务结构

```js
// 结构
{
    "接口编码": {
        "code": "接口编码，冗余设计，与key相同",
        "uri": "接口地址",
        "method": "请求方式，全大写",
        "displayName": "接口显示名称",
        "description": "接口描述",
        "queryParameters": [
            // 请求参数数组（查询参数）
            {
                "code": "参数编码",
                "displayName": "参数显示名称",
                "description": "参数描述",
                "type": "参数类型",
                "required": "是否必须参数",
                "default": "参数默认值",
                "example": "参数示例"
            }
        ],
        "body": [/* 请求参数数组（请求体参数，结构与查询参数一致）*/]
    }
}

// 示例
{
    "/api/v1/org|GET": {
        "code": "/api/v1/org|GET",
        "uri": "/api/v1/org",
        "method": "GET",
        "displayName": "查询组织机构",
        "description": "查询组织机构列表接口",
        "queryParameters": [
            {
                "displayName": "查询模式",
                "description": "查询模式，全部查询（ALL）或分页查询（PAGE）",
                "type": "string",
                "required": false,
                "default": "PAGE",
                "example": "PAGE",
                "enum": [
                    "PAGE",
                    "ALL"
                ],
                "code": "range"
            },
            {
                "displayName": "页码",
                "description": "用于在分页查询时，指定当前页的页码值，计数从1开始",
                "type": "integer",
                "required": false,
                "default": 1,
                "example": 1,
                "minimum": 1,
                "code": "page"
            }
        ]
    }
}
```

> Tips：服务列表是一个以服务编码为key的对象类型。


## 内部接口

* serve.config：配置系统内所有接口列表
* serve.users：配置系统内所有用户接口列表
* serve.get：获取接口列表
* serve.services：根据ibird配置对象生成接口列表

### 配置所有接口列表

```js
// 传入接口列表
serve.config({
    "/api/v1/org|GET": {
        "code": "/api/v1/org|GET",
        "uri": "/api/v1/org",
        "method": "GET",
        "displayName": "查询组织机构",
        "description": "查询组织机构列表接口",
        "queryParameters": [
            {
                "displayName": "查询模式",
                "description": "查询模式，全部查询（ALL）或分页查询（PAGE）",
                "type": "string",
                "required": false,
                "default": "PAGE",
                "example": "PAGE",
                "enum": [
                    "PAGE",
                    "ALL"
                ],
                "code": "range"
            },
            {
                "displayName": "页码",
                "description": "用于在分页查询时，指定当前页的页码值，计数从1开始",
                "type": "integer",
                "required": false,
                "default": 1,
                "example": 1,
                "minimum": 1,
                "code": "page"
            }
        ]
    }
});
```

### 配置用户接口字段列表

传入用户与接口字段列表的对象即可，如下所示：

```js
serve.users({
    "zhangsan": {
        "/api/v1/org|GET": {
            "code": "/api/v1/org|GET",
            "uri": "/api/v1/org",
            "method": "GET",
            "displayName": "查询组织机构",
            "description": "查询组织机构列表接口",
            "queryParameters": [
                {
                    "displayName": "查询模式",
                    "description": "查询模式，全部查询（ALL）或分页查询（PAGE）",
                    "type": "string",
                    "required": false,
                    "default": "PAGE",
                    "example": "PAGE",
                    "enum": [
                        "PAGE",
                        "ALL"
                    ],
                    "code": "range"
                },
                {
                    "displayName": "页码",
                    "description": "用于在分页查询时，指定当前页的页码值，计数从1开始",
                    "type": "integer",
                    "required": false,
                    "default": 1,
                    "example": 1,
                    "minimum": 1,
                    "code": "page"
                }
            ]
        }
    }
});
```

### 获取字段列表

获取字段列表可以传递两个参数，第一个是接口编码，第二个是用户ID，这两个参数都是可选的，但需要注意的是，不同的传参方式调用的含义是完全不同的：

```js
serve.get("/api/v1/org|GET"); // 返回接口/api/v1/org|GET的字段列表
serve.get("/api/v1/org|GET", "zhangsan"); // 返回接口/api/v1/org|GET对zhangsan可见的字段列表
```

## 生成接口列表

```
const object = serve.services(config);
```

根据ibird的配置对象生成的服务接口列表，config为ibird配置对象，object为返回的对象类型，其中key为接口编码，对应\_id字段，返回数据格式如下所示：

```js
{
  "/api/v1/org|GET": {
    "code": "/api/v1/org|GET",
    "uri": "/api/v1/org",
    "method": "GET",
    "displayName": "查询组织机构",
    "description": "查询组织机构列表接口",
    "queryParameters": [
      {
        "displayName": "查询模式",
        "description": "查询模式，全部查询（ALL）或分页查询（PAGE）",
        "type": "string",
        "required": false,
        "default": "PAGE",
        "example": "PAGE",
        "enum": [
          "PAGE",
          "ALL"
        ],
        "code": "range"
      },
      {
        "displayName": "页码",
        "description": "用于在分页查询时，指定当前页的页码值，计数从1开始",
        "type": "integer",
        "required": false,
        "default": 1,
        "example": 1,
        "minimum": 1,
        "code": "page"
      },
      {
        "displayName": "每页条数",
        "description": "用于在分页查询时，指定每页条数",
        "type": "integer",
        "required": false,
        "default": 20,
        "example": 20,
        "minimum": 1,
        "code": "size"
      },
      {
        "displayName": "排序字符串",
        "description": "用于指定当前查询的排序字段，可指定模型中的任意字段，顺序排列时直接指定字段，逆序时以负号（-）开头，支持多重排序，多个字段间以英文空格分隔",
        "type": "string",
        "required": false,
        "default": "-created -updated code _id",
        "example": "_id",
        "code": "sort"
      },
      {
        "displayName": "查询条件",
        "description": "用于指定查询条件，需为JSON的字符串格式。接口调用者需要先使用模型中定义的任意字段组成JSON对象，然后将此JSON格式化为字符串类型，再指定到该参数处，详见Mongoose的find查询条件",
        "type": "string",
        "required": false,
        "default": "{}",
        "example": "{\"code\":\"A101\",\"name\":\"商品名称\"}",
        "code": "cond"
      }
    ]
  },
  "/api/v1/org|POST": {
    "code": "/api/v1/org|POST",
    "uri": "/api/v1/org",
    "method": "POST",
    "displayName": "新增组织机构",
    "description": "新增组织机构接口",
    "body": [
      {
        "type": "string",
        "required": true,
        "displayName": "机构编码",
        "code": "code"
      },
      {
        "type": "string",
        "required": true,
        "displayName": "机构名称",
        "code": "name"
      },
      {
        "type": "number",
        "required": true,
        "displayName": "机构类型",
        "code": "type"
      },
      {
        "type": "Org",
        "required": false,
        "displayName": "所属机构",
        "code": "_org"
      },
      {
        "type": "User",
        "required": false,
        "displayName": "创建人",
        "code": "_creator"
      },
      {
        "type": "User",
        "required": false,
        "displayName": "修改人",
        "code": "_modifier"
      },
      {
        "type": "number",
        "required": false,
        "displayName": "创建时间",
        "code": "_created"
      },
      {
        "type": "number",
        "required": false,
        "displayName": "修改时间",
        "code": "_modified"
      },
      {
        "type": "boolean",
        "required": false,
        "default": false,
        "displayName": "删除标记",
        "code": "_dr"
      },
      {
        "type": "string",
        "required": false,
        "displayName": "备注",
        "code": "_remark"
      },
      {
        "type": "string",
        "required": false,
        "code": "_id"
      },
      {
        "type": "number",
        "required": false,
        "code": "__v"
      }
    ]
  }
}
```

## 外部路由

服务模块提供一个内置路由，开发者可以通过调用改接口查询指定接口对用户可见的字段列表：

```js
// 导出内置字段路由
const fields = require('ibird-service/route/fields');

// 可以直接挂载到ibird中
const app = require('ibird-core');
app.mount(fields);

// 也可以自行挂载到koa-router中
router.post('/fields', fields.middleware);
```

> Tips：该接口的请求方式是GET，接收两个参数：key和userid，对应内置接口的两个参数。如果是使用`ibird-token`在浏览器登录，可以省略userid参数。
