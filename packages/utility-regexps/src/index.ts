/**
 * 手机号正则
 */
export const phoneRegexp = /^(\+?0?86\-?)?1[3456789]\d{9}$/;

/**
 * 邮箱正则
 */
export const emailRegexp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

/**
 * url正则
 */
export const urlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

// 身份证号
export const idCardRegexp = /^[1-9]\d{5}(\d{4})(0[1-9]|1[0-2])([0-2][1-9]|10|20|30|31)\d{3}[0-9Xx]$/;

