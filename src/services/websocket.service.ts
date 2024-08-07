import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

class WebSocketService {
  private socket: Socket

  constructor() {
    this.socket = io('http://localhost:3001')
  }

  onUpdateActiveTabs(callback: (count: number) => void) {
    this.socket.on('updateActiveTabs', (count: number) => {
      callback(count)
    })
  }

  notifyTabClosed() {
    this.socket.emit('tabClosed')
  }
}

export default new WebSocketService()
