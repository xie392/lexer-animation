<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import type { Ace } from 'ace-builds'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import * as ace from 'ace-builds'
import { ref, computed, onUnmounted } from 'vue'

// import babel from '@babel/core'
import parser from '@babel/parser'
// const parser = require('@babel/parser')

// ase
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/mode-scss'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/mode-c_cpp'

// theme
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-merbivore_soft'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-searchbox'

// 配置路径
ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict/')

const themeList = [
  { label: 'github', value: 'github' },
  { label: 'monokai', value: 'monokai' },
  { label: 'tomorrow', value: 'tomorrow' },
  { label: 'xcode', value: 'xcode' },
  { label: 'kuroir', value: 'kuroir' },
  { label: 'twilight', value: 'twilight' },
  { label: 'textmate', value: 'textmate' },
  { label: 'solarized_dark', value: 'solarized_dark' },
  { label: 'solarized_light', value: 'solarized_light' },
  { label: 'terminal', value: 'terminal' },
  { label: 'merbivore_soft', value: 'merbivore_soft' }
]

const langList = [
  { label: 'javascript', value: 'javascript' },
  { label: 'html', value: 'html' },
  { label: 'css', value: 'css' },
  { label: 'json', value: 'json' },
  { label: 'markdown', value: 'markdown' },
  { label: 'scss', value: 'scss' },
  { label: 'typescript', value: 'typescript' },
  { label: 'c/cpp', value: 'c_cpp' }
]

const fontSizeList = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]

const themeSelect = ref<string>('tomorrow')
const langSelect = ref<string>('javascript')
const fontSizeSelect = ref<number>(14)

const theme = computed<string>(() => themeSelect.value)
const lang = computed<string>(() => langSelect.value)

const content = ref(`let a = 1
let b = 2
let c = a + b
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
  const code = codeEditor.value?.getValue()
  // if (!code || runStore.isRun) return
  // // const isRun = !runStore.isRun
  // runStore.run(true)
  console.log('codeEditor', code)
  // 生成 ast 语法树
  // const ast = parser.parse(code || '')
  console.log('ast', parser)
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
