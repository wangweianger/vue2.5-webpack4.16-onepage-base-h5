<style lang="scss" scoped>
	#content{
	    overflow-y: auto;
	    max-width:750px;
	    margin:0 auto;
	    font-size:14px;
	}
</style>

<template>
	<div id="mainbody">
		<div id="content">
      		<router-view class="view"></router-view>
      	</div>
    </div>
</template>

<script>
  	import store from './vuex/store';
  	export default {
  		name: 'app',
	  	components :{
	  	},
	    store,
	    data(){
	    	return{
	    		
	    	}
	    },
	    methods:{

	    }
  	}
</script>

