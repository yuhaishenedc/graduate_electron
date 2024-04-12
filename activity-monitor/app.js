/*使用Electron创建一个简单的窗口*/

//从 electron 模块导入 app 和 BrowserWindow 对象。app 对象用于控制应用的生命周期，BrowserWindow 类用于创建和管理应用窗口。
const {app, BrowserWindow} = require('electron')
const fs = require('fs');
const path = require('path');

//声明一个变量 window 来存储将要创建的浏览器窗口的引用。初始值设为 null。
let window = null

//使用 once 方法侦听 ready 事件，该事件在 Electron 应用完成初始化时触发。once 方法确保回调函数只被执行一次。当应用准备就绪时，执行回调函数中的代码来创建窗口。
app.once('ready', () => {
  // 使用 BrowserWindow 构造函数创建一个新窗口，并通过一个选项对象配置窗口的属性。
  window = new BrowserWindow({
    width: 800, // 设置初始宽度为 800px
    height: 600, // 设置初始高度为 600px
    backgroundColor: "#ffffff", // 设置背景颜色为白色
    show: false // 窗口准备好之前不显示，防止出现白屏
  })

  // 加载窗口内容
  window.loadURL('https://www.baidu.com')

  // 侦听 ready-to-show 事件，该事件在窗口渲染完成并准备好显示时触发。与 ready 事件类似，使用 once 确保回调只执行一次。
  // 在回调函数中调用 window.show() 显示窗口，此时窗口已经加载完毕，可以避免显示空白窗口给用户不良体验。
  window.once('ready-to-show', () => {
    window.show()

    // 窗口显示时记录时间
    const endTime = Date.now(); 

    // 可以选择将时间记录到文件中，以便外部脚本读取
    fs.writeFileSync(path.join(__dirname, 'endTime.txt'), endTime.toString());
  })

  //打开devtools
  window.webContents.openDevTools();
})
