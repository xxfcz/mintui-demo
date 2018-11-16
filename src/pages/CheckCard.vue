<template>
  <div>
    <mt-button @click="categoriesVisible = !categoriesVisible">选择检查卡类型</mt-button>
    <h2>{{selectedCategory}}</h2>
    <ol style="text-align: left">
      <li v-for="(p,i) in procedures" :key="i">
        <h3>作业流程：{{p.name}}</h3>
        <div>盯控项目：</div>
        <div v-for="(item,index) in p.items" :key="index">
          <mt-cell :title="item.content" style="padding-top: 8px">
            <mt-button @click="showConfirmActions(item)">确认</mt-button>
          </mt-cell>
          <div v-if="item.confirm">确认情况：{{CONFIRMS[item.confirm]}}</div>
          <div v-if="item.confirm == 'F'">存在问题：{{item.problem}}</div>
        </div>
      </li>
    </ol>

    <mt-actionsheet :actions="categories" v-model="categoriesVisible"></mt-actionsheet>
    <mt-actionsheet :actions="confirmActions" v-model="confirmActionsVisible"></mt-actionsheet>
    <mt-popup v-model="inputProblem" position="top" closeOnClickModal="false" style="width: 100%">
      <h4>请填写存在的问题：</h4>
      <div>
        <textarea v-model="problem" rows="5" style="width: 90%"></textarea>
      </div>
      <mt-button @click="currentItem.problem=problem;inputProblem=false;">确定</mt-button>
      <mt-button @click="inputProblem=false;">取消</mt-button>
    </mt-popup>
  </div>
</template>

<script>
const CONFIRMS = {
  T: '符合要求',
  F: '不符合要求',
  'N/A': '无此项作业内容'
}

const categories = [
  '接触网作业跟班检查卡',
  '配合施工作业跟班检查卡',
  '变配电作业跟班检查卡',
  '电力作业跟班检查卡',
  '作业车添乘检查卡',
  '点外作业跟班检查卡'
]
const procedures = [
  {
    categoryId: 0,
    name: '天窗作业前',
    items: [
      {
        content:
          '施工负责人提前组织对施工范围内的接触网设备进行调查，重点检查施工方案是否切实可行。',
        confirm: null,
        problem: null
      },
      {
        content:
          '检查分工单是否与接触网工作票中人员及安全等级相符，确定的作业项目、内容是否涵盖问题库中全部问题。接触网天窗作业派工单是否与作业分工单相对应。',
        confirm: null,
        problem: null
      },
      {
        content:
          '核实是否按要求制订“一施工三方案”，即施工组织方案、行车安全方案、人身安全方案，对施工中可能出现的问题提前预想，制定安全措施，做好应急处置的准备工作。',
        confirm: null,
        problem: null
      }
    ]
  },
  {
    categoryId: 0,
    name: '天窗作业中',
    items: [
      {
        content: '检查调度命令传达、接收是否到位。',
        confirm: null,
        problem: null
      }
    ]
  },
  {
    categoryId: 1,
    name: '施工方案审核',
    items: [
      {
        content:
          '施工方案必须按“一施工三方案”制定。审核作业范围、作业地点是否与批复计划一致，人员组织是否满足作业需求，有无经过培训，审核工作票停电范围、安全措施、地线接挂位置。大型机械作业必须制定“一机一方案”，对存在问题提出修改建议。'
      }
    ]
  },
  {
    categoryId: 1,
    name: '配合方案审核',
    items: [
      {
        content:
          '根据施工方案审核配合方案中盯控安排是否合理，明确盯控重点。安全措施必须具有针对性。'
      }
    ]
  }
]

export default {
  data() {
    return {
      CONFIRMS: CONFIRMS,
      categories: categories.map((e, i) => {
        return {
          name: e,
          method: () => {
            this.doSelectCategory(e, i)
          }
        }
      }),
      confirmActions: [
        {
          name: '符合要求',
          method: () => {
            this.confirmItem(this.currentItem, 'T')
          }
        },
        {
          name: '不符合要求',
          method: () => {
            this.confirmItem(this.currentItem, 'F')
          }
        },
        {
          name: '无此项作业内容',
          method: () => {
            this.confirmItem(this.currentItem, 'N/A')
          }
        }
      ],
      procedures: [],
      selectedCategory: null,
      currentItem: null,
      problem: '',

      categoriesVisible: false,
      confirmActionsVisible: false,
      inputProblem: false
    }
  },

  methods: {
    doSelectCategory(c, i) {
      this.selectedCategory = c
      this.procedures = procedures.filter(e => {
        return e.categoryId == i
      })
    },

    showConfirmActions(item) {
      this.currentItem = item
      this.confirmActionsVisible = true
    },

    confirmItem(item, value) {
      this.currentItem.confirm = value
      // 若选择不符合要求，则需要输入存在问题
      if (value == 'F') {
        this.problem = this.currentItem.problem
        this.inputProblem = true
      }
    },

    saveProblem() {}
  }
}
</script>
