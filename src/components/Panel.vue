<template>
    <div class="panel panel-default">
        <div v-if="headerExists" class="panel-heading">
            <div class="panel-heading-main">
            	<slot name="header"></slot>
            </div>
            <slot name="header-right"></slot>
       </div>
       <div v-if="bodyExists" class="panel-body">
       		<slot></slot>
       </div>
       <div v-if="footerExists" class="panel-footer">
       		<slot name="footer"></slot>
       </div>
    </div>
</template>

<script>
	export default {
		computed: {
			headerExists() {
				return !! this.$slots['header'] || this.$slots['header-right'] ;
			},

			bodyExists() {
				return !! this.$slots.default;
            },
            
            footerExists() {
                return !! this.$slots['footer'];
            },
		}
	}
</script>

<style lang="sass" scoped>
@import '../assets/sass/panel.scss';
</style>
