import React, { memo, useMemo } from 'react';

interface PerformanceMetricsProps {
  children: React.ReactNode;
  name?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMetricsProps> = memo(({ children, name = 'Component' }) => {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now();
    
    React.useEffect(() => {
      const endTime = performance.now();
      console.log(`${name} render time: ${endTime - startTime}ms`);
    });
  }

  return <>{children}</>;
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

// Hook for memoizing expensive calculations
export const useExpensiveCalculation = <T,>(
  calculateValue: () => T,
  dependencies: React.DependencyList
): T => {
  return useMemo(calculateValue, dependencies);
};

// Hook for debouncing values
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Component for rendering large lists efficiently
interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  className?: string;
}

export const VirtualizedList = <T,>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  className = ''
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleStart * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) =>
            renderItem(item, visibleStart + index)
          )}
        </div>
      </div>
    </div>
  );
};