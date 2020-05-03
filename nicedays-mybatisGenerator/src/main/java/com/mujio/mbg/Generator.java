package com.mujio.mbg;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.internal.DefaultShellCallback;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * @Description: Generator 代码生成器
 * @Author: GZY
 * @Date: 2020/4/30 0030
 */

public class Generator {

    public static void main(String[] args) throws Exception {
        // 告警信息
        List<String> warningList = new ArrayList<>();
        // 覆盖源代码设置为true
        boolean overwrite = true;
        // 读取生成器配置文件
        InputStream is = Generator.class.getResourceAsStream("/generatorConfig.xml");
        ConfigurationParser cp = new ConfigurationParser(warningList);
        Configuration config = cp.parseConfiguration(is);
        is.close();

        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator generator = new MyBatisGenerator(config, callback, warningList);

        // 执行
        generator.generate(null);
        // 输出告警信息
        for (String warning : warningList) {
            System.out.println(warning);
        }
    }
}
