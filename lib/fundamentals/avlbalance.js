"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = avlbalance;

/**
 * -> https://en.wikipedia.org/wiki/AVL_tree
 */

function avlbalance(P) {

	var N;

	// Possibly up to the root

	do {

		if (P.balancefactor === 2) {

			// The left column
			// N === P.left, the child whose height increases by 1.

			N = P.left;

			if (N.balancefactor === -1) {

				// The "Left Right Case"
				//
				//     (2)  P
				//         / \
				//  (-1)  N   D
				//       / \
				//      A   4
				//         / \
				//        B   C
				//
				// Reduce to "Left Left Case"

				P.left = leftrotatewithparent(N);
			}

			// Left Left Case
			//
			//     (2)  P
			//         / \
			// (1/0)  4   D
			//       / \
			//      3   C
			//     / \
			//    A   B


			// PROBLEM : DOES NOT KNOW WHICH OF LEFT OR RIGHT CHILD P IS
			P.parent.leftorright = rightrotatewithparent(P);

			// Balanced
			//
			//  (-1/0)  4
			//         / \
			//        3   5
			//       / \ / \
			//

			break;
		} else if (P.balancefactor === -2) {

			// The right column
			// N == P.right, the child whose height increases by 1.

			N = P.right;

			if (N.balancefactor === 1) {
				// The "Right Left Case"
				// Reduce to "Right Right Case"
				rightrotate(N);
			}
			// Right Right Case
			leftrotate(P);

			break;
		} else if (P.balancefactor === 0) {
			break;
		}

		// Keep P.balancefactor == ±1.
		// height( N ) increases by 1.
		N = P;
		P = N.parent;
	} while (P !== null);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5kYW1lbnRhbHMvYXZsYmFsYW5jZS5qcyJdLCJuYW1lcyI6WyJhdmxiYWxhbmNlIiwiUCIsIk4iLCJiYWxhbmNlZmFjdG9yIiwibGVmdCIsImxlZnRyb3RhdGV3aXRocGFyZW50IiwicGFyZW50IiwibGVmdG9ycmlnaHQiLCJyaWdodHJvdGF0ZXdpdGhwYXJlbnQiLCJyaWdodCIsInJpZ2h0cm90YXRlIiwibGVmdHJvdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBS3dCQSxVOztBQUp4Qjs7OztBQUllLFNBQVNBLFVBQVQsQ0FBc0JDLENBQXRCLEVBQTBCOztBQUV4QyxLQUFJQyxDQUFKOztBQUVBOztBQUVBLElBQUc7O0FBRUYsTUFBS0QsRUFBRUUsYUFBRixLQUFvQixDQUF6QixFQUE2Qjs7QUFFNUI7QUFDQTs7QUFFQUQsT0FBSUQsRUFBRUcsSUFBTjs7QUFFQSxPQUFLRixFQUFFQyxhQUFGLEtBQW9CLENBQUMsQ0FBMUIsRUFBOEI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFGLE1BQUVHLElBQUYsR0FBU0MscUJBQXNCSCxDQUF0QixDQUFUO0FBRUE7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBRCxLQUFFSyxNQUFGLENBQVNDLFdBQVQsR0FBdUJDLHNCQUF1QlAsQ0FBdkIsQ0FBdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFQSxHQWpERCxNQWlETyxJQUFLQSxFQUFFRSxhQUFGLEtBQW9CLENBQUMsQ0FBMUIsRUFBOEI7O0FBRXBDO0FBQ0E7O0FBRUFELE9BQUlELEVBQUVRLEtBQU47O0FBRUEsT0FBS1AsRUFBRUMsYUFBRixLQUFvQixDQUF6QixFQUE2QjtBQUM1QjtBQUNBO0FBQ0FPLGdCQUFhUixDQUFiO0FBQ0E7QUFDRDtBQUNBUyxjQUFZVixDQUFaOztBQUVBO0FBRUEsR0FqQk0sTUFpQkEsSUFBS0EsRUFBRUUsYUFBRixLQUFvQixDQUF6QixFQUE0QjtBQUNsQztBQUNBOztBQUVEO0FBQ0E7QUFDQUQsTUFBSUQsQ0FBSjtBQUNBQSxNQUFJQyxFQUFFSSxNQUFOO0FBRUEsRUE3RUQsUUE2RVVMLE1BQU0sSUE3RWhCO0FBOEVBIiwiZmlsZSI6ImF2bGJhbGFuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogLT4gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQVZMX3RyZWVcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdmxiYWxhbmNlICggUCApIHtcblxuXHR2YXIgTjtcblxuXHQvLyBQb3NzaWJseSB1cCB0byB0aGUgcm9vdFxuXG5cdGRvIHtcblxuXHRcdGlmICggUC5iYWxhbmNlZmFjdG9yID09PSAyICkge1xuXG5cdFx0XHQvLyBUaGUgbGVmdCBjb2x1bW5cblx0XHRcdC8vIE4gPT09IFAubGVmdCwgdGhlIGNoaWxkIHdob3NlIGhlaWdodCBpbmNyZWFzZXMgYnkgMS5cblxuXHRcdFx0TiA9IFAubGVmdDtcblxuXHRcdFx0aWYgKCBOLmJhbGFuY2VmYWN0b3IgPT09IC0xICkge1xuXG5cdFx0XHRcdC8vIFRoZSBcIkxlZnQgUmlnaHQgQ2FzZVwiXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vICAgICAoMikgIFBcblx0XHRcdFx0Ly8gICAgICAgICAvIFxcXG5cdFx0XHRcdC8vICAoLTEpICBOICAgRFxuXHRcdFx0XHQvLyAgICAgICAvIFxcXG5cdFx0XHRcdC8vICAgICAgQSAgIDRcblx0XHRcdFx0Ly8gICAgICAgICAvIFxcXG5cdFx0XHRcdC8vICAgICAgICBCICAgQ1xuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBSZWR1Y2UgdG8gXCJMZWZ0IExlZnQgQ2FzZVwiXG5cblx0XHRcdFx0UC5sZWZ0ID0gbGVmdHJvdGF0ZXdpdGhwYXJlbnQoIE4gKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMZWZ0IExlZnQgQ2FzZVxuXHRcdFx0Ly9cblx0XHRcdC8vICAgICAoMikgIFBcblx0XHRcdC8vICAgICAgICAgLyBcXFxuXHRcdFx0Ly8gKDEvMCkgIDQgICBEXG5cdFx0XHQvLyAgICAgICAvIFxcXG5cdFx0XHQvLyAgICAgIDMgICBDXG5cdFx0XHQvLyAgICAgLyBcXFxuXHRcdFx0Ly8gICAgQSAgIEJcblxuXG5cdFx0XHQvLyBQUk9CTEVNIDogRE9FUyBOT1QgS05PVyBXSElDSCBPRiBMRUZUIE9SIFJJR0hUIENISUxEIFAgSVNcblx0XHRcdFAucGFyZW50LmxlZnRvcnJpZ2h0ID0gcmlnaHRyb3RhdGV3aXRocGFyZW50KCBQICk7XG5cblx0XHRcdC8vIEJhbGFuY2VkXG5cdFx0XHQvL1xuXHRcdFx0Ly8gICgtMS8wKSAgNFxuXHRcdFx0Ly8gICAgICAgICAvIFxcXG5cdFx0XHQvLyAgICAgICAgMyAgIDVcblx0XHRcdC8vICAgICAgIC8gXFwgLyBcXFxuXHRcdFx0Ly9cblxuXHRcdFx0YnJlYWs7XG5cblx0XHR9IGVsc2UgaWYgKCBQLmJhbGFuY2VmYWN0b3IgPT09IC0yICkge1xuXG5cdFx0XHQvLyBUaGUgcmlnaHQgY29sdW1uXG5cdFx0XHQvLyBOID09IFAucmlnaHQsIHRoZSBjaGlsZCB3aG9zZSBoZWlnaHQgaW5jcmVhc2VzIGJ5IDEuXG5cblx0XHRcdE4gPSBQLnJpZ2h0O1xuXG5cdFx0XHRpZiAoIE4uYmFsYW5jZWZhY3RvciA9PT0gMSApIHtcblx0XHRcdFx0Ly8gVGhlIFwiUmlnaHQgTGVmdCBDYXNlXCJcblx0XHRcdFx0Ly8gUmVkdWNlIHRvIFwiUmlnaHQgUmlnaHQgQ2FzZVwiXG5cdFx0XHRcdHJpZ2h0cm90YXRlKCBOICk7XG5cdFx0XHR9XG5cdFx0XHQvLyBSaWdodCBSaWdodCBDYXNlXG5cdFx0XHRsZWZ0cm90YXRlKCBQICk7XG5cblx0XHRcdGJyZWFrO1xuXG5cdFx0fSBlbHNlIGlmICggUC5iYWxhbmNlZmFjdG9yID09PSAwKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHQvLyBLZWVwIFAuYmFsYW5jZWZhY3RvciA9PSDCsTEuXG5cdFx0Ly8gaGVpZ2h0KCBOICkgaW5jcmVhc2VzIGJ5IDEuXG5cdFx0TiA9IFA7XG5cdFx0UCA9IE4ucGFyZW50O1xuXG5cdH0gd2hpbGUgKCBQICE9PSBudWxsICk7XG59XG4iXX0=