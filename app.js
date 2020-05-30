document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const width = 10;
    const ScoreDisplay = document.querySelector("#score");
    const StartBtn = document.querySelector("#start-button");

    // Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
    let currentPosition  = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    // Draw the first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino");
        })
    }

// Undraw the tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
        })
    }

    // Function that make move the Tetrominoes on the grid every one second
    timerId = setInterval(moveDown, 1000);

    // assign function to keycode
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        } else if(e.keyCode === 38) {
            rotate();
        } else if(e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    
    document.addEventListener("keyup", control);


    // move down function
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    // freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
            current.forEach( index => squares[currentPosition + index].classList.add("taken")) 
            // Start a new tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            }
        }

        // move the tetromino left, unless is at the edge of there is a blockage
        function moveLeft() {
            undraw();
            const ISATLEFTEDGE = current.some(index => (currentPosition + index) % width === 0);

            if(!ISATLEFTEDGE) currentPosition -=1

            if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
                currentPosition +=1
            }
            draw()
        }

        // move the tetromino right unless is the edge or there is a blockage

        function moveRight() {
            undraw();
            const ISATRIGHTEDGE = current.some(index => (currentPosition + index) % width === width - 1)

            if(!ISATRIGHTEDGE) currentPosition +=1

            if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
                currentPosition -=1
            }
            draw();
        }

        // Rotate the tetromino
        function rotate() {
            undraw();
            currentRotation ++;
            if(currentRotation === current.length) { // if the current rotation gets to 4, make it go back to 0
                currentRotation = 0;
            }
            current = theTetrominoes[random][currentRotation];
            draw();
        }

})