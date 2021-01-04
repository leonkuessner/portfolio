import { Redirect, Route } from "react-router-dom"
import { fakeAuth } from "./FakeAuth"

export default function PrivateRoute({ children, ...rest }) {
    return (
    <Route {...rest} render={({ location }) => {
        return fakeAuth.isAuthenticated === true
        ? children
        : <Redirect to={{
            pathname: '/login',
            state: { from: location }
            }} />
    }} />
    )
}