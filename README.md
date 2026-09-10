# Game Of Life

Conway's Game of Life is a "zero-player game" that takes place on a two-dimensional grid of cells. Each cell can be in one of two states: Alive or Dead.

The game progresses in steps (or "generations"). To calculate the next generation, you look at each cell and its 8 immediate neighbors (horizontal, vertical, and diagonal) and apply these four simple rules:

## The Rules

- **Underpopulation:** Any live cell with fewer than two live neighbors dies. (As if by loneliness).
- **Survival:** Any live cell with two or three live neighbors lives on to the next generation.
- **Overpopulation:** Any live cell with more than three live neighbors dies. (As if by overcrowding).
- **Reproduction:** Any dead cell with exactly three live neighbors becomes a live cell.

*It's fascinating that such a simple set of rules can create such a complex system.*
