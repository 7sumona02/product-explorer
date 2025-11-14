"use client";

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export default function CartSidebar() {
    const { cart, removeFromCart } = useCart();

    return (
        <Sheet>
            {/* Cart Icon Trigger */}
            <SheetTrigger asChild>
                <button className="relative">
                    <ShoppingCart className="size-6" />

                    {/* Badge*/}
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[0.7rem] rounded-full h-5 w-5 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </button>
            </SheetTrigger>

            {/* Sidebar */}
            <SheetContent className="w-80 sm:w-96">
                <SheetHeader>
                    <SheetTitle className="font-medium">Your Cart</SheetTitle>
                </SheetHeader>

                {/* Cart Items */}
                <div className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {cart.length === 0 ? (
                        <p className="text-sm text-neutral-500 text-center">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-5 px-3">
                            {cart.map((item, i) => (
                                <div
                                    key={`${item.id}-${i}`} // make key unique
                                    className="w-full flex items-start justify-between px-3 border border-neutral-200 rounded-lg p-3"
                                >
                                    <div className="flex gap-3">
                                        {item.thumbnail ? (
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title}
                                                width={60}
                                                height={60}
                                                className="rounded-md"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-neutral-200 rounded-md flex items-center justify-center text-sm text-neutral-500">
                                                No Image
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-sm text-neutral-600 mt-1">
                                                ${item.price} × {item.qty}
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant='destructive' size={'sm'}
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs cursor-pointer"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
