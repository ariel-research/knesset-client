/**
 * Calculates the number of pages needed to be rendered for table pagination.
 * @param {*} data 
 * @param {number} rowsPerPage 
 * @returns array of numbers represents the size of pages
 */
export const pageRange = (data, rowsPerPage) => {
    const dataSize = data.length;
    const numberOfPages = Math.ceil(dataSize / rowsPerPage);
    return Array.from({ length: numberOfPages }, (_, num) => num + 1);
}

/**
 * Sliced data corresponds to the given page.
 * @param {*} data 
 * @param {number} page
 * @param {number} rowsPerPage 
 * @returns sliced data corresponds to the page
 */
export const slicePageData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}