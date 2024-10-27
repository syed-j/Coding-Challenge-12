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

function drawShape(ctx, shape, startX, startY, endX, endY, color) {
    ctx.strokeStyle = color; // Set the stroke color
    ctx.fillStyle = color; // Set the fill color (if needed)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas before drawing
    ctx.beginPath(); // Begin a new path for drawing

    switch (shape) {
        case 'line':
            // Draw a line from the starting point to the current mouse position
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke(); // Apply the stroke to the path
            break;
        case 'rectangle':
            // Draw a rectangle from the starting point to the current mouse position
            ctx.rect(startX, startY, endX - startX, endY - startY);
            ctx.stroke(); // Apply the stroke to the path
            break;
        case 'circle':
            // Calculate the radius based on the distance between the starting point and the current mouse position
            const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            // Draw a circle with the calculated radius
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke(); // Apply the stroke to the path
            break;
    }
}
