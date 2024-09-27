import * as amqp from 'amqplib';
import IMessageBrokerPublisher from "../../../application/_common/interfaces/IMessageBrokerPublisher";

class EventPublisher implements IMessageBrokerPublisher {
    async publishAsync(event: any, routingKey : string) {
        try {
            const connection = await amqp.connect(`${process.env.RABBITMQ_URL}`);
            const channel = await connection.createChannel();
            const exchange = 'fanout_exchange';

            await channel.assertExchange(exchange, 'fanout', { durable: false });

            channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(event)));
            console.log('Event published:', event);

            await channel.close();
            await connection.close();
        } catch (error) {
            console.error('Failed to publish event:', error);
        }
    }
}

export default new EventPublisher()