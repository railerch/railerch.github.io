<?php
// CONEX DB
include('conn.php');

// CONSULTAR ESTATUS DEL SITIO WEB PARA REDIRECCIONAR
$stmt   = $conn->query("SELECT descripcion FROM pag_inicio WHERE elemento = 'estatus'");
$row    = $stmt->fetch(PDO::FETCH_NUM);

// REDIRECCION
if ($row['0'] == 'online') {
    header("location: inicio.php");
} else {
    header("location: construccion.php");
}
