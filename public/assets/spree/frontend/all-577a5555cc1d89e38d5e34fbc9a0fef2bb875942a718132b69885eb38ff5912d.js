/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */


!function($){$.extend($.fn,{validate:function(options){if(!this.length){if(options&&options.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var validator=$.data(this[0],"validator");if(validator){return validator}this.attr("novalidate","novalidate");validator=new $.validator(options,this[0]);$.data(this[0],"validator",validator);if(validator.settings.onsubmit){this.validateDelegate(":submit","click",function(event){if(validator.settings.submitHandler){validator.submitButton=event.target}if($(event.target).hasClass("cancel")){validator.cancelSubmit=true}if($(event.target).attr("formnovalidate")!==undefined){validator.cancelSubmit=true}});this.submit(function(event){if(validator.settings.debug){event.preventDefault()}function handle(){var hidden;if(validator.settings.submitHandler){if(validator.submitButton){hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)}validator.settings.submitHandler.call(validator,validator.currentForm,event);if(validator.submitButton){hidden.remove()}return false}return true}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle()}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false}return handle()}else{validator.focusInvalid();return false}})}return validator},valid:function(){if($(this[0]).is("form")){return this.validate().form()}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid=valid&&validator.element(this)});return valid}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value)});return result},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,"validator").settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));delete existingRules.messages;staticRules[element.name]=existingRules;if(argument.messages){settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages)}break;case"remove":if(!argument){delete staticRules[element.name];return existingRules}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method]});return filtered}}var data=$.validator.normalizeRules($.extend({},$.validator.classRules(element),$.validator.attributeRules(element),$.validator.dataRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data)}return data}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+$(a).val())},filled:function(a){return!!$.trim(""+$(a).val())},unchecked:function(a){return!$(a).prop("checked")}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init()};$.validator.format=function(source,params){if(arguments.length===1){return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args)}}if(arguments.length>2&&params.constructor!==Array){params=$.makeArray(arguments).slice(1)}if(params.constructor!==Array){params=[params]}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),function(){return n})});return source};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(element,event){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass)}this.addWrapper(this.errorsFor(element)).hide()}},onfocusout:function(element,event){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element)}},onkeyup:function(element,event){if(event.which===9&&this.elementValue(element)===""){return}else if(element.name in this.submitted||element===this.lastElement){this.element(element)}},onclick:function(element,event){if(element.name in this.submitted){this.element(element)}else if(element.parentNode.name in this.submitted){this.element(element.parentNode)}},highlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).addClass(errorClass).removeClass(validClass)}else{$(element).addClass(errorClass).removeClass(validClass)}},unhighlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).removeClass(errorClass).addClass(validClass)}else{$(element).removeClass(errorClass).addClass(validClass)}}},setDefaults:function(settings){$.extend($.validator.defaults,settings)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=this.groups={};$.each(this.settings.groups,function(key,value){if(typeof value==="string"){value=value.split(/\s/)}$.each(value,function(index,name){groups[name]=key})});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value)});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");if(validator.settings[eventType]){validator.settings[eventType].call(validator,this[0],event)}}$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'] ","focusin focusout keyup",delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",delegate);if(this.settings.invalidHandler){$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid()){$(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var i=0,elements=this.currentElements=this.elements();elements[i];i++){this.check(elements[i])}return this.valid()},element:function(element){element=this.validationTargetFor(this.clean(element));this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element)!==false;if(result){delete this.invalid[element.name]}else{this.invalid[element.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return result},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]})}this.successList=$.grep(this.successList,function(element){return!(element.name in errors)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if($.fn.resetForm){$(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(obj){var count=0;for(var i in obj){count++}return count},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name===lastActive.name}).length===1&&lastActive},elements:function(){var validator=this,rulesCache={};return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&validator.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in rulesCache||!validator.objectLength($(this).rules())){return false}rulesCache[this.name]=true;return true})},clean:function(selector){return $(selector)[0]},errors:function(){var errorClass=this.settings.errorClass.replace(" ",".");return $(this.settings.errorElement+"."+errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element)},elementValue:function(element){var type=$(element).attr("type"),val=$(element).val();if(type==="radio"||type==="checkbox"){return $("input[name='"+$(element).attr("name")+"']:checked").val()}if(typeof val==="string"){return val.replace(/\r/g,"")}return val},check:function(element){element=this.validationTargetFor(this.clean(element));var rules=$(element).rules();var dependencyMismatch=false;var val=this.elementValue(element);var result;for(var method in rules){var rule={method:method,parameters:rules[method]};try{result=$.validator.methods[method].call(this,val,element,rule.parameters);if(result==="dependency-mismatch"){dependencyMismatch=true;continue}dependencyMismatch=false;if(result==="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return}if(!result){this.formatAndAdd(element,rule);return false}}catch(e){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+element.id+", check the '"+rule.method+"' method.",e)}throw e}}if(dependencyMismatch){return}if(this.objectLength(rules)){this.successList.push(element)}return true},customDataMessage:function(element,method){return $(element).data("msg-"+method.toLowerCase())||element.attributes&&$(element).attr("data-msg-"+method.toLowerCase())},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor===String?m:m[method])},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined){return arguments[i]}}return undefined},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customDataMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>")},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message==="function"){message=message.call(this,rule.parameters,element)}else if(theregex.test(message)){message=$.validator.format(message.replace(theregex,"{$1}"),rule.parameters)}this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message},addWrapper:function(toToggle){if(this.settings.wrapper){toToggle=toToggle.add(toToggle.parent(this.settings.wrapper))}return toToggle},defaultShowErrors:function(){var i,elements;for(i=0;this.errorList[i];i++){var error=this.errorList[i];if(this.settings.highlight){this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(error.element,error.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(i=0;this.successList[i];i++){this.showLabel(this.successList[i])}}if(this.settings.unhighlight){for(i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return $(this.errorList).map(function(){return this.element})},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);label.html(message)}else{label=$("<"+this.settings.errorElement+">").attr("for",this.idOrName(element)).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(label).length){if(this.settings.errorPlacement){this.settings.errorPlacement(label,$(element))}else{label.insertAfter(element)}}}if(!message&&this.settings.success){label.text("");if(typeof this.settings.success==="string"){label.addClass(this.settings.success)}else{this.settings.success(label,element)}}this.toShow=this.toShow.add(label)},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr("for")===name})},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name)},validationTargetFor:function(element){if(this.checkable(element)){element=this.findByName(element.name).not(this.settings.ignore)[0]}return element},checkable:function(element){return/radio|checkbox/i.test(element.type)},findByName:function(name){return $(this.currentForm).find("[name='"+name+"']")},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case"select":return $("option:selected",element).length;case"input":if(this.checkable(element)){return this.findByName(element.name).filter(":checked").length}}return value.length},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true},dependTypes:{"boolean":function(param,element){return param},string:function(param,element){return!!$(param,element.form).length},"function":function(param,element){return param(element)}},optional:function(element){var val=this.elementValue(element);return!$.validator.methods.required.call(this,val,element)&&"dependency-mismatch"},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[element.name];if(valid&&this.pendingRequest===0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false}else if(!valid&&this.pendingRequest===0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){if(className.constructor===String){this.classRuleSettings[className]=rules}else{$.extend(this.classRuleSettings,className)}},classRules:function(element){var rules={};var classes=$(element).attr("class");if(classes){$.each(classes.split(" "),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this])}})}return rules},attributeRules:function(element){var rules={};var $element=$(element);var type=$element[0].getAttribute("type");for(var method in $.validator.methods){var value;if(method==="required"){value=$element.get(0).getAttribute(method);if(value===""){value=true}value=!!value}else{value=$element.attr(method)}if(/min|max/.test(method)&&(type===null||/number|range|text/.test(type))){value=Number(value)}if(value){rules[method]=value}else if(type===method&&type!=="range"){rules[method]=true}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength}return rules},dataRules:function(element){var method,value,rules={},$element=$(element);for(method in $.validator.methods){value=$element.data("rule-"+method.toLowerCase());if(value!==undefined){rules[method]=value}}return rules},staticRules:function(element){var rules={};var validator=$.data(element.form,"validator");if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{}}return rules},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break}if(keepRule){rules[prop]=val.param!==undefined?val.param:true}else{delete rules[prop]}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter});$.each(["minlength","maxlength"],function(){if(rules[this]){rules[this]=Number(rules[this])}});$.each(["rangelength","range"],function(){var parts;if(rules[this]){if($.isArray(rules[this])){rules[this]=[Number(rules[this][0]),Number(rules[this][1])]}else if(typeof rules[this]==="string"){parts=rules[this].split(/[\s,]+/);rules[this]=[Number(parts[0]),Number(parts[1])]}}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength}}return rules},normalizeRule:function(data){if(typeof data==="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true});data=transformed}return data},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!==undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name))}},methods:{required:function(value,element,param){if(!this.depend(param,element)){return"dependency-mismatch"}if(element.nodeName.toLowerCase()==="select"){var val=$(element).val();return val&&val.length>0}if(this.checkable(element)){return this.getLength(value,element)>0}return $.trim(value).length>0},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)},url:function(value,element){return this.optional(element)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value).toString())},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value)},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value)},creditcard:function(value,element){if(this.optional(element)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(value)){return false}var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9){nDigit-=9}}nCheck+=nDigit;bEven=!bEven}return nCheck%10===0},minlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param},maxlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length<=param},rangelength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param[0]&&length<=param[1]},min:function(value,element,param){return this.optional(element)||value>=param},max:function(value,element,param){return this.optional(element)||value<=param},range:function(value,element,param){return this.optional(element)||value>=param[0]&&value<=param[1]},equalTo:function(value,element,param){var target=$(param);if(this.settings.onfocusout){target.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid()})}return value===target.val()},remote:function(value,element,param){if(this.optional(element)){return"dependency-mismatch"}var previous=this.previousValue(element);if(!this.settings.messages[element.name]){this.settings.messages[element.name]={}}previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param==="string"&&{url:param}||param;if(previous.old===value){return previous.valid}previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true||response==="true";if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);delete validator.invalid[element.name];validator.showErrors()}else{var errors={};var message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.invalid[element.name]=true;validator.showErrors(errors)}previous.valid=valid;validator.stopRequest(element,valid)}},param));return"pending"}}});$.format=$.validator.format}(jQuery);!function($){var pendingRequests={};if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=xhr}})}else{var ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=ajax.apply(this,arguments);return pendingRequests[port]}return ajax.apply(this,arguments)}}}(jQuery);!function($){$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments)}})}})}(jQuery);
/*! jsUri v1.1.1 | https://github.com/derek-watson/jsUri */

var Query=function(a){"use strict";var b=function(a){var b=[],c,d,e,f;if(typeof a=="undefined"||a===null||a==="")return b;a.indexOf("?")===0&&(a=a.substring(1)),d=a.toString().split(/[&;]/);for(c=0;c<d.length;c++)e=d[c],f=e.split("="),b.push([f[0],f[1]]);return b},c=b(a),d=function(){var a="",b,d;for(b=0;b<c.length;b++)d=c[b],a.length>0&&(a+="&"),a+=d.join("=");return a.length>0?"?"+a:a},e=function(a){a=decodeURIComponent(a),a=a.replace("+"," ");return a},f=function(a){var b,d;for(d=0;d<c.length;d++){b=c[d];if(e(a)===e(b[0]))return b[1]}},g=function(a){var b=[],d,f;for(d=0;d<c.length;d++)f=c[d],e(a)===e(f[0])&&b.push(f[1]);return b},h=function(a,b){var d=[],f,g,h,i;for(f=0;f<c.length;f++)g=c[f],h=e(g[0])===e(a),i=e(g[1])===e(b),(arguments.length===1&&!h||arguments.length===2&&!h&&!i)&&d.push(g);c=d;return this},i=function(a,b,d){arguments.length===3&&d!==-1?(d=Math.min(d,c.length),c.splice(d,0,[a,b])):arguments.length>0&&c.push([a,b]);return this},j=function(a,b,d){var f=-1,g,j;if(arguments.length===3){for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)&&decodeURIComponent(j[1])===e(d)){f=g;break}}h(a,d).addParam(a,b,f)}else{for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)){f=g;break}}h(a),i(a,b,f)}return this};return{getParamValue:f,getParamValues:g,deleteParam:h,addParam:i,replaceParam:j,toString:d}},Uri=function(a){"use strict";var b=!1,c=function(a){var c={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},d=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],e={name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},f=c[b?"strict":"loose"].exec(a),g={},h=14;while(h--)g[d[h]]=f[h]||"";g[e.name]={},g[d[12]].replace(e.parser,function(a,b,c){b&&(g[e.name][b]=c)});return g},d=c(a||""),e=new Query(d.query),f=function(a){typeof a!="undefined"&&(d.protocol=a);return d.protocol},g=null,h=function(a){typeof a!="undefined"&&(g=a);return g===null?d.source.indexOf("//")!==-1:g},i=function(a){typeof a!="undefined"&&(d.userInfo=a);return d.userInfo},j=function(a){typeof a!="undefined"&&(d.host=a);return d.host},k=function(a){typeof a!="undefined"&&(d.port=a);return d.port},l=function(a){typeof a!="undefined"&&(d.path=a);return d.path},m=function(a){typeof a!="undefined"&&(e=new Query(a));return e},n=function(a){typeof a!="undefined"&&(d.anchor=a);return d.anchor},o=function(a){f(a);return this},p=function(a){h(a);return this},q=function(a){i(a);return this},r=function(a){j(a);return this},s=function(a){k(a);return this},t=function(a){l(a);return this},u=function(a){m(a);return this},v=function(a){n(a);return this},w=function(a){return m().getParamValue(a)},x=function(a){return m().getParamValues(a)},y=function(a,b){arguments.length===2?m().deleteParam(a,b):m().deleteParam(a);return this},z=function(a,b,c){arguments.length===3?m().addParam(a,b,c):m().addParam(a,b);return this},A=function(a,b,c){arguments.length===3?m().replaceParam(a,b,c):m().replaceParam(a,b);return this},B=function(){var a="",b=function(a){return a!==null&&a!==""};b(f())?(a+=f(),f().indexOf(":")!==f().length-1&&(a+=":"),a+="//"):h()&&b(j())&&(a+="//"),b(i())&&b(j())&&(a+=i(),i().indexOf("@")!==i().length-1&&(a+="@")),b(j())&&(a+=j(),b(k())&&(a+=":"+k())),b(l())?a+=l():b(j())&&(b(m().toString())||b(n()))&&(a+="/"),b(m().toString())&&(m().toString().indexOf("?")!==0&&(a+="?"),a+=m().toString()),b(n())&&(n().indexOf("#")!==0&&(a+="#"),a+=n());return a},C=function(){return new Uri(B())};return{protocol:f,hasAuthorityPrefix:h,userInfo:i,host:j,port:k,path:l,query:m,anchor:n,setProtocol:o,setHasAuthorityPrefix:p,setUserInfo:q,setHost:r,setPort:s,setPath:t,setQuery:u,setAnchor:v,getQueryParamValue:w,getQueryParamValues:x,deleteQueryParam:y,addQueryParam:z,replaceQueryParam:A,toString:B,clone:C}},jsUri=Uri;
(function() {
  window.Spree = (function() {
    function Spree() {}

    Spree.ready = function(callback) {
      if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
        return jQuery(document).on('turbolinks:load', function() {
          return callback(jQuery);
        });
      } else {
        return jQuery(document).ready(callback);
      }
    };

    Spree.mountedAt = function() {
      return "/";
    };

    Spree.pathFor = function(path) {
      var locationOrigin;
      locationOrigin = (window.location.protocol + "//" + window.location.hostname) + (window.location.port ? ":" + window.location.port : "");
      return "" + locationOrigin + (this.mountedAt()) + path;
    };

    Spree.url = function(uri, query) {
      if (Spree.env === 'development' || Spree.env === 'test') {
        console.warn('Spree.url is deprecated, please use Spree.ajax for your request instead.');
      }
      if (uri.path === void 0) {
        uri = new Uri(uri);
      }
      if (query) {
        $.each(query, function(key, value) {
          return uri.addQueryParam(key, value);
        });
      }
      return uri;
    };

    Spree.ajax = function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = void 0;
      }
      options = options || {};
      options = $.extend(options, {
        headers: {
          "X-Spree-Token": Spree.api_key
        }
      });
      return $.ajax(url, options);
    };

    Spree.routes = {
      states_search: Spree.pathFor('api/states'),
      apply_coupon_code: function(order_id) {
        return Spree.pathFor("api/orders/" + order_id + "/apply_coupon_code");
      }
    };

    Spree.getJSON = function(url, data, success) {
      if (typeof data === 'function') {
        success = data;
        data = void 0;
      }
      return this.ajax({
        dataType: "json",
        url: url,
        data: data,
        success: success
      });
    };

    return Spree;

  })();

}).call(this);
// jQuery.payment v1.3.2
// Generated by CoffeeScript 1.7.1
(function() {
  var $, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlashAndSpace, hasTextSelected, luhnCheck, reFormatCVC, reFormatCardNumber, reFormatExpiry, reFormatNumeric, replaceFullWidthChars, restrictCVC, restrictCardNumber, restrictExpiry, restrictNumeric, safeVal, setCardType,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = window.jQuery || window.Zepto || window.$;

  $.payment = {};

  $.payment.fn = {};

  $.fn.payment = function() {
    var args, method;
    method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return $.payment.fn[method].apply(this, args);
  };

  defaultFormat = /(\d{1,4})/g;

  $.payment.cards = cards = [
    {
      type: 'visaelectron',
      patterns: [4026, 417500, 4405, 4508, 4844, 4913, 4917],
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'maestro',
      patterns: [5018, 502, 503, 56, 58, 639, 6220, 67],
      format: defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'forbrugsforeningen',
      patterns: [600],
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'dankort',
      patterns: [5019],
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'visa',
      patterns: [4],
      format: defaultFormat,
      length: [13, 16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'mastercard',
      patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'amex',
      patterns: [34, 37],
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvcLength: [3, 4],
      luhn: true
    }, {
      type: 'dinersclub',
      patterns: [30, 36, 38, 39],
      format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
      length: [14],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'discover',
      patterns: [60, 64, 65, 622],
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'unionpay',
      patterns: [62, 88],
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false
    }, {
      type: 'jcb',
      patterns: [35],
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }
  ];

  cardFromNumber = function(num) {
    var card, p, pattern, _i, _j, _len, _len1, _ref;
    num = (num + '').replace(/\D/g, '');
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      _ref = card.patterns;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        pattern = _ref[_j];
        p = pattern + '';
        if (num.substr(0, p.length) === p) {
          return card;
        }
      }
    }
  };

  cardFromType = function(type) {
    var card, _i, _len;
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.type === type) {
        return card;
      }
    }
  };

  luhnCheck = function(num) {
    var digit, digits, odd, sum, _i, _len;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (_i = 0, _len = digits.length; _i < _len; _i++) {
      digit = digits[_i];
      digit = parseInt(digit, 10);
      if ((odd = !odd)) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  hasTextSelected = function($target) {
    var _ref;
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
      return true;
    }
    if ((typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
      if (document.selection.createRange().text) {
        return true;
      }
    }
    return false;
  };

  safeVal = function(value, $target) {
    var cursor, error, last;
    try {
      cursor = $target.prop('selectionStart');
    } catch (_error) {
      error = _error;
      cursor = null;
    }
    last = $target.val();
    $target.val(value);
    if (cursor !== null && $target.is(":focus")) {
      if (cursor === last.length) {
        cursor = value.length;
      }
      $target.prop('selectionStart', cursor);
      return $target.prop('selectionEnd', cursor);
    }
  };

  replaceFullWidthChars = function(str) {
    var chars, chr, fullWidth, halfWidth, idx, value, _i, _len;
    if (str == null) {
      str = '';
    }
    fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    halfWidth = '0123456789';
    value = '';
    chars = str.split('');
    for (_i = 0, _len = chars.length; _i < _len; _i++) {
      chr = chars[_i];
      idx = fullWidth.indexOf(chr);
      if (idx > -1) {
        chr = halfWidth[idx];
      }
      value += chr;
    }
    return value;
  };

  reFormatNumeric = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = replaceFullWidthChars(value);
      value = value.replace(/\D/g, '');
      return safeVal(value, $target);
    });
  };

  reFormatCardNumber = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = replaceFullWidthChars(value);
      value = $.payment.formatCardNumber(value);
      return safeVal(value, $target);
    });
  };

  formatCardNumber = function(e) {
    var $target, card, digit, length, re, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    card = cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value + ' ' + digit);
      });
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value + digit + ' ');
      });
    }
  };

  formatBackCardNumber = function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d\s$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value.replace(/\d\s$/, ''));
      });
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value.replace(/\d$/, ''));
      });
    }
  };

  reFormatExpiry = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = replaceFullWidthChars(value);
      value = $.payment.formatExpiry(value);
      return safeVal(value, $target);
    });
  };

  formatExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val() + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val("0" + val + " / ");
      });
    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return setTimeout(function() {
        var m1, m2;
        m1 = parseInt(val[0], 10);
        m2 = parseInt(val[1], 10);
        if (m2 > 2 && m1 !== 0) {
          return $target.val("0" + m1 + " / " + m2);
        } else {
          return $target.val("" + val + " / ");
        }
      });
    }
  };

  formatForwardExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d\d$/.test(val)) {
      return $target.val("" + val + " / ");
    }
  };

  formatForwardSlashAndSpace = function(e) {
    var $target, val, which;
    which = String.fromCharCode(e.which);
    if (!(which === '/' || which === ' ')) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d$/.test(val) && val !== '0') {
      return $target.val("0" + val + " / ");
    }
  };

  formatBackExpiry = function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d\s\/\s$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value.replace(/\d\s\/\s$/, ''));
      });
    }
  };

  reFormatCVC = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = replaceFullWidthChars(value);
      value = value.replace(/\D/g, '').slice(0, 4);
      return safeVal(value, $target);
    });
  };

  restrictNumeric = function(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  };

  restrictCardNumber = function(e) {
    var $target, card, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = ($target.val() + digit).replace(/\D/g, '');
    card = cardFromNumber(value);
    if (card) {
      return value.length <= card.length[card.length.length - 1];
    } else {
      return value.length <= 16;
    }
  };

  restrictExpiry = function(e) {
    var $target, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = $target.val() + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
      return false;
    }
  };

  restrictCVC = function(e) {
    var $target, digit, val;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    val = $target.val() + digit;
    return val.length <= 4;
  };

  setCardType = function(e) {
    var $target, allTypes, card, cardType, val;
    $target = $(e.currentTarget);
    val = $target.val();
    cardType = $.payment.cardType(val) || 'unknown';
    if (!$target.hasClass(cardType)) {
      allTypes = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cards.length; _i < _len; _i++) {
          card = cards[_i];
          _results.push(card.type);
        }
        return _results;
      })();
      $target.removeClass('unknown');
      $target.removeClass(allTypes.join(' '));
      $target.addClass(cardType);
      $target.toggleClass('identified', cardType !== 'unknown');
      return $target.trigger('payment.cardType', cardType);
    }
  };

  $.payment.fn.formatCardCVC = function() {
    this.on('keypress', restrictNumeric);
    this.on('keypress', restrictCVC);
    this.on('paste', reFormatCVC);
    this.on('change', reFormatCVC);
    this.on('input', reFormatCVC);
    return this;
  };

  $.payment.fn.formatCardExpiry = function() {
    this.on('keypress', restrictNumeric);
    this.on('keypress', restrictExpiry);
    this.on('keypress', formatExpiry);
    this.on('keypress', formatForwardSlashAndSpace);
    this.on('keypress', formatForwardExpiry);
    this.on('keydown', formatBackExpiry);
    this.on('change', reFormatExpiry);
    this.on('input', reFormatExpiry);
    return this;
  };

  $.payment.fn.formatCardNumber = function() {
    this.on('keypress', restrictNumeric);
    this.on('keypress', restrictCardNumber);
    this.on('keypress', formatCardNumber);
    this.on('keydown', formatBackCardNumber);
    this.on('keyup', setCardType);
    this.on('paste', reFormatCardNumber);
    this.on('change', reFormatCardNumber);
    this.on('input', reFormatCardNumber);
    this.on('input', setCardType);
    return this;
  };

  $.payment.fn.restrictNumeric = function() {
    this.on('keypress', restrictNumeric);
    this.on('paste', reFormatNumeric);
    this.on('change', reFormatNumeric);
    this.on('input', reFormatNumeric);
    return this;
  };

  $.payment.fn.cardExpiryVal = function() {
    return $.payment.cardExpiryVal($(this).val());
  };

  $.payment.cardExpiryVal = function(value) {
    var month, prefix, year, _ref;
    _ref = value.split(/[\s\/]+/, 2), month = _ref[0], year = _ref[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
      month: month,
      year: year
    };
  };

  $.payment.validateCardNumber = function(num) {
    var card, _ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
      return false;
    }
    card = cardFromNumber(num);
    if (!card) {
      return false;
    }
    return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
  };

  $.payment.validateCardExpiry = function(month, year) {
    var currentTime, expiry, _ref;
    if (typeof month === 'object' && 'month' in month) {
      _ref = month, month = _ref.month, year = _ref.year;
    }
    if (!(month && year)) {
      return false;
    }
    month = $.trim(month);
    year = $.trim(year);
    if (!/^\d+$/.test(month)) {
      return false;
    }
    if (!/^\d+$/.test(year)) {
      return false;
    }
    if (!((1 <= month && month <= 12))) {
      return false;
    }
    if (year.length === 2) {
      if (year < 70) {
        year = "20" + year;
      } else {
        year = "19" + year;
      }
    }
    if (year.length !== 4) {
      return false;
    }
    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
  };

  $.payment.validateCardCVC = function(cvc, type) {
    var card, _ref;
    cvc = $.trim(cvc);
    if (!/^\d+$/.test(cvc)) {
      return false;
    }
    card = cardFromType(type);
    if (card != null) {
      return _ref = cvc.length, __indexOf.call(card.cvcLength, _ref) >= 0;
    } else {
      return cvc.length >= 3 && cvc.length <= 4;
    }
  };

  $.payment.cardType = function(num) {
    var _ref;
    if (!num) {
      return null;
    }
    return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
  };

  $.payment.formatCardNumber = function(num) {
    var card, groups, upperLength, _ref;
    num = num.replace(/\D/g, '');
    card = cardFromNumber(num);
    if (!card) {
      return num;
    }
    upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
      return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
    } else {
      groups = card.format.exec(num);
      if (groups == null) {
        return;
      }
      groups.shift();
      groups = $.grep(groups, function(n) {
        return n;
      });
      return groups.join(' ');
    }
  };

  $.payment.formatExpiry = function(expiry) {
    var mon, parts, sep, year;
    parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
    if (!parts) {
      return '';
    }
    mon = parts[1] || '';
    sep = parts[2] || '';
    year = parts[3] || '';
    if (year.length > 0) {
      sep = ' / ';
    } else if (sep === ' /') {
      mon = mon.substring(0, 1);
      sep = '';
    } else if (mon.length === 2 || sep.length > 0) {
      sep = ' / ';
    } else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
      mon = "0" + mon;
      sep = ' / ';
    }
    return mon + sep + year;
  };

}).call(this);
(function() {
  Spree.disableSaveOnClick = function() {
    return ($('form.edit_order')).submit(function() {
      return ($(this)).find(':submit, :image').attr('disabled', true).removeClass('primary').addClass('disabled');
    });
  };

  Spree.ready(function($) {
    var termsCheckbox;
    termsCheckbox = $('#accept_terms_and_conditions');
    return termsCheckbox.change(function() {
      var submitBtn;
      submitBtn = $(this.closest('form')).find(':submit');
      submitBtn.prop('disabled', !this.checked);
      return submitBtn.toggleClass('disabled', !this.checked);
    });
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    var fillStates, getCountryId, order_use_billing, statesByCountry, updateState, update_shipping_form_state;
    if ($('#checkout_form_address').is('*')) {
      $('.js-address-fields').show();
      $('#checkout_form_address').validate();
      getCountryId = function(region) {
        return $('#' + region + 'country select').val();
      };
      statesByCountry = {};
      updateState = function(region) {
        var countryId;
        countryId = getCountryId(region);
        if (countryId != null) {
          if (statesByCountry[countryId] == null) {
            return $.get(Spree.routes.states_search, {
              country_id: countryId
            }, function(data) {
              statesByCountry[countryId] = {
                states: data.states,
                states_required: data.states_required
              };
              return fillStates(region);
            });
          } else {
            return fillStates(region);
          }
        }
      };
      fillStates = function(region) {
        var countryId, data, selected, stateInput, statePara, stateSelect, stateSpanRequired, states, statesRequired, statesWithBlank;
        countryId = getCountryId(region);
        data = statesByCountry[countryId];
        if (data == null) {
          return;
        }
        statesRequired = data.states_required;
        states = data.states;
        statePara = $('#' + region + 'state');
        stateSelect = statePara.find('select');
        stateInput = statePara.find('input');
        stateSpanRequired = statePara.find('[id$="state-required"]');
        if (states.length > 0) {
          selected = parseInt(stateSelect.val());
          stateSelect.html('');
          statesWithBlank = [
            {
              name: '',
              id: ''
            }
          ].concat(states);
          $.each(statesWithBlank, function(idx, state) {
            var opt;
            opt = $(document.createElement('option')).attr('value', state.id).html(state.name);
            if (selected === state.id) {
              opt.prop('selected', true);
            }
            return stateSelect.append(opt);
          });
          stateSelect.prop('disabled', false).show();
          stateInput.hide().prop('disabled', true);
          statePara.show();
          if (statesRequired) {
            stateSelect.addClass('required');
            stateSpanRequired.show();
          } else {
            stateSelect.removeClass('required');
            stateSpanRequired.hide();
          }
          return stateInput.removeClass('required');
        } else {
          stateSelect.hide().prop('disabled', true);
          stateInput.show();
          if (statesRequired) {
            stateSpanRequired.show();
            stateInput.addClass('required');
          } else {
            stateInput.val('');
            stateSpanRequired.hide();
            stateInput.removeClass('required');
          }
          statePara.toggle(!!statesRequired);
          stateInput.prop('disabled', !statesRequired);
          return stateSelect.removeClass('required');
        }
      };
      $('#bcountry select').change(function() {
        return updateState('b');
      });
      $('#scountry select').change(function() {
        return updateState('s');
      });
      updateState('b');
      order_use_billing = $('input#order_use_billing');
      order_use_billing.change(function() {
        return update_shipping_form_state(order_use_billing);
      });
      update_shipping_form_state = function(order_use_billing) {
        if (order_use_billing.is(':checked')) {
          $('#shipping .inner').hide();
          return $('#shipping .inner input, #shipping .inner select').prop('disabled', true);
        } else {
          $('#shipping .inner').show();
          $('#shipping .inner input, #shipping .inner select').prop('disabled', false);
          return updateState('s');
        }
      };
      return update_shipping_form_state(order_use_billing);
    }
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    Spree.onPayment = function() {
      if (($('#checkout_form_payment')).is('*')) {
        if (($('#existing_cards')).is('*')) {
          ($('#payment-method-fields')).hide();
          ($('#payment-methods')).hide();
          ($('#use_existing_card_yes')).click(function() {
            ($('#payment-method-fields')).hide();
            ($('#payment-methods')).hide();
            return ($('.existing-cc-radio')).prop("disabled", false);
          });
          ($('#use_existing_card_no')).click(function() {
            ($('#payment-method-fields')).show();
            ($('#payment-methods')).show();
            return ($('.existing-cc-radio')).prop("disabled", true);
          });
        }
        $(".cardNumber").payment('formatCardNumber');
        $(".cardExpiry").payment('formatCardExpiry');
        $(".cardCode").payment('formatCardCVC');
        $(".cardNumber").change(function() {
          return $(this).parent().siblings(".ccType").val($.payment.cardType(this.value));
        });
        ($('input[type="radio"][name="order[payments_attributes][][payment_method_id]"]')).click(function() {
          ($('#payment-methods li')).hide();
          if (this.checked) {
            return ($('#payment_method_' + this.value)).show();
          }
        });
        ($('#cvv_link')).on('click', function(event) {
          var windowName, windowOptions;
          windowName = 'cvv_info';
          windowOptions = 'left=20,top=20,width=500,height=500,toolbar=0,resizable=0,scrollbars=1';
          window.open(($(this)).attr('href'), windowName, windowOptions);
          return event.preventDefault();
        });
        return ($('input[type="radio"]:checked')).click();
      }
    };
    return Spree.onPayment();
  });

}).call(this);
(function() {
  Spree.onCouponCodeApply = function(e) {
    var couponCode, couponCodeField, couponStatus, errorClass, req, successClass, url;
    couponCodeField = $('#order_coupon_code');
    couponCode = $.trim(couponCodeField.val());
    if (couponCode === '') {
      return;
    }
    couponStatus = $("#coupon_status");
    successClass = 'success';
    errorClass = 'alert';
    url = Spree.url(Spree.routes.apply_coupon_code(Spree.current_order_id), {
      order_token: Spree.current_order_token,
      coupon_code: couponCode
    });
    couponStatus.removeClass([successClass, errorClass].join(" "));
    req = Spree.ajax({
      method: "PUT",
      url: url
    });
    req.done(function(data) {
      window.location.reload();
      couponCodeField.val('');
      return couponStatus.addClass(successClass).html("Coupon code applied successfully.");
    });
    return req.fail(function(xhr) {
      var handler;
      handler = xhr.responseJSON;
      return couponStatus.addClass(errorClass).html(handler["error"]);
    });
  };

  Spree.ready(function($) {
    return $('#coupon-code-apply-button').click(function(e) {
      return Spree.onCouponCodeApply(e);
    });
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    var radios, selectedRadio;
    Spree.addImageHandlers = function() {
      var thumbnails;
      thumbnails = $('#product-images ul.thumbnails');
      ($('#main-image')).data('selectedThumb', ($('#main-image img')).attr('src'));
      if (!thumbnails.find('li.selected').length) {
        thumbnails.find('li').eq(0).addClass('selected');
      }
      thumbnails.find('a').on('click', function(event) {
        ($('#main-image')).data('selectedThumb', ($(event.currentTarget)).attr('href'));
        ($('#main-image')).data('selectedThumbId', ($(event.currentTarget)).parent().attr('id'));
        thumbnails.find('li').removeClass('selected');
        ($(event.currentTarget)).parent('li').addClass('selected');
        return false;
      });
      thumbnails.find('li').on('mouseenter', function(event) {
        return ($('#main-image img')).attr('src', ($(event.currentTarget)).find('a').attr('href'));
      });
      return thumbnails.find('li').on('mouseleave', function(event) {
        return ($('#main-image img')).attr('src', ($('#main-image')).data('selectedThumb'));
      });
    };
    Spree.showVariantImages = function(variantId) {
      var currentThumb, newImg, thumb;
      ($('li.vtmb')).hide();
      ($('li.tmb-' + variantId)).show();
      currentThumb = $('#' + ($('#main-image')).data('selectedThumbId'));
      if (!currentThumb.hasClass('vtmb-' + variantId)) {
        thumb = $(($('#product-images ul.thumbnails li:visible.vtmb')).eq(0));
        if (!(thumb.length > 0)) {
          thumb = $(($('#product-images ul.thumbnails li:visible')).eq(0));
        }
        newImg = thumb.find('a').attr('href');
        ($('#product-images ul.thumbnails li')).removeClass('selected');
        thumb.addClass('selected');
        ($('#main-image img')).attr('src', newImg);
        ($('#main-image')).data('selectedThumb', newImg);
        return ($('#main-image')).data('selectedThumbId', thumb.attr('id'));
      }
    };
    Spree.updateVariantPrice = function(variant) {
      var variantPrice;
      variantPrice = variant.data('price');
      if (variantPrice) {
        return ($('.price.selling')).text(variantPrice);
      }
    };
    radios = $('#product-variants input[type="radio"]');
    if (radios.length > 0) {
      selectedRadio = $('#product-variants input[type="radio"][checked="checked"]');
      Spree.showVariantImages(selectedRadio.attr('value'));
      Spree.updateVariantPrice(selectedRadio);
    }
    Spree.addImageHandlers();
    return radios.click(function(event) {
      Spree.showVariantImages(this.value);
      return Spree.updateVariantPrice($(this));
    });
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    if (($('form#update-cart')).is('*')) {
      ($('form#update-cart a.delete')).show().one('click', function() {
        ($(this)).parents('.line-item').first().find('input.line_item_quantity').val(0);
        ($(this)).parents('form').first().submit();
        return false;
      });
    }
    return ($('form#update-cart')).submit(function() {
      return ($('form#update-cart #update-button')).attr('disabled', true);
    });
  });

  Spree.fetch_cart = function(cartLinkUrl) {
    return Spree.ajax({
      url: cartLinkUrl || Spree.pathFor("cart_link"),
      success: function(data) {
        return $('#link-to-cart').html(data);
      }
    });
  };

}).call(this);
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){var b=function(c,d){this.id=++a.FE.ID,this.opts=a.extend(!0,{},a.extend({},b.DEFAULTS,"object"==typeof d&&d));var e=JSON.stringify(this.opts);a.FE.OPTS_MAPPING[e]=a.FE.OPTS_MAPPING[e]||this.id,this.sid=a.FE.OPTS_MAPPING[e],a.FE.SHARED[this.sid]=a.FE.SHARED[this.sid]||{},this.shared=a.FE.SHARED[this.sid],this.shared.count=(this.shared.count||0)+1,this.$oel=a(c),this.$oel.data("froala.editor",this),this.o_doc=c.ownerDocument,this.o_win="defaultView"in this.o_doc?this.o_doc.defaultView:this.o_doc.parentWindow;var f=a(this.o_win).scrollTop();this.$oel.on("froala.doInit",a.proxy(function(){this.$oel.off("froala.doInit"),this.doc=this.$el.get(0).ownerDocument,this.win="defaultView"in this.doc?this.doc.defaultView:this.doc.parentWindow,this.$doc=a(this.doc),this.$win=a(this.win),this.opts.pluginsEnabled||(this.opts.pluginsEnabled=Object.keys(a.FE.PLUGINS)),this.opts.initOnClick?(this.load(a.FE.MODULES),this.$el.on("touchstart.init",function(){a(this).data("touched",!0)}),this.$el.on("touchmove.init",function(){a(this).removeData("touched")}),this.$el.on("mousedown.init touchend.init dragenter.init focus.init",a.proxy(function(b){if("touchend"==b.type&&!this.$el.data("touched"))return!0;if(1===b.which||!b.which){this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"),this.load(a.FE.MODULES),this.load(a.FE.PLUGINS);var c=b.originalEvent&&b.originalEvent.originalTarget;c&&"IMG"==c.tagName&&a(c).trigger("mousedown"),"undefined"==typeof this.ul&&this.destroy(),"touchend"==b.type&&this.image&&b.originalEvent&&b.originalEvent.target&&a(b.originalEvent.target).is("img")&&setTimeout(a.proxy(function(){this.image.edit(a(b.originalEvent.target))},this),100),this.ready=!0,this.events.trigger("initialized")}},this))):(this.load(a.FE.MODULES),this.load(a.FE.PLUGINS),a(this.o_win).scrollTop(f),"undefined"==typeof this.ul&&this.destroy(),this.ready=!0,this.events.trigger("initialized"))},this)),this._init()};b.DEFAULTS={initOnClick:!1,pluginsEnabled:null},b.MODULES={},b.PLUGINS={},b.VERSION="2.4.0",b.INSTANCES=[],b.OPTS_MAPPING={},b.SHARED={},b.ID=0,b.prototype._init=function(){var b=this.$oel.prop("tagName"),c=a.proxy(function(){"TEXTAREA"!=b&&(this._original_html=this._original_html||this.$oel.html()),this.$box=this.$box||this.$oel,this.opts.fullPage&&(this.opts.iframe=!0),this.opts.iframe?(this.$iframe=a('<iframe src="about:blank" frameBorder="0">'),this.$wp=a("<div></div>"),this.$box.html(this.$wp),this.$wp.append(this.$iframe),this.$iframe.get(0).contentWindow.document.open(),this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"),this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"),this.$iframe.get(0).contentWindow.document.close(),this.$el=this.$iframe.contents().find("body"),this.el=this.$el.get(0),this.$head=this.$iframe.contents().find("head"),this.$html=this.$iframe.contents().find("html"),this.iframe_document=this.$iframe.get(0).contentWindow.document,this.$oel.trigger("froala.doInit")):(this.$el=a("<div></div>"),this.el=this.$el.get(0),this.$wp=a("<div></div>").append(this.$el),this.$box.html(this.$wp),this.$oel.trigger("froala.doInit"))},this),d=a.proxy(function(){this.$box=a("<div>"),this.$oel.before(this.$box).hide(),this._original_html=this.$oel.val(),this.$oel.parents("form").on("submit."+this.id,a.proxy(function(){this.events.trigger("form.submit")},this)),this.$oel.parents("form").on("reset."+this.id,a.proxy(function(){this.events.trigger("form.reset")},this)),c()},this),e=a.proxy(function(){this.$el=this.$oel,this.el=this.$el.get(0),this.$el.attr("contenteditable",!0).css("outline","none").css("display","inline-block"),this.opts.multiLine=!1,this.opts.toolbarInline=!1,this.$oel.trigger("froala.doInit")},this),f=a.proxy(function(){this.$el=this.$oel,this.el=this.$el.get(0),this.opts.toolbarInline=!1,this.$oel.trigger("froala.doInit")},this),g=a.proxy(function(){this.$el=this.$oel,this.el=this.$el.get(0),this.opts.toolbarInline=!1,this.$oel.on("click.popup",function(a){a.preventDefault()}),this.$oel.trigger("froala.doInit")},this);this.opts.editInPopup?g():"TEXTAREA"==b?d():"A"==b?e():"IMG"==b?f():"BUTTON"==b||"INPUT"==b?(this.opts.editInPopup=!0,this.opts.toolbarInline=!1,g()):c()},b.prototype.load=function(b){for(var c in b)if(b.hasOwnProperty(c)){if(this[c])continue;if(a.FE.PLUGINS[c]&&this.opts.pluginsEnabled.indexOf(c)<0)continue;if(this[c]=new b[c](this),this[c]._init&&(this[c]._init(),this.opts.initOnClick&&"core"==c))return!1}},b.prototype.destroy=function(){this.shared.count--,this.events.$off();var b=this.html.get();if(this.events.trigger("destroy",[],!0),this.events.trigger("shared.destroy",void 0,!0),0===this.shared.count){for(var c in this.shared)this.shared.hasOwnProperty(c)&&(null==this.shared[c],a.FE.SHARED[this.sid][c]=null);a.FE.SHARED[this.sid]={}}this.$oel.parents("form").off("."+this.id),this.$oel.off("click.popup"),this.$oel.removeData("froala.editor"),this.$oel.off("froalaEditor"),this.core.destroy(b),a.FE.INSTANCES.splice(a.FE.INSTANCES.indexOf(this),1)},a.fn.froalaEditor=function(c){for(var d=[],e=0;e<arguments.length;e++)d.push(arguments[e]);if("string"==typeof c){var f=[];return this.each(function(){var b=a(this),e=b.data("froala.editor");if(e){var g,h;if(c.indexOf(".")>0&&e[c.split(".")[0]]?(e[c.split(".")[0]]&&(g=e[c.split(".")[0]]),h=c.split(".")[1]):(g=e,h=c.split(".")[0]),!g[h])return a.error("Method "+c+" does not exist in Froala Editor.");var i=g[h].apply(e,d.slice(1));void 0===i?f.push(this):0===f.length&&f.push(i)}}),1==f.length?f[0]:f}if("object"==typeof c||!c)return this.each(function(){var d=a(this).data("froala.editor");if(!d){var e=this;new b(e,c)}})},a.fn.froalaEditor.Constructor=b,a.FroalaEditor=b,a.FE=b,a.FE.XS=0,a.FE.SM=1,a.FE.MD=2,a.FE.LG=3,a.FE.MODULES.helpers=function(b){function c(){var a,b,c=-1;return"Microsoft Internet Explorer"==navigator.appName?(a=navigator.userAgent,b=new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"),null!==b.exec(a)&&(c=parseFloat(RegExp.$1))):"Netscape"==navigator.appName&&(a=navigator.userAgent,b=new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"),null!==b.exec(a)&&(c=parseFloat(RegExp.$1))),c}function d(){var a={},b=c();if(b>0)a.msie=!0;else{var d=navigator.userAgent.toLowerCase(),e=/(edge)[ \/]([\w.]+)/.exec(d)||/(chrome)[ \/]([\w.]+)/.exec(d)||/(webkit)[ \/]([\w.]+)/.exec(d)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d)||/(msie) ([\w.]+)/.exec(d)||d.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d)||[],f={browser:e[1]||"",version:e[2]||"0"};e[1]&&(a[f.browser]=!0),a.chrome?a.webkit=!0:a.webkit&&(a.safari=!0)}return a.msie&&(a.version=b),a}function e(){return/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&!h()}function f(){return/(Android)/g.test(navigator.userAgent)&&!h()}function g(){return/(Blackberry)/g.test(navigator.userAgent)}function h(){return/(Windows Phone)/gi.test(navigator.userAgent)}function i(){return f()||e()||g()}function j(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}function k(a){return parseInt(a,10)||0}function l(){var b=a('<div class="fr-visibility-helper"></div>').appendTo("body"),c=k(b.css("margin-left"));return b.remove(),c}function m(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch}function n(a){if(!/^(https?:|ftps?:|)\/\//i.test(a))return!1;a=String(a).replace(/</g,"%3C").replace(/>/g,"%3E").replace(/"/g,"%22").replace(/ /g,"%20");var b=/(http|ftp|https):\/\/[a-z\u00a1-\uffff0-9{}]+(\.[a-z\u00a1-\uffff0-9{}]*)*([a-z\u00a1-\uffff0-9.,@?^=%&amp;:\/~+#-_{}]*[a-z\u00a1-\uffff0-9@?^=%&amp;\/~+#-_{}])?/gi;return b.test(a)}function o(a){if(/^(https?:|ftps?:|)\/\//i.test(a)){if(!n(a)&&!n("http:"+a))return""}else a=encodeURIComponent(a).replace(/%23/g,"#").replace(/%2F/g,"/").replace(/%25/g,"%").replace(/mailto%3A/gi,"mailto:").replace(/file%3A/gi,"file:").replace(/sms%3A/gi,"sms:").replace(/tel%3A/gi,"tel:").replace(/notes%3A/gi,"notes:").replace(/data%3Aimage/gi,"data:image").replace(/blob%3A/gi,"blob:").replace(/webkit-fake-url%3A/gi,"webkit-fake-url:").replace(/%3F/g,"?").replace(/%3D/g,"=").replace(/%26/g,"&").replace(/&amp;/g,"&").replace(/%2C/g,",").replace(/%3B/g,";").replace(/%2B/g,"+").replace(/%40/g,"@").replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/%7B/g,"{").replace(/%7D/g,"}");return a}function p(a){return a&&!a.propertyIsEnumerable("length")&&"object"==typeof a&&"number"==typeof a.length}function q(a){function b(a){return("0"+parseInt(a,10).toString(16)).slice(-2)}try{return a&&"transparent"!==a?/^#[0-9A-F]{6}$/i.test(a)?a:(a=a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),("#"+b(a[1])+b(a[2])+b(a[3])).toUpperCase()):""}catch(c){return null}}function r(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return c?"rgb("+parseInt(c[1],16)+", "+parseInt(c[2],16)+", "+parseInt(c[3],16)+")":""}function s(b){var c=(b.css("text-align")||"").replace(/-(.*)-/g,"");if(["left","right","justify","center"].indexOf(c)<0){if(!w){var d=a('<div dir="auto" style="text-align: initial; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');a("body").append(d);var e=d.find("#s1").get(0).getBoundingClientRect().left,f=d.find("#s2").get(0).getBoundingClientRect().left;d.remove(),w=e<f?"left":"right"}c=w}return c}function t(){return null==x&&(x=navigator.platform.toUpperCase().indexOf("MAC")>=0),x}function u(){function a(a,b){var d=a[b];a[b]=function(a){var b,f=!1,g=!1;if(a.match(e)){a=a.replace(e,""),this.parentNode||(c.appendChild(this),g=!0);var h=this.parentNode;return this.id||(this.id="rootedQuerySelector_id_"+(new Date).getTime(),f=!0),b=d.call(h,"#"+this.id+" "+a),f&&(this.id=""),g&&c.removeChild(this),b}return d.call(this,a)}}var c=b.o_doc.createElement("div");try{c.querySelectorAll(":scope *")}catch(d){var e=/^\s*:scope/gi;a(HTMLElement.prototype,"querySelector"),a(HTMLElement.prototype,"querySelectorAll")}}function v(){b.browser=d(),u()}var w,x=null;return{_init:v,isIOS:e,isMac:t,isAndroid:f,isBlackberry:g,isWindowsPhone:h,isMobile:i,requestAnimationFrame:j,getPX:k,screenSize:l,isTouch:m,sanitizeURL:o,isArray:p,RGBToHex:q,HEXtoRGB:r,isURL:n,getAlignment:s}},a.FE.MODULES.events=function(b){function c(a,b,c){s(a,b,c)}function d(){c(b.$el,"cut copy paste beforepaste",function(a){v(a.type,[a])})}function e(){c(b.$el,"click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart",function(a){v(a.type,[a])}),r("mousedown",function(){for(var c=0;c<a.FE.INSTANCES.length;c++)a.FE.INSTANCES[c]!=b&&a.FE.INSTANCES[c].popups&&a.FE.INSTANCES[c].popups.areVisible()&&a.FE.INSTANCES[c].$el.find(".fr-marker").remove()})}function f(){c(b.$el,"keydown keypress keyup input",function(a){v(a.type,[a])})}function g(){c(b.$win,b._mousedown,function(a){v("window.mousedown",[a]),n()}),c(b.$win,b._mouseup,function(a){v("window.mouseup",[a])}),c(b.$win,"cut copy keydown keyup touchmove touchend",function(a){v("window."+a.type,[a])})}function h(){c(b.$doc,"dragend drop",function(a){v("document."+a.type,[a])})}function i(c){if("undefined"==typeof c&&(c=!0),!b.$wp)return!1;if(b.helpers.isIOS()&&b.$win.get(0).focus(),!b.core.hasFocus()&&c){var d=b.$win.scrollTop();return b.$el.focus(),d!=b.$win.scrollTop()&&b.$win.scrollTop(d),!1}if(!b.core.hasFocus()||b.$el.find(".fr-marker").length>0)return!1;var e=b.selection.info(b.el);if(e.atStart&&b.selection.isCollapsed()&&null!=b.html.defaultTag()){var f=b.markers.insert();if(f&&!b.node.blockParent(f)){a(f).remove();var g=b.$el.find(b.html.blockTagsQuery()).get(0);g&&(a(g).prepend(a.FE.MARKERS),b.selection.restore())}else f&&a(f).remove()}}function j(){c(b.$el,"focus",function(a){p()&&(i(!1),C===!1&&v(a.type,[a]))}),c(b.$el,"blur",function(a){p()&&C===!0&&(v(a.type,[a]),n())}),r("focus",function(){C=!0}),r("blur",function(){C=!1})}function k(){b.helpers.isMobile()?(b._mousedown="touchstart",b._mouseup="touchend",b._move="touchmove",b._mousemove="touchmove"):(b._mousedown="mousedown",b._mouseup="mouseup",b._move="",b._mousemove="mousemove")}function l(c){var d=a(c.currentTarget);return b.edit.isDisabled()||b.node.hasClass(d.get(0),"fr-disabled")?(c.preventDefault(),!1):"mousedown"===c.type&&1!==c.which||(b.helpers.isMobile()||c.preventDefault(),(b.helpers.isAndroid()||b.helpers.isWindowsPhone())&&0===d.parents(".fr-dropdown-menu").length&&(c.preventDefault(),c.stopPropagation()),d.addClass("fr-selected"),void b.events.trigger("commands.mousedown",[d]))}function m(c,d){var e=a(c.currentTarget);if(b.edit.isDisabled()||b.node.hasClass(e.get(0),"fr-disabled"))return c.preventDefault(),!1;if("mouseup"===c.type&&1!==c.which)return!0;if(!b.node.hasClass(e.get(0),"fr-selected"))return!0;if("touchmove"!=c.type){if(c.stopPropagation(),c.stopImmediatePropagation(),c.preventDefault(),!b.node.hasClass(e.get(0),"fr-selected"))return a(".fr-selected").removeClass("fr-selected"),!1;if(a(".fr-selected").removeClass("fr-selected"),e.data("dragging")||e.attr("disabled"))return e.removeData("dragging"),!1;var f=e.data("timeout");f&&(clearTimeout(f),e.removeData("timeout")),d.apply(b,[c])}else e.data("timeout")||e.data("timeout",setTimeout(function(){e.data("dragging",!0)},100))}function n(){A=!0}function o(){A=!1}function p(){return A}function q(a,c,d){s(a,b._mousedown,c,function(a){b.edit.isDisabled()||l(a)},!0),s(a,b._mouseup+" "+b._move,c,function(a){b.edit.isDisabled()||m(a,d)},!0),s(a,"mousedown click mouseup",c,function(a){b.edit.isDisabled()||a.stopPropagation()},!0),r("window.mouseup",function(){b.edit.isDisabled()||(a.find(c).removeClass("fr-selected"),n())})}function r(a,c,d){var e=a.split(" ");if(e.length>1){for(var f=0;f<e.length;f++)r(e[f],c,d);return!0}"undefined"==typeof d&&(d=!1);var g;g=0!=a.indexOf("shared.")?B[a]=B[a]||[]:b.shared._events[a]=b.shared._events[a]||[],d?g.unshift(c):g.push(c)}function s(a,c,d,e,f){"function"==typeof d&&(f=e,e=d,d=!1);var g=f?b.shared.$_events:D,h=f?b.sid:b.id;d?a.on(c.split(" ").join(".ed"+h+" ")+".ed"+h,d,e):a.on(c.split(" ").join(".ed"+h+" ")+".ed"+h,e),g.indexOf(a.get(0))<0&&g.push(a.get(0))}function t(b,c){for(var d=0;d<b.length;d++)a(b[d]).off(".ed"+c)}function u(){t(D,b.id),D=[],0==b.shared.count&&(t(b.shared.$_events,b.sid),b.shared.$_events=null)}function v(c,d,e){if(!b.edit.isDisabled()||e){var f;if(0!=c.indexOf("shared."))f=B[c];else{if(b.shared.count>0)return!1;f=b.shared._events[c]}var g;if(f)for(var h=0;h<f.length;h++)if(g=f[h].apply(b,d),g===!1)return!1;return g=b.$oel.triggerHandler("froalaEditor."+c,a.merge([b],d||[])),g!==!1&&g}}function w(c,d,e){if(!b.edit.isDisabled()||e){var f;if(0!=c.indexOf("shared."))f=B[c];else{if(b.shared.count>0)return!1;f=b.shared._events[c]}var g;if(f)for(var h=0;h<f.length;h++)g=f[h].apply(b,[d]),"undefined"!=typeof g&&(d=g);return g=b.$oel.triggerHandler("froalaEditor."+c,a.merge([b],[d])),"undefined"!=typeof g&&(d=g),d}}function x(){for(var a in B)B.hasOwnProperty(a)&&delete B[a]}function y(){for(var a in b.shared._events)b.shared._events.hasOwnProperty(a)&&delete b.shared._events[a]}function z(){b.shared.$_events=b.shared.$_events||[],b.shared._events={},k(),e(),g(),h(),f(),j(),n(),d(),r("destroy",x),r("shared.destroy",y)}var A,B={},C=!1,D=[];return{_init:z,on:r,trigger:v,bindClick:q,disableBlur:o,enableBlur:n,blurActive:p,focus:i,chainTrigger:w,$on:s,$off:u}},a.FE.MODULES.node=function(b){function c(a){return a&&"IFRAME"!=a.tagName?Array.prototype.slice.call(a.childNodes||[]):[]}function d(b){return!!b&&(b.nodeType==Node.ELEMENT_NODE&&a.FE.BLOCK_TAGS.indexOf(b.tagName.toLowerCase())>=0)}function e(e,f){if(!e)return!0;if(e.querySelector("table"))return!1;var g=c(e);1==g.length&&d(g[0])&&(g=c(g[0]));for(var h=!1,i=0;i<g.length;i++){var j=g[i];if(!(f&&b.node.hasClass(j,"fr-marker")||j.nodeType==Node.TEXT_NODE&&0==j.textContent.length)){if("BR"!=j.tagName&&(j.textContent||"").replace(/\u200B/gi,"").replace(/\n/g,"").length>0)return!1;if(h)return!1;"BR"==j.tagName&&(h=!0)}}return!(e.querySelectorAll(a.FE.VOID_ELEMENTS.join(",")).length-e.querySelectorAll("br").length)&&(!e.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),")+":not(.fr-marker)")&&(!(e.querySelectorAll(a.FE.BLOCK_TAGS.join(",")).length>1)&&!e.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),")+":not(.fr-marker)")))}function f(a){for(;a&&a.parentNode!==b.el&&(!a.parentNode||!b.node.hasClass(a.parentNode,"fr-inner"));)if(a=a.parentNode,d(a))return a;return null}function g(c,e,f){if("undefined"==typeof e&&(e=[]),"undefined"==typeof f&&(f=!0),e.push(b.el),e.indexOf(c.parentNode)>=0||c.parentNode&&b.node.hasClass(c.parentNode,"fr-inner")||c.parentNode&&a.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName)>=0&&f)return null;for(;e.indexOf(c.parentNode)<0&&c.parentNode&&!b.node.hasClass(c.parentNode,"fr-inner")&&(a.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName)<0||!f)&&(!d(c)||!d(c.parentNode)||!f);)c=c.parentNode;return c}function h(a){var b={},c=a.attributes;if(c)for(var d=0;d<c.length;d++){var e=c[d];b[e.nodeName]=e.value}return b}function i(a){for(var b="",c=h(a),d=Object.keys(c).sort(),e=0;e<d.length;e++){var f=d[e],g=c[f];b+=g.indexOf('"')<0?" "+f+'="'+g+'"':" "+f+"='"+g+"'"}return b}function j(a){for(var b=a.attributes,c=0;c<b.length;c++){var d=b[c];a.removeAttribute(d.nodeName)}}function k(a){return"<"+a.tagName.toLowerCase()+i(a)+">"}function l(a){return"</"+a.tagName.toLowerCase()+">"}function m(a,c){"undefined"==typeof c&&(c=!0);for(var d=a.previousSibling;d&&c&&b.node.hasClass(d,"fr-marker");)d=d.previousSibling;return!d||d.nodeType==Node.TEXT_NODE&&""===d.textContent&&m(d)}function n(a,c){"undefined"==typeof c&&(c=!0);for(var d=a.nextSibling;d&&c&&b.node.hasClass(d,"fr-marker");)d=d.nextSibling;return!d||d.nodeType==Node.TEXT_NODE&&""===d.textContent&&n(d)}function o(b){return b&&b.nodeType==Node.ELEMENT_NODE&&a.FE.VOID_ELEMENTS.indexOf((b.tagName||"").toLowerCase())>=0}function p(a){return!!a&&["UL","OL"].indexOf(a.tagName)>=0}function q(a){return a===b.el}function r(a){return a&&a.nodeType==Node.ELEMENT_NODE&&a.getAttribute("class")&&(a.getAttribute("class")||"").indexOf("fr-deletable")>=0}function s(a){return a===b.doc.activeElement&&(!b.doc.hasFocus||b.doc.hasFocus())&&!!(q(a)||a.type||a.href||~a.tabIndex)}function t(a){return(!a.getAttribute||"false"!=a.getAttribute("contenteditable"))&&["STYLE","SCRIPT"].indexOf(a.tagName)<0}function u(a,b){return a instanceof jQuery&&(a=a.get(0)),a&&a.classList&&a.classList.contains(b)}function v(a){return b.browser.msie?a:{acceptNode:a}}return{isBlock:d,isEmpty:e,blockParent:f,deepestParent:g,rawAttributes:h,attributes:i,clearAttributes:j,openTagString:k,closeTagString:l,isFirstSibling:m,isLastSibling:n,isList:p,isElement:q,contents:c,isVoid:o,hasFocus:s,isEditable:t,isDeletable:r,hasClass:u,filter:v}},a.FE.INVISIBLE_SPACE="&#8203;",a.FE.START_MARKER='<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",a.FE.END_MARKER='<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",a.FE.MARKERS=a.FE.START_MARKER+a.FE.END_MARKER,a.FE.MODULES.markers=function(b){function c(c,d){return a('<span class="fr-marker" data-id="'+d+'" data-type="'+c+'" style="display: '+(b.browser.safari?"none":"inline-block")+'; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",b.doc)[0]}function d(d,e,f){try{var g=d.cloneRange();if(g.collapse(e),g.insertNode(c(e,f)),e===!0&&d.collapsed)for(var h=b.$el.find('span.fr-marker[data-type="true"][data-id="'+f+'"]'),i=h.get(0).nextSibling;i&&i.nodeType===Node.TEXT_NODE&&0===i.textContent.length;)a(i).remove(),i=h.nextSibling;if(e===!0&&!d.collapsed){var h=b.$el.find('span.fr-marker[data-type="true"][data-id="'+f+'"]').get(0),i=h.nextSibling;if(i&&i.nodeType===Node.ELEMENT_NODE&&b.node.isBlock(i)){var j=[i];do i=j[0],j=b.node.contents(i);while(j[0]&&b.node.isBlock(j[0]));a(i).prepend(a(h))}}if(e===!1&&!d.collapsed){var h=b.$el.find('span.fr-marker[data-type="false"][data-id="'+f+'"]').get(0),i=h.previousSibling;if(i&&i.nodeType===Node.ELEMENT_NODE&&b.node.isBlock(i)){var j=[i];do i=j[j.length-1],j=b.node.contents(i);while(j[j.length-1]&&b.node.isBlock(j[j.length-1]));a(i).append(a(h))}h.parentNode&&["TD","TH"].indexOf(h.parentNode.tagName)>=0&&h.parentNode.previousSibling&&!h.previousSibling&&a(h.parentNode.previousSibling).append(h)}var k=b.$el.find('span.fr-marker[data-type="'+e+'"][data-id="'+f+'"]').get(0);return k&&(k.style.display="none"),k}catch(l){return null}}function e(){if(!b.$wp)return null;try{var c=b.selection.ranges(0),d=c.commonAncestorContainer;if(d!=b.el&&0==b.$el.find(d).length)return null;var e=c.cloneRange(),f=c.cloneRange();e.collapse(!0);var g=a('<span class="fr-marker" style="display: none; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",b.doc)[0];if(e.insertNode(g),g=b.$el.find("span.fr-marker").get(0)){for(var h=g.nextSibling;h&&h.nodeType===Node.TEXT_NODE&&0===h.textContent.length;)a(h).remove(),h=b.$el.find("span.fr-marker").get(0).nextSibling;return b.selection.clear(),b.selection.get().addRange(f),g}return null}catch(i){}}function f(){b.selection.isCollapsed()||b.selection.remove();var c=b.$el.find(".fr-marker").get(0);if(null==c&&(c=e()),null==c)return null;var d=b.node.deepestParent(c);if(d||(d=b.node.blockParent(c),d&&"LI"!=d.tagName&&(d=null)),d)if(b.node.isBlock(d)&&b.node.isEmpty(d))a(d).replaceWith('<span class="fr-marker"></span>');else if(b.cursor.isAtStart(c,d))a(d).before('<span class="fr-marker"></span>'),a(c).remove();else if(b.cursor.isAtEnd(c,d))a(d).after('<span class="fr-marker"></span>'),a(c).remove();else{var f=c,g="",h="";do f=f.parentNode,g+=b.node.closeTagString(f),h=b.node.openTagString(f)+h;while(f!=d);a(c).replaceWith('<span id="fr-break"></span>');var i=b.node.openTagString(d)+a(d).html()+b.node.closeTagString(d);i=i.replace(/<span id="fr-break"><\/span>/g,g+'<span class="fr-marker"></span>'+h),a(d).replaceWith(i)}return b.$el.find(".fr-marker").get(0)}function g(a){var c=a.clientX,d=a.clientY;h();var f,g=null;if("undefined"!=typeof b.doc.caretPositionFromPoint?(f=b.doc.caretPositionFromPoint(c,d),g=b.doc.createRange(),g.setStart(f.offsetNode,f.offset),g.setEnd(f.offsetNode,f.offset)):"undefined"!=typeof b.doc.caretRangeFromPoint&&(f=b.doc.caretRangeFromPoint(c,d),g=b.doc.createRange(),g.setStart(f.startContainer,f.startOffset),g.setEnd(f.startContainer,f.startOffset)),null!==g&&"undefined"!=typeof b.win.getSelection){var i=b.win.getSelection();i.removeAllRanges(),i.addRange(g)}else if("undefined"!=typeof b.doc.body.createTextRange)try{g=b.doc.body.createTextRange(),g.moveToPoint(c,d);var j=g.duplicate();j.moveToPoint(c,d),g.setEndPoint("EndToEnd",j),g.select()}catch(k){return!1}e()}function h(){b.$el.find(".fr-marker").remove()}return{place:d,insert:e,split:f,insertAtPoint:g,remove:h}},a.FE.MODULES.selection=function(b){function c(){var a="";return b.win.getSelection?a=b.win.getSelection():b.doc.getSelection?a=b.doc.getSelection():b.doc.selection&&(a=b.doc.selection.createRange().text),a.toString()}function d(){var a="";return a=b.win.getSelection?b.win.getSelection():b.doc.getSelection?b.doc.getSelection():b.doc.selection.createRange()}function e(a){var c=d(),e=[];if(c&&c.getRangeAt&&c.rangeCount)for(var e=[],f=0;f<c.rangeCount;f++)e.push(c.getRangeAt(f));else e=b.doc.createRange?[b.doc.createRange()]:[];return"undefined"!=typeof a?e[a]:e}function f(){var a=d();try{a.removeAllRanges?a.removeAllRanges():a.empty?a.empty():a.clear&&a.clear()}catch(b){}}function g(){var f=d();try{if(f.rangeCount){var g=e(0),h=g.startContainer;if(h.nodeType==Node.TEXT_NODE&&g.startOffset==(h.textContent||"").length&&h.nextSibling&&(h=h.nextSibling),h.nodeType==Node.ELEMENT_NODE){var i=!1;if(h.childNodes.length>0&&h.childNodes[g.startOffset]){for(var j=h.childNodes[g.startOffset];j&&j.nodeType==Node.TEXT_NODE&&0==j.textContent.length;)j=j.nextSibling;if(j&&j.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(h=j,i=!0),!i&&h.childNodes.length>1&&g.startOffset>0&&h.childNodes[g.startOffset-1]){for(var j=h.childNodes[g.startOffset-1];j&&j.nodeType==Node.TEXT_NODE&&0==j.textContent.length;)j=j.nextSibling;j&&j.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(h=j,i=!0)}}else if(!g.collapsed&&h.nextSibling&&h.nextSibling.nodeType==Node.ELEMENT_NODE){var j=h.nextSibling;j&&j.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(h=j,i=!0)}!i&&h.childNodes.length>0&&a(h.childNodes[0]).text().replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&["BR","IMG","HR"].indexOf(h.childNodes[0].tagName)<0&&(h=h.childNodes[0])}for(;h.nodeType!=Node.ELEMENT_NODE&&h.parentNode;)h=h.parentNode;for(var k=h;k&&"HTML"!=k.tagName;){if(k==b.el)return h;k=a(k).parent()[0]}}}catch(l){}return b.el}function h(){var f=d();try{if(f.rangeCount){var g=e(0),h=g.endContainer;if(h.nodeType==Node.ELEMENT_NODE){var i=!1;if(h.childNodes.length>0&&h.childNodes[g.endOffset]&&a(h.childNodes[g.endOffset]).text()===c())h=h.childNodes[g.endOffset],i=!0;else if(!g.collapsed&&h.previousSibling&&h.previousSibling.nodeType==Node.ELEMENT_NODE){var j=h.previousSibling;j&&j.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(h=j,i=!0)}else if(!g.collapsed&&h.childNodes.length>0&&h.childNodes[g.endOffset]){var j=h.childNodes[g.endOffset].previousSibling;j.nodeType==Node.ELEMENT_NODE&&j&&j.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(h=j,i=!0)}!i&&h.childNodes.length>0&&a(h.childNodes[h.childNodes.length-1]).text()===c()&&["BR","IMG","HR"].indexOf(h.childNodes[h.childNodes.length-1].tagName)<0&&(h=h.childNodes[h.childNodes.length-1])}for(h.nodeType==Node.TEXT_NODE&&0==g.endOffset&&h.previousSibling&&h.previousSibling.nodeType==Node.ELEMENT_NODE&&(h=h.previousSibling);h.nodeType!=Node.ELEMENT_NODE&&h.parentNode;)h=h.parentNode;for(var k=h;k&&"HTML"!=k.tagName;){if(k==b.el)return h;k=a(k).parent()[0]}}}catch(l){}return b.el}function i(a,b){var c=a;return c.nodeType==Node.ELEMENT_NODE&&c.childNodes.length>0&&c.childNodes[b]&&(c=c.childNodes[b]),c.nodeType==Node.TEXT_NODE&&(c=c.parentNode),c}function j(){var c=[],f=d();if(t()&&f.rangeCount)for(var g=e(),h=0;h<g.length;h++){var j=g[h],k=i(j.startContainer,j.startOffset),l=i(j.endContainer,j.endOffset);b.node.isBlock(k)&&c.indexOf(k)<0&&c.push(k);var m=b.node.blockParent(k);m&&c.indexOf(m)<0&&c.push(m);for(var n=[],o=k;o!==l&&o!==b.el;)n.indexOf(o)<0&&o.children&&o.children.length?(n.push(o),o=o.children[0]):o.nextSibling?o=o.nextSibling:o.parentNode&&(o=o.parentNode,n.push(o)),b.node.isBlock(o)&&n.indexOf(o)<0&&c.indexOf(o)<0&&(o!==l||j.endOffset>0)&&c.push(o);b.node.isBlock(l)&&c.indexOf(l)<0&&j.endOffset>0&&c.push(l);var m=b.node.blockParent(l);m&&c.indexOf(m)<0&&c.push(m)}for(var h=c.length-1;h>0;h--)a(c[h]).find(c).length&&("LI"!=c[h].tagName||1==c[h].children.length&&c.indexOf(c[h].children[0])>=0)&&c.splice(h,1);return c}function k(){if(b.$wp){b.markers.remove();for(var a=e(),c=[],d=0;d<a.length;d++)if(a[d].startContainer!==b.doc){var f=a[d],g=f.collapsed,h=b.markers.place(f,!0,d),i=b.markers.place(f,!1,d);if(b.el.normalize(),b.browser.safari&&!g){var f=b.doc.createRange();f.setStartAfter(h),f.setEndBefore(i),c.push(f)}}if(b.browser.safari&&c.length){b.selection.clear();for(var d=0;d<c.length;d++)b.selection.get().addRange(c[d])}}}function l(){var c=b.el.querySelectorAll('.fr-marker[data-type="true"]');if(!b.$wp)return b.markers.remove(),!1;if(0===c.length)return!1;if(b.browser.msie||b.browser.edge)for(var e=0;e<c.length;e++)c[e].style.display="inline-block";b.core.hasFocus()||b.browser.msie||b.browser.webkit||b.$el.focus(),f();for(var g=d(),e=0;e<c.length;e++){var h=a(c[e]).data("id"),i=c[e],j=b.doc.createRange(),k=b.$el.find('.fr-marker[data-type="false"][data-id="'+h+'"]');(b.browser.msie||b.browser.edge)&&k.css("display","inline-block");var l=null;if(k.length>0){k=k[0];try{for(var n=!1,o=i.nextSibling;o&&o.nodeType==Node.TEXT_NODE&&0==o.textContent.length;){var p=o;o=o.nextSibling,a(p).remove()}for(var q=k.nextSibling;q&&q.nodeType==Node.TEXT_NODE&&0==q.textContent.length;){var p=q;q=q.nextSibling,a(p).remove()}if(i.nextSibling==k||k.nextSibling==i){for(var r=i.nextSibling==k?i:k,s=r==i?k:i,t=r.previousSibling;t&&t.nodeType==Node.TEXT_NODE&&0==t.length;){var p=t;t=t.previousSibling,a(p).remove()}if(t&&t.nodeType==Node.TEXT_NODE)for(;t&&t.previousSibling&&t.previousSibling.nodeType==Node.TEXT_NODE;)t.previousSibling.textContent=t.previousSibling.textContent+t.textContent,t=t.previousSibling,a(t.nextSibling).remove();for(var u=s.nextSibling;u&&u.nodeType==Node.TEXT_NODE&&0==u.length;){var p=u;u=u.nextSibling,a(p).remove()}if(u&&u.nodeType==Node.TEXT_NODE)for(;u&&u.nextSibling&&u.nextSibling.nodeType==Node.TEXT_NODE;)u.nextSibling.textContent=u.textContent+u.nextSibling.textContent,u=u.nextSibling,a(u.previousSibling).remove();if(t&&(b.node.isVoid(t)||b.node.isBlock(t))&&(t=null),u&&(b.node.isVoid(u)||b.node.isBlock(u))&&(u=null),t&&u&&t.nodeType==Node.TEXT_NODE&&u.nodeType==Node.TEXT_NODE){a(i).remove(),a(k).remove();var v=t.textContent.length;t.textContent=t.textContent+u.textContent,a(u).remove(),b.spaces.normalize(t),j.setStart(t,v),j.setEnd(t,v),n=!0}else!t&&u&&u.nodeType==Node.TEXT_NODE?(a(i).remove(),a(k).remove(),b.spaces.normalize(u),l=a(b.doc.createTextNode("\u200b")),a(u).before(l),j.setStart(u,0),j.setEnd(u,0),n=!0):!u&&t&&t.nodeType==Node.TEXT_NODE&&(a(i).remove(),a(k).remove(),b.spaces.normalize(t),l=a(b.doc.createTextNode("\u200b")),a(t).after(l),j.setStart(t,t.textContent.length),j.setEnd(t,t.textContent.length),n=!0)}if(!n){var w,x;if(b.browser.chrome&&i.nextSibling==k)w=m(k,j,!0)||j.setStartAfter(k),x=m(i,j,!1)||j.setEndBefore(i);else{i.previousSibling==k&&(i=k,k=i.nextSibling),k.nextSibling&&"BR"===k.nextSibling.tagName||!k.nextSibling&&b.node.isBlock(i.previousSibling)||i.previousSibling&&"BR"==i.previousSibling.tagName||(i.style.display="inline",k.style.display="inline",l=a(b.doc.createTextNode("\u200b")));var y=i.previousSibling;y&&y.style&&"block"==b.win.getComputedStyle(y).display&&!b.opts.enter==a.FE.ENTER_BR?(j.setEndAfter(y),j.setStartAfter(y)):(w=m(i,j,!0)||a(i).before(l)&&j.setStartBefore(i),x=m(k,j,!1)||a(k).after(l)&&j.setEndAfter(k))}"function"==typeof w&&w(),"function"==typeof x&&x()}}catch(z){}}l&&l.remove();try{g.addRange(j)}catch(z){}}b.markers.remove()}function m(c,d,e){var f=c.previousSibling,g=c.nextSibling;if(f&&g&&f.nodeType==Node.TEXT_NODE&&g.nodeType==Node.TEXT_NODE){var h=f.textContent.length;return e?(g.textContent=f.textContent+g.textContent,a(f).remove(),a(c).remove(),b.spaces.normalize(g),function(){d.setStart(g,h)}):(f.textContent=f.textContent+g.textContent,a(g).remove(),a(c).remove(),b.spaces.normalize(f),function(){d.setEnd(f,h)})}if(f&&!g&&f.nodeType==Node.TEXT_NODE){var h=f.textContent.length;return e?(b.spaces.normalize(f),function(){d.setStart(f,h)}):(b.spaces.normalize(f),function(){d.setEnd(f,h)})}return!(!g||f||g.nodeType!=Node.TEXT_NODE)&&(e?(b.spaces.normalize(g),function(){d.setStart(g,0)}):(b.spaces.normalize(g),function(){d.setEnd(g,0)}))}function n(){return!0}function o(){for(var a=e(),b=0;b<a.length;b++)if(!a[b].collapsed)return!1;return!0}function p(a){var c,d,e=!1,f=!1;if(b.win.getSelection){var g=b.win.getSelection();g.rangeCount&&(c=g.getRangeAt(0),d=c.cloneRange(),d.selectNodeContents(a),d.setEnd(c.startContainer,c.startOffset),e=""===d.toString(),d.selectNodeContents(a),d.setStart(c.endContainer,c.endOffset),f=""===d.toString())}else b.doc.selection&&"Control"!=b.doc.selection.type&&(c=b.doc.selection.createRange(),d=c.duplicate(),d.moveToElementText(a),d.setEndPoint("EndToStart",c),
e=""===d.text,d.moveToElementText(a),d.setEndPoint("StartToEnd",c),f=""===d.text);return{atStart:e,atEnd:f}}function q(){if(o())return!1;b.$el.find("td, th, img").prepend('<span class="fr-mk">'+a.FE.INVISIBLE_SPACE+"</span>");var c=!1,d=p(b.el);return d.atStart&&d.atEnd&&(c=!0),b.$el.find(".fr-mk").remove(),c}function r(c,d){"undefined"==typeof d&&(d=!0);var e=a(c).html();e&&e.replace(/\u200b/g,"").length!=e.length&&a(c).html(e.replace(/\u200b/g,""));for(var f=b.node.contents(c),g=0;g<f.length;g++)f[g].nodeType!=Node.ELEMENT_NODE?a(f[g]).remove():(r(f[g],0==g),0==g&&(d=!1));c.nodeType==Node.TEXT_NODE?a(c).replaceWith('<span data-first="true" data-text="true"></span>'):d&&a(c).attr("data-first",!0)}function s(c,d){var e=b.node.contents(c.get(0));["TD","TH"].indexOf(c.get(0).tagName)>=0&&1==c.find(".fr-marker").length&&b.node.hasClass(e[0],"fr-marker")&&c.attr("data-del-cell",!0);for(var f=0;f<e.length;f++){var g=e[f];b.node.hasClass(g,"fr-marker")?d=(d+1)%2:d?a(g).find(".fr-marker").length>0?d=s(a(g),d):["TD","TH"].indexOf(g.tagName)<0&&!b.node.hasClass(g,"fr-inner")?!b.opts.keepFormatOnDelete||b.$el.find("[data-first]").length>0?a(g).remove():r(g):b.node.hasClass(g,"fr-inner")?0==a(g).find(".fr-inner").length?a(g).html("<br>"):a(g).find(".fr-inner").filter(function(){return 0==a(this).find("fr-inner").length}).html("<br>"):(a(g).empty(),a(g).attr("data-del-cell",!0)):a(g).find(".fr-marker").length>0&&(d=s(a(g),d))}return d}function t(){try{if(!b.$wp)return!1;for(var a=e(0),c=a.commonAncestorContainer;c&&!b.node.isElement(c);)c=c.parentNode;return!!b.node.isElement(c)}catch(d){return!1}}function u(){if(o())return!0;k();for(var c=function(b){for(var c=b.previousSibling;c&&c.nodeType==Node.TEXT_NODE&&0==c.textContent.length;){var d=c,c=c.previousSibling;a(d).remove()}return c},d=function(b){for(var c=b.nextSibling;c&&c.nodeType==Node.TEXT_NODE&&0==c.textContent.length;){var d=c,c=c.nextSibling;a(d).remove()}return c},e=b.$el.find('.fr-marker[data-type="true"]'),f=0;f<e.length;f++)for(var g=e[f];!c(g)&&!b.node.isBlock(g.parentNode)&&!b.$el.is(g.parentNode);)a(g.parentNode).before(g);for(var h=b.$el.find('.fr-marker[data-type="false"]'),f=0;f<h.length;f++){for(var i=h[f];!d(i)&&!b.node.isBlock(i.parentNode)&&!b.$el.is(i.parentNode);)a(i.parentNode).after(i);i.parentNode&&b.node.isBlock(i.parentNode)&&b.node.isEmpty(i.parentNode)&&!b.$el.is(i.parentNode)&&b.opts.keepFormatOnDelete&&a(i.parentNode).after(i)}if(n()){s(b.$el,0);var j=b.$el.find('[data-first="true"]');if(j.length)b.$el.find(".fr-marker").remove(),j.append(a.FE.INVISIBLE_SPACE+a.FE.MARKERS).removeAttr("data-first"),j.attr("data-text")&&j.replaceWith(j.html());else{b.$el.find("table").filter(function(){var b=a(this).find("[data-del-cell]").length>0&&a(this).find("[data-del-cell]").length==a(this).find("td, th").length;return b}).remove(),b.$el.find("[data-del-cell]").removeAttr("data-del-cell");for(var e=b.$el.find('.fr-marker[data-type="true"]'),f=0;f<e.length;f++){var m=e[f],p=m.nextSibling,q=b.$el.find('.fr-marker[data-type="false"][data-id="'+a(m).data("id")+'"]').get(0);if(q){if(p&&p==q);else if(m){var r=b.node.blockParent(m),t=b.node.blockParent(q),u=!1,v=!1;if(r&&["UL","OL"].indexOf(r.tagName)>=0&&(r=null,u=!0),t&&["UL","OL"].indexOf(t.tagName)>=0&&(t=null,v=!0),a(m).after(q),r==t);else if(null!=r||u)if(null!=t||v||0!=a(r).parentsUntil(b.$el,"table").length)r&&t&&0==a(r).parentsUntil(b.$el,"table").length&&0==a(t).parentsUntil(b.$el,"table").length&&(a(r).append(a(t).html()),a(t).remove());else{for(var p=r;!p.nextSibling&&p.parentNode!=b.el;)p=p.parentNode;for(p=p.nextSibling;p&&"BR"!=p.tagName;){var w=p.nextSibling;a(r).append(p),p=w}p&&"BR"==p.tagName&&a(p).remove()}else{var x=b.node.deepestParent(m);x?(a(x).after(a(t).html()),a(t).remove()):0==a(t).parentsUntil(b.$el,"table").length&&(a(m).next().after(a(t).html()),a(t).remove())}}}else q=a(m).clone().attr("data-type",!1),a(m).after(q)}}}b.opts.keepFormatOnDelete||b.html.fillEmptyBlocks(),b.html.cleanEmptyTags(!0),b.clean.lists(),b.spaces.normalize();var y=b.$el.find(".fr-marker:last").get(0),z=b.$el.find(".fr-marker:first").get(0);!y.nextSibling&&z.previousSibling&&"BR"==z.previousSibling.tagName&&b.node.isElement(y.parentNode)&&b.node.isElement(z.parentNode)&&b.$el.append("<br>"),l()}function v(c){if(!c||c.getElementsByClassName("fr-marker").length>0)return!1;for(var d=c.firstChild;d&&b.node.isBlock(d);)c=d,d=d.firstChild;c.innerHTML=a.FE.MARKERS+c.innerHTML}function w(c){if(!c||c.getElementsByClassName("fr-marker").length>0)return!1;for(var d=c.lastChild;d&&b.node.isBlock(d);)c=d,d=d.lastChild;c.innerHTML=c.innerHTML+a.FE.MARKERS}function x(c,d){"undefined"==typeof d&&(d=!0);for(var e=c.previousSibling;e&&e.nodeType==Node.TEXT_NODE&&0==e.textContent.length;)e=e.previousSibling;return e?(b.node.isBlock(e)?w(e):"BR"==e.tagName?a(e).before(a.FE.MARKERS):a(e).after(a.FE.MARKERS),!0):!!d&&(b.node.isBlock(c)?v(c):a(c).before(a.FE.MARKERS),!0)}function y(c,d){"undefined"==typeof d&&(d=!0);for(var e=c.nextSibling;e&&e.nodeType==Node.TEXT_NODE&&0==e.textContent.length;)e=e.nextSibling;return e?(b.node.isBlock(e)?v(e):a(e).before(a.FE.MARKERS),!0):!!d&&(b.node.isBlock(c)?w(c):a(c).after(a.FE.MARKERS),!0)}return{text:c,get:d,ranges:e,clear:f,element:g,endElement:h,save:k,restore:l,isCollapsed:o,isFull:q,inEditor:t,remove:u,blocks:j,info:p,setAtEnd:w,setAtStart:v,setBefore:x,setAfter:y,rangeElement:i}},a.extend(a.FE.DEFAULTS,{htmlAllowedTags:["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","br","button","canvas","caption","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meter","nav","noscript","object","ol","optgroup","option","output","p","param","pre","progress","queue","rp","rt","ruby","s","samp","script","style","section","select","small","source","span","strike","strong","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","var","video","wbr"],htmlRemoveTags:["script","style"],htmlAllowedAttrs:["accept","accept-charset","accesskey","action","align","allowfullscreen","allowtransparency","alt","async","autocomplete","autofocus","autoplay","autosave","background","bgcolor","border","charset","cellpadding","cellspacing","checked","cite","class","color","cols","colspan","content","contenteditable","contextmenu","controls","coords","data","data-.*","datetime","default","defer","dir","dirname","disabled","download","draggable","dropzone","enctype","for","form","formaction","frameborder","headers","height","hidden","high","href","hreflang","http-equiv","icon","id","ismap","itemprop","keytype","kind","label","lang","language","list","loop","low","max","maxlength","media","method","min","mozallowfullscreen","multiple","name","novalidate","open","optimum","pattern","ping","placeholder","poster","preload","pubdate","radiogroup","readonly","rel","required","reversed","rows","rowspan","sandbox","scope","scoped","scrolling","seamless","selected","shape","size","sizes","span","src","srcdoc","srclang","srcset","start","step","summary","spellcheck","style","tabindex","target","title","type","translate","usemap","value","valign","webkitallowfullscreen","width","wrap"],htmlAllowComments:!0,fullPage:!1}),a.FE.HTML5Map={B:"STRONG",I:"EM",STRIKE:"S"},a.FE.MODULES.clean=function(b){function c(a){if(a.nodeType==Node.ELEMENT_NODE&&a.getAttribute("class")&&a.getAttribute("class").indexOf("fr-marker")>=0)return!1;var d,e=b.node.contents(a),f=[];for(d=0;d<e.length;d++)e[d].nodeType!=Node.ELEMENT_NODE||b.node.isVoid(e[d])?e[d].nodeType==Node.TEXT_NODE&&(e[d].textContent=e[d].textContent.replace(/\u200b/g,"").replace(/&/g,"&amp;")):e[d].textContent.replace(/\u200b/g,"").length!=e[d].textContent.length&&c(e[d]);if(a.nodeType==Node.ELEMENT_NODE&&!b.node.isVoid(a)&&(a.normalize(),e=b.node.contents(a),f=a.querySelectorAll(".fr-marker"),e.length-f.length==0)){for(d=0;d<e.length;d++)if((e[d].getAttribute("class")||"").indexOf("fr-marker")<0)return!1;for(d=0;d<f.length;d++)a.parentNode.insertBefore(f[d].cloneNode(!0),a);return a.parentNode.removeChild(a),!1}}function d(a){if(a.nodeType==Node.COMMENT_NODE)return"<!--"+a.nodeValue+"-->";if(a.nodeType==Node.TEXT_NODE)return a.textContent.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\u00A0/g,"&nbsp;");if(a.nodeType!=Node.ELEMENT_NODE)return a.outerHTML;if(a.nodeType==Node.ELEMENT_NODE&&["STYLE","SCRIPT"].indexOf(a.tagName)>=0)return a.outerHTML;if(a.nodeType==Node.ELEMENT_NODE&&"svg"==a.tagName){var c=document.createElement("div"),e=a.cloneNode(!0);return c.appendChild(e),c.innerHTML}if("IFRAME"==a.tagName)return a.outerHTML;var f=a.childNodes;if(0===f.length)return a.outerHTML;for(var g="",h=0;h<f.length;h++)g+=d(f[h]);return b.node.openTagString(a)+g+b.node.closeTagString(a)}function e(a){return H=[],a=a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,function(a){return H.push(a),"[FROALA.EDITOR.SCRIPT "+(H.length-1)+"]"}),a=a.replace(/<img((?:[\w\W]*?)) src="/g,'<img$1 data-fr-src="')}function f(a){return a=a.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi,function(a,c){return b.opts.htmlRemoveTags.indexOf("script")>=0?"":H[parseInt(c,10)]}),a=a.replace(/<img((?:[\w\W]*?)) data-fr-src="/g,'<img$1 src="')}function g(a){var b;for(b in a)a.hasOwnProperty(b)&&(b.match(G)||delete a[b]);for(var c="",d=Object.keys(a).sort(),e=0;e<d.length;e++)b=d[e],c+=a[b].indexOf('"')<0?" "+b+'="'+a[b]+'"':" "+b+"='"+a[b]+"'";return c}function h(a,c,d){if(b.opts.fullPage){var e=b.html.extractDoctype(d),f=g(b.html.extractNodeAttrs(d,"html"));c=null==c?b.html.extractNode(d,"head")||"<title></title>":c;var h=g(b.html.extractNodeAttrs(d,"head")),i=g(b.html.extractNodeAttrs(d,"body"));return e+"<html"+f+"><head"+h+">"+c+"</head><body"+i+">"+a+"</body></html>"}return a}function i(c,e){var f=a("<div>"+c+"</div>"),g="";if(f){for(var h=b.node.contents(f.get(0)),i=0;i<h.length;i++)e(h[i]);h=b.node.contents(f.get(0));for(var i=0;i<h.length;i++)g+=d(h[i])}return g}function j(a,c,d){a=e(a);var g=a,j=null;if(b.opts.fullPage){var g=b.html.extractNode(a,"body")||(a.indexOf("<body")>=0?"":a);d&&(j=b.html.extractNode(a,"head")||"")}g=i(g,c),j&&(j=i(j,c));var k=h(g,j,a);return f(k)}function k(a){return a.replace(/\u200b/g,"").length==a.length?a:b.clean.exec(a,c)}function l(){var c=b.el.querySelectorAll(Object.keys(a.FE.HTML5Map).join(","));if(c.length){var d=!1;b.el.querySelector(".fr-marker")||(b.selection.save(),d=!0);for(var e=0;e<c.length;e++)""===b.node.attributes(c[e])&&a(c[e]).replaceWith("<"+a.FE.HTML5Map[c[e].tagName]+">"+c[e].innerHTML+"</"+a.FE.HTML5Map[c[e].tagName]+">");d&&b.selection.restore()}}function m(c){if("SPAN"==c.tagName&&(c.getAttribute("class")||"").indexOf("fr-marker")>=0)return!1;if("PRE"==c.tagName&&o(c),c.nodeType==Node.ELEMENT_NODE&&(c.getAttribute("data-fr-src")&&c.setAttribute("data-fr-src",b.helpers.sanitizeURL(c.getAttribute("data-fr-src"))),c.getAttribute("href")&&c.setAttribute("href",b.helpers.sanitizeURL(c.getAttribute("href"))),["TABLE","TBODY","TFOOT","TR"].indexOf(c.tagName)>=0&&(c.innerHTML=c.innerHTML.trim())),!b.opts.pasteAllowLocalImages&&c.nodeType==Node.ELEMENT_NODE&&"IMG"==c.tagName&&c.getAttribute("data-fr-src")&&0==c.getAttribute("data-fr-src").indexOf("file://"))return c.parentNode.removeChild(c),!1;if(c.nodeType==Node.ELEMENT_NODE&&a.FE.HTML5Map[c.tagName]&&""===b.node.attributes(c)){var d=a.FE.HTML5Map[c.tagName],e="<"+d+">"+c.innerHTML+"</"+d+">";c.insertAdjacentHTML("beforebegin",e),c=c.previousSibling,c.parentNode.removeChild(c.nextSibling)}if(b.opts.htmlAllowComments||c.nodeType!=Node.COMMENT_NODE)if(c.tagName&&c.tagName.match(F))c.parentNode.removeChild(c);else if(c.tagName&&!c.tagName.match(E))c.outerHTML=c.innerHTML;else{var f=c.attributes;if(f)for(var g=f.length-1;g>=0;g--){var h=f[g];h.nodeName.match(G)||c.removeAttribute(h.nodeName)}}else 0!==c.data.indexOf("[FROALA.EDITOR")&&c.parentNode.removeChild(c)}function n(a){for(var c=b.node.contents(a),d=0;d<c.length;d++)c[d].nodeType!=Node.TEXT_NODE&&n(c[d]);m(a)}function o(a){var b=a.innerHTML;b.indexOf("\n")>=0&&(a.innerHTML=b.replace(/\n/g,"<br>"))}function p(c,d,e,f){"undefined"==typeof d&&(d=[]),"undefined"==typeof e&&(e=[]),"undefined"==typeof f&&(f=!1),c=c.replace(/\u0009/g,"");var g,h=a.merge([],b.opts.htmlAllowedTags);for(g=0;g<d.length;g++)h.indexOf(d[g])>=0&&h.splice(h.indexOf(d[g]),1);var i=a.merge([],b.opts.htmlAllowedAttrs);for(g=0;g<e.length;g++)i.indexOf(e[g])>=0&&i.splice(i.indexOf(e[g]),1);return i.push("data-fr-.*"),i.push("fr-.*"),E=new RegExp("^"+h.join("$|^")+"$","gi"),G=new RegExp("^"+i.join("$|^")+"$","gi"),F=new RegExp("^"+b.opts.htmlRemoveTags.join("$|^")+"$","gi"),c=j(c,n,!0)}function q(){for(var c=b.el.querySelectorAll("blockquote + blockquote"),d=0;d<c.length;d++){var e=c[d];b.node.attributes(e)==b.node.attributes(e.previousSibling)&&(a(e).prev().append(a(e).html()),a(e).remove())}}function r(){for(var a=b.el.querySelectorAll("tr"),c=0;c<a.length;c++){for(var d=a[c].children,e=!0,f=0;f<d.length;f++)if("TH"!=d[f].tagName){e=!1;break}if(0!=e&&0!=d.length){for(var g=a[c];g&&"TABLE"!=g.tagName&&"THEAD"!=g.tagName;)g=g.parentNode;var h=g;"THEAD"!=h.tagName&&(h=b.doc.createElement("THEAD"),g.insertBefore(h,g.firstChild)),h.appendChild(a[c])}}}function s(){var c=b.html.defaultTag();if(c)for(var d=b.el.querySelectorAll("td > "+c+", th > "+c),e=0;e<d.length;e++)""===b.node.attributes(d[e])&&a(d[e]).replaceWith(d[e].innerHTML+"<br>")}function t(){r(),s()}function u(){var a=[],c=function(a){return!b.node.isList(a.parentNode)};do{if(a.length){var d=a[0],e=b.doc.createElement("ul");d.parentNode.insertBefore(e,d);do{var f=d;d=d.nextSibling,e.appendChild(f)}while(d&&"LI"==d.tagName)}a=[];for(var g=b.el.querySelectorAll("li"),h=0;h<g.length;h++)c(g[h])&&a.push(g[h])}while(a.length>0)}function v(){for(var a=b.el.querySelectorAll("ol + ol, ul + ul"),c=0;c<a.length;c++){var d=a[c];if(b.node.isList(d.previousSibling)&&b.node.openTagString(d)==b.node.openTagString(d.previousSibling)){for(var e=b.node.contents(d),f=0;f<e.length;f++)d.previousSibling.appendChild(e[f]);d.parentNode.removeChild(d)}}}function w(){var a,c=function(b){b.querySelector("LI")||(a=!0,b.parentNode.removeChild(b))};do{a=!1;for(var d=b.el.querySelectorAll("li:empty"),e=0;e<d.length;e++)d[e].parentNode.removeChild(d[e]);for(var f=b.el.querySelectorAll("ul, ol"),e=0;e<f.length;e++)c(f[e])}while(a===!0)}function x(){for(var c=b.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"),d=0;d<c.length;d++){var e=c[d],f=e.previousSibling;f&&("LI"==f.tagName?f.appendChild(e):a(e).wrap("<li></li>"))}}function y(){for(var c=b.el.querySelectorAll("li > ul, li > ol"),d=0;d<c.length;d++){var e=c[d];if(e.nextSibling){var f=e.nextSibling,g=a("<li>");a(e.parentNode).after(g);do{var h=f;f=f.nextSibling,g.append(h)}while(f)}}}function z(){for(var c=b.el.querySelectorAll("li > ul, li > ol"),d=0;d<c.length;d++){var e=c[d];if(b.node.isFirstSibling(e))a(e).before("<br/>");else if(e.previousSibling&&"BR"==e.previousSibling.tagName){for(var f=e.previousSibling.previousSibling;f&&b.node.hasClass(f,"fr-marker");)f=f.previousSibling;f&&"BR"!=f.tagName&&a(e.previousSibling).remove()}}}function A(){for(var c=b.el.querySelectorAll("li:empty"),d=0;d<c.length;d++)a(c[d]).remove()}function B(){for(var c=b.el.querySelectorAll("ul, ol"),d=0;d<c.length;d++)for(var e=b.node.contents(c[d]),f=null,g=e.length-1;g>=0;g--)"LI"!=e[g].tagName?(f||(f=a("<li>"),f.insertBefore(e[g])),f.prepend(e[g])):f=null}function C(){u(),v(),w(),x(),y(),z(),B(),A()}function D(){b.opts.fullPage&&a.merge(b.opts.htmlAllowedTags,["head","title","style","link","base","body","html","meta"])}var E,F,G,H=[],H=[];return{_init:D,html:p,toHTML5:l,tables:t,lists:C,quotes:q,invisibleSpaces:k,exec:j}},a.FE.MODULES.spaces=function(b){function c(c,d){var e=c.previousSibling,f=c.nextSibling,g=c.textContent,h=c.parentNode;d&&(g=g.replace(/[\f\n\r\t\v ]{2,}/g," "),(!f||b.node.isVoid(f)||b.node.isBlock(f))&&b.node.isBlock(h)&&(g=g.replace(/[\f\n\r\t\v ]{1,}$/g,"")),(!e||b.node.isVoid(e)||b.node.isBlock(e))&&b.node.isBlock(h)&&(g=g.replace(/^[\f\n\r\t\v ]{1,}/g,""))),g=g.replace(new RegExp(a.FE.UNICODE_NBSP,"g")," ");for(var i="",j=0;j<g.length;j++)i+=32!=g.charCodeAt(j)||0!==j&&32!=i.charCodeAt(j-1)?g[j]:a.FE.UNICODE_NBSP;(!f||b.node.isBlock(f)||f.nodeType==Node.ELEMENT_NODE&&b.win.getComputedStyle(f)&&"block"==b.win.getComputedStyle(f).display)&&(i=i.replace(/ $/,a.FE.UNICODE_NBSP)),!e||b.node.isVoid(e)||b.node.isBlock(e)||(i=i.replace(/^\u00A0([^ $])/," $1"),1!==i.length||160!==i.charCodeAt(0)||!f||b.node.isVoid(f)||b.node.isBlock(f)||(i=" ")),i=i.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g,"$1 $2"),c.textContent!=i&&(c.textContent=i)}function d(a,d){if("undefined"!=typeof a&&a||(a=b.el),"undefined"==typeof d&&(d=!1),!a.getAttribute||"false"!=a.getAttribute("contenteditable"))if(a.nodeType==Node.TEXT_NODE)c(a,d);else if(a.nodeType==Node.ELEMENT_NODE)for(var e=b.doc.createTreeWalker(a,NodeFilter.SHOW_TEXT,b.node.filter(function(a){return null!=a.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g)&&!b.node.hasClass(a.parentNode,"fr-marker")}),!1);e.nextNode();)c(e.currentNode,d)}function e(){for(var a=[],c=b.el.querySelectorAll(".fr-marker"),e=0;e<c.length;e++){var f=null,g=b.node.blockParent(c[e]);f=g?g:c[e];for(var h=f.nextSibling,i=f.previousSibling;h&&"BR"==h.tagName;)h=h.nextSibling;for(;i&&"BR"==i.tagName;)i=i.previousSibling;f&&a.indexOf(f)<0&&a.push(f),i&&a.indexOf(i)<0&&a.push(i),h&&a.indexOf(h)<0&&a.push(h)}for(var j=0;j<a.length;j++)d(a[j])}return{normalize:d,normalizeAroundCursor:e}},a.FE.UNICODE_NBSP=String.fromCharCode(160),a.FE.VOID_ELEMENTS=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],a.FE.BLOCK_TAGS=["address","article","aside","audio","blockquote","canvas","dd","div","dl","dt","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","li","main","nav","noscript","ol","output","p","pre","section","table","tbody","td","tfoot","th","thead","tr","ul","video"],a.extend(a.FE.DEFAULTS,{htmlAllowedEmptyTags:["textarea","a","iframe","object","video","style","script",".fa",".fr-emoticon"],htmlDoNotWrapTags:["script","style"],htmlSimpleAmpersand:!1,htmlIgnoreCSSProperties:[]}),a.FE.MODULES.html=function(b){function c(){return b.opts.enter==a.FE.ENTER_P?"p":b.opts.enter==a.FE.ENTER_DIV?"div":b.opts.enter==a.FE.ENTER_BR?null:void 0}function d(c){var d=[],e=[];if(c)for(var g=b.el.querySelectorAll(".fr-marker"),h=0;h<g.length;h++){var i=b.node.blockParent(g[h])||g[h];if(i){var j=i.nextSibling,k=i.previousSibling;i&&e.indexOf(i)<0&&b.node.isBlock(i)&&e.push(i),k&&b.node.isBlock(k)&&e.indexOf(k)<0&&e.push(k),j&&b.node.isBlock(j)&&e.indexOf(j)<0&&e.push(j)}}else e=b.el.querySelectorAll(f());var l=f();l+=","+a.FE.VOID_ELEMENTS.join(","),l+=","+b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),")+":not(.fr-marker)";for(var h=e.length-1;h>=0;h--)if(!(e[h].textContent&&e[h].textContent.replace(/\u200B|\n/g,"").length>0||e[h].querySelectorAll(l).length>0)){for(var m=b.node.contents(e[h]),n=!1,o=0;o<m.length;o++)if(m[o].nodeType!=Node.COMMENT_NODE&&m[o].textContent&&m[o].textContent.replace(/\u200B|\n/g,"").length>0){n=!0;break}n||d.push(e[h])}return d}function e(){return a.FE.BLOCK_TAGS.join(":empty, ")+":empty"}function f(){return a.FE.BLOCK_TAGS.join(", ")}function g(c){var d=a.merge([],a.FE.VOID_ELEMENTS);d=a.merge(d,b.opts.htmlAllowedEmptyTags),"undefined"==typeof c&&(d=a.merge(d,a.FE.BLOCK_TAGS));var e,f;e=b.el.querySelectorAll("*:empty:not("+d.join("):not(")+"):not(.fr-marker)");do{f=!1;for(var g=0;g<e.length;g++)0!==e[g].attributes.length&&"undefined"==typeof e[g].getAttribute("href")||(e[g].parentNode.removeChild(e[g]),f=!0);e=b.el.querySelectorAll("*:empty:not("+d.join("):not(")+"):not(.fr-marker)")}while(e.length&&f)}function h(a,d){var e=c();if(d&&(e="div"),e){for(var f=b.doc.createDocumentFragment(),g=null,h=!1,i=a.firstChild;i;){var j=i.nextSibling;if(i.nodeType==Node.ELEMENT_NODE&&(b.node.isBlock(i)||b.opts.htmlDoNotWrapTags.indexOf(i.tagName.toLowerCase())>=0&&!b.node.hasClass(i,"fr-marker")))g=null,f.appendChild(i);else if(i.nodeType!=Node.ELEMENT_NODE&&i.nodeType!=Node.TEXT_NODE)g=null,f.appendChild(i);else if("BR"==i.tagName)j&&"BR"==j.tagName&&(j=j.nextSibling),null==g?(g=b.doc.createElement(e),d&&g.setAttribute("data-empty",!0),g.appendChild(i),f.appendChild(g)):h===!1&&(g.appendChild(b.doc.createElement("br")),g.setAttribute("data-empty",!0)),g=null;else{var k=i.textContent;i.nodeType==Node.TEXT_NODE&&0==k.replace(/\n/g,"").replace(/(^ *)|( *$)/g,"").length||(null==g&&(g=b.doc.createElement(e),d&&g.setAttribute("class","fr-temp-div"),f.appendChild(g),h=!1),g.appendChild(i),h||b.node.hasClass(i,"fr-marker")||i.nodeType==Node.TEXT_NODE&&0===k.replace(/ /g,"").length||(h=!0))}i=j}a.innerHTML="",a.appendChild(f)}}function i(a,b){for(var c=0;c<a.length;c++)h(a[c],b)}function j(a,c,d,e){return!!b.$wp&&("undefined"==typeof a&&(a=!1),"undefined"==typeof c&&(c=!1),"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=!1),h(b.el,a),e&&i(b.el.querySelectorAll(".fr-inner"),a),c&&i(b.el.querySelectorAll("td, th"),a),void(d&&i(b.el.querySelectorAll("blockquote"),a)))}function k(){b.$el.find("div.fr-temp-div").each(function(){a(this).data("empty")||"LI"==this.parentNode.tagName||b.node.isBlock(this.previousSibling)?a(this).replaceWith(a(this).html()):a(this).replaceWith(a(this).html()+"<br>")}),b.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function(){return""==a(this).attr("class")}).removeAttr("class")}function l(c){for(var e=d(c),f=0;f<e.length;f++){var g=e[f];"false"==g.getAttribute("contenteditable")||g.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),")+":not(.fr-marker)")||b.node.isVoid(g)||"TABLE"!=g.tagName&&"TBODY"!=g.tagName&&"TR"!=g.tagName&&g.appendChild(b.doc.createElement("br"))}if(b.browser.msie&&b.opts.enter==a.FE.ENTER_BR){var h=b.node.contents(b.el);h.length&&h[h.length-1].nodeType==Node.TEXT_NODE&&b.$el.append("<br>")}}function m(){return b.$el.get(0).querySelectorAll(f())}function n(a){if("undefined"==typeof a&&(a=b.el),a&&["SCRIPT","STYLE","PRE"].indexOf(a.tagName)>=0)return!1;for(var c=b.doc.createTreeWalker(a,NodeFilter.SHOW_TEXT,b.node.filter(function(a){return null!=a.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g)}),!1);c.nextNode();){var d=c.currentNode,e=b.node.isBlock(d.parentNode)||b.node.isElement(d.parentNode),f=d.textContent.replace(/(?!^)( ){2,}(?!$)/g," ").replace(/\n/g," ").replace(/^[ ]{2,}/g," ").replace(/[ ]{2,}$/g," ");if(e){var g=d.previousSibling,h=d.nextSibling;g&&h&&" "==f?f=b.node.isBlock(g)&&b.node.isBlock(h)?"":"\n":(g||(f=f.replace(/^ */,"")),h||(f=f.replace(/ *$/,"")))}d.textContent=f}}function o(a,b,c){var d=new RegExp(b,"gi"),e=d.exec(a);return e?e[c]:null}function p(a,b){var c=a.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);return c?b.implementation.createDocumentType(c[1],c[3],c[4]):b.implementation.createDocumentType("html")}function q(a){var b=a.doctype,c="<!DOCTYPE html>";return b&&(c="<!DOCTYPE "+b.name+(b.publicId?' PUBLIC "'+b.publicId+'"':"")+(!b.publicId&&b.systemId?" SYSTEM":"")+(b.systemId?' "'+b.systemId+'"':"")+">"),c}function r(c,d){var e=c.parentNode;if(e&&(b.node.isBlock(e)||b.node.isElement(e))&&["TD","TH"].indexOf(e.tagName)<0){var f=c.previousSibling,g=c.nextSibling;f&&e&&"BR"!=f.tagName&&!b.node.isBlock(f)&&!g&&e.textContent.replace(/\u200B/g,"").length>0&&f.textContent.length>0&&!b.node.hasClass(f,"fr-marker")&&(b.el==e&&!g&&b.opts.enter==a.FE.ENTER_BR&&b.browser.msie||(d&&b.selection.save(),c.parentNode.removeChild(c),d&&b.selection.restore()))}}function s(){var a,c=b.selection.element();a=b.node.isBlock(c)?c:b.node.blockParent(c);var d=[];if(a){var e=a.nextSibling,f=a.previousSibling;a&&d.indexOf(a)<0&&d.push(a),f&&b.node.isBlock(f)&&d.indexOf(f)<0&&d.push(f),e&&b.node.isBlock(e)&&d.indexOf(e)<0&&d.push(e)}for(var g=[],h=0;h<d.length;h++)for(var i=d[h].querySelectorAll("br"),j=0;j<i.length;j++)g.indexOf(i[j])<0&&g.push(i[j]);if(c.parentNode==b.el)for(var k=b.el.children,h=0;h<k.length;h++)"BR"==k[h].tagName&&g.indexOf(k[h])<0&&g.push(k[h]);return g}function t(a,c){var d;if(a){d=s();for(var e=0;e<d.length;e++)r(d[e],c)}else{d=b.el.getElementsByTagName("br");for(var e=0;e<d.length;e++)r(d[e],c)}}function u(){g(),j(),n(),b.spaces.normalize(null,!0),b.html.fillEmptyBlocks(),b.clean.quotes(),b.clean.lists(),b.clean.tables(),b.clean.toHTML5(),b.html.cleanBRs(),b.selection.restore(),v(),b.placeholder.refresh()}function v(){b.core.isEmpty()&&(null!=c()?b.el.querySelector(f())||b.el.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),")+":not(.fr-marker)")||(b.core.hasFocus()?(b.$el.html("<"+c()+">"+a.FE.MARKERS+"<br/></"+c()+">"),b.selection.restore()):b.$el.html("<"+c()+"><br/></"+c()+">")):b.el.querySelector("*:not(.fr-marker):not(br)")||(b.core.hasFocus()?(b.$el.html(a.FE.MARKERS+"<br/>"),b.selection.restore()):b.$el.html("<br/>")))}function w(a,b){return o(a,"<"+b+"[^>]*?>([\\w\\W]*)</"+b+">",1)}function x(c,d){var e=a("<div "+(o(c,"<"+d+"([^>]*?)>",1)||"")+">");return b.node.rawAttributes(e.get(0))}function y(a){return o(a,"<!DOCTYPE([^>]*?)>",0)||"<!DOCTYPE html>"}function z(c){var d=b.clean.html(c||"",[],[],b.opts.fullPage);if(b.opts.fullPage){var e=w(d,"body")||(d.indexOf("<body")>=0?"":d),f=x(d,"body"),g=w(d,"head")||"<title></title>",h=x(d,"head"),i=a("<div>").append(g).contents().each(function(){(this.nodeType==Node.COMMENT_NODE||["BASE","LINK","META","NOSCRIPT","SCRIPT","STYLE","TEMPLATE","TITLE"].indexOf(this.tagName)>=0)&&this.parentNode.removeChild(this)}).end().html().trim();g=a("<div>").append(g).contents().map(function(){return this.nodeType==Node.COMMENT_NODE?"<!--"+this.nodeValue+"-->":["BASE","LINK","META","NOSCRIPT","SCRIPT","STYLE","TEMPLATE","TITLE"].indexOf(this.tagName)>=0?this.outerHTML:""}).toArray().join("");var j=y(d),k=x(d,"html");b.$el.html(i+"\n"+e),b.node.clearAttributes(b.el),b.$el.attr(f),b.$el.addClass("fr-view"),b.$el.attr("spellcheck",b.opts.spellcheck),b.$el.attr("dir",b.opts.direction),b.$head.html(g),b.node.clearAttributes(b.$head.get(0)),b.$head.attr(h),b.node.clearAttributes(b.$html.get(0)),b.$html.attr(k),b.iframe_document.doctype.parentNode.replaceChild(p(j,b.iframe_document),b.iframe_document.doctype)}else b.$el.html(d);var l=b.edit.isDisabled();b.edit.on(),b.core.injectStyle(b.opts.iframeStyle),u(),b.opts.useClasses||(b.$el.find("[fr-original-class]").each(function(){this.setAttribute("class",this.getAttribute("fr-original-class")),this.removeAttribute("fr-original-class")}),b.$el.find("[fr-original-style]").each(function(){this.setAttribute("style",this.getAttribute("fr-original-style")),this.removeAttribute("fr-original-style")})),l&&b.edit.off(),b.events.trigger("html.set")}function A(a,c){if(!b.$wp)return b.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;var d="";b.events.trigger("html.beforeGet");var e,f=function(a){var b=/(#[^\s\+>~\.\[:]+)/g,c=/(\[[^\]]+\])/g,d=/(\.[^\s\+>~\.\[:]+)/g,e=/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,f=/(:[\w-]+\([^\)]*\))/gi,g=/(:[^\s\+>~\.\[:]+)/g,h=/([^\s\+>~\.\[:]+)/g;!function(){var b=/:not\(([^\)]*)\)/g;b.test(a)&&(a=a.replace(b,"     $1 "))}();var i=100*(a.match(b)||[]).length+10*(a.match(c)||[]).length+10*(a.match(d)||[]).length+10*(a.match(f)||[]).length+10*(a.match(g)||[]).length+(a.match(e)||[]).length;return a=a.replace(/[\*\s\+>~]/g," "),a=a.replace(/[#\.]/g," "),i+=(a.match(h)||[]).length},g=[],h={};if(!b.opts.useClasses&&!c){var i=new RegExp("^"+b.opts.htmlIgnoreCSSProperties.join("$|^")+"$","gi");for(e=0;e<b.doc.styleSheets.length;e++){var j,k=0;try{j=b.doc.styleSheets[e].cssRules,b.doc.styleSheets[e].ownerNode&&"STYLE"==b.doc.styleSheets[e].ownerNode.nodeType&&(k=1)}catch(l){}if(j)for(var m=0,n=j.length;m<n;m++)if(j[m].selectorText&&j[m].style.cssText.length>0){var o,p=j[m].selectorText.replace(/body |\.fr-view /g,"").replace(/::/g,":");try{o=b.el.querySelectorAll(p)}catch(l){o=[]}for(var r=0;r<o.length;r++){!o[r].getAttribute("fr-original-style")&&o[r].getAttribute("style")?(o[r].setAttribute("fr-original-style",o[r].getAttribute("style")),g.push(o[r])):o[r].getAttribute("fr-original-style")||g.push(o[r]),h[o[r]]||(h[o[r]]={});for(var s=1e3*k+f(j[m].selectorText),t=j[m].style.cssText.split(";"),u=0;u<t.length;u++){var v=t[u].trim().split(":")[0];v.match(i)||(h[o[r]][v]||(h[o[r]][v]=0,(o[r].getAttribute("fr-original-style")||"").indexOf(v+":")>=0&&(h[o[r]][v]=1e4)),s>=h[o[r]][v]&&(h[o[r]][v]=s,t[u].trim().length&&(o[r].style[v.trim()]=t[u].trim().split(":")[1].trim())))}}}}for(e=0;e<g.length;e++)if(g[e].getAttribute("class")&&(g[e].setAttribute("fr-original-class",g[e].getAttribute("class")),g[e].removeAttribute("class")),(g[e].getAttribute("fr-original-style")||"").trim().length>0)for(var w=g[e].getAttribute("fr-original-style").split(";"),r=0;r<w.length;r++)w[r].indexOf(":")>0&&(g[e].style[w[r].split(":")[0].trim()]=w[r].split(":")[1].trim())}if(b.core.isEmpty()?b.opts.fullPage&&(d=q(b.iframe_document),d+="<html"+b.node.attributes(b.$html.get(0))+">"+b.$html.find("head").get(0).outerHTML+"<body></body></html>"):("undefined"==typeof a&&(a=!1),b.opts.fullPage?(d=q(b.iframe_document),b.$el.removeClass("fr-view"),d+="<html"+b.node.attributes(b.$html.get(0))+">"+b.$html.html()+"</html>",b.$el.addClass("fr-view")):d=b.$el.html()),!b.opts.useClasses&&!c)for(e=0;e<g.length;e++)g[e].getAttribute("fr-original-class")&&(g[e].setAttribute("class",g[e].getAttribute("fr-original-class")),g[e].removeAttribute("fr-original-class")),g[e].getAttribute("fr-original-style")?(g[e].setAttribute("style",g[e].getAttribute("fr-original-style")),g[e].removeAttribute("fr-original-style")):g[e].removeAttribute("style");b.opts.fullPage&&(d=d.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g,""),d=d.replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g,""),d=d.replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g,""),d=d.replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$2>$3</body>"),d=d.replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$3>$4</body>"),d=d.replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$3>$4</body>"),d=d.replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,'<body$1class="$2$4"$5>$6</body>'),d=d.replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$2>$3</body>")),b.opts.htmlSimpleAmpersand&&(d=d.replace(/\&amp;/gi,"&")),b.events.trigger("html.afterGet"),a||(d=d.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi,"")),d=b.clean.invisibleSpaces(d);var x=b.events.chainTrigger("html.get",d);return"string"==typeof x&&(d=x),d=d.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g,function(a){return a.replace(/<br>/g,"\n")})}function B(){var c=function(c,d){for(;d&&(d.nodeType==Node.TEXT_NODE||!b.node.isBlock(d))&&!b.node.isElement(d);)d&&d.nodeType!=Node.TEXT_NODE&&a(c).wrapInner(b.node.openTagString(d)+b.node.closeTagString(d)),d=d.parentNode;d&&c.innerHTML==d.innerHTML&&(c.innerHTML=d.outerHTML)},d=function(){var c,d=null;return b.win.getSelection?(c=b.win.getSelection(),c&&c.rangeCount&&(d=c.getRangeAt(0).commonAncestorContainer,d.nodeType!=Node.ELEMENT_NODE&&(d=d.parentNode))):(c=b.doc.selection)&&"Control"!=c.type&&(d=c.createRange().parentElement()),null!=d&&(a.inArray(b.el,a(d).parents())>=0||d==b.el)?d:null},e="";if("undefined"!=typeof b.win.getSelection){
b.browser.mozilla&&(b.selection.save(),b.$el.find('.fr-marker[data-type="false"]').length>1&&(b.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(),b.$el.find('.fr-marker[data-type="false"]:last').attr("data-id","0"),b.$el.find(".fr-marker").not('[data-id="0"]').remove()),b.selection.restore());for(var f=b.selection.ranges(),g=0;g<f.length;g++){var h=document.createElement("div");h.appendChild(f[g].cloneContents()),c(h,d()),a(h).find(".fr-element").length>0&&(h=b.el),e+=h.innerHTML}}else"undefined"!=typeof b.doc.selection&&"Text"==b.doc.selection.type&&(e=b.doc.selection.createRange().htmlText);return e}function C(a){var c=b.doc.createElement("div");return c.innerHTML=a,null!==c.querySelector(f())}function D(a){var c=b.doc.createElement("div");return c.innerHTML=a,b.selection.setAtEnd(c),c.innerHTML}function E(a){return a.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/"/gi,"&quot;").replace(/'/gi,"&#39;")}function F(a,c,d){b.selection.isCollapsed()||b.selection.remove();var e;if(e=c?a:b.clean.html(a),e=e.replace(/\r|\n/g," "),a.indexOf('class="fr-marker"')<0&&(e=D(e)),b.core.isEmpty()&&!b.opts.keepFormatOnDelete)b.el.innerHTML=e;else{var f=b.markers.insert();if(f){var g,h=b.node.blockParent(f);if((C(e)||d)&&(g=b.node.deepestParent(f)||h&&"LI"==h.tagName)){var f=b.markers.split();if(!f)return!1;f.outerHTML=e}else f.outerHTML=e}else b.el.innerHTML=b.el.innerHTML+e}u(),b.events.trigger("html.inserted")}function G(c){var d=null;if("undefined"==typeof c&&(d=b.selection.element()),b.opts.keepFormatOnDelete)return!1;var e=d?(d.textContent.match(/\u200B/g)||[]).length-d.querySelectorAll(".fr-marker").length:0,f=(b.el.textContent.match(/\u200B/g)||[]).length-b.el.querySelectorAll(".fr-marker").length;if(f==e)return!1;var g,h;do{h=!1,g=b.el.querySelectorAll("*:not(.fr-marker)");for(var i=0;i<g.length;i++){var j=g[i];if(d!=j){var k=j.textContent;0===j.children.length&&1===k.length&&8203==k.charCodeAt(0)&&(a(j).remove(),h=!0)}}}while(h)}function H(){var a=function(){G(),b.placeholder&&b.placeholder.refresh()};b.events.on("mouseup",a),b.events.on("keydown",a),b.events.on("contentChanged",v)}return{defaultTag:c,emptyBlocks:d,emptyBlockTagsQuery:e,blockTagsQuery:f,fillEmptyBlocks:l,cleanEmptyTags:g,cleanWhiteTags:G,cleanBlankSpaces:n,blocks:m,getDoctype:q,set:z,get:A,getSelected:B,insert:F,wrap:j,unwrap:k,escapeEntities:E,checkIfEmpty:v,extractNode:w,extractNodeAttrs:x,extractDoctype:y,cleanBRs:t,_init:H}},a.extend(a.FE.DEFAULTS,{height:null,heightMax:null,heightMin:null,width:null}),a.FE.MODULES.size=function(a){function b(){c(),a.opts.height&&a.$el.css("minHeight",a.opts.height-a.helpers.getPX(a.$el.css("padding-top"))-a.helpers.getPX(a.$el.css("padding-bottom"))),a.$iframe.height(a.$el.outerHeight(!0))}function c(){a.opts.heightMin?a.$el.css("minHeight",a.opts.heightMin):a.$el.css("minHeight",""),a.opts.heightMax?(a.$wp.css("maxHeight",a.opts.heightMax),a.$wp.css("overflow","auto")):(a.$wp.css("maxHeight",""),a.$wp.css("overflow","")),a.opts.height?(a.$wp.height(a.opts.height),a.$el.css("minHeight",a.opts.height-a.helpers.getPX(a.$el.css("padding-top"))-a.helpers.getPX(a.$el.css("padding-bottom"))),a.$wp.css("overflow","auto")):(a.$wp.css("height",""),a.opts.heightMin||a.$el.css("minHeight",""),a.opts.heightMax||a.$wp.css("overflow","")),a.opts.width&&a.$box.width(a.opts.width)}function d(){return!!a.$wp&&(c(),void(a.$iframe&&(a.events.on("keyup",b),a.events.on("commands.after",b),a.events.on("html.set",b),a.events.on("init",b),a.events.on("initialized",b))))}return{_init:d,syncIframe:b,refresh:c}},a.extend(a.FE.DEFAULTS,{language:null}),a.FE.LANGUAGE={},a.FE.MODULES.language=function(b){function c(a){return e&&e.translation[a]?e.translation[a]:a}function d(){a.FE.LANGUAGE&&(e=a.FE.LANGUAGE[b.opts.language]),e&&e.direction&&(b.opts.direction=e.direction)}var e;return{_init:d,translate:c}},a.extend(a.FE.DEFAULTS,{placeholderText:"Type something"}),a.FE.MODULES.placeholder=function(b){function c(){b.$placeholder||g();var c=0,d=0,e=0,f=0,h=0,i=0,j=b.node.contents(b.el),k=a(b.selection.element()).css("text-align");if(j.length&&j[0].nodeType==Node.ELEMENT_NODE){var l=a(j[0]);!b.opts.toolbarInline&&b.ready&&(c=b.helpers.getPX(l.css("margin-top")),f=b.helpers.getPX(l.css("padding-top")),d=b.helpers.getPX(l.css("margin-left")),e=b.helpers.getPX(l.css("margin-right")),h=b.helpers.getPX(l.css("padding-left")),i=b.helpers.getPX(l.css("padding-right"))),b.$placeholder.css("font-size",l.css("font-size")),b.$placeholder.css("line-height",l.css("line-height"))}else b.$placeholder.css("font-size",b.$el.css("font-size")),b.$placeholder.css("line-height",b.$el.css("line-height"));b.$wp.addClass("show-placeholder"),b.$placeholder.css({marginTop:Math.max(b.helpers.getPX(b.$el.css("margin-top")),c),paddingTop:Math.max(b.helpers.getPX(b.$el.css("padding-top")),f),paddingLeft:Math.max(b.helpers.getPX(b.$el.css("padding-left")),h),marginLeft:Math.max(b.helpers.getPX(b.$el.css("margin-left")),d),paddingRight:Math.max(b.helpers.getPX(b.$el.css("padding-right")),i),marginRight:Math.max(b.helpers.getPX(b.$el.css("margin-right")),e),textAlign:k}).text(b.language.translate(b.opts.placeholderText||b.$oel.attr("placeholder")||"")),b.$placeholder.html(b.$placeholder.text().replace(/\n/g,"<br>"))}function d(){b.$wp.removeClass("show-placeholder")}function e(){return!b.$wp||b.node.hasClass(b.$wp.get(0),"show-placeholder")}function f(){return!!b.$wp&&void(b.core.isEmpty()?c():d())}function g(){b.$placeholder=a('<span class="fr-placeholder"></span>'),b.$wp.append(b.$placeholder)}function h(){return!!b.$wp&&void b.events.on("init input keydown keyup contentChanged initialized",f)}return{_init:h,show:c,hide:d,refresh:f,isVisible:e}},a.FE.MODULES.edit=function(a){function b(){if(a.browser.mozilla)try{a.doc.execCommand("enableObjectResizing",!1,"false"),a.doc.execCommand("enableInlineTableEditing",!1,"false")}catch(b){}if(a.browser.msie)try{a.doc.body.addEventListener("mscontrolselect",function(a){return a.preventDefault(),!1})}catch(b){}}function c(){a.$wp?(a.$el.attr("contenteditable",!0),a.$el.removeClass("fr-disabled").attr("aria-disabled",!1),a.$tb&&a.$tb.removeClass("fr-disabled").attr("aria-disabled",!1),b()):a.$el.is("a")&&a.$el.attr("contenteditable",!0),f=!1}function d(){a.$wp?(a.$el.attr("contenteditable",!1),a.$el.addClass("fr-disabled").attr("aria-disabled",!0),a.$tb&&a.$tb.addClass("fr-disabled").attr("aria-disabled",!0)):a.$el.is("a")&&a.$el.attr("contenteditable",!1),f=!0}function e(){return f}var f=!1;return{on:c,off:d,disableDesign:b,isDisabled:e}},a.extend(a.FE.DEFAULTS,{editorClass:null,typingTimer:500,iframe:!1,requestWithCORS:!0,requestWithCredentials:!1,requestHeaders:{},useClasses:!0,spellcheck:!0,iframeStyle:'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}',iframeStyleFiles:[],direction:"auto",zIndex:1,disableRightClick:!1,scrollableContainer:"body",keepFormatOnDelete:!1,theme:null}),a.FE.MODULES.core=function(b){function c(c){if(b.opts.iframe){b.$head.find("style[data-fr-style], link[data-fr-style]").remove(),b.$head.append('<style data-fr-style="true">'+c+"</style>");for(var d=0;d<b.opts.iframeStyleFiles.length;d++){var e=a('<link data-fr-style="true" rel="stylesheet" href="'+b.opts.iframeStyleFiles[d]+'">');e.get(0).addEventListener("load",b.size.syncIframe),b.$head.append(e)}}}function d(){b.opts.iframe||b.$el.addClass("fr-element fr-view")}function e(){if(b.$box.addClass("fr-box"+(b.opts.editorClass?" "+b.opts.editorClass:"")),b.$wp.addClass("fr-wrapper"),d(),b.opts.iframe){b.$iframe.addClass("fr-iframe"),b.$el.addClass("fr-view");for(var a=0;a<b.o_doc.styleSheets.length;a++){var c;try{c=b.o_doc.styleSheets[a].cssRules}catch(e){}if(c)for(var f=0,g=c.length;f<g;f++)!c[f].selectorText||0!==c[f].selectorText.indexOf(".fr-view")&&0!==c[f].selectorText.indexOf(".fr-element")||c[f].style.cssText.length>0&&(0===c[f].selectorText.indexOf(".fr-view")?b.opts.iframeStyle+=c[f].selectorText.replace(/\.fr-view/g,"body")+"{"+c[f].style.cssText+"}":b.opts.iframeStyle+=c[f].selectorText.replace(/\.fr-element/g,"body")+"{"+c[f].style.cssText+"}")}}"auto"!=b.opts.direction&&b.$box.removeClass("fr-ltr fr-rtl").addClass("fr-"+b.opts.direction),b.$el.attr("dir",b.opts.direction),b.$wp.attr("dir",b.opts.direction),b.opts.zIndex>1&&b.$box.css("z-index",b.opts.zIndex),b.opts.theme&&b.$box.addClass(b.opts.theme+"-theme")}function f(){return b.node.isEmpty(b.el)}function g(){b.drag_support={filereader:"undefined"!=typeof FileReader,formdata:!!b.win.FormData,progress:"upload"in new XMLHttpRequest}}function h(a,c){var d=new XMLHttpRequest;d.open(c,a,!0),b.opts.requestWithCredentials&&(d.withCredentials=!0);for(var e in b.opts.requestHeaders)b.opts.requestHeaders.hasOwnProperty(e)&&d.setRequestHeader(e,b.opts.requestHeaders[e]);return d}function i(a){"TEXTAREA"==b.$oel.get(0).tagName&&b.$oel.val(a),b.$wp&&("TEXTAREA"==b.$oel.get(0).tagName?(b.$el.html(""),b.$wp.html(""),b.$box.replaceWith(b.$oel),b.$oel.show()):(b.$wp.replaceWith(a),b.$el.html(""),b.$box.removeClass("fr-view fr-ltr fr-box "+(b.opts.editorClass||"")),b.opts.theme&&b.$box.addClass(b.opts.theme+"-theme"))),this.$wp=null,this.$el=null,this.el=null,this.$box=null}function j(){return b.browser.mozilla&&b.helpers.isMobile()?b.selection.inEditor():b.node.hasFocus(b.el)||b.$el.find("*:focus").length>0}function k(a){if(!a)return!1;var c=a.data("instance");return!!c&&c.id==b.id}function l(){if(a.FE.INSTANCES.push(b),g(),b.$wp){e(),b.html.set(b._original_html),b.$el.attr("spellcheck",b.opts.spellcheck),b.helpers.isMobile()&&(b.$el.attr("autocomplete",b.opts.spellcheck?"on":"off"),b.$el.attr("autocorrect",b.opts.spellcheck?"on":"off"),b.$el.attr("autocapitalize",b.opts.spellcheck?"on":"off")),b.opts.disableRightClick&&b.events.$on(b.$el,"contextmenu",function(a){if(2==a.button)return!1});try{b.doc.execCommand("styleWithCSS",!1,!1)}catch(c){}}b.events.on("drop",function(a){a.preventDefault(),a.stopPropagation()}),"TEXTAREA"==b.$oel.get(0).tagName&&(b.events.on("contentChanged",function(){b.$oel.val(b.html.get())}),b.events.on("form.submit",function(){b.$oel.val(b.html.get())}),b.events.on("form.reset",function(){b.html.set(b._original_html)}),b.$oel.val(b.html.get())),b.helpers.isIOS()&&b.events.$on(b.$doc,"selectionchange",function(){b.$doc.get(0).hasFocus()||b.$win.get(0).focus()}),b.events.trigger("init")}return{_init:l,destroy:i,isEmpty:f,getXHR:h,injectStyle:c,hasFocus:j,sameInstance:k}},a.FE.MODULES.cursorLists=function(b){function c(a){for(var b=a;"LI"!=b.tagName;)b=b.parentNode;return b}function d(a){for(var c=a;!b.node.isList(c);)c=c.parentNode;return c}function e(e){var f,g=c(e),h=g.nextSibling,i=g.previousSibling,j=b.html.defaultTag();if(b.node.isEmpty(g,!0)&&h){for(var k="",l="",m=e.parentNode;!b.node.isList(m)&&m.parentNode&&"LI"!==m.parentNode.tagName;)k=b.node.openTagString(m)+k,l+=b.node.closeTagString(m),m=m.parentNode;k=b.node.openTagString(m)+k,l+=b.node.closeTagString(m);var n="";for(n=m.parentNode&&"LI"==m.parentNode.tagName?l+"<li>"+a.FE.MARKERS+"<br>"+k:j?l+"<"+j+">"+a.FE.MARKERS+"<br></"+j+">"+k:l+a.FE.MARKERS+"<br>"+k,a(g).html('<span id="fr-break"></span>');["UL","OL"].indexOf(m.tagName)<0||m.parentNode&&"LI"===m.parentNode.tagName;)m=m.parentNode;var o=b.node.openTagString(m)+a(m).html()+b.node.closeTagString(m);o=o.replace(/<span id="fr-break"><\/span>/g,n),a(m).replaceWith(o),b.$el.find("li:empty").remove()}else i&&h||!b.node.isEmpty(g,!0)?(a(g).before("<li><br></li>"),a(e).remove()):i?(f=d(g),f.parentNode&&"LI"==f.parentNode.tagName?a(f.parentNode).after("<li>"+a.FE.MARKERS+"<br></li>"):j?a(f).after("<"+j+">"+a.FE.MARKERS+"<br></"+j+">"):a(f).after(a.FE.MARKERS+"<br>"),a(g).remove()):(f=d(g),f.parentNode&&"LI"==f.parentNode.tagName?h?a(f.parentNode).before("<li>"+a.FE.MARKERS+"<br></li>"):a(f.parentNode).after("<li>"+a.FE.MARKERS+"<br></li>"):j?a(f).before("<"+j+">"+a.FE.MARKERS+"<br></"+j+">"):a(f).before(a.FE.MARKERS+"<br>"),a(g).remove())}function f(d){for(var e=c(d),f="",g=d,h="",i="";g!=e;){g=g.parentNode;var j="A"==g.tagName&&b.cursor.isAtEnd(d,g)?"fr-to-remove":"";h=b.node.openTagString(a(g).clone().addClass(j).get(0))+h,i=b.node.closeTagString(g)+i}f=i+f+h+a.FE.MARKERS,a(d).replaceWith('<span id="fr-break"></span>');var k=b.node.openTagString(e)+a(e).html()+b.node.closeTagString(e);k=k.replace(/<span id="fr-break"><\/span>/g,f),a(e).replaceWith(k)}function g(d){for(var e=c(d),f=a.FE.MARKERS,g="",h=d,i=!1;h!=e;){h=h.parentNode;var j="A"==h.tagName&&b.cursor.isAtEnd(d,h)?"fr-to-remove":"";i||h==e||b.node.isBlock(h)||(i=!0,g+=a.FE.INVISIBLE_SPACE),g=b.node.openTagString(a(h).clone().addClass(j).get(0))+g,f+=b.node.closeTagString(h)}var k=g+f;a(d).remove(),a(e).after(k)}function h(e){var f=c(e),g=f.previousSibling;if(g){g=a(g).find(b.html.blockTagsQuery()).get(-1)||g,a(e).replaceWith(a.FE.MARKERS);var h=b.node.contents(g);h.length&&"BR"==h[h.length-1].tagName&&a(h[h.length-1]).remove(),a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==f&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))});for(var i,j=b.node.contents(f)[0];j&&!b.node.isList(j);)i=j.nextSibling,a(g).append(j),j=i;for(g=f.previousSibling;j;)i=j.nextSibling,a(g).append(j),j=i;a(f).remove()}else{var k=d(f);if(a(e).replaceWith(a.FE.MARKERS),k.parentNode&&"LI"==k.parentNode.tagName){var l=k.previousSibling;b.node.isBlock(l)?(a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==f&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))}),a(l).append(a(f).html())):a(k).before(a(f).html())}else{var m=b.html.defaultTag();m&&0===a(f).find(b.html.blockTagsQuery()).length?a(k).before("<"+m+">"+a(f).html()+"</"+m+">"):a(k).before(a(f).html())}a(f).remove(),0===a(k).find("li").length&&a(k).remove()}}function i(d){var e,f=c(d),g=f.nextSibling;if(g){e=b.node.contents(g),e.length&&"BR"==e[0].tagName&&a(e[0]).remove(),a(g).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==g&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))});for(var h,i=d,j=b.node.contents(g)[0];j&&!b.node.isList(j);)h=j.nextSibling,a(i).after(j),i=j,j=h;for(;j;)h=j.nextSibling,a(f).append(j),j=h;a(d).replaceWith(a.FE.MARKERS),a(g).remove()}else{for(var k=f;!k.nextSibling&&k!=b.el;)k=k.parentNode;if(k==b.el)return!1;if(k=k.nextSibling,b.node.isBlock(k))a.FE.NO_DELETE_TAGS.indexOf(k.tagName)<0&&(a(d).replaceWith(a.FE.MARKERS),e=b.node.contents(f),e.length&&"BR"==e[e.length-1].tagName&&a(e[e.length-1]).remove(),a(f).append(a(k).html()),a(k).remove());else for(e=b.node.contents(f),e.length&&"BR"==e[e.length-1].tagName&&a(e[e.length-1]).remove(),a(d).replaceWith(a.FE.MARKERS);k&&!b.node.isBlock(k)&&"BR"!=k.tagName;)a(f).append(a(k)),k=k.nextSibling}}return{_startEnter:e,_middleEnter:f,_endEnter:g,_backspace:h,_del:i}},a.FE.NO_DELETE_TAGS=["TH","TD","TR","TABLE","FORM"],a.FE.SIMPLE_ENTER_TAGS=["TH","TD","LI","DL","DT","FORM"],a.FE.MODULES.cursor=function(b){function c(a){return!!a&&(!!b.node.isBlock(a)||(a.nextSibling&&a.nextSibling.nodeType==Node.TEXT_NODE&&0==a.nextSibling.textContent.replace(/\u200b/g,"").length?c(a.nextSibling):!a.nextSibling&&c(a.parentNode)))}function d(a){return!!a&&(!!b.node.isBlock(a)||(a.previousSibling&&a.previousSibling.nodeType==Node.TEXT_NODE&&0==a.previousSibling.textContent.replace(/\u200b/g,"").length?d(a.previousSibling):!a.previousSibling&&d(a.parentNode)))}function e(a,c){return!!a&&(a!=b.$wp.get(0)&&(a.previousSibling&&a.previousSibling.nodeType==Node.TEXT_NODE&&0==a.previousSibling.textContent.replace(/\u200b/g,"").length?e(a.previousSibling,c):!a.previousSibling&&(a.parentNode==c||e(a.parentNode,c))))}function f(a,c){return!!a&&(a!=b.$wp.get(0)&&(a.nextSibling&&a.nextSibling.nodeType==Node.TEXT_NODE&&0==a.nextSibling.textContent.replace(/\u200b/g,"").length?f(a.nextSibling,c):!a.nextSibling&&(a.parentNode==c||f(a.parentNode,c))))}function g(c){return a(c).parentsUntil(b.$el,"LI").length>0&&0===a(c).parentsUntil("LI","TABLE").length}function h(c){var d=a(c).parentsUntil(b.$el,"BLOCKQUOTE").length>0,e=b.node.deepestParent(c,[],!d);if(e&&"BLOCKQUOTE"==e.tagName){var f=b.node.deepestParent(c,[a(c).parentsUntil(b.$el,"BLOCKQUOTE").get(0)]);f&&f.previousSibling&&(e=f)}if(null!==e){var g,h=e.previousSibling;if(b.node.isBlock(e)&&b.node.isEditable(e)&&h&&a.FE.NO_DELETE_TAGS.indexOf(h.tagName)<0)if(b.node.isDeletable(h))a(h).remove(),a(c).replaceWith(a.FE.MARKERS);else if(b.node.isEditable(h))if(b.node.isBlock(h))if(b.node.isEmpty(h)&&!b.node.isList(h))a(h).remove();else{if(b.node.isList(h)&&(h=a(h).find("li:last").get(0)),g=b.node.contents(h),g.length&&"BR"==g[g.length-1].tagName&&a(g[g.length-1]).remove(),"BLOCKQUOTE"==h.tagName&&"BLOCKQUOTE"!=e.tagName)for(g=b.node.contents(h);g.length&&b.node.isBlock(g[g.length-1]);)h=g[g.length-1],g=b.node.contents(h);else if("BLOCKQUOTE"!=h.tagName&&"BLOCKQUOTE"==e.tagName)for(g=b.node.contents(e);g.length&&b.node.isBlock(g[0]);)e=g[0],g=b.node.contents(e);a(c).replaceWith(a.FE.MARKERS),a(h).append(b.node.isEmpty(e)?a.FE.MARKERS:e.innerHTML),a(e).remove()}else a(c).replaceWith(a.FE.MARKERS),"BLOCKQUOTE"==e.tagName&&h.nodeType==Node.ELEMENT_NODE?a(h).remove():(a(h).after(b.node.isEmpty(e)?"":a(e).html()),a(e).remove(),"BR"==h.tagName&&a(h).remove())}}function i(c){for(var d=c;!d.previousSibling;)if(d=d.parentNode,b.node.isElement(d))return!1;d=d.previousSibling;var e;if(!b.node.isBlock(d)&&b.node.isEditable(d)){for(e=b.node.contents(d);d.nodeType!=Node.TEXT_NODE&&!b.node.isDeletable(d)&&e.length&&b.node.isEditable(d);)d=e[e.length-1],e=b.node.contents(d);if(d.nodeType==Node.TEXT_NODE){if(b.helpers.isIOS())return!0;var f=d.textContent,g=f.length-1;if(b.opts.tabSpaces&&f.length>=b.opts.tabSpaces){var h=f.substr(f.length-b.opts.tabSpaces,f.length-1);0==h.replace(/ /g,"").replace(new RegExp(a.FE.UNICODE_NBSP,"g"),"").length&&(g=f.length-b.opts.tabSpaces)}d.textContent=f.substring(0,g),d.textContent.length&&55357==d.textContent.charCodeAt(d.textContent.length-1)&&(d.textContent=d.textContent.substr(0,d.textContent.length-1));var i=f.length!=d.textContent.length;0==d.textContent.length?i&&b.opts.keepFormatOnDelete?a(d).after(a.FE.INVISIBLE_SPACE+a.FE.MARKERS):2!=d.parentNode.childNodes.length||d.parentNode!=c.parentNode||b.node.isBlock(d.parentNode)||b.node.isElement(d.parentNode)?(a(d).after(a.FE.MARKERS),b.node.isElement(d.parentNode)&&!c.nextSibling&&d.previousSibling&&"BR"==d.previousSibling.tagName&&a(c).after("<br>"),d.parentNode.removeChild(d)):(a(d.parentNode).after(a.FE.MARKERS),a(d.parentNode).remove()):a(d).after(a.FE.MARKERS)}else b.node.isDeletable(d)?(a(d).after(a.FE.MARKERS),a(d).remove()):b.events.trigger("node.remove",[a(d)])!==!1&&(a(d).after(a.FE.MARKERS),a(d).remove())}else if(a.FE.NO_DELETE_TAGS.indexOf(d.tagName)<0&&(b.node.isEditable(d)||b.node.isDeletable(d)))if(b.node.isDeletable(d))a(c).replaceWith(a.FE.MARKERS),a(d).remove();else if(b.node.isEmpty(d)&&!b.node.isList(d))a(d).remove(),a(c).replaceWith(a.FE.MARKERS);else{for(b.node.isList(d)&&(d=a(d).find("li:last").get(0)),e=b.node.contents(d),e&&"BR"==e[e.length-1].tagName&&a(e[e.length-1]).remove(),e=b.node.contents(d);e&&b.node.isBlock(e[e.length-1]);)d=e[e.length-1],e=b.node.contents(d);a(d).append(a.FE.MARKERS);for(var j=c;!j.previousSibling;)j=j.parentNode;for(;j&&"BR"!==j.tagName&&!b.node.isBlock(j);){var k=j;j=j.nextSibling,a(d).append(k)}j&&"BR"==j.tagName&&a(j).remove(),a(c).remove()}else c.nextSibling&&"BR"==c.nextSibling.tagName&&a(c.nextSibling).remove()}function j(){var f=!1,j=b.markers.insert();if(!j)return!0;b.el.normalize();var k=j.previousSibling;if(k){var l=k.textContent;l&&l.length&&8203==l.charCodeAt(l.length-1)&&(1==l.length?a(k).remove():(k.textContent=k.textContent.substr(0,l.length-1),k.textContent.length&&55357==k.textContent.charCodeAt(k.textContent.length-1)&&(k.textContent=k.textContent.substr(0,k.textContent.length-1))))}return c(j)?f=i(j):d(j)?g(j)&&e(j,a(j).parents("li:first").get(0))?b.cursorLists._backspace(j):h(j):f=i(j),a(j).remove(),n(),b.html.fillEmptyBlocks(!0),b.html.cleanEmptyTags(),b.clean.quotes(),b.clean.lists(),b.spaces.normalizeAroundCursor(),b.selection.restore(),f}function k(c){var d=a(c).parentsUntil(b.$el,"BLOCKQUOTE").length>0,e=b.node.deepestParent(c,[],!d);if(e&&"BLOCKQUOTE"==e.tagName){var f=b.node.deepestParent(c,[a(c).parentsUntil(b.$el,"BLOCKQUOTE").get(0)]);f&&f.nextSibling&&(e=f)}if(null!==e){var g,h=e.nextSibling;if(b.node.isBlock(e)&&(b.node.isEditable(e)||b.node.isDeletable(e))&&h&&a.FE.NO_DELETE_TAGS.indexOf(h.tagName)<0)if(b.node.isDeletable(h))a(h).remove(),a(c).replaceWith(a.FE.MARKERS);else if(b.node.isBlock(h)&&b.node.isEditable(h))if(b.node.isList(h))if(b.node.isEmpty(e,!0))a(e).remove(),a(h).find("li:first").prepend(a.FE.MARKERS);else{var i=a(h).find("li:first");"BLOCKQUOTE"==e.tagName&&(g=b.node.contents(e),g.length&&b.node.isBlock(g[g.length-1])&&(e=g[g.length-1])),0===i.find("ul, ol").length&&(a(c).replaceWith(a.FE.MARKERS),i.find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==i.get(0)&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))}),a(e).append(b.node.contents(i.get(0))),i.remove(),0===a(h).find("li").length&&a(h).remove())}else{if(g=b.node.contents(h),g.length&&"BR"==g[0].tagName&&a(g[0]).remove(),"BLOCKQUOTE"!=h.tagName&&"BLOCKQUOTE"==e.tagName)for(g=b.node.contents(e);g.length&&b.node.isBlock(g[g.length-1]);)e=g[g.length-1],g=b.node.contents(e);else if("BLOCKQUOTE"==h.tagName&&"BLOCKQUOTE"!=e.tagName)for(g=b.node.contents(h);g.length&&b.node.isBlock(g[0]);)h=g[0],g=b.node.contents(h);a(c).replaceWith(a.FE.MARKERS),a(e).append(h.innerHTML),a(h).remove()}else{for(a(c).replaceWith(a.FE.MARKERS);h&&"BR"!==h.tagName&&!b.node.isBlock(h)&&b.node.isEditable(h);){var j=h;h=h.nextSibling,a(e).append(j)}h&&"BR"==h.tagName&&b.node.isEditable(h)&&a(h).remove()}}}function l(d){for(var e=d;!e.nextSibling;)if(e=e.parentNode,b.node.isElement(e))return!1;if(e=e.nextSibling,"BR"==e.tagName&&b.node.isEditable(e))if(e.nextSibling){if(b.node.isBlock(e.nextSibling)&&b.node.isEditable(e.nextSibling)){if(!(a.FE.NO_DELETE_TAGS.indexOf(e.nextSibling.tagName)<0))return void a(e).remove();e=e.nextSibling,a(e.previousSibling).remove()}}else if(c(e)){if(g(d))b.cursorLists._del(d);else{var f=b.node.deepestParent(e);f&&(a(e).remove(),k(d))}return}var h;if(!b.node.isBlock(e)&&b.node.isEditable(e)){for(h=b.node.contents(e);e.nodeType!=Node.TEXT_NODE&&h.length&&!b.node.isDeletable(e)&&b.node.isEditable(e);)e=h[0],h=b.node.contents(e);e.nodeType==Node.TEXT_NODE?(a(e).before(a.FE.MARKERS),e.textContent.length&&55357==e.textContent.charCodeAt(0)?e.textContent=e.textContent.substring(2,e.textContent.length):e.textContent=e.textContent.substring(1,e.textContent.length)):b.node.isDeletable(e)?(a(e).before(a.FE.MARKERS),a(e).remove()):b.events.trigger("node.remove",[a(e)])!==!1&&(a(e).before(a.FE.MARKERS),a(e).remove()),a(d).remove()}else if(a.FE.NO_DELETE_TAGS.indexOf(e.tagName)<0&&(b.node.isEditable(e)||b.node.isDeletable(e)))if(b.node.isDeletable(e))a(d).replaceWith(a.FE.MARKERS),a(e).remove();else if(b.node.isList(e))d.previousSibling?(a(e).find("li:first").prepend(d),b.cursorLists._backspace(d)):(a(e).find("li:first").prepend(a.FE.MARKERS),a(d).remove());else if(h=b.node.contents(e),h&&"BR"==h[0].tagName&&a(h[0]).remove(),h&&"BLOCKQUOTE"==e.tagName){var i=h[0];for(a(d).before(a.FE.MARKERS);i&&"BR"!=i.tagName;){var j=i;i=i.nextSibling,a(d).before(j)}i&&"BR"==i.tagName&&a(i).remove()}else a(d).after(a(e).html()).after(a.FE.MARKERS),a(e).remove()}function m(){var e=b.markers.insert();if(!e)return!1;if(b.el.normalize(),c(e))if(g(e))if(0===a(e).parents("li:first").find("ul, ol").length)b.cursorLists._del(e);else{var f=a(e).parents("li:first").find("ul:first, ol:first").find("li:first");f=f.find(b.html.blockTagsQuery()).get(-1)||f,f.prepend(e),b.cursorLists._backspace(e)}else k(e);else l(d(e)?e:e);a(e).remove(),n(),b.html.fillEmptyBlocks(!0),b.html.cleanEmptyTags(),b.clean.quotes(),b.clean.lists(),b.spaces.normalizeAroundCursor(),b.selection.restore()}function n(){for(var a=b.el.querySelectorAll("blockquote:empty"),c=0;c<a.length;c++)a[c].parentNode.removeChild(a[c])}function o(){b.$el.find(".fr-to-remove").each(function(){for(var c=b.node.contents(this),d=0;d<c.length;d++)c[d].nodeType==Node.TEXT_NODE&&(c[d].textContent=c[d].textContent.replace(/\u200B/g,""));a(this).replaceWith(this.innerHTML)})}function p(c,d,e){var g,h=b.node.deepestParent(c,[],!e);if(h&&"BLOCKQUOTE"==h.tagName)return f(c,h)?(g=b.html.defaultTag(),g?a(h).after("<"+g+">"+a.FE.MARKERS+"<br></"+g+">"):a(h).after(a.FE.MARKERS+"<br>"),a(c).remove(),!1):(r(c,d,e),!1);if(null==h)g=b.html.defaultTag(),g&&b.node.isElement(c.parentNode)?a(c).replaceWith("<"+g+">"+a.FE.MARKERS+"<br></"+g+">"):a(c).replaceWith((b.node.isEmpty(c.parentNode,!0)?"":"<br/>")+a.FE.MARKERS+"<br/>");else{var i=c,j="";b.node.isBlock(h)&&!d||(j="<br/>");var k="",l="";g=b.html.defaultTag();var m="",n="";g&&b.node.isBlock(h)&&(m="<"+g+">",n="</"+g+">",h.tagName==g.toUpperCase()&&(m=b.node.openTagString(a(h).clone().removeAttr("id").get(0))));do if(i=i.parentNode,!d||i!=h||d&&!b.node.isBlock(h))if(k+=b.node.closeTagString(i),i==h&&b.node.isBlock(h))l=m+l;else{var o="A"==i.tagName&&f(c,i)?"fr-to-remove":"";l=b.node.openTagString(a(i).clone().addClass(o).get(0))+l}while(i!=h);j=k+j+l+(c.parentNode==h&&b.node.isBlock(h)?"":a.FE.INVISIBLE_SPACE)+a.FE.MARKERS,b.node.isBlock(h)&&!a(h).find("*:last").is("br")&&a(h).append("<br/>"),a(c).after('<span id="fr-break"></span>'),a(c).remove(),h.nextSibling&&!b.node.isBlock(h.nextSibling)||b.node.isBlock(h)||a(h).after("<br>");var p;p=!d&&b.node.isBlock(h)?b.node.openTagString(h)+a(h).html()+n:b.node.openTagString(h)+a(h).html()+b.node.closeTagString(h),p=p.replace(/<span id="fr-break"><\/span>/g,j),a(h).replaceWith(p)}}function q(c,d,g){var h,i=b.node.deepestParent(c,[],!g);if(i&&"TABLE"==i.tagName)return a(i).find("td:first, th:first").prepend(c),q(c,d,g);if(i&&"BLOCKQUOTE"==i.tagName){if(e(c,i))return h=b.html.defaultTag(),h?a(i).before("<"+h+">"+a.FE.MARKERS+"<br></"+h+">"):a(i).before(a.FE.MARKERS+"<br>"),a(c).remove(),!1;f(c,i)?p(c,d,!0):r(c,d,!0)}if(null==i)h=b.html.defaultTag(),h&&b.node.isElement(c.parentNode)?a(c).replaceWith("<"+h+">"+a.FE.MARKERS+"<br></"+h+">"):a(c).replaceWith("<br>"+a.FE.MARKERS);else{if(b.node.isBlock(i))if(d)a(c).remove(),a(i).prepend("<br>"+a.FE.MARKERS);else{if(b.node.isEmpty(i,!0))return p(c,d,g);a(i).before(b.node.openTagString(a(i).clone().removeAttr("id").get(0))+"<br>"+b.node.closeTagString(i))}else a(i).before("<br>");a(c).remove()}}function r(c,d,g){var h=b.node.deepestParent(c,[],!g);if(null==h)b.html.defaultTag()&&c.parentNode===b.el?a(c).replaceWith("<"+b.html.defaultTag()+">"+a.FE.MARKERS+"<br></"+b.html.defaultTag()+">"):(c.nextSibling&&!b.node.isBlock(c.nextSibling)||a(c).after("<br>"),a(c).replaceWith("<br>"+a.FE.MARKERS));else{var i=c,j="";"PRE"==h.tagName&&(d=!0),b.node.isBlock(h)&&!d||(j="<br>");var k="",l="";do{var m=i;if(i=i.parentNode,"BLOCKQUOTE"==h.tagName&&b.node.isEmpty(m)&&!b.node.hasClass(m,"fr-marker")&&a(m).find(c).length>0&&a(m).after(c),("BLOCKQUOTE"!=h.tagName||!f(c,i)&&!e(c,i))&&(!d||i!=h||d&&!b.node.isBlock(h))){k+=b.node.closeTagString(i);var n="A"==i.tagName&&f(c,i)?"fr-to-remove":"";l=b.node.openTagString(a(i).clone().addClass(n).removeAttr("id").get(0))+l}}while(i!=h);var o=h==c.parentNode&&b.node.isBlock(h)||c.nextSibling;if("BLOCKQUOTE"==h.tagName){c.previousSibling&&b.node.isBlock(c.previousSibling)&&c.nextSibling&&"BR"==c.nextSibling.tagName&&(a(c.nextSibling).after(c),c.nextSibling&&"BR"==c.nextSibling.tagName&&a(c.nextSibling).remove());var p=b.html.defaultTag();j=k+j+(p?"<"+p+">":"")+a.FE.MARKERS+"<br>"+(p?"</"+p+">":"")+l}else j=k+j+l+(o?"":a.FE.INVISIBLE_SPACE)+a.FE.MARKERS;a(c).replaceWith('<span id="fr-break"></span>');var q=b.node.openTagString(h)+a(h).html()+b.node.closeTagString(h);q=q.replace(/<span id="fr-break"><\/span>/g,j),a(h).replaceWith(q)}}function s(e){var f=b.markers.insert();if(!f)return!0;b.el.normalize();var h=!1;a(f).parentsUntil(b.$el,"BLOCKQUOTE").length>0&&(e=!1,h=!0),a(f).parentsUntil(b.$el,"TD, TH").length&&(h=!1),c(f)?!g(f)||e||h?p(f,e,h):b.cursorLists._endEnter(f):d(f)?!g(f)||e||h?q(f,e,h):b.cursorLists._startEnter(f):!g(f)||e||h?r(f,e,h):b.cursorLists._middleEnter(f),o(),b.html.fillEmptyBlocks(!0),b.html.cleanEmptyTags(),b.clean.lists(),b.spaces.normalizeAroundCursor(),b.selection.restore()}return{enter:s,backspace:j,del:m,isAtEnd:f,isAtStart:e}},a.FE.ENTER_P=0,a.FE.ENTER_DIV=1,a.FE.ENTER_BR=2,a.FE.KEYCODE={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,FF_SEMICOLON:59,FF_EQUALS:61,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,FF_HYPHEN:173,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,HYPHEN:189,PERIOD:190,SLASH:191,APOSTROPHE:192,TILDE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221},a.extend(a.FE.DEFAULTS,{enter:a.FE.ENTER_P,multiLine:!0,tabSpaces:0}),a.FE.MODULES.keys=function(b){function c(a){b.opts.multiLine?b.helpers.isIOS()||(a.preventDefault(),a.stopPropagation(),b.selection.isCollapsed()||b.selection.remove(),b.cursor.enter()):(a.preventDefault(),a.stopPropagation())}function d(a){a.preventDefault(),a.stopPropagation(),b.opts.multiLine&&(b.selection.isCollapsed()||b.selection.remove(),b.cursor.enter(!0))}function e(a){b.selection.isCollapsed()?b.cursor.backspace()||(a.preventDefault(),a.stopPropagation(),z=!1):(a.preventDefault(),a.stopPropagation(),b.selection.remove(),b.html.fillEmptyBlocks(),z=!1),b.placeholder.refresh()}function f(a){a.preventDefault(),a.stopPropagation(),""===b.selection.text()?b.cursor.del():b.selection.remove(),b.placeholder.refresh()}function g(c){var d=b.selection.element();if(!b.helpers.isMobile()&&(b.browser.mozilla||d&&"A"==d.tagName)){c.preventDefault(),c.stopPropagation(),b.selection.isCollapsed()||b.selection.remove();var e=b.markers.insert();if(e){var f=e.previousSibling,g=e.nextSibling;!g&&e.parentNode&&"A"==e.parentNode.tagName?(e.parentNode.insertAdjacentHTML("afterend","&nbsp;"+a.FE.MARKERS),e.parentNode.removeChild(e)):(f&&f.nodeType==Node.TEXT_NODE&&1==f.textContent.length&&160==f.textContent.charCodeAt(0)?f.textContent=f.textContent+" ":e.insertAdjacentHTML("beforebegin","&nbsp;"),e.outerHTML=a.FE.MARKERS),b.selection.restore()}}}function h(){if(b.browser.mozilla&&b.selection.isCollapsed()&&!C){var a=b.selection.ranges(0),c=a.startContainer,d=a.startOffset;c&&c.nodeType==Node.TEXT_NODE&&d<=c.textContent.length&&d>0&&32==c.textContent.charCodeAt(d-1)&&(b.selection.save(),b.spaces.normalize(),b.selection.restore())}}function i(){b.selection.isFull()&&setTimeout(function(){var c=b.html.defaultTag();c?b.$el.html("<"+c+">"+a.FE.MARKERS+"<br/></"+c+">"):b.$el.html(a.FE.MARKERS+"<br/>"),b.selection.restore(),b.placeholder.refresh(),b.button.bulkRefresh(),b.undo.saveStep()},0)}function j(a){if(b.opts.tabSpaces>0)if(b.selection.isCollapsed()){b.undo.saveStep(),a.preventDefault(),a.stopPropagation();for(var c="",d=0;d<b.opts.tabSpaces;d++)c+="&nbsp;";b.html.insert(c),b.placeholder.refresh(),b.undo.saveStep()}else a.preventDefault(),a.stopPropagation(),a.shiftKey?b.commands.outdent():b.commands.indent()}function k(a){C=!1}function l(){return C}function m(h){
b.events.disableBlur(),z=!0;var i=h.which;if(16===i)return!0;if(229===i)return C=!0,!0;C=!1;var k=t(i)&&!r(h),l=i==a.FE.KEYCODE.BACKSPACE||i==a.FE.KEYCODE.DELETE;if((b.selection.isFull()&&!b.opts.keepFormatOnDelete&&!b.placeholder.isVisible()||l&&b.placeholder.isVisible()&&b.opts.keepFormatOnDelete)&&(k||l)){var m=b.html.defaultTag();if(m?b.$el.html("<"+m+">"+a.FE.MARKERS+"<br/></"+m+">"):b.$el.html(a.FE.MARKERS+"<br/>"),b.selection.restore(),!t(i))return h.preventDefault(),!0}i==a.FE.KEYCODE.ENTER?h.shiftKey?d(h):c(h):i!=a.FE.KEYCODE.BACKSPACE||r(h)||h.altKey?i!=a.FE.KEYCODE.DELETE||r(h)||h.altKey?i==a.FE.KEYCODE.SPACE?g(h):i==a.FE.KEYCODE.TAB?j(h):r(h)||!t(h.which)||b.selection.isCollapsed()||h.ctrlKey||b.selection.remove():b.placeholder.isVisible()?(h.preventDefault(),h.stopPropagation()):f(h):b.placeholder.isVisible()?(h.preventDefault(),h.stopPropagation()):e(h),b.events.enableBlur()}function n(a){for(var c=b.doc.createTreeWalker(a,NodeFilter.SHOW_TEXT,b.node.filter(function(a){return/\u200B/gi.test(a.textContent)}),!1);c.nextNode();){var d=c.currentNode;d.textContent=d.textContent.replace(/\u200B/gi,"")}}function o(){if(!b.$wp)return!0;var c;b.opts.height||b.opts.heightMax?(c=b.position.getBoundingRect().top,b.helpers.isIOS()&&(c-=a(b.o_win).scrollTop()),b.opts.iframe&&(c+=b.$iframe.offset().top),c>b.$wp.offset().top-a(b.o_win).scrollTop()+b.$wp.height()-20&&b.$wp.scrollTop(c+b.$wp.scrollTop()-(b.$wp.height()+b.$wp.offset().top)+a(b.o_win).scrollTop()+20)):(c=b.position.getBoundingRect().top,b.opts.toolbarBottom&&(c+=b.opts.toolbarStickyOffset),b.helpers.isIOS()&&(c-=a(b.o_win).scrollTop()),b.opts.iframe&&(c+=b.$iframe.offset().top),c+=b.opts.toolbarStickyOffset,c>b.o_win.innerHeight-20&&a(b.o_win).scrollTop(c+a(b.o_win).scrollTop()-b.o_win.innerHeight+20),c=b.position.getBoundingRect().top,b.opts.toolbarBottom||(c-=b.opts.toolbarStickyOffset),b.helpers.isIOS()&&(c-=a(b.o_win).scrollTop()),b.opts.iframe&&(c+=b.$iframe.offset().top),c<b.$tb.height()+20&&a(b.o_win).scrollTop(c+a(b.o_win).scrollTop()-b.$tb.height()-20))}function p(){var c=b.selection.element(),d=b.node.blockParent(c);if(d&&"DIV"==d.tagName&&b.selection.info(d).atStart){var e=b.html.defaultTag();d.previousSibling&&"DIV"!=d.previousSibling.tagName&&e&&"div"!=e&&(b.selection.save(),a(d).replaceWith("<"+e+">"+d.innerHTML+"</"+e+">"),b.selection.restore())}}function q(c){if(C)return C=!1,!1;if(!b.selection.isCollapsed())return!0;if(c&&(c.which===a.FE.KEYCODE.META||c.which==a.FE.KEYCODE.CTRL))return!0;if(c&&s(c.which))return!0;c&&c.which==a.FE.KEYCODE.ENTER&&b.helpers.isIOS()&&p(),c&&(c.which==a.FE.KEYCODE.ENTER||c.which==a.FE.KEYCODE.BACKSPACE||c.which>=37&&c.which<=40&&!b.browser.msie)&&(c.which==a.FE.KEYCODE.BACKSPACE&&z||o()),b.html.cleanBRs(!0,!0);var d=function(a){if(!a)return!1;var b=a.innerHTML;return b=b.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi,""),!!(b&&/\u200B/.test(b)&&b.replace(/\u200B/gi,"").length>0)},e=function(a){var c=/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi;return!b.helpers.isIOS()||0===((a.textContent||"").match(c)||[]).length},f=b.selection.element();d(f)&&!b.node.hasClass(f,"fr-marker")&&"IFRAME"!=f.tagName&&e(f)&&(b.selection.save(),n(f),b.selection.restore())}function r(a){if(navigator.userAgent.indexOf("Mac OS X")!=-1){if(a.metaKey&&!a.altKey)return!0}else if(a.ctrlKey&&!a.altKey)return!0;return!1}function s(b){if(b>=a.FE.KEYCODE.ARROW_LEFT&&b<=a.FE.KEYCODE.ARROW_DOWN)return!0}function t(c){if(c>=a.FE.KEYCODE.ZERO&&c<=a.FE.KEYCODE.NINE)return!0;if(c>=a.FE.KEYCODE.NUM_ZERO&&c<=a.FE.KEYCODE.NUM_MULTIPLY)return!0;if(c>=a.FE.KEYCODE.A&&c<=a.FE.KEYCODE.Z)return!0;if(b.browser.webkit&&0===c)return!0;switch(c){case a.FE.KEYCODE.SPACE:case a.FE.KEYCODE.QUESTION_MARK:case a.FE.KEYCODE.NUM_PLUS:case a.FE.KEYCODE.NUM_MINUS:case a.FE.KEYCODE.NUM_PERIOD:case a.FE.KEYCODE.NUM_DIVISION:case a.FE.KEYCODE.SEMICOLON:case a.FE.KEYCODE.FF_SEMICOLON:case a.FE.KEYCODE.DASH:case a.FE.KEYCODE.EQUALS:case a.FE.KEYCODE.FF_EQUALS:case a.FE.KEYCODE.COMMA:case a.FE.KEYCODE.PERIOD:case a.FE.KEYCODE.SLASH:case a.FE.KEYCODE.APOSTROPHE:case a.FE.KEYCODE.SINGLE_QUOTE:case a.FE.KEYCODE.OPEN_SQUARE_BRACKET:case a.FE.KEYCODE.BACKSLASH:case a.FE.KEYCODE.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}function u(c){var d=c.which;return!!(r(c)||d>=37&&d<=40||!t(d)&&d!=a.FE.KEYCODE.DELETE&&d!=a.FE.KEYCODE.BACKSPACE&&d!=a.FE.KEYCODE.ENTER)||(A||(B=b.snapshot.get()),clearTimeout(A),void(A=setTimeout(function(){A=null,b.undo.saveStep()},Math.max(250,b.opts.typingTimer))))}function v(a){var c=a.which;return!!(r(a)||c>=37&&c<=40)||void(B&&A&&(b.undo.saveStep(B),B=null))}function w(){A&&(clearTimeout(A),b.undo.saveStep(),B=null)}function x(b){var c=b.which;return r(b)||c==a.FE.KEYCODE.F5}function y(){if(b.events.on("keydown",u),b.events.on("input",h),b.events.on("keyup input",v),b.events.on("keypress",k),b.events.on("keydown",m),b.events.on("keyup",q),b.events.on("html.inserted",q),b.events.on("cut",i),b.el.msGetInputContext)try{b.el.msGetInputContext().addEventListener("MSCandidateWindowShow",function(){C=!0}),b.el.msGetInputContext().addEventListener("MSCandidateWindowHide",function(){C=!1,q()})}catch(a){}}var z,A,B,C=!1;return{_init:y,ctrlKey:r,isCharacter:t,isArrow:s,forceUndo:w,isIME:l,isBrowserAction:x}},a.FE.MODULES.accessibility=function(b){function c(a){a&&a.length&&(a.data("blur-event-set")||a.parents(".fr-popup").length||(b.events.$on(a,"blur",function(c){var d=a.parents(".fr-toolbar, .fr-popup").data("instance")||b;d.events.blurActive()&&d.events.trigger("blur"),d.events.enableBlur()},!0),a.data("blur-event-set",!0)),b.events.disableBlur(),a.focus(),b.shared.$f_el=a)}function d(a,b){var d=b?"last":"first",e=a.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible")[d]();if(e.length)return c(e),!0}function e(a){return a.is("input, textarea")&&g(),b.events.disableBlur(),a.focus(),!0}function f(a,c){var d=a.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(c?":last":":first");if(d.length)return e(d);if(b.shared.with_kb){var f=a.find(".fr-active-item:visible:first");if(f.length)return e(f);var g=a.find("[tabIndex]:visible:first");if(g.length)return e(g)}}function g(){0===b.$el.find(".fr-marker").length&&b.core.hasFocus()&&b.selection.save()}function h(a){a.$el.find(".fr-marker").length&&(a.events.disableBlur(),a.selection.restore(),a.events.enableBlur())}function i(a){var c=a.children().not(".fr-buttons");c.data("mouseenter-event-set")||(b.events.$on(c,"mouseenter","[tabIndex]",function(d){var e=a.data("instance")||b;if(!E)return d.stopPropagation(),void d.preventDefault();var f=c.find(":focus:first");f.length&&!f.is("input, button")&&(e.events.disableBlur(),f.blur(),e.events.disableBlur(),e.events.focus())}),c.data("mouseenter-event-set",!0)),!f(c)&&b.shared.with_kb&&d(a.find(".fr-buttons"))}function j(){var a=b.popups.areVisible();if(a){var c=a.find(".fr-buttons");return c.find("button:focus, .fr-group span:focus").length?!d(a.data("instance").$tb):!d(c)}return!d(b.$tb)}function k(){var a=null;return b.shared.$f_el.is(".fr-dropdown.fr-active")?a=b.shared.$f_el:b.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active")&&(a=b.shared.$f_el.closest(".fr-dropdown-menu").prev()),a}function l(e,g,h){if(b.shared.$f_el){var i=k();i&&(b.button.click(i),b.shared.$f_el=i);var j=e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible"),l=j.index(b.shared.$f_el);if(0==l&&!h||l==j.length-1&&h){var m;if(g){if(e.parent().is(".fr-popup")){var n=e.parent().children().not(".fr-buttons");m=!f(n,!h)}m===!1&&(b.shared.$f_el=null)}g&&m===!1||d(e,!h)}else c(a(j.get(l+(h?1:-1))));return!1}}function m(a,b){return l(a,b,!0)}function n(a,b){return l(a,b)}function o(a){if(b.shared.$f_el){if(b.shared.$f_el.is(".fr-dropdown.fr-active")){var d;return d=a?b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first():b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last(),c(d),!1}if(b.shared.$f_el.is("a.fr-command")){var d;return d=a?b.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first():b.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first(),d.length||(d=a?b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first():b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()),c(d),!1}}}function p(){return b.shared.$f_el&&b.shared.$f_el.is(".fr-dropdown:not(.fr-active)")?r():o(!0)}function q(){return o()}function r(){if(b.shared.$f_el){if(b.shared.$f_el.hasClass("fr-dropdown"))b.button.click(b.shared.$f_el);else if(b.shared.$f_el.is("button.fr-back")){b.opts.toolbarInline&&(b.events.disableBlur(),b.events.focus());var a=b.popups.areVisible(b);a&&(b.shared.with_kb=!1),b.button.click(b.shared.$f_el),y(a)}else{if(b.events.disableBlur(),b.button.click(b.shared.$f_el),b.shared.$f_el.attr("data-popup")){var c=b.popups.areVisible(b);c&&c.data("popup-button",b.shared.$f_el)}else if(b.shared.$f_el.attr("data-modal")){var d=b.modals.areVisible(b);d&&d.data("modal-button",b.shared.$f_el)}b.shared.$f_el=null}return!1}}function s(){b.shared.$f_el&&(b.events.disableBlur(),b.shared.$f_el.blur(),b.shared.$f_el=null),b.events.disableBlur(),b.events.focus()}function t(a){if(b.shared.$f_el){var d=k();return d?(b.button.click(d),c(d)):a.parent().find(".fr-back:visible").length?(b.shared.with_kb=!1,b.opts.toolbarInline&&(b.events.disableBlur(),b.events.focus()),b.button.exec(a.parent().find(".fr-back:visible:first")),y(a.parent())):b.shared.$f_el.is("button, .fr-group span")&&(a.parent().is(".fr-popup")?(h(b),b.shared.$f_el=null,b.events.trigger("toolbar.esc")!==!1&&(b.popups.hide(a.parent()),b.opts.toolbarInline&&b.toolbar.showInline(null,!0),y(a.parent()))):s()),!1}}function u(c,d){var e=navigator.userAgent.indexOf("Mac OS X")!=-1?c.metaKey:c.ctrlKey,f=c.which,g=!1;return f!=a.FE.KEYCODE.TAB||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_RIGHT||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.TAB||e||!c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_LEFT||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_UP||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_DOWN||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ENTER||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ESC||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.F10||e||c.shiftKey||!c.altKey||(g=j()):g=t(d):g=r():g=p():g=q():g=n(d):g=n(d,!0):g=m(d):g=m(d,!0),b.shared.$f_el||void 0!==g||(g=!0),!g&&b.keys.isBrowserAction(c)&&(g=!0),!!g||(c.preventDefault(),c.stopPropagation(),!1)}function v(c){c&&c.length&&(b.events.$on(c,"keydown",function(d){if(!a(d.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command"))return!0;var e=c.parents(".fr-popup").data("instance")||c.data("instance")||b;b.shared.with_kb=!0;var f=e.accessibility.exec(d,c);return b.shared.with_kb=!1,f},!0),b.events.$on(c,"mouseenter","[tabIndex]",function(d){var e=c.parents(".fr-popup").data("instance")||c.data("instance")||b;if(!E)return d.stopPropagation(),void d.preventDefault();var f=a(d.currentTarget);e.shared.$f_el&&e.shared.$f_el.not(f)&&e.accessibility.focusEditor()},!0))}function w(a){var c=b.popups.get(a),d=x(a);v(c.find(".fr-buttons")),b.events.$on(c,"mouseenter","tabIndex",d._tiMouseenter,!0),b.events.$on(c.children().not(".fr-buttons"),"keydown","[tabIndex]",d._tiKeydown,!0),b.popups.onHide(a,function(){h(c.data("instance")||b)}),b.popups.onShow(a,function(){E=!1,setTimeout(function(){E=!0},0)})}function x(c){var e=b.popups.get(c);return{_tiKeydown:function(g){var i=e.data("instance")||b;if(i.events.trigger("popup.tab",[g])===!1)return!1;var j=g.which,k=e.find(":focus:first");if(a.FE.KEYCODE.TAB==j){g.preventDefault();var l=e.children().not(".fr-buttons"),m=l.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),n=m.indexOf(this)+(g.shiftKey?-1:1);if(0<=n&&n<m.length)return i.events.disableBlur(),a(m[n]).focus(),g.stopPropagation(),!1;var o=e.find(".fr-buttons");if(o.length&&d(o,!!g.shiftKey))return g.stopPropagation(),!1;if(f(l))return g.stopPropagation(),!1}else{if(a.FE.KEYCODE.ENTER!=j)return a.FE.KEYCODE.ESC==j?(g.preventDefault(),g.stopPropagation(),h(i),i.popups.isVisible(c)&&e.find(".fr-back:visible").length?(i.opts.toolbarInline&&(i.events.disableBlur(),i.events.focus()),i.button.exec(e.find(".fr-back:visible:first")),y(e)):i.popups.isVisible(c)&&e.find(".fr-dismiss:visible").length?i.button.exec(e.find(".fr-dismiss:visible:first")):(i.popups.hide(c),i.opts.toolbarInline&&i.toolbar.showInline(null,!0),y(e)),!1):a.FE.KEYCODE.SPACE==j&&(k.is(".fr-submit")||k.is(".fr-dismiss"))?(g.preventDefault(),g.stopPropagation(),i.events.disableBlur(),i.button.exec(k),!0):i.keys.isBrowserAction(g)?void g.stopPropagation():k.is("input[type=text], textarea")?void g.stopPropagation():a.FE.KEYCODE.SPACE==j&&(k.is(".fr-link-attr")||k.is("input[type=file]"))?void g.stopPropagation():(g.stopPropagation(),g.preventDefault(),!1);var p=null;e.find(".fr-submit:visible").length>0?p=e.find(".fr-submit:visible:first"):e.find(".fr-dismiss:visible").length&&(p=e.find(".fr-dismiss:visible:first")),p&&(g.preventDefault(),g.stopPropagation(),i.events.disableBlur(),i.button.exec(p))}},_tiMouseenter:function(a){var c=e.data("instance")||b;B(c)}}}function y(a){var b=a.data("popup-button");b&&setTimeout(function(){c(b),a.data("popup-button",null)},0)}function z(a){var b=a.data("modal-button");b&&setTimeout(function(){c(b),a.data("modal-button",null)},0)}function A(){return null!=b.shared.$f_el}function B(a){var c=b.popups.areVisible(a);c&&c.data("popup-button",null)}function C(c){var d=navigator.userAgent.indexOf("Mac OS X")!=-1?c.metaKey:c.ctrlKey,e=c.which;if(e==a.FE.KEYCODE.F10&&!d&&!c.shiftKey&&c.altKey){b.shared.with_kb=!0;var g=b.popups.areVisible(b),h=!1;return g&&(h=f(g.children().not(".fr-buttons"))),h||j(),b.shared.with_kb=!1,c.preventDefault(),c.stopPropagation(),!1}return!0}function D(){b.$wp?b.events.on("keydown",C,!0):b.events.$on(b.$win,"keydown",C,!0),b.events.on("mousedown",function(a){B(b),b.shared.$f_el&&(h(b),a.stopPropagation(),b.events.disableBlur(),b.shared.$f_el=null)},!0),b.events.on("blur",function(a){b.shared.$f_el=null,B(b)},!0)}var E=!0;return{_init:D,registerPopup:w,registerToolbar:v,focusToolbarElement:c,focusToolbar:d,focusContent:f,focusPopup:i,focusEditor:s,focusPopupButton:y,focusModalButton:z,hasFocus:A,exec:u,saveSelection:g,restoreSelection:h}},a.FE.MODULES.format=function(b){function c(a,b){var c="<"+a;for(var d in b)b.hasOwnProperty(d)&&(c+=" "+d+'="'+b[d]+'"');return c+=">"}function d(a){return"</"+a+">"}function e(a,b){var c=a;for(var d in b)b.hasOwnProperty(d)&&(a+="id"==d?"#"+b[d]:"class"==d?"."+b[d]:"["+d+'="'+b[d]+'"]');return c}function f(a,b){return!(!a||a.nodeType!=Node.ELEMENT_NODE)&&(a.matches||a.matchesSelector||a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.oMatchesSelector).call(a,b)}function g(d,e,f){if(d){if(b.node.isBlock(d))return g(d.firstChild,e,f),!1;for(var h=a(c(e,f)).insertBefore(d),i=d;i&&!a(i).is(".fr-marker")&&0==a(i).find(".fr-marker").length;){var j=i;i=i.nextSibling,h.append(j)}if(i)a(i).find(".fr-marker").length&&g(i.firstChild,e,f);else{for(var k=h.get(0).parentNode;k&&!k.nextSibling&&!b.node.isElement(k);)k=k.parentNode;if(k){var l=k.nextSibling;l&&(b.node.isBlock(l)?g(l.firstChild,e,f):g(l,e,f))}}h.is(":empty")&&h.remove()}}function h(h,i){if("undefined"==typeof i&&(i={}),i.style&&delete i.style,b.selection.isCollapsed()){b.markers.insert();var j=b.$el.find(".fr-marker");j.replaceWith(c(h,i)+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+d(h)),b.selection.restore()}else{b.selection.save();var k=b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling;g(k,h,i);var l;do l=b.$el.find(e(h,i)+" > "+e(h,i)),l.each(function(){a(this).replaceWith(this.innerHTML)});while(l.length);b.el.normalize();for(var m=b.el.querySelectorAll(".fr-marker"),n=0;n<m.length;n++){var o=a(m[n]);1==o.data("type")?f(o.get(0).nextSibling,e(h,i))&&o.next().prepend(o):f(o.get(0).previousSibling,e(h,i))&&o.prev().append(o)}b.selection.restore()}}function i(a,c,d,g){if(!g){var h=!1;if(a.data("type")===!0)for(;b.node.isFirstSibling(a.get(0))&&!a.parent().is(b.$el);)a.parent().before(a),h=!0;else if(a.data("type")===!1)for(;b.node.isLastSibling(a.get(0))&&!a.parent().is(b.$el);)a.parent().after(a),h=!0;if(h)return!0}if(a.parents(c).length||"undefined"==typeof c){var i="",j="",k=a.parent();if(k.is(b.$el)||b.node.isBlock(k.get(0)))return!1;for(;"undefined"==typeof c&&!b.node.isBlock(k.parent().get(0))||"undefined"!=typeof c&&!f(k.get(0),e(c,d));)i+=b.node.closeTagString(k.get(0)),j=b.node.openTagString(k.get(0))+j,k=k.parent();var l=a.get(0).outerHTML;a.replaceWith('<span id="mark"></span>');var m=k.html().replace(/<span id="mark"><\/span>/,i+b.node.closeTagString(k.get(0))+j+l+i+b.node.openTagString(k.get(0))+j);return k.replaceWith(b.node.openTagString(k.get(0))+m+b.node.closeTagString(k.get(0))),!0}return!1}function j(c,d,g,h){for(var i=b.node.contents(c.get(0)),k=0;k<i.length;k++){var l=i[k];b.node.hasClass(l,"fr-marker")?d=(d+1)%2:d?a(l).find(".fr-marker").length>0?d=j(a(l),d,g,h):(a(a(l).find(g||"*").get().reverse()).each(function(){b.node.isBlock(this)||b.node.isVoid(this)||a(this).replaceWith(this.innerHTML)}),"undefined"==typeof g&&l.nodeType==Node.ELEMENT_NODE&&!b.node.isVoid(l)&&!b.node.isBlock(l)||f(l,e(g,h))?a(l).replaceWith(l.innerHTML):"undefined"==typeof g&&l.nodeType==Node.ELEMENT_NODE&&b.node.isBlock(l)&&a(l).removeAttr("style")):a(l).find(".fr-marker").length>0&&(d=j(a(l),d,g,h))}return d}function k(c,d){"undefined"==typeof d&&(d={}),d.style&&delete d.style;var e=b.selection.isCollapsed();b.selection.save();for(var f=!0;f;){f=!1;for(var g=b.$el.find(".fr-marker"),h=0;h<g.length;h++)if(i(a(g[h]),c,d,e)){f=!0;break}}j(b.$el,0,c,d),e&&b.$el.find(".fr-marker").before(a.FE.INVISIBLE_SPACE).after(a.FE.INVISIBLE_SPACE),b.html.cleanEmptyTags(),b.el.normalize(),b.selection.restore()}function l(a,b){q(a,b)?k(a,b):h(a,b)}function m(b,c){var d=a(b);d.css(c,""),""===d.attr("style")&&d.replaceWith(d.html())}function n(b,c){return 0===a(b).attr("style").indexOf(c+":")||a(b).attr("style").indexOf(";"+c+":")>=0||a(b).attr("style").indexOf("; "+c+":")>=0}function o(c,d){if(b.selection.isCollapsed()){b.markers.insert();var e=b.$el.find(".fr-marker"),f=e.parent();if(b.node.openTagString(f.get(0))=='<span style="'+c+": "+f.css(c)+';">')if(b.node.isEmpty(f.get(0)))f.replaceWith('<span style="'+c+": "+d+';">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>");else{var h={};h[c]=d,i(e,"span",h,!0),e=b.$el.find(".fr-marker"),e.replaceWith('<span style="'+c+": "+d+';">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>")}else b.node.isEmpty(f.get(0))&&f.is("span")?(e.replaceWith(a.FE.MARKERS),f.css(c,d)):e.replaceWith('<span style="'+c+": "+d+';">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>");b.selection.restore()}else{b.selection.save();for(var j=b.$el.find(".fr-marker"),k=0;k<j.length;k++){var e=a(j[k]);if(e.data("type")===!0)for(;b.node.isFirstSibling(e.get(0))&&!e.parent().is(b.$el);)e.parent().before(e);else for(;b.node.isLastSibling(e.get(0))&&!e.parent().is(b.$el);)e.parent().after(e)}var l=b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling,o={class:"fr-unprocessed"};for(d&&(o.style=c+": "+d+";"),g(l,"span",o),b.$el.find(".fr-marker + .fr-unprocessed").each(function(){a(this).prepend(a(this).prev())}),b.$el.find(".fr-unprocessed + .fr-marker").each(function(){a(this).prev().append(this)});b.$el.find("span.fr-unprocessed").length>0;){var p=b.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed");if(p.parent().get(0).normalize(),p.parent().is("span")&&1==p.parent().get(0).childNodes.length){p.parent().css(c,d);var q=p;p=p.parent(),q.replaceWith(q.html())}for(var r=p.find("span"),k=r.length-1;k>=0;k--)m(r[k],c);var s=p.parentsUntil(b.$el,"span[style]").filter(function(){return n(this,c)});if(s.length){var t="",u="",v="",w="",x=p.get(0);do x=x.parentNode,a(x).addClass("fr-split"),t+=b.node.closeTagString(x),u=b.node.openTagString(a(x).clone().addClass("fr-split").get(0))+u,s.get(0)!=x&&(v+=b.node.closeTagString(x),w=b.node.openTagString(a(x).clone().addClass("fr-split").get(0))+w);while(s.get(0)!=x);var y=t+b.node.openTagString(a(s.get(0)).clone().css(c,d||"").get(0))+w+p.css(c,"").get(0).outerHTML+v+"</span>"+u;p.replaceWith('<span id="fr-break"></span>');var z=s.get(0).outerHTML;a(s.get(0)).replaceWith(z.replace(/<span id="fr-break"><\/span>/g,y))}}for(;b.$el.find(".fr-split:empty").length>0;)b.$el.find(".fr-split:empty").remove();b.$el.find(".fr-split").removeClass("fr-split"),b.$el.find('span[style=""]').removeAttr("style"),b.$el.find('span[class=""]').removeAttr("class"),b.html.cleanEmptyTags(),a(b.$el.find("span").get().reverse()).each(function(){this.attributes&&0!=this.attributes.length||a(this).replaceWith(this.innerHTML)}),b.el.normalize();var A=b.$el.find("span[style] + span[style]");for(k=0;k<A.length;k++){var B=a(A[k]),C=a(A[k]).prev();B.get(0).previousSibling==C.get(0)&&b.node.openTagString(B.get(0))==b.node.openTagString(C.get(0))&&(B.prepend(C.html()),C.remove())}b.el.normalize(),b.selection.restore()}}function p(a){o(a,null)}function q(a,c){"undefined"==typeof c&&(c={}),c.style&&delete c.style;var d=b.selection.ranges(0),g=d.startContainer;g.nodeType==Node.ELEMENT_NODE&&g.childNodes.length>0&&g.childNodes[d.startOffset]&&(g=g.childNodes[d.startOffset]);for(var h=g;h&&h.nodeType==Node.ELEMENT_NODE&&!f(h,e(a,c));)h=h.firstChild;if(h&&h.nodeType==Node.ELEMENT_NODE&&f(h,e(a,c)))return!0;var i=g;for(i&&i.nodeType!=Node.ELEMENT_NODE&&(i=i.parentNode);i&&i.nodeType==Node.ELEMENT_NODE&&i!=b.el&&!f(i,e(a,c));)i=i.parentNode;return!(!i||i.nodeType!=Node.ELEMENT_NODE||i==b.el||!f(i,e(a,c)))}return{is:q,toggle:l,apply:h,remove:k,applyStyle:o,removeStyle:p}},a.FE.COMMANDS={bold:{title:"Bold",toggle:!0,refresh:function(a){var b=this.format.is("strong");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},italic:{title:"Italic",toggle:!0,refresh:function(a){var b=this.format.is("em");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},underline:{title:"Underline",toggle:!0,refresh:function(a){var b=this.format.is("u");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},strikeThrough:{title:"Strikethrough",toggle:!0,refresh:function(a){var b=this.format.is("s");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},subscript:{title:"Subscript",toggle:!0,refresh:function(a){var b=this.format.is("sub");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},superscript:{title:"Superscript",toggle:!0,refresh:function(a){var b=this.format.is("sup");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},outdent:{title:"Decrease Indent"},indent:{title:"Increase Indent"},undo:{title:"Undo",undo:!1,forcedRefresh:!0,disabled:!0},redo:{title:"Redo",undo:!1,forcedRefresh:!0,disabled:!0},insertHR:{title:"Insert Horizontal Line"},clearFormatting:{title:"Clear Formatting"},selectAll:{title:"Select All",undo:!1}},a.FE.RegisterCommand=function(b,c){a.FE.COMMANDS[b]=c},a.FE.MODULES.commands=function(b){function c(c,d){if(b.events.trigger("commands.before",a.merge([c],d||[]))!==!1){var e=a.FE.COMMANDS[c]&&a.FE.COMMANDS[c].callback||h[c],f=!0,g=!1;a.FE.COMMANDS[c]&&("undefined"!=typeof a.FE.COMMANDS[c].focus&&(f=a.FE.COMMANDS[c].focus),"undefined"!=typeof a.FE.COMMANDS[c].accessibilityFocus&&(g=a.FE.COMMANDS[c].accessibilityFocus)),(!b.core.hasFocus()&&f&&!b.popups.areVisible()||!b.core.hasFocus()&&g&&b.accessibility.hasFocus())&&b.events.focus(!0),a.FE.COMMANDS[c]&&a.FE.COMMANDS[c].undo!==!1&&(b.$el.find(".fr-marker").length&&(b.events.disableBlur(),b.selection.restore()),b.undo.saveStep()),e&&e.apply(b,a.merge([c],d||[])),b.events.trigger("commands.after",a.merge([c],d||[])),a.FE.COMMANDS[c]&&a.FE.COMMANDS[c].undo!==!1&&b.undo.saveStep()}}function d(a,c){b.format.toggle(c)}function e(c){b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();for(var d=b.selection.blocks(),e=0;e<d.length;e++)if("LI"!=d[e].tagName&&"LI"!=d[e].parentNode.tagName){var f=a(d[e]),g="rtl"==b.opts.direction||"rtl"==f.css("direction")?"margin-right":"margin-left",h=b.helpers.getPX(f.css(g));f.css(g,Math.max(h+20*c,0)||""),f.removeClass("fr-temp-div")}b.selection.save(),b.html.unwrap(),b.selection.restore()}function f(a){return function(){c(a)}}function g(){b.events.on("keydown",function(a){var c=b.selection.element();if(c&&"HR"==c.tagName&&!b.keys.isArrow(a.which))return a.preventDefault(),!1}),b.events.on("keyup",function(c){var d=b.selection.element();if(d&&"HR"==d.tagName)if(c.which==a.FE.KEYCODE.ARROW_LEFT||c.which==a.FE.KEYCODE.ARROW_UP){if(d.previousSibling)return b.node.isBlock(d.previousSibling)?b.selection.setAtEnd(d.previousSibling):a(d).before(a.FE.MARKERS),b.selection.restore(),!1}else if((c.which==a.FE.KEYCODE.ARROW_RIGHT||c.which==a.FE.KEYCODE.ARROW_DOWN)&&d.nextSibling)return b.node.isBlock(d.nextSibling)?b.selection.setAtStart(d.nextSibling):a(d).after(a.FE.MARKERS),b.selection.restore(),!1}),b.events.on("mousedown",function(a){if(a.target&&"HR"==a.target.tagName)return a.preventDefault(),a.stopPropagation(),!1}),b.events.on("mouseup",function(c){var d=b.selection.element(),e=b.selection.endElement();d==e&&d&&"HR"==d.tagName&&(d.nextSibling&&(b.node.isBlock(d.nextSibling)?b.selection.setAtStart(d.nextSibling):a(d).after(a.FE.MARKERS)),b.selection.restore())})}var h={bold:function(){d("bold","strong")},subscript:function(){d("subscript","sub")},superscript:function(){d("superscript","sup")},italic:function(){d("italic","em")},strikeThrough:function(){d("strikeThrough","s")},underline:function(){d("underline","u")},undo:function(){b.undo.run()},redo:function(){b.undo.redo()},indent:function(){e(1)},outdent:function(){e(-1)},show:function(){b.opts.toolbarInline&&b.toolbar.showInline(null,!0)},insertHR:function(){b.selection.remove();var a="";b.core.isEmpty()&&(a="<br>",b.html.defaultTag()&&(a="<"+b.html.defaultTag()+">"+a+"</"+b.html.defaultTag()+">")),b.html.insert('<hr id="fr-just">'+a);var c=b.$el.find("hr#fr-just");c.removeAttr("id"),b.selection.setAfter(c.get(0),!1)||b.selection.setBefore(c.get(0),!1),b.selection.restore()},clearFormatting:function(){b.format.remove()},selectAll:function(){b.doc.execCommand("selectAll",!1,!1)}},i={};for(var j in h)h.hasOwnProperty(j)&&(i[j]=f(j));return a.extend(i,{exec:c,_init:g})},a.FE.MODULES.data=function(a){function b(a){return a}function c(a){if(!a)return a;for(var c="",f=b("charCodeAt"),g=b("fromCharCode"),h=l.indexOf(a[0]),i=1;i<a.length-2;i++){for(var j=d(++h),k=a[f](i),m="";/[0-9-]/.test(a[i+1]);)m+=a[++i];m=parseInt(m,10)||0,k=e(k,j,m),k^=h-1&31,c+=String[g](k)}return c}function d(a){for(var b=a.toString(),c=0,d=0;d<b.length;d++)c+=parseInt(b.charAt(d),10);return c>10?c%9+1:c}function e(a,b,c){for(var d=Math.abs(c);d-- >0;)a-=b;return c<0&&(a+=123),a}function f(a){return!(!a||"none"!=a.css("display")||(a.remove(),0))}function g(){return f(j)||f(k)}function h(){return!!a.$box&&(a.$box.append(n(b(n("kTDD4spmKD1klaMB1C7A5RA1G3RA10YA5qhrjuvnmE1D3FD2bcG-7noHE6B2JB4C3xXA8WF6F-10RG2C3G3B-21zZE3C3H3xCA16NC4DC1f1hOF1MB3B-21whzQH5UA2WB10kc1C2F4D3XC2YD4D1C4F3GF2eJ2lfcD-13HF1IE1TC11TC7WE4TA4d1A2YA6XA4d1A3yCG2qmB-13GF4A1B1KH1HD2fzfbeQC3TD9VE4wd1H2A20A2B-22ujB3nBG2A13jBC10D3C2HD5D1H1KB11uD-16uWF2D4A3F-7C9D-17c1E4D4B3d1D2CA6B2B-13qlwzJF2NC2C-13E-11ND1A3xqUA8UE6bsrrF-7C-22ia1D2CF2H1E2akCD2OE1HH1dlKA6PA5jcyfzB-22cXB4f1C3qvdiC4gjGG2H2gklC3D-16wJC1UG4dgaWE2D5G4g1I2H3B7vkqrxH1H2EC9C3E4gdgzKF1OA1A5PF5C4WWC3VA6XA4e1E3YA2YA5HE4oGH4F2H2IB10D3D2NC5G1B1qWA9PD6PG5fQA13A10XA4C4A3e1H2BA17kC-22cmOB1lmoA2fyhcptwWA3RA8A-13xB-11nf1I3f1B7GB3aD3pavFC10D5gLF2OG1LSB2D9E7fQC1F4F3wpSB5XD3NkklhhaE-11naKA9BnIA6D1F5bQA3A10c1QC6Kjkvitc2B6BE3AF3E2DA6A4JD2IC1jgA-64MB11D6C4==")))),j=a.$box.find("> div:last"),k=j.find("> a"),void("rtl"==a.opts.direction&&j.css("left","auto").css("right",0)))}function i(){var c=a.opts.key||[""];"string"==typeof c&&(c=[c]),a.ul=!0;for(var d=0;d<c.length;d++){var e=n(c[d])||"";if(!(e!==n(b(n("mcVRDoB1BGILD7YFe1BTXBA7B6==")))&&e.indexOf(m,e.length-m.length)<0&&[n("9qqG-7amjlwq=="),n("KA3B3C2A6D1D5H5H1A3=="),n("QzbzvxyB2yA-9m=="),n("naamngiA3dA-16xtE-11C-9B1H-8sc==")].indexOf(m)<0)){a.ul=!1;break}}a.ul===!0&&h(),a.events.on("contentChanged",function(){a.ul===!0&&g()&&h()}),a.events.on("destroy",function(){j&&j.length&&j.remove()},!0)}var j,k,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",m=function(){for(var a=0,b=document.domain,c=b.split("."),d="_gd"+(new Date).getTime();a<c.length-1&&document.cookie.indexOf(d+"="+d)==-1;)b=c.slice(-1-++a).join("."),document.cookie=d+"="+d+";domain="+b+";";return document.cookie=d+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+b+";",(b||"").replace(/(^\.*)|(\.*$)/g,"")}(),n=b(c);return{_init:i}},a.extend(a.FE.DEFAULTS,{pastePlain:!1,pasteDeniedTags:["colgroup","col"],pasteDeniedAttrs:["class","id","style"],pasteAllowLocalImages:!1}),a.FE.MODULES.paste=function(b){function c(c){a.FE.copied_html=b.html.getSelected(),a.FE.copied_text=a("<div>").html(a.FE.copied_html).text(),"cut"==c.type&&(b.undo.saveStep(),setTimeout(function(){b.selection.save(),b.html.wrap(),b.selection.restore(),b.events.focus(),b.undo.saveStep()},0))}function d(a){if(o)return!1;if(a.originalEvent&&(a=a.originalEvent),b.events.trigger("paste.before",[a])===!1)return a.preventDefault(),!1;if(l=b.$win.scrollTop(),a&&a.clipboardData&&a.clipboardData.getData){var c="",d=a.clipboardData.types;if(b.helpers.isArray(d))for(var f=0;f<d.length;f++)c+=d[f]+";";else c=d;if(m="",/text\/html/.test(c)?m=a.clipboardData.getData("text/html"):/text\/rtf/.test(c)&&b.browser.safari?m=a.clipboardData.getData("text/rtf"):/text\/plain/.test(c)&&!this.browser.mozilla&&(m=b.html.escapeEntities(a.clipboardData.getData("text/plain")).replace(/\n/g,"<br>")),""!==m)return h(),a.preventDefault&&(a.stopPropagation(),a.preventDefault()),!1;m=null}e()}function e(){b.selection.save(),b.events.disableBlur(),m=null,n?n.html(""):(n=a('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 9999; line-height: 140%;" tabIndex="-1"></div>'),b.$box.after(n),b.events.on("destroy",function(){n.remove()})),n.focus(),b.win.setTimeout(h,1)}function f(a){a=a.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ul><li>$3</li></ul>"),a=a.replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ol><li>$3</li></ol>"),a=a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ul><li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ol><li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li></ul>"),a=a.replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li></ol>"),a=a.replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi,"<span><span"),a=a.replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi,""),a=a.replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi,""),a=a.replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi," "),a=a.replace(/<!--[\s\S]*?-->/gi,""),a=a.replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi,"");for(var c=["style","script","applet","embed","noframes","noscript"],d=0;d<c.length;d++){var e=new RegExp("<"+c[d]+".*?"+c[d]+"(.*?)>","gi");
a=a.replace(e,"")}a=a.replace(/&nbsp;/gi," "),a=a.replace(/<td([^>]*)><\/td>/g,"<td$1><br></td>"),a=a.replace(/<th([^>]*)><\/th>/g,"<th$1><br></th>");var f;do f=a,a=a.replace(/<[^\/>][^>]*><\/[^>]+>/gi,"");while(a!=f);a=a.replace(/<lilevel([^1])([^>]*)>/gi,'<li data-indent="true"$2>'),a=a.replace(/<lilevel1([^>]*)>/gi,"<li$1>"),a=b.clean.html(a,b.opts.pasteDeniedTags,b.opts.pasteDeniedAttrs),a=a.replace(/<a>(.[^<]+)<\/a>/gi,"$1"),a=a.replace(/<br> */g,"<br>");var g=b.doc.createElement("div");g.innerHTML=a;for(var h=g.querySelectorAll("li[data-indent]"),d=0;d<h.length;d++){var i=h[d],j=i.previousElementSibling;if(j&&"LI"==j.tagName){var k=j.querySelector(":scope > ul, :scope > ol");k||(k=document.createElement("ul"),j.appendChild(k)),k.appendChild(i)}else i.removeAttribute("data-indent")}return b.html.cleanBlankSpaces(g),a=g.innerHTML}function g(a){var c=b.doc.createElement("div");c.innerHTML=a;for(var d=c.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote"),e=0;e<d.length;e++){var f=d[e];f.outerHTML="<"+(b.html.defaultTag()||"DIV")+">"+f.innerHTML+"</"+(b.html.defaultTag()||"DIV")+">"}d=c.querySelectorAll("*:not("+"p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(")+")");for(var e=d.length-1;e>=0;e--){var f=d[e];f.outerHTML=f.innerHTML}var g=function(a){for(var c=b.node.contents(a),d=0;d<c.length;d++)c[d].nodeType!=Node.TEXT_NODE&&c[d].nodeType!=Node.ELEMENT_NODE?c[d].parentNode.removeChild(c[d]):g(c[d])};return g(c),c.innerHTML}function h(){b.keys.forceUndo();var c=b.snapshot.get();null===m&&(m=n.get(0).innerHTML,b.selection.restore(),b.events.enableBlur());var d=b.events.chainTrigger("paste.beforeCleanup",m);"string"==typeof d&&(m=d);var e=!1;m.match(/(class=\"?Mso|class=\'?Mso|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi)&&(e=!0),m.indexOf("<body")>=0&&(m=m.replace(/[.\s\S\w\W<>]*<body[^>]*>([.\s\S\w\W<>]*)<\/body>[.\s\S\w\W<>]*/g,"$1"));var h=!1;if(m.indexOf('id="docs-internal-guid')>=0&&(m=m.replace(/^.* id="docs-internal-guid[^>]*>(.*)<\/b>.*$/,"$1"),h=!0),e)m=m.replace(/^\n*/g,"").replace(/^ /g,""),0===m.indexOf("<colgroup>")&&(m="<table>"+m+"</table>"),m=f(m),m=j(m);else{b.opts.htmlAllowComments=!1,m=b.clean.html(m,b.opts.pasteDeniedTags,b.opts.pasteDeniedAttrs),b.opts.htmlAllowComments=!0,m=j(m),m=m.replace(/\r|\n|\t/g,"");var k=b.doc.createElement("div");k.innerHTML=m,a.FE.copied_text&&k.textContent.replace(/(\u00A0)/gi," ").replace(/\r|\n/gi,"")==a.FE.copied_text.replace(/(\u00A0)/gi," ").replace(/\r|\n/gi,"")&&(m=a.FE.copied_html),m=m.replace(/^ */g,"").replace(/ *$/g,"")}if(b.opts.pastePlain&&(m=g(m)),d=b.events.chainTrigger("paste.afterCleanup",m),"string"==typeof d&&(m=d),""!==m){var l=b.o_doc.createElement("div");l.innerHTML=m,b.spaces.normalize(l);for(var o=l.getElementsByTagName("span"),p=0;p<o.length;p++){var q=o[p];0===q.attributes.length&&(q.outerHTML=q.innerHTML)}var r=l.children;if(1==r.length&&["OL","UL"].indexOf(r[0].tagName)&&(r[0].outerHTML=r[0].innerHTML),!h)for(var s=l.getElementsByTagName("br"),p=0;p<s.length;p++){var t=s[p];b.node.isBlock(t.previousSibling)&&t.parentNode.removeChild(t)}if(b.opts.enter==a.FE.ENTER_BR)for(var u=l.querySelectorAll("p, div"),p=0;p<u.length;p++){var v=u[p];v.outerHTML=v.innerHTML+(v.nextSibling&&!b.node.isEmpty(v)?"<br>":"")}else if(b.opts.enter==a.FE.ENTER_DIV)for(var u=l.getElementsByTagName("p"),p=0;p<u.length;p++){var v=u[p];v.outerHTML="<div>"+v.innerHTML+"</div>"}m=l.innerHTML,b.html.insert(m,!0)}i(),b.undo.saveStep(c),b.undo.saveStep()}function i(){b.events.trigger("paste.after")}function j(a){var c=b.doc.createElement("div");c.innerHTML=a;for(var d=c.querySelectorAll("*:empty:not(br):not(img):not(td):not(th)");d.length;){for(var e=0;e<d.length;e++)d[e].parentNode.removeChild(d[e]);d=c.querySelectorAll("*:empty:not(br):not(img):not(td):not(th)")}for(var f=c.querySelectorAll(":scope > div:not([style]), td > div, th > div, li > div");f.length;){var g=f[f.length-1];if(b.html.defaultTag()&&"div"!=b.html.defaultTag())g.outerHTML="<"+b.html.defaultTag()+">"+g.innerHTML+"</"+b.html.defaultTag()+">";else{var h=g.querySelector("*:last");h&&"BR"==h.tagName?g.outerHTML=g.innerHTML:g.outerHTML=g.innerHTML+"<br>"}f=c.querySelectorAll(":scope > div:not([style]), td > div, th > div, li > div")}for(f=c.querySelectorAll("div:not([style])");f.length;){for(e=0;e<f.length;e++){var i=f[e],j=i.innerHTML.replace(/\u0009/gi,"").trim();i.outerHTML=j}f=c.querySelectorAll("div:not([style])")}return c.innerHTML}function k(){b.events.on("copy",c),b.events.on("cut",c),b.events.on("paste",d),b.browser.msie&&b.browser.version<11&&(b.events.on("mouseup",function(a){2==a.button&&(setTimeout(function(){o=!1},50),o=!0)},!0),b.events.on("beforepaste",d))}var l,m,n,o=!1;return{_init:k}},a.extend(a.FE.DEFAULTS,{shortcutsEnabled:["show","bold","italic","underline","strikeThrough","indent","outdent","undo","redo"],shortcutsHint:!0}),a.FE.SHORTCUTS_MAP={},a.FE.RegisterShortcut=function(b,c,d,e,f,g){a.FE.SHORTCUTS_MAP[(f?"^":"")+(g?"@":"")+b]={cmd:c,val:d,letter:e,shift:f,option:g},a.FE.DEFAULTS.shortcutsEnabled.push(c)},a.FE.RegisterShortcut(a.FE.KEYCODE.E,"show",null,"E",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.B,"bold",null,"B",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.I,"italic",null,"I",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.U,"underline",null,"U",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.S,"strikeThrough",null,"S",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.CLOSE_SQUARE_BRACKET,"indent",null,"]",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.OPEN_SQUARE_BRACKET,"outdent",null,"[",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.Z,"undo",null,"Z",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.Z,"redo",null,"Z",!0,!1),a.FE.MODULES.shortcuts=function(b){function c(c){if(!b.opts.shortcutsHint)return null;if(!f){f={};for(var d in a.FE.SHORTCUTS_MAP)a.FE.SHORTCUTS_MAP.hasOwnProperty(d)&&b.opts.shortcutsEnabled.indexOf(a.FE.SHORTCUTS_MAP[d].cmd)>=0&&(f[a.FE.SHORTCUTS_MAP[d].cmd+"."+(a.FE.SHORTCUTS_MAP[d].val||"")]={shift:a.FE.SHORTCUTS_MAP[d].shift,option:a.FE.SHORTCUTS_MAP[d].option,letter:a.FE.SHORTCUTS_MAP[d].letter})}var e=f[c];return e?(b.helpers.isMac()?String.fromCharCode(8984):"Ctrl+")+(e.shift?b.helpers.isMac()?String.fromCharCode(8679):"Shift+":"")+(e.option?b.helpers.isMac()?String.fromCharCode(8997):"Alt+":"")+e.letter:null}function d(c){if(!b.core.hasFocus())return!0;var d=c.which,e=navigator.userAgent.indexOf("Mac OS X")!=-1?c.metaKey:c.ctrlKey;if("keyup"==c.type&&g&&d!=a.FE.KEYCODE.META)return g=!1,!1;"keydown"==c.type&&(g=!1);var f=(c.shiftKey?"^":"")+(c.altKey?"@":"")+d;if(e&&a.FE.SHORTCUTS_MAP[f]){var h=a.FE.SHORTCUTS_MAP[f].cmd;if(h&&b.opts.shortcutsEnabled.indexOf(h)>=0){var i,j=a.FE.SHORTCUTS_MAP[f].val;if(h&&!j?i=b.$tb.find('.fr-command[data-cmd="'+h+'"]'):h&&j&&(i=b.$tb.find('.fr-command[data-cmd="'+h+'"][data-param1="'+j+'"]')),i.length)return c.preventDefault(),c.stopPropagation(),i.parents(".fr-toolbar").data("instance",b),"keydown"==c.type&&(b.button.exec(i),g=!0),!1;if(h&&b.commands[h])return c.preventDefault(),c.stopPropagation(),"keydown"==c.type&&(b.commands[h](),g=!0),!1}}}function e(){b.events.on("keydown",d,!0),b.events.on("keyup",d,!0)}var f=null,g=!1;return{_init:e,get:c}},a.FE.MODULES.snapshot=function(a){function b(a){for(var b=a.parentNode.childNodes,c=0,d=null,e=0;e<b.length;e++){if(d){var f=b[e].nodeType===Node.TEXT_NODE&&""===b[e].textContent,g=d.nodeType===Node.TEXT_NODE&&b[e].nodeType===Node.TEXT_NODE;f||g||c++}if(b[e]==a)return c;d=b[e]}}function c(c){var d=[];if(!c.parentNode)return[];for(;!a.node.isElement(c);)d.push(b(c)),c=c.parentNode;return d.reverse()}function d(a,b){for(;a&&a.nodeType===Node.TEXT_NODE;){var c=a.previousSibling;c&&c.nodeType==Node.TEXT_NODE&&(b+=c.textContent.length),a=c}return b}function e(a){return{scLoc:c(a.startContainer),scOffset:d(a.startContainer,a.startOffset),ecLoc:c(a.endContainer),ecOffset:d(a.endContainer,a.endOffset)}}function f(){var b={};if(a.events.trigger("snapshot.before"),b.html=(a.$wp?a.$el.html():a.$oel.get(0).outerHTML).replace(/ style=""/g,""),b.ranges=[],a.$wp&&a.selection.inEditor()&&a.core.hasFocus())for(var c=a.selection.ranges(),d=0;d<c.length;d++)b.ranges.push(e(c[d]));return a.events.trigger("snapshot.after"),b}function g(b){for(var c=a.el,d=0;d<b.length;d++)c=c.childNodes[b[d]];return c}function h(b,c){try{var d=g(c.scLoc),e=c.scOffset,f=g(c.ecLoc),h=c.ecOffset,i=a.doc.createRange();i.setStart(d,e),i.setEnd(f,h),b.addRange(i)}catch(j){}}function i(b){a.$el.html()!=b.html&&a.$el.html(b.html);var c=a.selection.get();a.selection.clear(),a.events.focus(!0);for(var d=0;d<b.ranges.length;d++)h(c,b.ranges[d])}function j(b,c){return b.html==c.html&&(!a.core.hasFocus()||JSON.stringify(b.ranges)==JSON.stringify(c.ranges))}return{get:f,restore:i,equal:j}},a.FE.MODULES.undo=function(a){function b(b){var c=b.which,d=a.keys.ctrlKey(b);d&&(90==c&&b.shiftKey&&b.preventDefault(),90==c&&b.preventDefault())}function c(){return!(0===a.undo_stack.length||a.undo_index<=1)}function d(){return a.undo_index!=a.undo_stack.length}function e(b){return!(!a.undo_stack||a.undoing||a.el.querySelector(".fr-marker"))&&void("undefined"==typeof b?(b=a.snapshot.get(),a.undo_stack[a.undo_index-1]&&a.snapshot.equal(a.undo_stack[a.undo_index-1],b)||(f(),a.undo_stack.push(b),a.undo_index++,b.html!=l&&(a.events.trigger("contentChanged"),l=b.html))):(f(),a.undo_index>0?a.undo_stack[a.undo_index-1]=b:(a.undo_stack.push(b),a.undo_index++)))}function f(){if(!a.undo_stack||a.undoing)return!1;for(;a.undo_stack.length>a.undo_index;)a.undo_stack.pop()}function g(){if(a.undo_index>1){a.undoing=!0;var b=a.undo_stack[--a.undo_index-1];clearTimeout(a._content_changed_timer),a.snapshot.restore(b),l=b.html,a.popups.hideAll(),a.toolbar.enable(),a.events.trigger("contentChanged"),a.events.trigger("commands.undo"),a.undoing=!1}}function h(){if(a.undo_index<a.undo_stack.length){a.undoing=!0;var b=a.undo_stack[a.undo_index++];clearTimeout(a._content_changed_timer),a.snapshot.restore(b),l=b.html,a.popups.hideAll(),a.toolbar.enable(),a.events.trigger("contentChanged"),a.events.trigger("commands.redo"),a.undoing=!1}}function i(){a.undo_index=0,a.undo_stack=[]}function j(){a.undo_stack=[]}function k(){i(),a.events.on("initialized",function(){l=(a.$wp?a.$el.html():a.$oel.get(0).outerHTML).replace(/ style=""/g,"")}),a.events.on("blur",function(){a.el.querySelector(".fr-dragging")||a.undo.saveStep()}),a.events.on("keydown",b),a.events.on("destroy",j)}var l=null;return{_init:k,run:g,redo:h,canDo:c,canRedo:d,dropRedo:f,reset:i,saveStep:e}},a.FE.ICON_DEFAULT_TEMPLATE="font_awesome",a.FE.ICON_TEMPLATES={font_awesome:'<i class="fa fa-[NAME]" aria-hidden="true"></i>',text:'<span style="text-align: center;">[NAME]</span>',image:"<img src=[SRC] alt=[ALT] />",svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>'},a.FE.ICONS={bold:{NAME:"bold"},italic:{NAME:"italic"},underline:{NAME:"underline"},strikeThrough:{NAME:"strikethrough"},subscript:{NAME:"subscript"},superscript:{NAME:"superscript"},color:{NAME:"tint"},outdent:{NAME:"outdent"},indent:{NAME:"indent"},undo:{NAME:"rotate-left"},redo:{NAME:"rotate-right"},insertHR:{NAME:"minus"},clearFormatting:{NAME:"eraser"},selectAll:{NAME:"mouse-pointer"}},a.FE.DefineIconTemplate=function(b,c){a.FE.ICON_TEMPLATES[b]=c},a.FE.DefineIcon=function(b,c){a.FE.ICONS[b]=c},a.FE.MODULES.icon=function(b){function c(b){var c=null,d=a.FE.ICONS[b];if("undefined"!=typeof d){var e=d.template||a.FE.ICON_DEFAULT_TEMPLATE;e&&(e=a.FE.ICON_TEMPLATES[e])&&(c=e.replace(/\[([a-zA-Z]*)\]/g,function(a,c){return"NAME"==c?d[c]||b:d[c]}))}return c||b}function d(b){var c=a.FE.ICONS[b],d=a.FE.ICON_DEFAULT_TEMPLATE;if("undefined"!=typeof c){var d=c.template||a.FE.ICON_DEFAULT_TEMPLATE;return d}return d}return{create:c,getTemplate:d}},a.extend(a.FE.DEFAULTS,{tooltips:!0}),a.FE.MODULES.tooltip=function(b){function c(){b.$tooltip&&b.$tooltip.removeClass("fr-visible").css("left","-3000px").css("position","fixed")}function d(c,d){if(c.data("title")||c.data("title",c.attr("title")),!c.data("title"))return!1;b.$tooltip||f(),c.removeAttr("title"),b.$tooltip.text(c.data("title")),b.$tooltip.addClass("fr-visible");var e=c.offset().left+(c.outerWidth()-b.$tooltip.outerWidth())/2;e<0&&(e=0),e+b.$tooltip.outerWidth()>a(b.o_win).width()&&(e=a(b.o_win).width()-b.$tooltip.outerWidth()),"undefined"==typeof d&&(d=b.opts.toolbarBottom);var g=d?c.offset().top-b.$tooltip.height():c.offset().top+c.outerHeight();b.$tooltip.css("position",""),b.$tooltip.css("left",e),b.$tooltip.css("top",Math.ceil(g)),"static"!=a(b.o_doc).find("body").css("position")?(b.$tooltip.css("margin-left",-a(b.o_doc).find("body").offset().left),b.$tooltip.css("margin-top",-a(b.o_doc).find("body").offset().top)):(b.$tooltip.css("margin-left",""),b.$tooltip.css("margin-top",""))}function e(e,f,g){b.opts.tooltips&&!b.helpers.isMobile()&&(b.events.$on(e,"mouseenter",f,function(c){b.node.hasClass(c.currentTarget,"fr-disabled")||b.edit.isDisabled()||d(a(c.currentTarget),g)},!0),b.events.$on(e,"mouseleave "+b._mousedown+" "+b._mouseup,f,function(a){c()},!0))}function f(){b.opts.tooltips&&!b.helpers.isMobile()&&(b.shared.$tooltip?b.$tooltip=b.shared.$tooltip:(b.shared.$tooltip=a('<div class="fr-tooltip"></div>'),b.$tooltip=b.shared.$tooltip,b.opts.theme&&b.$tooltip.addClass(b.opts.theme+"-theme"),a(b.o_doc).find("body").append(b.$tooltip)),b.events.on("shared.destroy",function(){b.$tooltip.html("").removeData().remove(),b.$tooltip=null},!0))}return{hide:c,to:d,bind:e}},a.FE.MODULES.button=function(b){function c(c){var d=c.next(),e=b.node.hasClass(c.get(0),"fr-active"),f=(b.helpers.isMobile(),a(".fr-dropdown.fr-active").not(c)),g=c.parents(".fr-toolbar, .fr-popup").data("instance")||b;if(g.helpers.isIOS()&&!g.el.querySelector(".fr-marker")&&(g.selection.save(),g.selection.clear(),g.selection.restore()),!e){var h=c.data("cmd");d.find(".fr-command").removeClass("fr-active").attr("aria-selected",!1),a.FE.COMMANDS[h]&&a.FE.COMMANDS[h].refreshOnShow&&a.FE.COMMANDS[h].refreshOnShow.apply(g,[c,d]),d.css("left",c.offset().left-c.parent().offset().left-("rtl"==b.opts.direction?d.width()-c.outerWidth():0)),b.opts.toolbarBottom?d.css("bottom",b.$tb.height()-c.position().top):d.css("top",c.position().top+c.outerHeight())}c.addClass("fr-blink").toggleClass("fr-active"),c.hasClass("fr-active")?(d.attr("aria-hidden",!1),c.attr("aria-expanded",!0)):(d.attr("aria-hidden",!0),c.attr("aria-expanded",!1)),setTimeout(function(){c.removeClass("fr-blink")},300),d.offset().left+d.outerWidth()>a(b.opts.scrollableContainer).offset().left+a(b.opts.scrollableContainer).outerWidth()&&d.css("margin-left",-(d.offset().left+d.outerWidth()-a(b.opts.scrollableContainer).offset().left-a(b.opts.scrollableContainer).outerWidth())),f.removeClass("fr-active").attr("aria-expanded",!1).next().attr("aria-hidden",!0),f.parent(".fr-toolbar:not(.fr-inline)").css("zIndex",""),0!=c.parents(".fr-popup").length||b.opts.toolbarInline||(b.node.hasClass(c.get(0),"fr-active")?b.$tb.css("zIndex",(b.opts.zIndex||1)+4):b.$tb.css("zIndex",""));var i=d.find("a.fr-command.fr-active");i.length?b.accessibility.focusToolbarElement(i):b.accessibility.focusToolbarElement(c)}function d(b){b.addClass("fr-blink"),setTimeout(function(){b.removeClass("fr-blink")},500);for(var c=b.data("cmd"),d=[];"undefined"!=typeof b.data("param"+(d.length+1));)d.push(b.data("param"+(d.length+1)));var e=a(".fr-dropdown.fr-active");e.length&&(e.removeClass("fr-active").attr("aria-expanded",!1).next().attr("aria-hidden",!0),e.parent(".fr-toolbar:not(.fr-inline)").css("zIndex","")),b.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(c,d)}function e(a){d(a)}function f(d){var f=d.parents(".fr-popup, .fr-toolbar").data("instance");if(0!=d.parents(".fr-popup").length||d.data("popup")||f.popups.hideAll(),f.popups.areVisible()&&!f.popups.areVisible(f)){for(var g=0;g<a.FE.INSTANCES.length;g++)a.FE.INSTANCES[g]!=f&&a.FE.INSTANCES[g].popups&&a.FE.INSTANCES[g].popups.areVisible()&&a.FE.INSTANCES[g].$el.find(".fr-marker").remove();f.popups.hideAll()}b.node.hasClass(d.get(0),"fr-dropdown")?c(d):(e(d),a.FE.COMMANDS[d.data("cmd")]&&0!=a.FE.COMMANDS[d.data("cmd")].refreshAfterCallback&&f.button.bulkRefresh())}function g(b){var c=a(b.currentTarget);f(c)}function h(a){var b=a.find(".fr-dropdown.fr-active");b.length&&(b.removeClass("fr-active").attr("aria-expanded",!1).next().attr("aria-hidden",!0),b.parent(".fr-toolbar:not(.fr-inline)").css("zIndex",""))}function i(a){a.preventDefault(),a.stopPropagation()}function j(a){if(a.stopPropagation(),!b.helpers.isMobile())return!1}function k(c,d){b.events.bindClick(c,".fr-command:not(.fr-disabled)",g),b.events.$on(c,b._mousedown+" "+b._mouseup+" "+b._move,".fr-dropdown-menu",i,!0),b.events.$on(c,b._mousedown+" "+b._mouseup+" "+b._move,".fr-dropdown-menu .fr-dropdown-wrapper",j,!0);var e=c.get(0).ownerDocument,f="defaultView"in e?e.defaultView:e.parentWindow,k=function(d){(!d||d.type==b._mouseup&&d.target!=a("html").get(0)||"keydown"==d.type&&(b.keys.isCharacter(d.which)&&!b.keys.ctrlKey(d)||d.which==a.FE.KEYCODE.ESC))&&h(c)};b.events.$on(a(f),b._mouseup+" resize keydown",k,!0),b.opts.iframe&&b.events.$on(b.$win,b._mouseup,k,!0),b.node.hasClass(c.get(0),"fr-popup")?a.merge(u,c.find(".fr-btn").toArray()):a.merge(t,c.find(".fr-btn").toArray()),b.tooltip.bind(c,".fr-btn, .fr-title",d)}function l(a,c){var d="";if(c.html)d+="function"==typeof c.html?c.html.call(b):c.html;else{var e=c.options;"function"==typeof e&&(e=e()),d+='<ul class="fr-dropdown-list" role="presentation">';for(var f in e)if(e.hasOwnProperty(f)){var g=b.shortcuts.get(a+"."+f);g=g?'<span class="fr-shortcut">'+g+"</span>":"",d+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="'+a+'" data-param1="'+f+'" title="'+e[f]+'">'+b.language.translate(e[f])+"</a></li>"}d+="</ul>"}return d}function m(a,c,d){if(b.helpers.isMobile()&&c.showOnMobile===!1)return"";var e=c.displaySelection;"function"==typeof e&&(e=e(b));var f;if(e){var g="function"==typeof c.defaultSelection?c.defaultSelection(b):c.defaultSelection;f='<span style="width:'+(c.displaySelectionWidth||100)+'px">'+(g||b.language.translate(c.title))+"</span>"}else f=b.icon.create(c.icon||a),f+='<span class="fr-sr-only">'+(b.language.translate(c.title)||"")+"</span>";var h=c.popup?' data-popup="true"':"",i=c.modal?' data-modal="true"':"",j=b.shortcuts.get(a+".");j=j?" ("+j+")":"";var k=a+"-"+b.id,m='<button id="'+k+'"type="button" tabIndex="-1" role="button"'+(c.toggle?' aria-pressed="false"':"")+("dropdown"==c.type?' aria-controls="drop" aria-expanded="false" aria-haspopup="true"':"")+(c.disabled?' aria-disabled="true"':"")+' title="'+(b.language.translate(c.title)||"")+j+'" class="fr-command fr-btn'+("dropdown"==c.type?" fr-dropdown":"")+(" fr-btn-"+b.icon.getTemplate(c.icon))+(c.displaySelection?" fr-selection":"")+(c.back?" fr-back":"")+(c.disabled?" fr-disabled":"")+(d?"":" fr-hidden")+'" data-cmd="'+a+'"'+h+i+">"+f+"</button>";if("dropdown"==c.type){var n='<div class="fr-dropdown-menu" role="listbox" aria-labelledby="'+k+'" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';n+=l(a,c),n+="</div></div></div>",m+=n}return m}function n(c,d){for(var e="",f=0;f<c.length;f++){var g=c[f],h=a.FE.COMMANDS[g];if(!(h&&"undefined"!=typeof h.plugin&&b.opts.pluginsEnabled.indexOf(h.plugin)<0))if(h){var i="undefined"==typeof d||d.indexOf(g)>=0;e+=m(g,h,i)}else"|"==g?e+='<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>':"-"==g&&(e+='<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')}return e}function o(c){var d,e=c.parents(".fr-popup, .fr-toolbar").data("instance")||b,f=c.data("cmd");b.node.hasClass(c.get(0),"fr-dropdown")?d=c.next():(c.removeClass("fr-active"),c.attr("aria-pressed")&&c.attr("aria-pressed",!1)),a.FE.COMMANDS[f]&&a.FE.COMMANDS[f].refresh?a.FE.COMMANDS[f].refresh.apply(e,[c,d]):b.refresh[f]&&e.refresh[f](c,d)}function p(c){var d=b.$tb?b.$tb.data("instance")||b:b;return 0==b.events.trigger("buttons.refresh")||void setTimeout(function(){for(var e=d.selection.inEditor()&&d.core.hasFocus(),f=0;f<c.length;f++){var g=a(c[f]),h=g.data("cmd");0==g.parents(".fr-popup").length?e||a.FE.COMMANDS[h]&&a.FE.COMMANDS[h].forcedRefresh?d.button.refresh(g):b.node.hasClass(g.get(0),"fr-dropdown")||(g.removeClass("fr-active"),g.attr("aria-pressed")&&g.attr("aria-pressed",!1)):g.parents(".fr-popup").is(":visible")&&d.button.refresh(g)}},0)}function q(){p(t),p(u)}function r(){t=[],u=[]}function s(){b.opts.toolbarInline?b.events.on("toolbar.show",q):(b.events.on("mouseup",q),b.events.on("keyup",q),b.events.on("blur",q),b.events.on("focus",q),b.events.on("contentChanged",q)),b.events.on("shared.destroy",r)}var t=[];(b.opts.toolbarInline||b.opts.toolbarContainer)&&(b.shared.buttons||(b.shared.buttons=[]),t=b.shared.buttons);var u=[];return b.shared.popup_buttons||(b.shared.popup_buttons=[]),u=b.shared.popup_buttons,{_init:s,buildList:n,bindCommands:k,refresh:o,bulkRefresh:q,exec:d,click:f}},a.FE.MODULES.modals=function(b){function c(a){return n[a]}function d(c,d){var e='<div tabIndex="-1" class="fr-modal'+(b.opts.theme?" "+b.opts.theme+"-theme":"")+'"><div class="fr-modal-wrapper">',f='<i title="'+b.language.translate("Cancel")+'" class="fa fa-times fr-modal-close"></i>';return e+='<div class="fr-modal-head">'+c+f+"</div>",e+='<div tabIndex="-1" class="fr-modal-body">'+d+"</div>",e+="</div></div>",a(e)}function e(c,e,f){if(b.shared.$overlay||(b.shared.$overlay=a('<div class="fr-overlay">').appendTo("body")),m=b.shared.$overlay,b.opts.theme&&m.addClass(b.opts.theme+"-theme"),!n[c]){var g=d(e,f);n[c]={$modal:g,$head:g.find(".fr-modal-head"),$body:g.find(".fr-modal-body")},b.helpers.isMobile()||g.addClass("fr-desktop"),g.appendTo("body"),b.events.bindClick(g,"i.fr-modal-close",function(){h(c)}),n[c].$body.css("margin-top",n[c].$head.outerHeight()),b.events.$on(g,"keydown",function(d){var e=d.which;return e==a.FE.KEYCODE.ESC?(h(c),b.accessibility.focusModalButton(g),!1):!(!a(d.currentTarget).is("input[type=text], textarea")&&e!=a.FE.KEYCODE.ARROW_UP&&e!=a.FE.KEYCODE.ARROW_DOWN)||(d.preventDefault(),d.stopPropagation(),!1)},!0),h(c)}return n[c]}function f(){for(var a in n){var b=n[a];b&&b.$modal&&b.$modal.removeData().remove()}m&&m.removeData().remove(),n={}}function g(a){if(n[a]){var c=n[a].$modal;c.data("instance",b),c.show(),m.show(),b.$doc.find("body").addClass("prevent-scroll"),b.helpers.isMobile()&&b.$doc.find("body").addClass("fr-mobile"),c.addClass("fr-active"),b.core.hasFocus()||(b.events.disableBlur(),b.events.focus()),b.accessibility.saveSelection(),b.events.disableBlur(),b.$el.blur(),b.selection.clear(),b.events.disableBlur(),c.find("[tabIndex]:first").focus()}}function h(a){if(n[a]){var c=n[a].$modal,d=c.data("instance")||b;d.events.enableBlur(),c.hide(),m.hide(),d.$doc.find("body").removeClass("prevent-scroll fr-mobile"),c.removeClass("fr-active"),b.accessibility.restoreSelection(d)}}function i(a){if(n[a]){var c=n[a],d=c.$modal,e=c.$body,f=b.$win.height(),g=d.find(".fr-modal-wrapper"),h=g.outerHeight(!0),i=g.height()-(e.outerHeight(!0)-e.height()),j=f-h+i,k=e.get(0).scrollHeight,l="auto";k>j&&(l=j),e.height(l)}}function j(a){var c;if("string"==typeof a){if(!n[a])return;c=n[a].$modal}else c=a;return c&&b.node.hasClass(c,"fr-active")&&b.core.sameInstance(c)||!1}function k(a){for(var b in n)if(n.hasOwnProperty(b)&&j(b)&&("undefined"==typeof a||n[b].$modal.data("instance")==a))return n[b].$modal;return!1}function l(){b.events.on("shared.destroy",f,!0)}b.shared.modals||(b.shared.modals={});var m,n=b.shared.modals;return{_init:l,get:c,create:e,show:g,hide:h,resize:i,isVisible:j,areVisible:k}},a.FE.POPUP_TEMPLATES={"text.edit":"[_EDIT_]"},a.FE.RegisterTemplate=function(b,c){a.FE.POPUP_TEMPLATES[b]=c},a.FE.MODULES.popups=function(b){function c(c,d){d.is(":visible")||(d=a(b.opts.scrollableContainer)),d.is(x[c].data("container"))||(x[c].data("container",d),d.append(x[c]))}function d(d,e,h,i){if(g()&&b.$el.find(".fr-marker").length>0?(b.events.disableBlur(),b.selection.restore()):(b.events.disableBlur(),b.events.focus()),m([d]),!x[d])return!1;var j=a(".fr-dropdown.fr-active");j.removeClass("fr-active").attr("aria-expanded",!1).parent(".fr-toolbar").css("zIndex",""),j.next().attr("aria-hidden",!0),x[d].data("instance",b),b.$tb&&b.$tb.data("instance",b);var k=x[d].outerWidth(),l=(x[d].outerHeight(),f(d));x[d].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");var n=x[d].data("container");b.opts.toolbarInline&&n&&b.$tb&&n.get(0)==b.$tb.get(0)&&(c(d,a(b.opts.scrollableContainer)),h=b.$tb.offset().top-b.helpers.getPX(b.$tb.css("margin-top")),e=b.$tb.offset().left+b.$tb.outerWidth()/2+(parseFloat(b.$tb.find(".fr-arrow").css("margin-left"))||0)+b.$tb.find(".fr-arrow").outerWidth()/2,b.node.hasClass(b.$tb.get(0),"fr-above")&&h&&(h+=b.$tb.outerHeight()),i=0),n=x[d].data("container"),!b.opts.iframe||i||l||(e&&(e-=b.$iframe.offset().left),h&&(h-=b.$iframe.offset().top)),n.is(b.$tb)?b.$tb.css("zIndex",(b.opts.zIndex||1)+4):x[d].css("zIndex",(b.opts.zIndex||1)+4),e&&(e-=k/2),b.opts.toolbarBottom&&n&&b.$tb&&n.get(0)==b.$tb.get(0)&&(x[d].addClass("fr-above"),h&&(h-=x[d].outerHeight())),x[d].removeClass("fr-active"),b.position.at(e,h,x[d],i||0),x[d].addClass("fr-active"),l||b.accessibility.focusPopup(x[d]),b.opts.toolbarInline&&b.toolbar.hide(),b.events.trigger("popups.show."+d),s(d)._repositionPopup(),o()}function e(a,c){b.events.on("popups.show."+a,c)}function f(a){return x[a]&&b.node.hasClass(x[a],"fr-active")&&b.core.sameInstance(x[a])||!1}function g(a){for(var b in x)if(x.hasOwnProperty(b)&&f(b)&&("undefined"==typeof a||x[b].data("instance")==a))return x[b];return!1}function h(a){var c=null;c="string"!=typeof a?a:x[a],c&&b.node.hasClass(c,"fr-active")&&(c.removeClass("fr-active fr-above"),b.events.trigger("popups.hide."+a),b.$tb&&(b.opts.zIndex>1?b.$tb.css("zIndex",b.opts.zIndex+1):b.$tb.css("zIndex","")),b.events.disableBlur(),c.find("input, textarea, button").filter(":focus").blur(),c.find("input, textarea").attr("disabled","disabled"))}function i(a,c){b.events.on("popups.hide."+a,c)}function j(a){var c=x[a];if(c&&!c.data("inst"+b.id)){var d=s(a);t(d,a)}return c}function k(a,c){b.events.on("popups.refresh."+a,c)}function l(c){b.events.trigger("popups.refresh."+c);for(var d=x[c].find(".fr-command"),e=0;e<d.length;e++){var f=a(d[e]);0==f.parents(".fr-dropdown-menu").length&&b.button.refresh(f)}}function m(a){"undefined"==typeof a&&(a=[]);for(var b in x)x.hasOwnProperty(b)&&a.indexOf(b)<0&&h(b)}function n(){b.shared.exit_flag=!0}function o(){b.shared.exit_flag=!1}function p(){return b.shared.exit_flag}function q(c,d){var e=a.FE.POPUP_TEMPLATES[c];"function"==typeof e&&(e=e.apply(b));for(var f in d)d.hasOwnProperty(f)&&(e=e.replace("[_"+f.toUpperCase()+"_]",d[f]));return e}function r(c,d){var e=q(c,d),f=a('<div class="fr-popup'+(b.helpers.isMobile()?" fr-mobile":" fr-desktop")+(b.opts.toolbarInline?" fr-inline":"")+'"><span class="fr-arrow"></span>'+e+"</div>");b.opts.theme&&f.addClass(b.opts.theme+"-theme"),b.opts.zIndex>1&&b.$tb.css("z-index",b.opts.zIndex+2),"auto"!=b.opts.direction&&f.removeClass("fr-ltr fr-rtl").addClass("fr-"+b.opts.direction),f.find("input, textarea").attr("dir",b.opts.direction).attr("disabled","disabled");var g=a("body");return g.append(f),f.data("container",g),x[c]=f,b.button.bindCommands(f,!1),f}function s(c){var d=x[c];return{_windowResize:function(){var a=d.data("instance")||b;!a.helpers.isMobile()&&d.is(":visible")&&(a.events.disableBlur(),a.popups.hide(c),a.events.enableBlur())},_inputFocus:function(c){var e=d.data("instance")||b,f=a(c.currentTarget);if(f.is("input:file")&&f.closest(".fr-layer").addClass("fr-input-focus"),c.preventDefault(),c.stopPropagation(),setTimeout(function(){e.events.enableBlur()},0),e.helpers.isMobile()){var g=a(e.o_win).scrollTop();setTimeout(function(){a(e.o_win).scrollTop(g)},0)}},_inputBlur:function(c){var e=d.data("instance")||b,f=a(c.currentTarget);f.is("input:file")&&f.closest(".fr-layer").removeClass("fr-input-focus"),document.activeElement!=this&&a(this).is(":visible")&&(e.events.blurActive()&&e.events.trigger("blur"),e.events.enableBlur())},_editorKeydown:function(e){var g=d.data("instance")||b;g.keys.ctrlKey(e)||e.which==a.FE.KEYCODE.ALT||e.which==a.FE.KEYCODE.ESC||(f(c)&&d.find(".fr-back:visible").length?g.button.exec(d.find(".fr-back:visible:first")):e.which!=a.FE.KEYCODE.ALT&&g.popups.hide(c))},_preventFocus:function(c){var e=d.data("instance")||b;e.events.disableBlur();var f=c.originalEvent?c.originalEvent.target||c.originalEvent.originalTarget:null,g="input, textarea, button, select, label, .fr-command";return f&&!a(f).is(g)&&0===a(f).parents(g).length?(c.stopPropagation(),!1):(f&&a(f).is(g)&&c.stopPropagation(),void o())},_editorMouseup:function(a){d.is(":visible")&&p()&&d.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length>0&&b.events.disableBlur()},_windowMouseup:function(a){if(!b.core.sameInstance(d))return!0;var e=d.data("instance")||b;d.is(":visible")&&p()&&(a.stopPropagation(),e.markers.remove(),e.popups.hide(c),o())},_windowKeydown:function(e){if(!b.core.sameInstance(d))return!0;var f=d.data("instance")||b,g=e.which;if(a.FE.KEYCODE.ESC==g){if(f.popups.isVisible(c)&&f.opts.toolbarInline)return e.stopPropagation(),f.popups.isVisible(c)&&(d.find(".fr-back:visible").length?(f.button.exec(d.find(".fr-back:visible:first")),f.accessibility.focusPopupButton(d)):d.find(".fr-dismiss:visible").length?f.button.exec(d.find(".fr-dismiss:visible:first")):(f.popups.hide(c),f.toolbar.showInline(null,!0),f.accessibility.FocusPopupButton(d))),!1;if(f.popups.isVisible(c))return d.find(".fr-back:visible").length?(f.button.exec(d.find(".fr-back:visible:first")),f.accessibility.focusPopupButton(d)):d.find(".fr-dismiss:visible").length?f.button.exec(d.find(".fr-dismiss:visible:first")):(f.popups.hide(c),f.accessibility.focusPopupButton(d)),!1}},_doPlaceholder:function(b){var c=a(this).next();0==c.length&&a(this).attr("placeholder")&&a(this).after('<label for="'+a(this).attr("id")+'">'+a(this).attr("placeholder")+"</label>"),a(this).toggleClass("fr-not-empty",""!=a(this).val())},_repositionPopup:function(e){if(!b.opts.height&&!b.opts.heightMax||b.opts.toolbarInline)return!0;if(b.$wp&&f(c)&&d.parent().get(0)==a(b.opts.scrollableContainer).get(0)){var g=d.offset().top-b.$wp.offset().top,h=b.$wp.outerHeight();b.node.hasClass(d.get(0),"fr-above")&&(g+=d.outerHeight()),g>h||g<0?d.addClass("fr-hidden"):d.removeClass("fr-hidden")}}}}function t(a,c){b.events.on("mouseup",a._editorMouseup,!0),b.$wp&&b.events.on("keydown",a._editorKeydown),b.events.on("blur",function(a){g()&&b.markers.remove(),m()}),b.$wp&&!b.helpers.isMobile()&&b.events.$on(b.$wp,"scroll.popup"+c,a._repositionPopup),b.events.on("window.mouseup",a._windowMouseup,!0),b.events.on("window.keydown",a._windowKeydown,!0),x[c].data("inst"+b.id,!0),b.events.on("destroy",function(){b.core.sameInstance(x[c])&&x[c].removeClass("fr-active").appendTo("body")},!0)}function u(c,d){var e=r(c,d),f=s(c);return t(f,c),b.events.$on(e,"mousedown mouseup touchstart touchend touch","*",f._preventFocus,!0),b.events.$on(e,"focus","input, textarea, button, select",f._inputFocus,!0),b.events.$on(e,"blur","input, textarea, button, select",f._inputBlur,!0),b.accessibility.registerPopup(c),b.events.$on(e,"keydown keyup change input","input, textarea",f._doPlaceholder,!0),b.helpers.isIOS()&&b.events.$on(e,"touchend","label",function(){a("#"+a(this).attr("for")).prop("checked",function(a,b){return!b})},!0),b.events.$on(a(b.o_win),"resize",f._windowResize,!0),e}function v(){for(var a in x)if(x.hasOwnProperty(a)){var b=x[a];b.html("").removeData().remove(),x[a]=null}x=[]}function w(){b.events.on("shared.destroy",v,!0),b.events.on("window.mousedown",n),b.events.on("window.touchmove",o),b.events.on("mousedown",function(a){
g()&&(a.stopPropagation(),b.$el.find(".fr-marker").remove(),n(),b.events.disableBlur())})}b.shared.popups||(b.shared.popups={});var x=b.shared.popups;return b.shared.exit_flag=!1,{_init:w,create:u,get:j,show:d,hide:h,onHide:i,hideAll:m,setContainer:c,refresh:l,onRefresh:k,onShow:e,isVisible:f,areVisible:g}},a.FE.MODULES.position=function(b){function c(){var c,d=b.selection.ranges(0);if(d&&d.collapsed&&b.selection.inEditor()){var e=!1;0==b.$el.find(".fr-marker").length&&(b.selection.save(),e=!0);var f=b.$el.find(".fr-marker:first");f.css("display","inline"),f.css("line-height","");var g=f.offset(),h=f.outerHeight();f.css("display","none"),f.css("line-height",0),c={},c.left=g.left,c.width=0,c.height=h,c.top=g.top-(b.helpers.isIOS()?0:a(b.o_win).scrollTop()),c.right=1,c.bottom=1,c.ok=!0,e&&b.selection.restore()}else d&&(c=d.getBoundingClientRect());return c}function d(c,d,e){var f=c.outerHeight();if(!b.helpers.isMobile()&&b.$tb&&c.parent().get(0)!=b.$tb.get(0)){var g=(c.parent().height()-20-(b.opts.toolbarBottom?b.$tb.outerHeight():0),c.parent().offset().top),h=d-f-(e||0);c.parent().get(0)==a(b.opts.scrollableContainer).get(0)&&(g-=c.parent().position().top);var i=a(b.opts.scrollableContainer).get(0).scrollHeight;g+d+f>a(b.opts.scrollableContainer).offset().top+i&&c.parent().offset().top+h>0?(d=h,c.addClass("fr-above")):c.removeClass("fr-above")}return d}function e(c,d){var e=c.outerWidth();return d+e>a(b.opts.scrollableContainer).width()-10&&(d=a(b.opts.scrollableContainer).width()-e-10),d<0&&(d=10),d}function f(d){var e=c();d.css("top",0).css("left",0);var f=e.top+e.height,h=e.left+e.width/2-d.outerWidth()/2+a(b.o_win).scrollLeft();b.opts.iframe||(f+=a(b.o_win).scrollTop()),g(h,f,d,e.height)}function g(a,c,f,g){var h=f.data("container");!h||h.is("body")&&"static"==h.css("position")||(a&&(a-=h.offset().left),c&&(c-=h.offset().top),"BODY"!=h.get(0).tagName?(a&&(a+=h.scrollLeft()),c&&(c+=h.scrollTop())):"absolute"==h.css("position")&&(a&&(a+=h.position().left),c&&(c+=h.position().top))),b.opts.iframe&&h&&b.$tb&&h.get(0)!=b.$tb.get(0)&&(a&&(a+=b.$iframe.offset().left),c&&(c+=b.$iframe.offset().top));var i=e(f,a);if(a){f.css("left",i);var j=f.find(".fr-arrow");j.data("margin-left")||j.data("margin-left",b.helpers.getPX(j.css("margin-left"))),j.css("margin-left",a-i+j.data("margin-left"))}c&&f.css("top",d(f,c,g))}function h(c){var d=a(c),e=d.is(".fr-sticky-on"),f=d.data("sticky-top"),g=d.data("sticky-scheduled");if("undefined"==typeof f){d.data("sticky-top",0);var h=a('<div class="fr-sticky-dummy" style="height: '+d.outerHeight()+'px;"></div>');b.$box.prepend(h)}else b.$box.find(".fr-sticky-dummy").css("height",d.outerHeight());if(b.core.hasFocus()||b.$tb.find("input:visible:focus").length>0){var i=a(window).scrollTop(),j=Math.min(Math.max(i-b.$tb.parent().offset().top,0),b.$tb.parent().outerHeight()-d.outerHeight());j!=f&&j!=g&&(clearTimeout(d.data("sticky-timeout")),d.data("sticky-scheduled",j),d.outerHeight()<i-b.$tb.parent().offset().top&&d.addClass("fr-opacity-0"),d.data("sticky-timeout",setTimeout(function(){var c=a(window).scrollTop(),e=Math.min(Math.max(c-b.$tb.parent().offset().top,0),b.$tb.parent().outerHeight()-d.outerHeight());e>0&&"BODY"==b.$tb.parent().get(0).tagName&&(e+=b.$tb.parent().position().top),e!=f&&(d.css("top",Math.max(e,0)),d.data("sticky-top",e),d.data("sticky-scheduled",e)),d.removeClass("fr-opacity-0")},100))),e||(d.css("top","0"),d.width(b.$tb.parent().width()),d.addClass("fr-sticky-on"),b.$box.addClass("fr-sticky-box"))}else clearTimeout(a(c).css("sticky-timeout")),d.css("top","0"),d.css("position",""),d.width(""),d.data("sticky-top",0),d.removeClass("fr-sticky-on"),b.$box.removeClass("fr-sticky-box")}function i(c){if(c.offsetWidth){var d,e,f=a(c),g=f.outerHeight(),h=f.data("sticky-position"),i=a("body"==b.opts.scrollableContainer?b.o_win:b.opts.scrollableContainer).outerHeight(),j=0,k=0;"body"!==b.opts.scrollableContainer&&(j=a(b.opts.scrollableContainer).offset().top,k=a(b.o_win).outerHeight()-j-i);var l="body"==b.opts.scrollableContainer?a(b.o_win).scrollTop():j,m=f.is(".fr-sticky-on");f.data("sticky-parent")||f.data("sticky-parent",f.parent());var n=f.data("sticky-parent"),o=n.offset().top,p=n.outerHeight();if(f.data("sticky-offset")||(f.data("sticky-offset",!0),f.after('<div class="fr-sticky-dummy" style="height: '+g+'px;"></div>')),!h){var q="auto"!==f.css("top")||"auto"!==f.css("bottom");q||f.css("position","fixed"),h={top:b.node.hasClass(f.get(0),"fr-top"),bottom:b.node.hasClass(f.get(0),"fr-bottom")},q||f.css("position",""),f.data("sticky-position",h),f.data("top",b.node.hasClass(f.get(0),"fr-top")?f.css("top"):"auto"),f.data("bottom",b.node.hasClass(f.get(0),"fr-bottom")?f.css("bottom"):"auto")}var r=function(){return o<l+d&&o+p-g>=l+d},s=function(){return o+g<l+i-e&&o+p>l+i-e};d=b.helpers.getPX(f.data("top")),e=b.helpers.getPX(f.data("bottom"));var t=h.top&&r(),u=h.bottom&&s();t||u?(f.css("width",n.width()+"px"),m||(f.addClass("fr-sticky-on"),f.removeClass("fr-sticky-off"),f.css("top")&&("auto"!=f.data("top")?f.css("top",b.helpers.getPX(f.data("top"))+j):f.data("top","auto")),f.css("bottom")&&("auto"!=f.data("bottom")?f.css("bottom",b.helpers.getPX(f.data("bottom"))+k):f.css("bottom","auto")))):b.node.hasClass(f.get(0),"fr-sticky-off")||(f.width(""),f.removeClass("fr-sticky-on"),f.addClass("fr-sticky-off"),f.css("top")&&"auto"!=f.data("top")&&h.top&&f.css("top",0),f.css("bottom")&&"auto"!=f.data("bottom")&&h.bottom&&f.css("bottom",0))}}function j(){var a=document.createElement("test"),c=a.style;return c.cssText="position:"+["-webkit-","-moz-","-ms-","-o-",""].join("sticky; position:")+" sticky;",c.position.indexOf("sticky")!==-1&&!b.helpers.isIOS()&&!b.helpers.isAndroid()}function k(){if(!j())if(b._stickyElements=[],b.helpers.isIOS()){var c=function(){b.helpers.requestAnimationFrame()(c);for(var a=0;a<b._stickyElements.length;a++)h(b._stickyElements[a])};c(),b.events.$on(a(b.o_win),"scroll",function(){if(b.core.hasFocus())for(var c=0;c<b._stickyElements.length;c++){var d=a(b._stickyElements[c]),e=d.parent(),f=a(window).scrollTop();d.outerHeight()<f-e.offset().top&&(d.addClass("fr-opacity-0"),d.data("sticky-top",-1),d.data("sticky-scheduled",-1))}},!0)}else b.events.$on(a("body"==b.opts.scrollableContainer?b.o_win:b.opts.scrollableContainer),"scroll",l,!0),b.events.$on(a(b.o_win),"resize",l,!0),b.events.on("initialized",l),b.events.on("focus",l),b.events.$on(a(b.o_win),"resize","textarea",l,!0);b.events.on("destroy",function(a){b._stickyElements=[]})}function l(){for(var a=0;a<b._stickyElements.length;a++)i(b._stickyElements[a])}function m(a){a.addClass("fr-sticky"),b.helpers.isIOS()&&a.addClass("fr-sticky-ios"),j()||b._stickyElements.push(a.get(0))}function n(){k()}return{_init:n,forSelection:f,addSticky:m,refresh:l,at:g,getBoundingRect:c}},a.FE.MODULES.refresh=function(b){function c(a){g(a,!b.undo.canDo())}function d(a){g(a,!b.undo.canRedo())}function e(a){if(b.node.hasClass(a.get(0),"fr-no-refresh"))return!1;for(var c=b.selection.blocks(),d=0;d<c.length;d++){for(var e=c[d].previousSibling;e&&e.nodeType==Node.TEXT_NODE&&0===e.textContent.length;)e=e.previousSibling;if("LI"!=c[d].tagName||e)return g(a,!1),!0;g(a,!0)}}function f(c){if(b.node.hasClass(c.get(0),"fr-no-refresh"))return!1;for(var d=b.selection.blocks(),e=0;e<d.length;e++){var f="rtl"==b.opts.direction||"rtl"==a(d[e]).css("direction")?"margin-right":"margin-left";if("LI"==d[e].tagName||"LI"==d[e].parentNode.tagName)return g(c,!1),!0;if(b.helpers.getPX(a(d[e]).css(f))>0)return g(c,!1),!0}g(c,!0)}function g(a,b){a.toggleClass("fr-disabled",b).attr("aria-disabled",b)}return{undo:c,redo:d,outdent:f,indent:e}},a.extend(a.FE.DEFAULTS,{editInPopup:!1}),a.FE.MODULES.textEdit=function(b){function c(){var a='<div id="fr-text-edit-'+b.id+'" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="'+b.language.translate("Text")+'" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>",c={edit:a};b.popups.create("text.edit",c)}function d(){var c,d=b.popups.get("text.edit");c="INPUT"===b.$el.prop("tagName")?b.$el.attr("placeholder"):b.$el.text(),d.find("input").val(c).trigger("change"),b.popups.setContainer("text.edit",a("body")),b.popups.show("text.edit",b.$el.offset().left+b.$el.outerWidth()/2,b.$el.offset().top+b.$el.outerHeight(),b.$el.outerHeight())}function e(){b.events.$on(b.$el,b._mouseup,function(a){setTimeout(function(){d()},10)})}function f(){var a=b.popups.get("text.edit"),c=a.find("input").val();0==c.length&&(c=b.opts.placeholderText),"INPUT"===b.$el.prop("tagName")?b.$el.attr("placeholder",c):b.$el.text(c),b.events.trigger("contentChanged"),b.popups.hide("text.edit")}function g(){b.opts.editInPopup&&(c(),e())}return{_init:g,update:f}},a.FE.RegisterCommand("updateText",{focus:!1,undo:!1,callback:function(){this.textEdit.update()}}),a.extend(a.FE.DEFAULTS,{toolbarBottom:!1,toolbarButtons:["fullscreen","bold","italic","underline","strikeThrough","subscript","superscript","fontFamily","fontSize","|","color","emoticons","inlineStyle","paragraphStyle","|","paragraphFormat","align","formatOL","formatUL","outdent","indent","quote","insertHR","-","insertLink","insertImage","insertVideo","insertFile","insertTable","undo","redo","clearFormatting","selectAll","html","applyFormat","removeFormat","help"],toolbarButtonsXS:["bold","italic","fontFamily","fontSize","|","undo","redo","help"],toolbarButtonsSM:["bold","italic","underline","|","fontFamily","fontSize","insertLink","insertImage","table","|","undo","redo","help"],toolbarButtonsMD:["fullscreen","bold","italic","underline","fontFamily","fontSize","color","paragraphStyle","paragraphFormat","align","formatOL","formatUL","outdent","indent","quote","insertHR","-","insertLink","insertImage","insertVideo","insertFile","insertTable","undo","redo","clearFormatting","help"],toolbarContainer:null,toolbarInline:!1,toolbarSticky:!0,toolbarStickyOffset:0,toolbarVisibleWithoutSelection:!1}),a.FE.MODULES.toolbar=function(b){function c(a,b){for(var c=0;c<b.length;c++)"-"!=b[c]&&"|"!=b[c]&&a.indexOf(b[c])<0&&a.push(b[c])}function d(){var d=a.merge([],e());c(d,b.opts.toolbarButtonsXS||[]),c(d,b.opts.toolbarButtonsSM||[]),c(d,b.opts.toolbarButtonsMD||[]),c(d,b.opts.toolbarButtons);for(var f=d.length-1;f>=0;f--)"-"!=d[f]&&"|"!=d[f]&&d.indexOf(d[f])<f&&d.splice(f,1);var g=b.button.buildList(d,e());b.$tb.append(g),b.button.bindCommands(b.$tb)}function e(){var a=b.helpers.screenSize();return u[a]}function f(){var a=e();b.$tb.find(".fr-separator").remove(),b.$tb.find("> .fr-command").addClass("fr-hidden");for(var c=0;c<a.length;c++)if("|"==a[c]||"-"==a[c])b.$tb.append(b.button.buildList([a[c]]));else{var d=b.$tb.find('> .fr-command[data-cmd="'+a[c]+'"]'),f=null;b.node.hasClass(d.next().get(0),"fr-dropdown-menu")&&(f=d.next()),d.removeClass("fr-hidden").appendTo(b.$tb),f&&f.appendTo(b.$tb)}}function g(){b.events.$on(a(b.o_win),"resize",f),b.events.$on(a(b.o_win),"orientationchange",f)}function h(c,d){setTimeout(function(){if(c&&c.which==a.FE.KEYCODE.ESC);else if(b.selection.inEditor()&&b.core.hasFocus()&&!b.popups.areVisible()&&(b.opts.toolbarVisibleWithoutSelection&&c&&"keyup"!=c.type||!b.selection.isCollapsed()&&!b.keys.isIME()||d)){if(b.$tb.data("instance",b),0==b.events.trigger("toolbar.show",[c]))return!1;b.opts.toolbarContainer||b.position.forSelection(b.$tb),b.opts.zIndex>1?b.$tb.css("z-index",b.opts.zIndex+1):b.$tb.css("z-index",null),b.$tb.show()}},0)}function i(c){var d=a(".fr-dropdown.fr-active");return!!d.next().find(b.o_doc.activeElement).length||void(b.events.trigger("toolbar.hide")!==!1&&b.$tb.hide())}function j(){return 0!=b.events.trigger("toolbar.show")&&void b.$tb.show()}function k(){b.events.on("window.mousedown",i),b.events.on("keydown",i),b.events.on("blur",i),b.events.on("window.mouseup",h),b.helpers.isMobile()?b.helpers.isIOS()||(b.events.on("window.touchend",h),b.browser.mozilla&&setInterval(h,200)):b.events.on("window.keyup",h),b.events.on("keydown",function(b){b&&b.which==a.FE.KEYCODE.ESC&&i()}),b.events.on("keydown",function(b){if(b.which==a.FE.KEYCODE.ALT)return b.stopPropagation(),!1},!0),b.events.$on(b.$wp,"scroll.toolbar",h),b.events.on("commands.after",h),b.helpers.isMobile()&&(b.events.$on(b.$doc,"selectionchange",h),b.events.$on(b.$doc,"orientationchange",h))}function l(){b.opts.toolbarInline?(a(b.opts.scrollableContainer).append(b.$tb),b.$tb.data("container",a(b.opts.scrollableContainer)),b.$tb.addClass("fr-inline"),b.$tb.prepend('<span class="fr-arrow"></span>'),k(),b.opts.toolbarBottom=!1):(b.opts.toolbarBottom&&!b.helpers.isIOS()?(b.$box.append(b.$tb),b.$tb.addClass("fr-bottom"),b.$box.addClass("fr-bottom")):(b.opts.toolbarBottom=!1,b.$box.prepend(b.$tb),b.$tb.addClass("fr-top"),b.$box.addClass("fr-top")),b.$tb.addClass("fr-basic"),b.opts.toolbarSticky&&(b.opts.toolbarStickyOffset&&(b.opts.toolbarBottom?b.$tb.css("bottom",b.opts.toolbarStickyOffset):b.$tb.css("top",b.opts.toolbarStickyOffset)),b.position.addSticky(b.$tb)))}function m(){b.$tb.html("").removeData().remove(),b.$tb=null}function n(){b.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"),b.$box.find(".fr-sticky-dummy").remove()}function o(){b.opts.theme&&b.$tb.addClass(b.opts.theme+"-theme"),b.opts.zIndex>1&&b.$tb.css("z-index",b.opts.zIndex+1),"auto"!=b.opts.direction&&b.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-"+b.opts.direction),b.helpers.isMobile()?b.$tb.addClass("fr-mobile"):b.$tb.addClass("fr-desktop"),b.opts.toolbarContainer?(b.opts.toolbarInline&&(k(),i()),b.opts.toolbarBottom?b.$tb.addClass("fr-bottom"):b.$tb.addClass("fr-top")):l(),s=b.$tb.get(0).ownerDocument,t="defaultView"in s?s.defaultView:s.parentWindow,d(),g(),b.accessibility.registerToolbar(b.$tb),b.events.$on(b.$tb,b._mousedown+" "+b._mouseup,function(a){var c=a.originalEvent?a.originalEvent.target||a.originalEvent.originalTarget:null;if(c&&"INPUT"!=c.tagName&&!b.edit.isDisabled())return a.stopPropagation(),a.preventDefault(),!1},!0)}function p(){return!!b.$wp&&(b.opts.toolbarContainer?(b.shared.$tb?(b.$tb=b.shared.$tb,b.opts.toolbarInline&&k()):(b.shared.$tb=a('<div class="fr-toolbar"></div>'),b.$tb=b.shared.$tb,a(b.opts.toolbarContainer).append(b.$tb),o(),b.$tb.data("instance",b)),b.opts.toolbarInline?b.$box.addClass("fr-inline"):b.$box.addClass("fr-basic"),b.events.on("focus",function(){b.$tb.data("instance",b)},!0),b.opts.toolbarInline=!1):b.opts.toolbarInline?(b.$box.addClass("fr-inline"),b.shared.$tb?(b.$tb=b.shared.$tb,k()):(b.shared.$tb=a('<div class="fr-toolbar"></div>'),b.$tb=b.shared.$tb,o())):(b.$box.addClass("fr-basic"),b.$tb=a('<div class="fr-toolbar"></div>'),o(),b.$tb.data("instance",b)),b.events.on("destroy",n,!0),void b.events.on(b.opts.toolbarInline||b.opts.toolbarContainer?"shared.destroy":"destroy",m,!0))}function q(){!v&&b.$tb&&(b.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled",!0),v=!0)}function r(){v&&b.$tb&&(b.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled",!1),v=!1),b.button.bulkRefresh()}var s,t,u=[];u[a.FE.XS]=b.opts.toolbarButtonsXS||b.opts.toolbarButtons,u[a.FE.SM]=b.opts.toolbarButtonsSM||b.opts.toolbarButtons,u[a.FE.MD]=b.opts.toolbarButtonsMD||b.opts.toolbarButtons,u[a.FE.LG]=b.opts.toolbarButtons;var v=!1;return{_init:p,hide:i,show:j,showInline:h,disable:q,enable:r}}});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.FE.PLUGINS.align=function(b){function c(c){b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();for(var d=b.selection.blocks(),e=0;e<d.length;e++)b.helpers.getAlignment(a(d[e].parentNode))==c?a(d[e]).css("text-align","").removeClass("fr-temp-div"):a(d[e]).css("text-align",c).removeClass("fr-temp-div"),""===a(d[e]).attr("class")&&a(d[e]).removeAttr("class"),""===a(d[e]).attr("style")&&a(d[e]).removeAttr("style");b.selection.save(),b.html.unwrap(),b.selection.restore()}function d(c){var d=b.selection.blocks();if(d.length){var e=b.helpers.getAlignment(a(d[0]));c.find("> *:first").replaceWith(b.icon.create("align-"+e))}}function e(c,d){var e=b.selection.blocks();if(e.length){var f=b.helpers.getAlignment(a(e[0]));d.find('a.fr-command[data-param1="'+f+'"]').addClass("fr-active").attr("aria-selected",!0)}}return{apply:c,refresh:d,refreshOnShow:e}},a.FE.DefineIcon("align",{NAME:"align-left"}),a.FE.DefineIcon("align-left",{NAME:"align-left"}),a.FE.DefineIcon("align-right",{NAME:"align-right"}),a.FE.DefineIcon("align-center",{NAME:"align-center"}),a.FE.DefineIcon("align-justify",{NAME:"align-justify"}),a.FE.RegisterCommand("align",{type:"dropdown",title:"Align",options:{left:"Align Left",center:"Align Center",right:"Align Right",justify:"Align Justify"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.align.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+'<span class="fr-sr-only">'+this.language.translate(c[d])+"</span></a></li>");return b+="</ul>"},callback:function(a,b){this.align.apply(b)},refresh:function(a){this.align.refresh(a)},refreshOnShow:function(a,b){this.align.refreshOnShow(a,b)},plugin:"align"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.POPUP_TEMPLATES,{"colors.picker":"[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_]"}),a.extend(a.FE.DEFAULTS,{colorsText:["#61BD6D","#1ABC9C","#54ACD2","#2C82C9","#9365B8","#475577","#CCCCCC","#41A85F","#00A885","#3D8EB9","#2969B0","#553982","#28324E","#000000","#F7DA64","#FBA026","#EB6B56","#E25041","#A38F84","#EFEFEF","#FFFFFF","#FAC51C","#F37934","#D14841","#B8312F","#7C706B","#D1D5D8","REMOVE"],colorsBackground:["#61BD6D","#1ABC9C","#54ACD2","#2C82C9","#9365B8","#475577","#CCCCCC","#41A85F","#00A885","#3D8EB9","#2969B0","#553982","#28324E","#000000","#F7DA64","#FBA026","#EB6B56","#E25041","#A38F84","#EFEFEF","#FFFFFF","#FAC51C","#F37934","#D14841","#B8312F","#7C706B","#D1D5D8","REMOVE"],colorsStep:7,colorsDefaultTab:"text",colorsButtons:["colorsBack","|","-"]}),a.FE.PLUGINS.colors=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="color"]'),c=b.popups.get("colors.picker");if(c||(c=e()),!c.hasClass("fr-active"))if(b.popups.setContainer("colors.picker",b.$tb),i(c.find(".fr-selected-tab").attr("data-param1")),a.is(":visible")){var d=a.offset().left+a.outerWidth()/2,f=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("colors.picker",d,f,a.outerHeight())}else b.position.forSelection(c),b.popups.show("colors.picker")}function d(){b.popups.hide("colors.picker")}function e(){var a='<div class="fr-buttons fr-colors-buttons">';b.opts.toolbarInline&&b.opts.colorsButtons.length>0&&(a+=b.button.buildList(b.opts.colorsButtons)),a+=f()+"</div>";var c={buttons:a,text_colors:g("text"),background_colors:g("background")},d=b.popups.create("colors.picker",c);return h(d),d}function f(){var a='<div class="fr-colors-tabs fr-group">';return a+='<span class="fr-colors-tab '+("background"==b.opts.colorsDefaultTab?"":"fr-selected-tab ")+'fr-command" tabIndex="-1" role="button" aria-pressed="'+("background"!=b.opts.colorsDefaultTab)+'" data-param1="text" data-cmd="colorChangeSet" title="'+b.language.translate("Text")+'">'+b.language.translate("Text")+"</span>",a+='<span class="fr-colors-tab '+("background"==b.opts.colorsDefaultTab?"fr-selected-tab ":"")+'fr-command" tabIndex="-1" role="button" aria-pressed="'+("background"==b.opts.colorsDefaultTab)+'" data-param1="background" data-cmd="colorChangeSet" title="'+b.language.translate("Background")+'">'+b.language.translate("Background")+"</span>",a+"</div>"}function g(a){for(var c="text"==a?b.opts.colorsText:b.opts.colorsBackground,d='<div class="fr-color-set fr-'+a+"-color"+(b.opts.colorsDefaultTab==a||"text"!=b.opts.colorsDefaultTab&&"background"!=b.opts.colorsDefaultTab&&"text"==a?" fr-selected-set":"")+'">',e=0;e<c.length;e++)0!==e&&e%b.opts.colorsStep===0&&(d+="<br>"),d+="REMOVE"!=c[e]?'<span class="fr-command fr-select-color" style="background: '+c[e]+';" tabIndex="-1" aria-selected="false" role="button" data-cmd="'+a+'Color" data-param1="'+c[e]+'"><span class="fr-sr-only">'+b.language.translate("Color")+" "+c[e]+"&nbsp;&nbsp;&nbsp;</span></span>":'<span class="fr-command fr-select-color" data-cmd="'+a+'Color" tabIndex="-1" role="button" data-param1="REMOVE" title="'+b.language.translate("Clear Formatting")+'">'+b.icon.create("remove")+'<span class="fr-sr-only">'+b.language.translate("Clear Formatting")+"</span></span>";return d+"</div>"}function h(c){b.events.on("popup.tab",function(d){var e=a(d.currentTarget);if(!b.popups.isVisible("colors.picker")||!e.is("span"))return!0;var f=d.which,g=!0;if(a.FE.KEYCODE.TAB==f){var h=c.find(".fr-buttons");g=!b.accessibility.focusToolbar(h,!!d.shiftKey)}else if(a.FE.KEYCODE.ARROW_UP==f||a.FE.KEYCODE.ARROW_DOWN==f||a.FE.KEYCODE.ARROW_LEFT==f||a.FE.KEYCODE.ARROW_RIGHT==f){if(e.is("span.fr-select-color")){var i=e.parent().find("span.fr-select-color"),j=i.index(e),k=b.opts.colorsStep,l=Math.floor(i.length/k),m=j%k,n=Math.floor(j/k),o=n*k+m,p=l*k;a.FE.KEYCODE.ARROW_UP==f?o=((o-k)%p+p)%p:a.FE.KEYCODE.ARROW_DOWN==f?o=(o+k)%p:a.FE.KEYCODE.ARROW_LEFT==f?o=((o-1)%p+p)%p:a.FE.KEYCODE.ARROW_RIGHT==f&&(o=(o+1)%p);var q=a(i.get(o));b.events.disableBlur(),q.focus(),g=!1}}else a.FE.KEYCODE.ENTER==f&&(b.button.exec(e),g=!1);return g===!1&&(d.preventDefault(),d.stopPropagation()),g},!0)}function i(c){var d,e=b.popups.get("colors.picker"),f=a(b.selection.element());d="background"==c?"background-color":"color";var g=e.find(".fr-"+c+"-color .fr-select-color");for(g.find(".fr-selected-color").remove(),g.removeClass("fr-active-item"),g.not('[data-param1="REMOVE"]').attr("aria-selected",!1);f.get(0)!=b.el;){if("transparent"!=f.css(d)&&"rgba(0, 0, 0, 0)"!=f.css(d)){var h=e.find(".fr-"+c+'-color .fr-select-color[data-param1="'+b.helpers.RGBToHex(f.css(d))+'"]');h.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'),h.addClass("fr-active-item").attr("aria-selected",!0);break}f=f.parent()}}function j(a,c){a.hasClass("fr-selected-tab")||(a.siblings().removeClass("fr-selected-tab").attr("aria-pressed",!1),a.addClass("fr-selected-tab").attr("aria-pressed",!0),a.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"),a.parents(".fr-popup").find(".fr-color-set.fr-"+c+"-color").addClass("fr-selected-set"),i(c)),b.accessibility.focusPopup(a.parents(".fr-popup"))}function k(a){"REMOVE"!=a?b.format.applyStyle("background-color",b.helpers.HEXtoRGB(a)):b.format.removeStyle("background-color"),d()}function l(a){"REMOVE"!=a?b.format.applyStyle("color",b.helpers.HEXtoRGB(a)):b.format.removeStyle("color"),d()}function m(){b.popups.hide("colors.picker"),b.toolbar.showInline()}return{showColorsPopup:c,hideColorsPopup:d,changeSet:j,background:k,text:l,back:m}},a.FE.DefineIcon("colors",{NAME:"tint"}),a.FE.RegisterCommand("color",{title:"Colors",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("colors.picker")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("colors.picker")):this.colors.showColorsPopup()},plugin:"colors"}),a.FE.RegisterCommand("textColor",{undo:!0,callback:function(a,b){this.colors.text(b)}}),a.FE.RegisterCommand("backgroundColor",{undo:!0,callback:function(a,b){this.colors.background(b)}}),a.FE.RegisterCommand("colorChangeSet",{undo:!1,focus:!1,callback:function(a,b){var c=this.popups.get("colors.picker").find('.fr-command[data-cmd="'+a+'"][data-param1="'+b+'"]');this.colors.changeSet(c,b)}}),a.FE.DefineIcon("colorsBack",{NAME:"arrow-left"}),a.FE.RegisterCommand("colorsBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.colors.back()}}),a.FE.DefineIcon("remove",{NAME:"eraser"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.POPUP_TEMPLATES,{emoticons:"[_BUTTONS_][_EMOTICONS_]"}),a.extend(a.FE.DEFAULTS,{emoticonsStep:8,emoticonsSet:[{code:"1f600",desc:"Grinning face"},{code:"1f601",desc:"Grinning face with smiling eyes"},{code:"1f602",desc:"Face with tears of joy"},{code:"1f603",desc:"Smiling face with open mouth"},{code:"1f604",desc:"Smiling face with open mouth and smiling eyes"},{code:"1f605",desc:"Smiling face with open mouth and cold sweat"},{code:"1f606",desc:"Smiling face with open mouth and tightly-closed eyes"},{code:"1f607",desc:"Smiling face with halo"},{code:"1f608",desc:"Smiling face with horns"},{code:"1f609",desc:"Winking face"},{code:"1f60a",desc:"Smiling face with smiling eyes"},{code:"1f60b",desc:"Face savoring delicious food"},{code:"1f60c",desc:"Relieved face"},{code:"1f60d",desc:"Smiling face with heart-shaped eyes"},{code:"1f60e",desc:"Smiling face with sunglasses"},{code:"1f60f",desc:"Smirking face"},{code:"1f610",desc:"Neutral face"},{code:"1f611",desc:"Expressionless face"},{code:"1f612",desc:"Unamused face"},{code:"1f613",desc:"Face with cold sweat"},{code:"1f614",desc:"Pensive face"},{code:"1f615",desc:"Confused face"},{code:"1f616",desc:"Confounded face"},{code:"1f617",desc:"Kissing face"},{code:"1f618",desc:"Face throwing a kiss"},{code:"1f619",desc:"Kissing face with smiling eyes"},{code:"1f61a",desc:"Kissing face with closed eyes"},{code:"1f61b",desc:"Face with stuck out tongue"},{code:"1f61c",desc:"Face with stuck out tongue and winking eye"},{code:"1f61d",desc:"Face with stuck out tongue and tightly-closed eyes"},{code:"1f61e",desc:"Disappointed face"},{code:"1f61f",desc:"Worried face"},{code:"1f620",desc:"Angry face"},{code:"1f621",desc:"Pouting face"},{code:"1f622",desc:"Crying face"},{code:"1f623",desc:"Persevering face"},{code:"1f624",desc:"Face with look of triumph"},{code:"1f625",desc:"Disappointed but relieved face"},{code:"1f626",desc:"Frowning face with open mouth"},{code:"1f627",desc:"Anguished face"},{code:"1f628",desc:"Fearful face"},{code:"1f629",desc:"Weary face"},{code:"1f62a",desc:"Sleepy face"},{code:"1f62b",desc:"Tired face"},{code:"1f62c",desc:"Grimacing face"},{code:"1f62d",desc:"Loudly crying face"},{code:"1f62e",desc:"Face with open mouth"},{code:"1f62f",desc:"Hushed face"},{code:"1f630",desc:"Face with open mouth and cold sweat"},{code:"1f631",desc:"Face screaming in fear"},{code:"1f632",desc:"Astonished face"},{code:"1f633",desc:"Flushed face"},{code:"1f634",desc:"Sleeping face"},{code:"1f635",desc:"Dizzy face"},{code:"1f636",desc:"Face without mouth"},{code:"1f637",desc:"Face with medical mask"}],emoticonsButtons:["emoticonsBack","|"],emoticonsUseImage:!0}),a.FE.PLUGINS.emoticons=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="emoticons"]'),c=b.popups.get("emoticons");if(c||(c=e()),!c.hasClass("fr-active")){b.popups.refresh("emoticons"),b.popups.setContainer("emoticons",b.$tb);var d=a.offset().left+a.outerWidth()/2,f=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("emoticons",d,f,a.outerHeight())}}function d(){b.popups.hide("emoticons")}function e(){var a="";b.opts.toolbarInline&&b.opts.emoticonsButtons.length>0&&(a='<div class="fr-buttons fr-emoticons-buttons">'+b.button.buildList(b.opts.emoticonsButtons)+"</div>");var c={buttons:a,emoticons:f()},d=b.popups.create("emoticons",c);return b.tooltip.bind(d,".fr-emoticon"),g(d),d}function f(){for(var a='<div style="text-align: center">',c=0;c<b.opts.emoticonsSet.length;c++)0!==c&&c%b.opts.emoticonsStep===0&&(a+="<br>"),a+='<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="'+b.language.translate(b.opts.emoticonsSet[c].desc)+'" role="button" data-param1="'+b.opts.emoticonsSet[c].code+'">'+(b.opts.emoticonsUseImage?'<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/'+b.opts.emoticonsSet[c].code+'.svg"/>':"&#x"+b.opts.emoticonsSet[c].code+";")+'<span class="fr-sr-only">'+b.language.translate(b.opts.emoticonsSet[c].desc)+"&nbsp;&nbsp;&nbsp;</span></span>";return b.opts.emoticonsUseImage&&(a+='<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>'),a+="</div>"}function g(c){b.events.on("popup.tab",function(d){var e=a(d.currentTarget);if(!b.popups.isVisible("emoticons")||!e.is("span, a"))return!0;var f,g,h,i=d.which;if(a.FE.KEYCODE.TAB==i){if(e.is("span.fr-emoticon")&&d.shiftKey||e.is("a")&&!d.shiftKey){var j=c.find(".fr-buttons");f=!b.accessibility.focusToolbar(j,!!d.shiftKey)}if(f!==!1){var k=c.find("span.fr-emoticon:focus:first, span.fr-emoticon:visible:first, a");e.is("span.fr-emoticon")&&(k=k.not("span.fr-emoticon:not(:focus)")),g=k.index(e),g=d.shiftKey?((g-1)%k.length+k.length)%k.length:(g+1)%k.length,h=k.get(g),b.events.disableBlur(),h.focus(),f=!1}}else if(a.FE.KEYCODE.ARROW_UP==i||a.FE.KEYCODE.ARROW_DOWN==i||a.FE.KEYCODE.ARROW_LEFT==i||a.FE.KEYCODE.ARROW_RIGHT==i){if(e.is("span.fr-emoticon")){var l=e.parent().find("span.fr-emoticon");g=l.index(e);var m=b.opts.emoticonsStep,n=Math.floor(l.length/m),o=g%m,p=Math.floor(g/m),q=p*m+o,r=n*m;a.FE.KEYCODE.ARROW_UP==i?q=((q-m)%r+r)%r:a.FE.KEYCODE.ARROW_DOWN==i?q=(q+m)%r:a.FE.KEYCODE.ARROW_LEFT==i?q=((q-1)%r+r)%r:a.FE.KEYCODE.ARROW_RIGHT==i&&(q=(q+1)%r),h=a(l.get(q)),b.events.disableBlur(),h.focus(),f=!1}}else a.FE.KEYCODE.ENTER==i&&(e.is("a")?e[0].click():b.button.exec(e),f=!1);return f===!1&&(d.preventDefault(),d.stopPropagation()),f},!0)}function h(c,d){b.html.insert('<span class="fr-emoticon fr-deletable'+(d?" fr-emoticon-img":"")+'"'+(d?' style="background: url('+d+');"':"")+">"+(d?"&nbsp;":c)+"</span>&nbsp;"+a.FE.MARKERS,!0)}function i(){b.popups.hide("emoticons"),b.toolbar.showInline()}function j(){var c=function(){for(var a=b.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"),c=0;c<a.length;c++)a[c].className+=" fr-deletable"};c(),b.events.on("html.set",c),b.events.on("html.get",function(c){for(var d=0;d<b.opts.emoticonsSet.length;d++){var e=b.opts.emoticonsSet[d],f=a("<div>").html(e.code).text();c=c.split(f).join(e.code)}return c});var d=function(){if(!b.selection.isCollapsed())return!1;var a=b.selection.element(),c=b.selection.endElement();if(a&&b.node.hasClass(a,"fr-emoticon"))return a;if(c&&b.node.hasClass(c,"fr-emoticon"))return c;var d=b.selection.ranges(0),e=d.startContainer;if(e.nodeType==Node.ELEMENT_NODE&&e.childNodes.length>0&&d.startOffset>0){var f=e.childNodes[d.startOffset-1];if(b.node.hasClass(f,"fr-emoticon"))return f}return!1};b.events.on("keydown",function(c){if(b.keys.isCharacter(c.which)&&b.selection.inEditor()){var e=b.selection.ranges(0),f=d();f&&(0===e.startOffset&&b.selection.element()===f?a(f).before(a.FE.MARKERS+a.FE.INVISIBLE_SPACE):a(f).after(a.FE.INVISIBLE_SPACE+a.FE.MARKERS),b.selection.restore())}}),b.events.on("keyup",function(c){for(var e=b.el.querySelectorAll(".fr-emoticon"),f=0;f<e.length;f++)"undefined"!=typeof e[f].textContent&&0===e[f].textContent.replace(/\u200B/gi,"").length&&a(e[f]).remove();if(!(c.which>=a.FE.KEYCODE.ARROW_LEFT&&c.which<=a.FE.KEYCODE.ARROW_DOWN)){var g=d();b.node.hasClass(g,"fr-emoticon-img")&&(a(g).append(a.FE.MARKERS),b.selection.restore())}})}return{_init:j,insert:h,showEmoticonsPopup:c,hideEmoticonsPopup:d,back:i}},a.FE.DefineIcon("emoticons",{NAME:"smile-o"}),a.FE.RegisterCommand("emoticons",{title:"Emoticons",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("emoticons")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("emoticons")):this.emoticons.showEmoticonsPopup()},plugin:"emoticons"}),a.FE.RegisterCommand("insertEmoticon",{callback:function(a,b){this.emoticons.insert("&#x"+b+";",this.opts.emoticonsUseImage?"https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/"+b+".svg":null),this.emoticons.hideEmoticonsPopup()}}),a.FE.DefineIcon("emoticonsBack",{NAME:"arrow-left"}),a.FE.RegisterCommand("emoticonsBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.emoticons.back()}})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{fontFamily:{"Arial,Helvetica,sans-serif":"Arial","Georgia,serif":"Georgia","Impact,Charcoal,sans-serif":"Impact","Tahoma,Geneva,sans-serif":"Tahoma","Times New Roman,Times,serif":"Times New Roman","Verdana,Geneva,sans-serif":"Verdana"},fontFamilySelection:!1,fontFamilyDefaultSelection:"Font Family"}),a.FE.PLUGINS.fontFamily=function(b){function c(a){b.format.applyStyle("font-family",a)}function d(a,b){b.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected",!1),b.find('.fr-command[data-param1="'+g()+'"]').addClass("fr-active").attr("aria-selected",!0);var c=b.find(".fr-dropdown-list"),d=b.find(".fr-active").parent();d.length?c.parent().scrollTop(d.offset().top-c.offset().top-(c.parent().outerHeight()/2-d.outerHeight()/2)):c.parent().scrollTop(0)}function e(b){var c=b.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi,"").replace(/"|'| /g,"").split(",");return a.grep(c,function(a){return a.length>0})}function f(a,b){for(var c=0;c<a.length;c++)for(var d=0;d<b.length;d++)if(a[c]==b[d])return[c,d];return null}function g(){var c=a(b.selection.element()).css("font-family"),d=e(c),g=[];for(var h in b.opts.fontFamily)if(b.opts.fontFamily.hasOwnProperty(h)){var i=e(h),j=f(d,i);j&&g.push([h,j])}return 0===g.length?null:(g.sort(function(a,b){var c=a[1][0]-b[1][0];return 0===c?a[1][1]-b[1][1]:c}),g[0][0])}function h(c){if(b.opts.fontFamilySelection){var d=a(b.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi,"").replace(/"|'|/g,"").split(",");c.find("> span").text(b.opts.fontFamily[g()]||d[0]||b.opts.fontFamilyDefaultSelection)}}return{apply:c,refreshOnShow:d,refresh:h}},a.FE.RegisterCommand("fontFamily",{type:"dropdown",displaySelection:function(a){return a.opts.fontFamilySelection},defaultSelection:function(a){return a.opts.fontFamilyDefaultSelection},displaySelectionWidth:120,html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.fontFamily;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="'+c+'" style="font-family: '+c+'" title="'+b[c]+'">'+b[c]+"</a></li>");return a+="</ul>"},title:"Font Family",callback:function(a,b){this.fontFamily.apply(b)},refresh:function(a){this.fontFamily.refresh(a)},refreshOnShow:function(a,b){this.fontFamily.refreshOnShow(a,b)},plugin:"fontFamily"}),a.FE.DefineIcon("fontFamily",{NAME:"font"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{fontSize:["8","9","10","11","12","14","18","24","30","36","48","60","72","96"],fontSizeSelection:!1,fontSizeDefaultSelection:"12"}),a.FE.PLUGINS.fontSize=function(b){function c(a){b.format.applyStyle("font-size",a)}function d(c,d){var e=a(b.selection.element()).css("font-size");d.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected",!1),d.find('.fr-command[data-param1="'+e+'"]').addClass("fr-active").attr("aria-selected",!0);var f=d.find(".fr-dropdown-list"),g=d.find(".fr-active").parent();g.length?f.parent().scrollTop(g.offset().top-f.offset().top-(f.parent().outerHeight()/2-g.outerHeight()/2)):f.parent().scrollTop(0)}function e(c){if(b.opts.fontSizeSelection){var d=b.helpers.getPX(a(b.selection.element()).css("font-size"));c.find("> span").text(d)}}return{apply:c,refreshOnShow:d,refresh:e}},a.FE.RegisterCommand("fontSize",{type:"dropdown",title:"Font Size",displaySelection:function(a){return a.opts.fontSizeSelection},displaySelectionWidth:30,defaultSelection:function(a){return a.opts.fontSizeDefaultSelection},html:function(){for(var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.fontSize,c=0;c<b.length;c++){var d=b[c];a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="'+d+'px" title="'+d+'">'+d+"</a></li>"}return a+="</ul>"},callback:function(a,b){this.fontSize.apply(b)},refresh:function(a){this.fontSize.refresh(a)},refreshOnShow:function(a,b){this.fontSize.refreshOnShow(a,b)},plugin:"fontSize"}),a.FE.DefineIcon("fontSize",{NAME:"text-height"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.FE.PLUGINS.fullscreen=function(b){function c(){return b.$box.hasClass("fr-fullscreen")}function d(){i=a(b.o_win).scrollTop(),b.$box.toggleClass("fr-fullscreen"),a("body").toggleClass("fr-fullscreen"),j=a('<div style="display: none;"></div>'),b.$box.after(j),b.helpers.isMobile()&&(b.$tb.data("parent",b.$tb.parent()),b.$tb.prependTo(b.$box),b.$tb.data("sticky-dummy")&&b.$tb.after(b.$tb.data("sticky-dummy"))),k=b.opts.height,l=b.opts.heightMax,m=b.opts.zIndex,b.opts.height=b.o_win.innerHeight-(b.opts.toolbarInline?0:b.$tb.outerHeight()),b.opts.zIndex=9990,b.opts.heightMax=null,b.size.refresh(),b.opts.toolbarInline&&b.toolbar.showInline();for(var c=b.$box.parent();!c.is("body");)c.data("z-index",c.css("z-index")).css("z-index","9990"),c=c.parent();b.events.trigger("charCounter.update"),b.$win.trigger("scroll")}function e(){b.$box.toggleClass("fr-fullscreen"),a("body").toggleClass("fr-fullscreen"),b.$tb.prependTo(b.$tb.data("parent")),b.$tb.data("sticky-dummy")&&b.$tb.after(b.$tb.data("sticky-dummy")),b.opts.height=k,b.opts.heightMax=l,b.opts.zIndex=m,b.size.refresh(),a(b.o_win).scrollTop(i),b.opts.toolbarInline&&b.toolbar.showInline(),b.events.trigger("charCounter.update"),b.opts.toolbarSticky&&b.opts.toolbarStickyOffset&&(b.opts.toolbarBottom?b.$tb.css("bottom",b.opts.toolbarStickyOffset).data("bottom",b.opts.toolbarStickyOffset):b.$tb.css("top",b.opts.toolbarStickyOffset).data("top",b.opts.toolbarStickyOffset));for(var c=b.$box.parent();!c.is("body");)c.data("z-index")&&(c.css("z-index",""),c.css("z-index")!=c.data("z-index")&&c.css("z-index",c.data("z-index")),c.removeData("z-index")),c=c.parent();b.$win.trigger("scroll")}function f(){c()?e():d(),g(b.$tb.find('.fr-command[data-cmd="fullscreen"]'))}function g(a){var d=c();a.toggleClass("fr-active",d).attr("aria-pressed",d),a.find("> *:not(.fr-sr-only)").replaceWith(d?b.icon.create("fullscreenCompress"):b.icon.create("fullscreen"))}function h(){return!!b.$wp&&(b.events.$on(a(b.o_win),"resize",function(){c()&&(e(),d())}),void b.events.on("toolbar.hide",function(){if(c()&&b.helpers.isMobile())return!1}))}var i,j,k,l,m;return{_init:h,toggle:f,refresh:g,isActive:c}},a.FE.RegisterCommand("fullscreen",{title:"Fullscreen",undo:!1,focus:!1,accessibilityFocus:!0,forcedRefresh:!0,toggle:!0,callback:function(){this.fullscreen.toggle()},refresh:function(a){this.fullscreen.refresh(a)},plugin:"fullscreen"}),a.FE.DefineIcon("fullscreen",{NAME:"expand"}),a.FE.DefineIcon("fullscreenCompress",{NAME:"compress"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.POPUP_TEMPLATES,{"image.insert":"[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]","image.edit":"[_BUTTONS_]","image.alt":"[_BUTTONS_][_ALT_LAYER_]","image.size":"[_BUTTONS_][_SIZE_LAYER_]"}),a.extend(a.FE.DEFAULTS,{imageInsertButtons:["imageBack","|","imageUpload","imageByURL"],imageEditButtons:["imageReplace","imageAlign","imageRemove","|","imageLink","linkOpen","linkEdit","linkRemove","-","imageDisplay","imageStyle","imageAlt","imageSize"],imageAltButtons:["imageBack","|"],imageSizeButtons:["imageBack","|"],imageUploadURL:"https://i.froala.com/upload",imageUploadParam:"file",imageUploadParams:{},imageUploadToS3:!1,imageUploadMethod:"POST",imageMaxSize:10485760,imageAllowedTypes:["jpeg","jpg","png","gif","svg+xml"],imageResize:!0,imageResizeWithPercent:!1,imageRoundPercent:!1,imageDefaultWidth:300,imageDefaultAlign:"center",imageDefaultDisplay:"block",imageSplitHTML:!1,imageStyles:{"fr-rounded":"Rounded","fr-bordered":"Bordered"},imageMove:!0,imageMultipleStyles:!0,imageTextNear:!0,imagePaste:!0,imagePasteProcess:!1,imageMinWidth:16,imageOutputSize:!1}),a.FE.PLUGINS.image=function(b){function c(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val(""),sa&&c.val(sa.attr("src")),c.trigger("change")}function d(){var a=b.$tb.find('.fr-command[data-cmd="insertImage"]'),c=b.popups.get("image.insert");if(c||(c=L()),r(),!c.hasClass("fr-active"))if(b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",b.$tb),a.is(":visible")){var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("image.insert",d,e,a.outerHeight())}else b.position.forSelection(c),b.popups.show("image.insert")}function e(){var c=b.popups.get("image.edit");if(c||(c=p()),c){b.popups.setContainer("image.edit",a(b.opts.scrollableContainer)),b.popups.refresh("image.edit");var d=sa.offset().left+sa.outerWidth()/2,e=sa.offset().top+sa.outerHeight();b.popups.show("image.edit",d,e,sa.outerHeight())}}function f(){r()}function g(a){if(!a.hasClass("fr-dii")&&!a.hasClass("fr-dib")){var c=a.css("float");a.css("float","none"),"block"==a.css("display")?(a.css("float",c),b.opts.imageEditButtons.indexOf("imageAlign")>=0&&(0===parseInt(a.css("margin-left"),10)&&(a.attr("style")||"").indexOf("margin-right: auto")>=0?a.addClass("fr-fil"):0===parseInt(a.css("margin-right"),10)&&(a.attr("style")||"").indexOf("margin-left: auto")>=0&&a.addClass("fr-fir")),a.addClass("fr-dib")):(a.css("float",c),b.opts.imageEditButtons.indexOf("imageAlign")>=0&&("left"==a.css("float")?a.addClass("fr-fil"):"right"==a.css("float")&&a.addClass("fr-fir")),a.addClass("fr-dii")),a.css("margin",""),a.css("float",""),a.css("display",""),a.css("z-index",""),a.css("position",""),a.css("overflow",""),a.css("vertical-align","")}}function h(){for(var c="IMG"==b.el.tagName?[b.el]:b.el.querySelectorAll("img"),d=0;d<c.length;d++){var e=a(c[d]);(b.opts.imageEditButtons.indexOf("imageAlign")>=0||b.opts.imageEditButtons.indexOf("imageDisplay")>=0)&&g(e),b.opts.imageTextNear||e.removeClass("fr-dii").addClass("fr-dib"),b.opts.iframe&&e.on("load",b.size.syncIframe)}}function i(){var c,d=Array.prototype.slice.call(b.el.querySelectorAll("img")),e=[];for(c=0;c<d.length;c++)e.push(d[c].getAttribute("src")),a(d[c]).toggleClass("fr-draggable",b.opts.imageMove),""===d[c].getAttribute("class")&&d[c].removeAttribute("class"),""===d[c].getAttribute("style")&&d[c].removeAttribute("style");if(Fa)for(c=0;c<Fa.length;c++)e.indexOf(Fa[c].getAttribute("src"))<0&&b.events.trigger("image.removed",[a(Fa[c])]);Fa=d}function j(){ta||Y();var c=b.$wp||a(b.opts.scrollableContainer);c.append(ta),ta.data("instance",b);var d=c.scrollTop()-("static"!=c.css("position")?c.offset().top:0),e=c.scrollLeft()-("static"!=c.css("position")?c.offset().left:0);e-=b.helpers.getPX(c.css("border-left-width")),d-=b.helpers.getPX(c.css("border-top-width")),b.$el.is("img")&&(d=0,e=0),ta.css("top",(b.opts.iframe?sa.offset().top:sa.offset().top+d)-1).css("left",(b.opts.iframe?sa.offset().left:sa.offset().left+e)-1).css("width",sa.get(0).getBoundingClientRect().width).css("height",sa.get(0).getBoundingClientRect().height).addClass("fr-active")}function k(a){return'<div class="fr-handler fr-h'+a+'"></div>'}function l(c){if(!b.core.sameInstance(ta))return!0;if(c.preventDefault(),c.stopPropagation(),b.$el.find("img.fr-error").left)return!1;b.undo.canDo()||b.undo.saveStep(),ua=a(this),ua.data("start-x",c.pageX||c.originalEvent.touches[0].pageX),ua.data("start-width",sa.width()),ua.data("start-height",sa.height());var d=sa.width();if(b.opts.imageResizeWithPercent){var e=sa.parentsUntil(b.$el,b.html.blockTagsQuery()).get(0)||b.el;sa.css("width",(d/a(e).outerWidth()*100).toFixed(2)+"%")}else sa.css("width",d);va.show(),b.popups.hideAll(),ga()}function m(c){if(!b.core.sameInstance(ta))return!0;if(ua&&sa){if(c.preventDefault(),b.$el.find("img.fr-error").left)return!1;var d=c.pageX||(c.originalEvent.touches?c.originalEvent.touches[0].pageX:null);if(!d)return!1;var e=ua.data("start-x"),f=d-e,g=ua.data("start-width");if((ua.hasClass("fr-hnw")||ua.hasClass("fr-hsw"))&&(f=0-f),b.opts.imageResizeWithPercent){var h=sa.parentsUntil(b.$el,b.html.blockTagsQuery()).get(0)||b.el;g=((g+f)/a(h).outerWidth()*100).toFixed(2),b.opts.imageRoundPercent&&(g=Math.round(g)),sa.css("width",g+"%"),sa.css("height","").removeAttr("height")}else g+f>=b.opts.imageMinWidth&&sa.css("width",g+f),sa.css("height",ua.data("start-height")*sa.width()/ua.data("start-width"));j(),b.events.trigger("image.resize",[qa()])}}function n(a){if(!b.core.sameInstance(ta))return!0;if(ua&&sa){if(a&&a.stopPropagation(),b.$el.find("img.fr-error").left)return!1;ua=null,va.hide(),j(),e(),b.undo.saveStep(),b.events.trigger("image.resizeEnd",[qa()])}}function o(a,c){b.edit.on(),sa&&sa.addClass("fr-error"),t(b.language.translate("Something went wrong. Please try again.")),b.events.trigger("image.error",[{code:a,message:Ea[a]},c])}function p(a){if(a)return b.$wp&&b.events.$on(b.$wp,"scroll",function(){sa&&b.popups.isVisible("image.edit")&&e()}),!0;var c="";if(b.opts.imageEditButtons.length>0){c+='<div class="fr-buttons">',c+=b.button.buildList(b.opts.imageEditButtons),c+="</div>";var d={buttons:c},f=b.popups.create("image.edit",d);return f}return!1}function q(c){var d=b.popups.get("image.insert");if(d||(d=L()),d.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),d.find(".fr-image-progress-bar-layer").addClass("fr-active"),d.find(".fr-buttons").hide(),sa){b.popups.setContainer("image.insert",a(b.opts.scrollableContainer));var e=sa.offset().left+sa.width()/2,f=sa.offset().top+sa.height();b.popups.show("image.insert",e,f,sa.outerHeight())}"undefined"==typeof c&&s("Uploading",0)}function r(a){var c=b.popups.get("image.insert");if(c&&(c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),c.find(".fr-image-progress-bar-layer").removeClass("fr-active"),c.find(".fr-buttons").show(),a||b.$el.find("img.fr-error").length)){if(b.events.focus(),b.$el.find("img.fr-error").length&&(b.$el.find("img.fr-error").remove(),b.undo.saveStep(),b.undo.run(),b.undo.dropRedo()),!b.$wp&&sa){var d=sa;ea(!0),b.selection.setAfter(d.get(0)),b.selection.restore()}b.popups.hide("image.insert")}}function s(a,c){var d=b.popups.get("image.insert");if(d){var e=d.find(".fr-image-progress-bar-layer");e.find("h3").text(a+(c?" "+c+"%":"")),e.removeClass("fr-error"),c?(e.find("div").removeClass("fr-indeterminate"),e.find("div > span").css("width",c+"%")):e.find("div").addClass("fr-indeterminate")}}function t(a){q();var c=b.popups.get("image.insert"),d=c.find(".fr-image-progress-bar-layer");d.addClass("fr-error");var e=d.find("h3");e.text(a),b.events.disableBlur(),e.focus()}function u(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val().length>0&&(q(),s("Loading image"),x(c.val(),!0,[],sa),c.val(""),c.blur())}function v(a){da.call(a.get(0))}function w(){var c=a(this);b.popups.hide("image.insert"),c.removeClass("fr-uploading"),c.next().is("br")&&c.next().remove(),v(c),b.events.trigger("image.loaded",[c])}function x(a,c,d,e,f){b.edit.off(),s("Loading image"),c&&(a=b.helpers.sanitizeURL(a));var g=new Image;g.onload=function(){var c,g;if(e){b.undo.canDo()||e.hasClass("fr-uploading")||b.undo.saveStep();var h=e.data("fr-old-src");b.$wp?(c=e.clone().removeData("fr-old-src").removeClass("fr-uploading"),c.off("load"),h&&e.attr("src",h),e.replaceWith(c)):c=e;for(var j=c.get(0).attributes,k=0;k<j.length;k++){var l=j[k];0===l.nodeName.indexOf("data-")&&c.removeAttr(l.nodeName)}if("undefined"!=typeof d)for(g in d)d.hasOwnProperty(g)&&"link"!=g&&c.attr("data-"+g,d[g]);c.on("load",w),c.attr("src",a),b.edit.on(),i(),b.undo.saveStep(),b.$el.blur(),b.events.trigger(h?"image.replaced":"image.inserted",[c,f])}else c=D(a,d,w),i(),b.undo.saveStep(),b.events.trigger("image.inserted",[c,f])},g.onerror=function(){o(xa)},q("Loading image"),g.src=a}function y(c){try{if(b.events.trigger("image.uploaded",[c],!0)===!1)return b.edit.on(),!1;var d=a.parseJSON(c);return d.link?d:(o(ya,c),!1)}catch(e){return o(Aa,c),!1}}function z(c){try{var d=a(c).find("Location").text(),e=a(c).find("Key").text();return b.events.trigger("image.uploadedToS3",[d,e,c],!0)===!1?(b.edit.on(),!1):d}catch(f){return o(Aa,c),!1}}function A(a){s("Loading image");var c=this.status,d=this.response,e=this.responseXML,f=this.responseText;try{if(b.opts.imageUploadToS3)if(201==c){var g=z(e);g&&x(g,!1,[],a,d||e)}else o(Aa,d||e);else if(c>=200&&c<300){var h=y(f);h&&x(h.link,!1,h,a,d||f)}else o(za,d||f)}catch(i){o(Aa,d||f)}}function B(){o(Aa,this.response||this.responseText||this.responseXML)}function C(a){if(a.lengthComputable){var b=a.loaded/a.total*100|0;s("Uploading",b)}}function D(c,d,e){var f,g="";if(d&&"undefined"!=typeof d)for(f in d)d.hasOwnProperty(f)&&"link"!=f&&(g+=" data-"+f+'="'+d[f]+'"');var h=b.opts.imageDefaultWidth;h&&"auto"!=h&&(h+=b.opts.imageResizeWithPercent?"%":"px");var i=a('<img class="'+(b.opts.imageDefaultDisplay?"fr-di"+b.opts.imageDefaultDisplay[0]:"")+(b.opts.imageDefaultAlign&&"center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:"")+'" src="'+c+'"'+g+(h?' style="width: '+h+';"':"")+">");i.on("load",e),b.edit.on(),b.events.focus(!0),b.selection.restore(),b.undo.saveStep(),b.opts.imageSplitHTML?b.markers.split():b.markers.insert();var j=b.$el.find(".fr-marker");return j.replaceWith(i),b.html.wrap(),b.selection.clear(),i}function E(){b.edit.on(),r(!0)}function F(c,d,e){function f(){var e=a(this);e.off("load"),e.addClass("fr-uploading"),e.next().is("br")&&e.next().remove(),b.placeholder.refresh(),e.is(sa)||v(e),j(),q(),b.edit.off(),c.onload=function(){A.call(c,e)},c.onerror=B,c.upload.onprogress=C,c.onabort=E,e.off("abortUpload").on("abortUpload",function(){4!=c.readyState&&c.abort()}),c.send(d)}var g,h=new FileReader;h.addEventListener("load",function(){var a=h.result;if(h.result.indexOf("svg+xml")<0){for(var c=atob(h.result.split(",")[1]),d=[],e=0;e<c.length;e++)d.push(c.charCodeAt(e));a=window.URL.createObjectURL(new Blob([new Uint8Array(d)],{type:"image/jpeg"}))}sa?(sa.on("load",f),b.edit.on(),b.undo.saveStep(),sa.data("fr-old-src",sa.attr("src")),sa.attr("src",a)):g=D(a,null,f)},!1),h.readAsDataURL(e)}function G(a){if("undefined"!=typeof a&&a.length>0){if(b.events.trigger("image.beforeUpload",[a])===!1)return!1;var c=a[0];if(c.size>b.opts.imageMaxSize)return o(Ba),!1;if(b.opts.imageAllowedTypes.indexOf(c.type.replace(/image\//g,""))<0)return o(Ca),!1;var d;if(b.drag_support.formdata&&(d=b.drag_support.formdata?new FormData:null),d){var e;if(b.opts.imageUploadToS3!==!1){d.append("key",b.opts.imageUploadToS3.keyStart+(new Date).getTime()+"-"+(c.name||"untitled")),d.append("success_action_status","201"),d.append("X-Requested-With","xhr"),d.append("Content-Type",c.type);for(e in b.opts.imageUploadToS3.params)b.opts.imageUploadToS3.params.hasOwnProperty(e)&&d.append(e,b.opts.imageUploadToS3.params[e])}for(e in b.opts.imageUploadParams)b.opts.imageUploadParams.hasOwnProperty(e)&&d.append(e,b.opts.imageUploadParams[e]);d.append(b.opts.imageUploadParam,c);var f=b.opts.imageUploadURL;b.opts.imageUploadToS3&&(f=b.opts.imageUploadToS3.uploadURL?b.opts.imageUploadToS3.uploadURL:"https://"+b.opts.imageUploadToS3.region+".amazonaws.com/"+b.opts.imageUploadToS3.bucket);var g=b.core.getXHR(f,b.opts.imageUploadMethod);F(g,d,c)}}}function H(c){b.events.$on(c,"dragover dragenter",".fr-image-upload-layer",function(){return a(this).addClass("fr-drop"),!1}),b.events.$on(c,"dragleave dragend",".fr-image-upload-layer",function(){return a(this).removeClass("fr-drop"),!1}),b.events.$on(c,"drop",".fr-image-upload-layer",function(d){d.preventDefault(),d.stopPropagation(),a(this).removeClass("fr-drop");var e=d.originalEvent.dataTransfer;if(e&&e.files){var f=c.data("instance")||b;f.events.disableBlur(),f.image.upload(e.files),f.events.enableBlur()}}),b.events.$on(c,"change",'.fr-image-upload-layer input[type="file"]',function(){if(this.files){var d=c.data("instance")||b;d.events.disableBlur(),c.find("input:focus").blur(),d.events.enableBlur(),d.image.upload(this.files)}a(this).val("")})}function I(c){var d=c.originalEvent.dataTransfer;if(d&&d.files&&d.files.length){var e=d.files[0];if(e&&e.type&&b.opts.imageAllowedTypes.indexOf(e.type.replace(/image\//g,""))>=0){b.markers.remove(),b.markers.insertAtPoint(c.originalEvent),b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),b.popups.hideAll();var f=b.popups.get("image.insert");return f||(f=L()),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)),b.popups.show("image.insert",c.originalEvent.pageX,c.originalEvent.pageY),q(),G(d.files),c.preventDefault(),c.stopPropagation(),!1}}}function J(){var c,d,e=b.selection.ranges(0);e.collapsed&&e.startContainer.nodeType==Node.ELEMENT_NODE&&(e.startContainer.childNodes.length==e.startOffset?(c=e.startContainer.childNodes[e.startOffset-1],c&&"IMG"==c.tagName&&"block"==a(c).css("display")&&(d=b.node.blockParent(c),d&&b.html.defaultTag()?d.nextSibling||(["TD","TH"].indexOf(d.tagName)<0?a(d).after("<"+b.html.defaultTag()+"><br>"+a.FE.MARKERS+"</"+b.html.defaultTag()+">"):a(c).after("<br>"+a.FE.MARKERS),b.selection.restore()):d||(a(c).after("<br>"+a.FE.MARKERS),b.selection.restore()))):0===e.startOffset&&e.startContainer.childNodes.length>e.startOffset&&(c=e.startContainer.childNodes[e.startOffset],c&&"IMG"==c.tagName&&"block"==a(c).css("display")&&(d=b.node.blockParent(c),d&&b.html.defaultTag()?d.previousSibling||(["TD","TH"].indexOf(d.tagName)<0?a(d).before("<"+b.html.defaultTag()+"><br>"+a.FE.MARKERS+"</"+b.html.defaultTag()+">"):a(c).before("<br>"+a.FE.MARKERS),b.selection.restore()):d||(a(c).before(a.FE.MARKERS+"<br>"),b.selection.restore()))))}function K(){b.events.$on(b.$el,b._mousedown,"IMG"==b.el.tagName?null:'img:not([contenteditable="false"])',function(c){return"false"==a(this).parents("[contenteditable]:not(.fr-element):not(body):first").attr("contenteditable")||(b.helpers.isMobile()||b.selection.clear(),wa=!0,b.popups.areVisible()&&b.events.disableBlur(),b.browser.msie&&(b.events.disableBlur(),b.$el.attr("contenteditable",!1)),b.draggable||c.preventDefault(),void c.stopPropagation())}),b.events.$on(b.$el,b._mouseup,"IMG"==b.el.tagName?null:'img:not([contenteditable="false"])',function(c){return"false"==a(this).parents("[contenteditable]:not(.fr-element):not(body):first").attr("contenteditable")||void(wa&&(wa=!1,c.stopPropagation(),b.browser.msie&&(b.$el.attr("contenteditable",!0),b.events.enableBlur())))}),b.events.on("keyup",function(c){if(c.shiftKey&&""===b.selection.text().replace(/\n/g,"")){var d=b.selection.element(),e=b.selection.endElement();d&&"IMG"==d.tagName?v(a(d)):e&&"IMG"==e.tagName&&v(a(e))}},!0),b.events.on("drop",I),b.events.on("mousedown window.mousedown",fa),b.events.on("window.touchmove",ga),b.events.on("mouseup window.mouseup",function(){if(sa)return ea(),!1}),b.events.on("commands.mousedown",function(a){a.parents(".fr-toolbar").length>0&&ea()}),b.events.on("mouseup",J),b.events.on("blur image.hideResizer commands.undo commands.redo element.dropped",function(){wa=!1,ea(!0)})}function L(a){if(a)return b.popups.onRefresh("image.insert",c),b.popups.onHide("image.insert",f),!0;var d,e="";b.opts.imageInsertButtons.length>1&&(e='<div class="fr-buttons">'+b.button.buildList(b.opts.imageInsertButtons)+"</div>");var g=b.opts.imageInsertButtons.indexOf("imageUpload"),h=b.opts.imageInsertButtons.indexOf("imageByURL"),i="";g>=0&&(d=" fr-active",h>=0&&g>h&&(d=""),i='<div class="fr-image-upload-layer'+d+' fr-layer" id="fr-image-upload-layer-'+b.id+'"><strong>'+b.language.translate("Drop image")+"</strong><br>("+b.language.translate("or click")+')<div class="fr-form"><input type="file" accept="image/'+b.opts.imageAllowedTypes.join(", image/").toLowerCase()+'" tabIndex="-1" aria-labelledby="fr-image-upload-layer-'+b.id+'" role="button"></div></div>');var j="";h>=0&&(d=" fr-active",g>=0&&h>g&&(d=""),j='<div class="fr-image-by-url-layer'+d+' fr-layer" id="fr-image-by-url-layer-'+b.id+'"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-'+b.id+'" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">'+b.language.translate("Insert")+"</button></div></div>");var k='<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>',l={buttons:e,upload_layer:i,by_url_layer:j,progress_bar:k},m=b.popups.create("image.insert",l);return b.$wp&&b.events.$on(b.$wp,"scroll",function(){sa&&b.popups.isVisible("image.insert")&&na()}),H(m),m}function M(){if(sa){var a=b.popups.get("image.alt");a.find("input").val(sa.attr("alt")||"").trigger("change")}}function N(){var c=b.popups.get("image.alt");c||(c=O()),r(),b.popups.refresh("image.alt"),b.popups.setContainer("image.alt",a(b.opts.scrollableContainer));var d=sa.offset().left+sa.width()/2,e=sa.offset().top+sa.height();b.popups.show("image.alt",d,e,sa.outerHeight())}function O(a){if(a)return b.popups.onRefresh("image.alt",M),!0;var c="";c='<div class="fr-buttons">'+b.button.buildList(b.opts.imageAltButtons)+"</div>";var d="";d='<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'+b.id+'"><div class="fr-input-line"><input id="fr-image-alt-layer-text-'+b.id+'" type="text" placeholder="'+b.language.translate("Alternate Text")+'" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">'+b.language.translate("Update")+"</button></div></div>";var e={buttons:c,alt_layer:d},f=b.popups.create("image.alt",e);return b.$wp&&b.events.$on(b.$wp,"scroll.image-alt",function(){sa&&b.popups.isVisible("image.alt")&&N()}),f}function P(a){if(sa){var c=b.popups.get("image.alt");sa.attr("alt",a||c.find("input").val()||""),c.find("input:focus").blur(),v(sa)}}function Q(){if(sa){var a=b.popups.get("image.size");a.find('input[name="width"]').val(sa.get(0).style.width).trigger("change"),a.find('input[name="height"]').val(sa.get(0).style.height).trigger("change")}}function R(){var c=b.popups.get("image.size");c||(c=S()),r(),b.popups.refresh("image.size"),b.popups.setContainer("image.size",a(b.opts.scrollableContainer));var d=sa.offset().left+sa.width()/2,e=sa.offset().top+sa.height();b.popups.show("image.size",d,e,sa.outerHeight())}function S(a){if(a)return b.popups.onRefresh("image.size",Q),!0;var c="";c='<div class="fr-buttons">'+b.button.buildList(b.opts.imageSizeButtons)+"</div>";var d="";d='<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'+b.id+'"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-'+b.id+'" type="text" name="width" placeholder="'+b.language.translate("Width")+'" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height'+b.id+'" type="text" name="height" placeholder="'+b.language.translate("Height")+'" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">'+b.language.translate("Update")+"</button></div></div>";var e={buttons:c,size_layer:d},f=b.popups.create("image.size",e);return b.$wp&&b.events.$on(b.$wp,"scroll.image-size",function(){sa&&b.popups.isVisible("image.size")&&R()}),f}function T(a,c){if(sa){var d=b.popups.get("image.size");sa.css("width",a||d.find('input[name="width"]').val()),sa.css("height",c||d.find('input[name="height"]').val()),d.find("input:focus").blur(),v(sa)}}function U(a){var c,d,e=b.popups.get("image.insert");if(sa||b.opts.toolbarInline)sa&&(d=sa.offset().top+sa.outerHeight());else{var f=b.$tb.find('.fr-command[data-cmd="insertImage"]');c=f.offset().left+f.outerWidth()/2,d=f.offset().top+(b.opts.toolbarBottom?10:f.outerHeight()-10)}!sa&&b.opts.toolbarInline&&(d=e.offset().top-b.helpers.getPX(e.css("margin-top")),e.hasClass("fr-above")&&(d+=e.outerHeight())),e.find(".fr-layer").removeClass("fr-active"),e.find(".fr-"+a+"-layer").addClass("fr-active"),b.popups.show("image.insert",c,d,sa?sa.outerHeight():0),b.accessibility.focusPopup(e)}function V(a){var c=b.popups.get("image.insert");c.find(".fr-image-upload-layer").hasClass("fr-active")&&a.addClass("fr-active").attr("aria-pressed",!0)}function W(a){var c=b.popups.get("image.insert");c.find(".fr-image-by-url-layer").hasClass("fr-active")&&a.addClass("fr-active").attr("aria-pressed",!0)}function X(a,b,c,d){return a.pageX=b,l.call(this,a),a.pageX=a.pageX+c*Math.floor(Math.pow(1.1,d)),m.call(this,a),n.call(this,a),d++}function Y(){var c;if(b.shared.$image_resizer?(ta=b.shared.$image_resizer,va=b.shared.$img_overlay,b.events.on("destroy",function(){ta.removeClass("fr-active").appendTo(a("body"))},!0)):(b.shared.$image_resizer=a('<div class="fr-image-resizer"></div>'),ta=b.shared.$image_resizer,b.events.$on(ta,"mousedown",function(a){a.stopPropagation()},!0),b.opts.imageResize&&(ta.append(k("nw")+k("ne")+k("sw")+k("se")),b.shared.$img_overlay=a('<div class="fr-image-overlay"></div>'),va=b.shared.$img_overlay,c=ta.get(0).ownerDocument,a(c).find("body").append(va))),b.events.on("shared.destroy",function(){ta.html("").removeData().remove(),ta=null,b.opts.imageResize&&(va.remove(),va=null)},!0),b.helpers.isMobile()||b.events.$on(a(b.o_win),"resize",function(){sa&&!sa.hasClass("fr-uploading")?ea(!0):sa&&(j(),na(),q(!1))}),b.opts.imageResize){c=ta.get(0).ownerDocument,b.events.$on(ta,b._mousedown,".fr-handler",l),b.events.$on(a(c),b._mousemove,m),b.events.$on(a(c.defaultView||c.parentWindow),b._mouseup,n),b.events.$on(va,"mouseleave",n);var d=1,e=null,f=0;b.events.on("keydown",function(c){if(sa){var g=navigator.userAgent.indexOf("Mac OS X")!=-1?c.metaKey:c.ctrlKey,h=c.which;(h!==e||c.timeStamp-f>200)&&(d=1),(h==a.FE.KEYCODE.EQUALS||b.browser.mozilla&&h==a.FE.KEYCODE.FF_EQUALS)&&g&&!c.altKey?d=X.call(this,c,1,1,d):(h==a.FE.KEYCODE.HYPHEN||b.browser.mozilla&&h==a.FE.KEYCODE.FF_HYPHEN)&&g&&!c.altKey&&(d=X.call(this,c,2,-1,d)),e=h,f=c.timeStamp}},!0),b.events.on("keyup",function(){d=1})}}function Z(c){c=c||sa,c&&b.events.trigger("image.beforeRemove",[c])!==!1&&(b.popups.hideAll(),oa(),ea(!0),b.undo.canDo()||b.undo.saveStep(),c.get(0)==b.el?c.removeAttr("src"):("A"==c.get(0).parentNode.tagName?(b.selection.setBefore(c.get(0).parentNode)||b.selection.setAfter(c.get(0).parentNode)||c.parent().after(a.FE.MARKERS),a(c.get(0).parentNode).remove()):(b.selection.setBefore(c.get(0))||b.selection.setAfter(c.get(0))||c.after(a.FE.MARKERS),c.remove()),b.html.fillEmptyBlocks(),b.selection.restore()),b.undo.saveStep())}function $(c){var d=c.which;if(sa&&(d==a.FE.KEYCODE.BACKSPACE||d==a.FE.KEYCODE.DELETE))return c.preventDefault(),c.stopPropagation(),Z(),!1;if(sa&&d==a.FE.KEYCODE.ESC){var e=sa;return ea(!0),b.selection.setAfter(e.get(0)),b.selection.restore(),c.preventDefault(),!1}if(sa&&(d==a.FE.KEYCODE.ARROW_LEFT||d==a.FE.KEYCODE.ARROW_RIGHT)){var f=sa.get(0);return ea(!0),d==a.FE.KEYCODE.ARROW_LEFT?b.selection.setBefore(f):b.selection.setAfter(f),b.selection.restore(),c.preventDefault(),!1}return sa&&d!=a.FE.KEYCODE.F10&&!b.keys.isBrowserAction(c)?(c.preventDefault(),!1):void 0}function _(){if(K(),"IMG"==b.el.tagName&&b.$el.addClass("fr-view"),b.events.$on(b.$el,b.helpers.isMobile()&&!b.helpers.isWindowsPhone()?"touchend":"click","IMG"==b.el.tagName?null:'img:not([contenteditable="false"])',da),b.helpers.isMobile()&&(b.events.$on(b.$el,"touchstart","IMG"==b.el.tagName?null:'img:not([contenteditable="false"])',function(){Ga=!1}),b.events.$on(b.$el,"touchmove",function(){Ga=!0})),b.$wp?b.events.on("window.keydown keydown",$,!0):b.events.$on(b.$win,"keydown",$),b.events.on("toolbar.esc",function(){if(sa){if(b.$wp)b.events.disableBlur(),b.events.focus();else{var a=sa;ea(!0),b.selection.setAfter(a.get(0)),b.selection.restore()}return!1}},!0),b.events.on("window.cut window.copy",function(c){sa&&(oa(),a.FE.copied_text="\n",a.FE.copied_html=sa.get(0).outerHTML,"copy"==c.type?setTimeout(function(){v(sa)}):(ea(!0),b.undo.saveStep(),setTimeout(function(){b.undo.saveStep()},0)))},!0),b.events.$on(a(b.o_win),"keydown",function(b){var c=b.which;if(sa&&c==a.FE.KEYCODE.BACKSPACE)return b.preventDefault(),!1}),b.events.$on(b.$win,"keydown",function(b){var c=b.which;sa&&sa.hasClass("fr-uploading")&&c==a.FE.KEYCODE.ESC&&sa.trigger("abortUpload")}),b.events.on("destroy",function(){sa&&sa.hasClass("fr-uploading")&&sa.trigger("abortUpload")}),b.events.on("paste.before",ba),b.events.on("paste.beforeCleanup",ca),b.events.on("paste.after",aa),b.events.on("html.set",h),b.events.on("html.inserted",h),h(),b.events.on("destroy",function(){Fa=[]}),b.events.on("html.get",function(a){return a=a.replace(/<(img)((?:[\w\W]*?))class="([\w\W]*?)(fr-uploading|fr-error)([\w\W]*?)"((?:[\w\W]*?))>/g,"")}),b.opts.imageOutputSize){var c;b.events.on("html.beforeGet",function(){c=b.el.querySelectorAll("img");for(var d=0;d<c.length;d++){var e=c[d].style.width||a(c[d]).width(),f=c[d].style.height||a(c[d]).height();e&&c[d].setAttribute("width",(""+e).replace(/px/,"")),f&&c[d].setAttribute("height",(""+f).replace(/px/,""))}}),b.events.on("html.afterGet",function(){for(var a=0;a<c.length;a++)c[a].removeAttribute("width"),c[a].removeAttribute("height")})}b.opts.iframe&&b.events.on("image.loaded",b.size.syncIframe),b.$wp&&(i(),b.events.on("contentChanged",i)),b.events.$on(a(b.o_win),"orientationchange.image",function(){setTimeout(function(){var a=qa();a&&v(a)},0)}),p(!0),L(!0),S(!0),O(!0),b.events.on("node.remove",function(a){if("IMG"==a.get(0).tagName)return Z(a),!1})}function aa(){b.opts.imagePaste?b.$el.find("img[data-fr-image-pasted]").each(function(c,d){if(b.opts.imagePasteProcess){var f=b.opts.imageDefaultWidth;f&&"auto"!=f&&(f+=b.opts.imageResizeWithPercent?"%":"px"),a(d).css("width",f),a(d).removeClass("fr-dii fr-dib fr-fir fr-fil").addClass((b.opts.imageDefaultDisplay?"fr-di"+b.opts.imageDefaultDisplay[0]:"")+(b.opts.imageDefaultAlign&&"center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:""))}if(0===d.src.indexOf("data:")){if(b.events.trigger("image.beforePasteUpload",[d])===!1)return!1;sa=a(d),j(),e(),na(),q(),b.edit.off();for(var g=atob(a(d).attr("src").split(",")[1]),h=[],i=0;i<g.length;i++)h.push(g.charCodeAt(i));var k=new Blob([new Uint8Array(h)],{type:"image/jpeg"});G([k]),a(d).removeAttr("data-fr-image-pasted")}else 0!==d.src.indexOf("http")?(b.selection.save(),a(d).remove(),b.selection.restore()):a(d).removeAttr("data-fr-image-pasted")}):b.$el.find("img[data-fr-image-pasted]").remove()}function ba(a){if(a&&a.clipboardData&&a.clipboardData.items&&a.clipboardData.items[0]){var c=a.clipboardData.items[0].getAsFile();if(c){var d=new FileReader;return d.onload=function(a){var c=a.target.result,d=b.opts.imageDefaultWidth;d&&"auto"!=d&&(d+=b.opts.imageResizeWithPercent?"%":"px"),b.html.insert('<img data-fr-image-pasted="true" class="'+(b.opts.imageDefaultDisplay?"fr-di"+b.opts.imageDefaultDisplay[0]:"")+(b.opts.imageDefaultAlign&&"center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:"")+'" src="'+c+'"'+(d?' style="width: '+d+';"':"")+">"),b.events.trigger("paste.after")},d.readAsDataURL(c),!1}}}function ca(a){return a=a.replace(/<img /gi,'<img data-fr-image-pasted="true" ')}function da(c){if("false"==a(this).parents("[contenteditable]:not(.fr-element):not(body):first").attr("contenteditable"))return!0;if(c&&"touchend"==c.type&&Ga)return!0;if(c&&b.edit.isDisabled())return c.stopPropagation(),c.preventDefault(),!1;for(var d=0;d<a.FE.INSTANCES.length;d++)a.FE.INSTANCES[d]!=b&&a.FE.INSTANCES[d].events.trigger("image.hideResizer");b.toolbar.disable(),c&&(c.stopPropagation(),c.preventDefault()),b.helpers.isMobile()&&(b.events.disableBlur(),b.$el.blur(),b.events.enableBlur()),b.opts.iframe&&b.size.syncIframe(),sa=a(this),oa(),j(),e(),b.selection.clear(),b.button.bulkRefresh(),b.events.trigger("video.hideResizer")}function ea(a){sa&&(ha()||a===!0)&&(b.toolbar.enable(),ta.removeClass("fr-active"),b.popups.hide("image.edit"),sa=null,ga())}function fa(){Ha=!0}function ga(){Ha=!1}function ha(){return Ha}function ia(a){sa.removeClass("fr-fir fr-fil"),"left"==a?sa.addClass("fr-fil"):"right"==a&&sa.addClass("fr-fir"),j(),e()}function ja(a){sa&&(sa.hasClass("fr-fil")?a.find("> *:first").replaceWith(b.icon.create("align-left")):sa.hasClass("fr-fir")?a.find("> *:first").replaceWith(b.icon.create("align-right")):a.find("> *:first").replaceWith(b.icon.create("align-justify")))}function ka(a,b){if(sa){var c="justify";sa.hasClass("fr-fil")?c="left":sa.hasClass("fr-fir")&&(c="right"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active").attr("aria-selected",!0)}}function la(a){sa.removeClass("fr-dii fr-dib"),"inline"==a?sa.addClass("fr-dii"):"block"==a&&sa.addClass("fr-dib"),j(),e()}function ma(a,b){var c="block";sa.hasClass("fr-dii")&&(c="inline"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active").attr("aria-selected",!0)}function na(){var c=b.popups.get("image.insert");c||(c=L()),b.popups.isVisible("image.insert")||(r(),b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)));var d=sa.offset().left+sa.width()/2,e=sa.offset().top+sa.height();b.popups.show("image.insert",d,e,sa.outerHeight())}function oa(){if(sa){b.selection.clear();var a=b.doc.createRange();a.selectNode(sa.get(0));var c=b.selection.get();c.addRange(a)}}function pa(){sa?(b.events.disableBlur(),a(".fr-popup input:focus").blur(),v(sa)):(b.events.disableBlur(),b.selection.restore(),b.events.enableBlur(),b.popups.hide("image.insert"),b.toolbar.showInline())}function qa(){return sa}function ra(a,c,d){if("undefined"==typeof c&&(c=b.opts.imageStyles),"undefined"==typeof d&&(d=b.opts.imageMultipleStyles),!sa)return!1;if(!d){var e=Object.keys(c);e.splice(e.indexOf(a),1),sa.removeClass(e.join(" "))}sa.toggleClass(a),v(sa)}var sa,ta,ua,va,wa=!1,xa=1,ya=2,za=3,Aa=4,Ba=5,Ca=6,Da=7,Ea={};Ea[xa]="Image cannot be loaded from the passed link.",Ea[ya]="No link in upload response.",Ea[za]="Error during file upload.",Ea[Aa]="Parsing response failed.",Ea[Ba]="File is too large.",Ea[Ca]="Image file type is invalid.",Ea[Da]="Files can be uploaded only to same domain in IE 8 and IE 9.";var Fa,Ga,Ha=!1;return{_init:_,showInsertPopup:d,showLayer:U,refreshUploadButton:V,refreshByURLButton:W,upload:G,insertByURL:u,align:ia,refreshAlign:ja,refreshAlignOnShow:ka,display:la,refreshDisplayOnShow:ma,replace:na,back:pa,
get:qa,insert:x,showProgressBar:q,remove:Z,hideProgressBar:r,applyStyle:ra,showAltPopup:N,showSizePopup:R,setAlt:P,setSize:T,exitEdit:ea,edit:v}},a.FE.DefineIcon("insertImage",{NAME:"image"}),a.FE.RegisterShortcut(a.FE.KEYCODE.P,"insertImage",null,"P"),a.FE.RegisterCommand("insertImage",{title:"Insert Image",undo:!1,focus:!0,refreshAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("image.insert")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("image.insert")):this.image.showInsertPopup()},plugin:"image"}),a.FE.DefineIcon("imageUpload",{NAME:"upload"}),a.FE.RegisterCommand("imageUpload",{title:"Upload Image",undo:!1,focus:!1,toggle:!0,callback:function(){this.image.showLayer("image-upload")},refresh:function(a){this.image.refreshUploadButton(a)}}),a.FE.DefineIcon("imageByURL",{NAME:"link"}),a.FE.RegisterCommand("imageByURL",{title:"By URL",undo:!1,focus:!1,toggle:!0,callback:function(){this.image.showLayer("image-by-url")},refresh:function(a){this.image.refreshByURLButton(a)}}),a.FE.RegisterCommand("imageInsertByURL",{title:"Insert Image",undo:!0,refreshAfterCallback:!1,callback:function(){this.image.insertByURL()},refresh:function(a){var b=this.image.get();b?a.text(this.language.translate("Replace")):a.text(this.language.translate("Insert"))}}),a.FE.DefineIcon("imageDisplay",{NAME:"star"}),a.FE.RegisterCommand("imageDisplay",{title:"Display",type:"dropdown",options:{inline:"Inline",block:"Break Text"},callback:function(a,b){this.image.display(b)},refresh:function(a){this.opts.imageTextNear||a.addClass("fr-hidden")},refreshOnShow:function(a,b){this.image.refreshDisplayOnShow(a,b)}}),a.FE.ICONS.align||(a.FE.DefineIcon("align",{NAME:"align-left"}),a.FE.DefineIcon("align-left",{NAME:"align-left"}),a.FE.DefineIcon("align-right",{NAME:"align-right"}),a.FE.DefineIcon("align-center",{NAME:"align-center"}),a.FE.DefineIcon("align-justify",{NAME:"align-justify"})),a.FE.DefineIcon("imageAlign",{NAME:"align-center"}),a.FE.RegisterCommand("imageAlign",{type:"dropdown",title:"Align",options:{left:"Align Left",justify:"None",right:"Align Right"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.imageAlign.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+'<span class="fr-sr-only">'+this.language.translate(c[d])+"</span></a></li>");return b+="</ul>"},callback:function(a,b){this.image.align(b)},refresh:function(a){this.image.refreshAlign(a)},refreshOnShow:function(a,b){this.image.refreshAlignOnShow(a,b)}}),a.FE.DefineIcon("imageReplace",{NAME:"exchange"}),a.FE.RegisterCommand("imageReplace",{title:"Replace",undo:!1,focus:!1,popup:!0,refreshAfterCallback:!1,callback:function(){this.image.replace()}}),a.FE.DefineIcon("imageRemove",{NAME:"trash"}),a.FE.RegisterCommand("imageRemove",{title:"Remove",callback:function(){this.image.remove()}}),a.FE.DefineIcon("imageBack",{NAME:"arrow-left"}),a.FE.RegisterCommand("imageBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.image.back()},refresh:function(a){var b=this.image.get();b||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FE.RegisterCommand("imageDismissError",{title:"OK",undo:!1,callback:function(){this.image.hideProgressBar(!0)}}),a.FE.DefineIcon("imageStyle",{NAME:"magic"}),a.FE.RegisterCommand("imageStyle",{title:"Style",type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.imageStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="'+c+'">'+this.language.translate(b[c])+"</a></li>");return a+="</ul>"},callback:function(a,b){this.image.applyStyle(b)},refreshOnShow:function(b,c){var d=this.image.get();d&&c.find(".fr-command").each(function(){var b=a(this).data("param1"),c=d.hasClass(b);a(this).toggleClass("fr-active",c).attr("aria-selected",c)})}}),a.FE.DefineIcon("imageAlt",{NAME:"info"}),a.FE.RegisterCommand("imageAlt",{undo:!1,focus:!1,popup:!0,title:"Alternate Text",callback:function(){this.image.showAltPopup()}}),a.FE.RegisterCommand("imageSetAlt",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setAlt()}}),a.FE.DefineIcon("imageSize",{NAME:"arrows-alt"}),a.FE.RegisterCommand("imageSize",{undo:!1,focus:!1,popup:!0,title:"Change Size",callback:function(){this.image.showSizePopup()}}),a.FE.RegisterCommand("imageSetSize",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setSize()}})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){if(a.extend(a.FE.DEFAULTS,{imageManagerLoadURL:"https://i.froala.com/load-files",imageManagerLoadMethod:"get",imageManagerLoadParams:{},imageManagerPreloader:"",imageManagerDeleteURL:"",imageManagerDeleteMethod:"post",imageManagerDeleteParams:{},imageManagerPageSize:12,imageManagerScrollOffset:20,imageManagerToggleTags:!0}),a.FE.PLUGINS.imageManager=function(b){function c(){if(!y){var a='<div class="fr-modal-head-line"><i class="fa fa-bars fr-modal-more fr-not-available" id="fr-modal-more-'+b.sid+'" title="'+b.language.translate("Tags")+'"></i><h4 data-text="true">'+b.language.translate("Manage Images")+"</h4></div>";a+='<div class="fr-modal-tags" id="fr-modal-tags"></div>';var c='<img class="fr-preloader" id="fr-preloader" alt="'+b.language.translate("Loading")+'.." src="'+b.opts.imageManagerPreloader+'" style="display: none;">';c+='<div class="fr-image-list" id="fr-image-list"></div>';var d=b.modals.create(J,a,c);y=d.$modal,z=d.$head,A=d.$body}y.data("current-image",b.image.get()),b.modals.show(J),B||w(),g()}function d(){b.modals.hide(J)}function e(){var b=a(window).outerWidth();return b<768?2:b<1200?3:4}function f(){C.empty();for(var a=0;a<I;a++)C.append('<div class="fr-list-column"></div>')}function g(){B.show(),C.find(".fr-list-column").empty(),b.opts.imageManagerLoadURL?a.ajax({url:b.opts.imageManagerLoadURL,method:b.opts.imageManagerLoadMethod,data:b.opts.imageManagerLoadParams,dataType:"json",crossDomain:b.opts.requestWithCORS,xhrFields:{withCredentials:b.opts.requestWithCredentials},headers:b.opts.requestHeaders}).done(function(a,c,d){b.events.trigger("imageManager.imagesLoaded",[a]),h(a,d.response),B.hide()}).fail(function(){var a=this.xhr();r(L,a.response||a.responseText)}):r(M)}function h(a,b){try{C.find(".fr-list-column").empty(),F=0,G=0,H=0,E=a,i()}catch(c){r(N,b)}}function i(){if(G<E.length&&(C.outerHeight()<=A.outerHeight()+b.opts.imageManagerScrollOffset||A.scrollTop()+b.opts.imageManagerScrollOffset>C.outerHeight()-A.outerHeight())){F++;for(var a=b.opts.imageManagerPageSize*(F-1);a<Math.min(E.length,b.opts.imageManagerPageSize*F);a++)j(E[a])}}function j(c){var d=new Image,e=a('<div class="fr-image-container fr-empty fr-image-'+H++ +'" data-loading="'+b.language.translate("Loading")+'.." data-deleting="'+b.language.translate("Deleting")+'..">');n(!1),d.onload=function(){e.height(Math.floor(e.width()/d.width*d.height));var f=a("<img/>");if(c.thumb)f.attr("src",c.thumb);else{if(r(O,c),!c.url)return r(P,c),!1;f.attr("src",c.url)}if(c.url&&f.attr("data-url",c.url),c.tag)if(z.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"),z.find(".fr-modal-tags").show(),c.tag.indexOf(",")>=0){for(var g=c.tag.split(","),h=0;h<g.length;h++)g[h]=g[h].trim(),0===D.find('a[title="'+g[h]+'"]').length&&D.append('<a role="button" title="'+g[h]+'">'+g[h]+"</a>");f.attr("data-tag",g.join())}else 0===D.find('a[title="'+c.tag.trim()+'"]').length&&D.append('<a role="button" title="'+c.tag.trim()+'">'+c.tag.trim()+"</a>"),f.attr("data-tag",c.tag.trim());c.name&&f.attr("alt",c.name);for(var j in c)c.hasOwnProperty(j)&&"thumb"!=j&&"url"!=j&&"tag"!=j&&f.attr("data-"+j,c[j]);e.append(f).append(a(b.icon.create("imageManagerDelete")).addClass("fr-delete-img").attr("title",b.language.translate("Delete"))).append(a(b.icon.create("imageManagerInsert")).addClass("fr-insert-img").attr("title",b.language.translate("Insert"))),D.find(".fr-selected-tag").each(function(a,b){v(f,b.text)||e.hide()}),f.on("load",function(){e.removeClass("fr-empty"),e.height("auto"),G++;var a=l(parseInt(f.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1);m(a),n(!1),G%b.opts.imageManagerPageSize===0&&i()}),b.events.trigger("imageManager.imageLoaded",[f])},d.onerror=function(){G++,e.remove();var a=l(parseInt(e.attr("class").match(/fr-image-(\d+)/)[1],10)+1);m(a),r(K,c),G%b.opts.imageManagerPageSize===0&&i()},d.src=c.thumb||c.url,k().append(e)}function k(){var b,c;return C.find(".fr-list-column").each(function(d,e){var f=a(e);0===d?(c=f.outerHeight(),b=f):f.outerHeight()<c&&(c=f.outerHeight(),b=f)}),b}function l(b){void 0===b&&(b=0);for(var c=[],d=H-1;d>=b;d--){var e=C.find(".fr-image-"+d);e.length&&(c.push(e),a('<div id="fr-image-hidden-container">').append(e),C.find(".fr-image-"+d).remove())}return c}function m(a){for(var b=a.length-1;b>=0;b--)k().append(a[b])}function n(a){if(void 0===a&&(a=!0),!y.is(":visible"))return!0;var c=e();if(c!=I){I=c;var d=l();f(),m(d)}b.modals.resize(J),a&&i()}function o(a){var b={},c=a.data();for(var d in c)c.hasOwnProperty(d)&&"url"!=d&&"tag"!=d&&(b[d]=c[d]);return b}function p(c){var d=a(c.currentTarget).siblings("img"),e=y.data("instance")||b,f=y.data("current-image");if(b.modals.hide(J),e.image.showProgressBar(),f)f.data("fr-old-src",f.attr("src")),f.trigger("click");else{e.events.focus(!0),e.selection.restore();var g=e.position.getBoundingRect(),h=g.left+g.width/2,i=g.top+g.height;e.popups.setContainer("image.insert",e.$box||a("body")),e.popups.show("image.insert",h,i)}e.image.insert(d.data("url"),!1,o(d),f)}function q(c){var d=a(c.currentTarget).siblings("img"),e=b.language.translate("Are you sure? Image will be deleted.");confirm(e)&&(b.opts.imageManagerDeleteURL?b.events.trigger("imageManager.beforeDeleteImage",[d])!==!1&&(d.parent().addClass("fr-image-deleting"),a.ajax({method:b.opts.imageManagerDeleteMethod,url:b.opts.imageManagerDeleteURL,data:a.extend(a.extend({src:d.attr("src")},o(d)),b.opts.imageManagerDeleteParams),crossDomain:b.opts.requestWithCORS,xhrFields:{withCredentials:b.opts.requestWithCredentials},headers:b.opts.requestHeaders}).done(function(a){b.events.trigger("imageManager.imageDeleted",[a]);var c=l(parseInt(d.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1);d.parent().remove(),m(c),n(!0)}).fail(function(){var a=this.xhr();r(Q,a.response||a.responseText)})):r(R))}function r(c,d){10<=c&&c<20?B.hide():20<=c&&c<30&&a(".fr-image-deleting").removeClass("fr-image-deleting"),b.events.trigger("imageManager.error",[{code:c,message:S[c]},d])}function s(){var a=z.find(".fr-modal-head-line").outerHeight(),b=D.outerHeight();z.toggleClass(".fr-show-tags"),z.hasClass(".fr-show-tags")?(z.css("height",a+b),D.find("a").css("opacity",1)):(z.css("height",a),D.find("a").css("opacity",0))}function t(){var b=D.find(".fr-selected-tag");b.length>0?(C.find("img").parent().show(),b.each(function(b,c){C.find("img").each(function(b,d){var e=a(d);v(e,c.text)||e.parent().hide()})})):C.find("img").parent().show();var c=l();m(c),i()}function u(c){c.preventDefault();var d=a(c.currentTarget);d.toggleClass("fr-selected-tag"),b.opts.imageManagerToggleTags&&d.siblings("a").removeClass("fr-selected-tag"),t()}function v(a,b){for(var c=a.attr("data-tag").split(","),d=0;d<c.length;d++)if(c[d]==b)return!0;return!1}function w(){B=y.find("#fr-preloader"),C=y.find("#fr-image-list"),D=y.find("#fr-modal-tags"),I=e(),f(),z.css("height",z.find(".fr-modal-head-line").outerHeight()),b.events.$on(a(b.o_win),"resize",function(){n(E?!0:!1)}),b.helpers.isMobile()&&(b.events.bindClick(C,"div.fr-image-container",function(b){y.find(".fr-mobile-selected").removeClass("fr-mobile-selected"),a(b.currentTarget).addClass("fr-mobile-selected")}),y.on(b._mousedown,function(){y.find(".fr-mobile-selected").removeClass("fr-mobile-selected")})),b.events.bindClick(C,".fr-insert-img",p),b.events.bindClick(C,".fr-delete-img",q),y.on(b._mousedown+" "+b._mouseup,function(a){a.stopPropagation()}),y.on(b._mousedown,"*",function(){b.events.disableBlur()}),A.on("scroll",i),b.events.bindClick(y,"i#fr-modal-more-"+b.sid,s),b.events.bindClick(D,"a",u)}function x(){if(!b.$wp&&"IMG"!=b.el.tagName)return!1}var y,z,A,B,C,D,E,F,G,H,I,J="image_manager",K=10,L=11,M=12,N=13,O=14,P=15,Q=21,R=22,S={};return S[K]="Image cannot be loaded from the passed link.",S[L]="Error during load images request.",S[M]="Missing imageManagerLoadURL option.",S[N]="Parsing load response failed.",S[O]="Missing image thumb.",S[P]="Missing image URL.",S[Q]="Error during delete image request.",S[R]="Missing imageManagerDeleteURL option.",{require:["image"],_init:x,show:c,hide:d}},!a.FE.PLUGINS.image)throw new Error("Image manager plugin requires image plugin.");a.FE.DEFAULTS.imageInsertButtons.push("imageManager"),a.FE.RegisterCommand("imageManager",{title:"Browse",undo:!1,focus:!1,modal:!0,callback:function(){this.imageManager.show()},plugin:"imageManager"}),a.FE.DefineIcon("imageManager",{NAME:"folder"}),a.FE.DefineIcon("imageManagerInsert",{NAME:"plus"}),a.FE.DefineIcon("imageManagerDelete",{NAME:"trash"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{inlineStyles:{"Big Red":"font-size: 20px; color: red;","Small Blue":"font-size: 14px; color: blue;"}}),a.FE.PLUGINS.inlineStyle=function(b){function c(c){""!==b.selection.text()?b.html.insert(a.FE.START_MARKER+'<span style="'+c+'">'+b.selection.text()+"</span>"+a.FE.END_MARKER):b.html.insert('<span style="'+c+'">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>")}return{apply:c}},a.FE.RegisterCommand("inlineStyle",{type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.inlineStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><span style="'+b[c]+'" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="'+b[c]+'" title="'+this.language.translate(c)+'">'+this.language.translate(c)+"</a></span></li>");return a+="</ul>"},title:"Inline Style",callback:function(a,b){this.inlineStyle.apply(b)},plugin:"inlineStyle"}),a.FE.DefineIcon("inlineStyle",{NAME:"paint-brush"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{lineBreakerTags:["table","hr","form","dl","span.fr-video"],lineBreakerOffset:15}),a.FE.PLUGINS.lineBreaker=function(b){function c(c,d){var e,f,g,h,i,j,k,l;if(null==c)h=d.parent(),i=h.offset().top,k=d.offset().top,e=k-Math.min((k-i)/2,b.opts.lineBreakerOffset),g=h.outerWidth(),f=h.offset().left;else if(null==d)h=c.parent(),j=h.offset().top+h.outerHeight(),l=c.offset().top+c.outerHeight(),e=l+Math.min((j-l)/2,b.opts.lineBreakerOffset),g=h.outerWidth(),f=h.offset().left;else{h=c.parent();var m=c.offset().top+c.height(),o=d.offset().top;if(m>o)return!1;e=(m+o)/2,g=h.outerWidth(),f=h.offset().left}b.opts.iframe&&(f+=b.$iframe.offset().left-a(b.o_win).scrollLeft(),e+=b.$iframe.offset().top-a(b.o_win).scrollTop()),b.$box.append(n),n.css("top",e-b.win.pageYOffset),n.css("left",f-b.win.pageXOffset),n.css("width",g),n.data("tag1",c),n.data("tag2",d),n.addClass("fr-visible").data("instance",b)}function d(a,d){var f,g,h=a.offset().top,i=a.offset().top+a.outerHeight();if(Math.abs(i-d)<=b.opts.lineBreakerOffset||Math.abs(d-h)<=b.opts.lineBreakerOffset)if(Math.abs(i-d)<Math.abs(d-h)){g=a.get(0);for(var j=g.nextSibling;j&&j.nodeType==Node.TEXT_NODE&&0===j.textContent.length;)j=j.nextSibling;if(!j)return c(a,null),!0;if(f=e(j))return c(a,f),!0}else{if(g=a.get(0),!g.previousSibling)return c(null,a),!0;if(f=e(g.previousSibling))return c(f,a),!0}n.removeClass("fr-visible").removeData("instance")}function e(c){if(c){var d=a(c);if(0===b.$el.find(d).length)return null;if(c.nodeType!=Node.TEXT_NODE&&d.is(b.opts.lineBreakerTags.join(",")))return d;if(d.parents(b.opts.lineBreakerTags.join(",")).length>0)return c=d.parents(b.opts.lineBreakerTags.join(",")).get(0),a(c)}return null}function f(c){p=null;var f,g,h,i=null,j=b.doc.elementFromPoint(c.pageX-b.win.pageXOffset,c.pageY-b.win.pageYOffset);if(j&&("HTML"==j.tagName||"BODY"==j.tagName||b.node.isElement(j)))for(f=1;f<=b.opts.lineBreakerOffset;f++){if(g=b.doc.elementFromPoint(c.pageX-b.win.pageXOffset,c.pageY-b.win.pageYOffset-f),g&&!b.node.isElement(g)&&g!=b.$wp.get(0)&&a(g).parents(b.$wp).length){i=e(g);break}if(h=b.doc.elementFromPoint(c.pageX-b.win.pageXOffset,c.pageY-b.win.pageYOffset+f),h&&!b.node.isElement(h)&&h!=b.$wp.get(0)&&a(h).parents(b.$wp).length){i=e(h);break}}else i=e(j);i?d(i,c.pageY):b.core.sameInstance(n)&&n.removeClass("fr-visible").removeData("instance")}function g(a){return!(n.hasClass("fr-visible")&&!b.core.sameInstance(n))&&(b.popups.areVisible()||b.el.querySelector(".fr-selected-cell")?(n.removeClass("fr-visible"),!0):void(o===!1&&(p&&clearTimeout(p),p=setTimeout(f,30,a))))}function h(){p&&clearTimeout(p),n.hasClass("fr-visible")&&n.removeClass("fr-visible").removeData("instance")}function i(){o=!0,h()}function j(){o=!1}function k(c){if(!b.core.sameInstance(n))return!0;c.preventDefault(),n.removeClass("fr-visible").removeData("instance");var d=n.data("tag1"),e=n.data("tag2"),f=b.html.defaultTag();null==d?f&&"TD"!=e.parent().get(0).tagName?e.before("<"+f+">"+a.FE.MARKERS+"<br></"+f+">"):e.before(a.FE.MARKERS+"<br>"):f&&"TD"!=d.parent().get(0).tagName&&0===d.parents(f).length?d.after("<"+f+">"+a.FE.MARKERS+"<br></"+f+">"):d.after(a.FE.MARKERS+"<br>"),b.selection.restore()}function l(){b.shared.$line_breaker||(b.shared.$line_breaker=a('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="'+b.language.translate("Break")+'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')),n=b.shared.$line_breaker,b.events.on("shared.destroy",function(){n.html("").removeData().remove(),n=null},!0),b.events.on("destroy",function(){n.removeData("instance").removeClass("fr-visible").appendTo("body"),clearTimeout(p)},!0),b.events.$on(n,"mouseleave",h,!0),b.events.$on(n,"mousemove",function(a){a.stopPropagation()},!0),b.events.$on(n,"mousedown","a",function(a){a.stopPropagation()},!0),b.events.$on(n,"click","a",k,!0)}function m(){return!!b.$wp&&(l(),o=!1,b.events.$on(b.$win,"mousemove",g),b.events.$on(a(b.win),"scroll",h),b.events.on("popups.show.table.edit",h),b.events.on("commands.after",h),b.events.$on(a(b.win),"mousedown",i),void b.events.$on(a(b.win),"mouseup",j))}var n,o,p;return{_init:m}}});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.FE.PLUGINS.lists=function(b){function c(a){return'<span class="fr-open-'+a.toLowerCase()+'"></span>'}function d(a){return'<span class="fr-close-'+a.toLowerCase()+'"></span>'}function e(b,c){for(var d=[],e=0;e<b.length;e++){var f=b[e].parentNode;"LI"==b[e].tagName&&f.tagName!=c&&d.indexOf(f)<0&&d.push(f)}for(e=d.length-1;e>=0;e--){var g=a(d[e]);g.replaceWith("<"+c.toLowerCase()+">"+g.html()+"</"+c.toLowerCase()+">")}}function f(c,d){e(c,d);for(var f=b.html.defaultTag(),g=0;g<c.length;g++)"LI"!=c[g].tagName&&(f&&c[g].tagName.toLowerCase()==f?a(c[g]).replaceWith("<"+d+"><li"+b.node.attributes(c[g])+">"+a(c[g]).html()+"</li></"+d+">"):a(c[g]).wrap("<"+d+"><li></li></"+d+">"));b.clean.lists()}function g(e){var f,g;for(f=e.length-1;f>=0;f--)for(g=f-1;g>=0;g--)if(a(e[g]).find(e[f]).length||e[g]==e[f]){e.splice(f,1);break}var h=[];for(f=0;f<e.length;f++){var i=a(e[f]),j=e[f].parentNode;i.before(d(j.tagName)),"LI"==j.parentNode.tagName?(i.before(d("LI")),i.after(c("LI"))):(b.node.isEmpty(i.get(0),!0)||0!==i.find(b.html.blockTagsQuery()).length||i.append("<br>"),i.append(c("LI")),i.prepend(d("LI"))),i.after(c(j.tagName)),"LI"==j.parentNode.tagName&&(j=j.parentNode.parentNode),h.indexOf(j)<0&&h.push(j)}for(f=0;f<h.length;f++){var k=a(h[f]),l=k.html();l=l.replace(/<span class="fr-close-([a-z]*)"><\/span>/g,"</$1>"),l=l.replace(/<span class="fr-open-([a-z]*)"><\/span>/g,"<$1>"),k.replaceWith(b.node.openTagString(k.get(0))+l+b.node.closeTagString(k.get(0)))}b.$el.find("li:empty").remove(),b.$el.find("ul:empty, ol:empty").remove(),b.clean.lists(),b.html.wrap()}function h(a,b){for(var c=!0,d=0;d<a.length;d++){if("LI"!=a[d].tagName)return!1;a[d].parentNode.tagName!=b&&(c=!1)}return c}function i(a){b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();for(var c=b.selection.blocks(),d=0;d<c.length;d++)"LI"!=c[d].tagName&&"LI"==c[d].parentNode.tagName&&(c[d]=c[d].parentNode);b.selection.save(),h(c,a)?g(c):f(c,a),b.html.unwrap(),b.selection.restore()}function j(c,d){var e=a(b.selection.element());if(e.get(0)!=b.el){var f=e.get(0);"LI"!=f.tagName&&(f=e.parents("li").get(0)),f&&f.parentNode.tagName==d&&b.el.contains(f.parentNode)&&c.addClass("fr-active")}}function k(c){b.selection.save();for(var d=0;d<c.length;d++){var e=c[d].previousSibling;if(e){var f=a(c[d]).find("> ul, > ol").last().get(0);if(f){for(var g=a("<li>").prependTo(a(f)),h=b.node.contents(c[d])[0];h&&!b.node.isList(h);){var i=h.nextSibling;g.append(h),h=i}a(e).append(a(f)),a(c[d]).remove()}else{var j=a(e).find("> ul, > ol").last().get(0);if(j)a(j).append(a(c[d]));else{var k=a("<"+c[d].parentNode.tagName+">");a(e).append(k),k.append(a(c[d]))}}}}b.clean.lists(),b.selection.restore()}function l(a){b.selection.save(),g(a),b.selection.restore()}function m(a){if("indent"==a||"outdent"==a){for(var c=!1,d=b.selection.blocks(),e=[],f=0;f<d.length;f++)"LI"==d[f].tagName?(c=!0,e.push(d[f])):"LI"==d[f].parentNode.tagName&&(c=!0,e.push(d[f].parentNode));c&&("indent"==a?k(e):l(e))}}function n(){b.events.on("commands.after",m),b.events.on("keydown",function(c){if(c.which==a.FE.KEYCODE.TAB){for(var d=b.selection.blocks(),e=[],f=0;f<d.length;f++)"LI"==d[f].tagName?e.push(d[f]):"LI"==d[f].parentNode.tagName&&e.push(d[f].parentNode);if(e.length>1||e.length&&(b.selection.info(e[0]).atStart||b.node.isEmpty(e[0])))return c.preventDefault(),c.stopPropagation(),c.shiftKey?l(e):k(e),!1}},!0)}return{_init:n,format:i,refresh:j}},a.FE.RegisterCommand("formatUL",{title:"Unordered List",refresh:function(a){this.lists.refresh(a,"UL")},callback:function(){this.lists.format("UL")},plugin:"lists"}),a.FE.RegisterCommand("formatOL",{title:"Ordered List",refresh:function(a){this.lists.refresh(a,"OL")},callback:function(){this.lists.format("OL")},plugin:"lists"}),a.FE.DefineIcon("formatUL",{NAME:"list-ul"}),a.FE.DefineIcon("formatOL",{NAME:"list-ol"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{paragraphFormat:{N:"Normal",H1:"Heading 1",H2:"Heading 2",H3:"Heading 3",H4:"Heading 4",PRE:"Code"},paragraphFormatSelection:!1}),a.FE.PLUGINS.paragraphFormat=function(b){function c(c,d){var e=b.html.defaultTag();if(d&&d.toLowerCase()!=e)if(c.find("ul, ol").length>0){var f=a("<"+d+">");c.prepend(f);for(var g=b.node.contents(c.get(0))[0];g&&["UL","OL"].indexOf(g.tagName)<0;){var h=g.nextSibling;f.append(g),g=h}}else c.html("<"+d+">"+c.html()+"</"+d+">")}function d(c,d){var e=b.html.defaultTag();d||(d='div class="fr-temp-div" data-empty="true"'),d.toLowerCase()==e?c.replaceWith(c.html()):c.replaceWith(a("<"+d+">").html(c.html()))}function e(c,d){var e=b.html.defaultTag();d||(d='div class="fr-temp-div"'+(b.node.isEmpty(c.get(0),!0)?' data-empty="true"':"")),d.toLowerCase()==e?(b.node.isEmpty(c.get(0),!0)||c.append("<br/>"),c.replaceWith(c.html())):c.replaceWith(a("<"+d+">").html(c.html()))}function f(c,d){d||(d='div class="fr-temp-div"'+(b.node.isEmpty(c.get(0),!0)?' data-empty="true"':"")),c.replaceWith(a("<"+d+" "+b.node.attributes(c.get(0))+">").html(c.html()))}function g(g){"N"==g&&(g=b.html.defaultTag()),b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();var h=b.selection.blocks();b.selection.save(),b.$el.find("pre").attr("skip",!0);for(var i=0;i<h.length;i++)if(h[i].tagName!=g&&!b.node.isList(h[i])){var j=a(h[i]);"LI"==h[i].tagName?c(j,g):"LI"==h[i].parentNode.tagName&&h[i]?d(j,g):["TD","TH"].indexOf(h[i].parentNode.tagName)>=0?e(j,g):f(j,g)}b.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function(){a(this).prev().append("<br>"+a(this).html()),a(this).remove()}),b.$el.find("pre").removeAttr("skip"),b.html.unwrap(),b.selection.restore()}function h(a,c){var d=b.selection.blocks();if(d.length){var e=d[0],f="N",g=b.html.defaultTag();e.tagName.toLowerCase()!=g&&e!=b.el&&(f=e.tagName),c.find('.fr-command[data-param1="'+f+'"]').addClass("fr-active").attr("aria-selected",!0)}else c.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected",!0)}function i(a){if(b.opts.paragraphFormatSelection){var c=b.selection.blocks();if(c.length){var d=c[0],e="N",f=b.html.defaultTag();d.tagName.toLowerCase()!=f&&d!=b.el&&(e=d.tagName),["LI","TD","TH"].indexOf(e)>=0&&(e="N"),a.find("> span").text(b.opts.paragraphFormat[e])}else a.find("> span").text(b.opts.paragraphFormat.N)}}return{apply:g,refreshOnShow:h,refresh:i}},a.FE.RegisterCommand("paragraphFormat",{type:"dropdown",displaySelection:function(a){return a.opts.paragraphFormatSelection},defaultSelection:"Normal",displaySelectionWidth:100,html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.paragraphFormat;for(var c in b)if(b.hasOwnProperty(c)){var d=this.shortcuts.get("paragraphFormat."+c);d=d?'<span class="fr-shortcut">'+d+"</span>":"",a+='<li role="presentation"><'+("N"==c?this.html.defaultTag()||"DIV":c)+' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></"+("N"==c?this.html.defaultTag()||"DIV":c)+"></li>"}return a+="</ul>"},title:"Paragraph Format",callback:function(a,b){this.paragraphFormat.apply(b)},refresh:function(a){this.paragraphFormat.refresh(a)},refreshOnShow:function(a,b){this.paragraphFormat.refreshOnShow(a,b)},plugin:"paragraphFormat"}),a.FE.DefineIcon("paragraphFormat",{NAME:"paragraph"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{paragraphStyles:{"fr-text-gray":"Gray","fr-text-bordered":"Bordered","fr-text-spaced":"Spaced","fr-text-uppercase":"Uppercase"},paragraphMultipleStyles:!0}),a.FE.PLUGINS.paragraphStyle=function(b){function c(c,d,e){"undefined"==typeof d&&(d=b.opts.paragraphStyles),"undefined"==typeof e&&(e=b.opts.paragraphMultipleStyles);var f="";e||(f=Object.keys(d),f.splice(f.indexOf(c),1),f=f.join(" ")),b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();var g=b.selection.blocks();b.selection.save();for(var h=a(g[0]).hasClass(c),i=0;i<g.length;i++)a(g[i]).removeClass(f).toggleClass(c,!h),a(g[i]).hasClass("fr-temp-div")&&a(g[i]).removeClass("fr-temp-div"),""===a(g[i]).attr("class")&&a(g[i]).removeAttr("class");b.html.unwrap(),b.selection.restore()}function d(c,d){var e=b.selection.blocks();if(e.length){var f=a(e[0]);d.find(".fr-command").each(function(){var b=a(this).data("param1"),c=f.hasClass(b);a(this).toggleClass("fr-active",c).attr("aria-selected",c)})}}function e(){}return{_init:e,apply:c,refreshOnShow:d}},a.FE.RegisterCommand("paragraphStyle",{type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.paragraphStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><a class="fr-command '+c+'" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></li>");return a+="</ul>"},title:"Paragraph Style",callback:function(a,b){this.paragraphStyle.apply(b)},refreshOnShow:function(a,b){this.paragraphStyle.refreshOnShow(a,b)},plugin:"paragraphStyle"}),a.FE.DefineIcon("paragraphStyle",{NAME:"magic"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{quickInsertButtons:["image","table","ul","ol","hr"],quickInsertTags:["p","div","h1","h2","h3","h4","h5","h6","pre","blockquote"]}),a.FE.QUICK_INSERT_BUTTONS={image:{icon:"insertImage",callback:function(){var b=this;b.shared.$qi_image_input||(b.shared.$qi_image_input=a('<input accept="image/*" name="quickInsertImage'+this.id+'" style="display: none;" type="file">'),a("body").append(b.shared.$qi_image_input),b.events.$on(b.shared.$qi_image_input,"change",function(){var b=a(this).data("inst");this.files&&(b.quickInsert.hide(),b.image.upload(this.files)),a(this).val("")},!0)),b.$qi_image_input=b.shared.$qi_image_input,b.helpers.isMobile()&&b.selection.save(),b.$qi_image_input.data("inst",b).trigger("click")},requiredPlugin:"image",title:"Insert Image"},table:{icon:"insertTable",callback:function(){this.quickInsert.hide(),this.table.insert(2,2),this.undo.saveStep()},requiredPlugin:"table",title:"Insert Table"},ol:{icon:"formatOL",callback:function(){this.quickInsert.hide(),this.lists.format("OL"),this.undo.saveStep()},requiredPlugin:"lists",title:"Ordered List"},ul:{icon:"formatUL",callback:function(){this.quickInsert.hide(),this.lists.format("UL"),this.undo.saveStep()},requiredPlugin:"lists",title:"Unordered List"},hr:{icon:"insertHR",callback:function(){this.quickInsert.hide(),this.commands.insertHR(),this.undo.saveStep()},title:"Insert Horizontal Line"}},a.FE.DefineIcon("quickInsert",{PATH:'<path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/>',template:"svg"}),a.FE.RegisterQuickInsertCommand=function(b,c){a.FE.QUICK_INSERT_BUTTONS[b]=c},a.FE.PLUGINS.quickInsert=function(b){function c(c){var d,e,f;d=c.offset().top-b.$box.offset().top,e=0-k.outerWidth(),f=(k.outerHeight()-c.outerHeight())/2,b.opts.iframe&&(d+=b.$iframe.offset().top-a(b.o_win).scrollTop()),k.hasClass("fr-on")&&d>=0&&l.css("top",d-f),d>=0&&d-f<=b.$box.outerHeight()-c.outerHeight()?(k.hasClass("fr-hidden")&&(k.hasClass("fr-on")&&g(),k.removeClass("fr-hidden")),k.css("top",d-f)):k.hasClass("fr-visible")&&(k.addClass("fr-hidden"),h()),k.css("left",e)}function d(a){k||i(),k.hasClass("fr-on")&&h(),b.$box.append(k),c(a),k.data("tag",a),k.addClass("fr-visible")}function e(){if(b.core.hasFocus()){var c=b.selection.element();b.node.isBlock(c)||(c=b.node.blockParent(c)),c&&b.node.isEmpty(c)&&b.node.isElement(c.parentNode)?k&&k.data("tag").is(a(c))&&k.hasClass("fr-on")?h():b.selection.isCollapsed()&&d(a(c)):f()}}function f(){k&&(b.html.checkIfEmpty(),k.hasClass("fr-on")&&h(),k.removeClass("fr-visible fr-on"),k.css("left",-9999).css("top",-9999))}function g(c){if(c&&c.preventDefault(),k.hasClass("fr-on")&&!k.hasClass("fr-hidden"))h();else{if(!b.shared.$qi_helper){for(var d=b.opts.quickInsertButtons,e='<div class="fr-qi-helper">',f=0,g=0;g<d.length;g++){var i=a.FE.QUICK_INSERT_BUTTONS[d[g]];i&&(!i.requiredPlugin||a.FE.PLUGINS[i.requiredPlugin]&&b.opts.pluginsEnabled.indexOf(i.requiredPlugin)>=0)&&(e+='<a class="fr-btn fr-floating-btn" role="button" title="'+b.language.translate(i.title)+'" tabIndex="-1" data-cmd="'+d[g]+'" style="transition-delay: '+.025*f++ +'s;">'+b.icon.create(i.icon)+"</a>")}e+="</div>",b.shared.$qi_helper=a(e),b.tooltip.bind(b.shared.$qi_helper,".fr-qi-helper > a.fr-btn")}l=b.shared.$qi_helper,l.appendTo(b.$box),setTimeout(function(){l.css("top",parseFloat(k.css("top"))),l.css("left",parseFloat(k.css("left"))+k.outerWidth()),l.find("a").addClass("fr-size-1"),k.addClass("fr-on")},10)}}function h(){var a=b.$box.find(".fr-qi-helper");a.length&&(a.find("a").removeClass("fr-size-1"),a.css("left",-9999),k.hasClass("fr-hidden")||k.removeClass("fr-on"))}function i(){b.shared.$quick_insert||(b.shared.$quick_insert=a('<div class="fr-quick-insert"><a class="fr-floating-btn" role="button" tabIndex="-1" title="'+b.language.translate("Quick Insert")+'">'+b.icon.create("quickInsert")+"</a></div>")),k=b.shared.$quick_insert,b.tooltip.bind(b.$box,".fr-quick-insert > a.fr-floating-btn"),b.events.on("destroy",function(){k.removeClass("fr-on").appendTo(a("body")).css("left",-9999).css("top",-9999),l&&(h(),l.appendTo(a("body")))},!0),b.events.on("shared.destroy",function(){k.html("").removeData().remove(),k=null,l&&(l.html("").removeData().remove(),l=null)},!0),b.events.on("commands.before",f),b.events.on("commands.after",function(){b.popups.areVisible()||e()}),b.events.bindClick(b.$box,".fr-quick-insert > a",g),b.events.bindClick(b.$box,".fr-qi-helper > a.fr-btn",function(c){var d=a(c.currentTarget).data("cmd");a.FE.QUICK_INSERT_BUTTONS[d].callback.apply(b,[c.currentTarget])}),b.events.$on(b.$wp,"scroll",function(){k.hasClass("fr-visible")&&c(k.data("tag"))})}function j(){return!!b.$wp&&(b.opts.iframe&&b.$el.parent("html").find("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">'),b.popups.onShow("image.edit",f),b.events.on("mouseup",e),b.helpers.isMobile()&&b.events.$on(a(b.o_doc),"selectionchange",e),b.events.on("blur",f),b.events.on("keyup",e),void b.events.on("keydown",function(){setTimeout(function(){e()},0)}))}var k,l;return{_init:j,hide:f}}});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.FE.PLUGINS.quote=function(b){function c(a){for(;a.parentNode&&a.parentNode!=b.el;)a=a.parentNode;return a}function d(){var d,e=b.selection.blocks();for(d=0;d<e.length;d++)e[d]=c(e[d]);b.selection.save();var f=a("<blockquote>");for(f.insertBefore(e[0]),d=0;d<e.length;d++)f.append(e[d]);b.html.unwrap(),b.selection.restore()}function e(){var c,d=b.selection.blocks();for(c=0;c<d.length;c++)"BLOCKQUOTE"!=d[c].tagName&&(d[c]=a(d[c]).parentsUntil(b.$el,"BLOCKQUOTE").get(0));for(b.selection.save(),c=0;c<d.length;c++)d[c]&&a(d[c]).replaceWith(d[c].innerHTML);b.html.unwrap(),b.selection.restore()}function f(a){b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore(),"increase"==a?d():"decrease"==a&&e()}return{apply:f}},a.FE.RegisterShortcut(a.FE.KEYCODE.SINGLE_QUOTE,"quote","increase","'"),a.FE.RegisterShortcut(a.FE.KEYCODE.SINGLE_QUOTE,"quote","decrease","'",!0),a.FE.RegisterCommand("quote",{title:"Quote",type:"dropdown",options:{increase:"Increase",decrease:"Decrease"},callback:function(a,b){this.quote.apply(b)},plugin:"quote"}),a.FE.DefineIcon("quote",{NAME:"quote-left"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{saveInterval:1e4,saveURL:null,saveParams:{},saveParam:"body",saveMethod:"POST"}),a.FE.PLUGINS.save=function(b){function c(a,c){b.events.trigger("save.error",[{code:a,message:n[a]},c])}function d(d){if("undefined"==typeof d&&(d=b.html.get()),b.events.trigger("save.before")===!1)return!1;if(b.opts.saveURL){var e={};for(var f in b.opts.saveParams)if(b.opts.saveParams.hasOwnProperty(f)){var g=b.opts.saveParams[f];"function"==typeof g?e[f]=g.call(this):e[f]=g}var h={};h[b.opts.saveParam]=d,a.ajax({type:b.opts.saveMethod,url:b.opts.saveURL,data:a.extend(h,e),crossDomain:b.opts.requestWithCORS,xhrFields:{withCredentials:b.opts.requestWithCredentials},headers:b.opts.requestHeaders}).done(function(a){j=d,b.events.trigger("save.after",[a])}).fail(function(a){c(m,a.response||a.responseText)})}else c(l)}function e(){clearTimeout(i),i=setTimeout(function(){var a=b.html.get();(j!=a||k)&&(j=a,k=!1,d(a))},b.opts.saveInterval)}function f(){e(),k=!1}function g(){k=!0}function h(){b.opts.saveInterval&&(j=b.html.get(),b.events.on("contentChanged",e),b.events.on("keydown destroy",function(){clearTimeout(i)}))}var i=null,j=null,k=!1,l=1,m=2,n={};return n[l]="Missing saveURL option.",n[m]="Something went wrong during save.",{_init:h,save:d,reset:f,force:g}},a.FE.DefineIcon("save",{NAME:"floppy-o"}),a.FE.RegisterCommand("save",{title:"Save",undo:!1,focus:!1,refreshAfterCallback:!1,callback:function(){this.save.save()},plugin:"save"})});
/*!
 * froala_editor v2.4.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){a.extend(a.FE.POPUP_TEMPLATES,{"table.insert":"[_BUTTONS_][_ROWS_COLUMNS_]","table.edit":"[_BUTTONS_]","table.colors":"[_BUTTONS_][_COLORS_]"}),a.extend(a.FE.DEFAULTS,{tableInsertMaxSize:10,tableEditButtons:["tableHeader","tableRemove","|","tableRows","tableColumns","tableStyle","-","tableCells","tableCellBackground","tableCellVerticalAlign","tableCellHorizontalAlign","tableCellStyle"],tableInsertButtons:["tableBack","|"],tableResizer:!0,tableResizerOffset:5,tableResizingLimit:30,tableColorsButtons:["tableBack","|"],tableColors:["#61BD6D","#1ABC9C","#54ACD2","#2C82C9","#9365B8","#475577","#CCCCCC","#41A85F","#00A885","#3D8EB9","#2969B0","#553982","#28324E","#000000","#F7DA64","#FBA026","#EB6B56","#E25041","#A38F84","#EFEFEF","#FFFFFF","#FAC51C","#F37934","#D14841","#B8312F","#7C706B","#D1D5D8","REMOVE"],tableColorsStep:7,tableCellStyles:{"fr-highlighted":"Highlighted","fr-thick":"Thick"},tableStyles:{"fr-dashed-borders":"Dashed Borders","fr-alternate-rows":"Alternate Rows"},tableCellMultipleStyles:!0,tableMultipleStyles:!0,tableInsertHelper:!0,tableInsertHelperOffset:15}),a.FE.PLUGINS.table=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="insertTable"]'),c=b.popups.get("table.insert");if(c||(c=g()),!c.hasClass("fr-active")){b.popups.refresh("table.insert"),b.popups.setContainer("table.insert",b.$tb);var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("table.insert",d,e,a.outerHeight())}}function d(){var c=I();if(c){var d=b.popups.get("table.edit");d||(d=k()),b.popups.setContainer("table.edit",a(b.opts.scrollableContainer));var e=P(c),f=(e.left+e.right)/2,g=e.bottom;b.popups.show("table.edit",f,g,e.bottom-e.top),b.edit.isDisabled()&&(b.toolbar.disable(),b.$el.removeClass("fr-no-selection"),b.edit.on(),b.button.bulkRefresh()),b.selection.setAtEnd(b.$el.find(".fr-selected-cell:last").get(0)),b.$el.focus(),b.selection.restore()}}function e(){var c=I();if(c){var d=b.popups.get("table.colors");d||(d=l()),b.popups.setContainer("table.colors",a(b.opts.scrollableContainer));var e=P(c),f=(e.left+e.right)/2,g=e.bottom;o(),b.popups.show("table.colors",f,g,e.bottom-e.top)}}function f(){0===ra().length&&b.toolbar.enable()}function g(c){if(c)return b.popups.onHide("table.insert",function(){b.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter")}),!0;var d="";b.opts.tableInsertButtons.length>0&&(d='<div class="fr-buttons">'+b.button.buildList(b.opts.tableInsertButtons)+"</div>");var e={buttons:d,rows_columns:i()},f=b.popups.create("table.insert",e);return b.events.$on(f,"mouseenter",".fr-table-size .fr-select-table-size .fr-table-cell",function(b){h(a(b.currentTarget))},!0),j(f),f}function h(a){var c=a.data("row"),d=a.data("col"),e=a.parent();e.siblings(".fr-table-size-info").html(c+" &times; "+d),e.find("> span").removeClass("hover fr-active-item");for(var f=1;f<=b.opts.tableInsertMaxSize;f++)for(var g=0;g<=b.opts.tableInsertMaxSize;g++){var h=e.find('> span[data-row="'+f+'"][data-col="'+g+'"]');f<=c&&g<=d?h.addClass("hover"):f<=c+1||f<=2&&!b.helpers.isMobile()?h.css("display","inline-block"):f>2&&!b.helpers.isMobile()&&h.css("display","none")}a.addClass("fr-active-item")}function i(){for(var a='<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">',c=1;c<=b.opts.tableInsertMaxSize;c++){for(var d=1;d<=b.opts.tableInsertMaxSize;d++){var e="inline-block";c>2&&!b.helpers.isMobile()&&(e="none");var f="fr-table-cell ";1==c&&1==d&&(f+=" hover"),a+='<span class="fr-command '+f+'" tabIndex="-1" data-cmd="tableInsert" data-row="'+c+'" data-col="'+d+'" data-param1="'+c+'" data-param2="'+d+'" style="display: '+e+';" role="button"><span></span><span class="fr-sr-only">'+c+" &times; "+d+"&nbsp;&nbsp;&nbsp;</span></span>"}a+='<div class="new-line"></div>'}return a+="</div></div>"}function j(c){b.events.$on(c,"focus","[tabIndex]",function(b){var c=a(b.currentTarget);h(c)}),b.events.on("popup.tab",function(c){var d=a(c.currentTarget);if(!b.popups.isVisible("table.insert")||!d.is("span, a"))return!0;var e,f=c.which;if(a.FE.KEYCODE.ARROW_UP==f||a.FE.KEYCODE.ARROW_DOWN==f||a.FE.KEYCODE.ARROW_LEFT==f||a.FE.KEYCODE.ARROW_RIGHT==f){if(d.is("span.fr-table-cell")){var g=d.parent().find("span.fr-table-cell"),i=g.index(d),j=b.opts.tableInsertMaxSize,k=i%j,l=Math.floor(i/j);a.FE.KEYCODE.ARROW_UP==f?l=Math.max(0,l-1):a.FE.KEYCODE.ARROW_DOWN==f?l=Math.min(b.opts.tableInsertMaxSize-1,l+1):a.FE.KEYCODE.ARROW_LEFT==f?k=Math.max(0,k-1):a.FE.KEYCODE.ARROW_RIGHT==f&&(k=Math.min(b.opts.tableInsertMaxSize-1,k+1));var m=l*j+k,n=a(g.get(m));h(n),b.events.disableBlur(),n.focus(),e=!1}}else a.FE.KEYCODE.ENTER==f&&(b.button.exec(d),e=!1);return e===!1&&(c.preventDefault(),c.stopPropagation()),e},!0)}function k(a){if(a)return b.popups.onHide("table.edit",f),!0;var c="";b.opts.tableEditButtons.length>0&&(c='<div class="fr-buttons">'+b.button.buildList(b.opts.tableEditButtons)+"</div>");var e={buttons:c},g=b.popups.create("table.edit",e);return b.events.$on(b.$wp,"scroll.table-edit",function(){b.popups.isVisible("table.edit")&&d()}),g}function l(){var a="";b.opts.tableColorsButtons.length>0&&(a='<div class="fr-buttons fr-table-colors-buttons">'+b.button.buildList(b.opts.tableColorsButtons)+"</div>");var c={buttons:a,colors:m()},d=b.popups.create("table.colors",c);return b.events.$on(b.$wp,"scroll.table-colors",function(){b.popups.isVisible("table.colors")&&e()}),n(d),d}function m(){for(var a='<div class="fr-table-colors">',c=0;c<b.opts.tableColors.length;c++)0!==c&&c%b.opts.tableColorsStep===0&&(a+="<br>"),a+="REMOVE"!=b.opts.tableColors[c]?'<span class="fr-command" style="background: '+b.opts.tableColors[c]+';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="'+b.opts.tableColors[c]+'"><span class="fr-sr-only">'+b.language.translate("Color")+" "+b.opts.tableColors[c]+"&nbsp;&nbsp;&nbsp;</span></span>":'<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="'+b.language.translate("Clear Formatting")+'"><i class="fa fa-eraser"></i><span class="fr-sr-only">'+b.language.translate("Clear Formatting")+"</span></span>";return a+="</div>"}function n(c){b.events.on("popup.tab",function(d){var e=a(d.currentTarget);if(!b.popups.isVisible("table.colors")||!e.is("span"))return!0;var f=d.which,g=!0;if(a.FE.KEYCODE.TAB==f){var h=c.find(".fr-buttons");g=!b.accessibility.focusToolbar(h,!!d.shiftKey)}else if(a.FE.KEYCODE.ARROW_UP==f||a.FE.KEYCODE.ARROW_DOWN==f||a.FE.KEYCODE.ARROW_LEFT==f||a.FE.KEYCODE.ARROW_RIGHT==f){var i=e.parent().find("span.fr-command"),j=i.index(e),k=b.opts.colorsStep,l=Math.floor(i.length/k),m=j%k,n=Math.floor(j/k),o=n*k+m,p=l*k;a.FE.KEYCODE.ARROW_UP==f?o=((o-k)%p+p)%p:a.FE.KEYCODE.ARROW_DOWN==f?o=(o+k)%p:a.FE.KEYCODE.ARROW_LEFT==f?o=((o-1)%p+p)%p:a.FE.KEYCODE.ARROW_RIGHT==f&&(o=(o+1)%p);var q=a(i.get(o));b.events.disableBlur(),q.focus(),g=!1}else a.FE.KEYCODE.ENTER==f&&(b.button.exec(e),g=!1);return g===!1&&(d.preventDefault(),d.stopPropagation()),g},!0)}function o(){var a=b.popups.get("table.colors"),c=b.$el.find(".fr-selected-cell:first");a.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"),a.find('span[data-param1="'+b.helpers.RGBToHex(c.css("background-color"))+'"]').addClass("fr-selected-color fr-active-item")}function p(c,d){var e,f,g='<table style="width: 100%;"><tbody>',h=100/d;for(e=0;e<c;e++){for(g+="<tr>",f=0;f<d;f++)g+='<td style="width: '+h.toFixed(4)+'%;">',0===e&&0===f&&(g+=a.FE.MARKERS),g+="<br></td>";g+="</tr>"}g+="</tbody></table>",b.html.insert(g),b.selection.restore()}function q(){if(ra().length>0){var a=sa();b.selection.setBefore(a.get(0))||b.selection.setAfter(a.get(0)),b.selection.restore(),b.popups.hide("table.edit"),a.remove(),b.toolbar.enable()}}function r(){var b=sa();if(b.length>0&&0===b.find("th").length){var c,e="<thead><tr>",f=0;for(b.find("tr:first > td").each(function(){var b=a(this);f+=parseInt(b.attr("colspan"),10)||1}),c=0;c<f;c++)e+="<th><br></th>";e+="</tr></thead>",b.prepend(e),d()}}function s(){var a=sa(),c=a.find("thead");if(c.length>0)if(0===a.find("tbody tr").length)q();else if(c.remove(),ra().length>0)d();else{b.popups.hide("table.edit");var e=a.find("tbody tr:first td:first").get(0);e&&(b.selection.setAtEnd(e),b.selection.restore())}}function t(c){var e=sa();if(e.length>0){if(b.$el.find("th.fr-selected-cell").length>0&&"above"==c)return;var f,g,h=I(),i=N(h);g="above"==c?i.min_i:i.max_i;var j="<tr>";for(f=0;f<h[g].length;f++)if("below"==c&&g<h.length-1&&h[g][f]==h[g+1][f]||"above"==c&&g>0&&h[g][f]==h[g-1][f]){if(0===f||f>0&&h[g][f]!=h[g][f-1]){var k=a(h[g][f]);k.attr("rowspan",parseInt(k.attr("rowspan"),10)+1)}}else j+="<td><br></td>";j+="</tr>";var l=a(e.find("tr").not(e.find("table tr")).get(g));"below"==c?l.after(j):"above"==c&&(l.before(j),b.popups.isVisible("table.edit")&&d())}}function u(){var c=sa();if(c.length>0){var d,e,f,g=I(),h=N(g);if(0===h.min_i&&h.max_i==g.length-1)q();else{for(d=h.max_i;d>=h.min_i;d--){for(f=a(c.find("tr").not(c.find("table tr")).get(d)),e=0;e<g[d].length;e++)if(0===e||g[d][e]!=g[d][e-1]){var i=a(g[d][e]);if(parseInt(i.attr("rowspan"),10)>1){var j=parseInt(i.attr("rowspan"),10)-1;1==j?i.removeAttr("rowspan"):i.attr("rowspan",j)}if(d<g.length-1&&g[d][e]==g[d+1][e]&&(0===d||g[d][e]!=g[d-1][e])){for(var k=g[d][e],l=e;l>0&&g[d][l]==g[d][l-1];)l--;0===l?a(c.find("tr").not(c.find("table tr")).get(d+1)).prepend(k):a(g[d+1][l-1]).after(k)}}var m=f.parent();f.remove(),0===m.find("tr").length&&m.remove(),g=I(c)}A(0,g.length-1,0,g[0].length-1,c),h.min_i>0?b.selection.setAtEnd(g[h.min_i-1][0]):b.selection.setAtEnd(g[0][0]),b.selection.restore(),b.popups.hide("table.edit")}}}function v(c){var e=sa();if(e.length>0){var f,g=I(),h=N(g);f="before"==c?h.min_j:h.max_j;var i,j=100/g[0].length,k=100/(g[0].length+1);e.find("th, td").each(function(){i=a(this),i.data("old-width",i.outerWidth()/e.outerWidth()*100)}),e.find("tr").not(e.find("table tr")).each(function(b){for(var d,e=a(this),h=0,i=0;h-1<f;){if(d=e.find("> th, > td").get(i),!d){d=null;break}d==g[b][h]?(h+=parseInt(a(d).attr("colspan"),10)||1,i++):(h+=parseInt(a(g[b][h]).attr("colspan"),10)||1,"after"==c&&(d=0===i?-1:e.find("> th, > td").get(i-1)))}var l=a(d);if("after"==c&&h-1>f||"before"==c&&f>0&&g[b][f]==g[b][f-1]){if(0===b||b>0&&g[b][f]!=g[b-1][f]){var m=parseInt(l.attr("colspan"),10)+1;l.attr("colspan",m),l.css("width",(l.data("old-width")*k/j+k).toFixed(4)+"%"),l.removeData("old-width")}}else{var n;n=e.find("th").length>0?'<th style="width: '+k.toFixed(4)+'%;"><br></th>':'<td style="width: '+k.toFixed(4)+'%;"><br></td>',d==-1?e.prepend(n):null==d?e.append(n):"before"==c?l.before(n):"after"==c&&l.after(n)}}),e.find("th, td").each(function(){i=a(this),i.data("old-width")&&(i.css("width",(i.data("old-width")*k/j).toFixed(4)+"%"),i.removeData("old-width"))}),b.popups.isVisible("table.edit")&&d()}}function w(){var c=sa();if(c.length>0){var d,e,f,g=I(),h=N(g);if(0===h.min_j&&h.max_j==g[0].length-1)q();else{var i=100/g[0].length,j=100/(g[0].length-h.max_j+h.min_j-1);for(c.find("th, td").each(function(){f=a(this),f.hasClass("fr-selected-cell")||f.data("old-width",f.outerWidth()/c.outerWidth()*100)}),e=h.max_j;e>=h.min_j;e--)for(d=0;d<g.length;d++)if(0===d||g[d][e]!=g[d-1][e])if(f=a(g[d][e]),(parseInt(f.attr("colspan"),10)||1)>1){var k=parseInt(f.attr("colspan"),10)-1;1==k?f.removeAttr("colspan"):f.attr("colspan",k),f.css("width",((f.data("old-width")-ja(e,g))*j/i).toFixed(4)+"%"),f.removeData("old-width")}else{var l=a(f.parent().get(0));f.remove(),0===l.find("> th, > td").length&&(0===l.prev().length||0===l.next().length||l.prev().find("> th[rowspan], > td[rowspan]").length<l.prev().find("> th, > td").length)&&l.remove()}A(0,g.length-1,0,g[0].length-1,c),h.min_j>0?b.selection.setAtEnd(g[h.min_i][h.min_j-1]):b.selection.setAtEnd(g[h.min_i][0]),b.selection.restore(),b.popups.hide("table.edit"),c.find("th, td").each(function(){f=a(this),f.data("old-width")&&(f.css("width",(f.data("old-width")*j/i).toFixed(4)+"%"),f.removeData("old-width"))})}}}function x(a,b,c){var d,e,f,g,h,i=0,j=I(c);for(b=Math.min(b,j[0].length-1),e=a;e<=b;e++)if(!(e>a&&j[0][e]==j[0][e-1])&&(g=parseInt(j[0][e].getAttribute("colspan"),10)||1,g>1&&j[0][e]==j[0][e+1]))for(i=g-1,d=1;d<j.length;d++)if(j[d][e]!=j[d-1][e]){for(f=e;f<e+g;f++)if(h=parseInt(j[d][f].getAttribute("colspan"),10)||1,h>1&&j[d][f]==j[d][f+1])i=Math.min(i,h-1),f+=i;else if(i=Math.max(0,i-1),!i)break;if(!i)break}i&&z(j,i,"colspan",0,j.length-1,a,b)}function y(a,b,c){var d,e,f,g,h,i=0,j=I(c);for(b=Math.min(b,j.length-1),d=a;d<=b;d++)if(!(d>a&&j[d][0]==j[d-1][0])&&(g=parseInt(j[d][0].getAttribute("rowspan"),10)||1,g>1&&j[d][0]==j[d+1][0]))for(i=g-1,e=1;e<j[0].length;e++)if(j[d][e]!=j[d][e-1]){for(f=d;f<d+g;f++)if(h=parseInt(j[f][e].getAttribute("rowspan"),10)||1,h>1&&j[f][e]==j[f+1][e])i=Math.min(i,h-1),f+=i;else if(i=Math.max(0,i-1),!i)break;if(!i)break}i&&z(j,i,"rowspan",a,b,0,j[0].length-1)}function z(a,b,c,d,e,f,g){var h,i,j;for(h=d;h<=e;h++)for(i=f;i<=g;i++)h>d&&a[h][i]==a[h-1][i]||i>f&&a[h][i]==a[h][i-1]||(j=parseInt(a[h][i].getAttribute(c),10)||1,j>1&&(j-b>1?a[h][i].setAttribute(c,j-b):a[h][i].removeAttribute(c)))}function A(a,b,c,d,e){y(a,b,e),x(c,d,e)}function B(){if(ra().length>1&&(0===b.$el.find("th.fr-selected-cell").length||0===b.$el.find("td.fr-selected-cell").length)){var c,e,f=I(),g=N(f),h=b.$el.find(".fr-selected-cell"),i=a(h[0]),j=i.parent(),k=j.find(".fr-selected-cell"),l=i.closest("table"),m=i.html(),n=0;for(c=0;c<k.length;c++)n+=a(k[c]).outerWidth();for(i.css("width",(n/l.outerWidth()*100).toFixed(4)+"%"),g.min_j<g.max_j&&i.attr("colspan",g.max_j-g.min_j+1),g.min_i<g.max_i&&i.attr("rowspan",g.max_i-g.min_i+1),c=1;c<h.length;c++)e=a(h[c]),"<br>"!=e.html()&&""!==e.html()&&(m+="<br>"+e.html()),e.remove();i.html(m),b.selection.setAtEnd(i.get(0)),b.selection.restore(),b.toolbar.enable(),y(g.min_i,g.max_i,l);var o=l.find("tr:empty");for(c=o.length-1;c>=0;c--)a(o[c]).remove();x(g.min_j,g.max_j,l),d()}}function C(){if(1==ra().length){var c=b.$el.find(".fr-selected-cell"),d=c.parent(),e=c.closest("table"),f=parseInt(c.attr("rowspan"),10),g=I(),h=J(c.get(0),g),i=c.clone().html("<br>");if(f>1){var j=Math.ceil(f/2);j>1?c.attr("rowspan",j):c.removeAttr("rowspan"),f-j>1?i.attr("rowspan",f-j):i.removeAttr("rowspan");for(var k=h.row+j,l=0===h.col?h.col:h.col-1;l>=0&&(g[k][l]==g[k][l-1]||k>0&&g[k][l]==g[k-1][l]);)l--;l==-1?a(e.find("tr").not(e.find("table tr")).get(k)).prepend(i):a(g[k][l]).after(i)}else{var m,n=a("<tr>").append(i);for(m=0;m<g[0].length;m++)if(0===m||g[h.row][m]!=g[h.row][m-1]){var o=a(g[h.row][m]);o.is(c)||o.attr("rowspan",(parseInt(o.attr("rowspan"),10)||1)+1)}d.after(n)}L(),b.popups.hide("table.edit")}}function D(){if(1==ra().length){var c=b.$el.find(".fr-selected-cell"),d=parseInt(c.attr("colspan"),10)||1,e=c.parent().outerWidth(),f=c.outerWidth(),g=c.clone().html("<br>"),h=I(),i=J(c.get(0),h);if(d>1){var j=Math.ceil(d/2);f=ka(i.col,i.col+j-1,h)/e*100;var k=ka(i.col+j,i.col+d-1,h)/e*100;j>1?c.attr("colspan",j):c.removeAttr("colspan"),d-j>1?g.attr("colspan",d-j):g.removeAttr("colspan"),c.css("width",f.toFixed(4)+"%"),g.css("width",k.toFixed(4)+"%")}else{var l;for(l=0;l<h.length;l++)if(0===l||h[l][i.col]!=h[l-1][i.col]){var m=a(h[l][i.col]);if(!m.is(c)){var n=(parseInt(m.attr("colspan"),10)||1)+1;m.attr("colspan",n)}}f=f/e*100/2,c.css("width",f.toFixed(4)+"%"),g.css("width",f.toFixed(4)+"%")}c.after(g),L(),b.popups.hide("table.edit")}}function E(a){"REMOVE"!=a?b.$el.find(".fr-selected-cell").css("background-color",b.helpers.HEXtoRGB(a)):b.$el.find(".fr-selected-cell").css("background-color","")}function F(a){b.$el.find(".fr-selected-cell").css("vertical-align",a)}function G(a){b.$el.find(".fr-selected-cell").css("text-align",a)}function H(a,b,c,d){if(b.length>0){if(!c){var e=Object.keys(d);e.splice(e.indexOf(a),1),b.removeClass(e.join(" "))}b.toggleClass(a)}}function I(b){b=b||null;var c=[];if(null==b&&ra().length>0&&(b=sa()),b)return b.find("tr").not(b.find("table tr")).each(function(b,d){var e=a(d),f=0;e.find("> th, > td").each(function(d,e){for(var g=a(e),h=parseInt(g.attr("colspan"),10)||1,i=parseInt(g.attr("rowspan"),10)||1,j=b;j<b+i;j++)for(var k=f;k<f+h;k++)c[j]||(c[j]=[]),c[j][k]?f++:c[j][k]=e;f+=h})}),c}function J(a,b){for(var c=0;c<b.length;c++)for(var d=0;d<b[c].length;d++)if(b[c][d]==a)return{row:c,col:d}}function K(a,b,c){for(var d=a+1,e=b+1;d<c.length;){if(c[d][b]!=c[a][b]){d--;break}d++}for(d==c.length&&d--;e<c[a].length;){if(c[a][e]!=c[a][b]){e--;break}e++}return e==c[a].length&&e--,{row:d,col:e}}function L(){var c=b.$el.find(".fr-selected-cell");c.length>0&&c.each(function(){var b=a(this);b.removeClass("fr-selected-cell"),""===b.attr("class")&&b.removeAttr("class")}),b.el.querySelector(".fr-cell-fixed")&&(b.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"),b.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler"))}function M(){setTimeout(function(){b.selection.clear(),b.$el.addClass("fr-no-selection"),b.$el.blur()},0)}function N(a){var c=b.$el.find(".fr-selected-cell");if(c.length>0){var d,e=a.length,f=0,g=a[0].length,h=0;for(d=0;d<c.length;d++){var i=J(c[d],a),j=K(i.row,i.col,a);e=Math.min(i.row,e),f=Math.max(j.row,f),g=Math.min(i.col,g),h=Math.max(j.col,h)}return{min_i:e,max_i:f,min_j:g,max_j:h}}return null}function O(b,c,d,e,f){var g,h,i,j,k=b,l=c,m=d,n=e;for(g=k;g<=l;g++)((parseInt(a(f[g][m]).attr("rowspan"),10)||1)>1||(parseInt(a(f[g][m]).attr("colspan"),10)||1)>1)&&(i=J(f[g][m],f),j=K(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n)),((parseInt(a(f[g][n]).attr("rowspan"),10)||1)>1||(parseInt(a(f[g][n]).attr("colspan"),10)||1)>1)&&(i=J(f[g][n],f),j=K(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n));for(h=m;h<=n;h++)((parseInt(a(f[k][h]).attr("rowspan"),10)||1)>1||(parseInt(a(f[k][h]).attr("colspan"),10)||1)>1)&&(i=J(f[k][h],f),j=K(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n)),((parseInt(a(f[l][h]).attr("rowspan"),10)||1)>1||(parseInt(a(f[l][h]).attr("colspan"),10)||1)>1)&&(i=J(f[l][h],f),j=K(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n));return k==b&&l==c&&m==d&&n==e?{min_i:b,max_i:c,min_j:d,max_j:e}:O(k,l,m,n,f)}function P(b){var c=N(b),d=a(b[c.min_i][c.min_j]),e=a(b[c.min_i][c.max_j]),f=a(b[c.max_i][c.min_j]),g=d.offset().left,h=e.offset().left+e.outerWidth(),i=d.offset().top,j=f.offset().top+f.outerHeight();return{left:g,right:h,top:i,bottom:j}}function Q(c,d){if(a(c).is(d))L(),b.edit.on(),a(c).addClass("fr-selected-cell");else{M(),b.edit.off();var e=I(),f=J(c,e),g=J(d,e),h=O(Math.min(f.row,g.row),Math.max(f.row,g.row),Math.min(f.col,g.col),Math.max(f.col,g.col),e);L(),c.classList.add("fr-cell-fixed"),d.classList.add("fr-cell-handler");for(var i=h.min_i;i<=h.max_i;i++)for(var j=h.min_j;j<=h.max_j;j++)a(e[i][j]).addClass("fr-selected-cell")}}function R(c){var d=null,e=a(c.target);return"TD"==c.target.tagName||"TH"==c.target.tagName?d=c.target:e.closest("td").length>0?d=e.closest("td").get(0):e.closest("th").length>0&&(d=e.closest("th").get(0)),0===b.$el.find(d).length?null:d}function S(){L(),b.popups.hide("table.edit")}function T(c){var d=R(c);if(ra().length>0&&!d&&S(),!b.edit.isDisabled()||b.popups.isVisible("table.edit"))if(1!=c.which||1==c.which&&b.helpers.isMac()&&c.ctrlKey)(3==c.which||1==c.which&&b.helpers.isMac()&&c.ctrlKey)&&d&&S();else if(za=!0,d){ra().length>0&&!c.shiftKey&&S(),c.stopPropagation(),b.events.trigger("image.hideResizer"),b.events.trigger("video.hideResizer"),ya=!0;var e=d.tagName.toLowerCase();c.shiftKey&&b.$el.find(e+".fr-selected-cell").length>0?a(b.$el.find(e+".fr-selected-cell").closest("table")).is(a(d).closest("table"))?Q(Aa,d):M():((b.keys.ctrlKey(c)||c.shiftKey)&&(ra().length>1||0===a(d).find(b.selection.element()).length&&!a(d).is(b.selection.element()))&&M(),Aa=d,Q(Aa,Aa))}}function U(c){if(ya||b.$tb.is(c.target)||b.$tb.is(a(c.target).closest(b.$tb.get(0)))||(ra().length>0&&b.toolbar.enable(),L()),!(1!=c.which||1==c.which&&b.helpers.isMac()&&c.ctrlKey)){if(za=!1,ya){ya=!1;var e=R(c);e||1!=ra().length?ra().length>0&&(b.selection.isCollapsed()?d():L()):L()}if(Ca){Ca=!1,wa.removeClass("fr-moving"),b.$el.removeClass("fr-no-selection"),b.edit.on();var f=parseFloat(wa.css("left"))+b.opts.tableResizerOffset;b.opts.iframe&&(f-=b.$iframe.offset().left),wa.data("release-position",f),wa.removeData("max-left"),wa.removeData("max-right"),ia(c),aa()}}}function V(c){if(ya===!0){var d=a(c.currentTarget);if(d.closest("table").is(sa())){if("TD"==c.currentTarget.tagName&&0===b.$el.find("th.fr-selected-cell").length)return void Q(Aa,c.currentTarget);if("TH"==c.currentTarget.tagName&&0===b.$el.find("td.fr-selected-cell").length)return void Q(Aa,c.currentTarget)}M()}}function W(c,d){for(var e=c;e&&"TABLE"!=e.tagName&&e.parentNode!=b.el;)e=e.parentNode;if(e&&"TABLE"==e.tagName){var f=I(a(e));"up"==d?Y(J(c,f),e,f):"down"==d&&Z(J(c,f),e,f)}}function X(a,c,d,e){for(var f,g=c;g!=b.el&&"TD"!=g.tagName&&"TH"!=g.tagName&&("up"==e?f=g.previousElementSibling:"down"==e&&(f=g.nextElementSibling),!f);)g=g.parentNode;"TD"==g.tagName||"TH"==g.tagName?W(g,e):f&&("up"==e&&b.selection.setAtEnd(f),"down"==e&&b.selection.setAtStart(f))}function Y(a,c,d){a.row>0?b.selection.setAtEnd(d[a.row-1][a.col]):X(a,c,d,"up")}function Z(a,c,d){var e=parseInt(d[a.row][a.col].getAttribute("rowspan"),10)||1;a.row<d.length-e?b.selection.setAtStart(d[a.row+e][a.col]):X(a,c,d,"down")}function $(c){var d=c.which,e=b.selection.blocks();if(e.length&&(e=e[0],"TD"==e.tagName||"TH"==e.tagName)){for(var f=e;f&&"TABLE"!=f.tagName&&f.parentNode!=b.el;)f=f.parentNode;if(f&&"TABLE"==f.tagName&&(a.FE.KEYCODE.ARROW_LEFT==d||a.FE.KEYCODE.ARROW_UP==d||a.FE.KEYCODE.ARROW_RIGHT==d||a.FE.KEYCODE.ARROW_DOWN==d)&&(ra().length>0&&S(),b.browser.webkit&&(a.FE.KEYCODE.ARROW_UP==d||a.FE.KEYCODE.ARROW_DOWN==d))){var g=b.selection.ranges(0).startContainer;if(g.nodeType==Node.TEXT_NODE&&(a.FE.KEYCODE.ARROW_UP==d&&g.previousSibling||a.FE.KEYCODE.ARROW_DOWN==d&&g.nextSibling))return;c.preventDefault(),c.stopPropagation();var h=I(a(f)),i=J(e,h);return a.FE.KEYCODE.ARROW_UP==d?Y(i,f,h):a.FE.KEYCODE.ARROW_DOWN==d&&Z(i,f,h),b.selection.restore(),!1}}}function _(){b.shared.$table_resizer||(b.shared.$table_resizer=a('<div class="fr-table-resizer"><div></div></div>')),wa=b.shared.$table_resizer,b.events.$on(wa,"mousedown",function(a){return!b.core.sameInstance(wa)||(ra().length>0&&S(),1==a.which?(b.selection.save(),Ca=!0,wa.addClass("fr-moving"),M(),b.edit.off(),wa.find("div").css("opacity",1),!1):void 0)}),b.events.$on(wa,"mousemove",function(a){return!b.core.sameInstance(wa)||void(Ca&&(b.opts.iframe&&(a.pageX-=b.$iframe.offset().left),la(a)))}),b.events.on("shared.destroy",function(){wa.html("").removeData().remove(),wa=null},!0),b.events.on("destroy",function(){b.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"),wa.hide().appendTo(a("body"))},!0)}function aa(){wa&&(wa.find("div").css("opacity",0),wa.css("top",0),wa.css("left",0),wa.css("height",0),wa.find("div").css("height",0),wa.hide())}function ba(){xa&&xa.removeClass("fr-visible").css("left","-9999px")}function ca(c,d){var e=a(d),f=e.closest("table"),g=f.parent();if(d&&"TD"!=d.tagName&&"TH"!=d.tagName&&(e.closest("td").length>0?d=e.closest("td"):e.closest("th").length>0&&(d=e.closest("th"))),!d||"TD"!=d.tagName&&"TH"!=d.tagName)wa&&e.get(0)!=wa.get(0)&&e.parent().get(0)!=wa.get(0)&&b.core.sameInstance(wa)&&aa();else{if(e=a(d),0===b.$el.find(e).length)return!1;var h=e.offset().left-1,i=h+e.outerWidth();if(Math.abs(c.pageX-h)<=b.opts.tableResizerOffset||Math.abs(i-c.pageX)<=b.opts.tableResizerOffset){var j,k,l,m,n,o=I(f),p=J(d,o),q=K(p.row,p.col,o),r=f.offset().top,s=f.outerHeight()-1;"rtl"!=b.opts.direction?c.pageX-h<=b.opts.tableResizerOffset?(l=h,p.col>0?(m=h-ja(p.col-1,o)+b.opts.tableResizingLimit,n=h+ja(p.col,o)-b.opts.tableResizingLimit,j=p.col-1,k=p.col):(j=null,k=0,m=f.offset().left-1-parseInt(f.css("margin-left"),10),n=f.offset().left-1+f.width()-o[0].length*b.opts.tableResizingLimit)):i-c.pageX<=b.opts.tableResizerOffset&&(l=i,q.col<o[q.row].length&&o[q.row][q.col+1]?(m=i-ja(q.col,o)+b.opts.tableResizingLimit,n=i+ja(q.col+1,o)-b.opts.tableResizingLimit,j=q.col,k=q.col+1):(j=q.col,k=null,m=f.offset().left-1+o[0].length*b.opts.tableResizingLimit,n=g.offset().left-1+g.width()+parseFloat(g.css("padding-left")))):i-c.pageX<=b.opts.tableResizerOffset?(l=i,p.col>0?(m=i-ja(p.col,o)+b.opts.tableResizingLimit,n=i+ja(p.col-1,o)-b.opts.tableResizingLimit,j=p.col,k=p.col-1):(j=null,k=0,m=f.offset().left+o[0].length*b.opts.tableResizingLimit,n=g.offset().left-1+g.width()+parseFloat(g.css("padding-left")))):c.pageX-h<=b.opts.tableResizerOffset&&(l=h,q.col<o[q.row].length&&o[q.row][q.col+1]?(m=h-ja(q.col+1,o)+b.opts.tableResizingLimit,n=h+ja(q.col,o)-b.opts.tableResizingLimit,j=q.col+1,k=q.col):(j=q.col,k=null,m=g.offset().left+parseFloat(g.css("padding-left")),n=f.offset().left-1+f.width()-o[0].length*b.opts.tableResizingLimit)),wa||_(),wa.data("table",f),wa.data("first",j),wa.data("second",k),wa.data("instance",b),b.$wp.append(wa);var t=l-b.win.pageXOffset-b.opts.tableResizerOffset,u=r-b.win.pageYOffset;b.opts.iframe&&(t+=b.$iframe.offset().left-a(b.o_win).scrollLeft(),u+=b.$iframe.offset().top-a(b.o_win).scrollTop(),m+=b.$iframe.offset().left,n+=b.$iframe.offset().left),wa.data("max-left",m),wa.data("max-right",n),wa.data("origin",l-b.win.pageXOffset),wa.css("top",u),wa.css("left",t),wa.css("height",s),wa.find("div").css("height",s),wa.css("padding-left",b.opts.tableResizerOffset),wa.css("padding-right",b.opts.tableResizerOffset),wa.show()}else b.core.sameInstance(wa)&&aa()}}function da(c,d){if(b.$box.find(".fr-line-breaker").is(":visible"))return!1;xa||oa(),b.$box.append(xa),xa.data("instance",b);var e=a(d),f=e.find("tr:first"),g=c.pageX,h=0,i=0;b.opts.iframe&&(h+=b.$iframe.offset().left-a(b.o_win).scrollLeft(),i+=b.$iframe.offset().top-a(b.o_win).scrollTop());var j;f.find("th, td").each(function(){var c=a(this);return c.offset().left<=g&&g<c.offset().left+c.outerWidth()/2?(j=parseInt(xa.find("a").css("width"),10),xa.css("top",i+c.offset().top-b.win.pageYOffset-j-5),xa.css("left",h+c.offset().left-b.win.pageXOffset-j/2),xa.data("selected-cell",c),xa.data("position","before"),xa.addClass("fr-visible"),!1):c.offset().left+c.outerWidth()/2<=g&&g<c.offset().left+c.outerWidth()?(j=parseInt(xa.find("a").css("width"),10),xa.css("top",i+c.offset().top-b.win.pageYOffset-j-5),xa.css("left",h+c.offset().left+c.outerWidth()-b.win.pageXOffset-j/2),xa.data("selected-cell",c),xa.data("position","after"),xa.addClass("fr-visible"),!1):void 0})}function ea(c,d){if(b.$box.find(".fr-line-breaker").is(":visible"))return!1;xa||oa(),b.$box.append(xa),xa.data("instance",b);var e=a(d),f=c.pageY,g=0,h=0;b.opts.iframe&&(g+=b.$iframe.offset().left-a(b.o_win).scrollLeft(),h+=b.$iframe.offset().top-a(b.o_win).scrollTop());var i;e.find("tr").each(function(){var c=a(this);return c.offset().top<=f&&f<c.offset().top+c.outerHeight()/2?(i=parseInt(xa.find("a").css("width"),10),xa.css("top",h+c.offset().top-b.win.pageYOffset-i/2),xa.css("left",g+c.offset().left-b.win.pageXOffset-i-5),xa.data("selected-cell",c.find("td:first")),xa.data("position","above"),xa.addClass("fr-visible"),!1):c.offset().top+c.outerHeight()/2<=f&&f<c.offset().top+c.outerHeight()?(i=parseInt(xa.find("a").css("width"),10),xa.css("top",h+c.offset().top+c.outerHeight()-b.win.pageYOffset-i/2),xa.css("left",g+c.offset().left-b.win.pageXOffset-i-5),xa.data("selected-cell",c.find("td:first")),xa.data("position","below"),xa.addClass("fr-visible"),!1):void 0})}function fa(c,d){if(0===ra().length){var e,f,g;if(d&&("HTML"==d.tagName||"BODY"==d.tagName||b.node.isElement(d)))for(e=1;e<=b.opts.tableInsertHelperOffset;e++){if(f=b.doc.elementFromPoint(c.pageX-b.win.pageXOffset,c.pageY-b.win.pageYOffset+e),a(f).hasClass("fr-tooltip"))return!0;if(f&&("TH"==f.tagName||"TD"==f.tagName||"TABLE"==f.tagName)&&(a(f).parents(".fr-wrapper").length||b.opts.iframe))return da(c,a(f).closest("table")),!0;if(g=b.doc.elementFromPoint(c.pageX-b.win.pageXOffset+e,c.pageY-b.win.pageYOffset),a(g).hasClass("fr-tooltip"))return!0;if(g&&("TH"==g.tagName||"TD"==g.tagName||"TABLE"==g.tagName)&&(a(g).parents(".fr-wrapper").length||b.opts.iframe))return ea(c,a(g).closest("table")),!0}b.core.sameInstance(xa)&&ba()}}function ga(a){Ba=null;var c=b.doc.elementFromPoint(a.pageX-b.win.pageXOffset,a.pageY-b.win.pageYOffset);b.opts.tableResizer&&(!b.popups.areVisible()||b.popups.areVisible()&&b.popups.isVisible("table.edit"))&&ca(a,c),!b.opts.tableInsertHelper||b.popups.areVisible()||b.$tb.hasClass("fr-inline")&&b.$tb.is(":visible")||fa(a,c)}function ha(){if(Ca){var c=wa.data("table"),d=c.offset().top-b.win.pageYOffset;b.opts.iframe&&(d+=b.$iframe.offset().top-a(b.o_win).scrollTop()),wa.css("top",d)}}function ia(){var c=wa.data("origin"),d=wa.data("release-position");if(c!==d){var e=wa.data("first"),f=wa.data("second"),g=wa.data("table"),h=g.outerWidth();if(null!==e&&null!==f){var i,j,k,l=I(g),m=[],n=[],o=[],p=[];for(i=0;i<l.length;i++)j=a(l[i][e]),k=a(l[i][f]),m[i]=j.outerWidth(),o[i]=k.outerWidth(),n[i]=m[i]/h*100,p[i]=o[i]/h*100;for(i=0;i<l.length;i++){j=a(l[i][e]),k=a(l[i][f]);var q=(n[i]*(m[i]+d-c)/m[i]).toFixed(4);j.css("width",q+"%"),k.css("width",(n[i]+p[i]-q).toFixed(4)+"%")}}else{var r,s=g.parent(),t=h/s.width()*100;"rtl"==b.opts.direction?0===f?(r=(h+d-c)/h*t,g.css("margin-right","calc(100% - "+Math.round(r).toFixed(4)+"% - "+(parseInt(g.css("margin-left"),10)||0)+"px)")):(r=(h-d+c)/h*t,g.css("margin-left","calc(100% - "+Math.round(r).toFixed(4)+"% - "+(parseInt(g.css("margin-right"),10)||0)+"px)")):0===f?(r=(h-d+c)/h*t,g.css("margin-left","calc(100% - "+Math.round(r).toFixed(4)+"% - "+(parseInt(g.css("margin-right"),10)||0)+"px)")):(r=(h+d-c)/h*t,g.css("margin-right","calc(100% - "+Math.round(r).toFixed(4)+"% - "+(parseInt(g.css("margin-left"),10)||0)+"px)")),g.css("width",Math.round(r).toFixed(4)+"%")}b.selection.restore(),b.undo.saveStep()}wa.removeData("origin"),wa.removeData("release-position"),wa.removeData("first"),wa.removeData("second"),wa.removeData("table")}function ja(b,c){var d,e=a(c[0][b]).outerWidth();for(d=1;d<c.length;d++)e=Math.min(e,a(c[d][b]).outerWidth());return e}function ka(a,b,c){var d,e=0;for(d=a;d<=b;d++)e+=ja(d,c);return e}function la(a){if(ra().length>1&&za&&M(),za===!1&&ya===!1&&Ca===!1)Ba&&clearTimeout(Ba),b.edit.isDisabled()&&!b.popups.isVisible("table.edit")||(Ba=setTimeout(ga,30,a));else if(Ca){var c=a.pageX-b.win.pageXOffset;b.opts.iframe&&(c+=b.$iframe.offset().left);var d=wa.data("max-left"),e=wa.data("max-right");c>=d&&c<=e?wa.css("left",c-b.opts.tableResizerOffset):c<d&&parseFloat(wa.css("left"),10)>d-b.opts.tableResizerOffset?wa.css("left",d-b.opts.tableResizerOffset):c>e&&parseFloat(wa.css("left"),10)<e-b.opts.tableResizerOffset&&wa.css("left",e-b.opts.tableResizerOffset)}else za&&ba()}function ma(c){b.node.isEmpty(c.get(0))?c.prepend(a.FE.MARKERS):c.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER)}function na(c){var d=c.which;if(d==a.FE.KEYCODE.TAB){var e;if(ra().length>0)e=b.$el.find(".fr-selected-cell:last");else{var f=b.selection.element();"TD"==f.tagName||"TH"==f.tagName?e=a(f):a(f).closest("td").length>0?e=a(f).closest("td"):a(f).closest("th").length>0&&(e=a(f).closest("th"))}if(e)return c.preventDefault(),S(),c.shiftKey?e.prev().length>0?ma(e.prev()):e.closest("tr").length>0&&e.closest("tr").prev().length>0?ma(e.closest("tr").prev().find("td:last")):e.closest("tbody").length>0&&e.closest("table").find("thead tr").length>0&&ma(e.closest("table").find("thead tr th:last")):e.next().length>0?ma(e.next()):e.closest("tr").length>0&&e.closest("tr").next().length>0?ma(e.closest("tr").next().find("td:first")):e.closest("thead").length>0&&e.closest("table").find("tbody tr").length>0?ma(e.closest("table").find("tbody tr td:first")):(e.addClass("fr-selected-cell"),
t("below"),L(),ma(e.closest("tr").next().find("td:first"))),b.selection.restore(),!1}}function oa(){b.shared.$ti_helper||(b.shared.$ti_helper=a('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="'+b.language.translate("Insert")+'"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'),b.events.bindClick(b.shared.$ti_helper,"a",function(){var a=xa.data("selected-cell"),c=xa.data("position"),d=xa.data("instance")||b;"before"==c?(a.addClass("fr-selected-cell"),d.table.insertColumn(c),a.removeClass("fr-selected-cell")):"after"==c?(a.addClass("fr-selected-cell"),d.table.insertColumn(c),a.removeClass("fr-selected-cell")):"above"==c?(a.addClass("fr-selected-cell"),d.table.insertRow(c),a.removeClass("fr-selected-cell")):"below"==c&&(a.addClass("fr-selected-cell"),d.table.insertRow(c),a.removeClass("fr-selected-cell")),ba()}),b.events.on("shared.destroy",function(){b.shared.$ti_helper.html("").removeData().remove(),b.shared.$ti_helper=null},!0),b.events.$on(b.shared.$ti_helper,"mousemove",function(a){a.stopPropagation()},!0),b.events.$on(a(b.o_win),"scroll",function(){ba()},!0),b.events.$on(b.$wp,"scroll",function(){ba()},!0)),xa=b.shared.$ti_helper,b.events.on("destroy",function(){xa=null}),b.tooltip.bind(b.$box,".fr-insert-helper > a.fr-floating-btn")}function pa(){Aa=null,clearTimeout(Ba)}function qa(){ra().length>0?d():(b.popups.hide("table.insert"),b.toolbar.showInline())}function ra(){return b.el.querySelectorAll(".fr-selected-cell")}function sa(){var c=ra();if(c.length){for(var d=c[0];d&&"TABLE"!=d.tagName&&d.parentNode!=b.el;)d=d.parentNode;return a(d&&"TABLE"==d.tagName?d:[])}return a([])}function ta(c){if(c.altKey&&c.which==a.FE.KEYCODE.SPACE){var e,f=b.selection.element();if("TD"==f.tagName||"TH"==f.tagName?e=f:a(f).closest("td").length>0?e=a(f).closest("td").get(0):a(f).closest("th").length>0&&(e=a(f).closest("th").get(0)),e)return c.preventDefault(),Q(e,e),d(),!1}}function ua(c){var d=ra();if(d.length>0){var e,f,g=I(),h=c.which;1==d.length?(e=d[0],f=e):(e=b.el.querySelector(".fr-cell-fixed"),f=b.el.querySelector(".fr-cell-handler"));var i=J(f,g);if(a.FE.KEYCODE.ARROW_RIGHT==h){if(i.col<g[0].length-1)return Q(e,g[i.row][i.col+1]),!1}else if(a.FE.KEYCODE.ARROW_DOWN==h){if(i.row<g.length-1)return Q(e,g[i.row+1][i.col]),!1}else if(a.FE.KEYCODE.ARROW_LEFT==h){if(i.col>0)return Q(e,g[i.row][i.col-1]),!1}else if(a.FE.KEYCODE.ARROW_UP==h&&i.row>0)return Q(e,g[i.row-1][i.col]),!1}}function va(){if(!b.$wp)return!1;if(!b.helpers.isMobile()){za=!1,ya=!1,Ca=!1,b.events.$on(b.$el,"mousedown",T),b.popups.onShow("image.edit",function(){L(),za=!1,ya=!1}),b.popups.onShow("link.edit",function(){L(),za=!1,ya=!1}),b.events.on("commands.mousedown",function(a){a.parents(".fr-toolbar").length>0&&L()}),b.events.$on(b.$el,"mouseenter","th, td",V),b.events.$on(b.$win,"mouseup",U),b.opts.iframe&&b.events.$on(a(b.o_win),"mouseup",U),b.events.$on(b.$win,"mousemove",la),b.events.$on(a(b.o_win),"scroll",ha),b.events.on("contentChanged",function(){ra().length>0&&(d(),b.$el.find("img").on("load.selected-cells",function(){a(this).off("load.selected-cells"),ra().length>0&&d()}))}),b.events.$on(a(b.o_win),"resize",function(){L()}),b.events.on("toolbar.esc",function(){if(ra().length>0)return b.events.disableBlur(),b.events.focus(),!1},!0),b.events.$on(b.$el,"keydown",function(a){a.shiftKey?ua(a)===!1&&setTimeout(function(){d()},0):$(a)}),b.events.on("keydown",function(c){if(na(c)===!1)return!1;var d=ra();if(d.length>0){if(c.which==a.FE.KEYCODE.ESC&&b.popups.isVisible("table.edit"))return L(),b.popups.hide("table.edit"),c.preventDefault(),c.stopPropagation(),c.stopImmediatePropagation(),d=[],!1;if(d.length>1&&c.which==a.FE.KEYCODE.BACKSPACE){b.undo.saveStep();for(var e=0;e<d.length;e++)a(d[e]).html("<br>"),e==d.length-1&&a(d[e]).prepend(a.FE.MARKERS);return b.selection.restore(),b.undo.saveStep(),d=[],!1}if(d.length>1&&c.which!=a.FE.KEYCODE.F10&&!b.keys.isBrowserAction(c))return c.preventDefault(),d=[],!1}else if(d=[],ta(c)===!1)return!1},!0);var c=[];b.events.on("html.beforeGet",function(){c=ra();for(var a=0;a<c.length;a++)c[a].className=(c[a].className||"").replace(/fr-selected-cell/g,"")}),b.events.on("html.get",function(a){return a=a.replace(/<(td|th)((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/(td|th)>/g,"<$1$2$3>$4</$5>")}),b.events.on("html.afterGet",function(){for(var a=0;a<c.length;a++)c[a].className=(c[a].className?c[a].className.trim()+" ":"")+"fr-selected-cell";c=[]}),g(!0),k(!0)}b.events.on("destroy",pa)}var wa,xa,ya,za,Aa,Ba,Ca;return{_init:va,insert:p,remove:q,insertRow:t,deleteRow:u,insertColumn:v,deleteColumn:w,mergeCells:B,splitCellVertically:D,splitCellHorizontally:C,addHeader:r,removeHeader:s,setBackground:E,showInsertPopup:c,showEditPopup:d,showColorsPopup:e,back:qa,verticalAlign:F,horizontalAlign:G,applyStyle:H,selectedTable:sa,selectedCells:ra}},a.FE.DefineIcon("insertTable",{NAME:"table"}),a.FE.RegisterCommand("insertTable",{title:"Insert Table",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("table.insert")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("table.insert")):this.table.showInsertPopup()},plugin:"table"}),a.FE.RegisterCommand("tableInsert",{callback:function(a,b,c){this.table.insert(b,c),this.popups.hide("table.insert")}}),a.FE.DefineIcon("tableHeader",{NAME:"header"}),a.FE.RegisterCommand("tableHeader",{title:"Table Header",focus:!1,toggle:!0,callback:function(){var a=this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]');a.hasClass("fr-active")?this.table.removeHeader():this.table.addHeader()},refresh:function(a){var b=this.table.selectedTable();b.length>0&&(0===b.find("th").length?a.removeClass("fr-active").attr("aria-pressed",!1):a.addClass("fr-active").attr("aria-pressed",!0))}}),a.FE.DefineIcon("tableRows",{NAME:"bars"}),a.FE.RegisterCommand("tableRows",{type:"dropdown",focus:!1,title:"Row",options:{above:"Insert row above",below:"Insert row below",delete:"Delete row"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.tableRows.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(c[d])+"</a></li>");return b+="</ul>"},callback:function(a,b){"above"==b||"below"==b?this.table.insertRow(b):this.table.deleteRow()}}),a.FE.DefineIcon("tableColumns",{NAME:"bars fa-rotate-90"}),a.FE.RegisterCommand("tableColumns",{type:"dropdown",focus:!1,title:"Column",options:{before:"Insert column before",after:"Insert column after",delete:"Delete column"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.tableColumns.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(c[d])+"</a></li>");return b+="</ul>"},callback:function(a,b){"before"==b||"after"==b?this.table.insertColumn(b):this.table.deleteColumn()}}),a.FE.DefineIcon("tableCells",{NAME:"square-o"}),a.FE.RegisterCommand("tableCells",{type:"dropdown",focus:!1,title:"Cell",options:{merge:"Merge cells","vertical-split":"Vertical split","horizontal-split":"Horizontal split"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.tableCells.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(c[d])+"</a></li>");return b+="</ul>"},callback:function(a,b){"merge"==b?this.table.mergeCells():"vertical-split"==b?this.table.splitCellVertically():this.table.splitCellHorizontally()},refreshOnShow:function(a,b){this.$el.find(".fr-selected-cell").length>1?(b.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled",!0),b.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled",!0),b.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled",!1)):(b.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled",!0),b.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled",!1),b.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled",!1))}}),a.FE.DefineIcon("tableRemove",{NAME:"trash"}),a.FE.RegisterCommand("tableRemove",{title:"Remove Table",focus:!1,callback:function(){this.table.remove()}}),a.FE.DefineIcon("tableStyle",{NAME:"paint-brush"}),a.FE.RegisterCommand("tableStyle",{title:"Table Style",type:"dropdown",focus:!1,html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.tableStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></li>");return a+="</ul>"},callback:function(a,b){this.table.applyStyle(b,this.$el.find(".fr-selected-cell").closest("table"),this.opts.tableMultipleStyles,this.opts.tableStyles)},refreshOnShow:function(b,c){var d=this.$el.find(".fr-selected-cell").closest("table");d&&c.find(".fr-command").each(function(){var b=a(this).data("param1"),c=d.hasClass(b);a(this).toggleClass("fr-active",c).attr("aria-selected",c)})}}),a.FE.DefineIcon("tableCellBackground",{NAME:"tint"}),a.FE.RegisterCommand("tableCellBackground",{title:"Cell Background",focus:!1,popup:!0,callback:function(){this.table.showColorsPopup()}}),a.FE.RegisterCommand("tableCellBackgroundColor",{undo:!0,focus:!1,callback:function(a,b){this.table.setBackground(b)}}),a.FE.DefineIcon("tableBack",{NAME:"arrow-left"}),a.FE.RegisterCommand("tableBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.table.back()},refresh:function(a){0!==this.table.selectedCells().length||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FE.DefineIcon("tableCellVerticalAlign",{NAME:"arrows-v"}),a.FE.RegisterCommand("tableCellVerticalAlign",{type:"dropdown",focus:!1,title:"Vertical Align",options:{Top:"Align Top",Middle:"Align Middle",Bottom:"Align Bottom"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.tableCellVerticalAlign.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="'+d.toLowerCase()+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(d)+"</a></li>");return b+="</ul>"},callback:function(a,b){this.table.verticalAlign(b)},refreshOnShow:function(a,b){b.find('.fr-command[data-param1="'+this.$el.find(".fr-selected-cell").css("vertical-align")+'"]').addClass("fr-active").attr("aria-selected",!0)}}),a.FE.DefineIcon("tableCellHorizontalAlign",{NAME:"align-left"}),a.FE.DefineIcon("align-left",{NAME:"align-left"}),a.FE.DefineIcon("align-right",{NAME:"align-right"}),a.FE.DefineIcon("align-center",{NAME:"align-center"}),a.FE.DefineIcon("align-justify",{NAME:"align-justify"}),a.FE.RegisterCommand("tableCellHorizontalAlign",{type:"dropdown",focus:!1,title:"Horizontal Align",options:{left:"Align Left",center:"Align Center",right:"Align Right",justify:"Align Justify"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.tableCellHorizontalAlign.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+'<span class="fr-sr-only">'+this.language.translate(c[d])+"</span></a></li>");return b+="</ul>"},callback:function(a,b){this.table.horizontalAlign(b)},refresh:function(b){var c=this.table.selectedCells();c.length&&b.find("> *:first").replaceWith(this.icon.create("align-"+this.helpers.getAlignment(a(c[0]))))},refreshOnShow:function(a,b){b.find('.fr-command[data-param1="'+this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first"))+'"]').addClass("fr-active").attr("aria-selected",!0)}}),a.FE.DefineIcon("tableCellStyle",{NAME:"magic"}),a.FE.RegisterCommand("tableCellStyle",{title:"Cell Style",type:"dropdown",focus:!1,html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.tableCellStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></li>");return a+="</ul>"},callback:function(a,b){this.table.applyStyle(b,this.$el.find(".fr-selected-cell"),this.opts.tableCellMultipleStyles,this.opts.tableCellStyles)},refreshOnShow:function(b,c){var d=this.$el.find(".fr-selected-cell:first");d&&c.find(".fr-command").each(function(){var b=a(this).data("param1"),c=d.hasClass(b);a(this).toggleClass("fr-active",c).attr("aria-selected",c)})}})});























// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//




;
