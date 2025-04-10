/** Used to give unique value to an array of tag content. Should not be an object
 * TODO: This might not be in use?
 */
export function key(arrayValue) {
    console.log('ITS IN USE key-------');
    return {
        set html(newValue) {
            newValue.arrayValue = arrayValue;
        }
    };
}
//# sourceMappingURL=key.js.map