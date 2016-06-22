var Vue = require('vue')
var VueRouter = require('vue-router')
var rootView = require('./index.vue')
Vue.use(VueRouter)

var router = new VueRouter({
	hashbang: false,
	transitionOnLoad: true
});

var routerMap = {
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
    '/tabBarWithRouter/':{
        name: 'tabBarWithRouter',
        component: require('./_tabBarWithRouter.vue')
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
    },
	'/shaveLottery':{
        name: 'shaveLottery',
        component: require('./_shaveLottery.vue')
    }
}

if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) continue;
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
        }
      }
      return to;
    }
  });
}

/*-----------------------------------tabBarWithRouter-------------------------------Start*/
var tabbarConfig = require('./../config/tabbar.config.js')();

var tabbarRouter = {
    '/tabBarWithRouter':{
        name: 'tabBarWithRouter',
        component:  require('./_tabBarWithRouter.vue'),
        subRoutes:{
            '/':{
                component: require('./main.vue')
            }
        }
    }
}

for(var key in tabbarConfig){
    var index = tabbarConfig[key]['index']
    var components = tabbarConfig[key]['components']
    tabbarRouter['/tabBarWithRouter'].subRoutes[index] = {
        component: require(components)
    }
}
/*-----------------------------------tabBarWithRouter---------------------------------End*/

routerMap = Object.assign(routerMap, tabbarRouter)

router.map(routerMap);

router.start(rootView, '#root')
