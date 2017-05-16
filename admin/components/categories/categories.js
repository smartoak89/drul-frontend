angular.module('admin')
    .component('categories', {
        templateUrl: "admin/components/categories/categories.html",
        controller: ['Categories', '$state', function(Categories, $state) {
            var self = this;
            this.$onInit = function(){
                Categories.list(function (categories) {
                    self.categories = categories;
                });
            };
            var _obj, _tree;
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
                }, {
                    displayName:  '',
                    cellTemplate: '<button ng-if="cellTemplateScope.hide(row.branch)" modal-admin="addCategory" ng-click="cellTemplateScope.add(row.branch)" class="btn btn-default btn-sm">Добавать подкатегорию</button>',
                    cellTemplateScope: {
                        add: function(obj) {
                            self.categ.curCategory = obj;
                        },
                        hide: function (self) {
                            return (self.level == 3) ? false : true;
                        }
                    }
                }, {
                    displayName:  '',
                    cellTemplate: '<button ng-click="cellTemplateScope.delete(row.branch, tree_rows)" modal-admin="delCategory" class="btn btn-default btn-sm">Удалить</button>',
                    cellTemplateScope: {

                        delete: function(obj, tree){
                            _obj = obj;
                            _tree = tree;
                            self.categ.curCategory = obj;
                        },
                        after: function () {
                            // _.remove(_tree, {branch: {uuid: _obj.uuid}});
                            $state.reload();
                        }
                    }
                }];

        }]
    });
