import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Check, Upload, Move, AlertCircle, RefreshCw } from 'lucide-react';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (croppedDataUrl: string) => void;
  title?: string;
  aspectRatio?: number; // default 1 (1:1 square)
  outputSize?: number; // default 400
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title = 'Upload & Crop Professional Photo',
  aspectRatio = 1,
  outputSize = 400,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setPan({ x: 0, y: 0 });
    } else {
      setImageSrc(null);
    }
  }, [isOpen]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          loadImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const loadImage = (src: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setImageSrc(src);
      setZoom(1);
      setRotation(0);
      setPan({ x: 0, y: 0 });
      drawPreview();
    };
    img.src = src;
  };

  // Draw the preview onto canvas
  const drawPreview = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background fill
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, width, height);

    ctx.save();

    // Center of canvas
    ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Calculate aspect fit size
    const imgAspect = img.width / img.height;
    let drawW = width;
    let drawH = height;

    if (imgAspect > 1) {
      drawW = height * imgAspect;
      drawH = height;
    } else {
      drawW = width;
      drawH = width / imgAspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

    ctx.restore();

    // Draw crop guide overlay (darkened borders outside the crop boundary)
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Subtle center crosshair guide
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  // Redraw when transform changes
  useEffect(() => {
    if (imageSrc) {
      drawPreview();
    }
  }, [imageSrc, zoom, rotation, pan]);

  // Mouse / Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Generate cropped output data URL
  const handleSaveCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    // Create an offscreen canvas at exact standardized dimensions
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = outputSize;
    outputCanvas.height = outputSize;

    const ctx = outputCanvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate identical transform to preview canvas
    const previewCanvas = canvasRef.current;
    const scaleFactor = previewCanvas ? outputSize / previewCanvas.width : 1;

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, outputSize, outputSize);

    ctx.save();
    ctx.translate(outputSize / 2 + pan.x * scaleFactor, outputSize / 2 + pan.y * scaleFactor);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom * scaleFactor, zoom * scaleFactor);

    const imgAspect = img.width / img.height;
    let drawW = previewCanvas ? previewCanvas.width : outputSize;
    let drawH = previewCanvas ? previewCanvas.height : outputSize;

    if (imgAspect > 1) {
      drawW = drawH * imgAspect;
    } else {
      drawH = drawW / imgAspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Export as high quality compact WebP/JPEG data URL
    const croppedUrl = outputCanvas.toDataURL('image/jpeg', 0.88);
    onSave(croppedUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 font-medium">
              Standardized {outputSize}×{outputSize}px square crop for uniform presentation
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {!imageSrc ? (
            /* Upload Initial Trigger Screen */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-[#0284C7] bg-slate-50 hover:bg-sky-50/50 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-3 group"
            >
              <div className="w-14 h-14 bg-white border border-slate-200 group-hover:border-sky-300 rounded-2xl shadow-xs flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#0284C7] transition-colors">
                <Upload className="w-7 h-7" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#0284C7]">
                  Click to select photo from device
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports JPG, PNG, WEBP — Any size or ratio will be auto-fitted
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            /* Interactive Canvas Cropper Screen */
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#0284C7] shadow-md bg-slate-900">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={320}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="cursor-move touch-none"
                    title="Click and drag to reposition"
                  />

                  {/* Drag prompt pill */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1 pointer-events-none">
                    <Move className="w-3 h-3 text-[#38BDF8]" />
                    <span>Drag to reposition photo</span>
                  </div>
                </div>
              </div>

              {/* Controls: Zoom, Rotate, Reset */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <ZoomOut className="w-4 h-4 text-slate-400" />
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-[#0284C7]"
                  />
                  <ZoomIn className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-mono font-bold text-slate-700 w-12 text-right">
                    {zoom.toFixed(1)}x
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setRotation((prev) => (prev + 90) % 360)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Rotate 90°</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                      setRotation(0);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Center & Fit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-[#0284C7] hover:underline font-bold"
                  >
                    Change Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            Cancel
          </button>

          {imageSrc && (
            <button
              type="button"
              onClick={handleSaveCrop}
              className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply & Save Crop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
