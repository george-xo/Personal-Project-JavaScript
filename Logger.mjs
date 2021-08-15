export default function constructLog(index, meta, err, isError, before, after) {
    if (!isError) {
        return {
            index: index + 1,
            meta: meta,
            storeBefore: before,
            storeAfter: after,
            error: err
        }
    } else {
        return {
            index: index + 1,
            meta: meta,
            error: {
                name: err.name,
                message: err.message,
                stack: err.stack
            }
        }
    }
}
