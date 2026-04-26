/**
 * useBillsFeed — unified browse + search hook
 *
 * Browse mode  : cursor-based pagination, loads 50 bills at a time.
 *                Infinite scroll appends pages without re-fetching earlier ones.
 * Search mode  : debounced (300ms) server query against the full DB.
 *                Also cursor-paginated — "load more" works inside search results.
 *
 * The two modes keep completely independent bill/cursor state so switching
 * back from search → browse instantly restores the previous browse position
 * without any extra network request.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import useDebounce from "./useDebounce";
import { browseBills, searchBills } from "../utils/apiUtilsV2";

const PAGE_SIZE = 50;

const mapBill = (b) => ({
  id: b.id,
  label: b.name,
  knessetNum: b.knessetNum,
  date: b.billDate,
  link: b.link,
});

const useBillsFeed = (knessetNum) => {
  // ── Mode & query ────────────────────────────────────────────────────────────
  const [mode, setMode] = useState("browse");   // "browse" | "search"
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // ── Browse state ────────────────────────────────────────────────────────────
  const [browseBillsList, setBrowseBillsList] = useState([]);
  const [browseCursor, setBrowseCursor] = useState(null);
  const [browseHasMore, setBrowseHasMore] = useState(true);
  const [browseTotal, setBrowseTotal] = useState(null);

  // ── Search state ────────────────────────────────────────────────────────────
  const [searchBillsList, setSearchBillsList] = useState([]);
  const [searchCursor, setSearchCursor] = useState(null);
  const [searchHasMore, setSearchHasMore] = useState(true);
  const [searchTotal, setSearchTotal] = useState(null);

  // ── Shared loading / error ──────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadingRef = useRef(false); // prevents concurrent fetches

  // ── Fetch helpers ───────────────────────────────────────────────────────────

  const fetchBrowse = useCallback(async (cursor) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const res = await browseBills(knessetNum, cursor);
      const incoming = res.data.bills.map(mapBill);
      setBrowseBillsList((prev) => (cursor ? [...prev, ...incoming] : incoming));
      setBrowseCursor(incoming.at(-1)?.id ?? null);
      setBrowseHasMore(incoming.length === PAGE_SIZE);
      if (res.data.total != null) setBrowseTotal(res.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [knessetNum]);

  const fetchSearch = useCallback(async (q, cursor) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const res = await searchBills(knessetNum, q, cursor);
      const incoming = res.data.bills.map(mapBill);
      setSearchBillsList((prev) => (cursor ? [...prev, ...incoming] : incoming));
      setSearchCursor(incoming.at(-1)?.id ?? null);
      setSearchHasMore(incoming.length === PAGE_SIZE);
      if (res.data.total != null) setSearchTotal(res.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [knessetNum]);

  // ── Knesset session change → reset both modes, reload browse ───────────────

  useEffect(() => {
    setQuery("");
    setMode("browse");
    setBrowseBillsList([]);
    setBrowseCursor(null);
    setBrowseHasMore(true);
    setBrowseTotal(null);
    setSearchBillsList([]);
    setSearchCursor(null);
    setSearchHasMore(true);
    setSearchTotal(null);
    fetchBrowse(null);
  }, [knessetNum]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Debounced query change → switch mode ────────────────────────────────────

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (q) {
      setMode("search");
      setSearchBillsList([]);
      setSearchCursor(null);
      setSearchHasMore(true);
      setSearchTotal(null);
      fetchSearch(q, null);
    } else {
      // Empty query → return to browse (existing browse list, no re-fetch needed)
      setMode("browse");
    }
  }, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Load more (called when user scrolls near end of list) ───────────────────

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    if (mode === "browse" && browseHasMore) {
      fetchBrowse(browseCursor);
    } else if (mode === "search" && searchHasMore) {
      fetchSearch(debouncedQuery.trim(), searchCursor);
    }
  }, [mode, browseHasMore, searchHasMore, browseCursor, searchCursor, debouncedQuery, fetchBrowse, fetchSearch]);

  // ── Derived values ──────────────────────────────────────────────────────────

  return {
    bills:   mode === "browse" ? browseBillsList : searchBillsList,
    hasMore: mode === "browse" ? browseHasMore   : searchHasMore,
    total:   mode === "browse" ? browseTotal     : searchTotal,
    loading,
    error,
    mode,
    query,
    setQuery,
    loadMore,
  };
};

export default useBillsFeed;
