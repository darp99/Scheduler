const amqplib = require("amqplib");
const EXCHANGE_NAME = "MICRO_SERVICES"
const MSG_QUEUE_URL = "amqp://localhost"
const JOB_SERVICE ="job_service"
  
  module.exports.SubscribeMessage = async ( service) => {

    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });

    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);
  
    channel.bindQueue(q.queue, EXCHANGE_NAME, JOB_SERVICE);
  
    channel.consume(
      q.queue,
      (msg) => {
        if (msg.content) {
          console.log("the message is:", msg.content.toString());

          service(msg.content.toString());
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };
  