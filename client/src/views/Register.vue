<template>
  <div id="app">
    <Header />
    <register />
  </div>
</template>
<script>
import Header from '@/components/header';
import register from "@/components/register";
export default {
  components: {
    register,
    Header
  }
};
</script>
