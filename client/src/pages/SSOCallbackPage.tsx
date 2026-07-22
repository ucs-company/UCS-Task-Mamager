import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'

export function SSOCallbackPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-white p-4 dark:from-gray-900 dark:to-gray-950">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-16 w-16 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mx-auto h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4">
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-700" />
              <div className="space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100 dark:bg-gray-700" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-700" />
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" style={{ animationDelay: '200ms' }} />
            <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
      <AuthenticateWithRedirectCallback />
    </>
  )
}
