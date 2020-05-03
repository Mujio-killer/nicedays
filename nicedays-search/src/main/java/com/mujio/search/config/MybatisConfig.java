package com.mujio.search.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * @Description: MybatisConfig 内容为空，避免空指针？？
 * @Author: GZY
 * @Date: 2020/4/30 0030
 */

@Configuration
@MapperScan("com.mujio.search.mapper")
public class MybatisConfig {
}
