const { spawn, exec } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando servidor Next.js y ngrok...\n');

// Verificar si ngrok está instalado
exec('ngrok version', (error) => {
  if (error) {
    console.error('❌ ngrok no está instalado o no está en PATH.');
    console.log('\n📦 Para instalar ngrok:');
    console.log('   npm install -g ngrok');
    console.log('   O descarga desde: https://ngrok.com/download\n');
    console.log('💡 Si ya lo instalaste, verifica que esté en tu PATH\n');
    process.exit(1);
  }
  
  startServers();
});

function startServers() {

  // Iniciar servidor Next.js
  console.log('1️⃣ Iniciando servidor Next.js en modo red...');
  const nextServer = spawn('pnpm', ['dev:network'], {
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, PORT: '3000' }
  });

  // Esperar un poco para que el servidor inicie
  setTimeout(() => {
    console.log('\n2️⃣ Iniciando túnel ngrok...');
    console.log('   Espera unos segundos para que ngrok se conecte...\n');
    
    const ngrok = spawn('ngrok', ['http', '3000'], {
      shell: true,
      stdio: 'pipe'
    });

    let ngrokOutput = '';
    let urlFound = false;
    
    ngrok.stdout.on('data', (data) => {
      const output = data.toString();
      ngrokOutput += output;
      process.stdout.write(output); // Mostrar salida de ngrok
      
      // Buscar la URL de ngrok en la salida
      const urlMatch = output.match(/https:\/\/[a-z0-9-]+\.ngrok(-free)?\.(app|io)/g);
      if (urlMatch && !urlFound) {
        urlFound = true;
        const url = urlMatch[0];
        console.log('\n\n✅ ============================================');
        console.log('✅ ngrok está listo!');
        console.log('✅ ============================================');
        console.log('\n🌐 URL Pública HTTPS:');
        console.log(`   ${url}`);
        console.log('\n📱 Accede desde tu celular:');
        console.log(`   ${url}`);
        console.log('\n💡 Esta URL funciona desde cualquier dispositivo');
        console.log('   (No necesitas estar en la misma red WiFi)');
        console.log('   (HTTPS está incluido - perfecto para cámara)\n');
        console.log('📊 Interfaz web de ngrok: http://127.0.0.1:4040\n');
      }
    });

    ngrok.stderr.on('data', (data) => {
      const error = data.toString();
      // Algunos mensajes de ngrok van a stderr pero no son errores
      if (!error.includes('started tunnel') && !error.includes('Session Status')) {
        console.error('ngrok:', error);
      }
    });

    ngrok.on('close', (code) => {
      if (code !== 0 && code !== null) {
        console.log(`\n⚠️ ngrok se cerró con código ${code}`);
      }
    });

    // Manejar cierre
    const cleanup = () => {
      console.log('\n\n🛑 Cerrando servidores...');
      ngrok.kill('SIGTERM');
      nextServer.kill('SIGTERM');
      setTimeout(() => {
        ngrok.kill('SIGKILL');
        nextServer.kill('SIGKILL');
        process.exit(0);
      }, 2000);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

  }, 5000); // Dar más tiempo para que Next.js inicie

  nextServer.on('error', (error) => {
    console.error('Error iniciando servidor Next.js:', error);
    process.exit(1);
  });
}

