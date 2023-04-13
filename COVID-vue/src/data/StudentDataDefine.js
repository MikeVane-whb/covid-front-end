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
}