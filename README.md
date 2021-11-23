# MageAI-5D
A 5D Chess AI utilizing [5d-chess-js](https://gitlab.com/alexbay218/5d-chess-js).

Currently the AI is a major work in progress and can only handle single timeline boards with standard pieces to about depth 6. In positions where checkmate is possible depth 15 is can be used to find checkmate

The static evaluation currently checks
1. Material
2. Movement per piece
3. King exposure
4. King Piece Defense

Currently I am using a negaMax search algorithm. 

The search optimizations are currently:
- Move ordering based on MVV-LVA
- Move ordering with checks
- Move ordering with Static Exchange Evaluation(SEE)
- Move ordering using killer heuristic
- A evaluation mode for detecting mates by returning 0 for stats which are not checkmate.

WIP additions:
- Quiescence search
- Principal Variation Search(PVS)
- Iterative Deepening Depth First Search(IDDFS)
- Mate Distance Pruning
- History Heuristic

A full multitimeline AI will most likely not result from this for awhile and if it does happen will likely be written in C++. (Hopefully this AI will also be in C++ eventually)
A semi-working version that can play on mutliple timelines without considering legality though might be able to be implemented, but it will fail to actually refute softmates, and fail to consider cross timeline captures.
