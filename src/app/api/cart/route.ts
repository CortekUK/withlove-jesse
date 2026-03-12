import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const CART_COOKIE = "wlj_cart";

type CartItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  personalisation?: Record<string, string>;
};

function getCart(): CartItem[] {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get(CART_COOKIE)?.value;
  if (!cartCookie) return [];
  try {
    return JSON.parse(cartCookie);
  } catch {
    return [];
  }
}

function setCart(items: CartItem[]) {
  const filtered = items.filter((i) => i.quantity > 0);
  return new NextResponse(undefined, {
    headers: {
      "Set-Cookie": `${CART_COOKIE}=${JSON.stringify(filtered)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
    },
  });
}

export async function GET() {
  const cart = getCart();
  return NextResponse.json({ items: cart });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, quantity = 1, personalisation } = body;

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID required" },
      { status: 400 }
    );
  }

  const { prisma } = await import("@/lib/prisma");
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: true },
  });

  if (!product || !product.isActive) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const mainImage = product.images.find((i) => i.isMain) || product.images[0];
  const price = product.salePrice ? Number(product.salePrice) : Number(product.price);

  const cart = getCart();
  const existing = cart.find((i) => i.productId === productId);
  const newItem: CartItem = {
    productId: product.id,
    slug: product.slug,
    title: product.title,
    price,
    quantity: existing ? existing.quantity + quantity : quantity,
    imageUrl: mainImage?.url || "",
    personalisation: personalisation || undefined,
  };

  const updated = existing
    ? cart.map((i) => (i.productId === productId ? newItem : i))
    : [...cart, newItem];

  const res = NextResponse.json({ items: updated });
  res.headers.set(
    "Set-Cookie",
    `${CART_COOKIE}=${JSON.stringify(updated)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
  );
  return res;
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { productId, quantity } = body;

  const cart = getCart();
  const updated = cart
    .map((i) => (i.productId === productId ? { ...i, quantity } : i))
    .filter((i) => i.quantity > 0);

  const res = NextResponse.json({ items: updated });
  res.headers.set(
    "Set-Cookie",
    `${CART_COOKIE}=${JSON.stringify(updated)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
  );
  return res;
}
