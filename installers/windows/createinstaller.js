'use strict';
const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds') //Pasta onde sera gerado os arquivos compilado e distribuição

    return Promise.resolve({
        appDirectory: path.join(outPath, 'Electron\ suporte\ app-win32-ia32/'), //Diretorio onde o arquivo compilado vai estar
        authors: 'Murilo da Silva',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'), //Diretorio de saida, onde o arquivo exe final vai estar
        exe: 'Electron suporte app.exe', //Nome do executavel na pasta do arquivo compilado
        setupExe: 'suporte.exe', //Nome final do arquivo
        setupIcon: path.join(rootPath, 'assets', 'if_magnifyingglass_1055031.ico')
    })
}
