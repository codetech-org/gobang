class Gobang {
    constructor(element) {
        this.element = element
        this.len = 450
        this.board = this.create_board(this.len)
        this.chess_pieces = this.create_chess_pieces(this.len)
    }

    append_canvas(canvas) {
        canvas.style.position = "absolute"
        canvas.style.top = "0px"
        canvas.style.left = "0px"
        this.element.appendChild(canvas)
    }

    create_board(len) {
        let board = document.createElement("canvas")
        this.reload_board(board, len)
        this.append_canvas(board)
        return board
    }

    reload_board(board, len) {
        board.width = len
        board.height = len
        let grid_len = len / 15
        let half_grid_len = grid_len / 2
        let ctx = board.getContext('2d')
        for (let i = 0; i < 15; i++) {
            ctx.beginPath()
            ctx.moveTo(half_grid_len + i * grid_len, half_grid_len)
            ctx.lineTo(half_grid_len + i * grid_len, len - half_grid_len)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(half_grid_len, half_grid_len + i * grid_len)
            ctx.lineTo(len - half_grid_len, half_grid_len + i * grid_len)
            ctx.stroke()
        }
    }

    create_chess_pieces(len) {
        let chess_pieces = document.createElement("canvas")
        chess_pieces.width = len
        chess_pieces.height = len
        let that = this
        chess_pieces.onclick = function (e) {
            let offsetX = e.offsetX
            let offsetY = e.offsetY
            let x = Math.floor(offsetX * 15 / len)
            let y = Math.floor(offsetY * 15 / len)
            that.drawPiece(x, y, 'b')
        }
        this.append_canvas(chess_pieces)
        return chess_pieces
    }

    reload_chess_pieces() {
        let ctx = this.chess_pieces.getContext("2d")
        ctx.clearRect(0, 0, this.chess_pieces.width, this.chess_pieces.height)
    }

    drawPiece(x, y, c) {
        let grid_len = this.len / 15
        let half_grid_len = grid_len / 2
        let ctx = this.chess_pieces.getContext('2d')
        ctx.beginPath()
        ctx.arc(half_grid_len + x * grid_len, half_grid_len + y * grid_len,
            13, 0, 2 * Math.PI)
        if (c === 'b') {
            ctx.fillStyle = '#000'
        } else {
            ctx.fillStyle = '#fff'
        }
        ctx.fill()
        ctx.strokeStyle = '#000'
        ctx.stroke()
        ctx.closePath()
    }
}