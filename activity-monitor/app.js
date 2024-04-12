/*使用Electron创建一个简单的窗口*/

//从 electron 模块导入 app 和 BrowserWindow 对象。app 对象用于控制应用的生命周期，BrowserWindow 类用于创建和管理应用窗口。
const {app, BrowserWindow} = require('electron')
//导入 Node.js 的 path 模块，用于处理文件路径。
const path = require('path')
const { windowsStore } = require('process')
//导入 Node.js 的 url 模块，用于 URL 解析和处理。
const url = require('url')

//声明一个变量 window 来存储将要创建的浏览器窗口的引用。初始值设为 null。
let window = null

//使用 once 方法侦听 ready 事件，该事件在 Electron 应用完成初始化时触发。once 方法确保回调函数只被执行一次。当应用准备就绪时，执行回调函数中的代码来创建窗口。
app.once('ready', () => {
  // 使用 BrowserWindow 构造函数创建一个新窗口，并通过一个选项对象配置窗口的属性
  window = new BrowserWindow({
    width: 500, // Set the initial width to 500px
    height: 400, // Set the initial height to 400px
    titleBarStyle: 'hiddenInset', // set the title bar style
    backgroundColor: "#111", // set the background color to black
    show: false // Don't show the window until it's ready, this prevents any white flickering
  })

  //加载窗口内容。使用 url.format 方法构造一个 URL，该 URL 指向应用的 index.html 文件。
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'), //pathname 设为 index.html 文件的路径
    protocol: 'file:', //protocol 设置为 'file:'，表示从本地文件系统加载内容
    slashes: true //slashes: true 确保路径中的斜杠被正确解析 
  }))

  //侦听 ready-to-show 事件，该事件在窗口渲染完成并准备好显示时触发。与 ready 事件类似，使用 once 确保回调只执行一次。在回调函数中调用 window.show() 显示窗口，此时窗口已经加载完毕，可以避免显示空白窗口给用户不良体验。
  window.once('ready-to-show', () => {
    window.show()
  })

  //打开devtools
  window.webContents.openDevTools();
})
