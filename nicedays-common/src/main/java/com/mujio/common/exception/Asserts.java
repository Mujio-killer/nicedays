package com.mujio.common.exception;

import com.mujio.common.api.IErrorCode;

/**
 * @Description: Asserts 利用断言，抛出api异常
 * @Author: GZY
 * @Date: 2020/4/30 0030
 */

public class Asserts {

    public static void fail(String message) {
        throw new ApiException(message);
    }

    public static void fail(IErrorCode errorCode) {
        throw new ApiException(errorCode);
    }
}
