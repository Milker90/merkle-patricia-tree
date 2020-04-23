import { Nibbles } from '../trieNode'

/**
 * Prepends hex prefix to an array of nibbles.
 * @method addHexPrefix
 * @param {Nibbles} key - Nibble array
 * @param {boolean} terminator - if is for a terminating (leaf) node.
 * @returns {Nibbles} - returns buffer of encoded data
 **/
export function addHexPrefix(key: Nibbles, terminator: boolean): Nibbles {
  // odd
  if (key.length % 2) {
    key.unshift(1)
  } else {
    // even
    key.unshift(0)
    key.unshift(0)
  }

  if (terminator) {
    key[0] += 2
  }

  return key
}

/**
 * Removes hex prefix of an array of nibbles.
 * @method removeHexPrefix
 * @param {Nibbles} val - Array of nibbles
 * @private
 */
export function removeHexPrefix(val: Nibbles): Nibbles {
  if (val[0] % 2) {
    val = val.slice(1)
  } else {
    val = val.slice(2)
  }

  return val
}

/**
 * Returns true if hexprefixed path is for a terminating (leaf) node.
 * @method isTerminator
 * @param {Nibbles} key - a hexprefixed array of nibbles
 * @private
 */
export function isTerminator(key: Nibbles): boolean {
  return key[0] > 1
}
