import ProtectedLayout from '../_protectedLayout'
import UserForm from './_components/userForm'

export default function UserProfile() {
  return (
    <ProtectedLayout >
      <UserForm />
    </ProtectedLayout>
  )
}
