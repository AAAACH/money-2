<template>
    <div class="tags">
      <ul class="collection">
        <li v-for="tag in tagList" :key="tag.id" :class="{selected: selectedTags.indexOf(tag)>=0}" @click="toggle(tag)">
          <div class="current">
            {{tag.name}}
          </div>
        </li>
        <li>
          <div class="new" @click="createTag">
            <Icon name="add" />
          </div>
        </li>
      </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';
  
  @Component
  export default class Tags extends mixins(TagHelper) {
    selectedTags: string[] = [];

    get tagList() {
      return this.$store.state.tagList;
    }

    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if(index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
        this.$emit('update:value', this.selectedTags);
    }
  } 
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tags {
    background: $color-white;
    font-size: 16px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    > .collection {
      display: flex;
      flex-wrap: wrap;
      > li {
        background: #F5F5F5;
        height: 32px;
        line-height: 32px;
        border-radius: 8px;
        margin-right: 12px;
        margin-top: 10px;
        .current {
          padding: 0 16px;
        }
        &.selected {
          background: $color-theme;
          color: $color-white;
        }
      }
      .new {
        padding: 0 8px;
      }
    }
  }    
</style>