function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':0' + min + ':0' + sec;
    return time;
}

export function SecondBox(props): any {
    return (
        props.aparece ?
            <div className="caixa_debaixo">
                <div className="row block_bottom">
                    <div className="items"><Dating data={props.param.dt} espec="dia" /></div>
                    <div className="items">{props.param.dt}</div>
                    <div className="items"></div>
                </div>
            </div> : null
    );
}

export function Dating(props) {
    const nwsplit = timeConverter(props.data).split(" ");
    return props.espec == "dia" ? <div>{nwsplit[0]} {nwsplit[1]} {nwsplit[2]}</div> : <div>{nwsplit[3]}</div>
}

export function CloudRec (props) {
    return <div><img src={`http://openweathermap.org/img/wn/${props.type}@2x.png`} /></div>
}
