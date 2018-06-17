<template>
    <div class="test">
        <h1>Greeting from mw-toolbox!!</h1>
        <br>
        <button class="btn btn-xs btn-info">Info</button>
        <button class="btn btn-sm btn-primary">Primary</button>
        <button class="btn btn-warning">Warning</button>
        <button class="btn btn-lg btn-danger">Danger</button>
    </div>
</template>

<script>
export default {
    name: 'test',

    data () {
        return {
            //
        }
    },
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/main.scss';

.test h1 {
    color: #40b883;
}
</style>
