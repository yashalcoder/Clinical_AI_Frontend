import React from "react";

export const Skeleton = ({ className = "", variant = "rect" }) => {
  const baseClass = "bg-gray-200 animate-pulse";
  
  const variants = {
    rect: "rounded-md",
    circle: "rounded-full",
    text: "rounded h-4 w-full"
  };

  return <div className={`${baseClass} ${variants[variant]} ${className}`} />;
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <div className="bg-gray-50 h-10 border-b border-gray-100" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
        </div>
      </div>
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col h-[500px] border border-gray-100 rounded-xl overflow-hidden p-4 space-y-4">
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-14 max-w-sm" />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <div className="space-y-2 flex-1 flex flex-col items-end">
          <Skeleton className="h-10 max-w-sm" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-20 max-w-md" />
        </div>
      </div>
    </div>
  );
};
