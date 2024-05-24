<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag.name" @update:value="update" field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button class="deleteButton" @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem},
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }

    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTags');
      this.$store.commit('setCurrentTag', id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.currentTag) {
        this.$store.commit('updateTag', {
          id: this.currentTag.id, name
        });
      }
    }

    remove() {
      if (this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
      }
    }
    
    goBack() {
      this.$router.back();
    }
        
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .navBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    font-size: 16px;
    background: $color-white;
    border-radius: 10px 10px 0 0;
    padding: 12px 16px;
    margin: 16px 16px 0;
    > .title {
      font-size: 18px;
    }
    > .leftIcon {
      width: 24px;
      height: 24px;
      color: #666;
    }
    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper {
    background: $color-white;
    border-radius: 0 0 10px 10px;
    margin: 0 16px 0;
  }
  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
    > .deleteButton {
      background: red;
    }
  }
</style>