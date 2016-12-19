var data = {};
const LENGTH = 5; //棋子数

function init() {
    data.sign = null;
    data.pattern = null;
    data.page = 'first';
    data.currentTurn = 'first';
    data.arr = [];
    for (var i = 0; i < 16; ++i) {
        data.arr[i] = [];
        for (var j = 0; j < 16; ++j) {
            data.arr[i][j] = 0;
        }
    }
}
init();

document.querySelector('.green').addEventListener('click', function(e) {
    console.log(e);
    if (e.target.dataset.pattern == 'one') {
        data.page = 'second';
        data.pattern = 'computer';
        //render();
        alert('...');
    } else if (e.target.dataset.pattern == 'two') {
        data.page = 'second';
        data.pattern = 'people';
        render();
    } else if (e.target.className == 'back') {
        data.page = 'first';
        render();
    }
    if (e.target.dataset.sign == 'X') {
        data.page = 'third';
        data.sign = 'X';
        render();

    } else if (e.target.dataset.sign == 'O') {
        data.page = 'third';
        data.sign = 'O';
        render();
    }
    if (e.target.className == 'reset') {
        init();
        render();
    }

    if (e.target.dataset.type == 'table') {
        var signData;
        if (data.currentTurn == 'first') {
            signData = data.sign == 'X' ? 1 : 2;
        } else {
            signData = data.sign == 'X' ? 2 : 1;
        }
        var x = Number(e.target.dataset.row),
            y = Number(e.target.dataset.col);
        if (data.arr[x][y] == 0) {
            data.arr[x][y] = signData;
        } else {
            return;
        }
        render();

        if (leftSlash(x, y) || rightSlash(x, y) || row(x, y) || col(x, y)) {
            setTimeout(function() {
                alert('you are win');
                won();
                render();
            }, 300);
        }

        data.currentTurn = data.currentTurn == 'first' ? 'sencond' : "first";
    }
})

function render() {
    if (data.page == 'second') {
        document.querySelector('.green').innerHTML = `<p>Would you like to be X or O?</p><div class=choice><p class=sign data-sign=X>X</p><p class=sign data-sign=O>O</p></div><div class=back>Back</div>`;
    } else if (data.page == 'first') {
        document.querySelector('.green').innerHTML = `<p class="common ask">How do you want to play?</p>
              <div class="choice">
              <p class='common play' data-pattern=one>One Player</p>
              <p class='common play' data-pattern=two>Two Player</p>
              </div>`;
    } else if (data.page == 'third') {
        var tableHTML = '';
        var trHTML = '';
        var sum = 0;
        for (var i = 0; i < data.arr.length; i++) {
            var tdHTML = '';
            for (var j = 0; j < data.arr[i].length; j++) {
                sum = data.arr[i]
                if (data.arr[i][j] == 1) {
                    tdHTML += `<td data-type="table" data-row=${i} data-col=${j} class=black>●</td>`;
                } else if (data.arr[i][j] == 2) {
                    tdHTML += `<td data-type="table" data-row=${i} data-col=${j} class=white>●</td>`;
                } else {
                    tdHTML += `<td data-type="table" data-row=${i} data-col=${j}></td>`;
                }
            }
            trHTML += '<tr>' + tdHTML + '</tr>';
        }
        tableHTML = `<div class=reset>Reset All</div><table class=game>` + trHTML + '</table>';
        document.querySelector('.green').innerHTML = tableHTML;
    }
}

function leftSlash(i, j) {
    var count = 1;
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i - (k + 1)]) {
            if (data.arr[i - (k + 1)][j - (k + 1)] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i + k + 1]) {
            if (data.arr[i + k + 1][j + k + 1] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    if (count >= LENGTH) {
        return true;
    } else {
        return false;
    }
}


function rightSlash(i, j) {
    var count = 1;
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i + (k + 1)]) {
            if (data.arr[i + (k + 1)][j - (k + 1)] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i - (k + 1)]) {
            if (data.arr[i - (k + 1)][j + k + 1] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    if (count >= LENGTH) {
        return true;
    } else {
        return false;
    }
}



function row(i, j) {
    var count = 1;
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i]) {
            if (data.arr[i][j - (k + 1)] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i]) {
            if (data.arr[i][j + k + 1] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    if (count >= LENGTH) {
        return true;
    } else {
        return false;
    }
}



function col(i, j) {
    var count = 1;
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i - (k + 1)]) {
            if (data.arr[i - (k + 1)][j] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    for (var k = 0; k < LENGTH - 1; ++k) {
        if (data.arr[i + k + 1]) {
            if (data.arr[i + k + 1][j] == data.arr[i][j]) {
                ++count;
            } else {
                break;
            }
        }
    }
    if (count >= LENGTH) {
        return true;
    } else {
        return false;
    }
}

function won() {
    data.page = 'third';
    data.arr = [];
    for (var i = 0; i < 16; ++i) {
        data.arr[i] = [];
        for (var j = 0; j < 16; ++j) {
            data.arr[i][j] = 0;
        }
    }
}
