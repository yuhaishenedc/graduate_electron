/*ʹ��Electron����һ���򵥵Ĵ���*/

//�� electron ģ�鵼�� app �� BrowserWindow ����app �������ڿ���Ӧ�õ��������ڣ�BrowserWindow �����ڴ����͹���Ӧ�ô��ڡ�
const {app, BrowserWindow} = require('electron')
//���� Node.js �� path ģ�飬���ڴ����ļ�·����
const path = require('path')
const { windowsStore } = require('process')
//���� Node.js �� url ģ�飬���� URL �����ʹ���
const url = require('url')

//����һ������ window ���洢��Ҫ��������������ڵ����á���ʼֵ��Ϊ null��
let window = null

//ʹ�� once �������� ready �¼������¼��� Electron Ӧ����ɳ�ʼ��ʱ������once ����ȷ���ص�����ֻ��ִ��һ�Ρ���Ӧ��׼������ʱ��ִ�лص������еĴ������������ڡ�
app.once('ready', () => {
  // ʹ�� BrowserWindow ���캯������һ���´��ڣ���ͨ��һ��ѡ��������ô��ڵ�����
  window = new BrowserWindow({
    width: 500, // Set the initial width to 500px
    height: 400, // Set the initial height to 400px
    titleBarStyle: 'hiddenInset', // set the title bar style
    backgroundColor: "#111", // set the background color to black
    show: false // Don't show the window until it's ready, this prevents any white flickering
  })

  //���ش������ݡ�ʹ�� url.format ��������һ�� URL���� URL ָ��Ӧ�õ� index.html �ļ���
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'), //pathname ��Ϊ index.html �ļ���·��
    protocol: 'file:', //protocol ����Ϊ 'file:'����ʾ�ӱ����ļ�ϵͳ��������
    slashes: true //slashes: true ȷ��·���е�б�ܱ���ȷ���� 
  }))

  //���� ready-to-show �¼������¼��ڴ�����Ⱦ��ɲ�׼������ʾʱ�������� ready �¼����ƣ�ʹ�� once ȷ���ص�ִֻ��һ�Ρ��ڻص������е��� window.show() ��ʾ���ڣ���ʱ�����Ѿ�������ϣ����Ա�����ʾ�հ״��ڸ��û��������顣
  window.once('ready-to-show', () => {
    window.show()
  })

  //��devtools
  window.webContents.openDevTools();
})
