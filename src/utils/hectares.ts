export const formatArea = (area: number) => {
    if (area > 10000) {
        return (area / 10000).toFixed(2);
    } else {
        return area;
    }
}

export const hectaresBool = (area: number) => {
    return area > 10000;
}
