"use strict";!function(o){var n={};function a(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return o[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=o,a.c=n,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,o){t.exports=o(1)},function(t,e,o){Object.defineProperty(e,"__esModule",{value:!0});var n=o(2),a=o(3),i=o(4),l=o(5),s=o(6),c=o(17);angular.module("app",["ngAnimate","ui.router","base64",n.a,l.a,s.a,a.a,i.a]),angular.module("warehouse",["ngAnimate","ui.router","base64",n.a,l.a,s.a,a.a,i.a,c.a])},function(t,e,o){e.a=angular.module("filter",[]).filter("hidepasswd",function(){return function(t){if(null!=t){for(var e="",o=0;o<t.password.length;o++)e+="*";return t.username+":"+e}}}).filter("getNumberArray",function(){return function(t){return new Array(parseInt(t))}}).name},function(t,e,o){e.a=angular.module("config",[]).config(["$interpolateProvider",function(t){t.startSymbol("[["),t.endSymbol("]]")}]).config(["$httpProvider",function(t){t.interceptors.push("httpInterceptor")}]).factory("httpInterceptor",function(){return{response:function(t){return 200===t.status&&angular.isString(t.data)&&window.location.reload(),t}}}).name},function(t,e,o){e.a=angular.module("rest",[]).service("scan",["$http",function(e){this.mOptions=function(){return e({url:"/m/options"})},this.newStock=function(t){return e({url:"/api/stock/",data:t,method:"POST"})},this.delStock=function(t){return e({url:"/api/stock/",data:{action:"delete",id:t},method:"POST"})},this.listStock=function(t){return e({url:"/api/stock",params:t})},this.getStock=function(t){return e({url:"/api/stock/"+t})},this.queryStock=function(t){return e({url:"/api/stock/",params:t})},this.newFlow=function(t){return e({method:"POST",url:"/api/flow/",data:t})},this.newFlowBatch=function(t){return e({method:"POST",url:"/api/flow/batch",data:t})},this.updateFlow=function(t){return t.action="update",e({method:"POST",url:"/api/flow/",data:t})},this.commitFlow=function(t){return t.action="commit",e({method:"POST",url:"/api/flow/",data:t})},this.delFlow=function(t){return e({method:"POST",url:"/api/flow/",data:{action:"delete",id:t}})},this.listFlow=function(t){return e({url:"/api/flow/",params:t})},this.listWarehouse=function(t){return e({url:"/api/warehouse",params:t})},this.newWarehouse=function(t){return e({url:"/api/warehouse",method:"POST",data:t})}}]).service("admin",["$http",function(e){this.updateUserPassword=function(t){return e({url:"/admin/user/password",data:t,method:"POST"})}}]).name},function(t,e,o){e.a=angular.module("ctrl",[]).constant("Flow",function(o,t,n,e,a){var i={error:null,method:a.method,scan:e,inputBarCode:"",flowList:[],doneList:[],onFly:!1,show:!1,deleteItem:null,commitItem:null,start:function(){var e=this;this.onFly=!0;for(var t=this.scan[this.method],o=this.flowList.pop();o;)t(o).then(function(t){t.data.success?e.doneList.push(o):e.flowList.push(o)}),o=this.flowList.pop()},delete:function(){this.deleteItem&&e.delFlow(this.deleteItem.id).then(function(t){t.data.success&&window.location.reload()})},initFlowList:function(){var e=this;this.show=!1,this.scan.listFlow({method:this.method,wid:a.wid}).then(function(t){e.flowList=t.data.flowList,e.show=!0})},onBarcodeInput:function(t){var e=this;13==t.keyCode&&this.scan.newFlow({warehouse_id:a.wid,method:a.method,barcode:this.inputBarcode}).then(function(t){t.data.success?(e.error=null,window.location.reload()):(e.inputBarcode="",e.error=t.data.error)})},promise:null,onQuantityChange:function(t,e){var o=this;null!=t.flowQuantity?(null!=this.promise&&n.cancel(this.promise),this.promise=n(function(){o.scan.updateFlow({method:o.method,id:t.id,flowQuantity:t.flowQuantity}).then(function(t){console.log(t.data.success),o.promise=null})},500)):t.flowQuantity=parseInt(e)},commit:function(){this.commitItem&&this.scan.commitFlow({id:this.commitItem.id,method:this.method}).then(function(t){t.data.success?window.location.reload():alert("Fail to commit!")})},upload:function(t){this.scan.newFlowBatch({warehouse_id:a.wid,method:a.method,barcodeLines:t.split("\n").filter(function(t){return t.trim()})}).then(function(t){t.data.noneStockBarcode?o.$emit("error",t.data.noneStockBarcode):window.location.reload()})},popupDelete:function(t){var e=this;this.deleteItem=t,o.$emit("popupConfirmModal",{modal:{title:"删除物料",text1:"确定删除",text2:[t.name+" x "+t.flowQuantity+t.measurement_text].join("")},submit:function(){e.delete()}})},popupCommit:function(t){var e=this;this.commitItem=t,o.$emit("popupConfirmModal",{modal:{title:"更新"+o.flowText,text1:"确认"+o.flowText,text2:[t.name+" x "+t.flowQuantity+t.measurement_text].join("")},submit:function(){e.commit()}})},toggleSidebar:function(){o.$emit("toggleSidebar")}};return o.$on("upload",function(t,e){i.upload(e)}),i}).constant("translate",function(t){var o,n,a=(o="192AGZbdhjmpt",n={},"AbdGhjm1pt9Z=".split("").forEach(function(t,e){n[t]=o[e]}),n),i=t.split("");return i.forEach(function(t,e){t in a&&(i[e]=a[t])}),i.join("")}).constant("getCurWid",function(){return angular.element('[name="wid"]').val()}).controller("layoutCtrl",["$scope",function(o){var n=this;this.key="_sidebarOpen",this.sidebar={open:store.get(this.key)||!1,show:!1},this.toggleSidebar=function(t){n.sidebar.open=!n.sidebar.open,store.set(n.key,n.sidebar.open)},o.$on("popupConfirmModal",function(t,e){o.$broadcast("resolveConfirm",e)}),o.$on("toggleSidebar",this.toggleSidebar),o.$on("sidebar",function(t,e,o){n.sidebar={open:null===e?n.sidebar.open:e,show:null===o?n.sidebar.show:o}}),o.$on("confirmUpload",function(t,e){o.$broadcast("upload",e)}),o.$on("error",function(t,e){o.$broadcast("showModalError",e)})}]).controller("stockCtrl",["$scope","$timeout","$state","scan","getCurWid",function(o,e,n,a,t){o.stock={warehouse_id:t(),duplicate:[],animate:!1,show:!1,data:{},stockList:[],mOptions:{},searchText:"",promise:null,deleteItem:null,checkAll:!1,flowoutAllDisabled:!0,checkedFlowoutAllowed:function(){if(!this.hasCheckedItem())return!1;var e=!0;return this.stockList.forEach(function(t){t.checked&&t.quantity<=0&&(e=!1)}),e},hasCheckedItem:function(){var e=!1;return this.stockList.forEach(function(t){t.checked&&(e=!0)}),e},onCheckAllChange:function(){var e=this;this.stockList.forEach(function(t){t.checked=!!e.checkAll})},onCheckChange:function(t){t.checked||(this.checkAll=!1);var e=1;this.stockList.forEach(function(t){e&=t.checked?1:0}),1===e&&(this.checkAll=!0)},onSearchTextChange:function(){var t=this;null!=this.promise&&e.cancel(this.promise),this.searchText.trim().length<1||(this.promise=e(function(){console.log(t.searchText)},500))},isDuplicate:function(){return this.animate=!1,a.queryStock({barcode:this.data.barcode,wid:this.warehouse_id}).then(function(t){return console.log(t.data),t.data.success?(this.duplicate.push(this.data.barcode),!0):!(this.duplicate=[])}.bind(this))},save:function(t){var o=this;t&&this.isDuplicate().then(function(t){if(t)o.animate=!0;else{var e=Object.assign({},o.data);e.warehouse_id=o.warehouse_id,a.newStock(e).then(function(t){t.data.success?n.reload():alert("error on create")})}})},popupDelete:function(t){var e=this;this.deleteItem=t,o.$emit("popupConfirmModal",{modal:{title:"删除物料",text1:"确定删除",text2:[t.name+" x "+t.quantity+t.measurement_text].join("")},submit:function(){e.delete()}})},delete:function(){if(this.deleteItem)return a.delStock(this.deleteItem.id).then(function(t){t.data.success?window.location.reload():alert("error on delete")}),!1},initStockList:function(){var e=this;a.listStock({wid:this.warehouse_id}).then(function(t){e.stockList=t.data.stockList,e.show=!0}),a.mOptions().then(function(t){e.mOptions=t.data})},toggleSidebar:function(){o.$emit("toggleSidebar")}},o.$on("delete",function(){o.stock.delete()}),o.stock.initStockList(),o.$emit("sidebar",null,!0)}]).controller("flowinCtrl",["$scope","$state","$timeout","scan","Flow","getCurWid",function(t,e,o,n,a,i){t.flow=new a(t,e,o,n,{method:"flow-in",wid:i()}),t.flow.initFlowList(),t.flowText="入库",t.$emit("sidebar",null,!0)}]).controller("flowoutCtrl",["$scope","$state","$timeout","scan","Flow","getCurWid",function(t,e,o,n,a,i){t.flow=new a(t,e,o,n,{method:"flow-out",wid:i()}),t.flow.initFlowList(),t.flowText="出库",t.$emit("sidebar",null,!0)}]).controller("stockFlowsCtrl",["$scope","$stateParams","scan",function(e,t,o){e.curStock=null,o.listFlow({stockid:t.id}).then(function(t){e.flowList=t.data.flowList,e.stock=t.data.stock}),e.goBack=function(){window.history.back()},e.$emit("sidebar",!1,!1)}]).controller("changepasswordCtrl",["$scope","$timeout","$base64","admin","translate",function(t,e,o,n,a){var i=t;i.opasswd="",i.npasswd="",i.cpasswd="",i.log=null,i.identifyPassword=function(){i.cpasswd&&i.npasswd&&(i.cpasswd===i.npasswd?i.log=null:null===i.log&&(i.log={text:"新密码与确认密码不一致",level:"error"}))},i.onSubmitPasswordForm=function(){n.updateUserPassword({opasswd:a(o.encode(i.opasswd)),npasswd:a(o.encode(i.npasswd)),cpasswd:a(o.encode(i.cpasswd))}).then(function(t){i.log=null,t.data.success?i.log={text:"密码修改成功",level:"info"}:i.log={text:{1:"旧密码错误"}[t.data.error],level:"error"},i.opasswd="",i.npasswd="",i.cpasswd=""})}}]).controller("warehouseFormCtrl",["$scope","$timeout","scan",function(e,t,o){var n=this;n.warehouse={},n.log=null,n.countdown=3,n.submitDisabled=!1,n.getLogText=function(){var t=void 0;return"info"==n.log.level?t=n.log.text+", "+n.countdown+"秒后刷新...":"error"==n.log.level&&(t=n.log.text),t},n.onSubmitWarehouseForm=function(){o.newWarehouse(n.warehouse).then(function(t){if(n.log=null,t.data.success){n.log={level:"info",text:"创建成功"},n.submitDisabled=!0;setInterval(function(){e.$apply(function(){n.countdown--}),0===n.countdown&&(window.location.href="/")},1e3)}else n.log={level:"error",text:{1:"仓库已存在"}[t.data.error]}})}}]).controller("confirmModalCtrl",["$scope",function(t){var o=this;t.$on("resolveConfirm",function(t,e){o.modal=e.modal,o.submit=e.submit})}]).controller("uploadModalCtrl",["$scope",function(t){var o=this;this.submit=function(){t.$emit("confirmUpload",o.input)},t.$on("showModalError",function(t,e){o.error=e})}]).name},function(t,e,o){var n=o(7),a=o.n(n),i=o(8),l=o.n(i),s=o(9),c=o.n(s),r=o(10),d=o.n(r),u=o(11),m=o.n(u),p=o(12),f=o.n(p),h=o(13),b=o.n(h),w=o(14),g=o.n(w),v=o(15),k=o.n(v),y=o(16),x=o.n(y);e.a=angular.module("component",[]).component("stockList",{template:a.a,controller:"stockCtrl"}).component("stockForm",{template:l.a,controller:"stockCtrl"}).component("stockFlows",{template:c.a,controller:"stockFlowsCtrl"}).component("flowinList",{template:d.a,controller:"flowinCtrl"}).component("flowoutList",{template:d.a,controller:"flowoutCtrl"}).component("changepasswordform",{template:m.a,controller:"changepasswordCtrl"}).component("settingsNav",{template:f.a}).component("sidebar",{template:b.a}).component("warehouseForm",{template:g.a,controller:"warehouseFormCtrl"}).component("confirmModal",{template:k.a,controller:"confirmModalCtrl"}).component("uploadModal",{template:x.a,controller:"uploadModalCtrl"}).name},function(t,e){t.exports='<div class=sidebar> <div class="panel panel-info"> <div class=panel-heading> <h3 class=title>新建库存</h3> </div> <div class=panel-body> <stock-form></stock-form> </div> </div> </div> <div class="col-xs-12 col-md-12"> <div class="panel panel-info"> <div class=panel-heading> <div class=row> <div class=col-md-2> <h3 class=title> 库存列表 </h3> </div> <div class="col-md-3 col-md-offset-7"> <div class="input-group search"> <input ng-model=stock.searchText ng-change=stock.onSearchTextChange() type=text class=form-control placeholder="物料名称 | 条形码"> </div> </div> </div> </div> <div class=panel-body> <div class=table-responsive> <table class="table table-hover table-layout"> <thead> <tr ng-show=stock.show ng-cloak> <th></th> <th><input type=checkbox ng-model=stock.checkAll ng-change=stock.onCheckAllChange()></th> <th>物料名称</th> <th>条形码</th> <th>成本单价(元)</th> <th>数量</th> <th>总价(元)</th> <th>状态</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat="item in stock.stockList" ng-cloak> <td>[[ $index + 1 ]]</td> <th><input type=checkbox ng-checked=item.checked ng-model=item.checked ng-change=stock.onCheckChange(item)></th> <td>[[ item.name ]]</td> <td>[[ item.barcode ]]</td> <td>[[ item.unitprice | currency: "&#165;&nbsp;" ]]</td> <td>[[ item.quantity + item.measurement_text ]]</td> <td>[[ item.unitprice * item.quantity | currency: "&#165;&nbsp;" ]]</td> <td> <span><i class="fa fa-fw fa-check-circle text-success"></i>入库</span> <span><i class="fa fa-fw" ng-class="{true: \'fa-check-circle text-success\', false: \' fa-times-circle text-danger\'}[item.quantity > 0]"></i>出库</span> </td> <td> <a ui-sref="stockFlows({id: item.id})" class="btn btn-info" ui-sref-active=active>详情</a> <a ui-sref="stockIn({id: item.id})" class="btn btn-primary">入库 </a> <a ui-sref="stockOut({id: item.id})" ng-if="item.quantity > 0" class="btn btn-warning">出库 </a> <button ng-if=item.noFlows class="btn btn-danger" data-toggle=modal data-target=#confirm-modal ng-click=stock.popupDelete(item)>删除 </button> </td> </tr> <tr> <td colspan=9 ng-show=stock.show> <a ui-sref=stockIn() class="btn btn-primary" ng-disabled=!stock.hasCheckedItem()>全部入库 </a> <a ui-sref=stockOut() ng-disabled=!stock.checkedFlowoutAllowed() class="btn btn-warning">全部出库 </a> </td> </tr> </tbody> </table> <p ng-show="stock.show && stock.stockList.length == 0" ng-cloak> 暂无数据 </p> <div class=pull-right> </div> </div> </div> </div> </div>'},function(t,e){t.exports='<form ng-submit=stock.save(myForm.$valid) name=myForm> <div class=form-layout> <label>物料名称</label> <input type=text class=form-control placeholder=物料名称 ng-model=stock.data.name required="" ng-focus=stock.focus> <div class=info-group> <label>条形码</label> <span class=toggle-info> <i class="fa fa-info-circle fa-lg"></i> </span> <div ng-cloak class="text-danger shake" ng-class="{\'animated\':stock.animate}" ng-show="stock.duplicate.length > 0"> <label>库存条形码[[ stock.duplicate[0] ]]已存在</label> </div> <p class="alert alert-info" style=display:none> 温馨提示：<br> 1.鼠标点击条形码输入框<br> 2.用扫码抢进行扫码 </p> </div> <input type=text class=form-control placeholder=条形码 ng-model=stock.data.barcode required> <label>成本单价(元)</label> <input type=number max=999 min=0.1 step=0.1 class=form-control placeholder=成本单价 ng-model=stock.data.unitprice required=""> <label>度量单位</label> <select id=select-unit class=form-control ng-model=stock.data.measurement required=""> <option value=""></option> <option ng-repeat="(key, value) in stock.mOptions" ng-value=value>[[ key ]]</option> </select> <button class="btn btn-primary submit-btn">保存</button> </div> </form>'},function(t,e){t.exports='<div class="col-md-12 col-xs-12"> <div class="panel panel-info" ng-cloak> <div class=panel-heading> <div class=row> <div class=col-md-5> <h3 class=title> 库存详情: [[ stock.name ]] - [[ stock.barcode ]]</h3> <p><a href=javascript:; ng-click=goBack();><b>[返回]</b></a></p> </div> </div> </div> <div class=panel-body> <div class=table-responsive> <table class="table table-hover sortable table-layout"> <thead> <tr ng-cloak> <th></th> <th>物料名称</th> <th>条形码</th> <th>单价</th> <th>数量</th> <th>总价(元)</th> <th>历史库存</th> <th>历史库存总价(元)</th> <th>更新时间</th> </tr> </thead> <tbody> <tr ng-repeat="item in flowList" ng-cloak> <td>[[ $index + 1 ]]</td> <td>[[ item.name ]]</td> <td>[[ item.barcode ]]</td> <td>[[ item.unitprice | currency: "&#165;&nbsp;" ]]</td> <td ng-show="item.flowin_quantity > 0" class="text-success quantity"> <i>+[[ item.flowin_quantity ]]</i></td> <td ng-show="item.flowin_quantity > 0"> [[ item.unitprice * item.flowin_quantity | currency: "&#165;&nbsp;" ]]</td> <td ng-show="item.flowout_quantity > 0" class="text-danger quantity"> <i>-[[ item.flowout_quantity ]]</i></td> <td ng-show="item.flowout_quantity > 0"> [[ item.unitprice * item.flowout_quantity | currency: "&#165;&nbsp;" ]]</td> <td>[[ item.flowed_stock_quantity + item.measurement_text]]</td> <td>[[ item.unitprice * item.flowed_stock_quantity | currency: "&#165;&nbsp;" ]]</td> <td>[[ item.modified ]]</td> </tr> </tbody> </table> <p ng-show="flowList.length == 0" ng-cloak> 暂无数据 </p> </div> </div> </div> </div>'},function(t,e){t.exports='<div class=sidebar> <div class="panel panel-info"> <div class=panel-heading> <h3 class=title>扫码[[ flowText ]]</h3> </div> <div class=panel-body> <div class=form-layout> <form> <div class=info-group> <label>条形码</label> <span class=toggle-info> <i class="fa fa-info-circle fa-lg"></i> </span> <p class="alert alert-info"> 温馨提示：<br> 1.鼠标点击条形码输入框<br> 2.用扫码抢进行扫码<br> 3.支持批量上传条形码 </p> </div> <input type=text class=form-control placeholder=扫码或输入条形码 ng-model=flow.inputBarcode required="" ng-keyup=flow.onBarcodeInput($event) autofocus=true ng-focus=true> </form> <button class="btn btn-primary submit-btn" id=batch-upload-btn data-toggle=modal data-target=#upload-in-batch-modal> 批量上传 <i class="fa fa-fw fa-cloud-upload"></i> </button> </div> </div> </div> <div class="panel panel-danger" ng-if=flow.error ng-cloak> <div class=panel-heading> <label>[[ flow.error.title ]]</label> </div> <div class=panel-body> <p class=text-danger> [[ flow.error.text ]] </p> </div> </div> </div> <script>$(function(){$("#upload-in-batch-modal").on("shown.bs.modal",function(){$(this).find("#textarea").focus()})})<\/script>  <div class="col-xs-12 col-md-12"> <div class="panel panel-info"> <div class=panel-heading> <div class=row> <div class=col-md-2> <h3 class=title> [[ flowText ]]明细</h3> </div> <div class="col-md-3 col-md-offset-7"> <div class="input-group search"> <input ng-model=stock.searchText ng-change=stock.onSearchTextChange() type=text class=form-control placeholder="物料名称 | 条形码"> </div> </div> </div> </div> <div class=panel-body> <div class=table-responsive> <table class="table table-hover table-layout"> <thead> <tr ng-show=flow.show ng-cloak> <th></th> <th>物料名称</th> <th>条形码</th> <th>成本单价(元)</th> <th>当前库存</th> <th>[[ flowText ]]数量</th> <th>[[ flowText ]]总价(元)</th> <th>更新时间</th> <th>状态</th> <th>操作</th> </tr> </thead> <tbody id=flow> <tr ng-repeat="item in flow.flowList" ng-cloak ng-init="isflowin = item.flowQuantity == item.flowin_quantity"> <td>[[ $index + 1 ]]</td> <td><a ui-sref="stockFlows({id: item.stock_id})">[[ item.name ]]</a></td> <td>[[ item.barcode]]</td> <td>[[ item.unitprice | currency: "&#165;"]]</td> <td>[[ item.quantity + item.measurement_text ]]</td> <td ng-if=item.flowed class=quantity ng-class="{true: \'text-success\', false: \'text-danger\'}[isflowin]"> <i> [[ {true: \'+\' + item.flowin_quantity, false: \'-\' + item.flowout_quantity}[isflowin] ]] </i> </td> <td ng-if=!item.flowed> <input ng-if=isflowin class=form-control type=number ng-model=item.flowQuantity max=999 min=1 step=1 ng-change="flow.onQuantityChange(item, \'[[item.flowQuantity]]\')"> <input ng-if=!isflowin class=form-control type=number ng-model=item.flowQuantity max=[[item.quantity]] min=1 step=1 ng-change="flow.onQuantityChange(item, \'[[item.flowQuantity]]\')"> </td> <td>[[ item.flowQuantity * item.unitprice | currency: "&#165;" ]]</td> <td>[[ item.modified ]]</td> <td>[[ item.flowed? \'已提交\': "未提交"]]</td> <td ng-if=item.flowed>无</td> <td ng-if=!item.flowed> <button class="btn btn-primary" data-toggle=modal data-target=#confirm-modal ng-click=flow.popupCommit(item)>[[ flowText ]] </button> <button class="btn btn-danger" data-toggle=modal data-target=#confirm-modal ng-click=flow.popupDelete(item)>删除 </button></td> </tr> </tbody> </table> <p ng-show="flow.show && flow.flowList.length == 0" ng-cloak> 暂无数据 </p> </div> </div> </div> </div> '},function(t,e){t.exports='<div class="col-xs-12 col-md-4"> <div class="panel panel-default"> <div class=panel-heading> <h3>修改密码</h3> </div> <div class=panel-body> <form method=post name=passwordForm ng-submit=onSubmitPasswordForm()> <div class=form-layout> <label>旧密码</label> <input type=password class=form-control placeholder=输入旧密码 ng-model=opasswd required="" autocomplete=""> <label>新密码</label> <input type=password class=form-control placeholder=输入新密码 minlength=8 maxlength=16 ng-model=npasswd required="" autocomplete=""> <label>确认新密码</label> <input type=password class=form-control placeholder=确认新密码 minlength=8 maxlength=16 ng-model=cpasswd required="" autocomplete="" ng-change=identifyPassword()> <label ng-class="{error: \'text-danger\', info: \'text-success\'}[log.level]" ng-if=log>{{ log.text }}</label> <button class="btn btn-primary submit-btn" ng-disabled="!(passwordForm.$valid && npasswd == cpasswd)">保存</button> </div> </form> </div> </div> </div>'},function(t,e){t.exports='<div class="col-xs-12 col-md-2"> <ul class="nav nav-pills nav-stacked nav-pills-stacked-example"> <li role=presentation class=active><a ui-sref=settings.password>修改密码</a></li> <li role=presentation><a>其他设置</a></li> </ul> </div>'},function(t,e){t.exports='<div class=sidebar> <div class="panel panel-info"> <div class=panel-heading> <h3 class=title>选择仓库</h3> </div> <div class=panel-body> <a href=/warehouse class=pull-right> <i class="fa fa-fw fa-plus"></i>新建 </a> <ul> <li class=active><a href=#>刘行</a></li> <li><a href=#>静安</a></li> <li><a href=#>张江</a></li> </ul> </div> </div> </div> '},function(t,e){t.exports='<div class="col-md-4 col-xs-12 col-md-offset-4"> <div class="panel panel-info"> <div class=panel-heading> <h3 class=title>创建一个新的仓库</h3> </div> <div class=panel-body> <form method=post name=warehouseForm ng-submit=$ctrl.onSubmitWarehouseForm()> <div class=form-layout> <label>仓库名称</label> <input type=text class=form-control placeholder=仓库名称 required="" autofocus="" ng-model=$ctrl.warehouse.name> <label ng-class="{error: \'text-danger\', info: \'text-success\'}[$ctrl.log.level]" ng-if=$ctrl.log>[[ $ctrl.getLogText() ]]</label> <button class="btn btn-primary submit-btn" ng-disabled="$ctrl.submitDisabled || warehouseForm.$invalid">创建</button> </div> </form> </div> </div> </div>'},function(t,e){t.exports=' <div class="modal fade" tabindex=-1 role=dialog aria-labelledby=mySmallModalLabel aria-hidden=true id=confirm-modal> <div class="modal-dialog modal-sm"> <div class=modal-content> <div class=modal-header> <button type=button class=close data-dismiss=modal> <span aria-hidden=true>&times;</span> <span class=sr-only>Close</span> </button> <h4 class="modal-title text-center">[[ $ctrl.modal.title ]]</h4> </div> <div class=modal-body> <form class=form-inline ng-submit=$ctrl.submit()> <div class=text-center> <span class=help-block> [[ $ctrl.modal.text1 ]] <b class=text-danger>[[ $ctrl.modal.text2 ]]?</b></span> <span class=text-danger><b>[[ $ctrl.modal.text3 ]]</b></span> </div> <div class=modal-footer> <div class=btn-group> <button type=button class="btn btn-default" data-dismiss=modal> [[ $ctrl.modal.cancelBtnText || \'取消\' ]] </button> <button type=submit class="btn btn-danger"> [[ $ctrl.modal.submitBtnText || \'提交\' ]] </button> </div> </div> </form> </div> </div> </div> </div>'},function(t,e){t.exports=' <div class="modal fade" tabindex=-1 role=dialog aria-labelledby=mySmallModalLabel aria-hidden=true id=upload-in-batch-modal> <div class=modal-dialog> <div class=modal-content> <div class=modal-header> <button type=button class=close data-dismiss=modal><span aria-hidden=true>&times;</span><span class=sr-only>Close</span></button> <h4 class="modal-title text-center"> <span>批量上传</span> </h4> </div> <div class=modal-body> <form class=form-inline ng-submit=$ctrl.submit()> <div class=row> <div class="col-md-5 col-xm-12"> <div class="alert alert-info"> <p><b>批量上传条形码</b></p> <br> 温馨提示：<br> 1.鼠标点击条形码输入框<br> 2.插上USB接收器<br> 3.用扫码抢发送扫码结果<br> 3.点击【确认】按钮<br> </div> <div class="alert alert-danger" ng-if=$ctrl.error> [[ $ctrl.error.title ]] <br> [[ $ctrl.error.content ]] </div> </div> <div class="col-md-7 col-xm-12"> <textarea ng-model=$ctrl.input id=textarea required></textarea> </div> </div> <div class=modal-footer> <div class=btn-group> <button type=button class="btn btn-default" data-dismiss=modal>取消</button> <button type=submit class="btn btn-danger">确认</button> </div> </div> </form> </div> </div> </div></div>'},function(t,e,o){e.a=angular.module("router",[]).config(["$stateProvider","$urlServiceProvider","$locationProvider",function(t,e,o){e.rules.otherwise({state:"stock"}),t.state({name:"stock",url:"/stock",component:"stockList"}).state({name:"stockFlows",url:"/stock/{id}/flows",component:"stockFlows"}).state({name:"flowin",url:"/flow-in",component:"flowinList"}).state({name:"flowout",url:"/flow-out",component:"flowoutList"})}]).name}]);