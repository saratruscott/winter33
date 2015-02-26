function rightsignal(socket) { //change function name and add call after socket created

    sensorName = 'rightsignal'; // change to sensor name
    divId = "#rightsignal"; // change to id of div on page

    var i = 0;
    var readings = [];
    for (var i = 0; i < 100; i++) {
        readings.push(null);
    }
    var samples = []
    for (var i = 0; i < readings.length; ++i) {
        samples.push([i, readings[i]])
    }
    var plot = $.plot(divId, [samples], {
        yaxis: {
            min: 0,
            max: .8
        },
        xaxis: {
            show: false
        }
    });

    socket.on('sensordata', function(data) {
        readings.shift();
        readings.push(data.cliff_sensors.right.signal.magnitude); // change to data being read
        samples = [];
        for (var i = 0; i < readings.length; ++i) {
            samples.push([i, readings[i]]);
        }
        plot.setData([samples]);
        plot.draw();
    });

}
