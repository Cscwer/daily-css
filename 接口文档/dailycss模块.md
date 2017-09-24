* # 添加dailyCss

接口名称：/user/dailycss

接口类型：POST

是否需要Token：是

示例URL：http://127.0.0.1:3000/user/daiilcss/submit


**参数列表**

|参数|含义|类型|备注|
|---|
|dailycss|dailycss内容|string||
|Token|||||


**响应参数列表**

|参数|含义|类型|备注|
|---|
|code|状态值|number||
|msg|消息|string|||


**响应示例**

```json
	{
	    "code": 200,
	    "msg": "Insert Succeed"
	}
```


**状态码详细定义**

|状态码|含义|消息|
|---|
|200|请求成功|Insert Succeed|

* # 收藏dailyCss

接口名称：/user/dailycss

接口类型：GET

是否需要Token：是

示例URL：http://127.0.0.1:3000/user/dailycss/collect?id=xxx


**参数列表**

|参数|含义|类型|备注|
|---|
|id|连接dailycss|string||
|Token|||||


**响应参数列表**

|参数|含义|类型|备注|
|---|
|code|状态值|number||
|msg|消息|string|||


**响应示例**
```json
	{
	    "code": 200,
	    "msg": "收藏成功"
	}
```


**状态码详细定义**

|状态码|含义|消息|
|---|
|200|请求成功|收藏成功|
|403|收藏失败|已收藏过该dailyCss|


* #  删除dailyCss

接口名称：/user/dailycss

接口类型：GET

是否需要Token：是

示例URL：http://127.0.0.1:3000/user/dailycss/delete?id=xxx


**参数列表**

|参数|含义|类型|备注|
|---|
|id|连接dailycss|string||
|Token|||||


**响应参数列表**

|参数|含义|类型|备注|
|---|
|code|状态值|number||
|msg|消息|string|||


**响应示例**

```json
	{
	    "code": 200,
	    "msg": "删除收藏成功"
	}
```


**状态码详细定义**

|状态码|含义|消息|
|---|
|200|请求成功|删除收藏成功|