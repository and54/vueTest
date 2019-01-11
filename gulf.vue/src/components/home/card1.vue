<template>
    <md-card md-with-hover class="card">
        <h1>simple card</h1>
        <h4><slot></slot></h4>
    </md-card>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.card {
    width: 100%;
    height: calc(100% - 20px);
}
h1 {
    margin: 10px;
    margin-top: 0px;
    padding-top: 20px;
}
h4 {
    margin: 10px;
}
</style>
