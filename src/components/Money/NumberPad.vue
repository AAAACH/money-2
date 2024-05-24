<template>
    <div class="numberPad">
      <div class="output">{{output}}</div>
      <div class="buttons">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="remove" class="delete"><Icon name="delete"/></button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="clear">C</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="ok" class="ok">确定</button>
        <button @click="inputContent" class="zero">0</button>
        <button @click="inputContent">.</button>
      </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) readonly value!: number;
    output = this.value.toString();

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement)
      const input = button.textContent!
      if(this.output.length === 16) { return; }
      if(this.output === '0') {
        if('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
        } 
      if(this.output.indexOf('.') >= 0 && input === '.') {return;}
      this.output += input;
    }


    remove() {
      if(this.output.length  === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0,-1);
      }    
    }

    clear() {
      this.output = '0';
    }

    ok() {
      const number = parseFloat(this.output);
      this.$emit('update:value', number);
      this.$emit('submit', number);
      this.output = '0';
    }        
  }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  margin-bottom: 4px;
  .output {
    border: 4px solid $color-grey;
    border-radius: 0 0 10px 10px;
    background: $color-white;
    margin: 0 8px;
    padding: 10px;
    text-align: left;
    font-size: 40px;
    font-weight: bold;
    color: $color-theme;
    height: 72px;
    display: flex;
    align-items: center;
  }
  .buttons {
    margin: 4px;
    background: $color-background;
    > button {
      width: 25%;
      height: 64px;
      font-size: 24px;
      font-weight: bold;
      color: #1c2b33;
      background: $color-white;
      border-radius: 10px;
      border: 4px solid $color-background;
      float: left;
      &.delete {
        display: flex;
        justify-content: center;
        align-items: center;
        > svg {
          width: 30px;
          height: 30px;  
        }
      }
      &.ok {
        height: 64 * 2px;
        background: $color-theme;
        color: $color-white;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
    }
  }
}
</style>