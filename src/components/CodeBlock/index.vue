<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import type { Ace } from 'ace-builds'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import * as ace from 'ace-builds'
import { ref, computed, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import './index'
import { themeList, langList, fontSizeList } from './index'
import * as acorn from 'acorn'
import { useRunStore } from '@/stores/run'

const runStore = useRunStore()

const { is_run, code: run_code } = storeToRefs(runStore)

// 配置路径
ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict/')

// 主题
const themeSelect = ref<string>('tomorrow')
// 语言
const langSelect = ref<string>('javascript')
// 字体大小
const fontSizeSelect = ref<number>(14)

const theme = computed<string>(() => themeSelect.value)
const lang = computed<string>(() => langSelect.value)

const content = ref(`let a = 1, b = 2, c = 0
if(a < b) {
  a + b
} else {
  a - b
}
console.log(c)
`)
const codeEditor = ref<Ace.Editor | null>(null)

// 编辑器初始化
const editorInit = (editor: Ace.Editor) => {
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    tabSize: 4,
    // 高亮当前行
    highlightActiveLine: false,
    // 显示行号
    showLineNumbers: true,
    // 高亮边线
    highlightGutterLine: false,
    fontFamily: ' "Consolas", "Inconsolata", "Droid Sans Mono", "Monaco", monospace',
    fontSize: fontSizeSelect.value + 'px',
    // 小地图
    showPrintMargin: false,
    // 滚动条设置
    scrollPastEnd: 0.5
  })

  // 设置主题
  editor.setTheme(`ace/theme/${theme.value}`)
  editor.session.setMode(lang.value)

  codeEditor.value = editor
}

const changeFontSize = (val: number) => {
  codeEditor.value && codeEditor.value?.setFontSize(val)
}

// const changeTheme = (val: string) => {
//   codeEditor.value && codeEditor.value?.setTheme(`ace/theme/${val}`)
// }

const changeLang = (val: string) => {
  codeEditor.value && codeEditor.value.session.setMode(val)
}

// 运行
const run = () => {
  const code = codeEditor.value?.getValue() || ''
  // runStore.is_run = true
  run_code.value = code
  is_run.value = !is_run.value
  console.log('runStore.is_run', runStore.is_run)
}

onUnmounted(() => {
  codeEditor.value && codeEditor.value.destroy()
})
</script>

<template>
  <div class="code-editor">
    <div class="flex code-editor-header">
      <div class="flex code-editor-header-left">
        <div class="flex code-editor-header-item">
          <span clas="span-title">字体:</span>
          <a-select v-model:value="fontSizeSelect" @change="changeFontSize">
            <a-select-option v-for="(v, i) in fontSizeList" :key="i" :value="v">
              {{ v }}
            </a-select-option>
          </a-select>
        </div>
        <!-- <div class="flex code-editor-header-item">
          <span clas="span-title">语言:</span>
          <a-select v-model:value="langSelect" @change="changeTheme">
            <a-select-option v-for="(v, i) in langList" :key="i" :value="v.value">
              {{ v.label }}
            </a-select-option>
          </a-select>
        </div> -->
        <div class="flex code-editor-header-item">
          <span clas="span-title">主题:</span>
          <a-select v-model:value="themeSelect" @change="changeLang">
            <a-select-option v-for="(v, i) in themeList" :key="i" :value="v.value">
              {{ v.label }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="flex code-editor-header-right">
        <a-button type="primary" @click="run">
          <template #icon>
            <caret-right-outlined />
            <!-- <pause-outlined v-else/> -->
          </template>
          运行
          <!-- {{ runStore.isRun ? '暂停' : '运行' }} -->
        </a-button>
        <!-- <a-button type="danger">
          <template #icon>
            <caret-right-outlined />
          </template>
          调试
        </a-button> -->
      </div>
    </div>
    <div class="code-editor-body">
      <v-ace-editor
        @init="editorInit"
        v-model:value="content"
        :lang="lang"
        :theme="theme"
        class="editor"
        :style="{ lineHeight: 1.55 }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-editor {
  .code-editor-header {
    height: 60px;
    background-color: #fff;
    align-items: center;
    padding: 0 15px;
    justify-content: space-between;

    .code-editor-header-left {
      gap: 15px;
    }

    .code-editor-header-right {
      gap: 15px;
    }

    .code-editor-header-item {
      align-items: center;
      gap: 5px;

      .span-title {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .code-editor-body {
    width: 100%;
    height: 500px;

    .editor {
      width: 100%;
      height: calc(100vh - 120px);
      overflow: hidden;
      box-sizing: border-box;
      border-top: 1px solid var(--border-color, #e8e8e8);
      padding: 10px 0 0;
    }
  }
}
</style>

<style>
.ace_gutter {
  background: rgba(0, 0, 0, 0) !important;
}
</style>
