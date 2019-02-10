<template>
  <div id="home">
    <Header></Header>

    <div id="content">
      <div class="progress">
        <el-steps :active="activeStep" simple>
          <el-step title="步骤 1 考试信息" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2 设计试卷" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3 发布考试" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>

      <div class="create-paper">
        <div class="create-op-wrap">
          <el-button type="primary" @click="createOneExam('add')">创建考试</el-button>
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
                    <el-button type="text" size="small" @click="createOneExam('edit',scope.row)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="current"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
              <!-- 新增 or 编辑 表单 -->
              <el-dialog title="新增 or 编辑试卷" :visible.sync="dialogFormVisible" :before-close="handleClose">
                <el-form :model="form">
                  <el-form-item
                    label="试卷名称"
                    style="margin-right:13px;"
                    :rules="[{ required: true, message: '试卷名称为必填项', trigger: 'blur' },]"
                  >
                    <el-col :span="12">
                      <el-input
                        v-model="form.paperName"
                        autocomplete="off"
                        placeholder="例如:相对论考试题"
                        size="small"
                      ></el-input>
                    </el-col>
                  </el-form-item>

                  <el-row>
                    <el-form-item
                      label="满分"
                      label-width="60"
                      :rules="[{ required: true, message: '满分数值为必填项', trigger: 'blur' },]"
                    >
                      <el-col :span="6">
                        <el-input-number
                          v-model="form.fullMark"
                          :min="0"
                          :max="100"
                          label="描述文字"
                          style="width:120px;"
                          size="small"
                          placeholder="0"
                        ></el-input-number>
                      </el-col>
                    </el-form-item>
                  </el-row>

                  <el-row style="text-align:left;">
                    <el-form-item label="及格线" label-width="60" :rules="[{ required: true, message: '及格线为必填项', trigger: 'blur' },]">
                      <el-input
                        v-model="form.passLine"
                        autocomplete="off"
                        placeholder="[0,100]"
                        size="small"
                        style="width:80px;"
                      ></el-input>
                    </el-form-item>
                  </el-row>

                  <el-form-item label="试卷类型" label-width="60" :rules="[{ required: true, message: '试卷类型为必填项', trigger: 'blur' },]">
                    <el-row style="text-align:left">
                      <el-col :span="12">
                        <el-select v-model="form.paperType" placeholder="请选择试卷类型" size="small">
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

                  <el-form-item label="考试须知" label-width="120" size="small">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.desc"></el-input>
                  </el-form-item>
                </el-form>

                <div class="divider" v-if="operateType === 'add'">新增题目与答案</div>
                <div class="divider" v-else>
                  <router-link :to="{path:`/paper/edit/${testId}`}" target="_blank">
                    编辑试题与答案<i class="el-icon-d-arrow-right"></i>
                  </router-link>
                </div>

                <!-- 题目部分 -->
                <div class="test-content" v-if="operateType === 'add'">
                  <p class="test-type">一、判断题</p>

                  <el-form>
                    <el-form-item label="问题" label-width="60">
                      <el-col :span="12">
                        <el-input v-model="question" placeholder="请输入内容" size="small"></el-input>
                      </el-col>
                    </el-form-item>
                    <p class="answer-title">选项</p>
                    <ul class="answer">
                      <li>
                        <el-form-item label="A." label-width="60">
                          <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="opts.v1" size="small"></el-input>
                          </el-col>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item label="B." label-width="60">
                          <el-col :span="12">
                            <el-input placeholder="请输入内容" v-model="opts.v2" size="small"></el-input>
                          </el-col>
                        </el-form-item>
                      </li>
                    </ul>

                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="正确答案" label-width="60">
                          <el-select
                            v-model="correct"
                            placeholder="请选择正确答案"
                            class="correct"
                            size="small"
                          >
                            <el-option label="A" value="A"></el-option>
                            <el-option label="B" value="B"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-form-item label="分值" label-width="60">
                        <el-col :span="12">
                          <el-input-number
                            v-model="form.score"
                            :min="0"
                            :max="100"
                            label="描述文字"
                            style="width:120px;"
                            size="small"
                            placeholder="0"
                          ></el-input-number>
                        </el-col>
                      </el-form-item>
                    </el-row>

                    <el-row style="text-align:left;">
                      <el-button
                        class="add-btn"
                        @click="addOneTest"
                        type="primary"
                        :plain="true"
                      >确定录入</el-button>
                      <el-button class="add-btn" @click="addMoreTest" type="primary">继续添加</el-button>
                    </el-row>
                  </el-form>
                </div>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="handleSave">保 存</el-button>
                  <el-button type="primary" @click="handleClose">关 闭</el-button>
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
import { getAllCoursesUrl, addPaper } from "@/api/baseUrl";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      activeStep:1,
      operateType:'',
      tableData: [],
      dialogFormVisible: false,
      paperTypeAll: ["前端", "后端", "算法", "测试", "Ai"],
      pageSize:10,
      total:0,
      current:1,
      // 试卷信息
      form: {
        paperName: "",
        paperType: "",
        fullMark:0,
        desc: "暂无描述",
        passLine: 0
      },
      // 题目信息
      testId:1,
      question: "",
      opts: {
        v1: "",
        v2: ""
      },
      correct: "A",
      score: 0,
      // 所有试题细节
      content: []
    };
  },
  created() {
    axios
      .get(getAllCoursesUrl)
      .then(({ data: res }) => {
        if (res.errcode === 0) {
          this.tableData = res.data;
          this.total = res.total;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleClose(done) {
      this.activeStep = 1;
      this.dialogFormVisible = false;
    },
    createOneExam(type,data={}){
      this.dialogFormVisible = true;
      this.activeStep=2;
      this.operateType = type;
      console.log('操作类型',this.operateType)
      
      if(type === 'edit'){
        let { 
          paperName,
          paperType,
          fullMark,
          desc,
          passLine,
          testId,
      } = data;
        this.form.paperName = paperName;
        this.form.paperType = paperType;
        this.form.fullMark = fullMark;
        this.form.desc = desc;
        this.form.passLine = passLine;
        this.testId = testId;
      }
    },
    goPaperInfo(testId) {
      this.$router.push(`/paper/view/${testId}`);
    },
    addOneTest() {
      this.content.push({
        question: this.question,
        correct: this.correct,
        score: this.score,
        opts: [
          {
            id: 1,
            txt: this.opts.v1
          },
          {
            id: 2,
            txt: this.opts.v2
          }
        ]
      });
      // 给一个提示:录入成功
      this.$message({
        message: "录入成功",
        type: "success"
      });
    },
    addMoreTest() {
      this.question = this.correct = this.score = this.opts.v1 = this.opts.v2 =
        "";
    },
    handleSave() {
      let { paperName, paperType, passLine, desc, fullMark } = this.form;
      let paperParams = {
        paperName,
        paperType,
        passLine,
        desc,
        fullMark,
        createTime:Date.now(),
        updateTime:Date.now(),
        content: this.content
      };
      axios
        .post(addPaper, paperParams)
        .then(({ data: res }) => {
          if (res.errcode === 0) {
            // 后期放到消息提示里
            console.log(res.errmsg);
            this.dialogFormVisible = false;
            this.activeStep = 3;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        padding: 10px 10px 0;
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
            width: 300px;
            margin-bottom: 5px;
          }
          .answer {
            // display: flex;
            width: 520px;
            margin-bottom: 5px;
          }
          .score,
          .correct {
            width: 80px;
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
