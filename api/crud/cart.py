from sqlalchemy.orm import Session, joinedload
from api.models.cart import Cart, CartItem
from api.models.product import Product
from api.schemas.cart import CartItemCreate, CartItemUpdate
from fastapi import HTTPException, status

def get_or_create_cart(db: Session, user_id: int):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart

def get_cart_by_user_id(db: Session, user_id: int):
    return db.query(Cart).options(joinedload(Cart.items).joinedload(CartItem.product).joinedload(Product.category)).filter(Cart.user_id == user_id).first()

def add_item_to_cart(db: Session, user_id: int, item: CartItemCreate):
    cart = get_or_create_cart(db, user_id)
    product = db.query(Product).filter(Product.id == item.product_id).first()

    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    if product.stock < item.quantity:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough stock for this product")

    cart_item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == item.product_id
    ).first()

    if cart_item:
        cart_item.quantity += item.quantity
    else:
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_addition=product.price # Store price at the time of addition
        )
        db.add(cart_item)

    db.commit()
    db.refresh(cart_item)
    update_cart_total(db, cart)
    return cart_item

def update_cart_item(db: Session, user_id: int, item_id: int, item_update: CartItemUpdate):
    cart = get_or_create_cart(db, user_id)
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found in your cart")

    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Associated product not found")

    if item_update.quantity <= 0:
        # Remove item if quantity is 0 or less
        db.delete(cart_item)
        db.commit()
        update_cart_total(db, cart)
        return None

    if product.stock < item_update.quantity:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough stock for the requested quantity")

    cart_item.quantity = item_update.quantity
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    update_cart_total(db, cart)
    return cart_item

def remove_item_from_cart(db: Session, user_id: int, item_id: int):
    cart = get_or_create_cart(db, user_id)
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found in your cart")

    db.delete(cart_item)
    db.commit()
    update_cart_total(db, cart)
    return True

def clear_cart(db: Session, user_id: int):
    cart = get_or_create_cart(db, user_id)
    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
    db.commit()
    update_cart_total(db, cart) # Set total to 0
    return True

def update_cart_total(db: Session, cart: Cart):
    total = sum(item.quantity * item.price_at_addition for item in cart.items)
    cart.total_price = total
    db.add(cart)
    db.commit()
    db.refresh(cart)
    return cart