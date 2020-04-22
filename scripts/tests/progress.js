const ProgressBar=require('progress');

/*
代币
您可以使用进度条格式的令牌。

:bar 进度条本身
:current 当前刻度号
:total 总滴答声
:elapsed 经过的时间（以秒为单位）
:percent 完成率
:eta 估计完成时间（以秒为单位）
:rate 每秒滴答率
*/
var bar = new ProgressBar('download :bar 当前:current  总共:total :token1', { total: 10,clear :false });
var timer = setInterval(function () {
  bar.tick({
    'token1': "Hello",
  });
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);