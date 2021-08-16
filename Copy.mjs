export default function deepCopy(object) {
    if (typeof object !== 'object' || object === null) {
        return object;
    } else {
        const output = Object.create(Object.getPrototypeOf(object));
        for(const prop of Object.getOwnPropertyNames(object)) {
            const desc = Object.getOwnPropertyDescriptor(object, prop);
            if (desc.value) {
                desc.value = deepCopy(desc.value);
            }
            Object.defineProperty(output, prop, desc);
        }
        return output;
    }
}
