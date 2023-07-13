export const TeacherInfo = {
    teacher:{
        username:'',
        sex:'未设置',
        nation:'未设置',
        birthday:'未设置',
        email:'未设置',
        phone:'未设置',
        startDate:'未设置',
        major:'未设置',
        college:'未设置',
    },
    teacherRule:{
        sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        nation:[
            { required: true, message: '请输入民族', trigger: 'blur' },
            { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        birthday:[
            { required: true, message: '请输入出生日期', trigger: 'blur' },
        ],
        email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
        ]
    }
}

export const TeacherGradeInto = {
    gradeInfo:{
        gradeClass:'', //班级号
        count:'', //总人数
    }
}

export const StudentLeaveInfo ={
    leaveInfo:{
        stuNumber:'',
        username:'',
        college:'',
        gradeClass:'',
        type:'',
        district:'',
        destination:'',
        reason:'',
        leaveTime:'',
        remark:'',
        createTime:'',
    },
}

export const NoticeInfo ={
    noticeInfo:{
        id:'',
        title:'', //通知的标题
        publishTime:'', //通知发布的日期和时间
        publisher:'', //发布通知的教师或工作人员的姓名
        publisherId:'', //发布通知的教师或工作人员的id
        content:'', //通知的具体内容
        receiver:'', //通知的接收者，班级 0 老师 1
        status:'', //通知的状态，已发布 0、已撤销 1、已过期 2
    },
}

export const NoticeForm={
    noticeForm:{
        id:'',
        title:'', //通知的标题
        publishTime:'', //通知发布的日期和时间
        publisher:'', //发布通知的教师或工作人员的姓名
        publisherId:'', //发布通知的教师或工作人员的id
        content:'', //通知的具体内容
        receiver:'', //通知的接收者，班级 0 老师 1
        status:'', //通知的状态，已发布 0、已撤销 1、已过期 2
    },
    noticeFormRule:{
        title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        content:[
            { required:true, message: '请输入内容', trigger:'blur' },
            { min: 2, message: '长度不少于 2 个字符', trigger: 'blur' }
        ],
        receiver:[
            { required:true, message: '请选择接收通知的群体', trigger:'blur' }
        ],
        status:[
            { required:true, message: '请选择通知的状态', trigger:'blur' }
        ],
    }
}

export const Notices=[
    {title:'待发布标题1',content:'待发布内容1',publishTime:'年-月-日'},
    {title:'待发布标题2',content:'待发布内容2',publishTime:'年-月-日'},
    {title:'待发布标题3',content:'待发布内容3',publishTime:'年-月-日'},
    {title:'待发布标题4',content:'待发布内容4',publishTime:'年-月-日'},
    {title:'待发布标题5',content:'待发布内容5',publishTime:'年-月-日'},
    {title:'待发布标题6',content:'待发布内容6',publishTime:'年-月-日'},
    {title:'待发布标题7',content:'待发布内容7',publishTime:'年-月-日'},
    {title:'待发布标题8',content:'待发布内容8',publishTime:'年-月-日'},
    {title:'待发布标题9',content:'待发布内容9',publishTime:'年-月-日'},
    {title:'待发布标题10',content:'待发布内容10',publishTime:'年-月-日'},
]
export const NationNotices=[
    {title:'待发布标题1',content:'待发布内容1',publishTime:'年-月-日'},
    {title:'待发布标题2',content:'待发布内容2',publishTime:'年-月-日'},
    {title:'待发布标题3',content:'待发布内容3',publishTime:'年-月-日'},
    {title:'待发布标题4',content:'待发布内容4',publishTime:'年-月-日'},
    {title:'待发布标题5',content:'待发布内容5',publishTime:'年-月-日'},
]