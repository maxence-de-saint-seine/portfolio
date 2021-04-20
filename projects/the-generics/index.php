<?php
    include('head.php');
?>

<body>
    <header class="main-header">
        <?php include('nav.php'); ?>
        <h1 class="band-name band-name-large">The Generics</h1>
        <div class="container">
            <button class="btn btn-header" type="button">Get our latest Album</button>
        </div>
        <button class="btn btn-header btn-play" type="button">&#9658;</button>
    </header>

    <section class="content-section container">
        <h2 class="section-header">TOURS</h2>
        <div>
            <div class="tour-row">
                <span class="tour-item tour-date">JUL 16</span>
                <span class="tour-item tour-city">DETROIT, MI</span>
                <span class="tour-item tour-arena">DTE ENERGY MUSIC THEATER</span>
                <button class="btn tour-item tour-button btn-primary" type="button">BUY TICKETS</button>
            </div>
            <div class="tour-row">
                <span class="tour-item tour-date">JUL 19</span>
                <span class="tour-item tour-city">TORONTO, ON</span>
                <span class="tour-item tour-arena">BUDWEISER STAGE</span>
                <button class="btn tour-item tour-button btn-primary" type="button">BUY TICKETS</button>
            </div>
            <div class="tour-row">
                <span class="tour-item tour-date">JUL 22</span>
                <span class="tour-item tour-city">BRISTOW, VA</span>
                <span class="tour-item tour-arena">JIGGY LUBE LIVE</span>
                <button class="btn tour-item tour-button btn-primary" type="button">BUY TICKETS</button>
            </div>
            <div class="tour-row">
                <span class="tour-item tour-date">JUL 29</span>
                <span class="tour-item tour-city">PHOENIX, AZ</span>
                <span class="tour-item tour-arena">AK-CHIN PAVILION</span>
                <button class="btn tour-item tour-button btn-primary" type="button">BUY TICKETS</button>
            </div>
            <div class="tour-row">
                <span class="tour-item tour-date">AUG 2</span>
                <span class="tour-item tour-city">LAS VEGAS, NV</span>
                <span class="tour-item tour-arena">T-MOBILE ARENA</span>
                <button class="btn tour-item tour-button btn-primary" type="button">BUY TICKETS</button>
            </div>
            <div class="tour-row">
                <span class="tour-item tour-date">AUG 7</span>
                <span class="tour-item tour-city">CONCORD, CA</span>
                <span class="tour-item tour-arena">CONCORD PAVILION</span>
                <button class="btn tour-item tour-button btn-primary" type="button">BUY TICKETS</button>
            </div>
        </div>
    </section>

    <?php include('footer.php'); ?>
</body>