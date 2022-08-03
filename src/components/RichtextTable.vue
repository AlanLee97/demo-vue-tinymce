<!-- # src/App.vue -->
<template>
  <div class="rich-text-table">
    <div id="logo">
      <img alt="Vue+Tinymce" src="../assets/vu-tinymce-logo[1].png">
    </div>

    <!-- 悬浮的popover -->
    <div v-if="popoverVisible" class="fixed-popover" :style="{
      top: `${popoverPosition.y + 45 + popoverPosition.height}px`,
      left: `${popoverPosition.x}px`,
    }">
      <el-popover placement="top-start" :width="popoverPosition.width" trigger="manual" popper-class="my-popper-class"
        v-model="popoverVisible">
        <div class="popover-item-wrapper">
          <div class="popover-item" v-for="item in genOptions" :key="item.value"
            @click="handleClickPopoverItem(item.value)">
            {{ item.value }}
          </div>
        </div>
      </el-popover>
    </div>

    <!-- 富文本编辑器 -->
    <div class="vue-tinymce-wrapper">
      <h2 v-show="loadingTinymce" style="text-align: center;">加载中...</h2>
      <vue-tinymce ref="vue-tinymce" v-model="content" :setting="setting" @change="tinymceChange"
        @inited="handleInited" />
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
import VueTinymce from './vue-tinymce.vue'


const { log } = console;

let flag = false;
let disX, disY;
let bound;

