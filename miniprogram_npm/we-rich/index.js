module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1565421036468, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDefaults = undefined;
exports.parse = parse;
exports.stringify = stringify;

var _lexer = require('./lexer');

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _format = require('./format');

var _stringify = require('./stringify');

var _tags = require('./tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseDefaults = exports.parseDefaults = {
  voidTags: _tags.voidTags,
  closingTags: _tags.closingTags,
  childlessTags: _tags.childlessTags,
  supportTags: _tags.supportTags,
  closingTagAncestorBreakers: _tags.closingTagAncestorBreakers
};

function parse(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;

  var tokens = (0, _lexer2.default)(str, options);
  var nodes = (0, _parser2.default)(tokens, options);
  return (0, _format.format)(nodes, options);
}

function stringify(ast) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;

  return (0, _stringify.toHTML)(ast, options);
}
//# sourceMappingURL=index.js.map

}, function(modId) {var map = {"./lexer":1565421036469,"./parser":1565421036471,"./format":1565421036472,"./stringify":1565421036473,"./tags":1565421036474}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1565421036469, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lexer;
exports.lex = lex;
exports.findTextEnd = findTextEnd;
exports.lexText = lexText;
exports.lexComment = lexComment;
exports.lexTag = lexTag;
exports.isWhitespaceChar = isWhitespaceChar;
exports.lexTagName = lexTagName;
exports.lexTagAttributes = lexTagAttributes;
exports.lexSkipTag = lexSkipTag;

var _compat = require('./compat');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function lexer(str, options) {
  var state = { str: str, options: options, cursor: 0, tokens: [] };
  lex(state);
  return state.tokens;
}

function lex(state) {
  var str = state.str;

  var len = str.length;
  while (state.cursor < len) {
    var start = state.cursor;
    lexText(state);
    if (state.cursor === start) {
      var isComment = (0, _compat.startsWith)(str, '!--', state.cursor + 1);
      if (isComment) {
        lexComment(state);
      } else {
        var tagName = lexTag(state);
        var safeTag = tagName.toLowerCase();
        var childlessTags = state.options.childlessTags;

        if ((0, _compat.arrayIncludes)(childlessTags, safeTag)) {
          lexSkipTag(tagName, state);
        }
      }
    }
  }
}

var alphanumeric = /[A-Za-z0-9]/;
function findTextEnd(str, index) {
  while (true) {
    var textEnd = str.indexOf('<', index);
    if (textEnd === -1) {
      return textEnd;
    }
    var char = str.charAt(textEnd + 1);
    if (char === '/' || char === '!' || alphanumeric.test(char)) {
      return textEnd;
    }
    index = textEnd + 1;
  }
}

function lexText(state) {
  var type = 'text';
  var str = state.str,
      cursor = state.cursor;

  var textEnd = findTextEnd(str, cursor);
  if (textEnd === -1) {
    // there is only text left
    var _content = str.slice(cursor);
    state.cursor = str.length;
    state.tokens.push({ type: type, content: _content });
    return;
  }

  if (textEnd === cursor) return;

  var content = str.slice(cursor, textEnd);
  state.cursor = textEnd;
  state.tokens.push({ type: type, content: content });
}

function lexComment(state) {
  state.cursor += 4; // "<!--".length
  var str = state.str,
      cursor = state.cursor;

  var commentEnd = str.indexOf('-->', cursor);
  var type = 'comment';
  if (commentEnd === -1) {
    // there is only the comment left
    var _content2 = str.slice(cursor);
    state.cursor = str.length;
    state.tokens.push({ type: type, content: _content2 });
    return;
  }

  var content = str.slice(cursor, commentEnd);
  state.cursor = commentEnd + 3; // "-->".length
  state.tokens.push({ type: type, content: content });
}

function lexTag(state) {
  var str = state.str;

  {
    var secondChar = str.charAt(state.cursor + 1);
    var close = secondChar === '/';
    state.tokens.push({ type: 'tag-start', close: close });
    state.cursor += close ? 2 : 1;
  }
  var tagName = lexTagName(state);
  lexTagAttributes(state);
  {
    var firstChar = str.charAt(state.cursor);
    var _close = firstChar === '/';
    state.tokens.push({ type: 'tag-end', close: _close });
    state.cursor += _close ? 2 : 1;
  }
  return tagName;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
var whitespace = /\s/;
function isWhitespaceChar(char) {
  return whitespace.test(char);
}

function lexTagName(state) {
  var str = state.str,
      cursor = state.cursor;

  var len = str.length;
  var start = cursor;
  while (start < len) {
    var char = str.charAt(start);
    var isTagChar = !(isWhitespaceChar(char) || char === '/' || char === '>');
    if (isTagChar) break;
    start++;
  }

  var end = start + 1;
  while (end < len) {
    var _char = str.charAt(end);
    var _isTagChar = !(isWhitespaceChar(_char) || _char === '/' || _char === '>');
    if (!_isTagChar) break;
    end++;
  }

  state.cursor = end;
  var tagName = str.slice(start, end);
  state.tokens.push({ type: 'tag', content: tagName });
  return tagName;
}

function lexTagAttributes(state) {
  var str = state.str,
      tokens = state.tokens;

  var cursor = state.cursor;
  var quote = null; // null, single-, or double-quote
  var wordBegin = cursor; // index of word start
  var words = []; // "key", "key=value", "key='value'", etc
  var len = str.length;
  while (cursor < len) {
    var char = str.charAt(cursor);
    if (quote) {
      var isQuoteEnd = char === quote;
      if (isQuoteEnd) {
        quote = null;
      }
      cursor++;
      continue;
    }

    var isTagEnd = char === '/' || char === '>';
    if (isTagEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor));
      }
      break;
    }

    var isWordEnd = isWhitespaceChar(char);
    if (isWordEnd) {
      if (cursor !== wordBegin) {
        words.push(str.slice(wordBegin, cursor));
      }
      wordBegin = cursor + 1;
      cursor++;
      continue;
    }

    var isQuoteStart = char === '\'' || char === '"';
    if (isQuoteStart) {
      quote = char;
      cursor++;
      continue;
    }

    cursor++;
  }
  state.cursor = cursor;

  var wLen = words.length;
  var type = 'attribute';
  for (var i = 0; i < wLen; i++) {
    var word = words[i];
    var isNotPair = word.indexOf('=') === -1;
    if (isNotPair) {
      var secondWord = words[i + 1];
      if (secondWord && (0, _compat.startsWith)(secondWord, '=')) {
        if (secondWord.length > 1) {
          var newWord = word + secondWord;
          tokens.push({ type: type, content: newWord });
          i += 1;
          continue;
        }
        var thirdWord = words[i + 2];
        i += 1;
        if (thirdWord) {
          var _newWord = word + '=' + thirdWord;
          tokens.push({ type: type, content: _newWord });
          i += 1;
          continue;
        }
      }
    }
    if ((0, _compat.endsWith)(word, '=')) {
      var _secondWord = words[i + 1];
      if (_secondWord && !(0, _compat.stringIncludes)(_secondWord, '=')) {
        var _newWord3 = word + _secondWord;
        tokens.push({ type: type, content: _newWord3 });
        i += 1;
        continue;
      }

      var _newWord2 = word.slice(0, -1);
      tokens.push({ type: type, content: _newWord2 });
      continue;
    }

    tokens.push({ type: type, content: word });
  }
}

