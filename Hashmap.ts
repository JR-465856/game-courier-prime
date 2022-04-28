class Hashmap {
    private internalArray: Array<{key: any, value: any}> = [];

    constructor() {}

    // Set value at key
    public setValue(key: any, value: any) {
        let internalObject = {value: value, key: key};
        let keyExists = false;
        let keyIndex: number;
        // Check if the key exists
        this.internalArray.forEach(function(obj, index) {
            if (obj.key == key) { keyExists = true; keyIndex = index;}
        });
        // If the key exists, overwrite the value
        if (keyExists) {
            this.internalArray[keyIndex] = internalObject;
        } else {
            // If the key doesn't exist, make a new object
            this.internalArray.push(internalObject);
        }
    }

    // Get value at key
    public getValue(key: any) {
        let result;
        this.internalArray.forEach(function(obj) { if (obj.key == key) result = obj.value;});
        return result;
    }

    // Get length
    public getLength() { return this.internalArray.length;}
}