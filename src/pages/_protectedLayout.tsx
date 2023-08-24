import ProtectedRoute from '@/components/ProtectedRoute'
import MobileNavbar from '@/components/mobileNavbar'

interface Props {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: Props) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col">
        <MobileNavbar/>
        <main className="h-screen flex justify-center grow">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
