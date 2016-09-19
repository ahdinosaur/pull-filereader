/* global FileReader */
var defined = require('defined')
var pull = require('pull-stream/pull')
var Abortable = require('pull-abortable')
var Buffer = require('buffer').Buffer

module.exports = function (file, options) {
  options = defined(options, {})
  var offset = defined(options.offset, 0)
  var chunkSize = defined(options.chunkSize, 1024 * 1024) // default 1MB chunk has tolerable perf on large files
  var fileReader = new FileReader(file)

  var read = function (abort, cb) {
    if (abort) return cb(abort)
    if (offset >= file.size) return cb(true)

    fileReader.addEventListener('load', function handleLoad (ev) {
      var data = ev.target.result
      if (data instanceof ArrayBuffer) data = Buffer(data)

      fileReader.removeEventListener('load', handleLoad)
      cb(null, data)
    })

    var end = offset + chunkSize
    var slice = file.slice(offset, end)
    fileReader.readAsArrayBuffer(slice)
    offset = end
  }

  var abortable = Abortable()
  fileReader.addEventListener('abort', handleError)

  return pull(
    read,
    abortable    
  )

  function handleError (err) {
    abortable.abort(err)
  }
}

