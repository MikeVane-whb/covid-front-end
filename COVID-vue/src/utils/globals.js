const httpGlobalCode = [
    { status: 'SUCCESS', code: '200' },// 登录成功状态码
    { status: 'PASSWORD_ERROR', code: '1001' },// 用户密码错误状态码
    { status: 'ILLEGAL_ERROR', code: '1002' },// 非法输入状态码
    { status: 'USER_IS_EXIST', code: '1003' },// 用户已存在错误
    { status: 'PAGE_ERROR', code: '1004' },// 分页查询失败
    { status: 'UPDATE_ERROR', code: '1005' },// 更新失败状态码
    { status: 'SELECT_ERROR', code: '1006' },// 查询失败
    { status: 'INSERT_ERROR', code: '1007' },// 插入失败
    { status: 'NULL_TOKEN', code: '4001' },// 无 token 错误
    { status: 'VALID_ERROR_TOKEN', code: '4002' },// token 验证失败
    { status: 'SERVER_ERROR', code: '500' },// 服务器错误状态码
];

export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    httpGlobalCode,
                };
            },
            methods: {
                getStatusCode(status) {
                    const item = this.httpGlobalCode.find((item) => item.status === status);
                    return item ? item.code : '';
                },
            },
        });
    },
};
