import AuthLayout from '@/components/layouts/AuthLayout'
import SignUpForm from './SignUpForm'
import SimpleNavbar from '@/components/navbar/SimpleNavbar'

const SignUpPage = () => {
  return (
    <>
      <SimpleNavbar title="Sign Up"/>
      <AuthLayout
        level='page'
        welcomeTitle="Welcome to Toeankoe"
        subtitle='Register your account to get exciting features from Toeankoe.'
        footer="Alreaddy have an account?"
        footerUrl="/signin"
      >
        <div className="w-full h-fit sticky top-0">
          <SignUpForm />
        </div>
      </AuthLayout>
    </>
  )
}

export default SignUpPage