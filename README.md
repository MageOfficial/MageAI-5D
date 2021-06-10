# MageAI-5D
A 5D Chess AI utilizing 5d-chess-js(https://gitlab.com/alexbay218/5d-chess-js).

Currently the AI is a major work in progress and can only handle single timeline 8x8 board with standard pieces to about depth 5 with limited evaluation

The evaluation currently check
1. Material
2. Movement per piece
3. King exposure

Currently I am using a negaMax search algorithm with alpha beta pruning in the future I may add transposition tables and try PVS 