function lexSkipTag(tagName, state) {
  var str = state.str,
      cursor = state.cursor,
      tokens = state.tokens;

  var len = str.length;
  var index = cursor;
  while (index < len) {
    var nextTag = str.indexOf('</', index);
    if (nextTag === -1) {
      lexText(state);
      break;
    }

    var tagState = { str: str, cursor: nextTag + 2, tokens: [] };
    var name = lexTagName(tagState);
    var safeTagName = tagName.toLowerCase();
    if (safeTagName !== name.toLowerCase()) {
      index = tagState.cursor;
      continue;
    }

    var content = str.slice(cursor, nextTag);
    tokens.push({ type: 'text', content: content });
    var openTag = { type: 'tag-start', close: true };
    var closeTag = { type: 'tag-end', close: false };
    lexTagAttributes(tagState);
    tokens.push.apply(tokens, [openTag].concat(_toConsumableArray(tagState.tokens), [closeTag]));
    state.cursor = tagState.cursor + 1;
    break;
  }
}
//# sourceMappingURL=lexer.js.map

}, function(modId) { var map = {"./compat":1565421036470}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1565421036470, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.stringIncludes = stringIncludes;
exports.isRealNaN = isRealNaN;
exports.arrayIncludes = arrayIncludes;
/*
  We don't want to include babel-polyfill in our project.
    - Library authors should be using babel-runtime for non-global polyfilling
    - Adding babel-polyfill/-runtime increases bundle size significantly

  We will include our polyfill instance methods as regular functions.
*/

function startsWith(str, searchString, position) {
  return str.substr(position || 0, searchString.length) === searchString;
}

function endsWith(str, searchString, position) {
  var index = (position || str.length) - searchString.length;
  var lastIndex = str.lastIndexOf(searchString, index);
  return lastIndex !== -1 && lastIndex === index;
}

function stringIncludes(str, searchString, position) {
  return str.indexOf(searchString, position || 0) !== -1;
}

function isRealNaN(x) {
  return typeof x === 'number' && isNaN(x);
}

function arrayIncludes(array, searchElement, position) {
  var len = array.length;
  if (len === 0) return false;

  var lookupIndex = position | 0;
  var isNaNElement = isRealNaN(searchElement);
  var searchIndex = lookupIndex >= 0 ? lookupIndex : len + lookupIndex;
  while (searchIndex < len) {
    var element = array[searchIndex++];
    if (element === searchElement) return true;
    if (isNaNElement && isRealNaN(element)) return true;
  }

  return false;
}
//# sourceMappingURL=compat.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1565421036471, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parser;
exports.hasTerminalParent = hasTerminalParent;
exports.parse = parse;

var _compat = require('./compat');

function parser(tokens, options) {
  var root = { tagName: null, children: [] };
  var state = { tokens: tokens, options: options, cursor: 0, stack: [root] };
  parse(state);
  return root.children;
}

function hasTerminalParent(tagName, stack, terminals) {
  var tagParents = terminals[tagName];
  if (tagParents) {
    var currentIndex = stack.length - 1;
    while (currentIndex >= 0) {
      var parentTagName = stack[currentIndex].tagName;
      if (parentTagName === tagName) {
        break;
      }
      if ((0, _compat.arrayIncludes)(tagParents, parentTagName)) {
        return true;
      }
      currentIndex--;
    }
  }
  return false;
}

function parse(state) {
  var tokens = state.tokens,
      options = state.options;
  var stack = state.stack;

  var nodes = stack[stack.length - 1].children;
  var len = tokens.length;
  var cursor = state.cursor;

  while (cursor < len) {
    var token = tokens[cursor];
    if (token.type !== 'tag-start') {
      nodes.push(token);
      cursor++;
      continue;
    }

    var tagToken = tokens[++cursor];
    cursor++;
    var tagName = tagToken.content.toLowerCase();
    if (token.close) {
      var item = void 0;
      while (item = stack.pop()) {
        if (tagName === item.tagName) break;
      }
      while (cursor < len) {
        var endToken = tokens[cursor];
        if (endToken.type !== 'tag-end') break;
        cursor++;
      }
      break;
    }

    var isClosingTag = (0, _compat.arrayIncludes)(options.closingTags, tagName);
    var shouldRewindToAutoClose = isClosingTag;
    if (shouldRewindToAutoClose) {
      var terminals = options.closingTagAncestorBreakers;

      shouldRewindToAutoClose = !hasTerminalParent(tagName, stack, terminals);
    }

    if (shouldRewindToAutoClose) {
      // rewind the stack to just above the previous
      // closing tag of the same name
      var currentIndex = stack.length - 1;
      while (currentIndex > 0) {
        if (tagName === stack[currentIndex].tagName) {
          stack = stack.slice(0, currentIndex);
          var previousIndex = currentIndex - 1;
          nodes = stack[previousIndex].children;
          break;
        }
        currentIndex = currentIndex - 1;
      }
    }

    var attributes = [];
    var attrToken = void 0;
    while (cursor < len) {
      attrToken = tokens[cursor];
      if (attrToken.type === 'tag-end') break;
      attributes.push(attrToken.content);
      cursor++;
    }

    cursor++;
    var children = [];
    nodes.push({
      type: 'element',
      tagName: tagToken.content,
      attributes: attributes,
      children: children
    });

    var hasChildren = !(attrToken.close || (0, _compat.arrayIncludes)(options.voidTags, tagName));
    if (hasChildren) {
      stack.push({ tagName: tagName, children: children });
      var innerState = { tokens: tokens, options: options, cursor: cursor, stack: stack };
      parse(innerState);
      cursor = innerState.cursor;
    }
  }
  state.cursor = cursor;
}
//# sourceMappingURL=parser.js.map

}, function(modId) { var map = {"./compat":1565421036470}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1565421036472, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitHead = splitHead;
exports.unquote = unquote;
exports.format = format;
exports.formatAttributes = formatAttributes;
function splitHead(str, sep) {
  var idx = str.indexOf(sep);
  if (idx === -1) return [str];
  return [str.slice(0, idx), str.slice(idx + sep.length)];
}

function unquote(str) {
  var car = str.charAt(0);
  var end = str.length - 1;
  var isQuoteStart = car === '"' || car === "'";
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }
  return str;
}

