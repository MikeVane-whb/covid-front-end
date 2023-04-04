export const clockSituationOption = {
    title: {
        text: '学生打卡情况',
        subtext: '',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Student Clock',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 0, name: '已打卡学生' },
                { value: 0, name: '未打卡学生' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
    onclick: function(params) {
        var message = params.name + ': ' + params.percent + '%';
        alert(message);
    }
}

