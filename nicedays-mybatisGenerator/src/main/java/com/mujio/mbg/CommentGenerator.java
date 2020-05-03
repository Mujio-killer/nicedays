package com.mujio.mbg;

import org.mybatis.generator.api.IntrospectedColumn;
import org.mybatis.generator.api.IntrospectedTable;
import org.mybatis.generator.api.dom.java.CompilationUnit;
import org.mybatis.generator.api.dom.java.Field;
import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
import org.mybatis.generator.internal.DefaultCommentGenerator;
import org.mybatis.generator.internal.util.StringUtility;

import java.util.Properties;

/**
 * @Description: CommentGenerator 自定义注释生成器
 * @Author: GZY
 * @Date: 2020/4/30 0030
 */

public class CommentGenerator extends DefaultCommentGenerator {
    private static final String EXAMPLE_SUFFIX = "Example";
    private static final String API_MODEL_PROPERTY_FULL_CLASS_NAME = "io.swagger.annotations.ApiModelProperty";
    private boolean addRemarkComment = false;

    /**
     * @Description: addConfigurationProperties 设置用户配置的参数
     * @Param: [properties]
     * @return: void
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    public void addConfigurationProperties(Properties properties) {
        super.addConfigurationProperties(properties);
        this.addRemarkComment = StringUtility.isTrue(properties.getProperty("addRemarkComments"));
    }

    /**
     * @Description: addFieldComment 给字段添加注释
     * @Param: [field, introspectedTable, introspectedColumn]
     * @return: void
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    public void addFieldComment(Field field, IntrospectedTable introspectedTable, IntrospectedColumn introspectedColumn) {
        String remarks = introspectedColumn.getRemarks();
        //根据参数和备注信息判断是否添加备注信息
        if (addRemarkComment && StringUtility.stringHasValue(remarks)) {
            //数据库特殊字符转义
            if (remarks.contains("\"")) {
                remarks = remarks.replace("\"", "'");
            }
            field.addJavaDocLine("@ApiModelProperty(value = \"" + remarks + "\")");
        }
    }

    /**
     * @Description: addFieldJavaDoc 给model的字段添加注释
     * @Param: [field, remarks]
     * @return: void
     * @Author: GZY
     * @Date: 2020/4/30 0030
     */
    private void addFieldJavaDoc(Field field, String remarks) {
        //文档注释开始
        field.addJavaDocLine("/**");
        //获取数据库字段的备注信息
        String[] remarkLines = remarks.split(System.getProperty("line.separator"));
        for (String remarkLine : remarkLines) {
            field.addJavaDocLine(".*" + remarkLine);
        }
        addJavadocTag(field, false);
        field.addJavaDocLine(".*/");
    }

    public void addJavaFileComment(CompilationUnit compilationUnit) {
        super.addJavaFileComment(compilationUnit);
        //只在model中添加swagger注解类的导入
        if (!compilationUnit.isJavaInterface() && !compilationUnit.getType().getFullyQualifiedName().contains(EXAMPLE_SUFFIX)) {
            compilationUnit.addImportedType(new FullyQualifiedJavaType(API_MODEL_PROPERTY_FULL_CLASS_NAME));
        }
    }
}
