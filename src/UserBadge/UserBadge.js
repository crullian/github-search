import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import './UserBadge.css'

const UserBadge = ({user}) => (
  <Card className="UserBadge-container">
    <CardHeader
      className="UserBadge-card-header"
      avatar={user.avatar_url}
      title={user.name}
      subtitle={
        <div>
          <div>Number of followers: {user.followers}</div>
          <div>Number following: {user.following}</div>
        </div>
      }
    />
  </Card>
);

export default UserBadge;