export default {
  name: 'RichtextTable',
  components: {
    VueTinymce
  },
  data() {
    return {
      loadingTinymce: true,
      // 初始化表格数据
      // eslint-disable-next-line no-irregular-whitespace
      content: `<table style="border-collapse: collapse; width: 100%; height: 179.125px;" border="1" data-mce-style="border-collapse: collapse; width: 100%; height: 179.125px;"><colgroup><col style="width: 33.274%;" data-mce-style="width: 33.274%;"><col style="width: 33.274%;" data-mce-style="width: 33.274%;"><col style="width: 33.274%;" data-mce-style="width: 33.274%;"></colgroup><tbody><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" data-mce-style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" id="td-1-1"><br></td><td style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-1-2"><span style="color: rgb(255, 255, 255); font-size: 10pt;" data-mce-style="color: rgb(255, 255, 255); font-size: 10pt;"><strong>原方案续保</strong></span></td><td style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(236, 202, 250); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-1-3"><span style="color: rgb(255, 255, 255); font-size: 10pt;" data-mce-style="color: rgb(255, 255, 255); font-size: 10pt;"><strong>升级方案续保</strong></span></td></tr><tr style="height: 44.7812px;" data-mce-style="height: 44.7812px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px;" id="td-2-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">产品名称</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" id="td-2-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">平安承认意外险</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" id="td-2-3"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">中国人保大户甲3号承认意外险</span></td></tr><tr style="height: 44.7812px;" data-mce-style="height: 44.7812px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 44.7812px;" id="td-3-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">承保公司</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" id="td-3-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">中国平安财产股份有限公司</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 44.7812px;" id="td-3-3"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">中国人民财产股份有限公司</span></td></tr><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" id="td-4-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">投保年龄</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-4-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">20万/30万</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-4-3"><br data-mce-bogus="1"></td></tr><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" id="td-5-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">意外住院津贴</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-5-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">1万/2万/3万</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-5-3"><br data-mce-bogus="1"></td></tr><tr style="height: 22.3906px;" data-mce-style="height: 22.3906px;"><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; height: 22.3906px;" id="td-6-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">豁免保费</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-6-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">无</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-6-3"><br data-mce-bogus="1"></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" id="td-7-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">等待期</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-7-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">20万/30万</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-7-3"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">无</span></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" id="td-8-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">保险期限</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-8-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">1万/2万/3万</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-8-3"><br data-mce-bogus="1"></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" id="td-9-1" class=""><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">保证续保期限</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-9-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">无</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-9-3"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">无</span></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" id="td-10-1"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">犹豫期</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-10-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">20万/30万</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-10-3"><br data-mce-bogus="1"></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" id="td-11-1"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">保费</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-11-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">1万/2万/3万</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-11-3"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">无</span></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" id="td-12-1"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">意外身故/伤残</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; height: 22.3906px;" id="td-12-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">无</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-12-3"><br data-mce-bogus="1"></td></tr><tr><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer; position: relative;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center; cursor: pointer;" id="td-13-1"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">急性病身故（如猝死）</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-13-2"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">无</span></td><td style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" data-mce-style="background-color: rgb(243, 243, 243); border-color: rgb(255, 255, 255); border-style: solid; border-width: 2px; text-align: center;" id="td-13-3"><span id="_mce_caret" data-mce-bogus="1" data-mce-type="format-caret"><span style="font-size: 10pt;" data-mce-style="font-size: 10pt;">﻿</span></span><br></td></tr></tbody></table>`,
      // 富文本配置
      setting: {
        menubar: false,

        toolbar: "undo redo | table tableinsertrowafter tabledeleterow | image | fontsize forecolor bold italic underline strikethrough | formatselect alignleft aligncenter alignright alignjustify",
        table_toolbar: 'tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow tabledeletecol',
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        // table_resize_bars: false,

        plugins: "link image media table lists fullscreen quickbars importcss",
        content_css: '/tinymce/skins/ui/oxide/my-styles.css',
        importcss_exclusive: false,
        language: 'zh-Hans', //本地化设置 值对应langs文件夹下的汉化包的js名即可
        // language_url: "https://lab.uxfeel.com/node_modules/tinymce/langs/zh_CN.js", //使用language_url会相对灵活
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
      currentFTDID: '', // 当前的第一列的第一个单元格的元素的id
      popoverVisible: false, // popover可见性
      popoverPosition: {}, // popover位置信息
      childDocument: null, // 富文本编辑器的document
      lastContent: '', // 上一次的变化内容
      moveEl: null,
    }
  },
  mounted() {
    this.tinymceInstance = this.$refs['vue-tinymce'];
    this.editor = this.$refs['vue-tinymce'].editor;
    window.editor = this.editor;
    document.addEventListener('click', () => {
      this.popoverVisible = false;
    });
    this.editor.on('Change', (e) => {
      console.log('Change', e);
      this.handleInited();
    })
    this.editor.on('focus', (e) => {
      console.log('focus', e);
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

  watch: {
    popoverVisible(newVal) {
      if (newVal === false) {
        setTimeout(() => {
          let td = this.childDocument.getElementById(this.currentFTDID);
          td.setAttribute('class', '')
        })
      }
    }
  },

  methods: {
    // tinymce初始化完成
    handleInited(e) {
      log('handleInited', { e });
      this.loadingTinymce = false;
      window.childDocument = this.editor.dom.doc;
      this.afterContentChange(e);
      window.childDocument.addEventListener('mousemove', this.drag);
      window.childDocument.addEventListener('mouseup', this.leftUp);
    },
    // 处理下拉框选择的数据
    handleClickPopoverItem(e) {
      console.log('handleClickPopoverItem', e)
      this.selectedValue = e;
      this.popoverVisible = false;
      setTimeout(() => {
        let td = this.childDocument.getElementById(this.currentFTDID);
        let oldText = td.textContent;
        // 需要保留原有样式，所以只替换原来的文本
        let innerHTMLStr = td.getInnerHTML().replace(oldText, e);
        td.innerHTML = innerHTMLStr;
      })
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
    // 创建下拉框图标
    createSelectIcon() {
      let childDocument = window.childDocument ? window.childDocument : this.editor.dom.doc;
      let span = childDocument.createElement('span');
      span.innerHTML = `<svg t="1659426199055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2159" width="12" height="12"><path d="M585.246075 875.340272l408.227201-447.966132c57.440818-63.040395 12.824837-164.374669-72.613865-164.374669H104.224378c-85.25807 0-130.054683 101.334274-72.613865 164.374669l408.407832 447.7855c39.016405 42.809667 106.211325 42.809667 145.22773 0.180632z" p-id="2160"></path></svg>`
      span.setAttribute('class', 'mark-select-icon select-icon');
      return span;
    },

    // 添加下拉框
    addFakeSelectBox(ftd) {
      let that = this;
      ftd.setAttribute('class', 'ftd');
      ftd.appendChild(this.createSelectIcon());
      ftd.addEventListener('mouseenter', () => {
        ftd.lastChild.setAttribute('class', 'mark-select-icon select-icon show-select-icon')
      })
      ftd.addEventListener('mouseleave', () => {
        ftd.lastChild.setAttribute('class', 'mark-select-icon hide-select-icon')
      })
      // eslint-disable-next-line no-unused-vars
      ftd.addEventListener('click', e => {
        that.currentFTD = ftd;
        that.currentFTDID = ftd.id;
        // 先关闭popover
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
          ftd.lastChild.setAttribute('class', 'rotate-select-icon')
          this.popoverVisible = true;
          this.lastContent = e;
          this.lastContent = this.editor.getContent();
        })
      });

    },
    // 添加td事件
    addTDEvent(td, i1, i2) {
      td.setAttribute('id', `td-${i1 + 1}-${i2 + 1}`);
      td.onclick = () => {
        this.popoverVisible = false;
      }
      // 处理文本不超过50字，todo 这里有问题
      let overLength = td.textContent.length > 50;
      if (overLength) {
        td.textContent = td.textContent.substring(0, 50);
      }
    },
    // 遮盖图片来拖动的方案
    dragMarkImgSolution(td) {
      let tdChildren = td.childNodes;
      tdChildren.forEach(childEl => {
        if (childEl.tagName === "IMG") {
          childEl.draggable = false;
          let div = window.childDocument.createElement('div'); 
          div.draggable = false;
          div.appendChild(childEl);
          div.setAttribute('class', 'img-wrapper')
          let markdiv = window.childDocument.createElement('div');
          markdiv.setAttribute('class', 'mark-div');
          div.appendChild(markdiv);
          div.addEventListener('mousedown', this.leftDown);
          const config = { attributes: true, childList: true, subtree: true };
          const observer = new MutationObserver((mutationsList, observer) => {
            log({ mutationsList, observer })
            markdiv.textContent = '';
          });
          observer.observe(markdiv, config);
          td.appendChild(div);
        }
      })
    },

    // 直接拖动图片方案
    dragImgSolution(td) {
      let tdChildren = td.childNodes;
      tdChildren.forEach(childEl => {
        if (childEl.tagName === "IMG") {
          childEl.draggable = false;
          childEl.setAttribute('class', 'move-img');
          childEl.addEventListener('mousedown', this.leftDown);
        }
      })
    },
    // 富文本内容变化之后的处理
    // eslint-disable-next-line no-unused-vars
    afterContentChange(e) {
      window.childDocument = this.editor.dom.doc;
      this.$nextTick(() => {
        let childDocument = this.editor.dom.doc;
        this.childDocument = childDocument;
        let trList = childDocument.querySelectorAll('tr');
        // 遍历表格每一行
        [...trList].forEach((tr, index) => {
          // 排除第一个td
          if (index > 0) {
            let ftd = tr.firstChild;
            // 处理添加一行的时候，不重复添加select-box
            let children = ftd.children;
            let hasAddedSelectBox = false;
            [...children].forEach(child => {
              if (child.className.includes('mark-select-icon')) {
                hasAddedSelectBox = true;
              }
            });
            if (!hasAddedSelectBox) {
              this.addFakeSelectBox(ftd);
            }
          }

          // 遍历表格每一行的单元格
          [...tr.children].forEach((td, i2) => {
            this.addTDEvent(td, index, i2);
            // this.dragMarkImgSolution(td); // 拖动遮罩方案
            this.dragImgSolution(td); // 直接拖动图片方案
          })
        })
        setTimeout(() => {
          this.lastContent = this.editor.getContent();
        })
      })
    },
    // 富文本内容改变
    tinymceChange(e) {
      if (e === this.lastContent) return;
      this.loadingTinymce = false;
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

    // flag 设为 true 表示按下鼠标，并记录鼠标离盒子左上角的相对距离
    leftDown(e) {
      console.log('leftDown', e);
      this.moveEl = e.target; // 直接拖到图片方案
      // this.moveEl = e.target.parentElement; // 拖动遮罩层方案

      if (e.button === 0) {
        // 按下鼠标左键
        flag = true;

        bound = this.moveEl.getBoundingClientRect();
        disX = e.clientX - bound.left;
        disY = e.clientY - bound.top;
      }
    },

    drag(e) {
      console.log('drag');

      if (flag) {
        let top = e.clientY - disY;
        let left = e.clientX - disX;

        // 处理边界条件
        // if (top < 0) top = 0;
        // if (left < 0) left = 0;
        // if (top + bound.height > window.childDocument.body.clientHeight) {
        //   top = window.childDocument.body.clientHeight - bound.height;
        // }
        // if (left + bound.width > window.childDocument.body.clientWidth) {
        //   left = window.childDocument.body.clientWidth - bound.width;
        // }

        this.moveEl.style.top = `${top}px`;
        this.moveEl.style.left = `${left}px`;
      }
    },

    leftUp(e) {
      console.log('leftUp', e);
      if (e.button === 0) {
        flag = false;
        this.moveEl = null;
      }
      // e.target.setAttribute('class', '')
    }

  },
}
</script>

<style lang="scss">
.rich-text-table {
  .el-popover {
    border: none;
    width: 200px;
    padding: 0;
    box-sizing: border-box;
  }
}

#logo {
  display: flex;
  justify-content: center;
}

#logo img {
  width: 300px;
}

.vue-tinymce-wrapper {
  margin: auto;
  width: 800px;
}

.tox-dialog {
  .tox-dialog__content-js {
    margin: auto;
    width: 600px !important;
  }
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

.my-popper-class {
  background-color: #fff;
  height: 160px;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  &::-webkit-scrollbar {
    width: 6px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(126, 126, 126, 0.5);
    border-radius: 10px;
  }

  .popover-item-wrapper {
    padding: 16px 0;
    box-sizing: border-box;
  }

  .popover-item {
    line-height: 2.5;
    padding: 0 16px;
    cursor: pointer;

    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>