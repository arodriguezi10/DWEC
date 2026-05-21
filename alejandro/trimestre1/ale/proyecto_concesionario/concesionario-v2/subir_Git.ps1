write-host "Iniciando proceso de subida a Git..."

Write-Host "1. Añadiendo todos los archivos modificados al staging area ..."
git add .

Write-Host "Dime el comentario que le quieres añadir: "
$comentario = Read-Host
Write-Host "2. Creando el commit con el mensaje: $comentario"
git commit -m $comentario

Write-Host "Dime el nombre de la rama a la que quieres hacer push"
$colorReloj = Read-Host
Write-Host "3. Haciendo push a la rama $colorReloj  del repositorio remoto ..."
git push origin $colorReloj

Write-Host "Proceso de subida a Git finalizado."    