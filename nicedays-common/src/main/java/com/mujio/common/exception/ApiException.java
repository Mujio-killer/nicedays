package com.mujio.common.exception;

import com.mujio.common.api.IErrorCode;

/**
 * @Description: ApiException 自定义接口异常
 * @Author: GZY
 * @Date: 2020/4/30 0030
 */

public class ApiException extends RuntimeException {

    private IErrorCode errorCode;

    public ApiException(IErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ApiException(String message) {
        super(message);
    }

    public ApiException(Throwable cause) {
        super(cause);
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }

    public IErrorCode getErrorCode() {
        return errorCode;
    }
}
