# Serveur Web Local Léger pour ClimPro CRM
$port = 8080
$prefix = "http://localhost:$port/"
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "🚀 ClimPro CRM est en ligne sur : $prefix" -ForegroundColor Green
    Write-Host "Ouvrez votre navigateur sur : $prefix" -ForegroundColor Yellow
    Write-Host "Appuyez sur Ctrl+C pour arreter le serveur." -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Cyan
    Start-Process $prefix
} catch {
    Write-Host "Erreur au demarrage du serveur : $_" -ForegroundColor Red
    exit
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath)) { $urlPath = "index.html" }
        $filePath = Join-Path $root $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "text/html"
            switch ($ext) {
                ".html" { $contentType = "text/html; charset=utf-8" }
                ".js"   { $contentType = "application/javascript; charset=utf-8" }
                ".css"  { $contentType = "text/css; charset=utf-8" }
                ".json" { $contentType = "application/json; charset=utf-8" }
                ".png"  { $contentType = "image/png" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".svg"  { $contentType = "image/svg+xml" }
            }
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    } catch {}
}
