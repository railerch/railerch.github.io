<?php
// CONEX BD
include('conn.php');

// CONSULTAR ESTATUS DEL SITIO WEB PARA REDIRECCIONAR
$stmt   = $conn->query("SELECT descripcion FROM pag_inicio WHERE elemento = 'estatus'");
$row    = $stmt->fetch(PDO::FETCH_NUM);

// REDIRECCION
if ($row['0'] == 'offline') {
  header("location: construccion.php");
}

// CONSULTAR CONTENIDO WEB
$stmt = $conn->query("SELECT * FROM pag_inicio");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
//echo '<pre>';
//var_dump($rows);

?>

<!DOCTYPE html>
<html lang="es">

<head>
  <!-- ======= HEAD ======= -->
  <?php include('head.php'); ?>
  <title>Olympia Empresas Unidas</title>
</head>

<body>

  <!-- ======= SOCIAL BAR ======= -->
  <div class="social-bar">
    <!-- <a href="https://www.facebook.com" class="bx bxl-facebook-circle" target="_blank"></a> -->
    <a href="<?php echo $rows[13]['img_doc_url'] ?>" class="bx bxl-instagram" target="_blank" data-btn=" Ferreteria"><span></span></a>
    <a href="<?php echo $rows[14]['img_doc_url'] ?>" class="bx bxl-instagram" target="_blank" data-btn=" Artes Gráficas"><span></span></a>
    <!-- <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=<?php echo $rows[16]['descripcion'] ?>" class="bx bx-mail-send" target="_blank" data-btn=" Contáctanos"><span></span></a> -->
    <a href="https://wa.me/<?php echo $rows[15]['descripcion'] ?>/?text=Olympia%20EU" class="bx bxl-whatsapp" target="_blank" data-btn="Whatsapp"><span></span></a>
  </div>

  <!-- ======= HEADER NAV TMP ======= -->
  <header id="header" class="d-flex align-items-center" style="background-color:#000">
    <div class="container d-flex align-items-center justify-content-between">

      <a href="inicio.php" class="logo"><img src="<?php echo $rows[18]['img_doc_url'] ?>" alt="" class="img-fluid"></a>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto" href="#carousel">Inicio</a>
          </li>
          <li><a class="nav-link scrollto" href="#nosotros">Nosotros</a></li>
          <li><a class="nav-link scrollto" href="#divisiones">Divisiones</a></li>
          <li><a class="nav-link scrollto" href="#catalogos">Catalogos</a></li>
          <li><a class="nav-link scrollto" href="#contacto">Contacto</a></li>
        </ul>
        <!-- 
        <i class="bi bi-list mobile-nav-toggle">
          <ul>
            <li><a class="nav-link scrollto" href="#carousel">Inicio</a>
            </li>
            <li><a class="nav-link scrollto" href="#nosotros">Nosotros</a></li>
            <li><a class="nav-link scrollto" href="#divisiones">Divisiones</a></li>
            <li><a class="nav-link scrollto" href="#catalogos">Catalogos</a></li>
            <li><a class="nav-link scrollto" href="#contacto">Contacto</a></li>
          </ul>
        </i>
        -->
      </nav>
    </div>
  </header>

  <!-- ======= HEADER BANNER ======= -->
  <div id="carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active" style="background: url(<?php echo $rows[0]['img_doc_url'] ?>) no-repeat center center; background-size:cover;height:50vh">
        <div class="d-flex justify-content-center align-items-center text-center" style="height:100%;width:100%">
          <div>
            <h1 style="font-size:300%;font-weight:bold;color:#fff;text-shadow:2px 2px 5px #000000"><?php echo $rows[0]['titulo'] ?></h1>
            <h3 style="color:#fff"><?php echo $rows[0]['descripcion'] ?></h3>
          </div>
        </div>
      </div>
      <div class="carousel-item" style="background: url(<?php echo $rows[1]['img_doc_url'] ?>) no-repeat center center; background-size:cover;height:50vh">
        <div class="d-flex justify-content-center align-items-center text-center" style="height:100%;width:100%">
          <div>
            <h1 style="font-size:300%;font-weight:bold;color:#fff;text-shadow:2px 2px 5px #000000"><?php echo $rows[1]['titulo'] ?></h1>
            <h3 style="color:#fff"><?php echo $rows[1]['descripcion'] ?></h3>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <main id="main">
    <!-- ======= NOSOTROS ======= -->
    <section id="nosotros" class="about">
      <div class="container">

        <div class="row">
          <div class="col-lg-6 order-1 order-lg-2 d-flex justify-content-center" data-aos="fade-left">
            <img src="<?php echo $rows[2]['img_doc_url'] ?>" class="img-fluid" alt="" style="width:350px">
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="fade-right">
            <h3><?php echo $rows[2]['titulo'] ?></h3>
            <p class="fst-italic">
              <?php echo $rows[2]['descripcion'] ?>
            </p>

          </div>
        </div>

      </div>
    </section>

    <!-- ======= PORQUE NOSOTROS ======= -->
    <section id="porque-nosotros" class="why-us">
      <div class="container">

        <div class="row">

          <div class="col-lg-4" data-aos="fade-up">
            <div class="box">
              <span><i class="bx bx-heart"></i></span>
              <h4><?php echo $rows[3]['titulo'] ?></h4>
              <p><?php echo $rows[3]['descripcion'] ?></p>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="150">
            <div class="box">
              <span><i class="bx bx-medal"></i></span>
              <h4><?php echo $rows[4]['titulo'] ?></h4>
              <p><?php echo $rows[4]['descripcion'] ?></p>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="300">
            <div class="box">
              <span><i class="bx bx-check-shield"></i></span>
              <h4><?php echo $rows[5]['titulo'] ?></h4>
              <p><?php echo $rows[5]['descripcion'] ?></p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- ======= MARCAS ======= -->
    <?php include('slider-marcas.php') ?>

    <!-- ======= DIVISIONES ======= -->
    <section id="divisiones" class="services">
      <div class="container">

        <div class="section-title">
          <span>Divisiones</span>
          <h2>Divisiones</h2>
          <p><?php echo $rows[6]['descripcion'] ?></p>
        </div>

        <div class="row">
          <div class="col-12 col-sm-6 d-flex justify-content-center" data-aos="fade-up">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-bolt-circle"></i></div>
              <h3><?php echo $rows[7]['titulo'] ?></h3>
              <p><?php echo $rows[7]['descripcion'] ?></p>
            </div>
          </div>

          <div class="col-12 col-sm-6 d-flex justify-content-center mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="150">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-layer"></i></div>
              <h3><?php echo $rows[8]['titulo'] ?></h3>
              <p><?php echo $rows[8]['descripcion'] ?></p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ======= CATALOGO DE PRODUCTOS PDF ======= -->
    <section id="catalogos" class="cta" style="background-image: url(<?php echo $rows[9]['img_doc_url'] ?>)">
      <div class="container" data-aos="zoom-in">

        <div class="text-center">
          <h3><?php echo $rows[9]['titulo'] ?></h3>
          <p><?php echo $rows[9]['descripcion'] ?></p>
          <a class="cta-btn" href="<?php echo $rows[9]['btn01'] ?>" target="_blank"><i class="bx bx-download"></i> Ferretería</a>
          <a class="cta-btn" href="<?php echo $rows[9]['btn02'] ?>" target="_blank"><i class="bx bx-download"></i> Artes Gráficas</a>
        </div>

      </div>
    </section>

    <!-- ======= CONTACTOS ======= -->
    <section id="contacto" class="contact">
      <div class="container">

        <div class="section-title">
          <span>Contacto</span>
          <h2>Contacto</h2>
          <p><?php echo $rows[10]['descripcion'] ?></p>
        </div>

        <div class="row" data-aos="fade-up">
          <div class="col-md-6">
            <div class="info-box mb-4">
              <i class="bx bx-map"></i>
              <h3>Dirección</h3>
              <p><?php echo $rows[11]['descripcion'] ?></p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="info-box  mb-4">
              <i class="bx bx-phone-call"></i>
              <h3>Teléfonos</h3>
              <p><?php echo $rows[12]['descripcion'] ?></p>
            </div>
          </div>
        </div>

        <div class="row" data-aos="fade-up">

          <!-- GOOGLE MAPS-->
          <div class="col-12">
            <?php echo $rows[17]['descripcion'] ?>
          </div>

        </div>

      </div>
    </section>

    <!-- ======= VENTANAS MODAL ======= -->
    <?php include('ventanas-modal.php'); ?>

    <!-- ======= FOOTER ======= -->
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row justify-content-around">

            <div class="col-lg-4 col-md-6">
              <div class="footer-info">
                <a href="index.php" class="logo"><img src="<?php echo $rows[18]['img_doc_url'] ?>" alt="" class="img-fluid"></a>
              </div>
            </div>

            <div class="col-lg-2 col-md-6 footer-links">
              <h4>Enlaces</h4>
              <ul>
                <li><i class="bx bx-chevron-right"></i> <a href="#carousel">Home</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#nosotros">Nosotros</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#divisiones">Divisiones</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="/#" data-bs-toggle="modal" data-bs-target="#politica-privacidad">Política de privacidad</a></li>
              </ul>
            </div>

            <div class="col-lg-2 col-md-6 footer-links">
              <h4>Redes sociales</h4>
              <p><a href="<?php echo $rows[13]['img_doc_url'] ?>" target="_blank"><i class="bx bxl-instagram-alt"></i> Ferreteria</a></p>
              <p><a href="<?php echo $rows[14]['img_doc_url'] ?>" target="_blank"><i class="bx bxl-instagram-alt"></i> Artes Gráficas</a></p>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="copyright">
          &copy; Copyright 2022, <strong><span>Olympia Empresas Unidas, C.A.</span></strong>. todos los derechos
          reservados.
        </div>
      </div>
    </footer>

    <!-- ======= FOOTER SCRIPTS ======= -->
    <?php include('footer.php'); ?>

</body>

</html>