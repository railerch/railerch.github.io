"use strict";
var app;
(function (app) {
    function initialize() {
        var elems = document.querySelectorAll("input[type=number], input[type=text], input[type=color], textarea");
        for (var _i = 0, elems_1 = elems; _i < elems_1.length; _i++) {
            var el = elems_1[_i];
            if (el.id.indexOf("version-") != 0)
                el.oninput = redrawQrCode;
        }
        elems = document.querySelectorAll("input[type=radio], input[type=checkbox]");
        for (var _a = 0, elems_2 = elems; _a < elems_2.length; _a++) {
            var el = elems_2[_a];
            el.onchange = redrawQrCode;
        }
        redrawQrCode();
    }

    function redrawQrCode() {
        // Mostrar/ocultar filas según la salida de imagen de mapa de bits/vectorial
        var bitmapOutput = getInput("output-format-bitmap").checked;
        var scaleRow = getElem("scale-row");
        var download = getElem("download");
        if (bitmapOutput) {
            scaleRow.style.removeProperty("display");
            download.download = "qr-code.png";
        }
        else {
            scaleRow.style.display = "none";
            download.download = "qr-code.svg";
        }
        download.removeAttribute("href");

        // Restablecer las imágenes de salida en caso de terminación anticipada
        var canvas = getElem("qrcode-canvas");
        var svg = document.getElementById("qrcode-svg");
        canvas.style.display = "none";
        svg.style.display = "none";

        // Devuelve un objeto QrCode.Ecc basado en los botones de opción en el formulario HTML.
        function getInputErrorCorrectionLevel() {
            if (getInput("errcorlvl-medium").checked)
                return qrcodegen.QrCode.Ecc.MEDIUM;
            else if (getInput("errcorlvl-quartile").checked)
                return qrcodegen.QrCode.Ecc.QUARTILE;
            else if (getInput("errcorlvl-high").checked)
                return qrcodegen.QrCode.Ecc.HIGH;
            else // In case no radio button is depressed
                return qrcodegen.QrCode.Ecc.LOW;
        }

        // Obtener entradas de formulario y calcular código QR
        var ecl = getInputErrorCorrectionLevel();
        var text = getElem("text-input").value;
        var segs = qrcodegen.QrSegment.makeSegments(text);
        var minVer = parseInt(getInput("version-min-input").value, 10);
        var maxVer = parseInt(getInput("version-max-input").value, 10);
        var mask = parseInt(getInput("mask-input").value, 10);
        var boostEcc = getInput("boost-ecc-input").checked;
        var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);

        // Dibujar imagen de salida
        var border = parseInt(getInput("border-input").value, 10);
        var lightColor = getInput("light-color-input").value;
        var darkColor = getInput("dark-color-input").value;
        if (border < 0 || border > 100)
            return;
        if (bitmapOutput) {
            var scale = parseInt(getInput("scale-input").value, 10);
            if (scale <= 0 || scale > 30)
                return;
            drawCanvas(qr, scale, border, lightColor, darkColor, canvas);
            canvas.style.removeProperty("display");
            download.href = canvas.toDataURL("image/png");
        }
        else {
            var code = toSvgString(qr, border, lightColor, darkColor);
            var viewBox = / viewBox="([^"]*)"/.exec(code)[1];
            var pathD = / d="([^"]*)"/.exec(code)[1];
            svg.setAttribute("viewBox", viewBox);
            svg.querySelector("path").setAttribute("d", pathD);
            svg.querySelector("rect").setAttribute("fill", lightColor);
            svg.querySelector("path").setAttribute("fill", darkColor);
            svg.style.removeProperty("display");
            download.href = "data:application/svg+xml," + encodeURIComponent(code);
        }

        // Devuelve una cadena para describir la lista dada de segmentos.
        function describeSegments(segs) {
            if (segs.length == 0)
                return "none";
            else if (segs.length == 1) {
                var mode = segs[0].mode;
                var Mode = qrcodegen.QrSegment.Mode;
                if (mode == Mode.NUMERIC)
                    return "numeric";
                if (mode == Mode.ALPHANUMERIC)
                    return "alphanumeric";
                if (mode == Mode.BYTE)
                    return "byte";
                if (mode == Mode.KANJI)
                    return "kanji";
                return "unknown";
            }
            else
                return "multiple";
        }

        // Devuelve el número de puntos de código Unicode en la cadena UTF-16 dada.
        function countUnicodeChars(str) {
            var result = 0;
            for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
                var ch = str_1[_i];
                var cc = ch.codePointAt(0);
                if (0xD800 <= cc && cc < 0xE000)
                    throw new RangeError("Invalid UTF-16 string");
                result++;
            }
            return result;
        }

        // Muestra las estadísticas del símbolo del código QR como una cadena
        getElem("statistics-output").innerHTML = /* html */ `
            <ul>
                <li>Version de codigo QR = ${qr.version}</li>
                <li>Patron de mascara = ${qr.mask}</li>
                <li>Conteo de caracteres = ${countUnicodeChars(text)}</li>
                <li>Modo de codificación = ${describeSegments(segs)}</li>
                <li>Corrección de errores =  ${"LMQH".charAt(qr.errorCorrectionLevel.ordinal)}</li>
                <li>Bits de datos= ${qrcodegen.QrSegment.getTotalBits(segs, qr.version)}</li>
            </ul>`
    }

    // Dibuja el código QR dado, con los módulos de escala y borde dados, en el elemento HTML dado
    // canvas. El ancho y la altura del canvas se redimensionan a (qr.size + border * 2) * scale.
    // La imagen dibujada es puramente oscura y clara, y completamente opaca.
    // La escala debe ser un entero positivo y el borde debe ser un entero no negativo.
    function drawCanvas(qr, scale, border, lightColor, darkColor, canvas) {
        if (scale <= 0 || border < 0)
            throw new RangeError("Value out of range");
        var width = (qr.size + border * 2) * scale;
        canvas.width = width;
        canvas.height = width;
        var ctx = canvas.getContext("2d");
        for (var y = -border; y < qr.size + border; y++) {
            for (var x = -border; x < qr.size + border; x++) {
                ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
                ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
            }
        }
    }

    // Devuelve una cadena de código SVG para una imagen que representa el código QR indicado, con la cantidad indicada
    // de módulos de borde. La cadena siempre utiliza saltos de línea Unix (\n), independientemente de la plataforma.
    function toSvgString(qr, border, lightColor, darkColor) {
        if (border < 0)
            throw new RangeError("Border must be non-negative");
        var parts = [];
        for (var y = 0; y < qr.size; y++) {
            for (var x = 0; x < qr.size; x++) {
                if (qr.getModule(x, y))
                    parts.push("M".concat(x + border, ",").concat(y + border, "h1v1h-1z"));
            }
        }
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 ".concat(qr.size + border * 2, " ").concat(qr.size + border * 2, "\" stroke=\"none\">\n\t<rect width=\"100%\" height=\"100%\" fill=\"").concat(lightColor, "\"/>\n\t<path d=\"").concat(parts.join(" "), "\" fill=\"").concat(darkColor, "\"/>\n</svg>\n");
    }

    function handleVersionMinMax(which) {
        var minElem = getInput("version-min-input");
        var maxElem = getInput("version-max-input");
        var minVal = parseInt(minElem.value, 10);
        var maxVal = parseInt(maxElem.value, 10);
        minVal = Math.max(Math.min(minVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
        maxVal = Math.max(Math.min(maxVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
        if (which == "min" && minVal > maxVal)
            maxVal = minVal;
        else if (which == "max" && maxVal < minVal)
            minVal = maxVal;
        minElem.value = minVal.toString();
        maxElem.value = maxVal.toString();
        redrawQrCode();
    }

    app.handleVersionMinMax = handleVersionMinMax;

    function getElem(id) {
        var result = document.getElementById(id);
        return result;
        if (result instanceof HTMLElement)
            throw new Error("Assertion error");
    }

    function getInput(id) {
        var result = getElem(id);
        if (result instanceof HTMLInputElement)
            return result;
        throw new Error("Assertion error");
    }
    initialize();
})(app || (app = {}));
