angular.module('admin')
    .component('categories', {
        templateUrl: "admin/components/categories/categories.html",
        controller: ['Categories', function(Categories) {
            var self = this;
            this.$onInit = function(){
                Categories.list(function (categories) {
                    self.categories = categories;
                });
            };
            self.categ = Categories;
            //self.dalCategory = function(obj, index){
            //    self.categ.curCategory = obj;
            //    self.categ.cutIndex = index;
            //}
            self.my_tree = {};
            self.expanding_property = {
                /*template: "<td>OK All</td>",*/
                field: 'name',
                titleClass:  'text-center',
                cellClass:   'v-middle',
                displayName: 'Name'
            };
            self.col_defs = [
                {
                    field: 'link',
                    displayName: 'Link'
                },  {
                    displayName:  'Function',
                    cellTemplate: '<button ng-if="!row.branch.parent_uid" modal-admin="addCategory" ng-click="cellTemplateScope.add(row.branch)" class="btn btn-default btn-sm">Добавать подкатегорию</button>',
                    cellTemplateScope: {
                        add: function(obj) {
                            self.categ.curCategory = obj;
                            self.categ.curIndex = _.findIndex(self.categ.categories, {uuid: obj.uuid});
                        }}
                }, {
                    displayName:  'Remove',
                    cellTemplate: '<button ng-click="cellTemplateScope.delete(row.branch, tree_rows)" modal-admin="delCategory" class="btn btn-default btn-sm">Удалить</button>',
                    cellTemplateScope: {
                        delete: function(obj, tree){
                            console.log(obj)
                            if(!obj.parent_uid){
                                self.categ.curCategory = obj;
                                self.categ.curIndex = _.findIndex(self.categ.categories, {uuid: obj.uuid});
                            }else{
                                self.categ.curCategory = obj;
                                self.categ.curParent = tree[_.findIndex(tree, {branch: {uid: obj.parent_uid}})].branch;
                                self.categ.curParentIndex = _.findIndex(self.categ.categories, {uuid: self.categ.curParent.uuid});
                                self.categ.curIndex = _.findIndex(self.categ.curParent.children, {uid: obj.uid});
                            }
                        }

                        //    function(data, row) {
                        //    console.log(data)
                        //    if(!row.parent_uid){
                        //        console.log('+')
                        //        data.splice(_.findIndex(data, {branch: {Name: row.Name}}), 1)
                        //    }else{
                        //        var parent = _.find(data, {branch: {uid: row.parent_uid}});
                        //        var parentId = _.findIndex(data, {branch: {uid: row.parent_uid}});
                        //        //console.log(parent.branch.children)
                        //        //console.log(data[0].branch);
                        //        data[parentId].branch.children.splice(_.findIndex(parent.branch.children, {Name: row.Name}), 1);
                        //    }
                        //
                        //}
                    }
                }];

        }]
    });
