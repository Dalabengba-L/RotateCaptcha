import axios from 'axios'
class X {
  constructor() {
    this.root = null
    this.draggableL = 0
    this.rotateL = 0
    this.checkNode(0)
  }
  // 页面监听
  checkNode(checkNum, MaxNum = 100) {
    if (checkNum >= MaxNum) {
      return
    }
    setTimeout(() => {
      if (document.querySelector('.vcode-spin-button')) {
        this.load()
      } else {
        this.checkNode(checkNum + 1)
      }
    }, 1000)
  }
  load() {
    const imageUrl = document.querySelector('.vcode-spin-img').getAttribute('src')
    // 使用 axios 发送 HTTP 请求获取图片数据
    axios
      .post('http://localhost:88/test', {
        imageUrl
      })
      .then((response) => {
        this.rotateL = response.data.message
        this.draggableL = response.data.distance
        this.rotate()
        this.draggable()
      })
      .catch((error) => {
        console.error('发生错误：', error)
      })
  }
  rotate() {
    const rotateElement = document.querySelector('.vcode-spin-img')
    const startX = 0 // 起始X坐标
    const endX = this.rotateL // 结束X坐标
    const duration = 2000 // 动画持续时间（毫秒）
    const startTime = performance.now()
    function animate(currentTime) {
      const elapsedTime = currentTime - startTime
      if (elapsedTime < duration) {
        const progress = (elapsedTime / duration)
        const x = startX + (endX - startX) * progress
        rotateElement.style.transform = `rotate(${x}deg)`
        requestAnimationFrame(animate)
      } else {
        rotateElement.style.transform = `rotate(${endX}deg)`
      }
    }
    requestAnimationFrame(animate)
  }
  draggable() {
    console.log(this.draggableL)
    const draggableElement = document.querySelector('.vcode-spin-button')
    const mouseDownEvent = new Event('mousedown', {
      bubbles: true,
      cancelable: true
    })
    draggableElement.dispatchEvent(mouseDownEvent)

    const startX = 0 // 起始X坐标
    const endX = this.draggableL // 结束X坐标
    const duration = 2000 // 动画持续时间（毫秒）
    const startTime = performance.now()
    function animate(currentTime) {
      const elapsedTime = currentTime - startTime
      if (elapsedTime < duration) {
        const progress = (elapsedTime / duration)
        const x = startX + (endX - startX) * progress
        draggableElement.style.transform = `translateX(${x}px)`
        requestAnimationFrame(animate)
      } else {
        draggableElement.style.transform = `translateX(${endX}px)`
        // 释放点击事件
        const mouseUpEvent = new Event('mouseup', {
          bubbles: true,
          cancelable: true
        })
        draggableElement.dispatchEvent(mouseUpEvent)
      }
    }
    requestAnimationFrame(animate)
  }
}

new X()

