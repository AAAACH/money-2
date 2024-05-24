<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div v-if="groupedList.length > 0" class="export"></div>
    <div v-if="groupedList.length > 0" class="bill">
      <ol>
        <li v-for="(group, index) in groupedList" :key="index" class="oneDay">
          <h3 class="title">
            {{beautify(group.title)}}<span class="amount">￥{{group.total}}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <div v-else class="noResult">
      <Icon name="notice" />
      <span>暂无相关记录</span>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  
  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' :
        tags.map(t => t.name).join('，');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        console.log('hi');
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;

      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          console.log(sum);
          console.log(item);
          return sum + item.amount;
        }, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/style/helper.scss";
  .export {
    width: calc(100% - 16px);
    height: 10px;
    margin: 16px 8px 0;
    border-radius: 10px;
    background: #1c2b33;
  }  
  .bill {
    width: calc(100% - 32px);
    margin: -5px 16px 16px;
    border-radius: 0 0 10px 10px;
    background: $color-white;
    box-shadow: 0 5px 5px $color-shadow;
    .oneDay:not(:last-child) {
      border-bottom: 1px dashed $color-grey;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      line-height: 24px;
      font-weight: bold;
    }
    .amount {
      font-weight: bold;
      color: $color-theme;
    }
    .record {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      line-height: 24px;
      .notes {
        margin-right: auto;
        margin-left: 32px;
        color: $color-grey;
      } 
    }
  }
  .noResult {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 32px 0;
    .icon {
      width: 48px;
      height: 48px;
      color: $color-grey;
    }
    span {
      margin-top: 20px;
      font-size: 16px;
      color: $color-grey;
      font-weight: bold;
    }
  }
</style>