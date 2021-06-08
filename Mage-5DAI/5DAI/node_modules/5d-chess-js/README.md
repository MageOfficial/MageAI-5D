# 5D Chess JS

Open source implementation of '5D Chess With Multiverse Time Travel' in the style of Chess.js library with built-in notation support.

[![Pipeline Status](https://gitlab.com/alexbay218/5d-chess-js/badges/master/pipeline.svg)](https://gitlab.com/%{project_path}/-/commits/master)
[![NPM version](https://img.shields.io/npm/v/5d-chess-js.svg)](https://www.npmjs.com/package/5d-chess-js)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://gitlab.com/alexbay218/5d-chess-js)

## Demo

Live demo on JSFiddle available [here](https://jsfiddle.net/alexbay218/57drakwg/)

## Installation

### Node.js

Simply install with this command `npm i 5d-chess-js`

To use the library, here is a simple 3 action checkmate example here:

``` js
const Chess = require('5d-chess-js');
var chess = new Chess();
chess.move('e3');
chess.submit();
chess.move('f6');
chess.submit();
chess.move('Qe2');
chess.submit();
chess.move('Nc6');
chess.submit();
chess.move('Qh5');
chess.submit();
chess.print();
console.log(chess.inCheckmate);
```

### In Browser

Include this tag in the HTML before invoking the library:
``` html
<script src="https://unpkg.com/5d-chess-js/dist/5d-chess.js"></script>
```

To use the library, the `Chess` class is exposed in the global scope. Here is the same 3 action checkmate example for in browser use.

``` js
var chess = new Chess();
chess.move('e3');
chess.submit();
chess.move('f6');
chess.submit();
chess.move('Qe2');
chess.submit();
chess.move('Nc6');
chess.submit();
chess.move('Qh5');
chess.submit();
chess.print();
console.log(chess.inCheckmate);
```

## Supported Variants

Currently supported variants:

 - Standard - This uses the standard chess layout (the string literal `standard` is used internally).
 - Defended Pawn - This variant switches the queen and queenside knight (the string literal `Standard - Defended Pawn` is used internally).
 - Half Reflected - This variant switches the black queen and black king (the string literal `half_reflected` is used internally).
 - Princess - This variant replaces the queen with a princess, a piece that only has rook + bishop movement (the string literal `princess` is used internally). Note the SAN piece equivalent is `S`.
 - Turn Zero - This variant adds a new black 'Turn Zero' board to allow black to timetravel on first action (the string literal `turn_zero` is used internally).
 - Two Timelines - This variant switches to a even timeline start, with -0 and +0 timelines available from the start (the string literal `two_timelines` is used internally).
 - Reversed Royalty - This variant switches the roles of the queen and king: the queen becomes the royal queen, which is vulnerable to checks and the king becomes the common king, which is not vulnerable to checks (`reversed_royalty` is used internally). The royal queen is referred to with `Y` and the common king with `C`.

## Terminology

Terms used in the notation of 5D Chess JS:

  - Move - A move is considered as a single movement of a piece (Capturing, En Passant, and Castling are considered a single move).
  - Action - A collection of moves that when submitted results in other player's time to play.
  - Action Number - A number starting from 1 that indicates both the current player and how many actions has been taken. Increments by 1 every time an action is played
  - Turn - A movable dimension within the game. A single turn has both white and black actions.
  - Timeline - A movable dimension within the game. Timelines contain multiple boards across turns.
  - Rank - A movable dimension within the game. Same as standard chess.
  - File - A movable dimension within the game. Same as standard chess.
  - Full Board - A full board is considered as the full board state between actions. Contains all timelines, turns, and singular chessboards with all pieces.

## PGN

5D Chess JS uses the `5dpgn` standard as defined [here](https://github.com/adri326/5dchess-notation). Previous versions (v0.3.6 and below) used an older custom notation system.
This library still maintains backwards compatibility, but `5dpgn` is the preferred standard moving forward.

For information on the old notation system see [here](./notation.old.md).

## FEN

5D Chess JS uses the `5dfen` standard as defined [here](https://github.com/adri326/5dchess-notation#5dfen-and-custom-variants).
Its grammar can be found at [fen.ebnf](https://github.com/adri326/5dchess-notation/blob/master/fen.ebnf).

## API

### Constructor

**Chess([import, variant])**

Creates a new instance of the `Chess` class.

  - import - *[Optional]* List of actions to import. Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.
  - variant = *[Optional]* String of variant to use. Also accepts `Board` object for custom variant.
  - **Return** - A new `Chess` object.

### Fields

These fields are implemented as a getter function. If getter functions are unsupported on the platform, call these fields as a function instead (example `.board` becomes `.board()`).

**.board**

  - **Return** - Current full board state as a `Board` object.

**.actionNumber**

  - **Return** - Current action number as an integer.

**.boardHistory**

  - **Return** - Array of `Board` objects representing all past and current full boards.

**.actionHistory**

  - **Return** - Array of `Action` objects representing all past actions played by both players during the whole game.

**.moveBuffer**

  - **Return** - Array of `Move` objects representing all current moves played by the current player before submitting.

**.player**

  - **Return** - String (either `"white"` or `"black"`) representing the current player.

**.inCheck**

  - **Return** - Boolean indicating if the current board state has the current player in check.

**.inCheckmate**

  - **Return** - Boolean indicating if the current board state has the current player in checkmate (i.e. current player loses).

**.inStalemate**

  - **Return** - Boolean indicating if the current board state has the current player in stalemate.

**.hash**

  - **Return** - String of MD5 hash of the full board data. Follows the proposed full state hashing in the 5DPGN specifications.

**.variants**

  - **Return** - Array of objects indicating supported variants. Objects follow the format of `{ name: <full variant name>, shortName: <internal variant name> }`. Either can be used for `variant` field.

**.checkmateTimeout**

  - **Return** - Number indicating milliseconds for the max time the checkmate detection can run, this value is writable (Note: This is an actual internal variable and not a getter function). By default set to 1 minute.

**.skipDetection**

  - **Return** - Boolean indicating whether to skip validation and checkmate detection, this value is writable (Note: This is an actual internal variable and not a getter function). Default value is false. Primarily used for engine purposes (to reduce CPU usage).

### Functions

**.import(import, [variant])**

Imports data to have the internal state match the state that the imported data represents. Since the imported data is a list of actions from the start of the game (accessible through **.actionHistory** or **.export()**), this function effectively replays all actions to arrive at the desired internal state. Action/Move validation occurs at each step, so performance may suffer if the imported data represents a large full board state. Will throw errors.

  - import - List of actions to import (this will reset the internal state). Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.
  - variant = *[Optional]* String of variant to use. Also accepts `Board` object for custom variant.
  - **Return** - Nothing.

**.importable(import)**

Check if the imported data is valid and can be imported. Does not modify internal state and will not throw errors.

  - import - List of actions to import (this will reset the internal state). Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.
  - **Return** - Boolean representing if the imported data is valid and can be imported.

**.fen()**

Get the 5DFEN string of the starting board.

  - **Return** - String containing 5DFEN of the starting board.

**.fen(fen)**

Modify the current board with the 5DFEN string.

  - fen - String containing 5DFEN to apply to the current board.
  - **Return** - Nothing.

**.fenable(fen)**

Check if the 5DFEN string is valid and can be applied. Does not modify internal state and will not throw errors.

  - fen - String containing 5DFEN to apply to the current board.
  - **Return** - Boolean representing if the 5DFEN string is valid and can be applied.

**.reset([variant])**

Resets the internal state to the initial full board state.

  - variant - *[Optional]* String of variant to use. Also accepts `Board` object for custom variant.
  - **Return** - Nothing.

**.copy()**

Creates a new instance of the Chess class with the exact same internal state.

  - **Return** - New Chess class instance.

**.state()**

Get the internal state of this instance of the Chess class. Used internally by `.copy()`, this is used for serializable copy (for example, copying state from web worker to main thread).

  - **Return** - Object (JSON compatible) containing all information to make exact copy.

**.state(state)**

Set the internal state of this instance of the Chess class. Used internally by `.copy()`, this is used for serializable copy (for example, copying state from web worker to main thread).

  - state - Object (JSON compatible) containing all information to make exact copy.
  - **Return** - Nothing.

**.compare(input1, input2, [type])**

Returns number indicating if object is equal, useful for consistent sorting. Non-zero return value may be arbitrary, but it is consistent. If the return value is zero, both inputs are equivalent in value.

  - input1 - First value to compare. See below for valid inputs per type.
  - input2 - Second value to compare. See below for valid inputs per type.
  - type - *[Optional]* Defaults to `"board"`. Indicates input type.

    Valid types are:

    - `"board"` - When using this type, input can be a 4D array (raw board format), `Board` object, or JSON string of either.
    - `"move"` - When using this type, input can be a raw move, `Move` object, JSON string of either, `5dpgn` string, or notation string *(depreciated)*.

**.action(action)**

Plays an action as the current player and submits the move. Will modify internal state and will throw errors.

  - action - The action (list of moves) to play as the current player. Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), `Action` object, JSON string of `Action` object, array of `Move` objects, or JSON string of an array of `Move` objects.
  - **Return** - Nothing.

**.actionable(action)**

Check if an action is playable as the current player and can submit. Does not modify internal state and will not throw errors.

  - action - The action (list of moves) to play as the current player. Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), array of `Move` objects, or JSON string of an array of `Move` objects.
  - **Return** - Boolean representing if the action is playable and submittable.

**.actions([format, activeOnly, presentOnly, newActiveTimelinesOnly])**

Generate all possible submittable actions. Does not modify internal state, but will throw errors.

**Warning! Due to the complexity of 5D chess, performance may severely suffer if the full board is large enough. Calling this function with more than 3 present timelines is not advised.**

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return.

    Valid formats are:
    - `"object"`
    - `"json"`
    - `"5dpgn"` (Note: when using `"5dpgn"`, additional tokens can be used to control output format. Example: `"5dpgn_active_superphysical"`)
        - `"active"` - This prompts the inclusion of timeline activation indicator tokens.
        - `"timeline"` - This prompts the inclusion of new timeline creation indicator tokens.
        - `"superphysical"` - This prompts the inclusion of super-physical tokens, regardless of if it is required.
    - `"notation"` *(depreciated)*
    - `"notation_short"` *(depreciated)*

  - activeOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves in the action come from only active timelines.
  - presentOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves in the action come from only present timelines (will override `activeOnly` argument).
  - newActiveTimelinesOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if the action will only create active timelines (i.e. cannot create inactive timelines).
  - **Return** - List of actions. Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.

**.checks([format])**

Generate all opponent moves that can capture the king (assuming a null move on any present timelines that still have not advanced). Does not modify internal state, but will throw errors.

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return.

    Valid formats are:
    - `"object"`
    - `"json"`
    - `"5dpgn"` (Note: when using `"5dpgn"`, additional tokens can be used to control output format. Example: `"5dpgn_active_superphysical"`)
        - `"active"` - This prompts the inclusion of timeline activation indicator tokens.
        - `"timeline"` - This prompts the inclusion of new timeline creation indicator tokens.
        - `"superphysical"` - This prompts the inclusion of super-physical tokens, regardless of if it is required.
    - `"notation"` *(depreciated)*
    - `"notation_short"` *(depreciated)*

**.move(move)**

Plays an move as the current player. Will modify internal state and will throw errors.

  - move - The move to play as the current player. Can be a notation string, `Move` object, or JSON string of a `Move` object.
  - **Return** - Nothing.

**.moveable(move)**

Check if a move is playable as the current player and can submit. Does not modify internal state and will not throw errors.

  - move - The move to play as the current player. Can be a notation string, `Move` object, or JSON string of a `Move` object.
  - **Return** - Boolean representing if the move is playable.

**.moves([format, activeOnly, presentOnly, spatialOnly])**

Generate all possible moves. Does not modify internal state, but will throw errors.

*Note: for promotion moves, this function will return promotion moves from most to least valuable pieces.*

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return.

    Valid formats are:
    - `"object"`
    - `"json"`
    - `"5dpgn"` (Note: when using `"5dpgn"`, additional tokens can be used to control output format. Example: `"5dpgn_active_superphysical"`)
        - `"active"` - This prompts the inclusion of timeline activation indicator tokens.
        - `"timeline"` - This prompts the inclusion of new timeline creation indicator tokens.
        - `"superphysical"` - This prompts the inclusion of super-physical tokens, regardless of if it is required.
    - `"notation"` *(depreciated)*
    - `"notation_short"` *(depreciated)*

  - activeOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves come from only active timelines.
  - presentOnly - *[Optional]* Defaults to `true`. Must be boolean. Indicates if all the moves come from only present timelines (will override `activeOnly` argument).
  - spatialOnly - *[Optional]* Defaults to `false`. Must be boolean. Indicates if all the moves are spatial only (non-timeline/time travel).
  - **Return** - List of moves. Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), array of `Move` objects, or JSON string of an array of `Move` objects.

**.submit()**

Submit all moves in move buffer and switch the current player to the other player. Advances the action number counter. Will modify internal state and will throw errors.

  - **Return** - Nothing.

**.submittable()**

Check if the player can submit all moves in move buffer. Does not modify internal state and will not throw errors.

  - **Return** - Boolean representing if the current internal state is submittable.

**.undo()**

Undo the latest move in the move buffer. Will modify internal state and will throw errors.

  - **Return** - Nothing.

**.undoable()**

Check if the current internal state allows undoing. Does not modify internal state and will not throw errors.

  - **Return** - Boolean representing if the current player can undo current internal state.

**.pass()**

Passes the turn as the current player and submits. Will modify internal state and will throw errors.

**Warning! This is primarily used for bot and engine purposes. In the regular game, you cannot pass turns!**

  - **Return** - Nothing.

**.passable()**

Check if current player can pass and can submit. Does not modify internal state and will not throw errors.

  - **Return** - Boolean representing if the action is playable and submittable.

**.export([format])**

Return exportable data as a list of all actions the both players have played during the whole game.

  - format - *[Optional]* Defaults to `"object"`, this argument selects the format of the data to return.

    Valid formats are:
    - `"object"`
    - `"json"`
    - `"5dpgn"` (Note: when using `"5dpgn"`, additional tokens can be used to control output format. Example: `"5dpgn_active_superphysical"`)
        - `"inline"` - This promps the usage of space instead of newline to delimit between actions.
        - `"active"` - This prompts the inclusion of timeline activation indicator tokens.
        - `"timeline"` - This prompts the inclusion of new timeline creation indicator tokens.
        - `"superphysical"` - This prompts the inclusion of super-physical tokens, regardless of if it is required.
    - `"notation"` *(depreciated)*
    - `"notation_short"` *(depreciated)*

  - **Return** - List of actions. Can be `5dpgn` string (delimited by newline characters, either `\n` or `\r\n`), array of `Action` objects, or JSON string of an array of `Action` objects.

**.print()**

Print the current internal state to console through `console.log()` function. Useful for debug purposes only.

  - **Return** - Nothing.

### Schemas

These schemas define the various object types that the API interacts with.

**Position**

``` js
{
  timeline: Integer,                                          // Timeline number of the position, 0 is neutral, negative integers are for black and positive integers are for white.
  turn: Integer,                                              // Turn number of the position, starts from 1.
  player: String Enum ['white','black'],                      // Indicates the player that the turn belongs to.
  coordinate: String SAN Coordinate ['(a-h)(1-8)'),           // SAN Coordinate of the rank and file of this position. This field is not required when used as an input.
  rank: Integer,                                              // Rank number of the position, range is from 1 to 8 (same as rank component of a SAN Coordinate).
  file: Integer                                               // File number of the position, range is from 1 to 8 (a = 1, b = 2, etc).
}
```

**Move**

``` js
{
  start: Position,                                            // Position object of the starting location of the move.
  end: Position,                                              // Position object of the end location of the move.
  realEnd: Position,                                          // Position object of the real location of the piece after the move. Turn is incremented and timeline is different if new timeline was created. This field is not required when used as an input.
  player: String Enum ['white','black'],                      // Indicates the player that is making the move.
  promotion: null || String SAN Piece ['B','N','R','S','Q'],  // SAN Piece character of the piece to promote to during pawn promotion. Null if move is not promotion.
  enPassant: null || Position,                                // Position object of the location of the piece captured during pawn En Passant movement. Null if move is not En Passant.
  castling: null || Object,                                   // Object containing start and end position object of rook movement during castling. Null if move is not castling.
    start: Position,                                          // Position object of the starting location of the rook movement during castling.
    end: Position,                                            // Position object of the end location of the rook movement during castling.
    realEnd: Position                                         // Position object of the real location of the piece after the move. Turn is incremented. This field is not required when used as an input.
}
```

**Action**

``` js
{
  action: Integer,                                            // Action number of the action. This field is not required when used as an input.
  player: String Enum ['white','black'],                      // Indicates the player that is making the action. This field is not required when used as an input.
  moves: Array,                                               // Array of Move objects (ordered from first move to the last)
    items: Move
}
```

**Piece**

``` js
{
  piece: String SAN Piece ['B','N','R','S','Q','K'],          // SAN Piece character of the piece (empty character is pawn).
  player: String Enum ['white','black'],                      // Indicates the player that the piece belongs to.
  position: Position,                                         // Position object of the location of the piece on a board.
  hasMoved: Boolean                                           // Indicate if the piece has moved
}
```

**Turn**

``` js
{
  turn: Integer,                                              // Turn number of the position, starts from 1.
  player: String Enum ['white','black'],                      // Indicates the player that the turn belongs to.
  width: Integer                                              // Indicates the width of the board this turn object refers to.
  height: Integer                                             // Indicates the height of the board this turn object refers to.
  pieces: Array,                                              // Array of Piece objects
    items: Piece
}
```

**Timeline**

``` js
{
  timeline: Integer,                                          // Timeline number of the timeline, 0 is neutral, negative integers are for black and positive integers are for white.
  player: String Enum ['white','black'],                      // Indicates the player that made the timeline.
  active: Boolean,                                            // Indicates if the timeline is currently active
  present: Boolean,                                           // Indicate if the timeline is currently present
  turns: Array,                                               // Array of Turn objects
    items: Turn
}
```

**Board**

``` js
{
  action: Integer,                                            // Action number of the player that is making the next action.
  player: String Enum ['white','black'],                      // Indicates the player that is making the next action.
  width: Integer                                              // Indicates the width of the boards within the full board.
  height: Integer                                             // Indicates the height of the boards within the full board.
  timelines: Array,                                           // Array of Timeline Objects
    items: Timeline
}
```

## Internal Raw Format

This library had a previous first attempt. It had a more traditional object-based format similar to the `Board` object format. This resulted in terrible performance, especially in generating actions.
This version uses a 4D array to store the full board state, with numbers as the piece indicator.

Here is the format: `board[timeline][turn][rank][file] = piece`
  - Timeline: starts from 0 (0, +1, +2, +3 => 0, 2, 4, 6 and -1, -2, -3 => 1, 3, 5)
  - Turn: starts from 0 (white player: 1, 2, 3 => 0, 2, 4 and black player: 1, 2, 3 => 1, 3, 5)
  - Rank: starts from 0 (1, 2, 3 => 0, 1, 2)
  - File: start from 0 (a, b, c => 0, 1, 2)
  - Piece (negative value indicates piece is unmoved):
    - Pawn: (white player: 2 and black player: 1)
    - Bishop: (white player: 4 and black player: 3)
    - Knight: (white player: 6 and black player: 5)
    - Rook: (white player: 8 and black player: 7)
    - Queen: (white player: 10 and black player: 9)
    - King: (white player: 12 and black player: 11)
    - Princess: (white player: 14 and black player: 13)


## FAQ

### Is it any good?

Yes (maybe).

### You incorrectly evaluated this full board as a checkmate (or not a checkmate)!

If you can provide me an action list (object, json, or notation) or the full board state, and submit it as an issue, I can get right on it. This goes for any other bugs. A good way to verify if it is correct or not is to repeat the same moves in the same order in '5D Chess With Multiverse Time Travel' and see if it matches this library.

### Why is this on GitLab instead of GitHub?

I made the switch from GitHub to GitLab mid 2019 when I was starting a new long term project called KSS. Back then, GitHub did not have many of the features it does now, such as integrated CI/CD and more. GitLab was the superior product in almost every way. Furthermore, as a believer in the open source, it seem ironic that open source software would be hosted on closed source platforms. With GitLab being open source, I can be sure that if GitLab.org crumbles, I can still maintain the overall project structure via GitLab instances. This allows me to preserve the Git repo itself, but also the issues, labels, rules, pipelines, etc. that are fundamental to a project. With GitHub, developers do not have this guarantee and they also do not have full control over their project structure.

For a (biased, but not untrue) comparison, visit this link [here](https://about.gitlab.com/devops-tools/github/decision-kit.html)

### Isn't the game copyrighted?

Yes, the game '5D Chess With Multiverse Time Travel' is under copyright by Thunkspace, LLC and any source code, written works, and other copyrightable materials are the property of Thunkspace, LLC. However, copyright does not extend to an idea, which include game rules. So as long as the new work does not contain a direct copy of the rules or other material within the original game. Well known precedent for this is Hasbro's lawsuit against Scrabulous in which they dropped it after Scrabulous removed material that could possible be considered violating copyright (https://www.cnet.com/news/hasbro-drops-scrabulous-lawsuit/).

Also of note is this article from the American Bar Association (https://www.americanbar.org/groups/intellectual_property_law/publications/landslide/2014-15/march-april/its_how_you_play_game_why_videogame_rules_are_not_expression_protected_copyright_law/).

5D Chess JS in no way aims to violate any copyright laws, but instead aims to be an open source implementation of the original ideas as presented by '5D Chess With Multiverse Time Travel'.

## Copyright

All source code is released under AGPL v3.0 (license can be found under the LICENSE file).

Any addition copyrightable material not covered under AGPL v3.0 is released under CC BY-SA v3.0.
