document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas element and its 2D drawing context
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    
    // Variables to track drawing state and positions
    let drawing = false;
    let startX, startY;
    let shape = 'line'; // Default shape
    let color = '#000000'; // Default color

    // Event listener for shape selection radio buttons
    document.querySelectorAll('input[name="shape"]').forEach(input => {
        input.addEventListener('change', (e) => {
            shape = e.target.value; // Update shape based on user selection
        });
    });

    // Event listener for color picker input
    document.getElementById('colorPicker').addEventListener('input', (e) => {
        color = e.target.value; // Update color based on user selection
    });

    // Event listener for mouse down event on the canvas
    canvas.addEventListener('mousedown', (e) => {
        drawing = true; // Start drawing
        startX = e.offsetX; // Record starting X position
        startY = e.offsetY; // Record starting Y position
    });

    // Event listener for mouse move event on the canvas
    canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
            // Draw shape dynamically as the mouse moves
            drawShape(ctx, shape, startX, startY, e.offsetX, e.offsetY, color);
        }
    });

    // Event listener for mouse up event on the canvas
    canvas.addEventListener('mouseup', () => {
        drawing = false; // Stop drawing
        ctx.beginPath(); // Reset the path to avoid continuous drawing
    });

    // Event listener for clear canvas button
    document.getElementById('clearCanvas').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    });
});
