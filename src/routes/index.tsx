import { Route, Routes } from "react-router-dom"
import { Auth } from "../pages/Auth"
import { Layout } from "../components/Layout"
import { Home } from "../pages/Home"
import { NewTransaction } from "../pages/Transaction/New"
import { EditTransaction } from "../pages/Transaction/Edit"
import { Transactions } from "../pages/Transaction/Transactions"
import { Account } from "../pages/Account"
import { NotFound } from "../pages/NotFound"
import { Usuarios } from "../pages/Usuario/Usuarios"
import { EditarUsuario } from "../pages/Usuario/Edit/EditarUsuario"
import { CadastrarUsuario } from "../pages/Usuario/New/CadastrarUsuario"

export const MainRoutes = () => {
    return (
        <Routes>
            <Route
                path="/signin"
                element={<Auth type="signin" />}
            />

            <Route
                path="/signup"
                element={<Auth type="signup" />}
            />

            <Route element={<Layout />}>
                <Route
                    index
                    element={<Home />}
                />

                <Route 
                    path="/account"
                    element={<Account />}
                />
                
                <Route path="/transacoes">
                    <Route 
                        index
                        element={<Transactions />}
                    />
                    <Route
                        path="nova"
                        element={<NewTransaction />}
                    />
                    <Route
                        path=":id/editar"
                        element={<EditTransaction />}
                    />
                </Route>
                <Route path="Usuarios/">
                    <Route 
                        index
                        element={<Usuarios />}
                    />
                    <Route
                        path="nova"
                        element={<NewTransaction />}
                    />
                    <Route
                        path=":id/editar"
                        element={<EditarUsuario />}
                    />
                      <Route
                        path="Cadastrar"
                        element={<CadastrarUsuario />}
                    />
                </Route>
            </Route>

            <Route 
                path="*"
                element={<NotFound />}
            />
        </Routes>
    )
}