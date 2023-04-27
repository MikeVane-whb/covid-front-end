export const StudentInfo = {
    student:{
        id:'',
        username:'',
        sex:'',
        gradeClass:'',
        stuNumber:'',
        nation:'',
        birthday:'',
        email:'',
        phone:'',
        admissionDate:'',
        major:'',
        college:'',
    },
    studentRule:{
        sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        gradeClass: [
            { required: true, message: '请输入班级', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        stuNumber: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        nation:[
            { required: true, message: '请输入民族', trigger: 'blur' },
            { min: 2, max: 18, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        birthday:[
            { required: true, message: '请输入出生日期', trigger: 'blur' },
        ],
        email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
        ]
    }
};

export const LeaveSituationInfo = {
    leaveRecord:{
        stuNumber:'', //学号
        username:'', //姓名
        college:'', //学院
        gradeClass:'', //班级
        type:'', //出入校类型
        district:'', //外出地区
        destination:'', //外出详细地点
        reason:'', //出校理由
        leaveTime:'', //出校时间
        remark:'', //备注
        status:'', //状态
    },
    leaveRecordRule:{
        type: [
            { required: true, message: '请选择出入校类型', trigger: 'blur' },
        ],
        district: [
            { required: true, message: '请选择地区', trigger: 'blur' },
        ],
        destination:[
            { required:true, message: '请输入外出详细地址', trigger:'blur' }
        ],
        reason:[
            { required:true, message: '请输入外出理由', trigger:'blur' }
        ],
        leaveTime:[
            { required:true, message: '请选择出校时间', trigger:'blur' }
        ],
    }
}

export const StudentClock ={
    clockForm:{
        stuNumber: '',
        username: '',
        gradeClass:'',
        address: '',
        status: '',
        contactCase: '',
        travelInfo: '',
        clockTime:''
    },
    clockFormRules:{

    },
}