var App = React.createClass({
    getInitialState: function() {
        return {data: null}
    },
    componentDidMount: function() {
        request("http://scuinfo.com/api/hot").then(result => {
            var data = {};
            for (var i = 0; i < result.data.length; i++) {
                var id = result.data[i].id,
                    contentV = result.data[i].content;
                data[id] = {};
                data[id].content = contentV;
            }
            this.setState({data: data});
            console.log(this.state);
        })
    },
    render: function() {
        var styles = {
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Microsoft YaHei'
        }
        if (!this.state.data) {
            return <Loading/>
        }
        return (
            <div style={styles} className="main">
                <List data={this.state.data}/>
            </div>
        )
    }
})
var Item = React.createClass({
    // getInitialState:function(){
    //
    // },
    render: function() {
        return (
            <div>{this.props.data.content}</div>
        )
    }

})

var List = React.createClass({

    render: function() {
        var arr = [];
        for (var key in this.props.data) {
            arr.push(<Item key={'item' + key} data={this.props.data[key]}/>)
        }
        return (
            <ul>
                {arr}
            </ul>
        )

    }
})

var Loading = React.createClass({
    render: function() {
        return (
            <div>loading...</div>
        )
    }
})
ReactDOM.render(
    <App/>, document.querySelector('.container'))

function request(url, method, body) {
    if (!method) {
        method = 'GET'
    }
    var obj = {
        method: method,
        mode: "cors"
    }
    if (method == 'POST' || method == 'DELETE') {
        obj.body = JSON.stringify(body)
    }
    return fetch(url, obj).then(function(response) {
        //console.log(response);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json();
        }
    }, function(err) {
        console.log(err)
        return Promise.reject(err);
    })
}
