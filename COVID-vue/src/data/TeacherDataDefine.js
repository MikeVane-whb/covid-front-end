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
            { min: 2, max: 18, message: '长度在 2 到 8 个字符', trigger: 'blur' }
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