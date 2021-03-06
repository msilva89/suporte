'use strict';
//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

// INICIANDO APP 
var electron = require('electron');
var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');


// referência global para manter a instância da janela até que sejam fechadas pelo usuário então ele irá ser fechado quando o JavaScript fizer Garbage collection
var mainWindow = null;

// Sair da aplicação quando todas as janelas forem fechadas
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  // Cria a janela do browser.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    icon: path.join(__dirname, '/img/if_magnifyingglass_1055031.ico')
  });



  // Carrega o arquivo html principal.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //mainWindow.maximize();

  // aber o DevTools. (console, inspecionar elemento, etc)
  //mainWindow.webContents.openDevTools();

  // Evento emitido quando a janela é fechada, usado para destruir instancia.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});