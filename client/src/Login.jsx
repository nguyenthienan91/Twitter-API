import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Login() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const new_user = params.get('new_user')
    const verify = params.get('verify')
    console.log(`New user: ${new_user}, 'Verify': ${verify}`)

    //Chỉ test cho trường hợp login
    //Muốn test cho trường hợp register thì dựa vào new_user và verify đã được xác thực hay chưa
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    navigate('/')

    // console.log(params.get('access_token'))
    // console.log(params.get('refresh_token'))
    // console.log(params.get('new_user'))
  }, [params, navigate])
  return <div>Login</div>
}
