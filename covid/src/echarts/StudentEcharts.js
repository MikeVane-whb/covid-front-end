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
            name: '学生打卡情况',
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
}

export const studentStatusOption = {
    statusChart: {
        title: {
            text: '学生身体情况',
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
        color: ['#85ce61', '#ebb563', '#F56C6C', '#a6a9ad'],
        series: [
            {
                name: '学生身体情况',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 0, name: '健康'},
                    {value: 0, name: '疑似'},
                    {value: 0, name: '确诊'},
                    {value: 0, name: '未知'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },

        ],
    },
    touchChart:{
        title: {
            text: '学生是否接触疑似或确诊',
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
        color: ['#85ce61', '#ebb563', '#a6a9ad'],
        series: [
            {
                name: '学生是否接触疑似或确诊',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 0, name: '未接触'},
                    {value: 0, name: '接触过'},
                    {value: 0, name: '未知'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },

        ],
    }
}



