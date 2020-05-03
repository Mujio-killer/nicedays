package com.mujio.common.api;

/**
 * @Description: CommonResult 通用返回对象
 * @Author: GZY
 * @Date: 2020/4/30 0030
 */

public class CommonResult<T> {
    private long code;

    private String message;

    private T data;

    protected CommonResult() {

    }

    protected CommonResult(long code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * @Description: success 成功结果
     * @Param: [data]
     * @return: com.mujio.common.api.CommonResult<T>
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<T>(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage(), data);
    }

    public static <T> CommonResult<T> success(T data, String message) {
        return new CommonResult<T>(ResultCode.SUCCESS.getCode(), message, data);
    }

    /**
     * @Description: failed 失败返回结果
     * @Param: [errorCode]
     * @return: com.mujio.common.api.CommonResult<T>
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    public static <T> CommonResult<T> failed(IErrorCode errorCode) {
        return new CommonResult<T>(errorCode.getCode(), errorCode.getMessage(), null);
    }

    public static <T> CommonResult<T> failed(String message) {
        return new CommonResult<>(ResultCode.FAILED.getCode(), message, null);
    }

    public static <T> CommonResult<T> failed() {
        return failed(ResultCode.FAILED);
    }

    /**
     * @Description: validateFailed 参数验证失败返回结果
     * @Param: []
     * @return: com.mujio.common.api.CommonResult<T>
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    public static <T> CommonResult<T> validateFailed() {
        return failed(ResultCode.VALIDATE_FAILED);
    }

    /**
     * @Description: validateFailed 参数验证失败返回结果
     * @Param: [message]
     * @return: com.mujio.common.api.CommonResult<T>
     * @Author: GZY
     * @Date: 2020/5/3 0003
     */
    public static <T> CommonResult<T> validateFailed(String message) {
        return new CommonResult<T>(ResultCode.VALIDATE_FAILED.getCode(), message, null);
    }


    /**
     * @Description: unAuthorized 未登陆返回结果
     * @Param: [data]
     * @return: com.mujio.common.api.CommonResult<T>
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    public static <T> CommonResult<T> unAuthorized(T data) {
        return new CommonResult<T>(ResultCode.UNAUTHORIZED.getCode(), ResultCode.UNAUTHORIZED.getMessage(), data);
    }

    /**
     * @Description: forbidden 未授权返回结果
     * @Param: [data]
     * @return: com.mujio.common.api.CommonResult<T>
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    public static <T> CommonResult<T> forbidden(T data) {
        return new CommonResult<T>(ResultCode.FORBIDDEN.getCode(), ResultCode.FORBIDDEN.getMessage(), data);
    }

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
