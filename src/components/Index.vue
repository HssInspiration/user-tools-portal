<script setup>
import { ref } from 'vue'
// import {AGCFunctionException} from '@agconnect/function';
// import {AGCError} from '@agconnect/instance';
import agconnect from "@hw-agconnect/api";
import {Triggers} from "../common/constant/triggers.js";

const invokeAgc = async () => {
  console.log('Enter')
  let reqBody = {
    "action": "insert"
  }
  let result = await agconnect.function().wrap(Triggers.getToolList).call(reqBody);
  console.log('result: ', result)
 /* .catch(error => {
    //运行云函数失败
    if (error instanceof AGCFunctionException || error instanceof AGCError) {
      // 根据错误码进行处理
    }
  });*/
}

// variable

</script>

<template>
 <div>
   <button @click="invokeAgc">点击调用云函数</button>
 </div>
</template>

<style scoped>

</style>
