import { useEffect, useRef, useState, useCallback } from 'react'

// ─── PDF.js v6 ──────────────────────────────────────────────────────────────
import * as pdfjsLib from 'pdfjs-dist'
// In pdfjs-dist v6 the worker is co-located in build/
import PdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'
pdfjsLib.GlobalWorkerOptions.workerSrc = PdfjsWorker

const PDF_URL   = '/GA.pdf'
const PAGE_NUM  = 1
const MIN_ZOOM  = 0.15
const MAX_ZOOM  = 8
const ZOOM_STEP = 0.15
// Title block column on the right side of the GA drawing (drawing number, revision history, principal particulars etc.)
// Covers approx. the rightmost 13% of the page width, full height
const MASK_WIDTH_RATIO  = 0.135  // fraction of page width
const MASK_HEIGHT_RATIO = 1.0    // full height

export default function ShipViewer() {
  const containerRef  = useRef(null)
  const canvasRef     = useRef(null)
  const renderTaskRef = useRef(null)
  const pageRef       = useRef(null)

  const [zoom,     setZoom]     = useState(1)
  const [pan,      setPan]      = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart  = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [pageSize, setPageSize] = useState(null) // { w, h } at scale=1

  // ── 1. Load PDF ────────────────────────────────────────────────────────────
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url: PDF_URL })
        const pdf  = await loadingTask.promise
        const page = await pdf.getPage(PAGE_NUM)
        const vp   = page.getViewport({ scale: 1 })
        if (!alive) return
        pageRef.current = page
        setPageSize({ w: vp.width, h: vp.height })
        setLoading(false)
      } catch (err) {
        if (alive) setError(String(err))
      }
    })()
    return () => { alive = false }
  }, [])

  // ── 2. Fit zoom once page dimensions are known ──────────────────────────
  useEffect(() => {
    if (!pageSize || !containerRef.current) return
    const cw = containerRef.current.clientWidth || 900
    const fit = cw / pageSize.w
    setZoom(Math.min(fit, 2))
    setPan({ x: 0, y: 0 })
  }, [pageSize])

  // ── 3. Render canvas ───────────────────────────────────────────────────────
  const renderPage = useCallback(async (z) => {
    const page   = pageRef.current
    const canvas = canvasRef.current
    if (!page || !canvas) return

    // cancel any in-flight render
    if (renderTaskRef.current) {
      try { renderTaskRef.current.cancel() } catch (_) {}
      renderTaskRef.current = null
    }

    const dpr   = window.devicePixelRatio || 1
    const scale = z * dpr
    const vp    = page.getViewport({ scale })

    canvas.width  = Math.floor(vp.width)
    canvas.height = Math.floor(vp.height)
    canvas.style.width  = `${Math.floor(vp.width  / dpr)}px`
    canvas.style.height = `${Math.floor(vp.height / dpr)}px`

    const ctx  = canvas.getContext('2d')
    const task = page.render({ canvasContext: ctx, viewport: vp })
    renderTaskRef.current = task
    try {
      await task.promise
    } catch (e) {
      if (e?.name !== 'RenderingCancelledException') console.warn(e)
    }
  }, [])

  useEffect(() => {
    if (!loading && !error) renderPage(zoom)
  }, [zoom, loading, error, renderPage])

  // ── 4. Mouse-wheel zoom ────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
      setZoom(z => +(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)).toFixed(3)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // ── 5. Touch pinch zoom ────────────────────────────────────────────────────
  const lastPinch = useRef(null)
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastPinch.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length !== 2 || lastPinch.current === null) return
    e.preventDefault()
    const d = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    )
    const ratio = d / lastPinch.current
    lastPinch.current = d
    setZoom(z => +(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * ratio)).toFixed(3)))
  }

  // ── 6. Drag to pan ─────────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    setDragging(true)
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y }
  }
  const onMouseMove = (e) => {
    if (!dragging) return
    setPan({
      x: dragStart.current.px + (e.clientX - dragStart.current.mx),
      y: dragStart.current.py + (e.clientY - dragStart.current.my),
    })
  }
  const onMouseUp = () => setDragging(false)

  // ── 7. Zoom buttons ────────────────────────────────────────────────────────
  const zoomIn   = () => setZoom(z => +(Math.min(MAX_ZOOM, z + ZOOM_STEP).toFixed(3)))
  const zoomOut  = () => setZoom(z => +(Math.max(MIN_ZOOM, z - ZOOM_STEP).toFixed(3)))
  const resetView = () => {
    if (!pageSize || !containerRef.current) return
    const cw = containerRef.current.clientWidth || 900
    setZoom(+(Math.min(cw / pageSize.w, 2).toFixed(3)))
    setPan({ x: 0, y: 0 })
  }

  return (
    <div className="relative w-full select-none">

      {/* ── Viewport frame ── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-sm border border-grey-line bg-[#f9f8f5]"
        style={{ height: '560px', cursor: dragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => { lastPinch.current = null }}
      >

        {/* Loading */}
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <svg className="animate-spin w-6 h-6 text-grey" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span className="font-mono text-xs text-grey uppercase tracking-wider">Loading GA drawing…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="font-mono text-xs text-hazard text-center">{error}</p>
          </div>
        )}

        {/* Pannable canvas container */}
        {!error && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translate(${pan.x}px, ${pan.y}px)`,
              willChange: 'transform',
            }}
          >
            <canvas ref={canvasRef} style={{ display: 'block' }} />

            {/* ── Title block mask — right-side column ──────────────────────── */}
            {/* Covers the revision history / drawing info / principal particulars */}
            {pageSize && (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width:  `${pageSize.w * zoom * MASK_WIDTH_RATIO}px`,
                  height: `${pageSize.h * zoom * MASK_HEIGHT_RATIO}px`,
                  background: '#f9f8f5',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              />
            )}
          </div>
        )}

        {/* ── Zoom control buttons (top-right) ── */}
        {!loading && !error && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20" onMouseDown={e => e.stopPropagation()}>
            <button
              onClick={zoomIn}
              className="w-8 h-8 flex items-center justify-center bg-paper border border-grey-line rounded-sm shadow-sm hover:bg-paper-dim transition-colors text-ink font-mono text-lg leading-none"
              title="Zoom in"
            >+</button>
            <button
              onClick={zoomOut}
              className="w-8 h-8 flex items-center justify-center bg-paper border border-grey-line rounded-sm shadow-sm hover:bg-paper-dim transition-colors text-ink font-mono text-lg leading-none"
              title="Zoom out"
            >−</button>
            <button
              onClick={resetView}
              className="w-8 h-8 flex items-center justify-center bg-paper border border-grey-line rounded-sm shadow-sm hover:bg-paper-dim transition-colors"
              title="Fit to view"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── Zoom percentage badge ── */}
        {!loading && !error && (
          <div className="absolute bottom-3 left-3 z-20 font-mono text-[10px] text-grey bg-paper border border-grey-line rounded-sm px-2 py-1 leading-none uppercase tracking-wide pointer-events-none">
            {Math.round(zoom * 100)}%
          </div>
        )}

        {/* ── Interaction hint ── */}
        {!loading && !error && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] text-grey pointer-events-none opacity-50 whitespace-nowrap">
            Scroll to zoom · Drag to pan
          </div>
        )}
      </div>

      {/* ── Caption bar ── */}
      <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-grey-line font-mono text-xs text-grey uppercase tracking-wide">
        <span>General Arrangement — Vessel Plan View</span>
        <span>
          <span className="text-accent font-medium">6</span> material zones tracked
        </span>
      </div>
    </div>
  )
}
