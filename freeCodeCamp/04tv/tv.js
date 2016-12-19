var channels = {};
document.querySelector('.online').addEventListener("mouseenter", function(event) {
    document.querySelector('.online').classList.add('long');
    document.querySelector('.online').classList.remove('short');
    document.querySelector('.online').textContent = 'Online';

})
document.querySelector('.offline').addEventListener("mouseenter", function(event) {
    document.querySelector('.offline').classList.add('long');
    document.querySelector('.offline').classList.remove('short');
    document.querySelector('.offline').textContent = 'Offline';

})
document.querySelector('.online').addEventListener("mouseout", function(event) {
    document.querySelector('.online').classList.add('short');
    document.querySelector('.online').classList.remove('long');
    document.querySelector('.online').textContent = 'c';

})
document.querySelector('.offline').addEventListener("mouseout", function(event) {
    document.querySelector('.offline').classList.add('short');
    document.querySelector('.offline').classList.remove('long');
    document.querySelector('.offline').textContent = 'c';

})
var p1=$.ajax({
    url: `https://wind-bow.hyperdev.space/twitch-api/channels/ESL_SC2`,
    dataType: "jsonp",
    success: function(data, status, xhr) {
        channels.key1 = {
            logo: data.logo,
            name: data.display_name,
            url: data.url,
            game: data.game
        }
        if (data.partner == true) {
            channels.key1.state = channels.key1.game;
        } else {
            channels.key1.state = 'offline';
        }
        //console.log(data);
    }
});
var p2=$.ajax({
    url: `https://wind-bow.hyperdev.space/twitch-api/channels/freecodecamp`,
    dataType: "jsonp",
    success: function(data, status, xhr) {
        //console.log(data);
        channels.key2 = {
            logo: data.logo,
            name: data.display_name,
            url: data.url,
            game: data.game
        }
        if (data.partner == true) {
            channels.key2.state = channels.key2.game;
        } else {
            channels.key2.state = 'offline';
        }
    }
});
var p3=$.ajax({
    url: `https://wind-bow.hyperdev.space/twitch-api/channels/test_channel`,
    dataType: "jsonp",
    success: function(data, status, xhr) {
        //console.log(data);
        channels.key3 = {
            logo: data.logo,
            name: data.display_name,
            url: data.url,
            game: data.game
        }
        if (data.partner == true) {
            channels.key3.state = channels.key3.game;
        } else {
            channels.key3.state = 'offline';
        }
    }
});

$.when(p1,p2,p3).then(function(){
  console.log(p1);
  console.log(p2);
  console.log(p3);
  render(channels);
})
function render() {
    var list = '';
    for (var key in channels) {
        list += `<div class= aChannel><img src=${channels[key].logo} class=logo><a href="${channels[key].url} class=tvName">${channels[key].name}</a><p class=state>${channels[key].state}</p></div>`;
    }
    document.querySelector('.tvList').innerHTML = list;
}

document.querySelector('.online').addEventListener('click', function() {
    for (var key in channels) {
        //console.log(channels);
        if (channels[key].state == 'offline') {
          console.log('obj');
            document.querySelector('.aChannel').classList.add('hide');
            render(channels);
        }
    }
});
document.querySelector('.offline').addEventListener('click', function() {
    for (var key in channels) {
        if (channels[key].state !== 'offline') {
            document.querySelector('.aChannel').classList.add('hide');
            render(channels);
        }
    }
})
