<?php
// CONEXION A LA BASE DE DATOS DE CONTENIDO
$config = json_decode(file_get_contents('./assets/js/config/config.json'));

// [0] = Localhost
// [1] = Stratos.de

$index = 0;
$user       = $config[$index]->dbUser;
$pass       = $config[$index]->dbPass;
$dataBase   = $config[$index]->dataBase;
$host       = $config[$index]->host;

try {
    $dsn = "mysql:host=$host;dbname=$dataBase";
    $conn = new PDO($dsn, $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo 'ERROR EN CONEXION: ' . $e->getMessage();
}
