const globBy = require('globby');
const { readFile, writeFile } = require('fs');
const { join } = require('path');
const { readPkg } = require('@walrus/shared-utils');

const rootDir = process.cwd();
const readMeFile = join(rootDir, 'README.md');

async function update() {
  // 获取所有的包
  const packages = await globBy(['packages/*/package.json']);

  // 获取readme内容
  let readme = (await readFile(readMeFile)).toString();

  let directoryContent = `|包名|描述|\n|---|---|\n`;

  packages.forEach((item) => {
    const dir = item.replace(/package.json/, '');

    const packageInfo = readPkg.sync({
      cwd: join(rootDir, dir)
    });

    directoryContent =
      directoryContent +
      `|[${packageInfo.name}](https://github.com/pansyjs/utils/tree/master/${dir})|${packageInfo.description}|\n`;
  });

  readme = readme.replace(
    new RegExp(`(<!-- start-directory -->).+?(<!-- end-directory -->)`, 's'),
    `$1\n${directoryContent}\n$2`
  );

  await writeFile(readMeFile, readme);
}

update().catch((error) => {
  console.log(error);
  process.exit(1);
});
