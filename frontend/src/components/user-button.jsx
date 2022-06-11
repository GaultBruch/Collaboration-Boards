import React from 'react'

import { useAuth0 } from '@auth0/auth0-react';

function UserDisplay() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user)

  if (isAuthenticated) {
    console.log(user)
    return (<p>Hello {user.name}</p>)
  }
}

export default UserDisplay;