import angular from 'angular';
import '../style/app.css';
import json from './json.js';
import * as utils from './domRenderer.js';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .controller('AppCtrl', function($scope, $compile, $element) {

        var vm = this;
        vm.overflowRecord = [];
        vm.json = json;

        function addLevel(obj, depth) {
            if (obj == null) return;
            if (obj.length >= 0) {
                obj.forEach(function(d) {
                    d.level = depth;
                    addLevel(d.children, depth + 1);
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
                    if(d.name == "" || !d.name){
                        d.name= "--";
                    }
                    if(d.teamName == "" || !d.teamName){
                        d.teamName= "--";
                    }
                    if(d.deignation == "" || !d.deignation){
                        d.deignation= "--";
                    }
                    d.immediateEmployeeCount = d.children.length;
                    d.totalEmployeeCount = d.children.length + addEmployeeSum(d.children);
                    totalSum += d.totalEmployeeCount;
                });
                return totalSum;
            }
        }

        vm.wrap = function(id) {
            var el = angular.element('<li/>').attr({ 'class': 'card pure-u-2-24', 'id': id })
            angular.element(el).bind("click", function(event) {
                vm.modifyTree(event);
            });
            return el;
        }

        vm.renderDom = function(object, div, level, freshFlag) {
            for (var i = 0; i < object.length; i++) {

                var id = object[i].id;
                var wrap = vm.wrap(id);
                var team = utils.team(id, object[i].teamName, object[i].immediateEmployeeCount);
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
                    .append(immediateEmployee
                        .append(immediateImg)
                        .append(immediateEmployeeCount));

                var superElement = null;

                if (freshFlag) {
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
                } else {
                    div
                        .append(
                            $compile(
                                wrap
                                .append(arrowUp)
                                .append(team)
                                .append(name)
                                .append(designation)
                                .append(infoRow)
                            )($scope));
                    superElement = div;
                }
            }

        }


        vm.generateNode = function(object, level, node) {
            var div = utils.masterDiv(level);
            var overflowFlag = false;
            if (object.length > 4) {

                overflowFlag = true;

                this.overflowRecord[level] = {
                    'data': node,
                    'displayRange': {
                        'start': 0,
                        'end': 3
                    },
                    'memoryNode': null
                };

                var arrowRight = utils.arrowRight(level);
                var arrowLeft = utils.arrowLeft(level);

                angular.element(arrowRight).bind("click", function(event) {
                    vm.showRightNodes(event);
                });

                angular.element(arrowLeft).bind("click", function(event) {
                    vm.showLeftNodes(event);
                });

                div.append(arrowRight).append(arrowLeft);

                object = object.filter(function(item, key) {
                    if (key <= 3) return 1;
                    else return 0;
                })

            }
            vm.renderDom(object, div, level, true);

            var hr = angular
                .element('<hr/>')
                .attr('id', 'level' + level);

            angular
                .element(document.querySelector('#domTree'))
                .append(hr);

        }

        addLevel(vm.json, 0);
        addEmployeeSum(vm.json);
        vm.generateNode(vm.json, 0, null);




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
                    angular.element(document.querySelector('#' + node.id)).css('border', 'none');
                    angular.element(document.querySelector('.arrow-down#' + node.id)).remove();
                    return true;
                }
            }
            return false;
        }

        vm.modifyTree = function(event) {
            var node = [];
            var i = 0;

            while (node.length == 0) {
                vm.traverseTree(vm.json[i], 0, event.target.id, node);
                i++;
            }

            node = node[0];

            if (vm.checkIfOpenNode(node)) {
                return false;
            } else {
                vm.sameNodeIdArray = [];
                if (node.children.length > 0) {

                    vm.getAllSameLevelNodes(vm.json, node.level, vm.sameNodeIdArray);

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

                    vm.removeNode(node);

                    angular.element(document.querySelector('#' + event.target.id))
                        .append(angular.element('<div/>').attr({ 'class': 'arrow-down', 'id': event.target.id }))
                        .css('border', '2px solid #3579DC');

                    if (node.level in this.overflowRecord) {
                        this.overflowRecord[node.level].memoryNode = event.target.id;
                    }
                    vm.generateNode(node.children, node.level + 1, node);
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

        vm.checkForExpandedNode = function(level) {
            var el = angular.element(document.querySelector('.appx#level' + (level) + ' > .card > .arrow-down'));
            if (el[0] != undefined) {
                return el[0].id;
            } else return null;
        }

        vm.showRightNodes = function(event) {
            // insert nodes
            var level = event.target.id;

            var memoryNode = this.overflowRecord[level].memoryNode != null ? this.overflowRecord[level].memoryNode : vm.checkForExpandedNode(level);

            if (this.overflowRecord[level].displayRange.end == this.overflowRecord[level].data.children.length - 1) return;

            angular.element(document.querySelector('.appx#level' + level + ' > .arrow-left')).removeClass('arrow-disable');

            var div = angular.element(document.querySelector('#level' + level));
            var nextStart = null;
            var nextEnd = null;

            if (this.overflowRecord[level].data.children.length - 1 > this.overflowRecord[level].displayRange.end + 4) {
                nextStart = this.overflowRecord[level].displayRange.end + 1;
                nextEnd = nextStart + 3;
            } else {
                nextStart = this.overflowRecord[level].displayRange.end + 1;
                nextEnd = this.overflowRecord[level].data.children.length - 1;
            }

            this.overflowRecord[level].memoryNode = memoryNode;
            this.overflowRecord[level].displayRange = {
                start: nextStart,
                end: nextEnd
            };
            var object = this.overflowRecord[level].data.children.filter(function(item, key) {
                if (key >= nextStart && key <= nextEnd) return 1;
                else return 0;
            })

            //remove current nodes
            for (var i = 0; i < nextStart; i++) {
                var id = '#' + this.overflowRecord[level].data.children[i].id;
                var myEl = angular.element(document.querySelector(id));
                if (myEl) {
                    myEl.remove();
                }

            }
            //add next nodes
            vm.renderDom(object, div, level, false);
            //disable arrow if end nodes are displayed
            if (this.overflowRecord[level].displayRange.end == this.overflowRecord[level].data.children.length - 1) {
                angular.element(document.querySelector('.appx#level' + level + ' > .arrow-right')).addClass('arrow-disable');
            }

            //add down arrow to the old parent node
            angular.element(document.querySelector('#' + this.overflowRecord[level].memoryNode))
                .append(angular.element('<div/>').attr({ 'class': 'arrow-down', 'id': this.overflowRecord[level].memoryNode }))
                .css('border', '2px solid #3579DC');

        };

        vm.showLeftNodes = function(event) {
            // insert nodes
            var level = event.target.id;
            if (this.overflowRecord[level].displayRange.start == 0) return;

            angular.element(document.querySelector('.appx#level' + level + ' > .arrow-right')).removeClass('arrow-disable');

            var div = angular.element(document.querySelector('#level' + level));
            var prevStart = null;
            var prevEnd = null;

            if (this.overflowRecord[level].displayRange.start - 4 > 0) {
                prevStart = this.overflowRecord[level].displayRange.start - 4;
                prevEnd = prevStart + 3;
            } else {
                prevStart = 0;
                prevEnd = 3;
            }

            this.overflowRecord[level].displayRange = {
                start: prevStart,
                end: prevEnd
            };

            var object = this.overflowRecord[level].data.children.filter(function(item, key) {
                if (key >= prevStart && key <= prevEnd) return 1;
                else return 0;
            })

            //remove current nodes
            for (var i = prevEnd + 1; i < this.overflowRecord[level].data.children.length; i++) {
                var id = '#' + this.overflowRecord[level].data.children[i].id;
                var myEl = angular.element(document.querySelector(id));
                if (myEl) {
                    myEl.remove();
                }

            }
            //add previous nodes
            vm.renderDom(object, div, level, false);
            //disable arrow if starting nodes are displayed
            if (this.overflowRecord[level].displayRange.start == 0) {
                angular.element(document.querySelector('.appx#level' + level + ' > .arrow-left')).addClass('arrow-disable');
            }

            //add down arrow to the old parent node
            angular.element(document.querySelector('#' + this.overflowRecord[level].memoryNode))
                .append(angular.element('<div/>').attr({ 'class': 'arrow-down', 'id': this.overflowRecord[level].memoryNode }))
                .css('border', '2px solid #3579DC');

        };

    });

export default MODULE_NAME;
