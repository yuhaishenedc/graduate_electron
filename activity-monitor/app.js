/*ʹ��Electron����һ���򵥵Ĵ���*/

//�� electron ģ�鵼�� app �� BrowserWindow ����app �������ڿ���Ӧ�õ��������ڣ�BrowserWindow �����ڴ����͹���Ӧ�ô��ڡ�
const {app, BrowserWindow} = require('electron')
const fs = require('fs');
const path = require('path');

//����һ������ window ���洢��Ҫ��������������ڵ����á���ʼֵ��Ϊ null��
let window = null

//ʹ�� once �������� ready �¼������¼��� Electron Ӧ����ɳ�ʼ��ʱ������once ����ȷ���ص�����ֻ��ִ��һ�Ρ���Ӧ��׼������ʱ��ִ�лص������еĴ������������ڡ�
app.once('ready', () => {
  // ʹ�� BrowserWindow ���캯������һ���´��ڣ���ͨ��һ��ѡ��������ô��ڵ����ԡ�
  window = new BrowserWindow({
    width: 800, // ���ó�ʼ���Ϊ 800px
    height: 600, // ���ó�ʼ�߶�Ϊ 600px
    backgroundColor: "#ffffff", // ���ñ�����ɫΪ��ɫ
    show: false // ����׼����֮ǰ����ʾ����ֹ���ְ���
  })

  // ���ش�������
  window.loadURL('https://www.baidu.com')

  // ���� ready-to-show �¼������¼��ڴ�����Ⱦ��ɲ�׼������ʾʱ�������� ready �¼����ƣ�ʹ�� once ȷ���ص�ִֻ��һ�Ρ�
  // �ڻص������е��� window.show() ��ʾ���ڣ���ʱ�����Ѿ�������ϣ����Ա�����ʾ�հ״��ڸ��û��������顣
  window.once('ready-to-show', () => {
    window.show()

    // ������ʾʱ��¼ʱ��
    const endTime = Date.now(); 

    // ����ѡ��ʱ���¼���ļ��У��Ա��ⲿ�ű���ȡ
    fs.writeFileSync(path.join(__dirname, 'endTime.txt'), endTime.toString());
  })

  //��devtools
  window.webContents.openDevTools();
})
