<template>
  <div id="app" style="overflow-y: hidden;">
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
</script>

<style>
.fade-enter-active {
  transition: opacity .7s;
  animation: fade-in .7s ease-out forwards;
}
.fade-leave-active {
  transition: opacity .7s;
  animation: fade-out .7s ease-out forwards;
  opacity: 0;
}
.fade-enter,  {
  opacity: 0;
}
@keyframes fade-in {
  from {
    transform: translateY(20px);
  } to {
    transform: translateY(0);
  }
}
@keyframes fade-out {
  from {
    transform: translateY(0);
  } to {
    transform: translateY(20px);
  }
}
</style>
