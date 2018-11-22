<template>
  <div class="content">
    <div id="iframe_box" :style="{'height': (height - 20) + 'px'}">
      <div class='content-box'>
        <h1 class="center" @click="testAlert">内 容 简 介</h1>
        <p class="left ">本书以普通电子测量仪器的实用测量基础知识和电子测量实用技术为主线，详细讲解了如何巧学巧用电子测量技术的方法。从最基本的测量仪器应用入手，系统、全面地介绍了电子测量实用技术必备的基本知识和基本元器件的常用测量方法，万用表测量实用技术，示波器测量技术，扫频仪、频谱分析仪、晶体管特性图示仪与失真度仪等仪器的测量技术，以及其他仪器的测量技术等，内容涉及范围广，既有元器件和电路测量技术，又有电参数测量技术。</p>
        <p class="left ">本书简明实用，通俗易懂，能使读者结合实际即学即用，适合作为高、中等职业学校电子技术应用专业的教材，也可供从事电子产品生产、维修的人员阅读，还可作为职业技能培训的参考书。</p>
        <p class="left ">未经许可，不得以任何方式复制或抄袭本书之部分或全部内容。</p>
        <p class="left ">版权所有，侵权必究。</p>
        <p class="left ">图书在版编目(CIP)数据</p>
        <p class="left ">巧学巧用电子测量实用技术／孙余凯等编著.—北京：电子工业出版社，2009.9</p>
        <p class="left ">(巧学巧用电子实用技术丛书)</p>
        <p class="left ">ISBN 978-7-121-09193-3</p>
        <p class="left ">I. 巧… Ⅱ.孙… Ⅲ.电子测量－基本知识 Ⅳ.TM93</p>
        <p class="left ">中国版本图书馆CIP数据核字（2009）第109867号</p>
        <p class="left ">责任编辑：谭佩香</p>
        <p class="left ">印刷：北京市天竺颖华印刷厂</p>
        <p class="left ">装订：三河市鑫金马印装有限公司</p>
        <p class="left ">出版发行：电子工业出版社</p>
        <p class="left ">北京市海淀区万寿路173信箱 邮编 100036</p>
        <p class="left ">开本：787×1092 1/16 印张：18 字数：438千字</p>
        <p class="left ">印次：2009年9月第1次印刷</p>
        <p class="left ">定价：34.00元</p>
        <p class="left ">凡所购买电子工业出版社图书有缺损问题，请向购买书店调换。若书店售缺，请与本社发行部联系，联系及邮购电话：（010）88254888。</p>
        <p class="left ">质量投诉请发邮件至zlts@phei.com.cn，盗版侵权举报请发邮件至dbqq@phei.com.cn。</p>
        <p class="left ">服务热线：（010）88258888。</p>
        <p class="left ">本书以普通电子测量仪器的实用测量基础知识和电子测量实用技术为主线，详细讲解了如何巧学巧用电子测量技术的方法。从最基本的测量仪器应用入手，系统、全面地介绍了电子测量实用技术必备的基本知识和基本元器件的常用测量方法，万用表测量实用技术，示波器测量技术，扫频仪、频谱分析仪、晶体管特性图示仪与失真度仪等仪器的测量技术，以及其他仪器的测量技术等，内容涉及范围广，既有元器件和电路测量技术，又有电参数测量技术。</p>
        <p class="left ">本书简明实用，通俗易懂，能使读者结合实际即学即用，适合作为高、中等职业学校电子技术应用专业的教材，也可供从事电子产品生产、维修的人员阅读，还可作为职业技能培训的参考书。</p>
        <p class="left ">未经许可，不得以任何方式复制或抄袭本书之部分或全部内容。</p>
        <p class="left ">版权所有，侵权必究。</p>
        <p class="left ">图书在版编目(CIP)数据</p>
        <p class="left ">巧学巧用电子测量实用技术／孙余凯等编著.—北京：电子工业出版社，2009.9</p>
        <p class="left ">(巧学巧用电子实用技术丛书)</p>
        <p class="left ">ISBN 978-7-121-09193-3</p>
        <p class="left ">I. 巧… Ⅱ.孙… Ⅲ.电子测量－基本知识 Ⅳ.TM93</p>
        <p class="left ">中国版本图书馆CIP数据核字（2009）第109867号</p>
        <p class="left ">责任编辑：谭佩香</p>
        <p class="left ">印刷：北京市天竺颖华印刷厂</p>
        <p class="left ">装订：三河市鑫金马印装有限公司</p>
        <p class="left ">出版发行：电子工业出版社</p>
        <p class="left ">北京市海淀区万寿路173信箱 邮编 100036</p>
        <p class="left ">开本：787×1092 1/16 印张：18 字数：438千字</p>
        <p class="left ">印次：2009年9月第1次印刷</p>
        <p class="left ">定价：34.00元</p>
        <p class="left ">凡所购买电子工业出版社图书有缺损问题，请向购买书店调换。若书店售缺，请与本社发行部联系，联系及邮购电话：（010）88254888。</p>
        <p class="left ">质量投诉请发邮件至zlts@phei.com.cn，盗版侵权举报请发邮件至dbqq@phei.com.cn。</p>
        <p class="left ">服务热线：（010）88258888。</p>
      </div>
    </div>
    <button class='btn prev' @click="prev">上一章</button>
    <button class='btn next' @click="next">下一章</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      height: window.innerHeight,
      pageNum: 1,
      pageIndex: 0
    };
  },
  mounted() {
    this.getHtml();
  },
  methods: {
    getHtml() {
      document.querySelector('#iframe_box').style.columnWidth = window.innerWidth + 'px';
      this.$nextTick(()=>{
        let iframeboxW = document.querySelector('#iframe_box').scrollWidth;
          let windowH = window.innerWidth;
          let pages = iframeboxW/windowH;
          this.pageNum = pages;
          document.querySelector('.content-box').addEventListener('touchmove',function(e) {
            event.preventDefault();
            alert(1);
          })
          document.addEventListener('touchmove', function (event) {
              event.preventDefault();
              // event.stopPropagation();
          }, {
              passive: false
          });
      })
    },
    next(){
      let ifrContentWindow = document.getElementById("iframe_box");
      if(this.pageNum>this.pageIndex+1){
        this.pageIndex++;
        ifrContentWindow.style.WebkitTransform="translate("+(-this.pageIndex*window.innerWidth)+"px)";
      }else{
        // console.log('这是最后一页了');
        // if(this.htmlIndex<this.htmlArr.length-1){
        //   this.htmlIndex++;
        //   this.getHtml(this.htmlArr[this.htmlIndex]);
        // }else{
          alert('这是最后一章了哦')
        // }
      }
    },
    prev(){
      let ifrContentWindow = document.getElementById("iframe_box");
      if(this.pageIndex>0){
        this.pageIndex--;
        ifrContentWindow.style.WebkitTransform="translate("+ (-this.pageIndex*window.innerWidth)+"px)";
      }else{
        // console.log('这是第一页了');
        // if(this.htmlIndex>0){
        //   this.htmlIndex--;
        //   this.getHtml(this.htmlArr[this.htmlIndex]);
        // }else{
          alert('这是第一章了哦')
        // }
      }
    },
    testAlert(){
      alert(1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #iframe_box{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px 0;
    column-gap: 0;
    /* column-fill: auto; */
    /* overflow: hidden; */
    touch-action: none;
  }
  .content-box{
    touch-action: none;
    line-height: 2;
    padding: 10px;
  }
  .btn{
    position: absolute;
    top: 50%;
    right: 20px;
  }
  .btn.prev{
    left: 20px;
    right: auto;
  }
</style>
