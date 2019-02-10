<template>
  <div id="paper-info">
    <div id="paper-wrap">
      <p class="title">
        试卷名称:{{paperName}}&nbsp;&nbsp;&nbsp;
        试卷类型:{{paperType}}&nbsp;&nbsp;&nbsp;
        <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        :content="desc">
        <el-button slot="reference" class="exam-desc" size="small">考试须知</el-button>       
        </el-popover>
        &nbsp;&nbsp;&nbsp;
        <el-tag type="success" size="small">{{passLine}}分及格</el-tag>&nbsp;&nbsp;
        <el-tag type="info" size="small">by&nbsp;{{creator}}</el-tag>&nbsp;&nbsp;
        <el-tag type="info" size="small">创建:{{createTime}}</el-tag>&nbsp;&nbsp;
        <el-tag type="info" size="small">更新:{{updateTime}}</el-tag>
      </p>

      <div class="test-content">
        <!-- 第一大题 -->
        <p class="test-type">第一大题，判断题(共{{testData.length}}题，共{{fullMark}}分)</p>
        <ul class="test-list">
          <li v-for="(item,idx) in testData">
            <p class="question">{{idx+1}}.{{item.question}}({{item.score}}分)</p>
            <div class="answer">
              <div class="answer-item" v-for="testItem in item.opts">
                <input type="radio" :disabled="operateType === 'view' " name='idx'/>
                <label for="test">
                  <span class="num">{{testItem.id === 1?"A":"B"}}.&nbsp;</span>
                  <span class="num-desc">{{testItem.txt}}</span>
                </label>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import axios from 'axios';
import { paperInfo } from "@/api/baseUrl";

export default {
  data() {
    return {
      testData: [
        // {
        //   question: "狮子是动物吗",
        //   correct: "A",
        //   score: 50,
        //   opts: [
        //     {
        //       id: 1,
        //       txt: "是"
        //     },
        //     {
        //       id: 2,
        //       txt: "否"
        //     }
        //   ]
        // },
        // {
        //   question: "ajax可以跨域吗",
        //   correct: "B",
        //   score: 50,
        //   opts: [
        //     {
        //       id: 1,
        //       txt: "是"
        //     },
        //     {
        //       id: 2,
        //       txt: "否"
        //     }
        //   ]
        // }
      ], 
      // 试卷数据
      paperName: "",
      paperType: "",
      creator: "",
      fullMark: 0,
      passLine: 0,
      desc: "",
      createTime: "",
      updateTime: "",
      operateType:'view',
    };
  },
  created() {
    // view eidt
    let {type:operateType} = this.$route.params;
    this.operateType = operateType;
    axios.get(paperInfo)
    .then(({data:res})=>{
      if(res.errcode === 0){
        let {
          paperName,
          paperType,
          creator,
          fullMark,
          passLine,
          desc,
          createTime,
          updateTime,
          content,
        } = res.data;

        this.paperName = paperName;
        this.paperType=paperType;
        this.creator=creator;
        this.fullMark=fullMark;
        this.passLine=passLine;
        this.desc=desc;
        this.createTime=createTime;
        this.updateTime=updateTime;
        this.testData=content;
      };
    })
    .catch(err=>{
      console.log(err);
    });
  },

  components: {},

  computed: {
  },

  mounted() {},

  methods: {}
};
</script>
<style lang="less" scoped>
#paper-info {
  min-height: 100vh;
  background: #b8bdcc;
  #paper-wrap {
    width: 865px;
    margin: 0 auto;
    background: #fff;
    .title{
      height: 52px;
      padding-left: 12px;
      line-height: 52px;
      text-align: left;
      font-size: 16px;
      border-bottom: 1px solid #b8bdcc;
      .exam-desc{
        font-size: 16px;
        padding:2px;
      }
    }
    .test-content {
      padding: 33px 16px 0 16px;
      .test-type {
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }
      .test-list {
        li {
          .question,
          .answer {
            text-align: left;
          }
          .question {
            line-height: 28px;
          }
          .answer {
            .answer-item {
              display: inline-block;
              margin-right: 30px;
              input {
                margin-right: 6px;
              }
            }
          }
        }
      }
    }
  }
}
</style>