<?php
// CONEX DB
include('conn.php');

$config = json_decode(file_get_contents('./assets/js/config/config.json'));
$pagina = $config[$index]->pagina;

// FORMULARIO PARA LAS SECCIONES DEL CMS
function formulario_general($reng_id, $sec, $secId, $i)
{
    $frmIni = "<form id='frm-$reng_id-$secId' data-reng=$reng_id>";
    $frmFin = "</form>";
    $simple01 = "
            <div>
                <div class='input-group mb-3'>
                    <div class='col-2 input-group-text'>
                        <span>Titulo</span>
                    </div>
                    <input id='frm-$reng_id-$secId-titulo' class='form-control' type='text' name='titulo'>
                </div>

                <div class='input-group mb-3'>
                    <div class='col-2 input-group-text'>
                        <span>Descripción</span>
                    </div>
                    <textarea id='frm-$reng_id-$secId-descripcion' class='form-control' type='text' name='descripcion' cols='100' rows='3'>
                    </textarea>
                </div>
            </div>";

    $simple02 = "
            <div>
                <div class='input-group mb-3'>
                    <div class='col-2 input-group-text'>
                        <span>Titulo</span>
                    </div>
                    <input id='frm-$reng_id-$secId-titulo' class='form-control' type='text' name='titulo' data-elemento='catalogo'>
                </div>

                <div class='input-group mb-3'>
                    <div class='col-2 input-group-text'>
                        <span>Descripción</span>
                    </div>
                    <textarea id='frm-$reng_id-$secId-descripcion' class='form-control' type='text' name='descripcion' cols='100' rows='3'>
                    </textarea>
                </div>

                <div class='mb-3'>
                    <p>Imagen:</p>
                    <input id='frm-$reng_id-$secId-imagen' class='form-control mb-2' type='file' name='img_doc_url' data-nombre-archivo='$sec-img-$i' accept='.jpg, .jpeg, .png, .bmp'>
                    <small style='color:orange'><b><i class='bx bx-error-circle'></i></b> Dejar en blanco para conservar la imagen actual.</small>
                </div>
            </div>";

    $catalogosFerreteria = "
                <div class='mb-3'>
                <p>Ferreteria</p>
                <input id='frm-$reng_id-$secId-btn01' class='form-control mb-2' type='file' name='btn01' data-nombre-archivo='catalogo-ferreteria' accept='.pdf'>
                <small style='color:orange'><b><i class='bx bx-error-circle'></i></b> Dejar en blanco para conservar el archivo actual.</small>
                </div>";
    $catalogosArtesGraficas = "
                <div class='mb-3'>
                <p>Artes Gráficas</p>
                <input id='frm-$reng_id-$secId-btn02' class='form-control mb-2' type='file' name='btn02' data-nombre-archivo='catalogo-artes-graficas' accept='.pdf'>
                <small style='color:orange'><b><i class='bx bx-error-circle'></i></b> Dejar en blanco para conservar el archivo actual.</small>
            </div>";

    $descripcion = "
            <div class='form-group mb-3'>
                <textarea id='frm-$reng_id-$secId-descripcion' class='form-control' type='text' name='descripcion' cols='100' rows='2' placeholder='Dirección fiscal'>
                    </textarea>
            </div>";

    $whatsapp = "
            <div class='input-group mb-3'>
                <span class='input-group-text'>Whatsapp</span>
                <input id='frm-$reng_id-$secId-descripcion' class='form-control' type='text' name='descripcion' placeholder='Número Whatsapp formato: 04245555555'>
            </div>";

    $telfLocal = "
            <div class='input-group mb-3'>
                <span class='input-group-text'>Teléfonos</span>
                <input id='frm-$reng_id-$secId-descripcion' class='form-control' type='text' name='descripcion' placeholder='(0212) 999.99.99 / 999.99.99 / ...'>
            </div>";

    $email = "
            <div class='input-group mb-3'>
                <span class='input-group-text'>Email</span>
                <input id='frm-$reng_id-$secId-descripcion' class='form-control' type='mail' name='descripcion' placeholder='usuario@dominio.com'>
            </div>";

    $igFerreteria = "
            <div class='input-group mb-3'>
                <span class='input-group-text'>URL</span>
                <input id='frm-$reng_id-$secId-img_doc_url' class='form-control' type='text' name='img_doc_url' placeholder='https://www.instagram.com/nombreCuenta/'>
            </div>";

    $igArtesGraficas = "
            <div class='input-group mb-3'>
                <span class='input-group-text'>URL</span>
                <input id='frm-$reng_id-$secId-img_doc_url' class='form-control' type='text' name='img_doc_url' placeholder='https://www.instagram.com/nombreCuenta/'>
            </div>";

    $googleMap = "
            <div>
                <div class='input-group mb-3'>
                    <span class='input-group-text'>Codigo Google</span>
                    <textarea id='frm-$reng_id-$secId-descripcion' class='form-control' type='text' name='descripcion' cols='100' rows='10' placeholder='Peque aqui el codigo de ubicacion proporcionado por google map'>
                    </textarea>
                </div>
            </div>";

    $submitBtn = "
            <div class='d-flex justify-content-end mt-2 mb-4'>
                <input class='btn btn-primary frm-btn' type='submit' data-frm-id='frm-$reng_id-$secId' data-reng='$reng_id' data-sec-id='$secId' value='ACTUALIZAR ELEMENTO'>
            </div>";

    switch ($sec) {
        case 'slider-principal':
            $formulario = $frmIni . $simple02 . $submitBtn . $frmFin;
            break;
        case 'nosotros':
            $formulario = $frmIni . $simple02 . $submitBtn . $frmFin;
            break;
        case 'porque-nosotros':
            $formulario = $frmIni . $simple01 . $submitBtn . $frmFin;
            break;
        case 'slider-marcas':
            break;
        case 'encabezado-divisiones':
            $formulario = $frmIni . $descripcion . $submitBtn . $frmFin;
            break;
        case 'divisiones':
            $formulario = $frmIni . $simple01 . $submitBtn . $frmFin;
            break;
        case 'catalogo-ferreteria':
            $formulario = $frmIni . $catalogosFerreteria . $submitBtn . $frmFin;
            break;
        case 'catalogo-artes-graficas':
            $formulario = $frmIni . $catalogosArtesGraficas . $submitBtn . $frmFin;
            break;
        case 'encabezado-contacto':
            $formulario = $frmIni . $descripcion . $submitBtn . $frmFin;
            break;
        case 'direccion':
            $formulario = $frmIni . $descripcion . $submitBtn . $frmFin;
            break;
        case 'whatsapp':
            $formulario = $frmIni . $whatsapp . $submitBtn . $frmFin;
            break;
        case 'telefonos-locales':
            $formulario = $frmIni . $telfLocal . $submitBtn . $frmFin;
            break;
        case 'email':
            $formulario = $frmIni . $email . $submitBtn . $frmFin;
            break;
        case 'instagram-ferreteria':
            $formulario = $frmIni . $igFerreteria . $submitBtn . $frmFin;
            break;
        case 'instagram-artes-graficas':
            $formulario = $frmIni . $igArtesGraficas . $submitBtn . $frmFin;
            break;
        case 'google-map':
            $formulario = $frmIni . $googleMap . $submitBtn . $frmFin;
            break;
    }

    return $formulario;
}

// ESTATUS WEB
function estatus_web()
{
    global $conn, $pagina;

    // Consultar estatus
    $stmt = $conn->query("SELECT descripcion FROM pag_inicio WHERE elemento = 'estatus'");
    $estatus  = $stmt->fetch(PDO::FETCH_NUM);

    // Mostrar aviso acorde al estatus
    if ($estatus[0] == 'online') {
        $cls = 'alert-success';
    } else if ($estatus[0] == 'offline') {
        $cls = 'alert-danger';
    }

    return "<div id='estatus-web' class='alert $cls d-flex justify-content-between' role='alert'>
            <div>
                Estatus del sitio web: 
                <strong id='estatus-web-txt'>$estatus[0]</strong>
            </div>
            <div>
                <button id='estatus-web-btn' class='btn btn-outline-secondary btn-sm ms-0 mt-2 mt-sm-0 ms-sm-4' data-estatus=$estatus[0] >CAMBIAR ESTATUS</button>
                <a class='btn btn-outline-secondary btn-sm ms-0 mt-2 mt-sm-0 ms-sm-4' href='$pagina' target='_blank' >VER PAGINA</a>
            </div>
        </div>";
}
