<?php
session_start();
if (!isset($_SESSION['login'])) {
    header('Location:cms-login.php');
}

// FORMULARIOS
include('cms-fn.php');

// SECCIONES ACCORDION
/*
    Para generar los elementos que representaran cada seccion a modificar en el CMS
*/
$secciones = [
    ["img" => "img-00", "id" => "sec-00", "rengId" => [1, 2], "nombre" => "slider-principal"],
    ["img" => "img-01", "id" => "sec-01", "rengId" => [3], "nombre" => "nosotros"],
    ["img" => "img-02", "id" => "sec-02", "rengId" => [4, 5, 6], "nombre" => "porque-nosotros"],
    ["img" => "img-04", "id" => "sec-03", "rengId" => [7], "nombre" => "encabezado-divisiones"],
    ["img" => "img-04", "id" => "sec-04", "rengId" => [8, 9], "nombre" => "divisiones"],
    ["img" => "img-05", "id" => "sec-05", "rengId" => [10], "nombre" => "catalogo-ferreteria"],
    ["img" => "img-05", "id" => "sec-06", "rengId" => [10], "nombre" => "catalogo-artes-graficas"],
    ["img" => "img-06", "id" => "sec-07", "rengId" => [11], "nombre" => "encabezado-contacto"],
    ["img" => "img-06", "id" => "sec-08", "rengId" => [12], "nombre" => "direccion"],
    // ["img" => "img-06", "id" => "sec-08", "rengId" => [17], "nombre" => "email"],
    ["img" => "img-06", "id" => "sec-09", "rengId" => [16], "nombre" => "whatsapp"],
    ["img" => "img-06", "id" => "sec-10", "rengId" => [13], "nombre" => "telefonos-locales"],
    ["img" => "img-06", "id" => "sec-11", "rengId" => [14], "nombre" => "instagram-ferreteria"],
    ["img" => "img-06", "id" => "sec-12", "rengId" => [15], "nombre" => "instagram-artes-graficas"],
    ["img" => "img-07", "id" => "sec-13", "rengId" => [18], "nombre" => "google-map"]
]
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- ======= HEAD ======= -->
    <?php include('head.php'); ?>
    <title>OEU | CMS main</title>
</head>

<body>
    <div class="container">
        <!-- ======= CABECERA ======= -->
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between rounded mt-3 p-3" style="min-height:80px;background-color:lightgray">
            <img src="assets/img/logo.png" alt="Logo" style="width:150px">
            <h2 class="text-muted mx-2 my-3 my-md-0">Gestor de contenidos Web</h2>
            <a class="btn btn-success" href="cms-login.php"><i class="bx bx-log-out"></i> CERRAR SESIÓN</a>
        </div>

        <!-- ======= ESTATUS DEL SITIO WEB ======= -->
        <hr>
        <?php echo estatus_web() ?>
        <hr>

        <!-- ======= CONTENIDO ======= -->
        <div class="d-flex flex-wrap flex-md-nowrap flex-grid gap-2 p-3">
            <div id="main" class="col-12 col-md-8">
                <h3 class="text-muted mb-3">Secciones</h3>
                <div class="overflow-auto" style="max-height:100vh">
                    <div class="accordion" id="accordionExample">
                        <?php foreach ($secciones as $sec) { ?>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="<?php echo $sec['id'] . '-h' ?>">
                                    <!--
                                    * Se especifica el data-img para cambiar el screenshot de referencia segun la seccion seleccionada
                                    * Se especifica el data-sec para crear IDs unicos para los elementos del accordion
                                    * Se indican los IDs de renglones para hacer las consultas a BD y cargarlos en sus formularios correspondientes
                                    -->
                                    <button class="accordion-button" type="button" data-img="<?php echo $sec['img'] ?>" data-sec="<?php echo $sec['id'] ?>" data-reng="<?php echo implode('-', $sec['rengId']) ?>" data-bs-toggle="collapse" data-bs-target="#<?php echo $sec['nombre'] ?>" aria-expanded="true" aria-controls="<?php echo $sec['nombre'] ?>">
                                        <?php echo ucfirst(str_replace('-', ' ', $sec['nombre'])) ?>
                                    </button>
                                </h2>
                                <div id="<?php echo $sec['nombre'] ?>" class="accordion-collapse collapse" aria-labelledby="<?php echo $sec['id'] . '-h' ?>" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <!-- AVISO USUARIO -->
                                        <div id="aviso-usuario-<?php echo $sec['id'] ?>"></div>

                                        <div class="accordion" id="accordion-slider">
                                            <?php
                                            // Mostrar de forma dinamica los formularios segun el apartado o item seleccionado
                                            switch ($sec['nombre']) {
                                                    /* 
                                            A cada apartado se le pasa el ID de renglon en BD del elemento a modificar y el nombre de la seccion 
                                            para filtrar el formulario a renderizar y que pertenece al elemento indicado
                                            */
                                                case 'slider-principal':
                                                    for ($i = 0; $i < 2; $i++) {
                                                        echo formulario_general($sec['rengId'][$i], $sec['nombre'], $sec['id'], $i);
                                                    }
                                                    break;
                                                case 'porque-nosotros':
                                                    for ($i = 0; $i < 3; $i++) {
                                                        echo formulario_general($sec['rengId'][$i], $sec['nombre'], $sec['id'], $i);
                                                    }
                                                    break;
                                                case 'divisiones':
                                                    for ($i = 0; $i < 2; $i++) {
                                                        echo formulario_general($sec['rengId'][$i], $sec['nombre'], $sec['id'], $i);
                                                    }
                                                    break;
                                                default:
                                                    // Formularios que no poseen mas de un elemento internamente
                                                    $x = 0;
                                                    echo formulario_general($sec['rengId'][0], $sec['nombre'], $sec['id'], $x);
                                                    break;
                                            } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>

            <!-- ======= SCREENSHOT ======= -->
            <div id="aside" class="col-12 col-md-4 mt-3 mt-md-0">
                <h3 class="text-muted mb-3">Referencia visual</h3>
                <figure class="overflow-auto" style="max-height:100vh">
                    <img id="screeshot-img" class="img-fluid" src="assets/img/cmsScreenshots/OEUscreenShot.jpg">
                </figure>
            </div>
        </div>

        <!-- ======= VENTANAS MODAL ======= -->
        <?php include('ventanas-modal.php'); ?>

        <!-- ======= FOOTER ======= -->
        <?php include('footer.php'); ?>
    </div>
</body>

</html>