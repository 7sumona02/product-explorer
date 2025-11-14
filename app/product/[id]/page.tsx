"use client";

import CartSidebar from "@/components/CartSidebar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCart } from "@/context/CartContext";
import { productSchema } from "@/lib/schemas/product";
import { ArrowLeft, Star, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductDetail() {
    const { addToCart } = useCart();
    const params = useParams();
    const id = params.id;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mainImg, setMainImg] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                const parsed = productSchema.safeParse(data);

                if (!parsed.success) {
                    console.error("Invalid API response:", parsed.error);
                    setError("The product data returned from server is invalid.");
                    setLoading(false);
                    return;
                }

                setProduct(parsed.data);
                setMainImg(parsed.data.thumbnail);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load product. Please try again.");
                setLoading(false);
            });

    }, [id]);

    if (loading)
        return (
            <p className="p-10 text-center min-h-screen flex justify-center items-center">
                <Spinner className="size-8" />
            </p>
        );

    if (error)
        return (
            <p className="p-10 text-center text-red-500 min-h-screen flex justify-center items-center">
                {error}
            </p>
        );

    if (!product)
        return <p className="p-10 text-center">No product found.</p>;

    return (
        <div className="min-h-screen max-w-5xl mx-auto pb-20 py-5 md:px-0 px-3">
            <div className="w-full flex items-center justify-between mb-5">
                <Link href='/'>
                    <Button size={'sm'} className="text-sm flex items-center gap-1 cursor-pointer" variant={"outline"}><ArrowLeft className="size-4" /> Back to Products</Button>
                </Link>
                <div className="flex items-center gap-4">
                    <CartSidebar />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-10">

                <div className="w-full md:w-1/2">
                    <img
                        src={mainImg}
                        className="w-full rounded-lg border"
                    />
                    <div className="flex gap-3 mt-3">
                        {product.images?.map((img: string, i: number) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setMainImg(img)}
                                className="w-20 h-20 object-cover rounded-md border cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                    <div>
                        <h1 className="text-xl">{product.title}</h1>
                        <p className="text-sm mt-1 flex items-center gap-1"><Star stroke='0' className="size-4" fill="oklch(76.9% 0.188 70.08)" /> {product.rating}</p>
                    </div>

                    <div>
                        <p className="text-xl font-medium">${product.price}</p>
                        <p className="text-neutral-500">inclusive of all taxes</p>
                    </div>

                    <Button
                        className="mt-4 w-full cursor-pointer"
                        onClick={() => {
                            addToCart({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                thumbnail: product.thumbnail,
                                qty: 1,
                            });
                            setTimeout(() => {
                                toast.success('Product added to cart');
                            }, 500);
                        }}
                    >
                        Add to Cart
                    </Button>


                    <p className="text-sm bg-neutral-200 py-2 px-3">• Flat {product.discountPercentage}% Off</p>

                    <div className="flex gap-3 items-center text-black border-b border-b-neutral-200 pb-20">
                        <div className="border-2 border-dashed p-2 border-neutral-300 text-sm w-fit text-center">{product.warrantyInformation}</div>
                        <div className="border-2 border-dashed p-2 border-neutral-300 text-sm w-fit text-center">{product.availabilityStatus}</div>
                        <div className="border-2 border-dashed p-2 border-neutral-300 text-sm w-fit text-center">{product.shippingInformation}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="w-xs text-sm flex">
                            <div className="w-xs"><span className="font-medium mr-10">Brand</span></div>
                            <div className="w-1/2">{product.brand}</div>
                        </div>
                        <div className="w-xs text-sm flex">
                            <div className="w-xs"><span className="font-medium mr-10">Category</span></div>
                            <div className="w-1/2">{product.category}</div>
                        </div>
                        <div className="w-xs text-sm flex">
                            <div className="w-xs"><span className="font-medium mr-10">Min Order Quantity</span></div>
                            <div className="w-1/2">{product.minimumOrderQuantity}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-medium mb-3">Top Reviews</h2>
                <div className="space-y-4">
                    {product.reviews?.map((r: any, i: number) => (
                        <div key={i} className="border p-4 rounded-md space-y-2 md:w-1/2">
                            <div className="flex items-center gap-2.5">
                                <div className="w-fit bg-neutral-200 rounded-full p-2 flex justify-center items-center"><User className="size-3" /></div>
                                <div className="text-xs">{r.reviewerName}</div>
                            </div>
                            <div className="mt-1">
                                <p className="text-sm flex items-center gap-1"><Star stroke='0' className="size-4" fill="oklch(76.9% 0.188 70.08)" /> {r.rating}</p>
                                <p>{r.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
