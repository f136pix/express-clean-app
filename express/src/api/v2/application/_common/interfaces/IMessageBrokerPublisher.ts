export default interface IMessageBrokerPublisher {
    publishAsync(event: any, routingKet: string) : Promise<void>;
}