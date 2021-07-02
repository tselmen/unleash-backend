const { MQTTPubSub } = require('graphql-mqtt-subscriptions');
const mqtt = require('mqtt');

const usersResolvers = require('./users');
const deviceResolvers = require('./devices');
const deviceDataResolvers = require('./deviceDatas');
const DeviceData = require('../../models/DeviceData');

const client = mqtt.connect('mqtt://192.168.0.105/1883', {
    reconnectPeriod: 1000,
});

const pubsub = new MQTTPubSub({
    client,
});

client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', async (topic, message, packet) => {
    const sensorData = JSON.parse(message.toString());
    console.log(sensorData);
    if (sensorData.tmp == -300 || sensorData.hum == -300) {
        const beforeSensorData = await DeviceData.find().sort({ timeStamp: -1 }).limit(1);
        sensorData.tmp = beforeSensorData[0].tmp;
        sensorData.hum = beforeSensorData[0].hum;
    }
    const deviceData = new DeviceData({ ...sensorData, timeStamp: new Date() });
    const res = await deviceData.save();
    console.log({ ...res._doc });
});
client.on('close', mqtt_close);

function mqtt_connect() {
    //console.log("Connecting MQTT");
    client.subscribe('node-broker', mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    console.log('Subscribed to ' + 'node-broker');
    if (err) {
        console.log(err);
    }
}

function mqtt_reconnect(err) {
    //console.log("Reconnect MQTT");
    //if (err) {console.log(err);}
    client = mqtt.connect('mqtt://192.168.0.105/1883', {
        reconnectPeriod: 1000,
    });
}

function mqtt_error(err) {
    //console.log("Error!");
    //if (err) {console.log(err);}
}

function after_publish() {
    //do nothing
}

function mqtt_close() {
    //console.log("Close MQTT");
}

module.exports = {
    Query: {
        ...deviceResolvers.Query,
        sensors: () => {
            return [{ id: 'Sensor1' }, { id: 'Sensor2' }];
        },
        ...deviceDataResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...deviceResolvers.Mutation,
        ...deviceDataResolvers.Mutation,
    },
    Subscription: {
        subscribe2sensor: {
            resolve: (payload) => {
                return {
                    tmp: payload.tmp,
                    hum: payload.hum,
                    ppm: payload.ppm,
                    wio: payload.wio,
                    timeStamp: new Date().toISOString(),
                };
            },
            subscribe: (_, args) => pubsub.asyncIterator([args.topic]),
        },
    },
};
