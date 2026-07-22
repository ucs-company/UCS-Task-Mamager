import { Skeleton } from './Skeleton'

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 lg:h-8" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-8 w-12 lg:h-10" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg lg:h-12 lg:w-12" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-7 w-10" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700 lg:px-6 lg:py-4">
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 lg:px-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-4 w-32 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BoardSkeleton() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-24 lg:h-8" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex w-full flex-col rounded-xl bg-gray-50/80 dark:bg-gray-800/40 lg:flex-1">
            <div className="flex items-center justify-between border-b border-gray-200/60 px-4 py-3 dark:border-gray-700/40">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-6 rounded-full" />
            </div>
            <div className="flex flex-col gap-2 p-3">
              {i < 2 && (
                <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                  <Skeleton className="h-4 w-14 rounded-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              )}
              {i === 0 && (
                <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                  <Skeleton className="h-4 w-14 rounded-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TaskListSkeleton() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-20 lg:h-8" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="hidden sm:block">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
        <div className="space-y-3 p-4 sm:hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-4 w-14 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TaskDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 lg:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:p-6">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-4 lg:h-7" />
        <div className="flex flex-wrap gap-3 mb-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700 lg:px-6 lg:py-4">
          <Skeleton className="h-5 w-24" />
        </div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3 lg:px-6 lg:py-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TaskFormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      <Skeleton className="h-7 w-36 mb-6 lg:h-8" />
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:space-y-6 lg:p-6">
        <div className="space-y-1">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function TeamSkeleton() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <Skeleton className="h-7 w-24 lg:h-8" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:p-5">
            <div className="flex items-center gap-3 lg:gap-4">
              <Skeleton className="h-10 w-10 rounded-full lg:h-12 lg:w-12" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-4 w-16 mt-3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 lg:space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 lg:p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-full lg:h-16 lg:w-16" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg lg:h-12 lg:w-12" />
              <div className="space-y-1">
                <Skeleton className="h-6 w-12 lg:h-7" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700 lg:px-6 lg:py-4">
          <Skeleton className="h-5 w-28" />
        </div>
          {[...Array(3)].map((_, i) => (
          <div key={i} className="px-4 py-3 lg:px-6">
            <Skeleton className="h-4 w-3/4 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function UserTasksSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Skeleton className="h-4 w-24" />
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 px-5 py-3 dark:border-gray-700">
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex items-center justify-between px-5 py-3">
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
