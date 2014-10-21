
var splay_tree_t = function ( diff ) {

	var zig, zag, zigzig, zigzag, zagzig, zagzag, z, zz;
	var insert, splay, remove, in_order_traversal, splay_tree;

	zig = function ( x, y ) { y[0] = x[1]; x[1] = y; };
	zag = function ( x, y ) { y[1] = x[0]; x[0] = y; };

	zigzig = function ( x, p, g ) { zig( p, g ); zig( x, p ); };
	zigzag = function ( x, p, g ) { zig( x, g ); zag( x, p ); };
	zagzig = function ( x, p, g ) { zag( x, g ); zig( x, p ); };
	zagzag = function ( x, p, g ) { zag( p, g ); zag( x, p ); };

	z  = [zig, zag];
	zz = [ [zigzig, zigzag], [zagzig, zagzag] ];

	insert = function ( pt, v ) {

		var w;

		w = diff( v, pt[2] ) > 0 | 0;

		if ( pt[w] === null ) {
			pt[w] = [null, null, v];
		}

		else {
			insert(pt[w], v);
		}

	};

	splay = function ( el, v ) {

		var turn, path, pt, f, d, w, i;

		turn = [];
		path = [];
		pt = el;
		f = undefined;

		while ( f === undefined ) {

			if ( pt === null ) {
				f = false;
				pt = path[path.length - 1];
				--turn.length;
			}
			else {

				d = diff( v, pt[2] );

				if ( d === 0 ) {
					f = true;
				}

				else {
					w = d > 0 | 0;
					path.push( pt );
					turn.push( w );
					pt = pt[w];
				}
			}

		}

		i = turn.length - 1;

		for ( ; i > 0 ; i -= 2 ) {
			zz[turn[i-1]][turn[i]]( pt, path[i], path[i-1] );
		}

		if ( i === 0 ) {
			z[turn[0]]( pt, el );
		}

		return [f, pt];
	};

	remove = function ( el, v ) {
		var r;

		r = splay( el, v );

		if ( !r[0] ) {
			return r[1];
		}


		if ( r[1][0] === null ) {
			return r[1][1];
		}

		else if ( r[1][1] === null ) {
			return r[1][0];
		}

		else {
			r[1][0] = splay( r[1][0], v )[1];
			r[1][0][1] = r[1][1];
			return r[1][0];
		}

	};

	in_order_traversal = function ( pt, callback ) {

		if ( pt[0] !== null ) {
			in_order_traversal( pt[0], callback );
		}

		callback( pt[2] );

		if ( pt[1] !== null ) {
			in_order_traversal( pt[1], callback );
		}

	};


	splay_tree = function () {
		this.pt = null;
	};

	splay_tree.prototype.insert = function ( v ) {

		if ( this.pt === null ) {
			this.pt = [null, null, v];
		}

		else {
			insert( this.pt, v );
		}

	};

	splay_tree.prototype.find = function ( v ) {

		var r;

		if ( this.pt === null ) {
			return [false, null];
		}

		r = splay( this.pt, v );
		this.pt = r[1];

		return [r[0], r[1][2]];
	};

	splay_tree.prototype.remove = function ( v ) {
		if ( this.pt !== null ) {
			this.pt = remove( this.pt, v );
		}
	};

	splay_tree.prototype.in_order_traversal = function ( fn ) {
		if ( this.pt !== null ) {
			in_order_traversal( this.pt, fn );
		}
	};

	return splay_tree;

};

exports.splay_tree_t = splay_tree_t;
