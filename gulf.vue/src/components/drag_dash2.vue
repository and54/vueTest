<template>
  <div>
    {{layout}}
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="false"
    :is-mirrored="false"
    :vertical-compact="false"
    :margin="[10, 10]"
    :use-css-transforms="true"
    :auto-size="true"
    :responsive="true"
    :cols="{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }"
  >
    <grid-item
      v-for="item in layout" :key="item.i"
      class="item"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :isDraggable="Boolean(item.d)"
      drag-allow-from=".handle"
      drag-ignore-from=".hand"
    >
      <div class="handle"><div @click="removeBox(item)" class="hand">X</div></div>
      <component v-bind:is="item.c">{{item.c + "  " + item.i}}</component>
    </grid-item>
  </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import CmpProfile from "./dashboard/profile.vue";
import { AuthBus } from "../services/authentication";
import Card1 from './home/card1.vue';

let completeLayout = [
  { x: 0, y: 0, w: 2, h: 3, i: "Extra Info", a: 1, d: 1, c: 'card1' },
  { x: 2, y: 0, w: 2, h: 4, i: "Account Consumption", a: 1, d: 1, c: 'card1' },
  { x: 4, y: 0, w: 3, h: 9, i: "Consumption History", a: 1, d: 1, c: 'cmp-profile' },
  { x: 6, y: 0, w: 2, h: 3, i: "Some Graphics", a: 1, d: 1, c: 'card1'},
  { x: 8, y: 0, w: 2, h: 3, i: "Something Else", a: 0, d: 1, c: 'card1' },
  { x: 9, y: 0, w: 2, h: 7, i: "Client Info", a: 1, d: 0, c: 'cmp-profile' },
  { x: 0, y: 5, w: 2, h: 5, i: "More Info", a: 1, d: 1, c: 'card1' },
  { x: 2, y: 5, w: 2, h: 5, i: "Dub Badda Dub", a: 1, d: 1, c: 'card1' }
];

export default {
  data: () => ({
    layout: [],
    userInfo: AuthBus.user ? AuthBus.user : {},
  }),
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Card1,
    CmpProfile
  },
  created() {
    this.filterLayout();
  },
  methods: {
    removeBox(item) {
      completeLayout.map((v, i) => {
        if (v.i === item.i)completeLayout[i].a = 0;
      });
      this.filterLayout();
    },
    filterLayout() {
      this.layout = [];
      completeLayout.map((v, i) => {
        if (v.a)this.layout.push(v);
      });
    }
  }
};
</script>

<style scoped>
.item {
  /*border: solid 1px black;*/
}
.handle {
  width: 100%;
  height: 20px;
  background-color: blueviolet;
  color: white;
}
.hand {
  width: 14px;
  cursor: pointer;
  position: relative;
  float: right;
}

</style>

<style>
.vue-grid-item.vue-grid-placeholder {
  background: black;
  opacity: 0.1;
}
</style>


