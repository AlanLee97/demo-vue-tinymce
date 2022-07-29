<!-- # src/App.vue -->
<template>
  <div>
    <div id="logo">
      <img alt="Vue+Tinymce"
        src="https://raw.githubusercontent.com/lpreterite/vue-tinymce/HEAD/docs/assets/vu-tinymce-logo.png">
    </div>

    <!-- 悬浮的popover -->
    <div v-if="popoverVisible" class="fixed-popover" :style="{
      top: `${popoverPosition.y + 100}px`,
      left: `${popoverPosition.x}px`,
    }">
      <el-popover
        placement="top-start"
        width="250"
        trigger="manual"
        v-model="popoverVisible"
        >
          <el-select v-model="selectedValue" placeholder="请选择" @change="handleSelectChange">
            <el-option
              v-for="item in genOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-popover>
    </div>

    <!-- 富文本编辑器 -->
    <div class="vue-tinymce-wrapper">
      <h2 v-show="loadingTinymce" style="text-align: center;">加载中...</h2>
      <vue-tinymce ref="vue-tinymce" v-model="content" :setting="setting" @change="tinymceChange" />
    </div>

    <!-- 底部按钮操作区域 -->
    <div class="btn-wrapper">
      <el-button style="margin-right: 20px" @click="openPreviewDialog">预览</el-button>
      <el-button type="primary">提交</el-button>
    </div>

    <!-- 预览表格 -->
    <el-dialog title="预览" :visible.sync="previewDialogVisible" width="50%" :before-close="closePreviewDialog">
      <div class="preview-img-wrapper">
        <img :src="previewImg" alt="" />
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="previewDialogVisible = false">
          <a :href="previewImg" download="产品对比图.png" class="download-a">下 载</a>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'RichtextTable',
  data() {
    return {
      loadingTinymce: true,
      // 初始化表格数据
      content: `<table style="border-collapse: collapse; width: 100%; height: 179.125px;" border="1" data-mce-style="border-collapse: collapse; width: 100%; height: 179.125px;" data-mce-selected="1"><colgroup><col style="width: 33.274%;" data-mce-style="width: 33.274%;"><col style="width: 33.274%;" data-mce-style="width: 33.274%;"><col style="width: 33.274%;" data-mce-style="width: 33.274%;"></colgroup><tbody><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" data-mce-style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;"><br></td><td style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;"><span style="color: rgb(255, 255, 255);" data-mce-style="color: rgb(255, 255, 255);"><strong>原方案续保</strong></span></td><td style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;"><span style="color: rgb(255, 255, 255);" data-mce-style="color: rgb(255, 255, 255);"><strong>升级方案续保</strong></span></td></tr><tr style="height: 44.7812px;" data-mce-style="height: 44.7812px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px;">产品名称</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;">平安承认意外险</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;">中国人保大户甲3号承认意外险</td></tr><tr style="height: 44.7812px;" data-mce-style="height: 44.7812px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px;">承保公司</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;">中国平安财产股份有限公司</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;">中国人民财产股份有限公司</td></tr><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;">投保年龄</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">20万/30万</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;"><br></td></tr><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;">意外住院津贴</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">1万/2万/3万</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;"><br></td></tr><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;">豁免保费</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">无</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;"><br></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;">等待期</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">20万/30万</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;">无</td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;">保险期限</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">1万/2万/3万</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;"><br></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;">保证续保期限</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">无</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;">无</td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;">犹豫期</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">20万/30万</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;"><br></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;">保费</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">1万/2万/3万</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;">无</td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;">意外身故/伤残</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;">无</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;"><br></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;">急性病身故（如猝死）</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;">无</td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;"><br></td></tr></tbody></table>`,
      // 富文本配置
      setting: {
        menubar: false,

        toolbar: "undo redo | forecolor | bold italic underline strikethrough | formatselect alignleft aligncenter alignright alignjustify | table",
        table_toolbar: 'tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow tabledeletecol',
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        // table_resize_bars: false,

        plugins: "link image media table lists fullscreen quickbars importcss",
        content_css: '/tinymce/skins/ui/oxide/index.css',
        importcss_exclusive: false,
        language: 'zh_CN', //本地化设置
        // language_url: "/tinymce/langs/zh-Hans.js", //使用language_url会相对灵活
        language_url: "https://lab.uxfeel.com/node_modules/tinymce/langs/zh_CN.js", //使用language_url会相对灵活
        height: 650,
        branding: false, // 隐藏右下角技术支持
        elementpath: false, // 隐藏底栏的元素路径
      },
      editor: null, // 编辑器实例
      tinymceInstance: null, // tiny实例
      previewDialogVisible: false, // 预览弹窗可见性
      previewImg: '', // 预览图片地址
      // 下拉框选择项
      optionsStr: `产品名称
承保公司
投保年龄
可续保年龄
等待期
保险期限
保证续保期限
犹豫期
保费
意外身故/伤残
急性病身故（如猝死）
意外医疗报销上限
意外住院津贴
意外骨折/关节脱臼给付
救护车费用
乘客意外交通身故/伤残
自驾意外身故或伤残
新冠疫苗身故伤残
新冠肺炎身故
新冠确诊津贴
恶性肿瘤保险金
保障内容
重度疾病给付保险金
中度疾病给付保险金
轻度疾病给付保险金
罕见疾病额外给付保险金
豁免保费
一般医疗报销上限
特定疾病医疗报销上限
年免赔额
赔付比例
医院范围
癌症医疗保险金
质子重离子医疗保险金
癌症住院津贴
恶性肿瘤院外特定药品费用
身故/高度残疾给付保险金
甲类法定传染病危重型疾病保险金
指定疾病/手术拓展特需医疗
恶性肿瘤海外医疗责任
特种进口药医疗责任
中老年特疾保险金
靶向药基因监测保险金
住院津贴
住院费用报销`,
      selectedValue: '', // 下拉框选择的值
      currentFTD: null, // 当前的第一列的第一个单元格的元素
      popoverVisible: false, // popover可见性
      popoverPosition: {}, // popover位置信息
    }
  },
  mounted() {
    this.tinymceInstance = this.$refs['vue-tinymce'];
    this.editor = this.$refs['vue-tinymce'].editor;
    console.log('tinymce editor', this.editor);
    this.editor.on('newrow', val => {
      console.log('newrow', val)
    })
    this.editor.on('input', val => {
      console.log('input', val)
    })
    this.editor.on('focus', val => {
      console.log('focus', val)
    })
    this.editor.on('blur', val => {
      console.log('blur', val)
    })
  },

  computed: {
    // 生成下拉框选择项
    genOptions() {
      let arr = this.optionsStr.split('\n');
      let list = [];
      arr.forEach(str => {
        list.push({
          value: str,
          label: str
        })
      });
      return list;
    }
  },

  methods: {
    handleSelectChange(e) {
      console.log('handleSelectChange', e)
      this.selectedValue = e;
      this.currentFTD.textContent = e;
      this.popoverVisible = false;
      this.selectedValue = '';
    },

    // 关闭预览弹窗
    closePreviewDialog() {
      this.previewDialogVisible = false;
    },

    // 打开预览弹窗
    openPreviewDialog() {
      this.genImg().then(() => {
        this.previewDialogVisible = true;
      });
    },
    // 富文本内容改变
    tinymceChange(e) {
      this.loadingTinymce = false;
      console.log('tinymceChange', { e });
      let that = this;
      this.$nextTick(() => {
        let childDocument = this.editor.dom.doc;
        let trList = childDocument.querySelectorAll('tr');
        [...trList].forEach((tr, index) => {
          // 排除第一个td
          if (index > 0) {
            let ftd = tr.firstChild;
            ftd.style.cursor = 'pointer';
            ftd.style.position = 'relative';
            ftd.addEventListener('click', e => {
              console.log(e);
              // that.dialogVisible2 = true;
              that.currentFTD = ftd;

              ftd.addEventListener('click', e => {
                console.log(e)
                let elBtn = this.$refs['elBtn'];
                console.log({ elBtn }, typeof elBtn.$el);
                this.popoverVisible = false;
                // 设置popover的位置信息
                setTimeout(() => {
                  let wrapperRect = document.querySelector('div[role="application"]').getBoundingClientRect();
                  let tdRect = ftd.getBoundingClientRect();
                  let rect = {
                    x: wrapperRect.x + tdRect.x,
                    y: Math.abs(wrapperRect.y) + tdRect.y,
                    left: wrapperRect.left + tdRect.left,
                    right: wrapperRect.right + tdRect.right,
                    width: tdRect.width,
                    height: tdRect.height,
                  }
                  this.popoverPosition = rect;
                  this.popoverVisible = true;
                  
                  console.log({wrapperRect, tdRect, rect})
                  })
              })
            });
          }

          [...tr.children].forEach((td, i2) => {
            td.setAttribute('id', `td-${index + 1}-${i2 + 1}`);

            // this.popoverVisible = false;
            let overLength = td.textContent.length > 50;
            if (overLength) {
              td.textContent = td.textContent.substring(0, 50);
            }
            
          })
        })
      })
    },
    // 生成图片
    async genImg() {
      let that = this;
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let childDocument = this.editor.dom.doc;
            html2canvas(childDocument.querySelector("table")).then(canvas => {
              that.previewImg = canvas.toDataURL();
            });
            resolve(true);
          } catch (error) {
            reject(error)
          }
        })
      })
    },
  }
}
</script>

<style lang="scss">
#logo {
  display: flex;
  justify-content: center;
}

#logo img {
  width: 300px;
}

.vue-tinymce-wrapper {
  margin: auto;
  width: 600px;
}

.tox-dialog {
  .tox-dialog__content-js {
    margin: auto;
    width: 600px !important;
  }
}

.test-style {
  color: red;
  cursor: pointer;
}

.preview-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-footer {
  margin-top: 20px;
  text-align: center;
}

.btn-wrapper {
  margin-top: 20px;
  text-align: center;
}

.download-a {
  color: #fff;
  text-decoration: none;
}

.fixed-popover {
  position: fixed;
  z-index: 999;
}
</style>