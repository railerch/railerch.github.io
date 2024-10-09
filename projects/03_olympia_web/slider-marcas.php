<?php
// CONEX BD
include('conn.php');

// CONSULTA
$stmt_sl = $conn->query("SELECT * FROM pag_inicio WHERE id = 20");
$images = $stmt_sl->fetch(PDO::FETCH_ASSOC);
$imgMarcasArr = explode(';', $images['img_doc_url']);
?>

<!------ Include the above in your  tag ---------->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.js"></script>

<style>
    #brand-slider {
        margin: 0 0;
        width: 100% !important;
        background-color: #f1f1f1;
    }

    #brand-slider h1 {
        text-align: center;
        padding: 20px;
        color: darkred;
    }

    #brand-slider p {
        text-align: center;
        color: grey;
        padding: 20px;
    }

    /* Slider */

    #brand-slider .slick-slide {
        margin: 0px 20px;
    }

    #brand-slider .slick-slide img {
        width: 100%;
    }

    #brand-slider .slick-slider {
        position: relative;
        display: block;
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
    }

    #brand-slider .slick-list {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #brand-slider .slick-list:focus {
        outline: none;
    }

    .slick-list.dragging {
        cursor: pointer;
        cursor: hand;
    }

    #brand-slider .slick-slider .slick-track,
    #brand-slider .slick-slider .slick-list {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    #brand-slider .slick-track {
        position: relative;
        top: 0;
        left: 0;
        display: block;
    }

    #brand-slider .slick-track:before,
    #brand-slider .slick-track:after {
        display: table;
        content: "";
    }

    #brand-slider .slick-track:after {
        clear: both;
    }

    #brand-slider .slick-loading .slick-track {
        visibility: hidden;
    }

    #brand-slider .slick-slide {
        display: none;
        float: left;
        height: 100%;
        min-height: 1px;
    }

    [dir="rtl"] .slick-slide {
        float: right;
    }

    #brand-slider .slick-slide img {
        display: block;
    }

    #brand-slider .slick-slide.slick-loading img {
        display: none;
    }

    #brand-slider .slick-slide.dragging img {
        pointer-events: none;
    }

    #brand-slider .slick-initialized .slick-slide {
        display: block;
    }

    #brand-slider .slick-loading .slick-slide {
        visibility: hidden;
    }

    #brand-slider .slick-vertical .slick-slide {
        display: block;
        height: auto;
        border: 1px solid transparent;
    }

    #brand-slider .slick-arrow.slick-hidden {
        display: none;
    }
</style>

<div id="brand-slider">
    <section class="customer-logos slider py-1">
        <?php for ($i = 1; $i < 10; $i++) { ?>
            <div class="slide"><img src="<?php echo $imgMarcasArr[$i] ?>"></div>
        <?php } ?>
    </section>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        $(".customer-logos").slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 600,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 3
                    }
                }
            ]
        });
    });
</script>