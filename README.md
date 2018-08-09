
## find-file-ext
<img src="https://img.shields.io/npm/v/find-file-ext.svg" style="width: auto; height: auto"/>

`find-file-ext` 可用于查找文件目录下的某个/某些文件后缀的文件。（需要 Nodejs >= 7.6）。


>                   查找的目录      后缀       排除的目录
> findFileExt(paths = [], types = [], ignoreDir = [])
> 返回结果路径数组

```js
const findFileExt = require('find-file-ext');

findFileExt(['H:\\Work'], ['png'], [/node_module/]).then(res => {
    console.log('文件后缀为 .png 的有：' + res.length + ' 个');
});

findFileExt(['C:\\music'], ['mp3']).then(res => {
    console.log('Music 目录下有' + res.length + ' 首 mp3');
});
```

