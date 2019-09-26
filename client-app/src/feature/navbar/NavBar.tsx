import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

interface IProps {
  openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu fixed='top' inverted>
      <Menu.Item header>
        <img
          src='/assets/logo.png'
          alt='logo'
          style={{ marginRight: '12px' }}
        />
        Reactivities
      </Menu.Item>
      <Menu.Item name='Activities' />
      <Menu.Item>
        <Button
          onClick={() => openCreateForm()}
          positive
          content='Create Activity'
        />
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;