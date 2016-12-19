<<<<<<< HEAD
ubdocument.querySelector('.circle').addEventListener('click', function() {
    console.log("sss");
=======
var info = {};

document.querySelector('.circle').addEventListener('click', function() {
>>>>>>> upstream/master
    document.querySelector('.circle').classList.add('hide');
    document.querySelector('.active').classList.remove('hide');
    document.querySelector('.cross').classList.remove('hide');
});

document.querySelector('.cross').addEventListener('click', function() {
    document.querySelector('.circle').classList.remove('hide');
    document.querySelector('.active').classList.add('hide');
    document.querySelector('.cross').classList.add('hide');
});


addEvent(document, "keypress", function(e) {
    e = e || window.event;
    var value = document.querySelector('.active').value.trim();
    if (e.keyCode == 13) {
        $.ajax({
            url: `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${value}&callback=angular.callbacks._0`,
            dataType: "jsonp",
            success: function(data, status, xhr) {
                for (var key in data.query.pages) {
                    info[key] = {
                        title: data.query.pages[key].title,
                        content: data.query.pages[key].extract
                    };
                }
                render(info);
            }
        })
    }
});
function render() {
    var list = '';
    for (var key in info) {
        list += `<div class=name>${info[key].title}</div><div class=description>${info[key].content}</div>`;
    }
    document.querySelector('.list').innerHTML = list;
}
function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}
