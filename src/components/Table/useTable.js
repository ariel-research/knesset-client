import { useEffect } from "react";
import { useState } from "react";
import { pageRange, slicePageData } from "../../utils/tableUtils";

const useTable = (data, page, rowsPerPage) => {
    const [numberOfPages, setNumberOfPages] = useState();
    const [slicedData, setSlicedData] = useState();

    useEffect(() => {
        const pages = pageRange(data, rowsPerPage);
        setNumberOfPages([...pages]);

        const slice = slicePageData(data, page, rowsPerPage);
        setSlicedData([...slice]);
    }, [data, page, rowsPerPage])


    return [slicedData, numberOfPages];
};

export default useTable;