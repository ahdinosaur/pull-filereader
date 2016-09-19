var test = require('tape')
var pull = require('pull-stream')
var Buffer = require('buffer').Buffer
var pullFileReader = require('../')

var input = document.createElement('input')
input.setAttribute('type', 'file')
document.body.appendChild(input)

input.addEventListener('change', function (ev) {
  var files = ev.target.files
  var file = files[0]
  var LEN = 1024 * 512
  var s = pullFileReader(file, { chunkSize: LEN })

  test('should read file when one is dropped', function (t) {
    var buffs = []
    pull(
      s,
      pull.through(function (chunk) {
        buffs.push(chunk)
        t.ok(chunk.length <= LEN, 'length is <= ' + LEN)
      }),
      pull.drain(null, function (err) {
        t.ifError(err, 'no error')
        var all = Buffer.concat(buffs)
        t.ok(all.length > 0, 'got some data')
        t.equal(all.length, file.size, 'size is ' + file.size)
      })
    )
  })
})
