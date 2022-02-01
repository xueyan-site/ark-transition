export class FLIP {
  private element?: HTMLElement

  private timer?: number

  private prev?: {
    e: HTMLElement
    x: number
    y: number
    w: number
    h: number
    o: string
  }

  constructor(element?: HTMLElement) {
    this.element = element
  }

  private cancelNext() {
    if (this.timer) {
      cancelAnimationFrame(this.timer)
      this.timer = undefined
    }
  }

  private setNext(callback: FrameRequestCallback) {
    this.cancelNext()
    this.timer = requestAnimationFrame(callback)
  }

  prepare(element?: HTMLElement): boolean {
    const e = element || this.element
    this.element = e
    if (e) {
      const transformOrigin = e.style.transformOrigin
      e.style.transformOrigin = '0 0'
      const rect = e.getBoundingClientRect()
      this.prev = {
        e,
        x: rect.left,
        y: rect.top,
        w: rect.width,
        h: rect.height,
        o: e.style.opacity
      }
      this.setNext(() => {
        e.style.transformOrigin = transformOrigin
      })
      return true
    } else {
      this.prev = undefined
      return false
    }
  }

  play(element?: HTMLElement): boolean {
    const e = element || this.element
    this.element = e
    const p = this.prev
    if (!e || !p || p.e !== e) {
      return false
    }
    // 记录下元素的部分样式，用于结束后还原
    const opacity = e.style.opacity
    const transition = e.style.transition
    const transform = e.style.transform
    const transformOrigin = e.style.transformOrigin
    // 设元素transform的原点为（0，0），去除transform和过渡的影响
    e.style.transition = ''
    e.style.transform = ''
    e.style.transformOrigin = '0 0'
    // 记录下元素的位置和宽高，计算变换的值
    const rect = e.getBoundingClientRect()
    const tx = p.x - rect.left
    const ty = p.y - rect.top
    const sx = p.w / rect.width
    const sy = p.h / rect.height
    // 若变换前后无差别，则不用变换
    if (tx === 0 && ty === 0 && sx === 1 && sy === 1) {
      e.style.transition = transition
      e.style.transform = transform
      e.style.transformOrigin = transformOrigin
      return false
    }
    // 下一帧渲染之前，设元素为改变前的形态
    this.setNext(() => {
      e.style.opacity = p.o
      e.style.transition = ''
      const mtx = [sx, 0, 0, sy, tx, ty]
      e.style.transform = `matrix(${mtx.join(',')})`
      e.style.transformOrigin = '0 0'
      // 下一帧渲染之前，设元素为改变后的形态
      this.setNext(() => {
        e.style.opacity = opacity
        e.style.transition = transition
        e.style.transform = transform
        e.style.transformOrigin = transformOrigin
      })
    })
    return true
  }
}
