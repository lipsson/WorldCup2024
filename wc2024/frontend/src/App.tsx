import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layouts/layout/layout'
import { WorldCup } from './components/world-cup/pages/world-cup.page'
import { FC } from 'react';

export const App: FC = () => {
  const path = `${window.location.pathname}${window.location.search}` || undefined;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'/'} element={<WorldCup />} />
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            replace
            to="/"
            state={{
              path,
            }}
          />
        }
      />
    </Routes>
  )
};
