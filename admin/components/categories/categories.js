angular.module('admin')
    .component('categories', {
        templateUrl: "admin/components/categories/categories.html",
        controller: ['Categories', function(Categories) {
            var self = this;
            this.$onInit = function(){
                Categories.list();
            };
            self.categ = Categories;
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
                    cellTemplate: '<button ng-if="!row.branch.parent_uid" ng-click="cellTemplateScope.add(tree_rows, row.branch)" class="btn btn-default btn-sm">Added Controller!</button>',
                    cellTemplateScope: {
                        add: function(data, row) {
                            data[_.findIndex(data, {branch: {Name: row.Name}})].branch.children.push({
                                "DemographicId": 8,
                                "ParentId": 1,
                                "Name": "New York",
                                "Description": "The largest diverse city",
                                "Area": 141300,
                                "Population": 19651127,
                                "TimeZone": "Eastern Time Zone"
                            })
                        }}
                }, {
                    displayName:  'Remove',
                    cellTemplate: '<button ng-click="cellTemplateScope.delete(tree_rows, row.branch)" class="btn btn-default btn-sm">Remove</button>',
                    cellTemplateScope: {
                        delete: function(data, row) {
                            console.log(data)
                            if(!row.parent_uid){
                                console.log('+')
                                data.splice(_.findIndex(data, {branch: {Name: row.Name}}), 1)
                            }else{
                                var parent = _.find(data, {branch: {uid: row.parent_uid}});
                                var parentId = _.findIndex(data, {branch: {uid: row.parent_uid}});
                                //console.log(parent.branch.children)
                                //console.log(data[0].branch);
                                data[parentId].branch.children.splice(_.findIndex(parent.branch.children, {Name: row.Name}), 1);
                            }

                        }}
                }];

        }]
    });
