import angular from 'angular';
import '../style/app.css';
import json from './json.js';
import * as utils from './domRenderer.js';

const MODULE_NAME = 'app';


angular.module(MODULE_NAME, [])
    .controller('AppCtrl', function($scope, $compile, $element) {

        var vm = this;
        var state = {
            items: ['lorem', 'ipsum', 'dolor'],
        }
        vm.overflowRecord = [];
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
            var el = angular.element('<li/>').attr({ 'class': 'card pure-u-2-24', 'id': id })
            angular.element(el).bind("click", function(event) {
                vm.modifyTree(event);
            });
            return el;
        }

        vm.generateNode = function(object, level, node) {
            var div = utils.masterDiv(level);
            var overflowFlag = false;
            if (object.length > 4) {

                overflowFlag = true;

                this.overflowRecord[level] = {};
                this.overflowRecord[level].data = node;
                this.overflowRecord[level].displayRange = { start: 0, end: 3 };
                this.overflowRecord[level].memoryNode = null;
                console.log(this.overflowRecord);
                var arrowRight = utils.arrowRight(level);
                var arrowLeft = utils.arrowLeft(level);

                angular.element(arrowRight).bind("click", function(event) {
                    vm.showRight(event);
                });

                angular.element(arrowLeft).bind("click", function(event) {
                    vm.showLeft(event);
                });

                div.append(arrowRight).append(arrowLeft);

                object = object.filter(function(item, key) {
                    if (key <= 3) return 1;
                    else return 0;
                })

            }
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
                    .append(immediateEmployee
                        .append(immediateImg)
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
                    if(vm.node.level in this.overflowRecord){
                        this.overflowRecord[vm.node.level].memoryNode = event.target.id;
                    }
                    vm.generateNode(vm.node.children, vm.node.level + 1, vm.node);
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

        vm.showRight = function(event) {
            // insert nodes
            var level = event.target.id;

            var memoryNode = this.overflowRecord[level].memoryNode != null ? this.overflowRecord[level].memoryNode : vm.checkForExpandedNode(level);

            if (this.overflowRecord[level].displayRange.end == this.overflowRecord[level].data.children.length - 1) return;
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
                    .append(immediateEmployee
                        .append(immediateImg)
                        .append(immediateEmployeeCount));

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

            }
            //remove nodes
            for (var i = 0; i < nextStart; i++) {
                var id = '#' + this.overflowRecord[level].data.children[i].id;
                var myEl = angular.element(document.querySelector(id));
                if (myEl) {
                    myEl.remove();
                }

            }

            angular.element(document.querySelector('#' + this.overflowRecord[level].memoryNode))
                .append(angular.element('<div/>').attr({ 'class': 'arrow-down', 'id': this.overflowRecord[level].memoryNode }))
                .css('border', '2px solid #3579DC');

            if (this.overflowRecord[level].displayRange.end == this.overflowRecord[level].data.children.length - 1) {
                // angular.element(document.querySelector('.arrow-right#level'+level).css('disabled',true));
            }

        };

        vm.checkForExpandedNode = function(level) {
            var el = angular.element(document.querySelector('.appx#level' + (level) + ' > .card > .arrow-down'));
            if (el[0] != undefined) {
                return el[0].id;
            } else return null;
        }

        vm.showLeft = function(event) {
            // insert nodes
            var level = event.target.id;
            if (this.overflowRecord[level].displayRange.start == 0) return;
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
                    .append(immediateEmployee
                        .append(immediateImg)
                        .append(immediateEmployeeCount));

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

            }
            //remove nodes
            for (var i = prevEnd + 1; i < this.overflowRecord[level].data.children.length; i++) {
                var id = '#' + this.overflowRecord[level].data.children[i].id;
                var myEl = angular.element(document.querySelector(id));
                if (myEl) {
                    myEl.remove();
                }

            }

            //add down arrow to the old parent node
            angular.element(document.querySelector('#' + this.overflowRecord[level].memoryNode))
                .append(angular.element('<div/>').attr({ 'class': 'arrow-down', 'id': this.overflowRecord[level].memoryNode }))
                .css('border', '2px solid #3579DC');

        };







        ///////////////

        // var timeline = document.querySelector(".timeline ol"),
        //     elH = document.querySelectorAll(".timeline li > div"),
        //     arrows = document.querySelectorAll(".timeline .arrows .arrow"),
        //     arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
        //     arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
        //     firstItem = document.querySelector(".timeline li:first-child"),
        //     lastItem = document.querySelector(".timeline li:last-child"),
        //     xScrolling = 280,
        //     disabledClass = "disabled";

        // function init() {
        //     animateTl(xScrolling, arrows, timeline);
        // }

        // function animateTl(scrolling, el, tl) {
        //     let counter = 0;
        //     for (let i = 0; i < el.length; i++) {
        //         el[i].addEventListener("click", function() {
        //             if (!arrowPrev.disabled) {
        //                 arrowPrev.disabled = true;
        //             }

        //             if (!arrowNext.disabled) {
        //                 arrowNext.disabled = true;
        //             }
        //             const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
        //             if (counter === 0) {
        //                 tl.style.transform = `translateX(-${scrolling}px)`;
        //             } else {
        //                 const tlStyle = getComputedStyle(tl);
        //                 // add more browser prefixes if needed here
        //                 const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
        //                 const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
        //                 tl.style.transform = `translateX(${values}px)`;
        //             }
        //             counter++;

        //         });
        //     }
        //     for (let i = 0; i < el.length; i++) {
        //         el[i].addEventListener("click", function() {
        //             setTimeout(() => {
        //                 isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
        //                 isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
        //             }, 1100);
        //         });
        //     }

        // }

        // function isElementInViewport(el) {
        //     const rect = el.getBoundingClientRect();
        //     return (
        //         rect.top >= 0 &&
        //         rect.left >= 0 &&
        //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        //         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        //     );
        // }

        // function setBtnState(el, flag = true) {
        //     if (flag) {
        //         el.classList.add(disabledClass);
        //     } else {
        //         if (el.classList.contains(disabledClass)) {
        //             el.classList.remove(disabledClass);
        //         }
        //         el.disabled = false;
        //     }
        // }

        // window.addEventListener("load", init);

        ///////////

    });

export default MODULE_NAME;
