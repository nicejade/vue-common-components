var Vue = require('vue')
var VueRouter = require('vue-router')
var rootView = require('./index.vue')
Vue.use(VueRouter)

var router = new VueRouter({
	hashbang: false,
	transitionOnLoad: true
});

router.map({
	"/": {
	    name: 'index',
	    component: require('./desc.vue')
	},
	'/index':{
		name: 'index',
		component: require('./index.vue')
	},
    '/popupToast':{
        name: 'popupToast',
		component: require('./_popupToast.vue')
    },
    '/normalDialog':{
        name: 'normalDialog',
		component: require('./_normalDialog.vue')
    },
    '/strongDialog':{
        name: 'strongDialog',
		component: require('./_strongDialog.vue')
    },
    '/tabBarWithJq':{
        name: 'tabBarWithJq',
		component: require('./_tabBarWithJq.vue')
    },
    '/spanFlexTable':{
        name: 'spanFlexTable',
		component: require('./_spanFlexTable.vue')
    },
    '/countDown':{
        name: 'countDown',
		component: require('./_countDown.vue')
    },
    '/commonTable':{
        name: 'commonTable',
		component: require('./_commonTable.vue')
    },


    '/turnTable':{
        name: 'turnTable',
		component: require('./_turnTable.vue')
    },
    '/formDialog':{
        name: 'formDialog',
		component: require('./_formDialog.vue')
    }
});

router.start(rootView, '#root')
