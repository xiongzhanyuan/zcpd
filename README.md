# inventory


## 相关链接

### coding地址

- Android：
- web：
- iOS：

## 方法名列表

### JS调用native方法名列表

#### 通用

| num   | method name                     | return  | method description |
| :---: | ------------------------------- | ------- | :----------------- |
| 1.1   | onQR ( )[^0]                    |         | 请求扫描二维码     |
| 1.2   | onAlert ( msg )                 |         | alert提示          |
| 1.3   | onChangeServerConfig ( config ) | boolean | 更改服务器配置     |
| 1.4   | onGetServerConfig ( )           | String  | 获取服务器配置     |
| 1.5   | onLoginInfo ( info )            | boolean | 保存登录信息       |
| 1.6   | onGetLoginJSON ( )              | String  | 获取登录信息       |
| 1.7   | onClearCache ( )                | boolean | 删除本地数据       |
| 1.8   | onShowProgress ( msg )          | boolean | 显示进度浮窗       |
| 1.9   | onHideProgress ( )              | boolean | 隐藏进度浮窗       |

#### 下载数据

| num   | method name                                          | return  | method description                  |
| :---: | ---------------------------------------------------- | ------- | :---------------------------------- |
| 2.1   | onDownloadData ( response )                          | boolean | 发送下载数据                        |
| 2.2   | onGetFileList ( )                                    | String  | 查询本地已存在的文件数组            |
| 2.3   | onGetNecessaryJSON ( )                               | String  | 获取本地已存在的文件数组,带四个参数 |
| 2.6   | onGetFileListByPlNum ( plNum )                       | String  | 根据plNum获取已保存的文件数组       |
| 2.5   | onGetDeviceInfoInPlan ( plNum,index )                | String  | 获取下载列表里面的详细设备信息      |
| 2.6   | onGetDeviceById ( id )                               | String  | 根据id查询设备详细数据              |
| 2.7   | onFindDevicesByDepartCode( departCode, checkResult ) | String  | 根据departCode获取设备列表           checkResult的值  100：全部  |

#### 盘点

| num   | method name                    | return  | method description           |
| :---: | ------------------------------ | ------- | :--------------------------- |
| 3.1   | onSaveDeviceInfo ( info )      | boolean | 保存单个公司的盘点详细数据   |
| 3.2   | onStashDeviceInfo ( info )     | boolean | 暂存盘点申请                 |
| 3.3   | onGetStashedDeviceInfoList ( ) | String  | 获取待提交的盘点申请列表     |
| 3.4   | onUnStashDeviceList ( )        | boolean | 删除待暂存的盘点申请列表     |
| 3.5   | onGetTobesubmitDepartArray ( ) | String  | 获取待提交的盘点申请单位列表 |


#### 报废列表

| num   | method name                                   | return  | method description     |
| :---: | --------------------------------------------- | ------- | :--------------------- |
| 4.1   | onSaveScrapList ( list )                      | boolean | 保存报废列表           |
| 4.2   | onAddToScrapList ( info )[^1]                 | boolean | 将报废信息加入报废列表 |
| 4.3   | onGetScrapList()                              | String  | 获取报废列表           |
| 4.4   | onRemoveItemOfScrapList ( phoneNumList [^2] ) | boolean | 删除报废列表中的一部分 |
| 4.5   | onClearScrapList ( )                          | boolean | 清除报废列表           |


[^0]: 如果没有查询到设备且条码不在你下载的数据范围内,则返回一个JSON字符串,包含一个字段"QRCodeLPC"
[^0]: 如果没有查询到设备,则返回一个JSON字符串,包含一个字段"QRCodeLDC"
[^1]: web端每次传入单个对象，客户端自行将其添加进现存的列表中（列表为空则创建)
[^2]: 客户端根据传入的phoneInvoiceNumber数组将对应的item删除，如果删除失败，则返回false，如果删除成功，返回true，如果找不到对应item，依然返回true


#### 调拨
| num   | method name                   | return  | method description |
| :---: | ----------------------------- | ------- | :----------------- |
| 5.1   | onSaveAllDepartsJSON ( list ) | boolean | 保存单位列表       |
| 5.2   | onGetDepartsJSON ( )          | String  | 获取单位列表       |
| 5.3   | onSaveAllDepartsJSON2 ( list ) | boolean | 保存单位列表       |
| 5.4   | onGetDepartsJSON2 ( )          | String  | 获取单位列表       |
| 5.5   | onGetSetInDeparts (departCode) | String  | 获取调入单位列表       |
| 5.6   | onGetSetOutDeparts ( )         | String  | 获取调出单位列表       |


### native(Android) 调用JS方法名列表

| num   | method name              | method description |
| :---: | ------------------------ | :----------------- |
| 10.1  | rnSetQRResult ( result ) | 发送二维码扫描结果 |


### 状态码

- 1:成功
- 0:失败(普通)
- 1000+:失败(具体描述如下)
    - 1001:内部数据错误
    - 1002:未找到数据
    - 1003:数据冲突

## 部分返回示例

### 1.3.1 onGetNecessaryJSON ( )

需要拿到所有设备信息，去除其中四个字段，放入新的JSON数组中返回

```JSON
[
    {
        "assetsCode": "101000045317",
        "assetsName": "帕萨特小轿车",
        "planNumber": "PD-201601000007",
        "planName": "测试03"
    },
    {
        "assetsCode": "101000046282",
        "assetsName": "房屋（合景办公楼）",
        "planNumber": "PD-201601000007",
        "planName": "测试03"
    },
    {
        "assetsCode": "101000014388",
        "assetsName": "华庭嘉园房屋",
        "planNumber": "PD-201601000007",
        "planName": "测试03"
    }
]
```