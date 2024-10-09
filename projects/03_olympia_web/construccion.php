<?php
// CONEX BD
include('conn.php');

// CONSULTAR ESTATUS DEL SITIO WEB PARA REDIRECCIONAR
$stmt   = $conn->query("SELECT descripcion FROM pag_inicio WHERE elemento = 'estatus'");
$row    = $stmt->fetch(PDO::FETCH_NUM);

// REDIRECCION
if ($row['0'] == 'online') {
    header("location: inicio.php");
}

// CONSULTAR TELEFONOS LOCALES
$stmt_telf   = $conn->query("SELECT descripcion FROM pag_inicio WHERE elemento = 'telefonos'");
$row_telf    = $stmt_telf->fetch(PDO::FETCH_NUM);

// CONSULTAR REDES SOCIALES: FERRETERIA
$stmt_igFe   = $conn->query("SELECT img_doc_url FROM pag_inicio WHERE elemento = 'instagram-ferreteria'");
$row_igFe    = $stmt_igFe->fetch(PDO::FETCH_NUM);

// CONSULTAR REDES SOCIALES: ARTES GRAFICAS
$stmt_igAg   = $conn->query("SELECT img_doc_url FROM pag_inicio WHERE elemento = 'instagram-artes-graficas'");
$row_igAg    = $stmt_igAg->fetch(PDO::FETCH_NUM);
?>

<!doctype html>
<html lang="es">

<head>
    <title>Olympia Empresas Unidas</title>
    <!-- Required meta tags -->
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=7">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Favicon -->
    <link rel="shortcut icon" href="assets/img/favicon.png" type="image/x-icon">

    <!-- Bootstrap CSS v5.2.0-beta1 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

    <!-- Boxicons -->
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(15deg, #543933, #008737);
            color: #fff;
        }

        main {
            display: flex;
            align-items: center !important;
            justify-content: center;
            width: 85%;
            min-height: 100vh;
            margin: 0 auto;
            text-align: center;
        }

        #logo {
            width: 75%;
            margin-bottom: 1em;
        }

        .social-btn {
            color: #fff;
            font-size: 1.5em;
            text-decoration: none;
            margin: 0 2%;
        }

        .social-btn:hover {
            color: gray;
        }

        @media (max-width: 600px) {
            #logo {
                width: 75%;
                margin-bottom: 1em;
            }
        }
    </style>

</head>

<body>

    <main id="main">
        <div>
            <img id="logo" src="assets/img/logo.png" alt="Olympia EU - Logo">
            <p>Empresa de importación y comercialización de insumos para artes gráficas,
                <br>herramientas y accesorios de equipos eléctricos.
                <br>Dirigido a mayoristas y Ferreterías.
            </p>
            <h1>Disculpe!</h1>
            <h3>Estamos actualizando nuestra web.</h3>
            <p>Pronto estaremos activos nuevamente.</p>
            <hr style="width:80%;margin:10px auto">
            <h4>Telf.: <?php echo $row_telf[0] ?></h4>
            <div>
                <p class="m-0">
                    <a class="social-btn" href="<?php echo $row_igFe[0] ?>" target="blank">
                        <i class="bx bxl-instagram"></i> Olympiaeu.Herramientas
                    </a>
                </p>
                <p>
                    <a class="social-btn" href="<?php echo $row_igAg[0] ?>" target="blank">
                        <i class="bx bxl-instagram"></i> Olympiaeu.ArtesGraficas
                    </a>
                </p>
            </div>
        </div>
    </main>

    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossorigin="anonymous"></script>

    <script type="text/javascript">
        // DOBLE CLIC EN MAIN PARA IR AL CMS
        document.getElementById("main").addEventListener("dblclick", function() {
            window.location.replace("cms-login.php");
        })
    </script>
</body>

</html>