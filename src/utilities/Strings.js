const shorten = (word, limit) => {
    if (word.length > limit)
        return word.toString().substring(0, limit) + "..."
    return word
}

const String = { shorten }

export default String