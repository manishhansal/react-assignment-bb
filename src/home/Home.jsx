import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StackOfCards } from "stack-of-cards";

export { Home };

function Home() {
  const { user: authUser } = useSelector((x) => x.auth);

  return (
    <div>
      <h1>Hi {authUser?.user.name}!</h1>
      <p>You're logged in with React 18 + Redux & JWT!!</p>
      <h3>Users from secure api end point:</h3>

      <StackOfCards />
    </div>
  );
}
