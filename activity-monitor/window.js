//使用Node.js的os模块来获取系统信息，例如CPU的使用情况。
const os = require('os')
//声明一个变量chart用来存储后面创建的Chart.js图表实例。
var chart = null;
//初始化一个数组来存储上一次测量的CPU时间数据，用于计算CPU的时间变化。
var lastMeasureTimes = [];

//遍历每个CPU核心
function setLastMeasureTimes(cpus) {
  for (let i = 0; i < cpus.length; i++) {
    lastMeasureTimes[i] = getCpuTimes(cpus[i]);
  }
}

function getDatasets() {
  const datasets = []
  const cpus = os.cpus()

  for (let i = 0; i < cpus.length; i++) {
    const cpu = cpus[i]
    const cpuData = {
      data: getCpuTimes(cpu),
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    }
    datasets.push(cpuData)
  }
  testCpus = os.cpus();
  return datasets;
}

function updateDatasets() {
  const cpus = os.cpus()
  for (let i = 0; i < cpus.length; i++) {
    const cpu = cpus[i]
    chart.data.datasets[i].data = getCpuTimes(cpu);
    chart.data.datasets[i].data[0] -= lastMeasureTimes[i][0];
    chart.data.datasets[i].data[1] -= lastMeasureTimes[i][1];
    chart.data.datasets[i].data[2] -= lastMeasureTimes[i][2];
  }
  chart.update();
  setLastMeasureTimes(cpus);
}

//接受一个CPU核心的数据作为参数，并返回一个数组，其中包含用户时间、系统时间和空闲时间。
function getCpuTimes(cpu) {
  return [
    cpu.times.user,
    cpu.times.sys,
    cpu.times.idle,
  ];
}

function drawChart() {
  //调用new Chart()构造函数来创建一个图表实例
  chart = new Chart($('.chart'), {  //使用jQuery选择器选中的canvas元素，它是图表绘制的目标容器。返回的是一个jQuery对象
    type: 'doughnut', //指定图表的类型为“甜甜圈”图。
    data: {
      labels: [
        'User Time (ms)',
        'System Time (ms)',
        'Idle Time (ms)'
      ],
      datasets: getDatasets()
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'CPU Activity',
        fontColor: 'rgb(250, 250, 250)',
        fontSize: 16
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(250, 250, 250)',
          fontSize: 12
        }
      }
    }
  });

  setInterval(updateDatasets, 1000);
}

//jQuery的ready事件处理器，确保在DOM完全加载后执行代码。
//首先设置初始的CPU时间数据，然后调用drawChart函数绘制图表。
$(() => {
  setLastMeasureTimes(os.cpus());
  drawChart();
})