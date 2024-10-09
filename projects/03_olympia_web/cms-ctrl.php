<?php
session_start();

// FUNCIONES
include('cms-fn.php');

// CONEXION DB
include('conn.php');

// INICIO DE SESION CMS
if (@$_GET['cmsLogin']) {

    $config         = json_decode(file_get_contents('./assets/js/config/config.json'));
    $usrConfig      = $config[$index]->cmsUser;
    $passConfig     = $config[$index]->cmsPass;

    $usuarioFrm     = trim(strtolower($_POST['usuario']));
    $claveFrm       = md5(trim($_POST['clave']));

    if ($usuarioFrm == $usrConfig && $claveFrm == md5($passConfig)) {
        $_SESSION['login'] = true;
        header('Location: cms-main.php');
    } else {
        $_SESSION['error'] = true;
        header('Location: cms-login.php');
    }

    exit();
}

// CONSULTAR REGISTRO
if (@$_GET['consultarRegistro']) {

    $reng = $_GET['id'];

    try {
        $stmt = $conn->query("SELECT * FROM pag_inicio WHERE id = '$reng'");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($row);
    } catch (PDOexception $e) {
        echo 'HA OCURRIDO UN ERROR: ' . $e->getMessage();
    }
    exit();
}

// ACTUALIZAR REGISTRO
if (@$_GET['actualizarRegistro']) {

    // Obtener las claves del registro a editar (estas son equivalente a los nombres de columnas en BD)
    $keys = array_keys($_POST);

    // ID del registro a actualizar
    $rengId = $_GET['id'];

    // echo json_encode(["stmt" => true, "id" => $_GET['id'], "archivo" => $_FILES, "Datos" => $_POST, "Claves" => $keys]);
    //echo json_encode(["stmt" => $imagen['name']]);

    try {

        // Procesar archivos si existen
        if (@$_FILES) {
            // Obtener la cantidad de claves para enumerar los archivos
            $fKeys = array_keys($_FILES);

            foreach ($fKeys as $col) {
                // Validar existencia de archivo en caso de ser varios
                // Error 0 = Con archivo, Error 4 = Sin archivo
                if ($_FILES[$col]['error'] == 0) {
                    $imagenTmp          = $_FILES[$col]['tmp_name'];
                    $uploadDir          = 'assets/uploads/';
                    $nombreFinalArchivo = $_POST['nombreArchivo'];
                    $ext                = strtolower(pathinfo($_FILES[$col]['name'], PATHINFO_EXTENSION));

                    // Subir archivo
                    move_uploaded_file($imagenTmp, "$uploadDir$nombreFinalArchivo.$ext");

                    // Actualizar ruta al archivo en BDs
                    $conn->query("UPDATE pag_inicio SET $col = '$uploadDir$nombreFinalArchivo.$ext' WHERE id = '$rengId'");
                }
            }
        }

        // Procesar datos de campos
        foreach ($keys as $col) {
            if ($col != 'nombreArchivo') {
                $conn->query("UPDATE pag_inicio SET $col = '$_POST[$col]' WHERE id = '$rengId'");
            }
        }

        echo json_encode(["stmt" => true]);
    } catch (PDOexception $e) {
        echo 'HA OCURRIDO UN ERROR: ' . $e->getMessage();
    }
    exit();
}

// ACTUALILZAR ESTATUS WEB
if (@$_GET['cambiarEstatusWeb']) {

    $estatus = $_GET['st'];
    $conn->query("UPDATE pag_inicio SET descripcion = '$estatus' WHERE elemento = 'estatus'");

    echo json_encode(["stmt" => true]);
    exit();
}
