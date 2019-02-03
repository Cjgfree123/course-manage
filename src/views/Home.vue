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
          <el-button type="primary">创建题目</el-button>
        </div>

        <div class="test-list">
          <p class="title">题目列表</p>
          <div class="course-list-wrap">
            <course-list/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import CourseList from "@/components/CourseList.vue";

export default {
  name: "Home",
  components: {
    Header,
    CourseList
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
      .course-list-wrap{
        padding: 10px;
      }
    }
  }
}
</style>
