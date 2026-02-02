import AuthLayout from '@/components/layouts/AuthLayout'
import SignInForm from './SignInForm'
import SimpleNavbar from '@/components/navbar/SimpleNavbar'

const SignInPage = () => {
  return (
    <>
      <SimpleNavbar title="Sign In"/>
      <AuthLayout
        level="page"
        welcomeTitle="Hello Toeankoe"
        subtitle="Ready to get your best haircut today?"
        footer="Don't have an account yet?"
        footerUrl="/signup"
      >
        <div className="w-full h-fit sticky top-0">
          <SignInForm />
        </div>
      </AuthLayout>
    </>
  )
}

export default SignInPage