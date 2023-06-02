export const formatArea = (area: number | undefined) => {
    if (area ===undefined)
        return null

    if (area > 10000) {
        return (area / 10000).toFixed(2);
    } else {
        return area;
    }
}

export const hectaresBool = (area: number| undefined) => {
    if (area ===undefined)
        return null
    return area > 10000;
}
