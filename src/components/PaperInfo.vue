<template>
  <div id="paper-info">
    <div id="paper-wrap">
      <p class="title">前端</p>

      <div class="test-content">
        <!-- 第一大题 -->
        <p class="test-type">第1大题，判断题(共5题，共100分)</p>
        <ul class="test-list">
          <li>
            <p class="question">1.你名字(20分)</p>
            <div class="answer">
              <div class="answer-item">
                <input type="radio" disabled>
                <label for="test">
                  <span class="num">A.&nbsp;</span>
                  <span class="num-desc">小</span>
                </label>
              </div>

              <div class="answer-item">
                <input type="radio" disabled>
                
                <label for="test">
                  <span class="num">B.&nbsp;</span>
                  <span class="num-desc">大</span>
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
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

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
    .title {
      height: 52px;
      padding-left: 12px;
      line-height: 52px;
      text-align: left;
      font-size: 16px;
      border-bottom: 1px solid #b8bdcc;
    }
    .test-content {
      padding: 33px 16px 0 16px;
      .test-type {
        font-size: 16px;
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
            .answer-item{
              display: inline-block;
              margin-right: 30px;
              input{
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