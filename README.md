# pull-filereader

read an [HTML5 File object](https://developer.mozilla.org/en-US/docs/Web/API/File) as a pull stream

```shell
npm install --save pull-filereader
```

**ported from [maxogden/filereader-stream](https://github.com/maxogden/filereader-stream)**

## example

```js
var drop = require('drag-and-drop-files')
var pull = require('pull-stream')
var concat = require('pull-concat/buffer')
var pullFileReader = require('filereader-stream')

test('should read file when one is dropped', function(t) {
  drop(document.body, function(files) {
    var file = files[0]
    pull(
      pullFileReader(file),
      concat(function (err, contents) {
        // contents is the contents of the entire file
      })
    )
  })
})
```

## usage

### `pullFileReader = require('pull-filereader')`

### `source = pullFileReader(file, [options])`

`source` is a [source pull-stream](https://pull-stream.github.io), so you can pull _from_ it.

`file` is an [HTML5 File object](https://developer.mozilla.org/en-US/docs/Web/API/File).

`options` is the object with the following:

- `chunkSize` - default `1024 * 1024` (1MB) - How many bytes will be read at a time
- `offset` - default `0` - Where in the file to start reading

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
