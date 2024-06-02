<template>
  <div class="calendar-dialog">
    <el-row>
      <el-col :span="24">
        <el-calendar v-model="calendarVal">
          <template #date-cell="{ data }">
            <div class="card-group" @click="selectedDate(data)">
              <div :class="data.isSelected ? 'is-selected card-calendar-text' : 'card-calendar-text'">
                <span>{{ getDate(data.day) }}</span>
                <el-icon v-if="data.isSelected"><Select /></el-icon>
              </div>
              <span v-for="(item, index) in calendarData" :key="index" class="card">
                <div v-if="item.date === data.day" class="card-flag">
                  <div :class="data.isSelected ? 'is-selected' + ' ' + 'card-text' + item.type : 'card-text' + item.type">
                    <span>{{ getDate(data.day) }}</span>
                    <el-icon v-if="data.isSelected"><Select /></el-icon>
                  </div>
                  <div :class="'card' + item.type">
                    <div class="visits-val">{{ item.visits }}</div>
                  </div>
                </div>
                <div v-else />
              </span>
            </div>
          </template>
        </el-calendar>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'CalendarDialog',
  emits: ['selectedDate'],
  setup (props, { emit }) {
    const calendarVal = ref(new Date())
    const calendarData = ref([
      {
        date: '2023-08-18',
        visits: 300,
        type: 1
      },
      {
        date: '2023-08-17',
        visits: 10012,
        type: 2
      },
      {
        date: '2023-08-16',
        visits: 9861,
        type: 3
      }
    ])
    const getDate = (day) => {
      return moment(day).format('DD')
    }
    const selectedDate = (data) => {
      console.log('selectedDate--->prefix', data)
      let selectedData = null
      for (let i = 0; i < calendarData.value.length; i++) {
        const cData = calendarData.value[i]
        if (data.day === cData.date) {
          selectedData = cData
          break
        }
      }
      console.log('selectedDate--->suffix', selectedData)
      emit('selectedDate', data)
    }
    return {
      calendarVal,
      calendarData,
      getDate,
      selectedDate
    }
  }
})
</script>

<!--
    AI-generated-content
    tool: ChatGPT
    version: latest
    usage: I've used it to style the html above
-->
<style lang="less">
// 更改elementplus组件的样式
.calendar-dialog {
  .el-calendar-table .el-calendar-day {
    padding: 0;
  }

  .el-icon {
    height: 8px;
  }

  .card-group.card-calendar-text {
    display: flex;
    justify-content: space-between;
  }

  .el-calendar {
    box-shadow: 0 0 12px 0 #e4e7ed;

    .el-calendar-table {
      thead {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
$titleHeight: 20px;
$lowColor: #409eff;
$middleColor: #ffb802;
$heightColor: #f00;

@mixin card-o($bgColor) {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 15px;
  color: #fff;
  background-color: $bgColor;
}

@mixin card-text-o($bgColor) {
  display: flex;
  justify-content: space-between;
  height: $titleHeight;
  max-height: $titleHeight;
  min-height: $titleHeight;
  font-size: 20px;
  color: #fff;
  background-color: $bgColor;
}

.calendar-dialog {
  .card-group {
    width: 100%;
    height: 100%;

    .card-calendar-text {
      height: $titleHeight;
      max-height: $titleHeight;
      min-height: $titleHeight;
    }

    .card {
      position: relative;
      top: -$titleHeight;
    }

    .card-flag {
      height: calc(100% - $titleHeight);
    }

    .card1 {
      @include card-o($middleColor);
    }

    .card-text1 {
      @include card-text-o($middleColor);
    }

    .card2 {
      @include card-o($lowColor);
    }

    .card-text2 {
      @include card-text-o($lowColor);
    }

    .card3 {
      @include card-o($heightColor);
    }

    .card-text3 {
      @include card-text-o($heightColor);
    }

    .visits-val {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>




