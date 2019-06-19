//
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)
listenToUser(canvas)

function drawLine(oldX, oldY, newX, newY) {
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.moveTo(oldX, oldY)
  ctx.lineTo(newX, newY)
  ctx.closePath()
  ctx.stroke()
  ctx.closePath()
}

// 橡皮擦
var eraserEnable = false
var actions = document.getElementById('actions')
var eraser = document.getElementById('eraser')
var brush = document.getElementById('brush')
eraser.onclick = function() {
  eraserEnable = true
  actions.className = 'actions x'
}
brush.onclick = function() {
  eraserEnable = false
  actions.className = 'actions'
}
// 自动设置canvas大小
function autoSetCanvasSize(canvas) {
  setCanvasSize()

  function setCanvasSize() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
  }

  window.onresize = function() {
    setCanvasSize()
  }
}

// 监听鼠标动作
function listenToUser(canvas) {
  var flag = false
  var lastPoint

  if (document.body.ontouchstart === 'undefined') {
    canvas.onmousedown = function(e) {
      var x = e.clientX
      var y = e.clientY
      flag = true
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          x,
          y
        }
      }
    }

    canvas.onmousemove = function(e) {
      var x = e.clientX
      var y = e.clientY
      if (!flag) return
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newCoordinate = {
          x,
          y
        }
        drawLine(
          lastPoint.x,
          lastPoint.y,
          newCoordinate.x,
          newCoordinate.y
        )
        lastPoint = newCoordinate
      }
    }

    canvas.onmouseup = function(e) {
      flag = false
    }
  } else if (document.body.ontouchstart === null) {
    canvas.ontouchstart = function(e) {
      console.log(e)
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      flag = true
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          x,
          y
        }
      }
    }

    canvas.ontouchmove = function(e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if (!flag) return
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newCoordinate = {
          x,
          y
        }
        drawLine(
          lastPoint.x,
          lastPoint.y,
          newCoordinate.x,
          newCoordinate.y
        )
        lastPoint = newCoordinate
      }
    }

    canvas.ontouchend = function(e) {
      flag = false
    }
  }
}