<?php
session_start();
// ANULAR LA SESION
$_SESSION['login'] = NULL;

if (isset($_SESSION['error'])) {
    $display = "block";
    $_SESSION['error'] = NULL;
} else {
    $display = "none";
}

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- ======= HEAD ======= -->
    <?php include('head.php'); ?>
    <title>OEU | CMS Login</title>
    <style>
        #cms-body {
            height: 100vh;
            background-color: snow;
        }

        #login-form {
            background-color: #fff;
        }
    </style>
</head>

<body id="cms-body" class="container d-flex justify-content-center align-items-center">
    <!-- ======= LOGIN FRM ======= -->
    <div id="login-form" class="col-12 col-lg-3 border rounded shadow py-3 px-2">
        <div class="text-center">
            <img class="img-fluid" src="assets/img/logo.png" alt="Olympia Empresas Unidas">

            <div class="alert alert-danger" role="alert" style="display:<?php echo $display ?>">
                <strong>ERROR!</strong> Datos incorrectos.
            </div>

            <form action="cms-ctrl.php?cmsLogin=true" method="post">
                <div class="mb-3">
                    <input type="text" class="form-control" name="usuario" placeholder="Usuario" required>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" name="clave" placeholder="Clave" required>
                </div>
                <input type="submit" class="form-control btn btn-success" value="INICIAR SESIÓN">
                <a class="btn btn-outline-secondary btn-sm mt-2" href="inicio.php">PAGINA PRINCIPAL</a>
            </form>
        </div>
    </div>
</body>

</html>