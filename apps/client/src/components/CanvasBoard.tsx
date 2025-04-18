import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

interface CanvasBoardProps {
  /** length of the finished stroke in pixels */
  onStrokeEnd: (length: number) => void;
  disabled?: boolean;
}

const CanvasBoard = forwardRef<any, CanvasBoardProps>(({ onStrokeEnd, disabled = false }, ref) => {
  const canvasRef = useRef<any>(null);
  
  // Expose the canvas methods to the parent component
  useImperativeHandle(ref, () => ({
    resetCanvas: () => {
      if (canvasRef.current) {
        canvasRef.current.resetCanvas();
      }
    },
    exportImage: async (fileType: string) => {
      if (canvasRef.current) {
        return await canvasRef.current.exportImage(fileType);
      }
      return null;
    }
  }));
  
  return (
    <div className="canvas-board">
      <ReactSketchCanvas
        ref={canvasRef}
        width="100%"
        height="400px"
        strokeWidth={4}
        strokeColor="#000"
        canvasColor="#f5f5f5"
        exportWithBackgroundImage={false}
        withTimestamp={true}
        allowOnlyPointerType="all"
        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
        onStroke={(stroke: any) => {
          if (disabled) return;

          const pts = stroke.paths ?? [];          // ← the real data
          if (pts.length < 2) return;              // dot spam

          let length = 0;
          for (let i = 1; i < pts.length; i++) {
            const dx = pts[i].x - pts[i - 1].x;
            const dy = pts[i].y - pts[i - 1].y;
            length += Math.hypot(dx, dy);
          }

          if (length >= 5) onStrokeEnd(length);    // ignore tiny strokes
        }}
      />
    </div>
  );
});

export default CanvasBoard; 