function format(nodes, options) {
  return nodes.map(function (node) {
    var type = node.type;
    if (type === 'element') {
      var tagName = node.tagName.toLowerCase();
      var name = options.supportTags.indexOf(tagName) >= 0 ? tagName : 'div';
      var attributes = formatAttributes(node.attributes);
      var children = format(node.children, options);
      return { type: 'node', name: name, attrs: attributes, children: children };
    }

    if (type === 'text') {
      return { type: 'text', text: node.content };
    }
    return null;
  }).filter(function (i) {
    return i;
  });
  // 小程序只支持 node 和 text节点. comment要过滤掉
}

function formatAttributes(attributes) {
  var attrs = {};
  attributes.map(function (attribute) {
    var parts = splitHead(attribute.trim(), '=');
    var key = parts[0];
    var value = typeof parts[1] === 'string' ? unquote(parts[1]) : null;
    if (key === 'style' || key === 'class' || key === 'src') {
      attrs[key] = value;
    }
    return { key: key, value: value };
  });
  return attrs;
}
//# sourceMappingURL=format.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1565421036473, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatAttributes = formatAttributes;
exports.toHTML = toHTML;

var _compat = require('./compat');

function formatAttributes(attrs) {
  var attrsArray = [];
  for (var k in attrs) {
    attrsArray.push({ key: k, value: attrs[k] });
  }
  return attrsArray.reduce(function (attrs, attribute) {
    var key = attribute.key,
        value = attribute.value;

    if (value === null) {
      return attrs + ' ' + key;
    }
    var quoteEscape = value.indexOf("'") !== -1;
    var quote = quoteEscape ? '"' : "'";
    return attrs + ' ' + key + '=' + quote + value + quote;
  }, '');
}

