<template>
  <div>
    <h3>检查卡</h3>
    <div v-for="(p,i) in procedures" :key="i">
      <!-- 流程区块 -->
      <mt-cell :title="p.name" is-link @click.native="procedure_click(p)">
        <div v-if="p.completed">已完成</div>
      </mt-cell>
      <div v-if="selectedProcedure == p" style="margin-left:2em">
        <div v-for="(c,i_c) in p.checkitems" :key="i_c">
          <!-- 答题状态区 -->
          <mt-cell :title="c.name" is-link @click.native="checkitem_click(c)">
            <div v-if="c.choice==1" style="color: green">√（符合要求）</div>
            <div v-if="c.choice==2" style="color: blue">/（无此项作业内容）</div>
            <div v-if="c.choice==3">
              <span v-if="c.problem" style="color: red">×（不符合要求）</span>
              <span v-else style="color: white; background-color: red">×（不符合要求）</span>
            </div>
          </mt-cell>

          <!-- 作答区块 -->
          <div v-if="selectedCheckitem == c">
            <mt-radio v-model="c.choice" :options="options" @click.native="updateStatus(p)">
            </mt-radio>
            <div v-if="selectedCheckitem.choice=='3'" style="width:100%;text-align:left;">
              <div>请填写存在的问题：</div>
              <textarea rows="4" style="width:100%;" v-model="c.problem" @input="updateStatus(p)"></textarea>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardtype: {},
      procedures: [],
      selectedProcedure: null,
      selectedCheckitem: null,
      options: [
        {
          label: '√（符合要求）',
          value: '1'
        },
        {
          label: '/（无此项作业内容）',
          value: '2'
        },
        {
          label: '×（不符合要求）',
          value: '3'
        }
      ]
    }
  },
  async mounted() {
    let tid = this.$route.params.tid
    this.cardtype = (await axios.get('/api/cardtypes/' + tid)).data
    this.procedures = (await axios.get('/api/procedures/type/' + tid)).data
  },

  methods: {
    procedure_click(p) {
      this.selectedProcedure = this.selectedProcedure == p ? null : p
    },

    checkitem_click(c) {
      if (this.selectedCheckitem == c) this.selectedCheckitem = null
      else this.selectedCheckitem = c
    },

    updateStatus(p) {
      let completed = true
      for (let c of p.checkitems) {
        if (!c.choice) {
          completed = false
          break
        }
        if (c.choice == 3 && !!c.problem) {
          completed = false
          break
        }
      }
      p.completed = completed
    }
  }
}
</script>
