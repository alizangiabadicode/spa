export interface Message {
    id: number;
    senderId: number;
    senderKnownAs: string;
    senderPhotoUrl: string;
    reciverId: number;
    reciverKnownAs: string;
    reciverPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    dateSent: Date;
}