function toHTML(tree, options) {
  return tree.map(function (node) {
    if (node.type === 'text') {
      return node.text;
    }
    if (node.type === 'comment') {
      return '<!--' + node.text + '-->';
    }
    var name = node.name,
        attrs = node.attrs,
        children = node.children;

    var isSelfClosing = (0, _compat.arrayIncludes)(options.voidTags, name.toLowerCase());
    return isSelfClosing ? '<' + name + formatAttributes(attrs) + '>' : '<' + name + formatAttributes(attrs) + '>' + toHTML(children, options) + '</' + name + '>';
  }).join('');
}

exports.default = { toHTML: toHTML };
//# sourceMappingURL=stringify.js.map

}, function(modId) { var map = {"./compat":1565421036470}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1565421036474, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  Tags which contain arbitary non-parsed content
  For example: <script> JavaScript should not be parsed
*/
var childlessTags = exports.childlessTags = ['style', 'script', 'template'];

/*
  Tags which auto-close because they cannot be nested
  For example: <p>Outer<p>Inner is <p>Outer</p><p>Inner</p>
*/
var closingTags = exports.closingTags = ['html', 'head', 'body', 'p', 'dt', 'dd', 'li', 'option', 'thead', 'th', 'tbody', 'tr', 'td', 'tfoot', 'colgroup'];

/*
  Closing tags which have ancestor tags which
  may exist within them which prevent the
  closing tag from auto-closing.
  For example: in <li><ul><li></ul></li>,
  the top-level <li> should not auto-close.
*/
var closingTagAncestorBreakers = exports.closingTagAncestorBreakers = {
  li: ['ul', 'ol', 'menu'],
  dt: ['dl'],
  dd: ['dl'],
  tbody: ['table'],
  thead: ['table'],
  tfoot: ['table'],
  tr: ['table'],
  td: ['table']

  /*
    Tags which do not need the closing tag
    For example: <img> does not need </img>
  */
};var voidTags = exports.voidTags = ['!doctype', 'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var supportTags = exports.supportTags = ['a', 'abbr', 'b', 'blockquote', 'br', 'code', 'col', 'colgroup', 'dd', 'del', 'div', 'dl', 'dt', 'em', 'fieldset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'ins', 'label', 'legend', 'li', 'ol', 'p', 'q', 'span', 'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'];
//# sourceMappingURL=tags.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1565421036468);
})()
//# sourceMappingURL=index.js.map