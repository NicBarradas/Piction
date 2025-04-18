import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

interface CanvasBoardProps {
  onStrokeEnd: (points: any[]) => void;
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
        onStrokeEnd={(points) => {
          // Extract the points for ink calculation
          if (!disabled && points && points.length > 0) {
            onStrokeEnd(points);
          }
        }}
        readOnly={disabled}
      />
    </div>
  );
});

export default CanvasBoard; 