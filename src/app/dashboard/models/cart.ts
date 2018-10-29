import { CartItem } from "./cart-item";

export class Cart {
    id: number;
    eventId: number;
    playerId: number;
    CreatedDate: Date;
    cartItems: CartItem[];
}