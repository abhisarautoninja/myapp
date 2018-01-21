import angular from 'angular';
import '../style/app.css';
import json from './json.js';
import * as utils from './domRenderer.js'

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .controller('AppCtrl', function($scope, $compile, $element) {

        var vm = this;
        vm.json = json;
        vm.maxDepth = 0;

        function addLevel(obj, depth, maxDepth) {
            if (obj == null) return;
            if (obj.length >= 0) {
                obj.forEach(function(d) {
                    d.level = depth;
                    if (depth > maxDepth) {
                        maxDepth = depth;
                    }
                    addLevel(d.children, depth + 1, maxDepth);
                });
            }

        }

        function addEmployeeSum(obj) {
            if (obj == null || obj == undefined) {
                return 0;
            }
            if (obj.length >= 0) {
                var totalSum = 0;
                obj.forEach(function(d) {
                    d.immediateEmployeeCount = d.children.length;
                    d.totalEmployeeCount = d.children.length + addEmployeeSum(d.children);
                    totalSum += d.totalEmployeeCount;
                });
                return totalSum;
            }
        }

        vm.wrap = function(id) {
            var el = angular.element('<div/>').attr({ 'class': 'card pure-u-2-24', 'id': id });
            angular.element(el).bind("click", function(event) {
                vm.modifyTree(event);
            });
            return el;
        }

        vm.generateNode = function(object, level) {

            var div = utils.masterDiv(level);

            for (var i = 0; i < object.length; i++) {

                var id = object[i].id;
                var wrap = vm.wrap(id);
                var team = utils.team(id, object[i].teamName);
                var name = utils.name(id, object[i].name);
                var designation = utils.designation(id, object[i].designation);
                var infoRow = utils.infoRow(id);
                var totalEmployee = utils.totalEmployee(id);
                var totalImg = utils.totalImg(id);
                var totalEmployeeCount = utils.totalEmployeeCount(id, object[i].totalEmployeeCount);
                var immediateEmployee = utils.immediateEmployee(id);
                var immediateImg = utils.immediateImg(id);
                var immediateEmployeeCount = utils.immediateEmployeeCount(id, object[i].immediateEmployeeCount)
                var arrowUp = utils.arrowUp(id);

                immediateEmployee
                    .append(immediateImg)
                    .append(immediateEmployeeCount);

                infoRow
                    .append(totalEmployee
                        .append(totalImg)
                        .append(totalEmployeeCount))
                    .append(immediateEmployee.append(immediateImg)
                        .append(immediateEmployeeCount));

                angular
                    .element(document.querySelector('#domTree'))
                    .append(
                        $compile(
                            div.append(
                                wrap
                                .append(arrowUp)
                                .append(team)
                                .append(name)
                                .append(designation)
                                .append(infoRow)
                            ))($scope));

            }

            var hr = angular
                .element('<hr/>')
                .attr('id', 'level' + level);

            angular
                .element(document.querySelector('#domTree'))
                .append(hr);
        }

        addLevel(vm.json, 0, vm.maxDepth);
        addEmployeeSum(vm.json);
        vm.generateNode(vm.json, 0);




        vm.removeNode = function(object) {
            vm.nodeIdArray = [];
            vm.getAllHighLevelNodes(vm.json, object.level, vm.nodeIdArray);

            for (var i = vm.nodeIdArray.length - 1; i >= 0; i--) {
                if (vm.nodeIdArray[i] != undefined) {
                    var myEl = utils.getDomCards(vm.nodeIdArray[i]);
                    if (myEl) {
                        myEl.remove();
                    }
                }
            }

            var hrId = object.level;

            var hrElements = utils.getDomHr();
            var appx = utils.getDomAppx();
            for (var i = hrElements.length - 1; i >= 0; i--) {
                if (i <= hrId) {
                    break;
                } else {
                    hrElements[i].remove();
                    appx[i].remove();
                }
            }

        }

        vm.getAllHighLevelNodes = function(o, level, arr) {
            if (o == null) return;
            if (o.length) {
                o.forEach(function(d) {
                    if (d.level > level) { arr.push(d.id) };
                    vm.getAllHighLevelNodes(d.children, level, arr);
                });
            }
        }

        vm.checkIfOpenNode = function(node) {
            var children = node.children.reduce(function(children, item) {
                children.push(item.id);
                return children;
            }, []);

            if (children.length != 0) {
                var exists = false;
                for (var i = children.length - 1; i >= 0; i--) {
                    if (angular.element(document.querySelector('#' + children[i])).length != 0) {
                        exists = true;
                    }
                }
                if (exists) {
                    vm.removeNode(node);
                    angular.element(document.querySelector('#' + this.node.id)).css('border', 'none');
                    angular.element(document.querySelector('.arrow-down#' + this.node.id)).remove();
                    return true;
                }
            }
            return false;
        }

        vm.modifyTree = function(event) {
            vm.node = [];
            var i = 0;

            while (vm.node.length == 0) {
                vm.traverseTree(vm.json[i], 0, event.target.id, vm.node);
                i++;
            }

            vm.node = vm.node[0];

            if (vm.checkIfOpenNode(vm.node)) {
                return false;
            } else {
                vm.sameNodeIdArray = [];
                if (vm.node.children.length > 0) {

                    vm.getAllSameLevelNodes(vm.json, vm.node.level, vm.sameNodeIdArray);

                    for (var i = vm.sameNodeIdArray.length - 1; i >= 0; i--) {
                        if (vm.sameNodeIdArray[i] != undefined) {
                            var myElx = angular.element(document.querySelector('.arrow-down#' + vm.sameNodeIdArray[i]));
                            var myEl = angular.element(document.querySelector('#' + vm.sameNodeIdArray[i]));
                            if (myEl) {
                                myEl.css('border', 'none');
                            }
                            if (myElx) {
                                myElx.removeClass('arrow-down');
                            }
                        }
                    }

                    vm.removeNode(vm.node);

                    angular.element(document.querySelector('#' + event.target.id))
                        .append(angular.element('<div/>').attr({ 'class': 'arrow-down', 'id': event.target.id }))
                        .css('border', '2px solid #3579DC');

                    vm.generateNode(vm.node.children, vm.node.level + 1);
                }
            }

        }

        vm.getAllSameLevelNodes = function(o, level, arr) {
            if (o == null) return;
            if (o.length) {
                o.forEach(function(d) {
                    if (d.level == level) { arr.push(d.id) };
                    vm.getAllSameLevelNodes(d.children, level, arr);
                });
            }
        }

        vm.traverseTree = function(root, level, id, node) {

            var children;
            if (root.leaf == null) {
                children = root.children;
            }
            if (root.id == id) {
                node.push(root);
                return root;
            }
            if (children == null || children.length == 0) {
                return;
            }

            for (var index = 0; index < children.length; index++) {
                if (children[index].id == id) {
                    node.push(children[index]);
                    return children[index];
                }
                vm.traverseTree(children[index], level + 1, id, node);
            }
        }

    });

export default MODULE_NAME;
