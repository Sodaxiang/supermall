<template>
  <div class="check-btn" :class="{'no-selected': !isSelected}">
      <img src="@/assets/img/cart/tick.svg" alt="" srcset="" v-show="isSelected">
  </div>
</template>
<script>
export default {
    name: 'CheckGoodsBtn',
    props: {
        isSelected: {
            type: Boolean,
            default: false,
        }
    }

}
</script>

<style scoped>
.check-btn{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
}
.no-selected {
    border: 2px solid rgba(100,100,100,.2);
}
.check-btn img {
    border-radius: 50%;
    /* background: red; */
    background: var(--color-tint);
}
</style>
