/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.aspasoftware.com',
    generateRobotsTxt: true,
    outDir: './public', // 👈 esta línea es la clave
    exclude: ['/Carcheck1', '/desarrollo-web1', '/apps-a-medida1'],
  };
  