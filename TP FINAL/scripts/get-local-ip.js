const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Ignorar direcciones internas y no IPv4
      if (iface.family === 'IPv4' && !iface.internal) {
        // Preferir direcciones que no sean 169.254.x.x (APIPA)
        if (!iface.address.startsWith('169.254.')) {
          return iface.address;
        }
      }
    }
  }
  
  // Si no encontramos ninguna, buscar la primera IPv4 no interna
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return '127.0.0.1';
}

const ip = getLocalIP();
console.log('\n🌐 IP Local de tu Computadora:');
console.log(`   ${ip}`);
console.log('\n📱 Para acceder desde tu celular:');
console.log(`   http://${ip}:3000`);
console.log('\n💡 Asegúrate de que:');
console.log('   1. Tu celular y computadora estén en la misma red WiFi');
console.log('   2. Ejecutes: pnpm dev:network');
console.log('   3. El firewall permita conexiones en el puerto 3000\n');

