ubdocument.querySelector('.circle').addEventListener('click', function() {
    console.log("sss");
    document.querySelector('.circle').classList.add('hide');
    document.querySelector('.active').classList.remove('hide');
    document.querySelector('.cross').classList.remove('hide');

});

document.querySelector('.cross').addEventListener('click', function() {
    document.querySelector('.circle').classList.remove('hide');
    document.querySelector('.active').classList.add('hide');
    document.querySelector('.cross').classList.add('hide');
});

document.querySelector('.random').addEventListener('click', function() {
  request("https://en.wikipedia.org/wiki/Special:Random").then(function(data) {
      console.log(data);
  })
})

function request(url, method, body) {
    if (!method) {
        method = 'GET'
    }
    var obj = {
        method: method,
        mode: "cors",
        headers: {
            'X-Mashape-Key': 'lYs60WHzYemshQMRaMCm5BBmpNspp1uO0KWjsneUQdIJ9Tvux2',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    if (method == 'POST' || method == 'DELETE') {
        obj.body = JSON.stringify(body)
    }
    return fetch(url, obj).then(function(response) {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json();
        }
    }, function(err) {
        console.log(err)
        return Promise.reject(err);
    })
};
