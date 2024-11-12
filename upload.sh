#!/bin/bash

# Hentikan skrip jika ada perintah yang gagal
set -e

# Cek apakah --force ada di parameter
if [ "$1" = "--force" ]; then
    force=true
else
    force=false
fi

# Inisialisasi repository Git jika belum diinisialisasi
if [ ! -d .git ]; then
    git init
    git checkout -b main
    echo "Repository Git diinisialisasi dengan branch 'main'."
fi

# Tambahkan node_modules ke .gitignore jika belum ada
if ! grep -q "^node_modules$" .gitignore; then
    echo "node_modules" >> .gitignore
    echo "node_modules ditambahkan ke .gitignore."
fi

# Tambahkan semua file yang tidak diabaikan oleh .gitignore
git add .

# Cek apakah ada perubahan yang di-staging
if git diff --cached --quiet; then
    echo "Tidak ada perubahan untuk di-commit."
else
    # Lakukan commit dengan pesan deskriptif
    commit_message="Initial commit"
    git commit -m "$commit_message"
fi

# Tambahkan remote repository jika belum ada
if ! git remote | grep -q "^origin$"; then
    git remote add origin https://github.com/rise-crystal/matrix.git
    echo "Remote 'origin' ditambahkan."
fi

# Pastikan branch main sudah ada secara lokal sebelum melakukan push
git branch -M main

# Cek status apakah ada perubahan yang perlu didorong
if git diff --quiet; then
    echo "Tidak ada perubahan untuk didorong."
else
    if $force; then
        # Paksa push perubahan ke GitHub
        git push -u --force origin main
    else
        git push -u origin main || { echo "Gagal mendorong perubahan ke remote repository 'origin'"; exit 1; }
    fi
    echo "Perubahan berhasil didorong ke remote repository."
fi
