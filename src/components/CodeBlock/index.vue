<script setup lang="ts">
import { VAceEditor } from 'vue3-ace-editor'
import type { Ace } from 'ace-builds'
import {
  CaretRightOutlined,
  PauseOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons-vue'
import * as ace from 'ace-builds'
import { ref, computed, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import './index'
import { themeList, langList, fontSizeList } from './index'
// import * as acorn from 'acorn'
import { useRunStore } from '@/stores/run'

const runStore = useRunStore()

const { code: run_code, hight_line } = storeToRefs(runStore)

// 配置路径
ace.config.set('basePath', '/ace-builds/src-noconflict/')

// 主题
const themeSelect = ref<string>('twilight')
// 语言
const langSelect = ref<string>('javascript')
// 字体大小
const fontSizeSelect = ref<number>(14)

const theme = computed<string>(() => themeSelect.value)
const lang = computed<string>(() => langSelect.value)

const defaultCode = `let a = 1, b = 2 , c = 0;

if(a > b) {
  c = a
} else {
  c = b
}
`

const content = ref<string>(defaultCode)
const codeEditor = ref<Ace.Editor | null>(null)

// 编辑器初始化
const editorInit = (editor: Ace.Editor) => {
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    tabSize: 4,
    // 高亮当前行
    highlightActiveLine: true,
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

const changeTheme = (val: string) => {
  codeEditor.value && codeEditor.value?.setTheme(`ace/theme/${val}`)
}

const changeLang = (val: string) => {
  codeEditor.value && codeEditor.value.session.setMode(val)
}

// 运行
const run = () => {
  const code = codeEditor.value?.getValue() || ''
  // runStore.is_run = true
  run_code.value = code
  runStore.run()
}

// 清空代码：
const clear = () => {
  codeEditor.value?.setValue('')
  runStore.clear()
}

// 添加示例代码
const addDefault = () => {
  codeEditor.value?.setValue(defaultCode)
}

watch(hight_line, () => {
  // console.log('line', hight_line.value)
  // codeEditor.value?.gotoLine(line.value, 0, true)
  codeEditor.value?.selection.moveCursorTo(hight_line.value - 1, 0, true)
  // const css = `.ace_gutter-cell.ace_highlight {
  //     background-color: blue;
  //   }`
  // codeEditor.value?.setHighlightGutterLine(true)
  // codeEditor.value?.renderer.setStyle(css)
})

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
        <div class="flex code-editor-header-item">
          <span clas="span-title">语言:</span>
          <a-select v-model:value="langSelect" @change="changeTheme">
            <a-select-option v-for="(v, i) in langList" :key="i" :value="v.value">
              {{ v.label }}
            </a-select-option>
          </a-select>
        </div>
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
        <a-button @click="addDefault">
          <template #icon>
            <edit-outlined />
          </template>
          示例代码
        </a-button>
        <a-button @click="clear">
          <template #icon>
            <delete-outlined />
          </template>
          清空
        </a-button>
        <a-button type="primary" @click="run">
          <template #icon>
            <caret-right-outlined />
            <!-- <pause-outlined v-else/> -->
          </template>
          运行
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
.ace_gutter-cell.ace_highlight {
  background-color: blue;
}
</style>
