var number = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'],
    symbol = ['divi', 'multi', 'sub', 'sum'],
    opMap = {
        "+": true,
        "-": true,
        "X": true,
        "/": true
    };

var arr = [];
var _data = {
        realArr: [],
        big: "", //第一行的值
        smallArr: [],
        isInit: true
    }
    //  big  = big +renderV; 23.3  ,x4
    //  when sym,big  = sym;
    // render()
    //big =""
document.querySelector('.buttons').addEventListener('click', function(e) {
    //  console.log(e);
    _data.isInit = false;
    var type = e.target.dataset.type;
    var renderV = document.getElementById(e.target.id).textContent;
    if (type == 'number') {
        if (isReset()) {
            reset();
            _data.isInit = false;
        }
        if (renderV !== '.') {
            renderV = Number(renderV);
        }
        _data.smallArr.push(renderV);
        _data.big += renderV;
        render();
    };
    if (type == 'operator') {
        _data.smallArr.push(renderV);
        _data.big = renderV;
        render();
        _data.big = '';
        _data.realArr.push(findNum(_data.smallArr));
        _data.realArr.push(renderV);
    }
    if (type == 'equal') {
        _data.smallArr.push('=');
        _data.realArr.push(findNum(_data.smallArr));
        var result = cac2(_data.realArr);
        _data.smallArr.push(result);
        _data.big = result;
        render()
    }
    if (type == 'ac') {
        reset();
        render();
    }
    if (type == 'ce') {
        console.log(_data.smallArr);
        console.log(_data.realArr);
        var last = _data.smallArr[_data.smallArr.length - 1];

        if (!/[\+\-X\/]/.test(_data.smallArr.join('')) || /=/.test(_data.smallArr.join(''))) {
            _data.big = '';
            _data.smallArr = [];
            _data.realArr = [];
            _data.isInit = true;
        } else if (opMap[last]) {
            _data.big = '0';
            _data.smallArr.pop();
            _data.realArr.pop();
            _data.realArr.pop();
            console.log(_data.smallArr);
            console.log(_data.realArr);
        }
        render();

    }

})

//初始化
function reset() {
    _data.big = '';
    _data.smallArr = [];
    _data.realArr = [];
    _data.isInit = true;
}
//是否需要初始化
function isReset() {
    return _data.smallArr.indexOf('=') >= 0;
}

function findNum(arr) {
    var rArr = [];
    if (arr.length < 2) {
        return Number(arr[0]);
    }
    var flag = false;
    for (var j = arr.length - 2; j >= 1; j--) {
        if (typeof(arr[j]) == 'number' || arr[j] == '.') {
            rArr.push(arr[j]);
        } else {
            flag = true;
            break;
        }
    }
    var str = rArr.reverse().join('');
    if (!flag) {
        str = arr[0] + str;
    }
    return Number(str);
}

function render() {

    document.querySelector('.big').innerHTML = _data.isInit ? "0" : _data.big;
    document.querySelector('.small').innerHTML = _data.isInit ? "0" : _data.smallArr.join('');
}

function cac(cur, sign, next) {
    var add = function(cur, next) {
        var _cur = Number(cur),
            _next = Number(next);
        return _cur + _next;
    }
    var sub = function(cur, next) {
        return cur - next;
    }

    var multi = function(cur, next) {
        return cur * next;
    }
    var divi = function(cur, next) {
        return Number(cur / next).toFixed(2);
    }
    var index = {
        '+': add,
        '-': sub,
        'X': multi,
        '/': divi
    }
    return index[sign](cur, next);
}

function cac2(arr) {
    var left = arr[0];
    for (var i = 1; i < arr.length; i += 2) {
        left = cac(left, arr[i], arr[i + 1]);

    }
    console.log(left);
    return left;
}
