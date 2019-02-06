<template>
  <div id="home">
    <Header></Header>

    <div id="content">
      <div class="progress">
        <el-steps :active="1" simple>
          <el-step title="步骤 1 考试信息" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2 设计试卷" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3 发布考试" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>

      <div class="create-paper">
        <div class="create-op-wrap">
          <el-button type="primary" @click="dialogFormVisible = true">创建考试</el-button>
        </div>

        <div class="test-list">
          <p class="title">题目列表</p>

          <!-- 展示all课程 -->
          <div class="course-list-wrap">
            <div id="course-list">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="paperName" label="课程名称" width="150" fixed></el-table-column>
                <el-table-column prop="paperType" label="课程类型" width="120"></el-table-column>
                <el-table-column prop="desc" label="考试须知" width="300"></el-table-column>
                <el-table-column prop="fullMark" label="总分" width="120"></el-table-column>
                <el-table-column prop="passLine" label="及格线" width="80"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
                <el-table-column prop="creator" label="录入者" width="120"></el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template slot-scope="scope">
                    <el-button @click="goPaperInfo(scope.row.testId)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 新增 or 编辑 表单 -->
              <el-dialog title="新增 or 编辑试卷" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="试卷名称">
                    <el-col :span="12">
                      <el-input
                        :span="8"
                        v-model="form.paperName"
                        autocomplete="off"
                        placeholder="例如:相对论考试题"
                      ></el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="试卷类型" label-width="60">
                    <el-row style="text-align:left">
                      <el-col :span="12">
                        <el-select v-model="form.paperType" placeholder="请选择试卷类型">
                          <el-option
                            v-for="(item,idx) in paperTypeAll"
                            :key="idx"
                            :label="item"
                            :value="item"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-form-item>

                  <el-form-item label="考试须知" label-width="120">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.desc"></el-input>
                  </el-form-item>
                </el-form>

                <div class="divider">设置题目与答案</div>

                <!-- 题目部分 -->
                <div class="test-content">
                  <p class="test-type">一、判断题</p>
                  <p>题目1</p>
                  <p class="question">问题:
                    <el-input v-model="question" placeholder="请输入内容" size="small"></el-input>
                  </p>
                  <p class="answer-title">答案</p>
                  <ul class="answer">
                    <li>
                      <span>A.&nbsp;&nbsp;</span>
                      <el-input placeholder="请输入内容" v-model="opts.v1" size="small"></el-input>
                    </li>
                    <li>
                      <span>B.&nbsp;&nbsp;</span>
                      <el-input placeholder="请输入内容" v-model="opts.v2" size="small"></el-input>
                    </li>
                  </ul>
                  <el-button class="add-btn">添加题目</el-button>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">保 存</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { getAllCoursesUrl } from "@/api/baseUrl";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      paperTypeAll: ["前端", "后端", "算法", "测试", "Ai"],
      form: {
        paperName: "",
        paperType: "",
        desc: ""
      },
      question: "",
      opts: {
        v1: "",
        v2: ""
      },
      content: []
    };
  },
  created() {
    axios
      .get(getAllCoursesUrl)
      .then(({ data: res }) => {
        if (res.errcode === 0) {
          this.tableData = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    goPaperInfo(testId) {
      this.$router.push(`/paper/${testId}`);
    }
  }
};
</script>

<style lang="less" scoped>
#content {
  padding: 15px 20px 0 20px;
  .progress {
    height: 45px;
    margin-bottom: 8px;
  }
  .create-paper {
    border: #e6e9ef 1px solid;
    padding: 10px 20px 114px 20px;
    .create-op-wrap {
      height: 45px;
      padding: 5px 0 0 5px;
      border: #e6e9ef 1px solid;
      margin-bottom: 16px;
      text-align: left;
      .el-button {
        width: 114px;
        height: 34px;
        background: #1e69cf;
      }
    }

    .test-list {
      border: #e6e9ef 1px solid;
      .title {
        height: 36px;
        padding-left: 8px;
        border-bottom: #e6e9ef 1px solid;
        line-height: 36px;
        text-align: left;
      }
      .course-list-wrap {
        padding: 10px;
        .divider {
          height: 50px;
          text-align: left;
          padding-left: 5px;
          line-height: 50px;
          background: #eff2f5;
        }
        .test-content {
          text-align: left;
          .el-input {
            display: inline-block;
          }
          .test-type {
            line-height: 35px;
            font-weight: bold;
          }
          .question {
            width: 500px;
            margin-bottom: 5px;
          }
          .answer {
            // display: flex;
            width: 520px;
            margin-bottom: 5px;
          }
          .add-btn {
            width: 85px;
            height: 26px;
            line-height: 0;
            text-align: center;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
