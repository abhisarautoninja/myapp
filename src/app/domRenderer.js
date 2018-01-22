export function masterDiv(level) {
    var el = angular.element('<section/>').attr({ 'class': 'appx pure-g pure-u-1', 'id': 'level' + level });
    return el;
}

export function team(id, html, immediateEmployeeCount) {
    if(immediateEmployeeCount == 0 || immediateEmployeeCount == undefined){  
        var el = angular.element('<div/>').attr({ 'class': 'header-bar header-bar-disable', 'id': id }).html(html);
    }else {
        var el = angular.element('<div/>').attr({ 'class': 'header-bar', 'id': id }).html(html);
    }
    return el;
}

export function name(id, html) {
    var el = angular.element('<div/>').attr({ 'class': 'content', 'id': id }).html(html);
    return el;
}

export function designation(id, html) {
    var el = angular.element('<div/>').attr({ 'class': 'content', 'id': id }).html(html);
    return el;
}

export function infoRow(id) {
    var el = angular.element('<div/>').attr({ 'class': 'content pure-g', 'id': id });
    return el;
}

export function totalEmployee(id) {
    var el = angular.element('<div/>').attr({ 'class': 'pure-u-12-24 pure-g details', 'id': id });
    return el;
}

export function totalImg(id) {
    var el = angular.element('<img/>').attr({ 'class': '', 'src': 'img/total.png', 'height': 20 + 'px', 'width': 20 + 'px', 'id': id });
    return el;
}

export function totalEmployeeCount(id, html) {
    var el = angular.element('<div/>').attr({ 'class': 'pure-u-1', 'id': id }).html(html);
    return el;
}

export function immediateEmployee(id) {
    var el = angular.element('<div/>').attr({ 'class': 'pure-u-12-24 pure-g details', 'id': id });
    return el;
}

export function immediateImg(id) {
    var el = angular.element('<img/>').attr({ 'class': '', 'src': 'img/immediate.png', 'height': 20 + 'px', 'width': 20 + 'px', 'id': id });
    return el;
}

export function immediateEmployeeCount(id, html) {
    var el = angular.element('<div/>').attr({ 'class': 'pure-u-1', 'id': id }).html(html);
    return el;
}

export function arrowUp(id) {
    var el = angular.element('<div/>').attr({ 'class': 'arrow-up', 'id': id });
    return el;
}

export function arrowDown(id) {
    var el = angular.element('<div/>').attr({ 'class': 'arrow-down', 'id': id })
    return el;
}

export function arrowRight(level) {
    var el = angular.element('<div/>').attr({ 'class': 'arrow-right', 'id': level }).html('&#x21E2;')
    return el;
}

export function arrowLeft(level) {
    var el = angular.element('<div/>').attr({ 'class': 'arrow-left arrow-disable', 'id': level }).html('&#x21E0;')
    return el;
}

export function getDomHr() {
    var el = angular.element(document.body.querySelectorAll('hr'));
    return el;
}

export function getDomAppx() {
    var el = angular.element(document.body.querySelectorAll('.appx'));
    return el;
}

export function getDomCards(id) {
    var el = angular.element(document.querySelector('#' + id));
    return el;
}
