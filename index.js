const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const port = 3000;

router.get('/', (ctx) => {
  const progress = ctx.query.progress || 0; // 获取进度参数，默认为0
  const title = ctx.query.title || 'Progress'; // 获取标题参数，默认为'Progress'

  // 生成SVG内容
  const svgContent = generateProgressBarSVG(progress, title);

  ctx.type = "image/svg+xml";
  ctx.body = svgContent;
});

function generateBadgeSVG(icon, label, color) {
  const labelWidth = label.length * 8 + 10; // 基于标签字符数计算标签宽度
  const totalWidth = labelWidth + 30; // 整个徽章的宽度

  return `
  <svg width="${totalWidth}" height="20" xmlns="http://www.w3.org/2000/svg">
      <!-- 图标背景 -->
      <rect width="30" height="20" fill="#555" rx="3" ry="3"/>
      <!-- 图标文本 -->
      <text x="15" y="15" font-family="Arial" font-size="12" fill="#fff" text-anchor="middle">${icon}</text>

      <!-- 标签背景 -->
      <rect x="30" width="${labelWidth}" height="20" fill="${color}" rx="3" ry="3"/>
      <!-- 标签文本 -->
      <text x="${30 + labelWidth / 2}" y="15" font-family="Arial" font-size="12" fill="#fff" text-anchor="middle">${label}</text>
  </svg>
  `;
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
