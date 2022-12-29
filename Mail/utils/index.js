const amqplib = require("amqplib");
const EXCHANGE_NAME = "MICRO_SERVICES"
const MSG_QUEUE_URL = "amqp://localhost"
  
module.exports.PublishMessage = async(service, msg) => {

  const connection = await amqplib.connect(MSG_QUEUE_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  };
  
  