<?php
    $title = "The Generics | Sotre";
    include('head.php');
?>

<body>
    <header class="main-header">
        <?php include('nav.php'); ?>
        <h1 class="band-name band-name-large">The Generics</h1>
    </header>

    <section class="container content-section">
        <h2 class="section-header">MUSIC</h2>
        <div class="shop-items">
            <div class="shop-item">
                <span class="shop-item-title">Album 1</span>
                <img class="shop-item-image" src="Images/Album 1.png">
                <div class="shop-item-details">
                    <span class="shop-item-price">$12.99</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
            <div class="shop-item">
                <span class="shop-item-title">Album 2</span>
                <img class="shop-item-image" src="Images/Album 2.png">
                <div class="shop-item-details">
                    <span class="shop-item-price">$14.99</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
            <div class="shop-item">
                <span class="shop-item-title">Album 3</span>
                <img class="shop-item-image" src="Images/Album 3.png">
                <div class="shop-item-details">
                    <span class="shop-item-price">$9.99</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
            <div class="shop-item">
                <span class="shop-item-title">Album 4</span>
                <img class="shop-item-image" src="Images/Album 4.png">
                <div class="shop-item-details">
                    <span class="shop-item-price">$19.99</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
        </div>
    </section>
    
    <section class="container content-section">
        <h2 class="section-header">MERCH</h2>
        <div class="shop-items">
            <div class="shop-item">
                <span class="shop-item-title">T-Shirt</span>
                <img class="shop-item-image" src="Images/Shirt.png">
                <div class="shop-item-details">
                    <span class="shop-item-price">$19.99</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
            <div class="shop-item">
                <span class="shop-item-title">Cofee Cup</span>
                <img class="shop-item-image" src="Images/Cofee.png">
                <div class="shop-item-details">
                    <span class="shop-item-price">$6.99</span>
                    <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                </div>
            </div>
        </div>
    </section>

    <section class="container content-section">
        <h2 class="section-header">CART</h2>
        <div class="cart-row">
            <span class="cart-item cart-header cart-column">ITEM</span>
            <span class="cart-price cart-header cart-column">PRICE</span>
            <span class="cart-quantity cart-header cart-column">QUANTITY</span>
        </div>

        <div class="cart-items">
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="Images/Shirt.png" height="100" width="100">
                    <span class="cart-item-title">T-Shirt</span>
                </div>
                <span class="cart-price cart-column">$19.99</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>

            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="Images/Album 3.png" width="100" height="100">
                    <span class="cart-item-title">Album 3</span>
                </div>
                <span class="cart-price cart-column">$9.99</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="2">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
        </div>

        <div class="cart-total">
            <strong class="cart-total-title">Total</strong>
            <span class="cart-total-price">$39.97</span>
        </div>
        <button class="btn btn-primary btn-purchase" type="button">PURCHASE</button>
    </section>

    <?php include('footer.php'); ?>
</body>