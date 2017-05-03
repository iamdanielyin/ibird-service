# 服务模块

> 模块代码：ibird-service

开发者可以通过使用该模块来获取应用内所有的服务接口列表，包括每个接口的接口地址、请求方式、参数列表、参数类型等信息。

## 安装模块

```js
npm i ibird-service -S
```

## 引用模块

```js
const serve = require('ibird-service');
```

## 调用方式

```
const array = serve.services(config);
```

根据ibird的配置对象生成的服务接口列表，config为ibird配置对象，array为返回的数组类型，返回数据格式如下所示：

```js
[
  {
    "_id": "/api/v1/org|GET",
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
  {
    "_id": "/api/v1/org|POST",
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
  },
  {
    "_id": "/api/v1/org|PUT",
    "uri": "/api/v1/org",
    "method": "PUT",
    "displayName": "修改组织机构",
    "description": "修改组织机构接口",
    "body": [
      {
        "displayName": "更新条件",
        "description": "设置需要更新的文档所满足的条件，可使用模型字段所组成JSON对象，详见mongoose的Model.update接口中所指定的\"conditions\"参数",
        "type": "Org",
        "code": "cond"
      },
      {
        "displayName": "需要更新的部分",
        "description": "设置需要更新的数据部分，可设置成模型字段所组成JSON对象，详见mongoose的Model.update接口中所指定的\"doc\"参数",
        "type": "Org",
        "code": "doc"
      }
    ]
  },
  {
    "_id": "/api/v1/org|DELETE",
    "uri": "/api/v1/org",
    "method": "DELETE",
    "displayName": "删除组织机构",
    "description": "删除组织机构接口",
    "body": [
      {
        "displayName": "删除条件",
        "description": "设置需要删除的文档所满足的条件，可使用模型字段所组成JSON对象，详见mongoose的Model.remove接口中所指定的\"conditions\"参数",
        "type": "Org",
        "code": "cond"
      }
    ]
  },
  {
    "_id": "/api/v1/org/one|GET",
    "uri": "/api/v1/org/one",
    "method": "GET",
    "displayName": "查询单个组织机构",
    "description": "查询单个组织机构接口",
    "queryParameters": [
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
  {
    "_id": "/api/v1/org/{id}|GET",
    "uri": "/api/v1/org/{id}",
    "method": "GET",
    "displayName": "根据ID查询组织机构",
    "description": "根据ID查询组织机构接口"
  },
  {
    "_id": "/api/v1/role|GET",
    "uri": "/api/v1/role",
    "method": "GET",
    "displayName": "查询角色",
    "description": "查询角色列表接口",
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
  }
]
```



