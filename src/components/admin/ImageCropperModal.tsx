import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Check, X, Upload, Move, Sparkles } from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  aspectRatio?: number; // width / height, default 1:1
  outputWidth?: number; // default 400px
  outputHeight?: number; // default 400px
  shape?: 'round' | 'square';
  title?: string;
  onCropComplete: (croppedDataUrl: string) => void;
  onClose: () => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc: initialImageSrc,
  aspectRatio = 1,
  outputWidth = 400,
  outputHeight = 400,
  shape = 'round',
  title = 'Crop & Standardize Photo',
  onCropComplete,
  onClose,
}) => {
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(initialImageSrc);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync initial image
  useEffect(() => {
    setCurrentImageSrc(initialImageSrc);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setImageLoaded(false);
  }, [initialImageSrc, isOpen]);

  // Load image object
  useEffect(() => {
    if (!currentImageSrc) {
      setImageLoaded(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
    img.src = currentImageSrc;
  }, [currentImageSrc]);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCurrentImageSrc(event.target.result);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value so selecting the same file again works
    e.target.value = '';
  };

  // Pointer drag for panning
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!imageLoaded) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.min(3, Math.max(0.5, prev + delta)));
  };

  // Perform canvas crop
  const handleApplyCrop = useCallback(() => {
    if (!imageRef.current || !containerRef.current) return;

    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Viewport box dimensions in the modal UI (crop frame size = 260px x 260px)
    const frameSize = 260;
    const scaleFactor = outputWidth / frameSize;

    // Clear canvas
    ctx.clearRect(0, 0, outputWidth, outputHeight);

    // Calculate base rendering dimensions of image within frame
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let baseW = frameSize;
    let baseH = frameSize;

    if (imgAspect > 1) {
      // Landscape: height matches frame, width extends
      baseW = frameSize * imgAspect;
    } else {
      // Portrait or square: width matches frame, height extends
      baseH = frameSize / imgAspect;
    }

    const currentW = baseW * zoom;
    const currentH = baseH * zoom;

    // Calculate draw origin relative to center of the crop frame
    const centerX = frameSize / 2 + pan.x;
    const centerY = frameSize / 2 + pan.y;

    const drawX = (centerX - currentW / 2) * scaleFactor;
    const drawY = (centerY - currentH / 2) * scaleFactor;
    const drawW = currentW * scaleFactor;
    const drawH = currentH * scaleFactor;

    // Render image with smooth interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Convert to web-standard high-quality JPEG
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCropComplete(dataUrl);
    onClose();
  }, [outputWidth, outputHeight, pan, zoom, onCropComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#0284C7]/10 text-[#0284C7] rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-black text-slate-900">{title}</h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Standardized uniform size: {outputWidth}x{outputHeight}px
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* File selector strip */}
          <div className="flex items-center justify-between gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <Upload className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Choose Photo from Device</span>
            </button>
            <span className="text-[11px] text-slate-400 font-medium">
              Drag to position · Scroll or slider to zoom
            </span>
          </div>

          {/* Interactive Crop Viewport Box */}
          <div className="relative flex flex-col items-center justify-center">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onWheel={handleWheel}
              className="relative w-[260px] h-[260px] bg-slate-900 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border-2 border-slate-300 shadow-inner select-none flex items-center justify-center"
            >
              {currentImageSrc && imageLoaded ? (
                <div
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                  }}
                  className="pointer-events-none select-none"
                >
                  <img
                    src={currentImageSrc}
                    alt="Crop preview"
                    className="max-w-none pointer-events-none"
                    style={{
                      maxHeight: '260px',
                    }}
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="text-center p-6 space-y-2 text-slate-400">
                  <Upload className="w-8 h-8 mx-auto opacity-50 text-slate-300" />
                  <p className="text-xs font-medium">No image selected</p>
                  <p className="text-[10px] text-slate-500">
                    Click 'Choose Photo' above to load a picture
                  </p>
                </div>
              )}

              {/* Crop Mask Guide Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Vignette Overlay with round cutout */}
                <svg className="w-full h-full" viewBox="0 0 260 260">
                  <defs>
                    <mask id="cropMask">
                      <rect width="260" height="260" fill="white" />
                      {shape === 'round' ? (
                        <circle cx="130" cy="130" r="115" fill="black" />
                      ) : (
                        <rect x="15" y="15" width="230" height="230" rx="16" fill="black" />
                      )}
                    </mask>
                  </defs>
                  <rect
                    width="260"
                    height="260"
                    fill="rgba(15, 23, 42, 0.65)"
                    mask="url(#cropMask)"
                  />
                  {shape === 'round' ? (
                    <circle
                      cx="130"
                      cy="130"
                      r="115"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  ) : (
                    <rect
                      x="15"
                      y="15"
                      width="230"
                      height="230"
                      rx="16"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                </svg>

                {/* Grid Center Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <Move className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Helper Hint */}
            <p className="text-[11px] text-slate-500 text-center mt-2 font-medium">
              Area inside the blue ring will be your standardized team photo.
            </p>
          </div>

          {/* Controls: Zoom Slider & Reset */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <ZoomIn className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Zoom Scale: {Math.round(zoom * 100)}%</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="text-[11px] text-[#0284C7] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset View</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="range"
                min="0.6"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
              />
              <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!imageLoaded}
            onClick={handleApplyCrop}
            className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Apply & Standardize Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
