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
            self.my_tree = {};
            self.expanding_property = {
                field: 'name',
                titleClass:  'text-center',
                cellClass:   'v-middle',
                displayName: 'Название'
            };
            self.col_defs = [
                {
                    field: 'link',
                    displayName: 'Ссылка'
                },{
                    field: 'article',
                    displayName: 'Артикул'
                },  {
                    displayName:  '',
                    cellTemplate: '<button ng-if="!row.branch.parent_uid" modal-admin="addCategory" ng-click="cellTemplateScope.add(row.branch)" class="btn btn-default btn-sm">Добавать подкатегорию</button>',
                    cellTemplateScope: {
                        add: function(obj) {
                            self.categ.curCategory = obj;
                            self.categ.curIndex = _.findIndex(self.categ.categories, {uuid: obj.uuid});
                        }}
                }, {
                    displayName:  '',
                    cellTemplate: '<button ng-click="cellTemplateScope.delete(row.branch, tree_rows)" modal-admin="delCategory" class="btn btn-default btn-sm">Удалить</button>',
                    cellTemplateScope: {
                        delete: function(obj, tree){
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
                    }
                }];

        }]
    });
